import StatsCard from './StatsCard';
import QuickNav from './QuickNav';
import ThemeToggle from '@/src/components/ThemeToggle';

interface Livro {
  id: number;
  titulo: string;
  status: 'leitura' | 'finalizado' | 'pendente';
  paginasLidas: number;
}

// Dados de exemplo
const livros: Livro[] = [
  { id: 1, titulo: 'Livro A', status: 'leitura', paginasLidas: 100 },
  { id: 2, titulo: 'Livro B', status: 'finalizado', paginasLidas: 300 },
  { id: 3, titulo: 'Livro C', status: 'leitura', paginasLidas: 50 },
];

export default function Dashboard() {
  const totalLivros = livros.length;
  const emLeitura = livros.filter(l => l.status === 'leitura').length;
  const finalizados = livros.filter(l => l.status === 'finalizado').length;
  const paginasLidas = livros.reduce((acc, l) => acc + l.paginasLidas, 0);

  return (
    <div className="p-8">
      {/* Cabeçalho com título e ThemeToggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bookshelf</h1>
        <ThemeToggle />
      </div>

      {/* Navegação rápida */}
      <QuickNav />

      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatsCard title="Total de livros" value={totalLivros} />
        <StatsCard title="Em leitura" value={emLeitura} />
        <StatsCard title="Finalizados" value={finalizados} />
        <StatsCard title="Páginas lidas" value={paginasLidas} />
      </div>
    </div>
  );
}
