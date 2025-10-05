"use client";

import StatsCard from "./StatsCard";
import QuickNav from "./QuickNav";
import ThemeToggle from "@/src/components/ThemeToggle";

interface DashboardProps {
  stats: {
    totalLivros: number;
    emLeitura: number;
    finalizados: number;
    paginasLidas: number;
  };
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="p-8 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Top bar com título e toggle de tema */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bookshelf</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total de livros" value={stats.totalLivros} />
        <StatsCard title="Em leitura" value={stats.emLeitura} />
        <StatsCard title="Finalizados" value={stats.finalizados} />
        <StatsCard title="Páginas lidas" value={stats.paginasLidas} />
      </div>

      {/* Navegação rápida */}
      <QuickNav />
    </div>
    
  );
}
