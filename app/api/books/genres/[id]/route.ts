import { NextResponse } from "next/server";
import { prisma } from "../../../../../src/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// 🔹 GET - Buscar livro por ID
export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
    include: { genre: true },
  });
  return NextResponse.json(book);
}

// 🔹 PUT - Atualizar livro
export async function PUT(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const data = await req.json();

  const updatedBook = await prisma.book.update({
    where: { id: Number(id) },
    data,
  });

  return NextResponse.json(updatedBook);
}

// 🔹 DELETE - Excluir livro
export async function DELETE(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  await prisma.book.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Livro deletado com sucesso" });
}