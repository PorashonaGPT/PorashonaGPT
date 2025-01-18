import { Metadata } from 'next'
import { DocsHeader } from '@/components/docs/docs-header'
import { DocsPager } from '@/components/docs/docs-pager'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'Getting Started - PorashonaGPT',
  description: 'Learn how to get started with PorashonaGPT.',
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-6">
      <DocsHeader 
        heading="Getting Started" 
        text="Learn how to get started with PorashonaGPT."
      />
      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Overview</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            PorashonaGPT is an open-source AI platform that helps you generate and manage code artifacts. 
            It provides a modern chat interface powered by advanced language models and features a 
            sophisticated artifact management system.
          </p>
        </section>
        <section>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Quick Start</h2>
          <Tabs defaultValue="npm" className="relative mt-6 w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="npm"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                npm
              </TabsTrigger>
              <TabsTrigger
                value="pnpm"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                pnpm
              </TabsTrigger>
            </TabsList>
            <TabsContent value="npm" className="relative [&_pre]:my-0 [&_pre]:max-h-[350px]">
              <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted py-4">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  npx create-next-app@latest porashona-gpt --typescript --tailwind --eslint
                </code>
              </pre>
            </TabsContent>
            <TabsContent value="pnpm" className="relative [&_pre]:my-0 [&_pre]:max-h-[350px]">
              <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted py-4">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  pnpm create next-app porashona-gpt --typescript --tailwind --eslint
                </code>
              </pre>
            </TabsContent>
          </Tabs>
        </section>
        <section>
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Features</h2>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>Modern chat interface with real-time responses</li>
            <li>Code generation with syntax highlighting</li>
            <li>Artifact management system</li>
            <li>Command palette for quick actions</li>
            <li>Dark mode support</li>
            <li>Responsive design</li>
          </ul>
        </section>
      </div>
      <DocsPager />
    </div>
  )
}

