// /src/lib/stores/store-initializer.ts
'use client'

import { useEffect } from 'react'
import { useAppStore } from './app-store'
import { useCalculatorStore } from './calculator-store'

/**
 * Initializes all persisted Zustand stores on the client side.
 * This component should be placed in the root layout to ensure stores
 * are rehydrated on mount, preventing hydration mismatches.
 */
export function StoreInitializer() {
  useEffect(() => {
    // Rehydrate all persisted stores on initial client mount
    useAppStore.persist.rehydrate()
    useCalculatorStore.persist.rehydrate()
  }, [])

  return null
}
