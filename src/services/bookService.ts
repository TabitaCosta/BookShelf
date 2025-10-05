import { prisma } from "../lib/prisma";
import { Book, Prisma } from "@prisma/client";

export async function getBooks(): Promise<Book[]> {
  return prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    include: { genre: true },
  });
}

export async function getBook(id: string): Promise<Book | null> {
  return prisma.book.findUnique({
    where: { id }, // id é string
  })
}


export async function createBook(data: Prisma.BookCreateInput): Promise<Book> {
  return prisma.book.create({ data });
}

// ✅ id agora é string
export async function updateBook(id: string, data: Prisma.BookUpdateInput): Promise<Book> {
  return prisma.book.update({
    where: { id },
    data,
  });
}

// ✅ id agora é string
export async function deleteBook(id: string): Promise<Book> {
  return prisma.book.delete({ where: { id } });
}
