// src/components/layout/app-layout.tsx

'use client'

import type React from 'react'
import { useDevice } from '@/hooks/use-device'
import { cn } from '@/lib/utils'
import { BottomNavBar } from './bottom-nav-bar'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isMobile, isTablet, orientation } = useDevice()

  return (
    <div className='flex flex-col items-center flex-1 w-full min-h-screen'>
      <main
        className={cn(
          'flex justify-center w-full flex-1',
          // Mobile-first responsive padding with safe area support
          'mobile-safe-area',
          // Base padding
          'px-3 py-2 pb-20',
          // Tablet: more generous spacing
          'md:px-6 md:py-4 md:pb-24',
          // Desktop: maximum spacing
          'lg:px-8 lg:py-6 lg:pb-8',
          // Orientation-specific adjustments with smooth transitions
          'transition-all duration-300 ease-in-out',
          // Mobile landscape: reduce vertical padding for better space usage
          isMobile && orientation === 'landscape' && 'py-1 pb-16 px-2',
          // Tablet landscape: optimize for horizontal space
          isTablet && orientation === 'landscape' && 'px-8 py-3 pb-20',
        )}
      >
        <div
          className={cn(
            'w-full transition-all duration-300 ease-in-out',
            // Mobile: full width with minimal constraints
            'max-w-full',
            // Tablet portrait: constrained width for better readability
            'md:max-w-4xl',
            // Tablet landscape: wider constraint to use horizontal space
            isTablet && orientation === 'landscape' && 'md:max-w-6xl',
            // Desktop: maximum width constraint
            'lg:max-w-6xl xl:max-w-7xl',
          )}
        >
          {children}
        </div>
      </main>
      <BottomNavBar />
    </div>
  )
}
