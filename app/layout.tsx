import type { Metadata, Viewport } from 'next'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import { IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { HashScrollRestorer } from '@/components/smooth-scroll-link'
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
  description: "a terminal-minimal portfolio.",
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`font-mono ${ibmPlexMono.variable}`}>
        <HashScrollRestorer />
        <div className="site-shell flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
