// components/library/BookCard.tsx
"use client";
import React from "react";
import type { Book } from "../../data/books";
import { useRouter } from "next/navigation";

type Props = {
  book: Book;
  onDelete?: (id: string) => void;
};

export default function BookCard({ book, onDelete }: Props) {
  const router = useRouter();
  const imgSrc =
    book.cover && book.cover.trim() !== "" ? book.cover : "/default-cover.png";

  return (
    <article className="rounded-xl shadow-md p-4 bg-white flex flex-col hover:shadow-lg transition">
      <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={imgSrc}
          alt={`Capa do livro ${book.title}`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-lg leading-snug">{book.title}</h3>
        <p className="text-gray-600 text-sm mt-1">
          {book.author} • {book.year}
        </p>

        <div className="mt-2">
          <span className="inline-block text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
            {book.genreId}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-sm">
              {i < book.rating ? "⭐" : "☆"}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => router.push(`/books/${book.id}`)}
          className="flex-1 text-center px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
        >
          Ver
        </button>
        <button
          type="button"
          onClick={() => router.push(`/edit/${book.id}`)}
          className="flex-1 text-center px-3 py-2 rounded bg-yellow-200 hover:bg-yellow-300 text-sm"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => {
            if (!onDelete) return;
            if (confirm(`Excluir "${book.title}"?`)) onDelete(book.id);
          }}
          className="flex-1 text-center px-3 py-2 rounded bg-red-200 hover:bg-red-300 text-sm"
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
