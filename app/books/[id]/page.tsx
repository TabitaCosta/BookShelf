import { prisma } from '../../../src/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pencil } from 'lucide-react';

// As props da página incluem os "params" da URL, que contêm o ID do livro
interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Esta página é um Server Component "async", que pode buscar dados diretamente
export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  // Await params antes de usar
  const { id } = await params;

  // 1. Busca um único livro na base de dados usando o ID da URL
  const book = await prisma.book.findUnique({
    where: {
      id: id,
    },
    include: {
      genre: true, // Também busca os dados do género relacionado
    },
  });

  // 2. Se o livro não for encontrado, exibe uma página 404
  if (!book) {
    notFound();
  }

  const rating = book.rating ?? 0;

  // 3. Renderiza os detalhes do livro encontrado
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/library" passHref>
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a Biblioteca
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <img
            src={book.cover || `https://placehold.co/400x600/eee/31343C?text=${encodeURIComponent(book.title)}`}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{book.author}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <span className="bg-gray-200 px-3 py-1 rounded-full">{book.genre?.name || 'Sem Género'}</span>
            <span>{book.year}</span>
            <span>{book.pages} páginas</span>
            <div className="flex items-center gap-1 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <h2 className="font-semibold text-lg">Sinopse</h2>
            <p>{book.synopsis || 'Sinopse não disponível.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}