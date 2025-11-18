/**
 * @fileoverview A component that displays a short, important message in a way that attracts the user's attention
 * without interrupting their task.
 * This component is styled with variants for different semantic purposes (e.g., default, destructive, accent).
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

/**
 * Defines the variants for the Alert component using `class-variance-authority`.
 * This allows for different styles based on the `variant` prop.
 */
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground', // Base icon color is foreground
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:text-destructive-foreground dark:border-destructive [&>svg]:text-destructive dark:[&>svg]:text-destructive-foreground', // Destructive icon color overrides base
        accent: 'border-accent/50 text-accent-foreground dark:border-accent dark:text-foreground [&>svg]:text-accent', // Accent icon color is set, text in dark mode uses default foreground for contrast
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/**
 * The main Alert component.
 */
const Alert = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role='alert' className={cn(alertVariants({ variant }), className)} {...props} />
  ),
)
Alert.displayName = 'Alert'

/**
 * A sub-component for the title of the Alert.
 */
const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
))
AlertTitle.displayName = 'AlertTitle'

/**
 * A sub-component for the description or main content of the Alert.
 */
const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
  ),
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
