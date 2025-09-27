import { getBookById } from "@/data/books"
import { BackButton } from "@/components/BackButton"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/Breadcrumbs"
interface BookDetailsPageProps {
  params: {
    id: string
  }
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  const bookId = params.id
  const book = await getBookById(bookId)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <Breadcrumbs bookTitle={book.title} />
      <BackButton />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex gap-6">
          <img
            src={book.cover || "/fallback-cover.png"}
            alt={book.title}
            className="w-48 h-72 object-cover rounded-md shadow-md"
          />

          <div>
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
            <p className="mt-2">
              <span className="font-semibold">Avaliação:</span>{" "}
              {book.rating?.toFixed(1) || "N/A"} ⭐
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Sinopse</h2>
          <p className="text-gray-700">{book.synopsis}</p>
        </div>
      </div>
    </div>
  )
}
