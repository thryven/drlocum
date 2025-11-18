// src/hooks/use-centor-score.ts
'use client'

import { useState } from 'react'
import type { AgeGroup, CentorState } from '@/lib/utils/centor-score'
import { calculateCentorScore, initialState } from '@/lib/utils/centor-score'

/**
 * Manage Centor score form state and provide handlers for input updates, submission, and reset.
 *
 * @returns An object containing:
 * - `answers`: current `CentorState` with form answers including `age`.
 * - `result`: computed Centor score as a number.
 * - `showResult`: `true` when the result should be displayed, `false` otherwise.
 * - `handleCheckboxChange`: updates a boolean answer by key and hides the result.
 * - `handleAgeChange`: sets the `age` field and hides the result.
 * - `handleSubmit`: prevents default form submission and shows the result.
 * - `handleReset`: resets answers to the initial state and hides the result.
 */
export function useCentorScore() {
  const [answers, setAnswers] = useState<CentorState>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleCheckboxChange = (id: keyof Omit<CentorState, 'age'>, checked: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: checked }))
    setShowResult(false)
  }

  const handleAgeChange = (value: AgeGroup) => {
    setAnswers((prev) => ({ ...prev, age: value }))
    setShowResult(false)
  }

  const result = calculateCentorScore(answers)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResult(true)
  }

  const handleReset = () => {
    setAnswers(initialState)
    setShowResult(false)
  }

  return {
    answers,
    result,
    showResult,
    handleCheckboxChange,
    handleAgeChange,
    handleSubmit,
    handleReset,
  }
}
