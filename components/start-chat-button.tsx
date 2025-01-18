'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function StartChatButton() {
  const router = useRouter()

  const handleStartChat = () => {
    router.push('/chat')
  }

  return (
    <Button size="lg" onClick={handleStartChat}>
      Start Chatting
    </Button>
  )
}

