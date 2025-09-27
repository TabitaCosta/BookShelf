import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold inline-block text-lg">Bookshelf</span>
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/books"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Biblioteca
          </Link>
          <Link
            href="/goals"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Metas
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
