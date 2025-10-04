"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { books, Book } from "@/data/books";
import { genres } from "@/data/genres"; // importando os gêneros

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id: bookId } = use(params); // "desembrulha" a Promise

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const found = books.find(b => b.id === bookId) || null;
    setBook(found);
  }, [bookId]);

  if (!book) {
    return <p className="p-6 text-center">Livro não encontrado.</p>;
  }

  const handleDelete = () => {
    toast.success("Livro excluído!", {
      description: `O livro "${book.title}" foi removido da sua biblioteca.`,
    });
    setTimeout(() => router.push("/books"), 1000);
  };

  // Aqui buscamos o nome do gênero baseado no genreId
  const genreName = genres.find(g => g.id === book.genreId)?.name || "N/A";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/books" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Voltar para a Biblioteca
      </Link>

      <div className="flex gap-6">
        <img
          src={book.cover || "/fallback-cover.png"}
          alt={book.title}
          className="w-48 h-72 object-cover rounded-md shadow-md"
          loading="lazy"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-gray-600">por {book.author}</p>
          <p className="mt-2"><span className="font-semibold">Gênero:</span> {genreName}</p>
          <p><span className="font-semibold">Ano:</span> {book.year}</p>
          <p><span className="font-semibold">Páginas:</span> {book.pages || "N/A"}</p>
          {book.rating && (
            <p className="mt-2">
              <span className="font-semibold">Avaliação:</span>{" "}
              {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
            </p>
          )}
          <p className="mt-2"><span className="font-semibold">Status:</span> {book.status}</p>
        </div>
      </div>

      {book.synopsis && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
          <p className="text-gray-700">{book.synopsis}</p>
        </div>
      )}
    </div>
  );
}
