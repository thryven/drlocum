// src/lib/types/device.ts
// Device context and mobile navigation type definitions

export interface DeviceContext {
  isMobile: boolean
  isTablet: boolean
  orientation: 'portrait' | 'landscape'
  screenSize: {
    width: number
    height: number
  }
  touchCapabilities: {
    supportsHaptics: boolean
    maxTouchPoints: number
  }
}

export type DeviceType = 'mobile' | 'tablet' | 'desktop'
export type Orientation = 'portrait' | 'landscape'
