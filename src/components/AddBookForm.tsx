"use client";

import { useState } from "react";
import { createBookAction } from "@/src/actions/bookActions";

export default function AddBookForm({ genres }: { genres: { id: number; name: string }[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await createBookAction(formData);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    // Ação redireciona automaticamente para /library
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold mb-2">Adicionar Novo Livro</h2>

      {error && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded">{error}</p>
      )}

      <input
        name="title"
        placeholder="Título"
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        name="author"
        placeholder="Autor"
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-2">
        <input
          name="year"
          type="number"
          placeholder="Ano"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="pages"
          type="number"
          placeholder="Páginas"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <input
        name="rating"
        type="number"
        placeholder="Nota (0-5)"
        min={0}
        max={5}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        name="status"
        defaultValue="QUERO_LER"
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="QUERO_LER">Quero Ler</option>
        <option value="LENDO">Lendo</option>
        <option value="LIDO">Lido</option>
        <option value="PAUSADO">Pausado</option>
        <option value="ABANDONADO">Abandonado</option>
      </select>

      <select
        name="genreId"
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Selecione um gênero</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      <input
        name="cover"
        placeholder="URL da capa"
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        name="synopsis"
        placeholder="Sinopse"
        rows={4}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
      >
        {loading ? "Salvando..." : "Salvar Livro"}
      </button>
    </form>
  );
}
