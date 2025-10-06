import { NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prisma';
import { z } from 'zod';

// Schema de validação para os dados de atualização (todos os campos são opcionais)
const updateBookSchema = z.object({
  title: z.string().trim().min(1, 'Título não pode estar vazio').optional(),
  author: z.string().trim().min(1, 'Autor não pode estar vazio').optional(),
  genreId: z.string().uuid({ message: "ID de gênero inválido" }).optional(), // Corrigido para string UUID
  status: z.enum(['QUERO_LER', 'LENDO', 'LIDO', 'PAUSADO', 'ABANDONADO']).optional(),
  year: z.number().int().optional().nullable(),
  pages: z.number().int().optional().nullable(),
  rating: z.number().min(0).max(5).optional().nullable(),
  cover: z.string().url('URL da capa inválida').optional().nullable(),
  synopsis: z.string().optional().nullable(),
});

/**
 * Lida com pedidos PUT para atualizar um livro existente.
 * No App Router, usamos funções exportadas como PUT, GET, POST, etc.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Valida os dados recebidos com o Zod
    const validatedData = updateBookSchema.parse(body);

    const updatedBook = await prisma.book.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar o livro:", error);

    // Se a validação do Zod falhar, retorna um erro 400
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados de entrada inválidos', details: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: 'Ocorreu um erro interno ao atualizar o livro' }, { status: 500 });
  }
}