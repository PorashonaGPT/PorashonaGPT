'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Code2, Github, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DocsSidebar } from './docs-sidebar'
import { cn } from '@/lib/utils'

export function DocsNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              PorashonaGPT
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/docs"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/docs" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Documentation
            </Link>
            <Link
              href="https://github.com/porashonagpt"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              GitHub
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-4">
      <Link href="/" className="flex items-center space-x-2">
        <Code2 className="h-6 w-6" />
        <span className="font-bold">PorashonaGPT</span>
      </Link>
      <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
        <div className="flex flex-col space-y-3">
          <Link
            href="/docs"
            className={cn(
              "text-sm transition-colors hover:text-foreground/80",
              pathname === "/docs" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Documentation
          </Link>
          <Link
            href="https://github.com/porashonagpt"
            className="text-sm transition-colors hover:text-foreground/80 text-foreground/60"
          >
            GitHub
          </Link>
        </div>
        <DocsSidebar className="px-1" />
      </ScrollArea>
    </div>
  )
}

