// /src/hooks/use-mobile.ts

'use client'
import { useEffect, useState } from 'react'
import type { DeviceType, Orientation } from '@/lib/types/device'

const MOBILE_BREAKPOINT = 768 // Corresponds to Tailwind's 'md' breakpoint
const TABLET_BREAKPOINT = 1024 // Corresponds to Tailwind's 'lg' breakpoint

/**
 * Determines whether the current viewport width is below the configured mobile breakpoint.
 *
 * @returns `true` if the viewport width is less than MOBILE_BREAKPOINT, `false` otherwise.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (typeof globalThis.window === 'undefined') {
      return
    }

    const mql = globalThis.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(mql.matches)

    onChange() // Set initial value
    mql.addEventListener('change', onChange)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  deviceType: DeviceType
  orientation: Orientation
}

/**
 * Provides current device classification and orientation and keeps it updated when the viewport changes.
 *
 * The returned object reflects `isMobile`, `isTablet`, `deviceType`, and `orientation` and is updated on window resize and orientation changes (including the Screen Orientation API when available).
 *
 * @returns The current DeviceInfo:
 * - `isMobile`: `true` when viewport width is less than 768 pixels, `false` otherwise.
 * - `isTablet`: `true` when viewport width is >= 768 and < 1024 pixels, `false` otherwise.
 * - `deviceType`: `'mobile'`, `'tablet'`, or `'desktop'` derived from the above flags.
 * - `orientation`: `'portrait'` when height > width, otherwise `'landscape'`.
 */
export function useDeviceInfo(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    deviceType: 'desktop',
    orientation: 'landscape',
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const isMobile = width < MOBILE_BREAKPOINT
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT

      // Enhanced orientation detection considering aspect ratio
      const orientation: Orientation = height > width ? 'portrait' : 'landscape'

      let deviceType: DeviceType = 'desktop'
      if (isMobile) {
        deviceType = 'mobile'
      } else if (isTablet) {
        deviceType = 'tablet'
      }

      setDeviceInfo({
        isMobile,
        isTablet,
        deviceType,
        orientation,
      })
    }

    // Set initial value
    updateDeviceInfo()

    // Listen for resize events with debouncing for better performance
    let resizeTimeout: NodeJS.Timeout
    const debouncedUpdate = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateDeviceInfo, 150)
    }

    window.addEventListener('resize', debouncedUpdate)

    // Listen for orientation change events with multiple delays to handle different browsers
    const handleOrientationChange = () => {
      // Multiple timeouts to handle different browser behaviors
      setTimeout(updateDeviceInfo, 100)
      setTimeout(updateDeviceInfo, 300)
      setTimeout(updateDeviceInfo, 500)
    }

    // Listen to both orientationchange and resize for better coverage
    window.addEventListener('orientationchange', handleOrientationChange)

    // Also listen for screen orientation API if available
    if (screen?.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange)
    }

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', debouncedUpdate)
      window.removeEventListener('orientationchange', handleOrientationChange)

      if (screen?.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange)
      }
    }
  }, [])

  return deviceInfo
}
