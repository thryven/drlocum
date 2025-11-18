'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Renders children with a route-change transition, respecting the user's reduced-motion preference.
 *
 * When reduced-motion is enabled, the component renders the latest children immediately with no animation.
 * Otherwise, it runs an exit animation, swaps the rendered children after 200ms, then runs an enter animation and clears the transitioning state after an additional ~50ms.
 *
 * @param children - The content to display and transition between when the route changes
 * @returns A div containing `children`; when animations are enabled the div receives the class `page-exit` during the exit phase and `page-enter` during the enter/idle phase
 */
export function PageTransition({ children }: Readonly<PageTransitionProps>) {
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    let exitTimer: NodeJS.Timeout | undefined
    let enterTimer: NodeJS.Timeout | undefined

    // If reduced motion is preferred, skip animations
    if (prefersReducedMotion) {
      setDisplayChildren(children)
      return
    }

    // Start exit animation
    setIsTransitioning(true)

    // Wait for exit animation to complete (200ms)
    exitTimer = setTimeout(() => {
      // Update content
      setDisplayChildren(children)

      // Start enter animation after a brief delay
      enterTimer = setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 200)

    // Cleanup function to clear both timers
    return () => {
      if (exitTimer) {
        clearTimeout(exitTimer)
      }
      if (enterTimer) {
        clearTimeout(enterTimer)
      }
    }
  }, [children, prefersReducedMotion])

  // Don't apply animation classes if reduced motion is preferred
  if (prefersReducedMotion) {
    return <div>{displayChildren}</div>
  }

  return <div className={isTransitioning ? 'page-exit' : 'page-enter'}>{displayChildren}</div>
}
