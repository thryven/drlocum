// src/components/layout/bottom-nav-bar.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { baseNavItems } from './nav-items'

/**
 * Renders a fixed bottom navigation bar with navigation links and a theme toggle.
 *
 * Highlights the active navigation item based on the current pathname: the root item is active only on an exact match, while other items are active when the pathname begins with the item's `href`. Tapping an item triggers light haptic feedback when the environment supports vibration.
 *
 * @returns The bottom navigation bar element containing the navigation links and a theme toggle.
 */
export function BottomNavBar() {
  const pathname = usePathname()

  const navItems = baseNavItems.map((item) => {
    // Use exact match for root, startsWith for nested routes to keep them active
    const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href)

    const handleTap = () => {
      // Trigger haptic feedback if available
      if (typeof globalThis !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(10) // Light haptic feedback (10ms)
      }
    }

    return (
      <Link
        href={item.href}
        key={item.href}
        aria-current={isActive ? 'page' : undefined}
        onClick={handleTap}
        className={cn(
          'flex flex-col flex-1 gap-1 justify-center items-center p-2 h-full transition-all duration-200 ease-out',
          'active:scale-95',
          isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary/80',
        )}
      >
        <div
          className={cn(
            'flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full transition-all duration-200 ease-out',
            isActive && 'bg-primary/10',
          )}
        >
          <item.icon
            className={cn('w-6 h-6 transition-all duration-200 ease-out', isActive && 'scale-110')}
            strokeWidth={isActive ? 2 : 1.5}
          />
        </div>
        <span className={cn('text-xs font-medium text-center', isActive ? 'font-semibold' : 'font-normal')}>
          {item.label}
        </span>
      </Link>
    )
  })

  return (
    <nav
      className='fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-md shadow-lg'
      style={{
        height: 'calc(80px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className='flex justify-around items-stretch h-20'>
        {navItems}
        <div className='flex flex-col flex-1 gap-1 justify-center items-center p-2 h-full text-muted-foreground'>
          <div className='flex min-h-[48px] min-w-[48px] items-center justify-center'>
            <ThemeToggle />
          </div>
          <span className='text-xs font-normal text-center'>Theme</span>
        </div>
      </div>
    </nav>
  )
}
