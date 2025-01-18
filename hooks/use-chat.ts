import { useState, useEffect, useCallback } from 'react'
import { Message } from '@/types/chat'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch('/api/community/messages')
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      const data = await response.json()
      setMessages(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching messages:', error)
      setError('Failed to load messages. Please try again later.')
    }
  }, [])

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
  }, [fetchMessages])

  const sendMessage = useCallback(async (content: string, username: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/community/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, username }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      const message = await response.json()
      setMessages(prev => [...prev, message])

      if (username !== 'AI') {
        const aiResponse = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: content,
            context: 'community_chat'
          }),
        })

        if (aiResponse.ok) {
          const reader = aiResponse.body?.getReader()
          if (reader) {
            let aiMessage = ''
            const decoder = new TextDecoder()

            while (true) {
              const { done, value } = await reader.read()
              if (done) break
              aiMessage += decoder.decode(value)
            }

            const aiMessageResponse = await fetch('/api/community/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                content: aiMessage, 
                username: 'AI' 
              }),
            })

            if (aiMessageResponse.ok) {
              const aiMessageData = await aiMessageResponse.json()
              setMessages(prev => [...prev, aiMessageData])
            } else {
              throw new Error('Failed to send AI message')
            }
          }
        } else {
          throw new Error('Failed to get AI response')
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setError('Failed to send message. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    messages,
    sendMessage,
    isLoading,
    error,
  }
}

