// app/library/page.tsx
import React from "react";
import LibraryClient from "../../components/library/LibraryClient";

export default function LibraryPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Biblioteca Pessoal</h1>
      <LibraryClient />
    </main>
  );
}
