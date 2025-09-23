import type { Book } from "@/types/book";

export const initialBooks: Book[] = [
  {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    genre: "Literatura Brasileira",
    year: 1899,
    pages: 256,
    rating: 4.5,
    synopsis:
      "Um dos grandes clássicos da literatura brasileira, que trata de ciúme, memória e dúvida na narrativa de Bentinho.",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/6/6f/DomCasmurro.jpg",
    status: "LIDO",
    isbn: "978-85-XXX-XXXX",
  },
];

export function getBookById(id: string): Book | undefined {
  return initialBooks.find((b) => b.id === id);
}
