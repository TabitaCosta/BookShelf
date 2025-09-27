import StatsCard from "./StatsCard"
import QuickNav from "./QuickNav"

interface DashboardProps {
  stats: {
    totalLivros: number
    emLeitura: number
    finalizados: number
    paginasLidas: number
  }
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bookshelf</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Total de livros" value={stats.totalLivros} />
        <StatsCard title="Em leitura" value={stats.emLeitura} />
        <StatsCard title="Finalizados" value={stats.finalizados} />
        <StatsCard title="Páginas lidas" value={stats.paginasLidas} />
      </div>

      <QuickNav />
    </div>
  )
}
