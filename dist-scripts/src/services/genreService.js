import { prisma } from '../../lib/prisma.js';

export async function getGenres() {
    const genres = await prisma.genre.findMany({
        orderBy: {
            name: 'asc',
        },
    });
    return genres;
}

export async function createGenre(name) {
    const genre = await prisma.genre.create({
        data: { name },
    });
    return genre;
}
