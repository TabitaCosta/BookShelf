import { getBooks } from "@/data/books"
import BookCard from "@/components/BookCard"
import SearchAndFilter from "@/components/SearchAndFilter"

interface BooksPageProps {
  searchParams: {
    search?: string
    genre?: string
  }
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  const searchTerm = searchParams.search || ""
  const filterGenre = searchParams.genre || "TODOS"

  const books = await getBooks({
    searchTerm: searchTerm,
    filterGenre: filterGenre,
  })

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sua Biblioteca</h1>

      <SearchAndFilter
        currentSearchTerm={searchTerm}
        currentGenre={filterGenre}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
