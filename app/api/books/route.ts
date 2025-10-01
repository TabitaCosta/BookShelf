import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { books, Book } from "data/books"

function searchBooks(query: string) {
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  )
}

// GET - Retornar todos os livros ou livros filtrados
export async function GET(request: Request) {
  const url = new URL(request.url)
  const searchQuery = url.searchParams.get("filtro")

  if (searchQuery) {
    const filteredBooks = searchBooks(searchQuery)
    return NextResponse.json(filteredBooks)
  }

  return NextResponse.json(books)
}

// POST - Adicionar um novo livro
export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title || !body.author) {
    return NextResponse.json(
      { error: "Título e Autor são obrigatórios" },
      { status: 400 }
    )
  }

  const novoLivro: Book = {
    ...body,
    id: randomUUID(),
  }

  books.push(novoLivro)
  return NextResponse.json(novoLivro, { status: 201 })
}
