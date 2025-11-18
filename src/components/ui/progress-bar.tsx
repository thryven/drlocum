import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value?: number
  indeterminate?: boolean
  className?: string
}

/**
 * Renders a horizontal progress bar supporting determinate and indeterminate modes.
 *
 * In determinate mode the inner bar width reflects `value` (clamped to 0–100). In indeterminate mode a looping animated indicator is shown and `aria-valuenow` is omitted for accessibility.
 *
 * @param value - Progress percentage (0–100). Defaults to 0.
 * @param indeterminate - When true, show indeterminate animation and omit `aria-valuenow`. Defaults to false.
 * @param className - Additional CSS classes applied to the outer container.
 * @returns The rendered progress bar element.
 */
export function ProgressBar({ value = 0, indeterminate = false, className }: ProgressBarProps) {
  return (
    <div
      className={cn('h-1 w-full overflow-hidden rounded-full bg-muted', className)}
      role='progressbar'
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {indeterminate ? (
        <div className='h-full w-1/3 bg-primary animate-progress' />
      ) : (
        <div
          className='h-full bg-primary transition-all duration-300 ease-out'
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      )}
    </div>
  )
}
