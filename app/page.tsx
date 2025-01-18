import { MainInterface } from '@/components/main-interface'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { StartChatButton } from '@/components/start-chat-button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl">PorashonaGPT</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/docs">
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link href="https://github.com/porashonagpt" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to PorashonaGPT</h1>
          <p className="text-xl mb-8">Your AI-powered learning assistant for enhanced productivity and collaboration.</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">Smart Conversations</h2>
              <p>Engage in intelligent discussions and get instant answers to your questions.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">Code Generation</h2>
              <p>Generate code snippets and get help with programming tasks.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">Artifact Management</h2>
              <p>Create, edit, and organize various types of artifacts for your projects.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <StartChatButton />
          </div>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © 2023 PorashonaGPT. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

