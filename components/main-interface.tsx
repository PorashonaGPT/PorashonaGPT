'use client'

import * as React from 'react'
import { ChatInterface } from './chat-interface'
import { ArtifactPanel } from './artifact-panel'
import { CommandPalette } from './command-palette'
import { useToast } from '@/components/ui/use-toast'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon, Github, Twitter, Command, PanelLeft, Code2, Share2, BookOpen, Terminal, Eye, Users } from 'lucide-react'
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
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ThemeCustomizer } from './theme-customizer'
import { CollaborationPanel } from './collaboration-panel'
import { ArtifactWindow } from './artifact-window'

export function MainInterface() {
  const [isArtifactPanelOpen, setIsArtifactPanelOpen] = React.useState(true)
  const [isCommandOpen, setIsCommandOpen] = React.useState(false)
  const [isConsoleOpen, setIsConsoleOpen] = React.useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false)
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = React.useState(false)
  const [isCollaborationPanelOpen, setIsCollaborationPanelOpen] = React.useState(false)
  const [openArtifactWindows, setOpenArtifactWindows] = React.useState<string[]>([])
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

  const handleChatStart = () => {
    setIsArtifactPanelOpen(false)
  }

  const handleOpenArtifactWindow = (artifactId: string) => {
    if (!openArtifactWindows.includes(artifactId)) {
      setOpenArtifactWindows(prev => [...prev, artifactId])
    }
  }

  const handleCloseArtifactWindow = (artifactId: string) => {
    setOpenArtifactWindows(prev => prev.filter(id => id !== artifactId))
  }

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <AnimatePresence>
            {isArtifactPanelOpen && (
              <motion.aside 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full border-r bg-background/80 backdrop-blur-xl"
              >
                <ArtifactPanel
                  artifacts={artifacts}
                  onUpdateArtifact={updateArtifact}
                  onDeleteArtifact={deleteArtifact}
                  onExport={exportArtifacts}
                  onOpenWindow={handleOpenArtifactWindow}
                  onClose={() => setIsArtifactPanelOpen(false)}
                />
              </motion.aside>
            )}
          </AnimatePresence>
        </ResizablePanel>
        <ResizablePanel defaultSize={80}>
          <div className="flex flex-col h-full">
            <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsArtifactPanelOpen(!isArtifactPanelOpen)}
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleThemeChange}
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollaborationPanelOpen(!isCollaborationPanelOpen)}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleExternalLink('https://github.com/porashonagpt')}>
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExternalLink('https://twitter.com/porashonagpt')}>
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExternalLink('https://porashonagpt.vercel.app/docs')}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Documentation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>
            <main className="flex-1 overflow-hidden flex">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={60} minSize={30} maxSize={70}>
                  <ChatInterface onCreateArtifact={addArtifact} onChatStart={handleChatStart} />
                </ResizablePanel>
                <ResizablePanel defaultSize={40} minSize={30} maxSize={70}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
                      <AnimatePresence>
                        {isPreviewOpen && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-full border-l bg-background/80 backdrop-blur-xl"
                          >
                            <Preview artifacts={artifacts} onUpdateArtifact={updateArtifact} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ResizablePanel>
                    <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
                      <AnimatePresence>
                        {isConsoleOpen && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-full border-t border-l bg-background/80 backdrop-blur-xl"
                          >
                            <Console artifacts={artifacts} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <CommandPalette 
        open={isCommandOpen}
        onOpenChange={setIsCommandOpen}
        artifacts={artifacts}
        onSelectArtifact={() => setIsArtifactPanelOpen(true)}
      />
      <ThemeCustomizer
        open={isThemeCustomizerOpen}
        onOpenChange={setIsThemeCustomizerOpen}
      />
      <CollaborationPanel
        open={isCollaborationPanelOpen}
        onOpenChange={setIsCollaborationPanelOpen}
        artifacts={artifacts}
      />
      {openArtifactWindows.map(artifactId => (
        <ArtifactWindow
          key={artifactId}
          artifact={artifacts.find(a => a.id === artifactId)!}
          onClose={() => handleCloseArtifactWindow(artifactId)}
          onUpdate={updateArtifact}
        />
      ))}
    </div>
  )
}

