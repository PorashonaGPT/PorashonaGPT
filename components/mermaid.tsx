'use client'

import * as React from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = React.useState<string>('')

  React.useEffect(() => {
    mermaid.initialize({ startOnLoad: true })
    mermaid.render('mermaid-chart', chart).then(({ svg }) => {
      setSvg(svg)
    })
  }, [chart])

  return <div dangerouslySetInnerHTML={{ __html: svg }} />
}

