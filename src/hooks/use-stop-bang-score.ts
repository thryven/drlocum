// src/hooks/use-stop-bang-score.ts
'use client'

import { useCallback, useState } from 'react'
import type { StopBangState, YesNo } from '@/lib/utils/stop-bang-score'
import { calculateStopBangScore, initialState } from '@/lib/utils/stop-bang-score'

/**
 * Manage Stop–Bang questionnaire state and form handlers for a Stop–Bang score UI.
 *
 * @returns An object containing:
 * - `answers` — the current answers for each Stop–Bang question.
 * - `result` — the computed Stop–Bang score based on `answers`.
 * - `showResult` — whether the result should be displayed.
 * - `handleAnswerChange(id, value)` — update a single answer and hide the result.
 * - `handleSubmit(e)` — prevent default form submission and show the result.
 * - `handleReset()` — reset all answers to their initial state and hide the result.
 */
export function useStopBangScore() {
  const [answers, setAnswers] = useState<StopBangState>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleAnswerChange = useCallback((id: keyof StopBangState, value: YesNo) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setShowResult(false)
  }, [])

  const result = calculateStopBangScore(answers)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setShowResult(true)
  }, [])

  const handleReset = useCallback(() => {
    setAnswers(initialState)
    setShowResult(false)
  }, [])

  return {
    answers,
    result,
    showResult,
    handleAnswerChange,
    handleSubmit,
    handleReset,
  }
}
