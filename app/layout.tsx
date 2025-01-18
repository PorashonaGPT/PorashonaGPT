import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PorashonaGPT - AI-Powered Learning Assistant',
  description: 'PorashonaGPT is an advanced AI-powered learning assistant created by the PorashonaGPT Team, led by Likhon Sheikh. It offers intelligent conversations, code generation, and artifact management for enhanced learning experiences.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://porashonagpt.vercel.app',
    siteName: 'PorashonaGPT',
    images: [
      {
        url: 'https://porashonagpt.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PorashonaGPT - AI-Powered Learning Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@porashonagpt',
    creator: '@likhonsheikh',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PorashonaGPT",
              "description": "AI-Powered Learning Assistant created by the PorashonaGPT Team",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web",
              "author": {
                "@type": "Person",
                "name": "Likhon Sheikh"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'