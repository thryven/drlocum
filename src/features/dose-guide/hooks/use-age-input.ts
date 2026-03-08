// src/features/dose-guide/hooks/use-age-input.ts
'use client'

import { useCallback } from 'react'
import { useScreenReader } from '@/hooks/use-screen-reader'
import { useCalculatorStore } from '../stores/calculator-store'
import type { AgeInputUnit } from '../lib/types'

/**
 * Hook to manage the logic for the age input section.
 *
 * This hook encapsulates state management for display age and unit,
 * handles input changes, unit toggling, and accessibility announcements.
 *
 * @returns An object containing:
 * - `displayAge`: The current age value.
 * - `displayAgeUnit`: The current age unit ('years' or 'months').
 * - `handleAgeValueChange`: Callback to handle changes to the age input field.
 * - `handleUnitToggle`: Callback to toggle the age unit between years and months.
 */
export function useAgeInput() {
  const { displayAge, displayAgeUnit, setDisplayAge, setIsWeightManuallyEntered } = useCalculatorStore()
  const { announceStatus } = useScreenReader()

  const handleAgeValueChange = useCallback(
    (value: string) => {
      const numericValue = Number.parseInt(value, 10)
      if (!Number.isNaN(numericValue) && numericValue >= 0) {
        setDisplayAge(numericValue, displayAgeUnit)
        setIsWeightManuallyEntered(false)
        announceStatus(`Age updated to ${numericValue} ${displayAgeUnit}`)
      } else if (value === '') {
        setDisplayAge(0, displayAgeUnit)
        setIsWeightManuallyEntered(false)
        announceStatus('Age cleared')
      }
    },
    [displayAgeUnit, setDisplayAge, setIsWeightManuallyEntered, announceStatus],
  )

  const handleUnitToggle = useCallback(() => {
    const newUnit: AgeInputUnit = displayAgeUnit === 'years' ? 'months' : 'years'
    setDisplayAge(displayAge, newUnit)
    setIsWeightManuallyEntered(false)
    announceStatus(`Age unit changed to ${newUnit}`)
  }, [displayAge, displayAgeUnit, setDisplayAge, setIsWeightManuallyEntered, announceStatus])

  return {
    displayAge,
    displayAgeUnit,
    handleAgeValueChange,
    handleUnitToggle,
  }
}
