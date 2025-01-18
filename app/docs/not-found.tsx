import Link from 'next/link'
import { FileQuestion } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mb-8 mt-2 text-muted-foreground">
        Sorry, we couldn't find the documentation page you're looking for.
      </p>
      <Link
        href="/docs"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-muted-foreground"
        )}
      >
        Go to Documentation
      </Link>
    </div>
  )
}

