import { NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prisma';
import { z } from 'zod';

// Schema de validação para os dados de atualização (todos os campos são opcionais)
const updateBookSchema = z.object({
  title: z.string().trim().min(1, 'Título não pode estar vazio').optional(),
  author: z.string().trim().min(1, 'Autor não pode estar vazio').optional(),
  
  // 🔧 THE FIX IS HERE: Change z.number() to z.string() to match your Prisma schema
  genreId: z.string().trim().min(1, 'ID do gênero não pode estar vazio').optional(),

  status: z.enum(['QUERO_LER', 'LENDO', 'LIDO', 'PAUSADO', 'ABANDONADO']).optional(),
  year: z.number().int().optional().nullable(),
  pages: z.number().int().optional().nullable(),
  rating: z.number().min(0).max(5).optional().nullable(),
  cover: z.string().url('URL da capa inválida').optional().nullable(),
  synopsis: z.string().optional().nullable(),
});

/**
 * Lida com pedidos PUT para atualizar um livro existente.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } } // This part is now correct!
) {
  try {
    const id = params.id;
    const body = await request.json();

    const validatedData = updateBookSchema.parse(body);

    const updatedBook = await prisma.book.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar o livro:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados de entrada inválidos', details: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: 'Ocorreu um erro interno ao atualizar o livro' }, { status: 500 });
  }
}