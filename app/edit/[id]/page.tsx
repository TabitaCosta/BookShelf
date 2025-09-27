"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Book } from "@/data/books"

export default function EditBookPage() {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname.split("/").pop()

  const [booksList, setBooksList] = useState<Book[]>([])
  const [form, setForm] = useState<Partial<Book>>({
    title: "",
    author: "",
    genre: "",
    year: new Date().getFullYear(),
    pages: undefined,
    rating: 0,
    synopsis: "",
    cover: "",
    status: "QUERO_LER",
  })

  useEffect(() => {
    const stored = localStorage.getItem("books")
    const books: Book[] = stored ? JSON.parse(stored) : []
    setBooksList(books)
  }, [])

  useEffect(() => {
    if (!booksList.length || !id) return
    const book = booksList.find((b) => b.id === id)
    if (book) setForm(book)
  }, [booksList, id])

  const genres = Array.from(new Set(booksList.map((b) => b.genre)))
  const statuses: Book["status"][] = [
    "QUERO_LER",
    "LENDO",
    "LIDO",
    "PAUSADO",
    "ABANDONADO",
  ]

  const handleChange = (field: keyof Book, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const isValid =
    form.title &&
    form.author &&
    form.genre &&
    form.year &&
    form.rating &&
    form.status

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || !id) return

    const updatedBooks = booksList.map((b) =>
      b.id === id
        ? { ...b, ...form, year: Number(form.year), rating: form.rating! }
        : b
    )

    setBooksList(updatedBooks)
    localStorage.setItem("books", JSON.stringify(updatedBooks))

    router.push("/library")
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Livro</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Autor"
          value={form.author}
          onChange={(e) => handleChange("author", e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={form.genre}
          onChange={(e) => handleChange("genre", e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecione um gênero</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Ano de publicação"
          value={form.year}
          onChange={(e) => handleChange("year", Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Número de páginas"
          value={form.pages || ""}
          onChange={(e) => handleChange("pages", Number(e.target.value))}
          className="w-full border p-2 rounded"
        />

        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleChange("rating", star)}
              className={`cursor-pointer text-2xl ${
                star <= (form.rating || 0) ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        <select
          value={form.status}
          onChange={(e) =>
            handleChange("status", e.target.value as Book["status"])
          }
          className="w-full border p-2 rounded"
          required
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div>
          <input
            type="url"
            placeholder="URL da capa"
            value={form.cover || ""}
            onChange={(e) => handleChange("cover", e.target.value)}
            className="w-full border p-2 rounded"
          />
          {form.cover && (
            <img
              src={form.cover}
              alt="Preview"
              className="mt-2 w-32 h-48 object-cover rounded border"
            />
          )}
        </div>

        <textarea
          placeholder="Sinopse"
          value={form.synopsis || ""}
          onChange={(e) => handleChange("synopsis", e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
        />

        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded text-white ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
