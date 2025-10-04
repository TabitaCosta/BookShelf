import { NextResponse } from "next/server"
import { createBook, getBooks } from "@/data/books" // 1. Importando as funções do banco de dados
import { z } from "zod"

// Schema de validação para a criação de um livro via API
const bookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
  genreId: z.string().min(1, "Gênero é obrigatório"),
  year: z.coerce.number().min(1, "Ano é obrigatório"),
  pages: z.coerce.number().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  synopsis: z.string().optional(),
  cover: z.string().url("URL da capa inválida").optional().or(z.literal("")),
  status: z.enum(["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"]),
})

// GET - Retornar todos os livros ou livros filtrados do banco de dados
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("filtro")

  try {
    // 2. A função getBooks agora pode receber um parâmetro de busca
    const books = await getBooks(query)
    return NextResponse.json(books)
  } catch (error) {
    console.error("Falha ao buscar livros:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}

// POST - Adicionar um novo livro no banco de dados
export async function POST(request: Request) {
  const body = await request.json()
  const validatedFields = bookSchema.safeParse(body)

  // 3. Validação robusta com Zod
  if (!validatedFields.success) {
    return NextResponse.json(
      { error: "Dados inválidos", details: validatedFields.error.flatten() },
      { status: 400 }
    )
  }

  const { genreId, ...bookData } = validatedFields.data

  try {
    // 4. Chamando a função createBook para salvar no banco
    const novoLivro = await createBook({
      ...bookData,
      genre: {
        connect: { id: genreId },
      },
    })
    return NextResponse.json(novoLivro, { status: 201 })
  } catch (error) {
    console.error("Falha ao criar livro:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}
