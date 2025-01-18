'use client'

import * as React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Artifact } from '@/types/artifact'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface CollaborationPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  artifacts: Artifact[]
}

export function CollaborationPanel({ open, onOpenChange, artifacts }: CollaborationPanelProps) {
  const [collaborators, setCollaborators] = React.useState([
    { id: '1', name: 'Alice', avatar: '/avatars/alice.jpg' },
    { id: '2', name: 'Bob', avatar: '/avatars/bob.jpg' },
    { id: '3', name: 'Charlie', avatar: '/avatars/charlie.jpg' },
  ])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Collaboration</SheetTitle>
          <SheetDescription>
            Manage collaborators and shared artifacts.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <h3 className="mb-2 font-semibold">Collaborators</h3>
          <ScrollArea className="h-[200px]">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center space-x-4 mb-2">
                <Avatar>
                  <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                  <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                </Avatar>
                <span>{collaborator.name}</span>
              </div>
            ))}
          </ScrollArea>
          <Button className="mt-4">Invite Collaborator</Button>
        </div>
        <div className="py-4">
          <h3 className="mb-2 font-semibold">Shared Artifacts</h3>
          <ScrollArea className="h-[200px]">
            {artifacts.filter(a => a.sharedWith && a.sharedWith.length > 0).map((artifact) => (
              <div key={artifact.id} className="flex items-center justify-between mb-2">
                <span>{artifact.name}</span>
                <span>{artifact.sharedWith?.length} collaborators</span>
              </div>
            ))}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

