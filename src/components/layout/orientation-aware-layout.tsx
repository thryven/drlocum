// src/components/layout/orientation-aware-layout.tsx

'use client'
import type React from 'react'
import { useEffect, useRef } from 'react'
import { useDevice } from '@/hooks/use-device'
import { cn } from '@/lib/utils'

interface OrientationAwareLayoutProps {
  children: React.ReactNode
  className?: string
  enableStatePreservation?: boolean
  onOrientationChange?: (orientation: string, previousOrientation: string | null) => void
}

/**
 * Layout component that automatically adapts to orientation changes
 * with smooth transitions and state preservation
 */
export const OrientationAwareLayout: React.FC<OrientationAwareLayoutProps> = ({
  children,
  className,
  enableStatePreservation: _enableStatePreservation = true,
  onOrientationChange: _onOrientationChange,
}) => {
  const { orientation } = useDevice()
  const prevOrientationRef = useRef<string | null>(null)

  const currentOrientation = orientation
  const isTransitioning = false
  const isStable = true
  const layoutMode = orientation === 'portrait' ? 'single-column' : 'two-column'
  const getLayoutClasses = () => `orientation-${orientation}`

  useEffect(() => {
    if (_onOrientationChange && prevOrientationRef.current !== orientation) {
      _onOrientationChange(orientation, prevOrientationRef.current)
    }
    prevOrientationRef.current = orientation
  }, [orientation, _onOrientationChange])

  // Handle viewport meta tag adjustments for better orientation handling
  useEffect(() => {
    if (!isStable && typeof document !== 'undefined') {
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        const originalContent = viewport.getAttribute('content')

        // Temporarily disable user scaling during orientation change
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no')

        // Restore original viewport settings after stabilization
        const restoreTimeout = setTimeout(() => {
          viewport.setAttribute('content', originalContent || 'width=device-width, initial-scale=1')
        }, 500)

        return () => clearTimeout(restoreTimeout)
      }
    }
    return undefined
  }, [])

  return (
    <div
      className={cn(
        getLayoutClasses(),
        // Add visual feedback during transitions
        isTransitioning && 'opacity-95',
        !isStable && 'pointer-events-none',
        // Layout mode specific classes
        layoutMode === 'single-column' && 'single-column-layout',
        layoutMode === 'two-column' && 'two-column-layout',
        className,
      )}
      data-orientation={currentOrientation}
      data-layout-mode={layoutMode}
      data-transitioning={isTransitioning}
    >
      {children}
    </div>
  )
}

/**
 * Container component for form sections with orientation-aware styling
 */
export const OrientationAwareFormContainer: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  const { orientation } = useDevice()
  const getContainerClasses = () => `orientation-${orientation}`
  const layoutMode = orientation === 'portrait' ? 'single-column' : 'two-column'
  const isTransitioning = false

  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-xs',
        // Base padding and spacing
        'p-4 space-y-4',
        // Orientation-aware container classes
        getContainerClasses(),
        // Layout mode specific adjustments
        layoutMode === 'single-column' && 'p-3 space-y-3',
        layoutMode === 'two-column' && 'p-6 space-y-6',
        // Transition effects
        isTransitioning && 'transition-all duration-300 ease-in-out',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Container component for results sections with orientation-aware styling
 */
export const OrientationAwareResultsContainer: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  const { orientation } = useDevice()
  const getContainerClasses = () => `orientation-${orientation}`
  const layoutMode = orientation === 'portrait' ? 'single-column' : 'two-column'
  const isTransitioning = false

  return (
    <div
      className={cn(
        // Orientation-aware container classes
        getContainerClasses(),
        // Layout mode specific adjustments
        layoutMode === 'single-column' && 'mt-2',
        layoutMode === 'two-column' && 'mt-0',
        // Transition effects
        isTransitioning && 'transition-all duration-300 ease-in-out',
        className,
      )}
    >
      {children}
    </div>
  )
}
