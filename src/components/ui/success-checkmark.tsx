import { cn } from '@/lib/utils'

interface SuccessCheckmarkProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Renders a scalable SVG checkmark styled as a success indicator.
 *
 * @param size - Visual size of the icon; defaults to `'md'`. Accepted values: `'sm' | 'md' | 'lg'`.
 * @param className - Additional CSS classes to apply to the SVG container.
 * @returns The SVG element for a success checkmark, with size and styling applied.
 */
export function SuccessCheckmark({ size = 'md', className }: SuccessCheckmarkProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <svg
      className={cn('text-success', sizeClasses[size], className)}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label='Success'
    >
      <path
        className='animate-check'
        d='M5 13l4 4L19 7'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
