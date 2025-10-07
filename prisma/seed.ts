import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

interface OldBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  synopsis: string;
  cover: string;
}

async function main() {
  console.log('🌱 Iniciando o seed de dados...');

  // === 1️⃣ GÊNEROS ===
  const genresPath = path.join(__dirname, '../data/genres.json');
  const genreNames: string[] = JSON.parse(fs.readFileSync(genresPath, 'utf-8'));

  for (const name of genreNames) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`✅ ${genreNames.length} gêneros processados com sucesso.`);

  // === 2️⃣ LIVROS ===
  const booksPath = path.join(__dirname, '../data/books.json');
  const oldBooks: OldBook[] = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));
  console.log(`📚 Encontrados ${oldBooks.length} livros para migrar.`);

  const allGenres = await prisma.genre.findMany();
  const genreMap = new Map(allGenres.map(g => [g.name, g.id]));

  for (const book of oldBooks) {
    const genreId = genreMap.get(book.genre);

    if (!genreId) {
      console.warn(`⚠️  Gênero "${book.genre}" não encontrado. Livro "${book.title}" será ignorado.`);
      continue;
    }

    try {
      await prisma.book.create({
        data: {
          id: book.id,
          title: book.title,
          author: book.author,
          synopsis: book.synopsis,
          cover: book.cover,
          genreId,
          year: book.year,
          pages: book.pages,
          rating: book.rating,
        },
      });
      console.log(`  ✅ Livro "${book.title}" criado com sucesso.`);
    } catch (error) {
      console.error(`❌ Falha ao criar o livro "${book.title}":`, error);
    }
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro geral no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('✅ Conexão Prisma encerrada.');
  });
