"use client";

import { useState } from "react";
import QuickNav from "../Dashboard/QuickNav";

export default function EditBookForm({ book, genres }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    year: book.year || "",
    pages: book.pages || "",
    rating: book.rating || "",
    status: book.status || "QUERO_LER",
    genreId: book.genreId || "",
    cover: book.cover || "",
    synopsis: book.synopsis || "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/books/${book.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          genreId: formData.genreId || undefined,
          year: formData.year ? Number(formData.year) : undefined,
          pages: formData.pages ? Number(formData.pages) : undefined,
          rating: formData.rating ? Number(formData.rating) : undefined,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Erro ao atualizar o livro.");
        setLoading(false);
        return;
      }

      alert("📘 Livro atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <QuickNav />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold mb-2">Editar Livro</h2>

        {error && (
          <p className="text-red-500 text-sm bg-red-100 p-2 rounded">{error}</p>
        )}

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          required
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Autor"
          required
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-2">
          <input
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            placeholder="Ano"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="pages"
            type="number"
            value={formData.pages}
            onChange={handleChange}
            placeholder="Páginas"
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <input
          name="rating"
          type="number"
          min={0}
          max={5}
          value={formData.rating}
          onChange={handleChange}
          placeholder="Nota (0-5)"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
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
          value={formData.genreId}
          onChange={handleChange}
          required
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Selecione um gênero</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <input
          name="cover"
          value={formData.cover}
          onChange={handleChange}
          placeholder="URL da capa"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Preview da imagem da capa */}
        {formData.cover && (
          <div className="my-4 flex justify-center">
            <img
              src={formData.cover}
              alt="Pré-visualização da capa"
              className="rounded-md object-contain h-48 border shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              onLoad={(e) => {
                e.currentTarget.style.display = 'block';
              }}
            />
          </div>
        )}

        <textarea
          name="synopsis"
          value={formData.synopsis}
          onChange={handleChange}
          placeholder="Sinopse"
          rows={4}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}
