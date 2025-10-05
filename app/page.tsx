import StatsCard from '../src/components/Dashboard/StatsCard';
import QuickNav from '../src/components/Dashboard//QuickNav';
import AIRecommender from '../src/components/Dashboard/AIRecommender'; // 1. Importar o novo componente de IA
import { prisma } from '../src/lib/prisma';

/**
 * Busca os dados mais recentes da base de dados, calcula as estatísticas
 * e encontra um livro relevante para as recomendações de IA.
 */
async function getLibraryData() {
  const livros = await prisma.book.findMany({
    orderBy: {
        updatedAt: 'desc' // Ordenar por mais recentemente atualizado
    }
  });

  // Calcular estatísticas
  const finalizados = livros.filter(l => l.status === 'LIDO').length;
  const emLeitura = livros.filter(l => l.status === 'LENDO').length;
  const listaDeDesejos = livros.filter(l => l.status === 'QUERO_LER').length;

  const paginasLidas = livros.reduce((total, livro) => {
    if (livro.status === 'LIDO') return total + (livro.pages || 0);
    if (livro.status === 'LENDO' || livro.status === 'PAUSADO') return total + (livro.currentPage || 0);
    return total;
  }, 0);
  
  // Encontrar o livro mais relevante para usar como base para a IA.
  // A nossa estratégia é: usar o último livro lido, se não houver,
  // usar o livro com a melhor avaliação.
  const baseBook = 
    livros.find(l => l.status === 'LIDO') || 
    [...livros].sort((a,b) => (b.rating || 0) - (a.rating || 0))[0] || 
    null;

  // Retorna tanto as estatísticas como o livro base para a IA
  return { stats: { finalizados, emLeitura, listaDeDesejos, paginasLidas }, baseBook };
}

/**
 * A página principal agora exibe as estatísticas e as recomendações de IA.
 */
export default async function DashboardPage() {
  const { stats, baseBook } = await getLibraryData();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="mb-8">
        <QuickNav />
      </div>

      {/* Layout dividido: estatísticas à esquerda, IA à direita */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatsCard title="Livros Lidos" value={stats.finalizados} />
          <StatsCard title="A Ler Atualmente" value={stats.emLeitura} />
          <StatsCard title="Na Lista de Desejos" value={stats.listaDeDesejos} />
          <StatsCard title="Páginas Lidas" value={stats.paginasLidas} />
        </div>

        {/* 2. Adicionar o componente de recomendações de IA */}
        <div className="lg:col-span-1">
          <AIRecommender baseBook={baseBook} />
        </div>
      </div>
    </div>
  );
}

