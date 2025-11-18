/**
 * @fileoverview A skeleton component for loading states.
 * Provides animated placeholders while content is loading.
 */

import { type ComponentProps, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends ComponentProps<'div'> {}

/**
 * Skeleton component for loading states
 */
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
})
Skeleton.displayName = 'Skeleton'

export { Skeleton }
