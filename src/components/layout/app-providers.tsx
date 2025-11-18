// src/components/layout/app-providers.tsx
'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { StoreInitializer } from '@/lib/stores/store-initializer'
import { AppLayout } from './app-layout'

/**
 * @fileoverview A client component that encapsulates all application-level providers.
 * This includes theme management, state initialization, layout, and other services
 * that need to wrap the application.
 */

/**
 * Wraps the application with theme, state, layout, and runtime service providers.
 *
 * This includes:
 * - ThemeProvider: For managing light/dark/system themes.
 * - StoreInitializer: For hydrating Zustand stores on the client.
 * - AppLayout: The main layout structure of the application.
 * - Toaster: For displaying toast notifications.
 * - Analytics & SpeedInsights: For Vercel analytics.
 *
 * @param children - Child nodes to render; these are mounted inside AppLayout.
 * @returns The React element containing the composed provider tree with `children` rendered inside AppLayout.
 */
export function AppProviders({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true} themes={['light', 'dark', 'system']}>
      <StoreInitializer />
      <AppLayout>{children}</AppLayout>
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}
