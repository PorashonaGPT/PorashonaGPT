'use client'

import * as React from 'react'
import { Artifact } from '@/types/artifact'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from 'next-themes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Mermaid from './mermaid'
import { ResponsiveLine } from '@nivo/line'
import Image from 'next/image'

interface PreviewProps {
  artifacts: Artifact[]
  onUpdateArtifact: (artifact: Artifact) => void
}

export function Preview({ artifacts, onUpdateArtifact }: PreviewProps) {
  const [selectedArtifact, setSelectedArtifact] = React.useState<Artifact | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const { theme } = useTheme()

  React.useEffect(() => {
    if (artifacts.length > 0 && !selectedArtifact) {
      setSelectedArtifact(artifacts[0])
    }
  }, [artifacts, selectedArtifact])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (selectedArtifact) {
      onUpdateArtifact(selectedArtifact)
      setIsEditing(false)
    }
  }

  const renderPreview = () => {
    if (!selectedArtifact) return null

    if (isEditing) {
      return (
        <Textarea
          value={selectedArtifact.content}
          onChange={(e) => setSelectedArtifact({
            ...selectedArtifact,
            content: e.target.value
          })}
          className="w-full h-full font-mono text-sm"
        />
      )
    }

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
        return (
          <SyntaxHighlighter
            language={selectedArtifact.language || 'javascript'}
            style={theme === 'dark' ? oneDark : oneLight}
            className="text-sm h-full overflow-auto"
            showLineNumbers
          >
            {selectedArtifact.content}
          </SyntaxHighlighter>
        )
      case 'flowchart':
        return (
          <Mermaid chart={selectedArtifact.content} />
        )
      case 'dashboard':
        try {
          const data = JSON.parse(selectedArtifact.content)
          return (
            <ResponsiveLine
              data={data}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
              }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]}
            />
          )
        } catch (error) {
          return <div>Invalid dashboard data</div>
        }
      case 'image':
        return (
          <Image
            src={selectedArtifact.content || "/placeholder.svg"}
            alt={selectedArtifact.name}
            layout="fill"
            objectFit="contain"
          />
        )
      default:
        return <div className="p-4">Preview not available for this artifact type.</div>
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-2 border-b">
        <h2 className="text-lg font-semibold">Preview</h2>
        <div className="flex items-center space-x-2">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        {renderPreview()}
      </ScrollArea>
    </div>
  )
}

