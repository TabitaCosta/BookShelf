import { prisma } from "../../../src/lib/prisma";
import EditBookForm from "@/components/ui/form";
import { notFound } from "next/navigation";

export default async function EditBookPage({ params }: { params: { id: string } }) {
  // Busca o livro e os gêneros
  const [book, genres] = await Promise.all([
    prisma.book.findUnique({ where: { id: params.id } }),
    prisma.genre.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!book) {
    notFound();
  }

  return <EditBookForm book={book} genres={genres} />;
}
