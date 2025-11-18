/**
 * @fileoverview Enhanced mobile input component with keyboard optimization and validation
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { type ComponentProps, forwardRef, useEffect, useRef } from 'react'
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard'
import { cn } from '@/lib/utils'

/**
 * Mobile input variants with enhanced touch targets and visual feedback
 */
const mobileInputVariants = cva(
  'flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      size: {
        default: 'h-10 min-h-[44px]',
        sm: 'h-9 min-h-[44px] text-sm',
        lg: 'h-12 min-h-[48px] text-base px-4 py-3',
        touch: 'h-12 min-h-[48px] text-base px-4 py-3',
      },
      validationState: {
        default: 'border-input',
        valid: 'border-green-500 focus-visible:ring-green-500',
        invalid: 'border-destructive focus-visible:ring-destructive',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500',
        validating: 'border-blue-500 focus-visible:ring-blue-500',
      },
    },
    defaultVariants: {
      size: 'default',
      validationState: 'default',
    },
  },
)

export interface MobileInputProps
  extends Omit<ComponentProps<'input'>, 'onChange' | 'onBlur' | 'onFocus' | 'size'>,
    VariantProps<typeof mobileInputVariants> {
  /**
   * Mobile keyboard type for better user experience
   */
  mobileKeyboard?: 'numeric' | 'decimal' | 'tel' | 'email' | 'url' | 'search'

  /**
   * Whether to scroll into view when focused (useful when keyboard appears)
   */
  scrollIntoViewOnFocus?: boolean

  /**
   * Custom change handler
   */
  onChange?: (value: string) => void

  /**
   * Custom blur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * Custom focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void

  /**
   * Show validation icon
   */
  showValidationIcon?: boolean
}

/**
 * Enhanced mobile input component with keyboard optimization and real-time validation
 */
const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  (
    {
      className,
      type,
      size,
      mobileKeyboard,
      scrollIntoViewOnFocus = true,
      onChange,
      onBlur,
      onFocus,
      showValidationIcon = false,
      value = '',
      validationState: validationStateProp = 'default',
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { scrollIntoView } = useMobileKeyboard()

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
    }

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e)
    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e)

      if (scrollIntoViewOnFocus && inputRef.current) {
        scrollIntoView(inputRef.current)
      }
    }

    // Combine refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current)
        } else {
          ref.current = inputRef.current
        }
      }
    }, [ref])

    return (
      <div className='relative'>
        <input
          ref={inputRef}
          type={inputType}
          inputMode={inputMode}
          className={cn(
            mobileInputVariants({ size, validationState: validationStateProp }),
            showValidationIcon && 'pr-10',
            className,
          )}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          {...props}
        />

        {/* Validation Icon */}
        {showValidationIcon && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            {validationStateProp === 'validating' && (
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent' />
            )}
            {validationStateProp === 'invalid' && <AlertCircle className='h-4 w-4 text-destructive' />}
            {validationStateProp === 'warning' && <AlertCircle className='h-4 w-4 text-yellow-500' />}
            {validationStateProp === 'valid' && String(value ?? '').trim() !== '' && (
              <CheckCircle2 className='h-4 w-4 text-green-500' />
            )}
          </div>
        )}
      </div>
    )
  },
)
MobileInput.displayName = 'MobileInput'

export { MobileInput, mobileInputVariants }
