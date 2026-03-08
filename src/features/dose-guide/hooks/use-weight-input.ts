// src/features/dose-guide/hooks/use-weight-input.ts
'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCalculatorStore } from '../stores/calculator-store'

/**
 * Hook to manage the logic for the weight input section.
 *
 * This hook encapsulates state management for display weight,
 * handles input changes, and accessibility announcements.
 *
 * @returns An object containing:
 * - `localValue`: The current weight value as a string for the input.
 * - `handleInputChange`: Callback to handle changes to the weight input field.
 */
export function useWeightInput() {
  const { displayWeight, setDisplayWeight, setIsWeightManuallyEntered } = useCalculatorStore()

  // Local input string preserves what the user types (including "15." or ".5")
  const [localValue, setLocalValue] = useState<string>(displayWeight === undefined ? '' : String(displayWeight))

  const handleInputChange = useCallback(
    (value: string) => {
      setLocalValue(value)

      if (value.trim() === '') {
        // Cleared input: reflect that in store and don't mark as manual entry
        setDisplayWeight(undefined)
        setIsWeightManuallyEntered(false)
        return
      }

      const numericValue = Number.parseFloat(value)
      if (!Number.isNaN(numericValue) && numericValue > 0) {
        // Valid numeric weight -> update immediately
        setDisplayWeight(numericValue)
        setIsWeightManuallyEntered(true)
      } else {
        // Invalid or incomplete decimal input (e.g., "15." or "abc") -> clear stored weight
        setDisplayWeight(undefined)
        setIsWeightManuallyEntered(true)
      }
    },
    [setDisplayWeight, setIsWeightManuallyEntered],
  )

  // Keep local input in sync if displayWeight is changed externally
  useEffect(() => {
    const displayStr = displayWeight === undefined ? '' : String(displayWeight)
    if (displayStr !== localValue) {
      setLocalValue(displayStr)
    }
  }, [displayWeight, localValue])

  return {
    localValue,
    handleInputChange,
  }
}
