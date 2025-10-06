import { NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/prisma";

// 🔹 GET - Buscar gênero por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const genre = await prisma.genre.findUnique({
    where: { id: Number(params.id) },
    include: { books: true }, // se quiser trazer os livros do gênero
  });

  if (!genre) {
    return NextResponse.json(
      { error: "Gênero não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(genre);
}

// 🔹 PUT - Atualizar gênero por ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  if (!body.name || body.name.trim() === "") {
    return NextResponse.json(
      { error: "O campo 'name' é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const updatedGenre = await prisma.genre.update({
      where: { id: Number(params.id) },
      data: { name: body.name },
    });

    return NextResponse.json({
      message: "Gênero atualizado com sucesso",
      updated: updatedGenre,
    });
  } catch {
    return NextResponse.json(
      { error: "Gênero não encontrado" },
      { status: 404 }
    );
  }
}

// 🔹 DELETE - Remover gênero por ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const genreId = Number(params.id);

  // Verificar se há livros associados
  const hasBooks = await prisma.book.findFirst({
    where: { genreId },
  });

  if (hasBooks) {
    return NextResponse.json(
      {
        error:
          "Não é possível deletar este gênero porque existem livros associados a ele",
      },
      { status: 400 }
    );
  }

  try {
    const deletedGenre = await prisma.genre.delete({
      where: { id: genreId },
    });

    return NextResponse.json({
      message: "Gênero deletado com sucesso",
      deleted: deletedGenre,
    });
  } catch {
    return NextResponse.json(
      { error: "Gênero não encontrado" },
      { status: 404 }
    );
  }
}
