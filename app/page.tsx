import BookForm from "@/components/ui/BookForm";

export default function AddBookPage() {
  const mockBookData = {
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    status: "lido" as const,
  };

  return (
    <main className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Editando Livro (Modo de Teste)
        </h1>

        <BookForm initialData={mockBookData} />
      </div>
    </main>
  );
}
