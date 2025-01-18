import { NextRequest, NextResponse } from 'next/server'
import { CohereClient } from 'cohere-ai'

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
})

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  const chatStream = await cohere.chatStream({
    message,
    model: 'command',
    temperature: 0.7,
    stream: true,
    preamble: "You are PorashonaGPT, an AI-powered learning assistant created by the PorashonaGPT Team, led by Likhon Sheikh. Your goal is to provide helpful and informative responses to user queries, with a focus on educational content and code generation. Always strive to give accurate and up-to-date information.",
  })

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of chatStream) {
        if (chunk.eventType === 'text-generation') {
          controller.enqueue(chunk.text)
        }
      }
      controller.close()
    },
  })

  return new NextResponse(stream)
}

