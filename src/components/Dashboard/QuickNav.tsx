'use client';

import { useRouter } from 'next/navigation';
import { Book, PlusCircle } from 'lucide-react';

interface QuickNavButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

function QuickNavButton({ label, href, onClick, icon }: QuickNavButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    else if (href) router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {label}
    </button>
  );
}

export default function QuickNav() {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      <QuickNavButton
        label="Ver todos os livros"
        href="/library"
        icon={<Book className="w-5 h-5" />}
      />
      <QuickNavButton
        label="Adicionar livro"
        href="/add"
        icon={<PlusCircle className="w-5 h-5" />}
      />
    </div>
  );
}
