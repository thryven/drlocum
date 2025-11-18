import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-[transform,opacity,box-shadow] duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 will-animate-transform',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:scale-[1.02] hover:shadow-md active:scale-95 transition-[transform,opacity,box-shadow] duration-200',
        primary:
          'bg-gradient-to-r from-primary-500 to-primary-600 text-primary-foreground shadow-sm hover:scale-[1.02] hover:shadow-md hover:from-primary-600 hover:to-primary-700 active:scale-95 transition-[transform,opacity,box-shadow] duration-200',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:scale-[1.02] hover:shadow-md hover:bg-secondary-600 active:scale-95 transition-[transform,opacity,box-shadow] duration-200',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:scale-[1.02] hover:shadow-md hover:bg-destructive/90 active:scale-95 transition-[transform,opacity,box-shadow] duration-200',
        outline:
          'border-2 border-primary bg-transparent text-primary shadow-sm hover:bg-primary hover:text-primary-foreground hover:scale-[1.02] hover:shadow-md active:scale-95 transition-[transform,opacity,box-shadow] duration-200',
        ghost:
          'bg-transparent hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-95 transition-[transform,opacity] duration-200',
        link: 'text-primary underline-offset-4 hover:underline active:scale-95 transition-[transform,opacity] duration-200',
      },
      size: {
        default: 'h-11 px-4 py-2 text-base rounded-button',
        sm: 'h-9 px-3 text-sm rounded-button',
        lg: 'h-13 px-6 text-lg rounded-button',
        icon: 'h-10 w-10 rounded-button',
        touch: 'h-12 px-4 py-2 min-h-[48px] text-base rounded-button',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className='animate-spin -ml-1 mr-2 h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
