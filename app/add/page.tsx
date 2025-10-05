import { prisma } from '../../src/lib/prisma';
import AddBookForm from '../../src/components/AddBookForm';
import QuickNav from '../../src/components/Dashboard/QuickNav'; // Importa o QuickNav
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function AddBookPage() {
  // Busca os géneros do banco de dados para passar ao formulário
  const genres = await prisma.genre.findMany({
    orderBy: { name: "asc" },
  });

  return (
    // Usamos um container para centrar e limitar a largura, como no Dashboard
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      {/* Adiciona o componente de navegação rápida com espaçamento abaixo */}
      <div className="mb-8">
        <QuickNav />
      </div>

      {/* Envolvemos o formulário num Card para uma aparência mais limpa e moderna */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Adicionar Novo Livro</CardTitle>
        </CardHeader>
        <CardContent>
          <AddBookForm genres={genres} />
        </CardContent>
      </Card>
    </div>
  );
}

