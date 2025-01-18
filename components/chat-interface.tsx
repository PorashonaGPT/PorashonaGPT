'use client'

import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Message } from '@/types/chat'
import { Artifact } from '@/types/artifact'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatMessage } from './chat-message'
import { extractCodeBlocks } from '@/lib/code-parser'
import { Send, Loader2, Paperclip, Eraser, RotateCcw, StopCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { motion, AnimatePresence } from 'framer-motion'

interface ChatInterfaceProps {
  onCreateArtifact: (artifact: Artifact) => void
}

export function ChatInterface({ onCreateArtifact }: ChatInterfaceProps) {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isClearDialogOpen, setIsClearDialogOpen] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const abortControllerRef = React.useRef<AbortController | null>(null)
  const { toast } = useToast()

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      id: uuidv4()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      abortControllerRef.current = new AbortController()
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) throw new Error('Failed to fetch response')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader available')

      let assistantMessage = ''
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        assistantMessage += chunk

        const { codeBlocks, cleanText } = extractCodeBlocks(assistantMessage)
        
        setMessages(prev => {
          const newMessages = [...prev]
          const lastMessage = newMessages.find(m => m.id === 'temp-assistant')
          
          if (lastMessage) {
            lastMessage.content = cleanText
          } else {
            newMessages.push({
              role: 'assistant',
              content: cleanText,
              id: 'temp-assistant'
            })
          }
          
          return newMessages
        })

        if (codeBlocks.length > 0) {
          codeBlocks.forEach((block, index) => {
            onCreateArtifact({
              id: uuidv4(),
              type: block.language === 'html' ? 'html' : 'code',
              content: block.code,
              language: block.language,
              name: `Code Snippet ${index + 1} (${block.language})`,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          })
        }
      }

      setMessages(prev => {
        const newMessages = prev.filter(m => m.id !== 'temp-assistant')
        return [...newMessages, {
          role: 'assistant',
          content: assistantMessage,
          id: uuidv4()
        }]
      })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast({
          title: "Generation stopped",
          description: "The response generation was stopped.",
        })
      } else {
        console.error('Error:', error)
        toast({
          title: "Error",
          description: "Failed to generate response. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  const handleClear = () => {
    setMessages([])
    setIsClearDialogOpen(false)
    toast({
      title: "Chat cleared",
      description: "All messages have been cleared.",
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setInput(prev => prev + content)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="flex flex-col h-full p-4">
      <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-4"
          >
            <Loader2 className="h-6 w-6 animate-spin" />
          </motion.div>
        )}
      </ScrollArea>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            accept=".txt,.js,.jsx,.ts,.tsx,.html,.css,.json,.md"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question..."
            className="min-h-[44px] flex-1 resize-none"
            rows={1}
          />
          {isLoading ? (
            <Button type="button" variant="destructive" onClick={handleStop}>
              <StopCircle className="h-4 w-4" />
              <span className="sr-only">Stop generating</span>
            </Button>
          ) : (
            <Button type="submit" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          )}
        </form>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsClearDialogOpen(true)}
          disabled={messages.length === 0}
        >
          <Eraser className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const history = JSON.stringify(messages, null, 2)
            const blob = new Blob([history], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'chat-history.json'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }}
          disabled={messages.length === 0}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Export Chat
        </Button>
      </div>
      <AlertDialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear chat history?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all messages. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear}>Clear</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

