// src/hooks/use-swipeable-card.ts
'use client'

import { useCallback, useRef, useState } from 'react'

interface SwipeableCardOptions {
  threshold?: number
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  enabled?: boolean
}

interface SwipeableCardReturn {
  swipeOffset: number
  isRevealed: 'left' | 'right' | null
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void
    onTouchMove: (e: React.TouchEvent) => void
    onTouchEnd: () => void
    onMouseDown: (e: React.MouseEvent) => void
    onMouseMove: (e: React.MouseEvent) => void
    onMouseUp: () => void
    onMouseLeave: () => void
  }
  reset: () => void
}

/**
 * Custom hook for implementing swipeable card interactions with left/right swipe gestures.
 *
 * Tracks touch/mouse movements and triggers callbacks when swipe threshold is exceeded.
 * Provides offset values for animating the card position during swipe.
 *
 * @param options - Configuration options for swipe behavior
 * @param options.threshold - Minimum distance in pixels to trigger swipe action (default: 50)
 * @param options.onSwipeLeft - Callback invoked when left swipe threshold is exceeded
 * @param options.onSwipeRight - Callback invoked when right swipe threshold is exceeded
 * @param options.enabled - Whether swipe gestures are enabled (default: true)
 * @returns Object containing swipe state and event handlers
 */
export function useSwipeableCard({
  threshold = 50,
  onSwipeLeft,
  onSwipeRight,
  enabled = true,
}: SwipeableCardOptions = {}): SwipeableCardReturn {
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isRevealed, setIsRevealed] = useState<'left' | 'right' | null>(null)
  const startXRef = useRef<number | null>(null)
  const currentXRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)

  const reset = useCallback(() => {
    setSwipeOffset(0)
    setIsRevealed(null)
    startXRef.current = null
    currentXRef.current = null
    isDraggingRef.current = false
  }, [])

  const handleStart = useCallback(
    (clientX: number) => {
      if (!enabled) return
      startXRef.current = clientX
      currentXRef.current = clientX
      isDraggingRef.current = true
    },
    [enabled],
  )

  const handleMove = useCallback(
    (clientX: number) => {
      if (!enabled || !isDraggingRef.current || startXRef.current === null) return

      currentXRef.current = clientX
      const diff = clientX - startXRef.current

      // Limit swipe distance to prevent excessive movement
      const maxSwipe = 120
      const limitedDiff = Math.max(-maxSwipe, Math.min(maxSwipe, diff))

      setSwipeOffset(limitedDiff)
    },
    [enabled],
  )

  const handleEnd = useCallback(() => {
    if (!enabled || !isDraggingRef.current || startXRef.current === null || currentXRef.current === null) {
      reset()
      return
    }

    const diff = currentXRef.current - startXRef.current

    if (Math.abs(diff) >= threshold) {
      if (diff < 0) {
        // Swiped left - reveal right actions
        setIsRevealed('right')
        onSwipeLeft?.()
      } else {
        // Swiped right - reveal left actions
        setIsRevealed('left')
        onSwipeRight?.()
      }
    } else {
      // Didn't meet threshold, reset
      reset()
    }

    isDraggingRef.current = false
  }, [enabled, threshold, onSwipeLeft, onSwipeRight, reset])

  const handlers = {
    onTouchStart: (e: React.TouchEvent) => {
      if (e.touches.length === 1 && e.touches[0]) {
        handleStart(e.touches[0].clientX)
      }
    },
    onTouchMove: (e: React.TouchEvent) => {
      if (e.touches.length === 1 && e.touches[0]) {
        handleMove(e.touches[0].clientX)
      }
    },
    onTouchEnd: () => {
      handleEnd()
    },
    onMouseDown: (e: React.MouseEvent) => {
      handleStart(e.clientX)
    },
    onMouseMove: (e: React.MouseEvent) => {
      handleMove(e.clientX)
    },
    onMouseUp: () => {
      handleEnd()
    },
    onMouseLeave: () => {
      if (isDraggingRef.current) {
        handleEnd()
      }
    },
  }

  return {
    swipeOffset,
    isRevealed,
    handlers,
    reset,
  }
}
