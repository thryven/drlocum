// src/hooks/use-ideal-body-weight.ts
'use client'

import { useMemo, useState } from 'react'
import type { Gender } from '@/lib/utils/ideal-body-weight'
import { calculateAdjBW, calculateIBW } from '@/lib/utils/ideal-body-weight'

/**
 * Manage input state for gender, height (cm), and actual body weight and compute ideal body weight (IBW) and adjusted body weight (AdjBW) when inputs are valid.
 *
 * The hook validates `heightCm` (must parse to a number greater than 0 and at least 152.4 cm). When validation fails, `results` is `null` and `error` contains a user-facing message; when validation succeeds, `results` contains the calculated `ibw` and an `adjBw` when `actualBw` is a positive number (otherwise `adjBw` is `null`).
 *
 * @returns An object containing:
 * - `gender` — current gender selection (`'male' | 'female'`).
 * - `heightCm` — current height input in centimeters as a string.
 * - `actualBw` — current actual body weight input as a string.
 * - `results` — `{ ibw: number; adjBw: number | null } | null`; `ibw` is the calculated ideal body weight, `adjBw` is the adjusted body weight when `actualBw` is a valid positive number, and `results` is `null` when inputs are invalid.
 * - `error` — validation message string; empty when inputs are valid.
 * - `setGender`, `setHeightCm`, `setActualBw` — setters for the corresponding state values.
 * - `handleReset` — resets state to the hook's initial defaults.
 */
export function useIdealBodyWeight() {
  const [gender, setGender] = useState<Gender>('male')
  const [heightCm, setHeightCm] = useState<string>('170')
  const [actualBw, setActualBw] = useState<string>('')

  const { results, error } = useMemo(() => {
    const h = parseFloat(heightCm)
    if (Number.isNaN(h) || h <= 0) {
      return { results: null, error: 'Please enter a valid positive height.' }
    }

    if (h < 152.4) {
      return { results: null, error: 'Height must be at least 5 feet (152.4 cm).' }
    }

    const ibw = calculateIBW(h, gender)
    const aBw = parseFloat(actualBw)
    const adjBw = !Number.isNaN(aBw) && aBw > 0 ? calculateAdjBW(ibw, aBw) : null

    return { results: { ibw, adjBw }, error: '' }
  }, [heightCm, gender, actualBw])

  const handleReset = () => {
    setGender('male')
    setHeightCm('170')
    setActualBw('')
  }

  return {
    gender,
    heightCm,
    actualBw,
    error,
    results,
    setGender,
    setHeightCm,
    setActualBw,
    handleReset,
  }
}
