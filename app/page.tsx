import StatsCard from '../src/components/Dashboard/StatsCard'; // Caminho corrigido para usar o alias '@/'
import QuickNav from '../src/components/Dashboard/QuickNav';   // Caminho corrigido para usar o alias '@/'
import { prisma } from '../src/lib/prisma';                       // Caminho corrigido para a instância do Prisma

/**
 * Esta função busca os dados mais recentes da base de dados e calcula as estatísticas de leitura.
 * Ela corre no servidor.
 */
async function getLibraryStats() {
  const livros = await prisma.book.findMany();

  // Calculamos as estatísticas de status mais relevantes
  const finalizados = livros.filter(l => l.status === 'LIDO').length;
  const emLeitura = livros.filter(l => l.status === 'LENDO').length;
  const listaDeDesejos = livros.filter(l => l.status === 'QUERO_LER').length;

  // Lógica de cálculo de páginas lidas mais precisa
  const paginasLidas = livros.reduce((total, livro) => {
    // Se o livro está finalizado, soma o total de páginas do livro
    if (livro.status === 'LIDO') {
      return total + (livro.pages || 0);
    }
    // Se está a ser lido ou pausado, soma a página atual
    if (livro.status === 'LENDO' || livro.status === 'PAUSADO') {
      return total + (livro.currentPage || 0);
    }
    return total;
  }, 0);

  return { finalizados, emLeitura, listaDeDesejos, paginasLidas };
}


/**
 * A página principal agora exibe um painel focado no progresso de leitura.
 */
export default async function DashboardPage() {
  // Busca as estatísticas atualizadas cada vez que a página é carregada
  const stats = await getLibraryStats();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Estatísticas de Leitura</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Livros Lidos" value={stats.finalizados} />
        <StatsCard title="A Ler Atualmente" value={stats.emLeitura} />
        <StatsCard title="Na Lista de Desejos" value={stats.listaDeDesejos} />
        <StatsCard title="Páginas Lidas" value={stats.paginasLidas} />
      </div>

      <div className="mt-8">
        <QuickNav />
      </div>
    </div>
  );
}