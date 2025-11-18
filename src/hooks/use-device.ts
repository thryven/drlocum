// /src/hooks/use-device.ts

'use client'
import { useEffect, useState } from 'react'
import type { DeviceContext, DeviceType, Orientation } from '@/lib/types/device'

const MOBILE_BREAKPOINT = 768 // Corresponds to Tailwind's 'md' breakpoint
const TABLET_BREAKPOINT = 1024 // Corresponds to Tailwind's 'lg' breakpoint

/**
 * React hook that exposes current device characteristics and keeps them updated.
 *
 * The returned context includes device type flags, screen orientation, current
 * viewport size, and basic touch capabilities. It updates on window resize and
 * orientation changes and no-ops during server-side rendering.
 *
 * @returns The current DeviceContext containing:
 * - `isMobile`: `true` when viewport width is less than the mobile breakpoint.
 * - `isTablet`: `true` when viewport width is between the mobile and tablet breakpoints.
 * - `orientation`: `'portrait'` or `'landscape'` based on viewport dimensions.
 * - `screenSize`: `{ width, height }` of the viewport in pixels.
 * - `touchCapabilities`: `{ supportsHaptics, maxTouchPoints }` detected from the navigator.
 */
export function useDevice(): DeviceContext {
  const [deviceContext, setDeviceContext] = useState<DeviceContext>({
    isMobile: false,
    isTablet: false,
    orientation: 'landscape',
    screenSize: {
      width: 0,
      height: 0,
    },
    touchCapabilities: {
      supportsHaptics: false,
      maxTouchPoints: 0,
    },
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateDeviceContext = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const isMobile = width < MOBILE_BREAKPOINT
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT
      const orientation: Orientation = height > width ? 'portrait' : 'landscape'

      // Detect touch capabilities
      const maxTouchPoints = navigator.maxTouchPoints || 0
      const supportsHaptics = 'vibrate' in navigator

      setDeviceContext({
        isMobile,
        isTablet,
        orientation,
        screenSize: {
          width,
          height,
        },
        touchCapabilities: {
          supportsHaptics,
          maxTouchPoints,
        },
      })
    }

    // Set initial value
    updateDeviceContext()

    // Listen for resize events
    window.addEventListener('resize', updateDeviceContext)

    // Listen for orientation change events
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure screen dimensions are updated after orientation change
      setTimeout(updateDeviceContext, 100)
    })

    return () => {
      window.removeEventListener('resize', updateDeviceContext)
      window.removeEventListener('orientationchange', updateDeviceContext)
    }
  }, [])

  return deviceContext
}

/**
 * Derives the current device category based on the device context.
 *
 * @returns `'mobile'` if the device width falls below the mobile breakpoint, `'tablet'` if it falls within the tablet range, `'desktop'` otherwise.
 */
export function useDeviceType(): DeviceType {
  const { isMobile, isTablet } = useDevice()

  if (isMobile) return 'mobile'
  if (isTablet) return 'tablet'
  return 'desktop'
}

/**
 * Provides the current screen orientation.
 *
 * @returns The device orientation: 'portrait' or 'landscape'
 */
export function useOrientation(): Orientation {
  const { orientation } = useDevice()
  return orientation
}

/**
 * Determines whether the current device exposes touch input capabilities.
 *
 * @returns `true` if the device reports more than 0 touch points, `false` otherwise.
 */
export function useHasTouch(): boolean {
  const { touchCapabilities } = useDevice()
  return touchCapabilities.maxTouchPoints > 0
}
