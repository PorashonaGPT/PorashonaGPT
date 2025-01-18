import { useState, useEffect } from 'react'
import { Artifact } from '@/types/artifact'

export function useArtifacts() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([])

  useEffect(() => {
    const storedArtifacts = localStorage.getItem('artifacts')
    if (storedArtifacts) {
      setArtifacts(JSON.parse(storedArtifacts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('artifacts', JSON.stringify(artifacts))
  }, [artifacts])

  const addArtifact = (artifact: Omit<Artifact, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newArtifact: Artifact = {
      ...artifact,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setArtifacts(prev => [...prev, newArtifact])
  }

  const updateArtifact = (updatedArtifact: Artifact) => {
    setArtifacts(prev => prev.map(a => 
      a.id === updatedArtifact.id ? { ...updatedArtifact, updatedAt: new Date() } : a
    ))
  }

  const deleteArtifact = (id: string) => {
    setArtifacts(prev => prev.filter(a => a.id !== id))
  }

  const exportArtifacts = () => {
    const data = JSON.stringify(artifacts, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'porashona-artifacts.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return {
    artifacts,
    addArtifact,
    updateArtifact,
    deleteArtifact,
    exportArtifacts,
  }
}

