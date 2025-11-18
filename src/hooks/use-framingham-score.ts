'use client'

import { useCallback, useMemo, useState } from 'react'
import { calculateFraminghamScore, type FraminghamState, initialState } from '@/lib/utils/framingham-score'

/**
 * Provides form state, computed Framingham score, and handlers for managing input, submission, reset, and risk-color mapping.
 *
 * Exposes the current Framingham form state, a memoized `result` computed from that state, a `showResult` flag, input/select change handlers, form submit and reset handlers, and a helper to map a risk string to a CSS color class.
 *
 * @returns An object containing:
 * - `state` — the current `FraminghamState` for the form
 * - `result` — the computed Framingham score result derived from `state`
 * - `showResult` — `true` when the result should be displayed, `false` otherwise
 * - `handleInputChange(field, value)` — updates a text input field in the form state and hides the result
 * - `handleSelectChange(field, value)` — updates a select field in the form state and hides the result
 * - `handleSubmit(e)` — prevents default form submission and shows the result
 * - `handleReset()` — resets the form state to the initial values and hides the result
 * - `getRiskColor(risk)` — returns a CSS color class for a risk string; returns a muted class when `risk` is undefined and progressively warmer colors for higher numeric risk values
 */
export function useFraminghamScore() {
  const [state, setState] = useState<FraminghamState>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleInputChange = (field: keyof FraminghamState, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }))
    setShowResult(false)
  }

  const handleSelectChange = (field: keyof FraminghamState, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }))
    setShowResult(false)
  }

  const result = useMemo(() => calculateFraminghamScore(state), [state])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setShowResult(true)
  }, [])

  const handleReset = useCallback(() => {
    setState(initialState)
    setShowResult(false)
  }, [])

  const getRiskColor = (risk: string | undefined): string => {
    if (!risk) return 'text-muted-foreground'
    const numericRisk = Number.parseInt(risk.replaceAll(/[><]/g, ''), 10)
    if (numericRisk >= 20) return 'text-red-600'
    if (numericRisk >= 10) return 'text-orange-500'
    if (numericRisk >= 5) return 'text-yellow-500'
    return 'text-green-600'
  }

  return {
    state,
    result,
    showResult,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleReset,
    getRiskColor,
  }
}
