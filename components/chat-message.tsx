import { Message } from '@/types/chat'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex items-start space-x-4 mb-4', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <Avatar>
          <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Sheikh_Mujibur_Rahman_in_1950.jpg/220px-Sheikh_Mujibur_Rahman_in_1950.jpg" alt="AI Assistant" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div className={cn('flex flex-col space-y-2 max-w-[80%]', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-lg p-3',
            isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
          )}
        >
          {message.content.split('```').map((part, index) => {
            if (index % 2 === 0) {
              return <p key={index} className="whitespace-pre-wrap">{part}</p>
            } else {
              const [language, ...code] = part.split('\n')
              return (
                <SyntaxHighlighter
                  key={index}
                  language={language.trim() || 'javascript'}
                  style={oneDark}
                  customStyle={{
                    margin: '0.5rem 0',
                    borderRadius: '0.25rem',
                  }}
                >
                  {code.join('\n')}
                </SyntaxHighlighter>
              )
            }
          })}
        </div>
      </div>
      {isUser && (
        <Avatar>
          <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Ziaur_Rahman_1979.jpg/195px-Ziaur_Rahman_1979.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

