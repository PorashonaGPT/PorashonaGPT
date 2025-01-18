'use client'

import * as React from 'react'
import { Artifact } from '@/types/artifact'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PreviewProps {
  artifacts: Artifact[]
}

export function Preview({ artifacts }: PreviewProps) {
  const [selectedArtifact, setSelectedArtifact] = React.useState<Artifact | null>(null)

  React.useEffect(() => {
    if (artifacts.length > 0 && !selectedArtifact) {
      setSelectedArtifact(artifacts[0])
    }
  }, [artifacts, selectedArtifact])

  const renderPreview = () => {
    if (!selectedArtifact) return null

    switch (selectedArtifact.type) {
      case 'html':
        return (
          <iframe
            srcDoc={selectedArtifact.content}
            className="w-full h-full border-none"
            title={selectedArtifact.name}
          />
        )
      case 'code':
        if (selectedArtifact.language === 'javascript') {
          try {
            // eslint-disable-next-line no-new-func
            const result = new Function(selectedArtifact.content)()
            return <div className="p-4">{String(result)}</div>
          } catch (error) {
            return <div className="p-4 text-red-500">Error: {error.message}</div>
          }
        }
        return <pre className="p-4">{selectedArtifact.content}</pre>
      default:
        return <div className="p-4">Preview not available for this artifact type.</div>
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <h2 className="text-lg font-semibold">Preview</h2>
        <Select
          value={selectedArtifact?.id}
          onValueChange={(value) => setSelectedArtifact(artifacts.find(a => a.id === value) || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an artifact" />
          </SelectTrigger>
          <SelectContent>
            {artifacts.map((artifact) => (
              <SelectItem key={artifact.id} value={artifact.id}>
                {artifact.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="flex-1">
        {renderPreview()}
      </ScrollArea>
    </div>
  )
}

