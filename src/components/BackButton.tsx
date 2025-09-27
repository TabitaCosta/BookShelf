"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.back()}
      className="flex items-center gap-1 text-sm text-gray-500 hover:text-foreground/80"
    >
      <ChevronLeft className="h-4 w-4" />
      Voltar para a Biblioteca
    </Button>
  )
}
