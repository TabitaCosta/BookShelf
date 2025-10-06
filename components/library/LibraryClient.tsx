"use client";

import React, { useMemo, useState } from "react";
import BookCard from "./BookCard";
import QuickNav from "../Dashboard/QuickNav";
import { deleteBook } from "@/src/actions/bookActions";

type Genre = {
  id: number;
  name: string;
};

type BookWithGenre = {
  id: string;
  title: string;
  author: string;
  year: number;
  pages: number;
  rating: number;
  synopsis?: string;
  cover?: string;
  genre: Genre | null;
  genreId: number;
  createdAt: string;
  updatedAt: string;
};

interface LibraryClientProps {
  initialBooks: BookWithGenre[];
}

export default function LibraryClient({ initialBooks }: LibraryClientProps) {
  const [items, setItems] = useState<BookWithGenre[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Todos");

  const genres = useMemo(() => {
    const g = Array.from(
      new Set((initialBooks || []).map((b) => b.genre?.name).filter(Boolean))
    );
    return ["Todos", ...g];
  }, [initialBooks]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((b) => {
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q);
      const matchesGenre = genre === "Todos" || b.genre?.name === genre;
      return matchesSearch && matchesGenre;
    });
  }, [items, search, genre]);

  async function handleDelete(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
    await deleteBook(id);
  }

  return (
    <section className="p-8 max-w-7xl mx-auto">
      <QuickNav />
      <div className="mt-6 mb-8 flex flex-col sm:flex-row items-center gap-3">
        <input
          aria-label="Buscar por título ou autor"
          placeholder="Buscar por título ou autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-56 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
        >
          Limpar
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          Nenhum livro encontrado.
        </p>
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
