import { prisma } from "../lib/prisma";
import { Genre } from "../lib/prisma";

export async function getGenres(): Promise<Genre[]> {
  return prisma.genre.findMany({ orderBy: { name: "asc" } });
}

export async function createGenre(name: string): Promise<Genre> {
  return prisma.genre.create({ data: { name } });
}
