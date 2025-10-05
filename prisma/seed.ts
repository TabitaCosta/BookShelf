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
  console.log('✅ Iniciando o script de migração de dados...');

  // 1. Processar Géneros
  try {
    const genresPath = path.join(__dirname, '../data/genres.json');
    const genreNames: string[] = JSON.parse(fs.readFileSync(genresPath, 'utf-8'));
    
    for (const name of genreNames) {
      await prisma.genre.upsert({
        where: { name: name },
        update: {},
        create: { name: name },
      });
    }
    console.log('✅ Géneros processados com sucesso.');
  } catch (error) {
    console.error('❌ Erro ao processar géneros:', error);
    process.exit(1);
  }

  // 2. Processar Livros com todos os campos
  try {
    const allGenres = await prisma.genre.findMany();
    const genreMap = new Map(allGenres.map(g => [g.name, g.id]));

    const booksPath = path.join(__dirname, '../data/books.json');
    const oldBooks: OldBook[] = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));
    console.log(`ℹ️  Encontrados ${oldBooks.length} livros para migrar.`);

    for (const book of oldBooks) {
      const genreId = genreMap.get(book.genre);

      try {
        await prisma.book.create({
          data: {
            id: book.id,
            title: book.title,
            author: book.author,
            synopsis: book.synopsis,
            cover: book.cover,
            genreId: genreId,
            year: book.year,
            pages: book.pages,
            rating: book.rating,
          },
        });
        console.log(`  ✅ Livro "${book.title}" criado com sucesso.`);
      } catch (error) {
        // Apanha o erro para um livro específico e continua
        console.error(`❌ Falha ao criar o livro "${book.title}".`);
      }
    }
    console.log('✅ Migração de livros concluída.');

  } catch (error) {
    console.error('❌ Erro ao processar livros:', error);
  }
}

main()
  .catch((e) => {
    console.error('❌ Ocorreu um erro geral no script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('✅ Script finalizado.');
  });