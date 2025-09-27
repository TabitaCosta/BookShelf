import type { Book } from "@/types/book"

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3>{book.title}</h3>
      <p className="text-sm">{book.author}</p>
    </div>
  )
}
