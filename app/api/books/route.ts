import { NextRequest, NextResponse } from "next/server" 
import { getBooks } from "../../../src/data/books"; 
import { createBook } from "../../../src/services/bookService";
import { z } from "zod";


// GET - Retornar todos os livros ou livros filtrados do banco de dados
export async function GET(request: NextRequest) { // Use NextRequest
  // 1. Get URL parameters in a cleaner way
  const searchParams = request.nextUrl.searchParams
  const searchTerm = searchParams.get("searchTerm")
  const genreId = searchParams.get("genreId")

  try {
    // 2. Build a filter object to pass to getBooks
    const filters = {
      searchTerm: searchTerm || undefined,
      genreId: genreId || undefined,
    }

    // 3. Call getBooks with the structured filter object
    const books = await getBooks(filters)
    return NextResponse.json(books)
    
  } catch (error) {
    console.error("Falha ao buscar livros:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}