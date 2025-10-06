import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../../../../src/lib/prisma";

export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const genre = await prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      return NextResponse.json({ error: "Gênero não encontrado" }, { status: 404 });
    }

    return NextResponse.json(genre);
  } catch (error) {
    console.error("Erro ao buscar o gênero:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "O campo 'name' é obrigatório" }, { status: 400 });
    }

    const updatedGenre = await prisma.genre.update({
      where: { id },
      data: { name: body.name },
    });

    return NextResponse.json(updatedGenre);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: "Gênero não encontrado para atualização" }, { status: 404 });
    }
    console.error("Erro ao atualizar o gênero:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
.
export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
     const { id } = context.params;

    const deletedGenre = await prisma.genre.delete({
      where: { id },
    });

    return NextResponse.json(deletedGenre);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: "Gênero não encontrado para deleção" }, { status: 404 });
    }
    console.error("Erro ao deletar o gênero:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}