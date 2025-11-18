// /src/hooks/__tests__/use-device.test.ts

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDevice, useDeviceType, useHasTouch, useOrientation } from '../use-device'

// Mock navigator
const mockNavigator = {
  maxTouchPoints: 0,
  vibrate: vi.fn(),
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'innerWidth', {
    writable: true,
    value: 1024,
  })

  Object.defineProperty(globalThis, 'innerHeight', {
    writable: true,
    value: 768,
  })

  Object.defineProperty(globalThis, 'navigator', {
    writable: true,
    value: mockNavigator,
  })

  vi.clearAllTimers()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})

describe('useDevice', () => {
  it('should detect mobile device with correct properties', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 500 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })
    Object.defineProperty(globalThis, 'navigator', {
      value: { ...mockNavigator, maxTouchPoints: 5, vibrate: vi.fn() },
    })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.orientation).toBe('portrait')
    expect(result.current.screenSize.width).toBe(500)
    expect(result.current.screenSize.height).toBe(800)
    expect(result.current.touchCapabilities.maxTouchPoints).toBe(5)
    expect(result.current.touchCapabilities.supportsHaptics).toBe(true)
  })

  it('should detect tablet device with correct properties', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 800 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 600 })
    Object.defineProperty(globalThis, 'navigator', {
      value: { ...mockNavigator, maxTouchPoints: 10 },
    })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.orientation).toBe('landscape')
    expect(result.current.screenSize.width).toBe(800)
    expect(result.current.screenSize.height).toBe(600)
    expect(result.current.touchCapabilities.maxTouchPoints).toBe(10)
  })

  it('should detect desktop device with correct properties', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 1200 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })
    Object.defineProperty(globalThis, 'navigator', {
      value: { maxTouchPoints: 0 }, // Remove vibrate function to test non-haptic device
    })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.orientation).toBe('landscape')
    expect(result.current.touchCapabilities.maxTouchPoints).toBe(0)
    expect(result.current.touchCapabilities.supportsHaptics).toBe(false)
  })

  it('should handle orientation change with delay', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 800 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 600 })

    const { result } = renderHook(() => useDevice())

    expect(result.current.orientation).toBe('landscape')

    act(() => {
      Object.defineProperty(globalThis, 'innerWidth', { value: 600 })
      Object.defineProperty(globalThis, 'innerHeight', { value: 800 })
      globalThis.dispatchEvent(new Event('orientationchange'))

      // Fast-forward the timeout
      vi.advanceTimersByTime(100)
    })

    expect(result.current.orientation).toBe('portrait')
  })

  it('should update screen size on resize', () => {
    const { result } = renderHook(() => useDevice())

    expect(result.current.screenSize.width).toBe(1024)
    expect(result.current.screenSize.height).toBe(768)

    act(() => {
      Object.defineProperty(globalThis, 'innerWidth', { value: 500 })
      Object.defineProperty(globalThis, 'innerHeight', { value: 900 })
      globalThis.dispatchEvent(new Event('resize'))
    })

    expect(result.current.screenSize.width).toBe(500)
    expect(result.current.screenSize.height).toBe(900)
  })

  it('should handle missing navigator properties gracefully', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: {},
    })

    const { result } = renderHook(() => useDevice())

    expect(result.current.touchCapabilities.maxTouchPoints).toBe(0)
    expect(result.current.touchCapabilities.supportsHaptics).toBe(false)
  })
})

describe('useDeviceType', () => {
  it('should return mobile for mobile screen sizes', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 500 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDeviceType())

    expect(result.current).toBe('mobile')
  })

  it('should return tablet for tablet screen sizes', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 800 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 600 })

    const { result } = renderHook(() => useDeviceType())

    expect(result.current).toBe('tablet')
  })

  it('should return desktop for desktop screen sizes', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 1200 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDeviceType())

    expect(result.current).toBe('desktop')
  })
})

describe('useOrientation', () => {
  it('should return portrait for portrait orientation', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 600 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useOrientation())

    expect(result.current).toBe('portrait')
  })

  it('should return landscape for landscape orientation', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 800 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 600 })

    const { result } = renderHook(() => useOrientation())

    expect(result.current).toBe('landscape')
  })
})

describe('useHasTouch', () => {
  it('should return true for touch-enabled devices', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { ...mockNavigator, maxTouchPoints: 5 },
    })

    const { result } = renderHook(() => useHasTouch())

    expect(result.current).toBe(true)
  })

  it('should return false for non-touch devices', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { ...mockNavigator, maxTouchPoints: 0 },
    })

    const { result } = renderHook(() => useHasTouch())

    expect(result.current).toBe(false)
  })
})
