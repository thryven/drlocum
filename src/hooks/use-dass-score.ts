// src/hooks/use-dass-score.ts
'use client'

import { useMemo, useState } from 'react'
import type { AnswerValue, DassState } from '@/lib/utils/dass-score'
import { calculateDassScore, initialState, questions } from '@/lib/utils/dass-score'

/**
 * Manage DASS questionnaire state and provide handlers for updating, submitting, and resetting it.
 *
 * @returns An object containing:
 * - `answers` — current answers keyed by question id
 * - `results` — computed DASS score breakdown from `answers`
 * - `showResult` — `true` when results should be displayed, `false` otherwise
 * - `isComplete` — `true` if every question has an answer (`answer !== -1`), `false` otherwise
 * - `handleAnswerChange` — `(id, value)` updates a single answer and hides results
 * - `handleSubmit` — form submit handler that prevents default and shows results when `isComplete` is `true`
 * - `handleReset` — resets `answers` to the initial state and hides results
 */
export function useDassScore() {
  const [answers, setAnswers] = useState<DassState>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleAnswerChange = (id: keyof DassState, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setShowResult(false)
  }

  const results = calculateDassScore(answers)

  const isComplete = useMemo(() => {
    return questions.every((q) => answers[q.id] !== -1)
  }, [answers])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isComplete) {
      setShowResult(true)
    }
  }

  const handleReset = () => {
    setAnswers(initialState)
    setShowResult(false)
  }

  return {
    answers,
    results,
    showResult,
    isComplete,
    handleAnswerChange,
    handleSubmit,
    handleReset,
  }
}
