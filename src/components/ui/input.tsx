/**
 * @fileoverview A basic, styled input component with mobile optimizations.
 * It provides consistent styling for text, number, and other input types with
 * proper touch targets and mobile keyboard support.
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, forwardRef } from 'react'

import { cn } from '@/lib/utils'

/**
 * Input variants for different sizes and mobile optimizations
 * Updated with modern styling: touch-friendly targets, new border radius, and enhanced states
 */
const inputVariants = cva(
  'flex w-full border bg-background ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 transition-[border-color,box-shadow,opacity] duration-200',
  {
    variants: {
      size: {
        default: 'h-11 min-h-[44px] px-4 py-3 text-base',
        sm: 'h-10 min-h-[44px] px-3 py-2 text-base',
        lg: 'h-12 min-h-[48px] px-4 py-3 text-base',
        touch: 'h-12 min-h-[48px] px-4 py-3 text-base',
      },
      state: {
        default:
          'border-input focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:border-primary-300',
        error:
          'border-error focus-visible:border-error focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2',
        success:
          'border-success focus-visible:border-success focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  },
)

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'>, VariantProps<typeof inputVariants> {
  /**
   * Mobile keyboard type for better user experience
   */
  mobileKeyboard?: 'numeric' | 'decimal' | 'tel' | 'email' | 'url' | 'search'

  /**
   * Error message to display
   */
  error?: string

  /**
   * Success message to display
   */
  success?: string
}

/**
 * The main Input component with mobile optimizations and modern styling.
 * Updated with touch-friendly targets (44px minimum), new border radius,
 * 16px minimum font size to prevent iOS zoom, and enhanced state management.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, state, mobileKeyboard, error, success, ...props }, ref) => {
    // Determine input state based on error/success
    let inputState = state
    if (error) {
      inputState = 'error'
    } else if (success) {
      inputState = 'success'
    }

    // Determine the appropriate input type and inputMode for mobile
    let inputType = type
    let inputMode: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined

    if (mobileKeyboard) {
      switch (mobileKeyboard) {
        case 'numeric':
          inputType = 'text'
          inputMode = 'numeric'
          break
        case 'decimal':
          inputType = 'text'
          inputMode = 'decimal'
          break
        case 'tel':
          inputType = 'tel'
          inputMode = 'tel'
          break
        case 'email':
          inputType = 'email'
          inputMode = 'email'
          break
        case 'url':
          inputType = 'url'
          inputMode = 'url'
          break
        case 'search':
          inputType = 'search'
          inputMode = 'search'
          break
      }
    }

    return (
      <div className='relative w-full'>
        <input
          type={inputType}
          inputMode={inputMode}
          className={cn(inputVariants({ size, state: inputState }), 'rounded-input', className)}
          ref={ref}
          {...props}
        />

        {/* Error message */}
        {error && <p className='mt-1 text-sm text-error'>{error}</p>}

        {/* Success message */}
        {success && <p className='mt-1 text-sm text-success'>{success}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input, inputVariants }
