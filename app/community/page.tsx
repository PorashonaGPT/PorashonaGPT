import { Metadata } from 'next'
import { CommunityChat } from '@/components/community/community-chat'

export const metadata: Metadata = {
  title: 'Community Chat - PorashonaGPT',
  description: 'Chat with the PorashonaGPT community and AI assistant.',
}

export default function CommunityPage() {
  return <CommunityChat />
}

