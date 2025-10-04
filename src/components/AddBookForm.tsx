"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createBook } from "@/data/books"

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
  genreId: z.string().min(1, "Gênero é obrigatório"),
  year: z.coerce.number(),
  pages: z.coerce.number().optional().nullable(),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  synopsis: z.string().optional().nullable(),
  cover: z.string().url("URL da capa inválida").optional().or(z.literal("")).nullable(),
  status: z.enum(["QUERO_LER", "LENDO", "LIDO", "PAUSADO", "ABANDONADO"]),
  isbn: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  currentPage: z.coerce.number().optional().nullable(),
})


export async function createBookAction(prevState: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries())

  const processedValues = {
    ...values,
    pages: values.pages || null,
    rating: values.rating || null,
    synopsis: values.synopsis || null,
    cover: values.cover || null,
  }

  const validatedFields = formSchema.safeParse(processedValues)

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors)
    return { error: "Dados inválidos. Verifique os campos e tente novamente." }
  }

  const { genreId, ...bookData } = validatedFields.data;

  try {
    await createBook({
      ...bookData,
      genre: {
        connect: { id: Number(genreId) },
      },
    });
  } catch (error) {
    console.error(error)
    return { error: "Ocorreu um erro ao salvar o livro no banco de dados." }
  }

  revalidatePath("/library")
  redirect("/library")
}


