// src/components/layout/nav-items.ts
import type { LucideIcon } from 'lucide-react'
import { Calculator, Newspaper, Settings, Zap } from 'lucide-react'

/**
 * Defines the structure for a navigation item.
 */
interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

/** @lintignore */
export const baseNavItems: NavItem[] = [
  { href: '/', label: 'Dose Guide', icon: Zap },
  { href: '/resource', label: 'Tools', icon: Calculator },
  { href: '/blog', label: 'Blog', icon: Newspaper },
  { href: '/settings', label: 'Settings', icon: Settings },
]
