import { NextResponse } from "next/server";
import { genres } from "data/genres";
import { books } from "data/books";

// GET - Buscar gênero por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 Promise
) {
  const { id } = await params; // 👈 await
  const genre = genres.find((g) => g.id === id);

  if (!genre) {
    return NextResponse.json(
      { error: "Gênero não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(genre);
}

// PUT - Atualizar gênero por ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 Promise
) {
  const { id } = await params; // 👈 await
  const index = genres.findIndex((g) => g.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Gênero não encontrado" },
      { status: 404 }
    );
  }

  const body = await request.json();

  if (!body.name || body.name.trim() === "") {
    return NextResponse.json(
      { error: "O campo 'name' é obrigatório" },
      { status: 400 }
    );
  }

  genres[index] = { ...genres[index], name: body.name };

  return NextResponse.json({
    message: "Gênero atualizado com sucesso",
    updated: genres[index],
  });
}

// DELETE - Remover gênero por ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 Promise
) {
  const { id } = await params; // 👈 await
  const index = genres.findIndex((g) => g.id === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Gênero não encontrado" },
      { status: 404 }
    );
  }

  const hasBooks = books.some((b) => b.genreId === id);
  if (hasBooks) {
    return NextResponse.json(
      {
        error:
          "Não é possível deletar este gênero porque existem livros associados a ele",
      },
      { status: 400 }
    );
  }

  const deletedGenre = genres.splice(index, 1)[0];
  return NextResponse.json({
    message: "Gênero deletado com sucesso",
    deleted: deletedGenre,
  });
}