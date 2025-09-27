// components/library/LibraryClient.tsx
"use client";
import React, { useMemo, useState, useEffect } from "react";
import BookCard from "./BookCard";
import { books as initialBooks, type Book } from "../../data/books";

export default function LibraryClient() {
  const [items, setItems] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Todos");

  useEffect(() => {
    const stored = localStorage.getItem("books");
    let allBooks: Book[] = [];

    if (stored) {
      const localBooks = JSON.parse(stored) as Book[];
      const ids = new Set(localBooks.map(b => b.id));
      const mockBooks = initialBooks.filter(b => !ids.has(b.id));
      allBooks = [...localBooks, ...mockBooks];
    } else {
      allBooks = initialBooks;
    }

    setItems(allBooks);
  }, []);

  const genres = useMemo(() => {
    const g = Array.from(
      new Set(initialBooks.map((b) => b.genre).filter(Boolean))
    );
    return ["Todos", ...g];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((b) => {
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      const matchesGenre = genre === "Todos" || b.genre === genre;
      return matchesSearch && matchesGenre;
    });
  }, [items, search, genre]);

  function handleDelete(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <section>
      {/* Controles */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <input
          aria-label="Buscar por título ou autor"
          placeholder="Buscar por título ou autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded border border-gray-200 focus:outline-none"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-56 px-3 py-2 rounded border border-gray-200"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch("");
            setGenre("Todos");
          }}
          className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          Limpar
        </button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum livro encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((b) => (
            <BookCard key={b.id} book={b} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
