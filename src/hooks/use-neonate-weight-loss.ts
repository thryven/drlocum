// src/hooks/use-neonate-weight-loss.ts
'use client'

import { useMemo, useState } from 'react'
import { calculateNeonateWeightLoss, type WeightUnit } from '@/lib/utils/neonate-weight-loss'

/**
 * Manage neonate weight inputs and compute the percentage weight loss.
 *
 * Validates inputs (weights must be positive and current weight cannot exceed birth weight) and computes the percentage weight loss when inputs are valid.
 *
 * @returns An object containing:
 * - `birthWeight`, `currentWeight`, `ageInHours`, `unit` — current input values (strings for weights/age, `WeightUnit` for `unit`).
 * - `setBirthWeight`, `setCurrentWeight`, `setAgeInHours` — setters for the corresponding inputs.
 * - `setUnit` — setter for `unit`; accepts a string and coerces it to `WeightUnit`.
 * - `result` — calculated weight loss percentage as a number, or `null` when inputs are incomplete or invalid.
 * - `error` — validation error message, or an empty string when inputs are valid.
 * - `handleReset` — function that resets all inputs to their initial empty/default states.
 */
export function useNeonateWeightLoss() {
  const [birthWeight, setBirthWeight] = useState('')
  const [currentWeight, setCurrentWeight] = useState('')
  const [ageInHours, setAgeInHours] = useState('')
  const [unit, setUnit] = useState<WeightUnit>('grams')

  const { result, error } = useMemo(() => {
    const bw = Number.parseFloat(birthWeight)
    const cw = Number.parseFloat(currentWeight)
    const age = ageInHours ? Number.parseInt(ageInHours, 10) : undefined

    if (Number.isNaN(bw) || Number.isNaN(cw)) {
      return { result: null, error: '' }
    }

    if (bw <= 0 || cw <= 0) {
      return { result: null, error: 'Weights must be positive numbers.' }
    }

    if (cw > bw) {
      return { result: null, error: 'Current weight cannot be greater than birth weight for this calculator.' }
    }

    return { result: calculateNeonateWeightLoss(bw, cw, unit, age), error: '' }
  }, [birthWeight, currentWeight, unit, ageInHours])

  const handleReset = () => {
    setBirthWeight('')
    setCurrentWeight('')
    setAgeInHours('')
    setUnit('grams')
  }

  return {
    birthWeight,
    setBirthWeight,
    currentWeight,
    setCurrentWeight,
    ageInHours,
    setAgeInHours,
    unit,
    setUnit: (u: string) => {
      setUnit(u as WeightUnit)
    },
    result,
    error,
    handleReset,
  }
}
