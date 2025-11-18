/**
 * @fileoverview Utility for generating unique, accessible IDs that are safe for Server-Side Rendering (SSR).
 */

'use client'

import { useId } from 'react'

/**
 * Generates a unique and stable ID that is safe for server and client rendering.
 * This hook leverages React 18's `useId` to prevent hydration mismatches.
 *
 * @param prefix - A descriptive prefix for the ID.
 * @param suffix - An optional suffix to append to the ID.
 * @returns A unique string ID.
 * @example
 * const a11yId = useAccessibleId('my-component'); // Returns "my-component-r1"
 */
export function useAccessibleId(prefix: string, suffix?: string): string {
  const reactId = useId()
  const baseId = `${prefix}-${reactId.replace(/:/g, '')}`
  return suffix ? `${baseId}-${suffix}` : baseId
}

/**
 * A non-hook utility for generating a simple random ID.
 *
 * @deprecated This function is not SSR-safe and can cause hydration mismatches.
 * Prefer using the `useAccessibleId` hook in React components.
 * This utility should only be used in client-side code that runs after hydration.
 *
 * @param prefix - A prefix for the ID.
 * @returns A unique string ID for client-side use.
 */
export function generateClientSideId(prefix: string): string {
  const random = Math.random().toString(36).substring(2, 9)
  return `${prefix}-${random}`
}
