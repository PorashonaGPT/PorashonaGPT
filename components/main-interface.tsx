'use client'

import * as React from 'react'
import { ChatInterface } from './chat-interface'
import { ArtifactPanel } from './artifact-panel'
import { CommandPalette } from './command-palette'
import { useToast } from '@/components/ui/use-toast'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Github, Twitter, Command, PanelLeft, Code2, Share2, BookOpen, Terminal, Eye } from 'lucide-react'
import { Artifact } from '@/types/artifact'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge'
import { useArtifacts } from '@/hooks/use-artifacts'
import { AnimatePresence, motion } from 'framer-motion'
import { Console } from './console'
import { Preview } from './preview'

export function MainInterface() {
  const [isArtifactPanelOpen, setIsArtifactPanelOpen] = React.useState(false)
  const [isCommandOpen, setIsCommandOpen] = React.useState(false)
  const [isConsoleOpen, setIsConsoleOpen] = React.useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const { artifacts, addArtifact, updateArtifact, deleteArtifact, exportArtifacts } = useArtifacts()

  useHotkeys('ctrl+k,cmd+k', (e) => {
    e.preventDefault()
    setIsCommandOpen(true)
  })

  useHotkeys('ctrl+b,cmd+b', () => {
    setIsArtifactPanelOpen(prev => !prev)
  })

  useHotkeys('ctrl+`,cmd+`', () => {
    setIsConsoleOpen(prev => !prev)
  })

  useHotkeys('ctrl+p,cmd+p', () => {
    setIsPreviewOpen(prev => !prev)
  })

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AnimatePresence>
        {isArtifactPanelOpen && (
          <motion.aside 
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-20 w-80 border-r bg-background/80 backdrop-blur-xl md:relative"
          >
            <ArtifactPanel
              artifacts={artifacts}
              onUpdateArtifact={updateArtifact}
              onDeleteArtifact={deleteArtifact}
              onExport={exportArtifacts}
              onClose={() => setIsArtifactPanelOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsArtifactPanelOpen(!isArtifactPanelOpen)}
                className="md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Code2 className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg hidden sm:inline-block">PorashonaGPT</span>
                <Badge variant="secondary" className="hidden sm:inline-flex">Pro</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex"
                onClick={() => setIsCommandOpen(true)}
              >
                <Command className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              >
                <Terminal className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => window.open('https://github.com/porashonagpt', '_blank')}>
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open('https://twitter.com/porashonagpt', '_blank')}>
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open('https://porashonagpt.vercel.app/docs', '_blank')}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Documentation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
          <div className="flex-1 overflow-y-auto">
            <ChatInterface onCreateArtifact={addArtifact} />
          </div>
          <AnimatePresence>
            {isConsoleOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t md:border-l md:border-t-0 bg-background/80 backdrop-blur-xl w-full md:w-1/2 lg:w-1/3"
              >
                <Console artifacts={artifacts} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isPreviewOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t md:border-l md:border-t-0 bg-background/80 backdrop-blur-xl w-full md:w-1/2 lg:w-1/3"
              >
                <Preview artifacts={artifacts} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <CommandPalette 
        open={isCommandOpen}
        onOpenChange={setIsCommandOpen}
        artifacts={artifacts}
        onSelectArtifact={() => setIsArtifactPanelOpen(true)}
      />
    </div>
  )
}

