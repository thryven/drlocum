// src/components/ui/context-menu-overlay.tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ContextMenuItem {
  icon?: ReactNode
  label: string
  onClick: () => void
  variant?: 'default' | 'destructive'
}

interface ContextMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
  items: ContextMenuItem[]
  title?: string
  className?: string
}

/**
 * A context menu overlay that appears with a blur backdrop and fade-scale animation.
 *
 * Displays a list of action items with icons and labels.
 * Closes when backdrop is clicked or an item is selected.
 *
 * @param isOpen - Whether the context menu is visible
 * @param onClose - Callback invoked when menu should close
 * @param items - Array of menu items to display
 * @param title - Optional title for the context menu
 * @param className - Additional CSS classes for the menu container
 * @returns A context menu overlay component
 */
export function ContextMenuOverlay({ isOpen, onClose, items, title, className }: ContextMenuOverlayProps) {
  // Close on escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleItemClick = (item: ContextMenuItem) => {
    item.onClick()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-background/80 backdrop-blur-sm z-50'
            onClick={onClose}
            aria-hidden='true'
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
              'w-[90vw] max-w-sm',
              'bg-card border border-border rounded-xl shadow-2xl',
              'overflow-hidden',
              className,
            )}
            role='dialog'
            aria-modal='true'
            aria-label={title || 'Context menu'}
          >
            {title && (
              <div className='px-4 py-3 border-b border-border'>
                <h2 className='text-base font-semibold text-foreground'>{title}</h2>
              </div>
            )}

            <div className='py-2'>
              {items.map((item, index) => (
                <button
                  key={`${item.label}-${index}`}
                  type='button'
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3',
                    'text-left transition-colors duration-150',
                    'hover:bg-muted active:bg-muted/80',
                    'focus-visible:outline-hidden focus-visible:bg-muted',
                    'min-h-[48px]', // Touch-friendly
                    item.variant === 'destructive' && 'text-destructive hover:bg-destructive/10',
                  )}
                  aria-label={item.label}
                >
                  {item.icon && <span className='shrink-0 w-5 h-5'>{item.icon}</span>}
                  <span className='text-sm font-medium'>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
