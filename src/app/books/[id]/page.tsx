import { prisma } from '../../../lib/prisma';
import { notFound } from 'next/navigation';

// As props da página agora incluem os "params" da URL, que contêm o ID do livro
interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

// Esta página é agora um Server Component "async", que pode buscar dados diretamente
export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  // 1. Busca um único livro na base de dados usando o ID da URL
  const book = await prisma.book.findUnique({
    where: {
      id: params.id,
    },
    include: {
      genre: true, // Também busca os dados do género relacionado
    },
  });

  // 2. Se o livro não for encontrado, exibe uma página 404
  if (!book) {
    notFound();
  }

  // 3. Renderiza os detalhes do livro encontrado
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={book.cover || 'https://via.placeholder.com/300x450.png?text=Sem+Capa'}
            alt={`Capa do livro ${book.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{book.author}</p>
          
          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="bg-gray-200 px-3 py-1 rounded-full">{book.genre?.name || 'Sem Género'}</span>
            <span>{book.year}</span>
            <span>{book.pages} páginas</span>
          </div>

          <div className="prose max-w-none">
            <h2 className="font-semibold">Sinopse</h2>
            <p>{book.synopsis || 'Sinopse não disponível.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
