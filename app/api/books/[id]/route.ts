import { NextResponse } from "next/server"
import { books } from "@/data/books"

// GET - Retornar livro por ID
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const book = books.find((book) => book.id === id)

  if (!book) {
    return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
  }

  return NextResponse.json(book)
}

// PUT - Atualizar um livro
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await request.json()

  const index = books.findIndex((livro) => livro.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
  }

  books[index] = { ...books[index], ...body }
  return NextResponse.json(books[index])
}

// DELETE - Excluir um livro
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const index = books.findIndex((livro) => livro.id === id)

  if (index === -1) {
    return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 })
  }

  const livroRemovido = books.splice(index, 1)[0]
  return NextResponse.json(livroRemovido)
}
