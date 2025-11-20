import type { Metadata, Viewport } from 'next'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/700.css'
import { IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['500'],
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-ibm-plex-mono',
  preload: true,
})

export const metadata: Metadata = {
  title: "edo's portfolio",
  description: "edo's developer portfolio; a collection of projects.",
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-mono ${ibmPlexMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}