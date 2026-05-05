import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { HashScrollRestorer } from '@/components/smooth-scroll-link'
import './globals.css'

const jetBrainsMono = localFont({
  src: [
    {
      path: '../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'block',
  variable: '--font-jetbrains-mono',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['500'],
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-ibm-plex-mono',
  preload: true,
})

const iconVersion = '2026-05-05'

export const metadata: Metadata = {
  title: "edo's portfolio",
  description: "a terminal-minimal portfolio.",
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: `/icon.svg?v=${iconVersion}`, type: 'image/svg+xml' },
      { url: `/favicon.ico?v=${iconVersion}`, sizes: 'any' },
    ],
    shortcut: `/favicon.ico?v=${iconVersion}`,
    apple: `/apple-icon.png?v=${iconVersion}`,
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`font-mono ${jetBrainsMono.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
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
