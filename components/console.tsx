'use client'

import * as React from 'react'
import { Artifact } from '@/types/artifact'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Play, Trash2 } from 'lucide-react'

interface ConsoleProps {
  artifacts: Artifact[]
}

export function Console({ artifacts }: ConsoleProps) {
  const [output, setOutput] = React.useState<string[]>([])
  const [input, setInput] = React.useState('')
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [output])

  const executeCode = () => {
    try {
      const result = new Function(input)()
      setOutput(prev => [...prev, `> ${input}`, String(result)])
    } catch (error) {
      setOutput(prev => [...prev, `> ${input}`, `Error: ${error.message}`])
    }
    setInput('')
  }

  const clearConsole = () => {
    setOutput([])
  }

  return (
    <div className="h-64 flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <h2 className="text-lg font-semibold">Console</h2>
        <Button variant="ghost" size="icon" onClick={clearConsole}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-2 font-mono text-sm">
          {output.map((line, index) => (
            <div key={index} className={index % 2 === 0 ? 'text-blue-500' : ''}>{line}</div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex p-2 border-t">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && executeCode()}
          placeholder="Enter JavaScript code..."
          className="flex-1 mr-2"
        />
        <Button onClick={executeCode}>
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
      </div>
    </div>
  )
}

