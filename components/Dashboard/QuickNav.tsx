'use client';

import { useRouter } from 'next/navigation';

export default function QuickNav() {
  const router = useRouter();

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => router.push('/livros')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ver todos os livros
      </button>
      <button
        onClick={() => router.push('/adicionar')}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Adicionar livro
      </button>
    </div>
  );
}
