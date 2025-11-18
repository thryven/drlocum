/**
 * @fileoverview Enhanced input component with floating labels and modern styling
 * Implements the modern visual design transformation with touch-friendly targets,
 * floating label animations, and comprehensive state management.
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, forwardRef, useId, useState } from 'react'

import { cn } from '@/lib/utils'

/**
 * Floating input variants with modern styling
 */
const floatingInputVariants = cva(
  'peer w-full border bg-background px-4 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-transparent focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-11 min-h-[44px] pt-6 pb-2',
        lg: 'h-12 min-h-[48px] pt-6 pb-2',
        touch: 'h-12 min-h-[48px] pt-6 pb-2',
      },
      state: {
        default: 'border-input focus-visible:border-primary',
        error: 'border-error focus-visible:border-error',
        success: 'border-success focus-visible:border-success',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  },
)

/**
 * Floating label variants
 */
const floatingLabelVariants = cva(
  'absolute left-4 top-1/2 -translate-y-1/2 origin-left pointer-events-none transition-all duration-200 ease-out',
  {
    variants: {
      size: {
        default: 'text-base',
        lg: 'text-base',
        touch: 'text-base',
      },
      state: {
        default: 'text-muted-foreground peer-focus-visible:text-primary',
        error: 'text-error peer-focus-visible:text-error',
        success: 'text-success peer-focus-visible:text-success',
      },
      floating: {
        true: 'top-2 translate-y-0 scale-[0.875]',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
      floating: false,
    },
  },
)

export interface FloatingInputProps
  extends Omit<ComponentProps<'input'>, 'size'>,
    VariantProps<typeof floatingInputVariants> {
  /**
   * Label text for the floating label
   */
  label?: string

  /**
   * Error message to display
   */
  error?: string

  /**
   * Success message to display
   */
  success?: string

  /**
   * Mobile keyboard type for better user experience
   */
  mobileKeyboard?: 'numeric' | 'decimal' | 'tel' | 'email' | 'url' | 'search'
}

/**
 * Enhanced input component with floating label animation and modern styling
 */
const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, type, size, state, label, error, success, mobileKeyboard, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const inputId = useId()
    const hasValue = value !== undefined && value !== null && String(value).length > 0

    // Determine if label should float
    const shouldFloat = isFocused || hasValue

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
          ref={ref}
          id={inputId}
          type={inputType}
          inputMode={inputMode}
          className={cn(
            floatingInputVariants({ size, state: inputState }),
            'rounded-input transition-all duration-200',
            className,
          )}
          value={value}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />

        {label && (
          <label
            htmlFor={inputId}
            className={cn(floatingLabelVariants({ size, state: inputState, floating: shouldFloat }))}
          >
            {label}
          </label>
        )}

        {/* Error message */}
        {error && <p className='mt-1 text-sm text-error'>{error}</p>}

        {/* Success message */}
        {success && <p className='mt-1 text-sm text-success'>{success}</p>}
      </div>
    )
  },
)
FloatingInput.displayName = 'FloatingInput'

export { FloatingInput, floatingInputVariants, floatingLabelVariants }
