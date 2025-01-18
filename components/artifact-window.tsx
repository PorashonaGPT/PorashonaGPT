'use client'

import * as React from 'react'
import { Artifact } from '@/types/artifact'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useTheme } from 'next-themes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Mermaid from './mermaid'
import { ResponsiveLine } from '@nivo/line'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface ArtifactWindowProps {
  artifact: Artifact
  onClose: () => void
  onUpdate: (artifact: Artifact) => void
}

export function ArtifactWindow({ artifact, onClose, onUpdate }: ArtifactWindowProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const { theme } = useTheme()

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate(artifact)
    setIsEditing(false)
  }

  const renderContent = () => {
    if (isEditing) {
      return (
        <Textarea
          value={artifact.content}
          onChange={(e) => onUpdate({ ...artifact, content: e.target.value })}
          className="w-full h-full font-mono text-sm"
        />
      )
    }

    switch (artifact.type) {
      case 'code':
        return (
          <SyntaxHighlighter
            language={artifact.language || 'javascript'}
            style={theme === 'dark' ? oneDark : oneLight}
            className="text-sm h-full overflow-auto"
            showLineNumbers
          >
            {artifact.content}
          </SyntaxHighlighter>
        )
      case 'html':
        return (
          <iframe
            srcDoc={artifact.content}
            className="w-full h-full border-none"
            title={artifact.name}
          />
        )
      case 'flowchart':
        return <Mermaid chart={artifact.content} />
      case 'dashboard':
        try {
          const data = JSON.parse(artifact.content)
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
            src={artifact.content || "/placeholder.svg"}
            alt={artifact.name}
            layout="fill"
            objectFit="contain"
          />
        )
      default:
        return <div>Unsupported artifact type</div>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <Card className="w-[600px] h-[400px] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {artifact.name}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
          {renderContent()}
        </CardContent>
      </Card>
    </motion.div>
  )
}

