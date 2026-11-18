import type { Metadata } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/constants'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Header } from '@/components/ui/Header'
import { MusicPlayer } from '@/components/ui/MusicPlayer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Variable width axis gives the extended racing-livery headlines
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  axes: ['wdth'],
  variable: '--font-archivo',
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
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body className="font-sans antialiased cursor-none">
        <CustomCursor />
        <Header />
        {children}
        <MusicPlayer />
      </body>
    </html>
  )
}
