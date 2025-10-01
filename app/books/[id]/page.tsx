"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
// import { StarsRating } from "@/components/StarsRating";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { useBookContext } from "@/context/BookContext";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BookDetailsPageProps {
  params: {
    id: string;
  };
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  const router = useRouter();
  // const { books, deleteBook } = useBookContext();
  // const book = books.find((b) => b.id === params.id);

  const book = {
    id: params.id,
    title: "Carregando Título...",
    author: "Carregando Autor...",
    cover: "/fallback-cover.png",
    genre: "N/A",
    year: 2025,
    pages: 0,
    rating: 4,
    synopsis: "Carregando sinopse...",
  };

  if (!book) {
    return <div className="p-6">Livro não encontrado.</div>;
  }

  const handleDelete = () => {
    // deleteBook(book.id);
    toast.success("Livro excluído!", {
      description: `O livro "${book.title}" foi removido da sua biblioteca.`,
    });
    setTimeout(() => router.push("/books"), 1000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link
        href="/books"
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
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
          <p className="mt-2">
            <span className="font-semibold">Gênero:</span> {book.genre}
          </p>
          <p>
            <span className="font-semibold">Ano:</span> {book.year}
          </p>
          <p>
            <span className="font-semibold">Páginas:</span> {book.pages}
          </p>
          {book.rating !== undefined && (
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold">Avaliação:</span>
              {/* <StarsRating rating={book.rating} /> */}
              <span className="text-gray-600">({book.rating} estrelas)</span>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <Link
              href={`/books/${book.id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Editar
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Excluir
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tem certeza absoluta?</DialogTitle>
                  <DialogDescription>
                    Esta ação não pode ser desfeita. Isso removerá
                    permanentemente o livro <strong>{book.title}</strong> da sua
                    biblioteca.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancelar
                    </button>
                  </DialogClose>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Sim, excluir livro
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
        <p className="text-gray-700">{book.synopsis}</p>
      </div>
    </div>
  );
}
