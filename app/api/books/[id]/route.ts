import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../src/lib/prisma';
import { z } from 'zod';

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 👇 Novo modo de acessar params
    const { id } = await context.params;

    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: "O campo 'title' é obrigatório" },
        { status: 400 }
      );
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title: body.title.trim(),
        author: body.author?.trim() || null,
        year: body.year ? Number(body.year) : null,
        pages: body.pages ? Number(body.pages) : null,
        rating: body.rating ? Number(body.rating) : null,
        status: body.status || "QUERO_LER",
        genreId: body.genreId || null,
        cover: body.cover?.trim() || null,
        synopsis: body.synopsis?.trim() || null,
      },
    });

    return NextResponse.json({
      message: "Livro atualizado com sucesso",
      updated: updatedBook,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar o livro:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar o livro." },
      { status: 500 }
    );
  }
}