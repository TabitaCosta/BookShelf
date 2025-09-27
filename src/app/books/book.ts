export type BookStatus =
  | "QUERO_LER"
  | "LENDO"
  | "LIDO"
  | "PAUSADO"
  | "ABANDONADO"

export type Book = {
  id: string
  title: string
  author: string
  genre?: string
  year?: number
  pages?: number
  rating: number
  synopsis?: string
  cover?: string
  status?: BookStatus
  isbn?: string
  notes?: string
}
