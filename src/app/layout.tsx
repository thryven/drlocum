// src/app/layout.tsx
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import type React from 'react'
import { AppProviders } from '@/components/layout/app-providers'
import './globals.css'

export const metadata: Metadata = {
  applicationName: 'Doses',
  title: 'Doses - Medication Dose Calculator',
  description: 'Calculate medication doses accurately and safely for adults and children.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Doses',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#26A69A' },
    { media: '(prefers-color-scheme: dark)', color: '#39B8AA' },
  ],
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
}

/**
 * Root layout component that renders the document HTML shell, applies global font variables, and wraps page content with application providers.
 *
 * @param children - React nodes rendered inside AppProviders within the document body
 * @returns The top-level HTML element tree (<html>, <head>, <body>) containing the provided children wrapped by AppProviders
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning={true}>
      <head>
        {/* PWA-related meta tags are handled by the Metadata object */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className='flex flex-col min-h-screen antialiased bg-background'>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
