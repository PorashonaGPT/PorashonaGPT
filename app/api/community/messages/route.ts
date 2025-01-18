import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { Message } from '@/types/chat'

export async function GET() {
  try {
    const collection = await getCollection('messages')
    const messages = await collection
      .find<Message>({})
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { content, username } = await req.json()
    const collection = await getCollection('messages')
    
    const message: Message = {
      content,
      username,
      timestamp: new Date(),
      id: crypto.randomUUID()
    }

    await collection.insertOne(message)
    
    return NextResponse.json(message)
  } catch (error) {
    console.error('Failed to send message:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

