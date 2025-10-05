"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

const bookSchema = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  genreId: z.preprocess(val => Number(val), z.number().positive()),
  status: z.enum(["QUERO_LER","LENDO","LIDO","PAUSADO","ABANDONADO"]).default("QUERO_LER"),
  year: z.string().optional().transform(v => v ? Number(v) : undefined),
  pages: z.string().optional().transform(v => v ? Number(v) : undefined),
  rating: z.string().optional().transform(v => v ? Number(v) : undefined),
  cover: z.string().url().optional(),
  synopsis: z.string().optional(),
});

export async function createBookAction(formData: FormData) {
  const validated = bookSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validated.success) return { error: "Dados inválidos." };

  const { genreId, ...bookData } = validated.data;

  await prisma.book.create({
    data: {
      id: createId(),
      ...bookData,
      genre: { connect: { id: genreId } },
    },
  });

  revalidatePath("/library");
  redirect("/library");
}

export async function deleteBook(id: string) {
  await prisma.book.delete({ where: { id } });
  revalidatePath("/library");
}
