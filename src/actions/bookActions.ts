"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

// Schema Zod alinhado com o schema.prisma (genreId como string)
const bookSchema = z.object({
  title: z.string().trim().min(1, "O título é obrigatório"),
  author: z.string().trim().min(1, "O autor é obrigatório"),
  genreId: z.string().min(1, "É necessário selecionar um gênero"),
  status: z.enum(["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"]).default("QUERO_LER"),
  year: z.coerce.number().int().optional().nullable(),
  pages: z.coerce.number().int().optional().nullable(),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  cover: z.string().url("URL da capa inválida").optional().nullable().or(z.literal('')),
  synopsis: z.string().optional().nullable(),
});

export async function createBookAction(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  // Trata campos vazios para que a coerção de número e a validação de URL funcionem corretamente
  if (rawData.year === '') rawData.year = null;
  if (rawData.pages === '') rawData.pages = null;
  if (rawData.rating === '') rawData.rating = null;
  if (rawData.cover === '') rawData.cover = null;
  if (rawData.synopsis === '') rawData.synopsis = null;

  const validated = bookSchema.safeParse(rawData);

  if (!validated.success) {
    console.error(validated.error.flatten().fieldErrors);
    return { error: "Dados inválidos. Verifique os campos e tente novamente." };
  }

  try {
    await prisma.book.create({
      data: validated.data,
    });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    return { error: "Ocorreu um erro no servidor ao tentar salvar o livro." };
  }

  revalidatePath("/library");
  redirect("/library");
}

/**
 * Ação para deletar um livro. Esta função agora está exportada.
 */
export async function deleteBook(id: string) {
  if (!id) {
    return { error: "ID do livro não fornecido." };
  }
  
  try {
    await prisma.book.delete({ where: { id } });
    revalidatePath("/library");
    return { success: "Livro deletado com sucesso." };
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return { error: "Ocorreu um erro no servidor ao tentar deletar o livro." };
  }
}


