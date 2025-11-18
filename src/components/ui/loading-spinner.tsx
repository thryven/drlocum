import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Renders a spinning loader icon whose visual size can be adjusted.
 *
 * @param size - One of 'sm', 'md', or 'lg' to select the spinner's dimensions.
 * @param className - Additional CSS classes to apply to the spinner.
 * @returns A Loader2 icon element styled as a spinning loading indicator.
 */
export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return <Loader2 className={cn('animate-spin text-primary', sizeClasses[size], className)} aria-label='Loading' />
}
