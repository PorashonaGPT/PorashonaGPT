'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const allDocs = [
  { title: "Documentation", href: "/docs" },
  { title: "Getting Started", href: "/docs/getting-started" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Project Structure", href: "/docs/project-structure" },
  { title: "Chat Interface", href: "/docs/features/chat" },
  { title: "Code Generation", href: "/docs/features/code-generation" },
  { title: "Artifact Management", href: "/docs/features/artifacts" },
  { title: "Chat API", href: "/docs/api/chat" },
  { title: "Code Generation API", href: "/docs/api/code-generation" },
  { title: "Artifact API", href: "/docs/api/artifacts" },
  { title: "How to Contribute", href: "/docs/contributing" },
  { title: "Code of Conduct", href: "/docs/code-of-conduct" },
  { title: "Development Guide", href: "/docs/development" },
]

export function DocsPager() {
  const pathname = usePathname()
  const currentIndex = allDocs.findIndex((doc) => doc.href === pathname)
  const prev = allDocs[currentIndex - 1]
  const next = allDocs[currentIndex + 1]

  return (
    <div className="flex flex-row items-center justify-between">
      {prev && (
        <Link
          href={prev.href}
          className={cn(buttonVariants({ variant: "ghost" }), "gap-2")}
        >
          <ArrowLeft className="h-4 w-4" />
          {prev.title}
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "ml-auto gap-2"
          )}
        >
          {next.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

