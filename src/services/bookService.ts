
// import { prisma } from '@/lib/prisma.js';
// import type { Prisma } from '@prisma/client';

// export async function getBooks() {
//   const books = await prisma.book.findMany({
//     orderBy: {
//       createdAt: 'desc', 
//     },
//     include: {
//       genre: true, 
//     },
//   });
//   return books;
// }

// export async function getBook(id: string) {
//   const book = await prisma.book.findUnique({
//     where: { id: parseInt(id) }, 
//   });
//   return book;
// }


// export async function createBook(data: Prisma.BookCreateInput) {
//   const book = await prisma.book.create({
//     data,
//   });
//   return book;
// }

// export async function updateBook(id: string, data: Prisma.BookUpdateInput) {
//   const book = await prisma.book.update({
//     where: { id: parseInt(id) },
//     data,
//   });
//   return book;
// }

// export async function deleteBook(id: string) {
//   await prisma.book.delete({
//     where: { id: parseInt(id) },
//   });
// }


import { prisma } from "../lib/prisma";
import { Book, Prisma } from "@prisma/client";

export async function getBooks(): Promise<Book[]> {
  return prisma.book.findMany({
    orderBy: { createdAt: "desc" },
    include: { genre: true },
  });
}

export async function getBook(id: number): Promise<Book | null> {
  return prisma.book.findUnique({
    where: { id },
    include: { genre: true },
  });
}

export async function createBook(data: Prisma.BookCreateInput): Promise<Book> {
  return prisma.book.create({ data });
}

export async function updateBook(id: number, data: Prisma.BookUpdateInput): Promise<Book> {
  return prisma.book.update({
    where: { id },
    data,
  });
}

export async function deleteBook(id: number): Promise<Book> {
  return prisma.book.delete({ where: { id } });
}
