/**
 * @fileoverview Animated list component with staggered animations and performance optimizations.
 * Limits simultaneous animations to maintain 60fps performance.
 */

'use client'

import { type ReactNode, useEffect, useId, useRef } from 'react'
import { useStaggeredAnimation } from '@/hooks/useAnimationQueue'
import { cn } from '@/lib/utils'

interface AnimatedListProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
  itemClassName?: string
  animate?: boolean
}

/**
 * Renders a list of children and animates each item with a staggered, performance-limited reveal.
 *
 * Starts the staggered animation on first render when `animate` is true and resets animation state on unmount.
 *
 * @param children - Items to render as the list's entries
 * @param staggerDelay - Delay in milliseconds applied per-item to stagger their transitions (default: 50)
 * @param className - Optional class name applied to the outer container
 * @param itemClassName - Optional class name applied to each item wrapper
 * @param animate - Whether to run animations (default: true)
 * @returns The rendered container element with staggered list items
 */
export function AnimatedList({
  children,
  staggerDelay = 50,
  className,
  itemClassName,
  animate = true,
}: Readonly<AnimatedListProps>) {
  const { startStaggered, isActive, reset } = useStaggeredAnimation(children.length, staggerDelay)
  const hasAnimatedRef = useRef(false)
  const componentId = useId()

  useEffect(() => {
    if (animate && !hasAnimatedRef.current) {
      startStaggered()
      hasAnimatedRef.current = true
    }
  }, [animate, startStaggered])

  useEffect(() => {
    if (!animate) {
      hasAnimatedRef.current = false
      reset()
    }
  }, [animate, reset])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={`${componentId}-item-${index}`}
          className={cn('stagger-item', isActive(index) && 'active', itemClassName)}
          style={{
            transitionDelay: animate ? `${index * staggerDelay}ms` : '0ms',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

interface AnimatedGridProps {
  children: ReactNode[]
  columns?: number
  staggerDelay?: number
  className?: string
  itemClassName?: string
  animate?: boolean
}

/**
 * Renders children in a responsive CSS grid and applies optional staggered entrance animations.
 *
 * @param children - The grid items to render.
 * @param columns - Number of grid columns.
 * @param staggerDelay - Delay in milliseconds applied per item to stagger animations.
 * @param className - Additional class names for the grid container.
 * @param itemClassName - Additional class names applied to each grid item wrapper.
 * @param animate - Whether staggered animations are enabled.
 * @returns The grid element containing the provided children with per-item transition delays when animations are enabled.
 */
export function AnimatedGrid({
  children,
  columns = 3,
  staggerDelay = 50,
  className,
  itemClassName,
  animate = true,
}: Readonly<AnimatedGridProps>) {
  const { startStaggered, isActive, reset } = useStaggeredAnimation(children.length, staggerDelay)
  const hasAnimatedRef = useRef(false)
  const componentId = useId()

  useEffect(() => {
    if (animate && !hasAnimatedRef.current) {
      startStaggered()
      hasAnimatedRef.current = true
    }
  }, [animate, startStaggered])

  useEffect(() => {
    if (!animate) {
      hasAnimatedRef.current = false
      reset()
    }
  }, [animate, reset])

  useEffect(() => {
    return () => {
      reset()
    }
  }, [reset])

  return (
    <div
      className={cn('grid gap-4', className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children.map((child, index) => (
        <div
          key={`${componentId}-grid-${index}`}
          className={cn('stagger-item', isActive(index) && 'active', itemClassName)}
          style={{
            transitionDelay: animate ? `${index * staggerDelay}ms` : '0ms',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
