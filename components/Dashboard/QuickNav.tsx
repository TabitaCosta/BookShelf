"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, BookOpen } from "lucide-react";

export default function QuickNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: Home, color: "white", border: true },
    { href: "/add", label: "Novo Livro", icon: PlusCircle, color: "blue" },
    { href: "/library", label: "Biblioteca", icon: BookOpen, color: "white", border: true },
  ];

  return (
    <nav className="flex justify-center sm:justify-start gap-3 mb-6 flex-wrap">
      {links.map(({ href, label, icon: Icon, color, border }) => {
        if (pathname === href) return null; 

        const isBlue = color === "blue";
        const baseClasses =
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition";
        const style = isBlue
          ? "bg-blue-500 text-white shadow hover:bg-blue-600"
          : border
          ? "bg-white border shadow-sm hover:shadow-md"
          : "bg-gray-100 hover:bg-gray-200";

        return (
          <Link
            key={href}
            href={href}
            className={`${baseClasses} ${style}`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
