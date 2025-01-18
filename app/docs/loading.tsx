import { DocsHeader } from '@/components/docs/docs-header'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-6">
      <DocsHeader 
        heading="Loading..." 
        text="Please wait while we load the documentation."
      />
      <div className="space-y-8">
        <section>
          <Skeleton className="h-8 w-[200px] mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-[90%] mb-2" />
          <Skeleton className="h-4 w-[95%]" />
        </section>
        <section>
          <Skeleton className="h-8 w-[180px] mb-4" />
          <Skeleton className="h-[200px] w-full mb-4 rounded-lg" />
        </section>
        <section>
          <Skeleton className="h-8 w-[150px] mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[75%]" />
            <Skeleton className="h-4 w-[82%]" />
          </div>
        </section>
      </div>
    </div>
  )
}

