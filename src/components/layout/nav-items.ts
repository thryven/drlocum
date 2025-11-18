// src/components/layout/nav-items.ts
import type { LucideIcon } from 'lucide-react'
import { BookHeart, Calculator, Zap } from 'lucide-react'

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
  { href: '/', label: 'Quick Ref', icon: Zap },
  { href: '/calculators', label: 'Calculators', icon: Calculator },
  { href: '/resources', label: 'Resources', icon: BookHeart },
]
