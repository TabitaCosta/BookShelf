
'use client';

import type { Genre } from '@prisma/client';
import { createBookAction } from '@/actions/bookActions';

export function AddBookForm({ genres }: { genres: Genre[] }) {
  
  const statuses = [
    'QUERO_LER', 'LENDO', 'LIDO', 'PAUSADO', 'ABANDONADO'
  ] as const;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Adicionar Livro</h1>

      <form action={createBookAction} className="space-y-4">
        <input name="title" placeholder="Título" required className="w-full border p-2 rounded" />
        <input name="author" placeholder="Autor" required className="w-full border p-2 rounded" />

        <select name="genreId" required className="w-full border p-2 rounded">
          <option value="">Selecione um gênero</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        
        <input name="year" type="number" placeholder="Ano de Publicação" defaultValue={new Date().getFullYear()} required className="w-full border p-2 rounded" />
        <input name="pages" type="number" placeholder="Nº de páginas" className="w-full border p-2 rounded" />
        <input name="rating" type="number" placeholder="Nota (0-5)" defaultValue={0} min={0} max={5} className="w-full border p-2 rounded" />
        <input name="cover" type="url" placeholder="URL da capa" className="w-full border p-2 rounded" />

        <select name="status" defaultValue="QUERO_LER" required className="w-full border p-2 rounded">
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        
        <textarea name="synopsis" placeholder="Sinopse" rows={4} className="w-full border p-2 rounded" />
        
        <button type="submit" className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700">
          Salvar Livro
        </button>
      </form>
    </div>
  );
}