// src/components/ui/card.tsx

/**
 * @fileoverview A set of components for building card-based layouts.
 * Includes Card, CardHeader, CardFooter, CardTitle, CardDescription, and CardContent
 * for semantic and consistent card structures.
 */

import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type CardVariant = 'default' | 'elevated' | 'outlined' | 'flat' | 'gradient'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card
   * - default: Standard card with border and subtle shadow
   * - elevated: Higher shadow, no border
   * - outlined: Border only, no shadow
   * - flat: Muted background, no shadow or border
   * - gradient: Glassmorphism effect with gradient
   */
  variant?: CardVariant
}

/**
 * The main container for a card.
 * Supports multiple variants: default, elevated, outlined, flat, and gradient.
 */
const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant = 'default', ...props }, ref) => {
  const variantStyles = {
    default: [
      'border bg-card shadow-sm',
      'before:absolute before:inset-0 before:bg-gradient-card before:opacity-100 before:pointer-events-none',
    ],
    elevated: ['border-0 bg-card shadow-md', 'before:hidden'],
    outlined: ['border-2 bg-card shadow-none', 'before:hidden'],
    flat: ['border-0 bg-muted shadow-none', 'before:hidden'],
    gradient: [
      'border border-border/30 glass-card shadow-md',
      'before:absolute before:inset-0 before:bg-gradient-card before:opacity-50 before:pointer-events-none',
    ],
  }

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-card text-card-foreground',
        'relative overflow-hidden',
        'transition-all duration-200 ease-out',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  )
})
Card.displayName = 'Card'

/**
 * The header section of a card.
 */
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-element padding-element md:padding-component relative z-10', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/**
 * The title element for a card, typically placed within a CardHeader.
 * Can render as a different element via the `asChild` prop.
 */
const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h3'
    return <Comp ref={ref} className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
  },
)
CardTitle.displayName = 'CardTitle'

/**
 * The description element for a card, typically placed within a CardHeader.
 */
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  ),
)
CardDescription.displayName = 'CardDescription'

/**
 * The main content section of a card.
 */
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('padding-element pt-0 md:padding-component relative z-10', className)} {...props} />
))
CardContent.displayName = 'CardContent'

/**
 * The footer section of a card.
 */
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center padding-element pt-0 md:padding-component relative z-10', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
