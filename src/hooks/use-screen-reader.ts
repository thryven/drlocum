'use client'

import { useCallback, useEffect, useRef } from 'react'

type Politeness = 'polite' | 'assertive'

interface ScreenReaderOptions {
  /**
   * Politeness level for the announcement.
   */
  politeness?: Politeness
  /**
   * Delay before making the announcement (in ms).
   */
  delay?: number
}

/**
 * Manages ARIA live regions as a singleton with reference counting to prevent
 * multiple hook instances from interfering with each other.
 */
const LiveRegionManager = (() => {
  const refCounts = new Map<Politeness, number>()

  const getLiveRegionElement = (politeness: Politeness): HTMLDivElement | null => {
    if (typeof document === 'undefined') {
      return null
    }
    return document.getElementById(`live-region-${politeness}`) as HTMLDivElement | null
  }

  const createLiveRegionElement = (politeness: Politeness): HTMLDivElement | null => {
    if (typeof document === 'undefined') {
      return null
    }

    const element = document.createElement('div')
    element.id = `live-region-${politeness}`
    element.setAttribute('aria-live', politeness)
    element.setAttribute('aria-atomic', 'true')
    // Use a CSS class for visually hiding the element
    element.className = 'sr-only'
    document.body.appendChild(element)
    return element
  }

  return {
    /**
     * Acquires a reference to a live region, creating it if it doesn't exist.
     */
    acquire(politeness: Politeness): HTMLDivElement | null {
      const currentCount = refCounts.get(politeness) ?? 0
      if (currentCount === 0) {
        // First user, create the element
        const existing = getLiveRegionElement(politeness)
        if (existing) {
          // If it somehow exists, remove it to start clean.
          existing.remove()
        }
        createLiveRegionElement(politeness)
      }
      refCounts.set(politeness, currentCount + 1)
      return getLiveRegionElement(politeness)
    },

    /**
     * Releases a reference to a live region, removing it if it's the last user.
     */
    release(politeness: Politeness): void {
      const currentCount = refCounts.get(politeness) ?? 0
      if (currentCount <= 1) {
        // Last user, remove the element
        getLiveRegionElement(politeness)?.remove()
        refCounts.delete(politeness)
      } else {
        refCounts.set(politeness, currentCount - 1)
      }
    },

    /**
     * Gets the live region element if it exists.
     */
    get(politeness: Politeness): HTMLDivElement | null {
      return getLiveRegionElement(politeness)
    },
  }
})()

/**
 * Hook for managing screen reader announcements and accessibility.
 * Provides utilities for ARIA live regions and dynamic content updates.
 * @lintignore
 */
export function useScreenReader() {
  const politeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const assertiveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Announce a message to screen readers using a live region.
  const announce = useCallback((message: string, options: ScreenReaderOptions = {}) => {
    const { politeness = 'polite', delay = 100 } = options
    const liveRegion = LiveRegionManager.get(politeness)
    if (!liveRegion) return

    const timeoutRef = politeness === 'polite' ? politeTimeoutRef : assertiveTimeoutRef

    // If a timeout is pending for this specific live region, clear it.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Schedule the new announcement. This will always replace the previous content.
    timeoutRef.current = setTimeout(() => {
      liveRegion.textContent = message
      timeoutRef.current = null // Clear the ref after the timeout runs
    }, delay)
  }, [])

  // Announce status updates (polite)
  const announceStatus = useCallback(
    (message: string) => {
      announce(message, { politeness: 'polite' })
    },
    [announce],
  )

  // Announce alerts (assertive)
  const announceAlert = useCallback(
    (message: string) => {
      announce(message, { politeness: 'assertive' })
    },
    [announce],
  )

  // Announce loading states
  const announceLoading = useCallback(
    (isLoading: boolean, loadingText = 'Loading', completeText = 'Loading complete') => {
      announceStatus(isLoading ? loadingText : completeText)
    },
    [announceStatus],
  )

  // Announce navigation changes
  const announceNavigation = useCallback(
    (destination: string, context?: string) => {
      const message = context ? `Navigated to ${destination}. ${context}` : `Navigated to ${destination}`
      announceStatus(message)
    },
    [announceStatus],
  )

  // Announce filter changes
  const announceFilter = useCallback(
    (filterName: string, resultCount: number, totalCount?: number) => {
      let message = `Filter applied: ${filterName}. `
      if (totalCount !== undefined) {
        message += `Showing ${resultCount} of ${totalCount} items.`
      } else {
        message += `${resultCount} items found.`
      }
      announceStatus(message)
    },
    [announceStatus],
  )

  // Announce form validation errors
  const announceValidationError = useCallback(
    (fieldName: string, errorMessage: string) => {
      announceAlert(`${fieldName}: ${errorMessage}`)
    },
    [announceAlert],
  )

  // Announce successful actions
  const announceSuccess = useCallback(
    (message: string) => {
      announceStatus(message)
    },
    [announceStatus],
  )

  // Acquire and release live regions on mount/unmount.
  useEffect(() => {
    LiveRegionManager.acquire('polite')
    LiveRegionManager.acquire('assertive')

    return () => {
      if (politeTimeoutRef.current) {
        clearTimeout(politeTimeoutRef.current)
      }
      if (assertiveTimeoutRef.current) {
        clearTimeout(assertiveTimeoutRef.current)
      }

      LiveRegionManager.release('polite')
      LiveRegionManager.release('assertive')
    }
  }, [])

  return {
    announce,
    announceStatus,
    announceAlert,
    announceLoading,
    announceNavigation,
    announceFilter,
    announceValidationError,
    announceSuccess,
  }
}
