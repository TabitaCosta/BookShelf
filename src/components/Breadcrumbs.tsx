"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

const formatSegment = (segment: string) => {
  if (segment === "books") return "Biblioteca"
  if (segment === "home" || segment === "") return "Home"

  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
}

interface BreadcrumbsProps {
  bookTitle?: string
}

export function Breadcrumbs({ bookTitle }: BreadcrumbsProps) {
  const pathname = usePathname()
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0)
  let currentPath = ""

  return (
    <nav className="flex items-center text-sm mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="text-gray-500 hover:text-foreground/80">
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          currentPath += `/${segment}`
          const isLast = index === pathSegments.length - 1
          const displaySegment =
            isLast && bookTitle ? bookTitle : formatSegment(segment)

          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />

              {isLast ? (
                <span className="text-foreground font-medium truncate max-w-xs block">
                  {displaySegment}
                </span>
              ) : (
                <Link
                  href={currentPath}
                  className="text-gray-500 hover:text-foreground/80"
                >
                  {displaySegment}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
