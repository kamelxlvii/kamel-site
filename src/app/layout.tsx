import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/constants'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Header } from '@/components/ui/Header'
import { NewsletterModal } from '@/components/ui/NewsletterModal'
import { MusicPlayer } from '@/components/ui/MusicPlayer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased cursor-none">
        <CustomCursor />
        <Header />
        {children}
        <NewsletterModal delay={8000} />
        <MusicPlayer />
      </body>
    </html>
  )
}
