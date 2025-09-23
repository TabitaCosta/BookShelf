"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { initialBooks } from '@/data/books';
import type { Book } from '@/types/book';

interface BookContextProps {
  books: Book[];
  deleteBook: (id: string) => void;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
}