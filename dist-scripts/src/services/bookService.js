import { prisma } from '../../lib/prisma.js';

export async function getBooks() {
    const books = await prisma.book.findMany({
        orderBy: {
            createdAt: 'desc', 
        },
        include: {
            genre: true, 
        },
    });
    return books;
}

export async function getBook(id) {
    const book = await prisma.book.findUnique({
        where: { id: parseInt(id) },
        //...
    });
    return book;
}

export async function createBook(data) {
    const book = await prisma.book.create({
        data,
    });
    return book;
}

export async function updateBook(id, data) {
    const book = await prisma.book.update({
        where: { id: parseInt(id) }, 
        data,
    });
    return book;
}

export async function deleteBook(id) {
    await prisma.book.delete({
        where: { id: parseInt(id) }, 
    });
}
