"use client";

// Importa os tipos diretamente do Prisma para garantir consistência
import type { Book, Genre } from "@prisma/client";
import { Eye, Pencil, Trash2 } from "lucide-react";

// O tipo agora representa um Livro com o seu Género já incluído
type BookWithGenre = Book & {
  genre: Genre | null;
};

interface BookCardProps {
  book: BookWithGenre;
  onDelete: (id: string) => void;
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  // Fallback seguro para a imagem da capa
  const imgSrc = book.cover || `https://placehold.co/400x600/eee/31343C?text=${encodeURIComponent(book.title)}`;

  const genreName = book.genre?.name || "N/A";

  // Garante que a avaliação é um número antes de a usar
  const rating = book.rating ?? 0;

  return (
    <article className="rounded-xl shadow-md bg-white flex flex-col hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="w-full h-56 overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={imgSrc}
          alt={`Capa do livro ${book.title}`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg leading-snug flex-grow">{book.title}</h3>
        <p className="text-gray-600 text-sm mt-1">
          {book.author} • {book.year}
        </p>

        <div className="mt-2">
          <span className="inline-block text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
            {genreName}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-3 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>
              {i < rating ? "★" : "☆"}
            </span>
          ))}
        </div>

        <div className="border-t my-4"></div>

        <div className="mt-4 flex gap-4 justify-start">
          <button
            type="button"
            onClick={() => (window.location.href = `/books/${book.id}`)}
            className="text-gray-600 hover:text-blue-600 transition-colors"
            title="Ver"
          >
            <Eye className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => (window.location.href = `/edit/${book.id}`)}
            className="text-gray-600 hover:text-yellow-500 transition-colors"
            title="Editar"
          >
            <Pencil className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (!onDelete) return
              if (confirm(`Excluir "${book.title}"?`)) onDelete(book.id)
            }}
            className="text-gray-600 hover:text-red-600 transition-colors"
            title="Excluir"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </article>
  );
}

