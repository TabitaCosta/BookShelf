"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { books, Book } from "@/data/books";
import { genres } from "@/data/genres";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BookDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { id: bookId } = use(params);

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const found = books.find((b) => b.id === bookId) || null;
    setBook(found);
  }, [bookId]);

  if (!book) return <p className="p-6 text-center">Livro não encontrado.</p>;

  const genreName = genres.find((g) => g.id === book.genreId)?.name || "N/A";

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Link href="/books" className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Voltar para a Biblioteca
      </Link>

      <h1 className="text-3xl font-bold mb-6">Detalhes do Livro</h1>

      <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-900/50 p-6 rounded-lg shadow-lg">
        {/* Capa */}
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={book.cover || "/fallback-cover.png"}
            alt={book.title}
            className="w-full h-auto object-cover rounded-md shadow-md aspect-[2/3]"
          />
        </div>

        {/* Detalhes */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-gray-600">por {book.author}</p>

          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
            <p><span className="font-semibold">Gênero:</span> {genreName}</p>

            <p><span className="font-semibold">Ano:</span> {book.year}</p>
            <p><span className="font-semibold">Páginas:</span> {book.pages || "N/A"}</p>
            <p>
              <span className="font-semibold">Avaliação:</span>{" "}
              {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
            </p>
            <p><span className="font-semibold">Status:</span> {book.status || "N/A"}</p>
          </div>

          {book.synopsis && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-1">Sinopse</h3>
              <p className="text-gray-700">{book.synopsis}</p>
            </div>
          )}

          {book.notes && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-1">Minhas Anotações</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{book.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
