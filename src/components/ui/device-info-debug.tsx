// src/components/ui/device-info-debug.tsx

'use client'

import { useDevice, useDeviceType, useHasTouch, useOrientation } from '@/hooks/use-device'

/**
 * Renders a fixed on-screen panel that displays current device detection details for development.
 *
 * Shows device type, mobile/tablet flags, orientation, screen dimensions, touch support, max touch points,
 * and haptic capability using the device hooks.
 *
 * @returns The JSX element for the device information debug panel
 */
export function DeviceInfoDebug() {
  // Only render in development

  const deviceContext = useDevice()
  const deviceType = useDeviceType()
  const orientation = useOrientation()
  const hasTouch = useHasTouch()

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className='fixed bottom-4 right-4 bg-background border rounded-lg p-4 text-xs space-y-2 shadow-lg z-50'>
      <h3 className='font-semibold'>Device Info</h3>
      <div className='space-y-1'>
        <div>Type: {deviceType}</div>
        <div>Mobile: {deviceContext.isMobile ? 'Yes' : 'No'}</div>
        <div>Tablet: {deviceContext.isTablet ? 'Yes' : 'No'}</div>
        <div>Orientation: {orientation}</div>
        <div>
          Screen: {deviceContext.screenSize.width}x{deviceContext.screenSize.height}
        </div>
        <div>Touch: {hasTouch ? 'Yes' : 'No'}</div>
        <div>Touch Points: {deviceContext.touchCapabilities.maxTouchPoints}</div>
        <div>Haptics: {deviceContext.touchCapabilities.supportsHaptics ? 'Yes' : 'No'}</div>
      </div>
    </div>
  )
}
