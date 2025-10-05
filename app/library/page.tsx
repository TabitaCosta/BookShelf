import { prisma }from '../../src/lib/prisma';
import LibraryClient from '@/components/library/LibraryClient';
import { Suspense } from 'react';

// Esta página agora é responsável por buscar TODOS os dados necessários
export default async function LibraryPage() {
  // 1. Busca todos os livros no banco de dados, incluindo o género relacionado
  const books = await prisma.book.findMany({
    include: {
      genre: true, // Inclui os dados do género para cada livro
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // 2. Busca a lista completa de todos os géneros
  const genres = await prisma.genre.findMany();

  // 3. Passa AMBAS as listas para o componente de cliente
  return (
    <div className="container mx-auto p-4 md:p-8">
      <Suspense fallback={<p>A carregar biblioteca...</p>}>
        <LibraryClient initialBooks={books} genres={genres} />
      </Suspense>
    </div>
  );
}
