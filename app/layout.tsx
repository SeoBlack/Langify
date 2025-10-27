import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/navigation'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Langy - Smart Language Learning',
  description: 'Learn languages smarter with AI-powered translations, quizzes, and feedback',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 pb-20 md:pb-0 md:ml-64">
              <div className="container mx-auto p-4 md:p-8 max-w-7xl">
                {children}
              </div>
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

