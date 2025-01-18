'use client'

import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Artifact } from '@/types/artifact'
import { FileText, Trash2, Download, Search, Code, X, Plus, Filter, SortAsc, SortDesc, Edit, Play, Share2, BarChart2, Image, Maximize2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'

interface ArtifactPanelProps {
  artifacts: Artifact[]
  onUpdateArtifact: (artifact: Artifact) => void
  onDeleteArtifact: (id: string) => void
  onExport: () => void
  onOpenWindow: (id: string) => void
  onClose?: () => void
}

export function ArtifactPanel({
  artifacts,
  onUpdateArtifact,
  onDeleteArtifact,
  onExport,
  onOpenWindow,
  onClose
}: ArtifactPanelProps) {
  const [selectedArtifact, setSelectedArtifact] = React.useState<Artifact | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [sortBy, setSortBy] = React.useState<'name' | 'type' | 'date'>('date')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc')
  const [filterType, setFilterType] = React.useState<string | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const { theme } = useTheme()

  const filteredAndSortedArtifacts = React.useMemo(() => {
    let result = artifacts.filter(artifact =>
      artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artifact.content.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (filterType) {
      result = result.filter(artifact => artifact.type === filterType)
    }

    return result.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'type':
          comparison = a.type.localeCompare(b.type)
          break
        case 'date':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          break
      }
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [artifacts, searchQuery, sortBy, sortDirection, filterType])

  const uniqueTypes = React.useMemo(() => {
    return Array.from(new Set(artifacts.map(a => a.type)))
  }, [artifacts])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (selectedArtifact) {
      onUpdateArtifact(selectedArtifact)
      setIsEditing(false)
    }
  }

  const handleRun = () => {
    if (selectedArtifact && selectedArtifact.type === 'code' && selectedArtifact.language === 'javascript') {
      try {
        // eslint-disable-next-line no-new-func
        const result = new Function(selectedArtifact.content)()
        console.log('Execution result:', result)
      } catch (error) {
        console.error('Execution error:', error)
      }
    }
  }

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case 'code':
        return <Code className="mr-2 h-4 w-4" />
      case 'html':
        return <FileText className="mr-2 h-4 w-4" />
      case 'flowchart':
        return <Share2 className="mr-2 h-4 w-4" />
      case 'dashboard':
        return <BarChart2 className="mr-2 h-4 w-4" />
      case 'image':
        return <Image className="mr-2 h-4 w-4" />
      default:
        return <FileText className="mr-2 h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Artifacts</h2>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search artifacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  {filterType ? filterType : 'All Types'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterType(null)}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {uniqueTypes.map(type => (
                  <DropdownMenuItem key={type} onClick={() => setFilterType(type)}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  {sortDirection === 'asc' ? (
                    <SortAsc className="h-4 w-4 mr-2" />
                  ) : (
                    <SortDesc className="h-4 w-4 mr-2" />
                  )}
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy('name')}>
                  By Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('type')}>
                  By Type
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('date')}>
                  By Date
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortDirection(
                  sortDirection === 'asc' ? 'desc' : 'asc'
                )}>
                  {sortDirection === 'asc' ? 'Descending' : 'Ascending'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <AnimatePresence>
          {filteredAndSortedArtifacts.map((artifact) => (
            <motion.div
              key={artifact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant={selectedArtifact?.id === artifact.id ? "secondary" : "ghost"}
                className="w-full justify-start p-2"
                onClick={() => setSelectedArtifact(artifact)}
              >
                {getArtifactIcon(artifact.type)}
                <span className="truncate flex-1">{artifact.name}</span>
                <Badge variant="outline" className="ml-2">
                  {artifact.language || artifact.type}
                </Badge>
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredAndSortedArtifacts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? (
              <p>No artifacts found matching your search.</p>
            ) : (
              <div className="space-y-2">
                <p>No artifacts yet.</p>
                <p className="text-sm">Start a conversation to generate artifacts.</p>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
      {selectedArtifact && (
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{selectedArtifact.name}</h3>
            <div className="flex gap-2">
              {selectedArtifact.type === 'code' && selectedArtifact.language === 'javascript' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRun}
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={isEditing ? handleSave : handleEdit}
              >
                {isEditing ? (
                  <Download className="h-4 w-4" />
                ) : (
                  <Edit className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenWindow(selectedArtifact.id)}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteArtifact(selectedArtifact.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative rounded-md overflow-hidden">
            {isEditing ? (
              <textarea
                value={selectedArtifact.content}
                onChange={(e) => setSelectedArtifact({
                  ...selectedArtifact,
                  content: e.target.value
                })}
                className="w-full h-64 p-2 font-mono text-sm bg-muted"
              />
            ) : (
              <SyntaxHighlighter
                language={selectedArtifact.language || 'javascript'}
                style={theme === 'dark' ? oneDark : oneLight}
                className="text-sm max-h-64 overflow-auto"
                showLineNumbers
              >
                {selectedArtifact.content}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      )}
      <div className="p-4 border-t">
        <Button onClick={onExport} className="w-full" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export All Artifacts
        </Button>
      </div>
    </div>
  )
}

