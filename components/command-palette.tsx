'use client'

import * as React from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useTheme } from 'next-themes'
import { Artifact } from '@/types/artifact'
import { Code, FileText, Moon, Sun, Github, Twitter, Search, PanelLeft, BookOpen } from 'lucide-react'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  artifacts: Artifact[]
  onSelectArtifact: () => void
}

export function CommandPalette({
  open,
  onOpenChange,
  artifacts,
  onSelectArtifact,
}: CommandPaletteProps) {
  const { setTheme } = useTheme()

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => {
            onSelectArtifact()
            onOpenChange(false)
          }}>
            <PanelLeft className="mr-2 h-4 w-4" />
            Open Artifacts Panel
          </CommandItem>
          <CommandItem onSelect={() => {
            setTheme('light')
            onOpenChange(false)
          }}>
            <Sun className="mr-2 h-4 w-4" />
            Light Mode
          </CommandItem>
          <CommandItem onSelect={() => {
            setTheme('dark')
            onOpenChange(false)
          }}>
            <Moon className="mr-2 h-4 w-4" />
            Dark Mode
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => {
            window.open('https://github.com/porashonagpt', '_blank')
            onOpenChange(false)
          }}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </CommandItem>
          <CommandItem onSelect={() => {
            window.open('https://twitter.com/porashonagpt', '_blank')
            onOpenChange(false)
          }}>
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </CommandItem>
          <CommandItem onSelect={() => {
            window.open('https://porashonagpt.vercel.app/docs', '_blank')
            onOpenChange(false)
          }}>
            <BookOpen className="mr-2 h-4 w-4" />
            Documentation
          </CommandItem>
        </CommandGroup>
        {artifacts.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Artifacts">
              {artifacts.map((artifact) => (
                <CommandItem
                  key={artifact.id}
                  onSelect={() => {
                    onSelectArtifact()
                    onOpenChange(false)
                  }}
                >
                  {artifact.type === 'html' ? (
                    <FileText className="mr-2 h-4 w-4" />
                  ) : (
                    <Code className="mr-2 h-4 w-4" />
                  )}
                  {artifact.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}

