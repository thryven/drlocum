/**
 * @fileoverview Mobile viewport component for handling keyboard appearance and viewport adjustments
 */

import { type ComponentProps, forwardRef, useEffect } from 'react'
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard'
import { cn } from '@/lib/utils'

export interface MobileViewportProps extends ComponentProps<'div'> {
  /**
   * Whether to automatically adjust for keyboard
   */
  adjustForKeyboard?: boolean

  /**
   * Whether to add safe area padding
   */
  addSafeArea?: boolean

  /**
   * Custom keyboard adjustment behavior
   */
  keyboardAdjustment?: 'none' | 'padding' | 'height' | 'scroll'
}

/**
 * Mobile viewport wrapper that handles keyboard appearance and safe areas
 */
const MobileViewport = forwardRef<HTMLDivElement, MobileViewportProps>(
  (
    {
      className,
      children,
      adjustForKeyboard = true,
      addSafeArea = true,
      keyboardAdjustment = 'padding',
      style,
      ...props
    },
    ref,
  ) => {
    const { keyboard, getViewportStyles } = useMobileKeyboard({
      adjustViewport: adjustForKeyboard,
    })

    // Apply viewport meta tag adjustments for better mobile experience
    useEffect(() => {
      const metaViewport = document.querySelector('meta[name="viewport"]')
      if (metaViewport) {
        const currentContent = metaViewport.getAttribute('content') || ''
        const tokens = new Set(
          currentContent
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        )

        // Ensure required tokens are present
        tokens.add('viewport-fit=cover')
        tokens.add('interactive-widget=resizes-content')

        // Reconstruct the content string
        const newContent = Array.from(tokens).join(', ')
        if (newContent !== currentContent) {
          metaViewport.setAttribute('content', newContent)
        }
      }
    }, [])

    const getKeyboardStyles = () => {
      if (!(adjustForKeyboard && keyboard.isVisible)) return {}

      const baseStyles = getViewportStyles()

      switch (keyboardAdjustment) {
        case 'padding':
          return {
            ...baseStyles,
            paddingBottom: `${keyboard.height}px`,
          }
        case 'height':
          return {
            ...baseStyles,
            height: `${keyboard.viewportHeight}px`,
            maxHeight: `${keyboard.viewportHeight}px`,
          }
        case 'scroll':
          return {
            ...baseStyles,
            maxHeight: `${keyboard.viewportHeight}px`,
            overflowY: 'auto' as const,
          }
        default:
          return baseStyles
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Base mobile viewport classes
          'relative w-full',

          // Safe area support
          addSafeArea && 'mobile-safe-area-full',

          // Keyboard adjustment classes
          adjustForKeyboard && keyboard.isVisible && [keyboardAdjustment === 'scroll' && 'overflow-y-auto'],

          className,
        )}
        style={{
          ...getKeyboardStyles(),
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)
MobileViewport.displayName = 'MobileViewport'

export { MobileViewport }
