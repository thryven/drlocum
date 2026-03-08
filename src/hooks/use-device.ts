// /src/hooks/use-device.ts

'use client'
import { createContext, createElement, useContext, useEffect, useState } from 'react'
import { breakpoints } from '@/lib/breakpoints'
import type { DeviceContext, DeviceType, Orientation } from '@/types/device'

const DeviceContext = createContext<DeviceContext | undefined>(undefined)

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [context, setContext] = useState<DeviceContext>({
    isMobile: false,
    isTablet: false,
    orientation: 'landscape',
    screenSize: { width: 0, height: 0 },
    touchCapabilities: { supportsHaptics: false, maxTouchPoints: 0 },
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateDeviceContext = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const isMobile = width < breakpoints.md
      const isTablet = width >= breakpoints.md && width < breakpoints.lg
      const orientation: Orientation = height > width ? 'portrait' : 'landscape'
      const maxTouchPoints = navigator.maxTouchPoints || 0
      const supportsHaptics = 'vibrate' in navigator

      setContext({
        isMobile,
        isTablet,
        orientation,
        screenSize: { width, height },
        touchCapabilities: { supportsHaptics, maxTouchPoints },
      })
    }

    updateDeviceContext()
    const handleResize = () => setTimeout(updateDeviceContext, 100)

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return createElement(DeviceContext.Provider, { value: context }, children)
}

export function useDevice(): DeviceContext {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}

export function useDeviceType(): DeviceType {
  const { isMobile, isTablet } = useDevice()
  if (isMobile) return 'mobile'
  if (isTablet) return 'tablet'
  return 'desktop'
}

export function useOrientation(): Orientation {
  const { orientation } = useDevice()
  return orientation
}

export function useHasTouch(): boolean {
  const { touchCapabilities } = useDevice()
  return touchCapabilities.maxTouchPoints > 0
}
