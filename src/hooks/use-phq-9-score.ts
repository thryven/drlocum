// src/hooks/use-phq-9-score.ts
'use client'

import { useMemo, useState } from 'react'
import type { AnswerValue, Phq9State } from '@/lib/utils/phq-9-score'
import { calculatePhq9Score, initialState, questions } from '@/lib/utils/phq-9-score'

/**
 * Manage PHQ-9 answers, compute the PHQ-9 score and completion status, and provide handlers for updating, submitting, and resetting the form.
 *
 * Tracks the current answers and whether the result panel is visible, computes the PHQ-9 score from `answers`, and derives whether every question has been answered.
 *
 * @returns An object with:
 * - `answers`: current answers mapped by question id
 * - `result`: the PHQ-9 score computed from `answers`
 * - `showResult`: `true` if the result panel should be displayed, `false` otherwise
 * - `isComplete`: `true` if every question has an answer other than `-1`, `false` otherwise
 * - `handleAnswerChange`: function `(id, value)` that updates a single answer and hides the result panel
 * - `handleSubmit`: form submit handler that prevents default and sets `showResult` to `true` when `isComplete` is `true`
 * - `handleReset`: function that restores initial answers and hides the result panel
 */
export function usePhq9Score() {
  const [answers, setAnswers] = useState<Phq9State>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleAnswerChange = (id: keyof Phq9State, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setShowResult(false)
  }

  const result = calculatePhq9Score(answers)

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
    result,
    showResult,
    isComplete,
    handleAnswerChange,
    handleSubmit,
    handleReset,
  }
}
