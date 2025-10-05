import { prisma } from "../lib/prisma"
import type { Book } from "@prisma/client"

interface DashboardStats {
  totalLivros: number
  emLeitura: number
  finalizados: number
  paginasLidas: number
}

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
