import { NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prisma';
import { z } from 'zod';

// Schema de validação para os dados de atualização
const updateBookSchema = z.object({
  title: z.string().trim().min(1, 'Título não pode estar vazio').optional(),
  author: z.string().trim().min(1, 'Autor não pode estar vazio').optional(),
  
  // Corrigido: Coage o genreId para string para corresponder à expectativa do erro.
  genreId: z.coerce.string().optional(),

  status: z.enum(['QUERO_LER', 'LENDO', 'LIDO', 'PAUSADO', 'ABANDONADO']).optional(),
  year: z.coerce.number().int().optional().nullable(),
  pages: z.coerce.number().int().optional().nullable(),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  cover: z.string().url('URL da capa inválida').optional().nullable(),
  synopsis: z.string().optional().nullable(),
});

/**
 * Lida com pedidos PUT para atualizar um livro existente.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    // Valida os dados recebidos com o Zod
    const validatedData = updateBookSchema.parse(body);

    // Converte o genreId validado de volta para número antes de enviar ao Prisma
    const dataForPrisma = {
        ...validatedData,
        genreId: validatedData.genreId ? Number(validatedData.genreId) : undefined,
    };

    const updatedBook = await prisma.book.update({
      where: { id },
      data: dataForPrisma,
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

