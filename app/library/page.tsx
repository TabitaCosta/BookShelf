import { prisma }from '../../src/lib/prisma';
import LibraryClient from '@/components/library/LibraryClient';
import { Suspense } from 'react';

export default async function LibraryPage() {
  const books = await prisma.book.findMany({
    include: {
      genre: true, 
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const genres = await prisma.genre.findMany();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Suspense fallback={<p>A carregar biblioteca...</p>}>
        <LibraryClient initialBooks={books} genres={genres} />
      </Suspense>
    </div>
  );
}
