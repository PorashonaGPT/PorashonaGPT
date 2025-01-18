import { Metadata } from 'next'
import { DocsHeader } from '@/components/docs/docs-header'
import { DocsPager } from '@/components/docs/docs-pager'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation - PorashonaGPT',
  description: 'Learn how to use and contribute to PorashonaGPT.',
}

export default function DocsPage() {
  return (
    <div className="container max-w-3xl py-6 lg:py-10">
      <DocsHeader 
        heading="Documentation" 
        text="Learn how to use and contribute to PorashonaGPT."
      />
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <Link
          href="/docs/getting-started"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-auto items-start justify-start px-4 py-8 hover:bg-muted"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
            <ArrowRight className="h-6 w-6" />
          </div>
          <div className="ml-4 text-left">
            <h3 className="font-bold">Getting Started</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              Learn how to get started with PorashonaGPT and set up your development environment.
            </p>
          </div>
        </Link>
        <Link
          href="/docs/features"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-auto items-start justify-start px-4 py-8 hover:bg-muted"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
            <ArrowRight className="h-6 w-6" />
          </div>
          <div className="ml-4 text-left">
            <h3 className="font-bold">Features</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              Explore the features and capabilities of PorashonaGPT.
            </p>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <DocsPager />
      </div>
    </div>
  )
}

