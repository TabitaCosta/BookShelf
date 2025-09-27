"use client"

interface SearchAndFilterProps {
  currentSearchTerm: string
  currentGenre: string
}

export default function SearchAndFilter({
  currentSearchTerm,
  currentGenre,
}: SearchAndFilterProps) {
  return (
    <div className="flex gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar por título ou autor..."
        defaultValue={currentSearchTerm}
        className="p-2 border rounded"
      />
    </div>
  )
}
