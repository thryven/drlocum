// /src/hooks/__tests__/use-mobile.test.ts

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDevice } from '@/hooks/use-device'

// Mock window.matchMedia
const mockMatchMedia = vi.fn()
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

beforeEach(() => {
  mockMatchMedia.mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
    dispatchEvent: vi.fn(),
  }))

  Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    value: mockMatchMedia,
  })

  Object.defineProperty(globalThis, 'innerWidth', {
    writable: true,
    value: 1024,
  })

  Object.defineProperty(globalThis, 'innerHeight', {
    writable: true,
    value: 768,
  })
})

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers() // Restore real timers after each test
})

describe('useDevice', () => {
  beforeEach(() => {
    vi.useFakeTimers() // Use fake timers for this describe block
  })

  it('should detect mobile device correctly', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 500 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.orientation).toBe('portrait')
  })

  it('should detect tablet device correctly', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 800 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 600 })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.orientation).toBe('landscape')
  })

  it('should detect desktop device correctly', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 1200 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.orientation).toBe('landscape')
  })

  it('should detect portrait orientation correctly', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 600 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDevice())

    expect(result.current.orientation).toBe('portrait')
  })

  it('should detect landscape orientation correctly', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 800 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 600 })

    const { result } = renderHook(() => useDevice())

    expect(result.current.orientation).toBe('landscape')
  })

  it('should update on window resize', () => {
    Object.defineProperty(globalThis, 'innerWidth', { value: 500 })
    Object.defineProperty(globalThis, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDevice())

    expect(result.current.isMobile).toBe(true)

    act(() => {
      Object.defineProperty(globalThis, 'innerWidth', { value: 1200 })
      Object.defineProperty(globalThis, 'innerHeight', { value: 800 })
      globalThis.dispatchEvent(new Event('resize'))
      vi.advanceTimersByTime(200)
    })

    expect(result.current.isMobile).toBe(false)
  })
})
