/**
 * @fileoverview Validation feedback component with immediate visual feedback
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { type ComponentProps, forwardRef } from 'react'

import { cn } from '@/lib/utils'

/**
 * Validation feedback variants
 */
const validationFeedbackVariants = cva('flex items-center gap-2 text-sm transition-all duration-200', {
  variants: {
    type: {
      error: 'text-destructive',
      warning: 'text-yellow-600 dark:text-yellow-400',
      success: 'text-green-600 dark:text-green-400',
      info: 'text-blue-600 dark:text-blue-400',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    type: 'error',
    size: 'default',
  },
})

export interface ValidationFeedbackProps
  extends ComponentProps<'div'>,
    VariantProps<typeof validationFeedbackVariants> {
  /**
   * The validation message to display
   */
  message?: string | null

  /**
   * Whether to show an icon
   */
  showIcon?: boolean

  /**
   * Whether to animate the appearance
   */
  animate?: boolean
}

/**
 * Validation feedback component for displaying validation messages with icons
 */
const ValidationFeedback = forwardRef<HTMLDivElement, ValidationFeedbackProps>(
  ({ className, type, size, message, showIcon = true, animate = true, ...props }, ref) => {
    if (!message) return null

    const getIcon = () => {
      if (!showIcon) return null

      const iconProps = { className: 'h-4 w-4 shrink-0' }

      switch (type) {
        case 'error':
          return <AlertCircle {...iconProps} />
        case 'warning':
          return <AlertTriangle {...iconProps} />
        case 'success':
          return <CheckCircle2 {...iconProps} />
        case 'info':
          return <AlertCircle {...iconProps} />
        default:
          return <AlertCircle {...iconProps} />
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          validationFeedbackVariants({ type, size }),
          animate && 'animate-in slide-in-from-top-1 duration-200',
          className,
        )}
        role='alert'
        aria-live='polite'
        {...props}
      >
        {getIcon()}
        <span className='flex-1'>{message}</span>
      </div>
    )
  },
)
ValidationFeedback.displayName = 'ValidationFeedback'

export { ValidationFeedback, validationFeedbackVariants }
