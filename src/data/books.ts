// import type { Book } from "@/app/books/book"

// export const initialBooks: Book[] = [
//   {
//     id: "1",
//     title: "Dom Casmurro",
//     author: "Machado de Assis",
//     genre: "Literatura Brasileira",
//     year: 1899,
//     pages: 256,
//     rating: 4.5,
//     synopsis:
//       "Um dos grandes clássicos da literatura brasileira, que trata de ciúme, memória e dúvida na narrativa de Bentinho.",
//     cover:
//       "https://upload.wikimedia.org/wikipedia/commons/6/6f/DomCasmurro.jpg",
//     status: "LIDO",
//     isbn: "978-85-XXX-XXXX",
//   },
// ]

// export function getBookById(id: string): Book | undefined {
//   return initialBooks.find((b) => b.id === id)
// }

// interface DashboardStats {
//   totalLivros: number
//   emLeitura: number
//   finalizados: number
//   paginasLidas: number
// }

// export async function getDashboardStats(): Promise<DashboardStats> {
//   const livros = initialBooks
//   const totalLivros = livros.length
//   const emLeitura = livros.filter((l) => l.status === "LENDO").length
//   const finalizados = livros.filter((l) => l.status === "LIDO").length
//   const paginasLidas = 0

//   return {
//     totalLivros,
//     emLeitura,
//     finalizados,
//     paginasLidas,
//   }
// }

// export async function getBooks(filters?: {
//   searchTerm?: string
//   filterGenre?: string
// }): Promise<Book[]> {
//   let currentBooks = initialBooks

//   if (filters?.searchTerm) {
//     const term = filters.searchTerm.toLowerCase()
//     currentBooks = currentBooks.filter(
//       (book) =>
//         book.title.toLowerCase().includes(term) ||
//         book.author.toLowerCase().includes(term)
//     )
//   }

//   if (filters?.filterGenre && filters.filterGenre !== "TODOS") {
//     currentBooks = currentBooks.filter(
//       (book) => book.genre === filters.filterGenre
//     )
//   }

//   return currentBooks
// }

import { prisma } from "@/lib/prisma"
import type { Book } from "@prisma/client"

interface DashboardStats {
  totalLivros: number
  emLeitura: number
  finalizados: number
  paginasLidas: number
}

// 🔹 Buscar todos os livros com filtros
export async function getBooks(filters?: {
  searchTerm?: string
  filterGenre?: string
}): Promise<Book[]> {
  const where: any = {}

  if (filters?.searchTerm) {
    const term = filters.searchTerm.toLowerCase()
    where.OR = [
      { title: { contains: term, mode: "insensitive" } },
      { author: { contains: term, mode: "insensitive" } },
    ]
  }

  if (filters?.filterGenre && filters.filterGenre !== "TODOS") {
    where.genre = { name: filters.filterGenre }
  }

  return prisma.book.findMany({
    where,
    include: { genre: true },
    orderBy: { createdAt: "desc" },
  })
}

// 🔹 Buscar livro específico por ID
export async function getBookById(id: number): Promise<Book | null> {
  return prisma.book.findUnique({
    where: { id },
    include: { genre: true },
  })
}

// 🔹 Estatísticas para o dashboard
export async function getDashboardStats(): Promise<DashboardStats> {
  const livros = await prisma.book.findMany()

  const totalLivros = livros.length
  const emLeitura = livros.filter((l) => l.status === "LENDO").length
  const finalizados = livros.filter((l) => l.status === "LIDO").length
  const paginasLidas = livros.reduce(
    (acc, l) => acc + (l.currentPage || 0),
    0
  )

  return {
    totalLivros,
    emLeitura,
    finalizados,
    paginasLidas,
  }
}
