import { PrismaClient } from '@prisma/client';
import { books } from '../data/books.js';

const prisma = new PrismaClient();
async function main() {
    const genresMap = {};

    for (const book of books) {
        const genreName = book.genre;
        if (!genresMap[genreName]) {
            console.log(`Criando gênero: ${genreName}`);
            const newGenre = await prisma.genre.create({
                data: { name: genreName },
            });
            genresMap[genreName] = newGenre.id; 
        }
    }

    for (const book of books) {
        const genreId = genresMap[book.genre]; 
        await prisma.book.create({
            data: {
                title: book.title,
                author: book.author,
                year: book.year,
                rating: book.rating,
                pages: book.pages,
                synopsis: book.synopsis,
                status: book.status,
                cover: book.cover,
                genre: { connect: { id: genreId } }, 
            },
        });
    }
}
main()
    .catch((e) => {
    console.error('Ocorreu um erro durante a migração:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
