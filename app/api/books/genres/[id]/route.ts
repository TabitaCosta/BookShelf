import { NextResponse } from "next/server";
import { getBooks } from "../../../../../src/data/books";

// GET - Retornar todos os livros de um gênero específico
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 Promise
) {
  const { id } = await params; // 👈 await

  const books = await getBooks();
  const filteredBooks = books.filter((book) => book.genreId === Number(id));

  if (filteredBooks.length === 0) {
    return NextResponse.json(
      { error: "Nenhum livro encontrado para este gênero" },
      { status: 404 }
    );
  }

  return NextResponse.json(filteredBooks);
}
