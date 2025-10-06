import { NextResponse } from "next/server";
import { prisma } from "../../../../../src/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

// GET - Buscar um livro pelo ID
export async function GET(_: Request, { params }: Params) {
  const { id } = params;
  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
    include: { genre: true },
  });
  return NextResponse.json(book);
}

// PUT - Atualizar um livro
export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  const data = await request.json();

  const updatedBook = await prisma.book.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json(updatedBook);
}

// DELETE - Deletar um livro
export async function DELETE(_: Request, { params }: Params) {
  const { id } = params;
  await prisma.book.delete({
    where: { id: Number(id) },
  });
  return NextResponse.json({ message: "Livro deletado com sucesso" });
}
