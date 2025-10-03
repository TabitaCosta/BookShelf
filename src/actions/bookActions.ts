'use server';

import { createBook } from '@/services/bookService';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const bookSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  author: z.string().min(1, 'Autor é obrigatório'),
  genreId: z.string().min(1, 'Gênero é obrigatório'),
  year: z.coerce.number().min(1, 'Ano é obrigatório'),
  pages: z.coerce.number().optional(),
  rating: z.coerce.number().min(0).max(5),
  synopsis: z.string().optional(),
  cover: z.string().url('URL da capa inválida').optional().or(z.literal('')),
  status: z.enum(['QUERO_LER', 'LENDO', 'LIDO', 'PAUSADO', 'ABANDONADO']),
});

export async function createBookAction(formData: FormData) {

  const validatedFields = bookSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return { error: 'Dados inválidos. Verifique os campos.' };
  }

  const { genreId, ...bookData } = validatedFields.data;

  try {
    await createBook({
      ...bookData,
      genre: {
        connect: { id: genreId }, 
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Ocorreu um erro ao salvar o livro no banco de dados.' };
  }

  revalidatePath('/library'); 
  redirect('/library'); 
}