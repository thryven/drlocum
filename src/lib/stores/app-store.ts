// src/lib/stores/app-store.ts
'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/**
 * AppState defines the shape of the global app store.
 * Currently empty, but can be extended with properties as needed.
 * Keeping this interface allows for future type-safe additions and documentation.
 */
type AppState = {}

export const useAppStore = create<AppState>()(
  persist(
    (_set) => ({
      // No state properties are defined as audience has been removed.
    }),
    {
      name: 'doses-app-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
