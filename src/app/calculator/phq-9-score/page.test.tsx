// src/app/calculator/phq-9-score/page.test.tsx
import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { questions } from '@/lib/utils/phq-9-score'
import Phq9ScorePage from './page'

describe('QuestionRow (rendered via Phq9ScorePage)', () => {
  it('renders the first question with numbered prompt and four options', () => {
    render(<Phq9ScorePage />)

    const q = questions[0]
    expect(q).toBeDefined()
    if (!q) throw new Error('PHQ-9 question missing')
    // The RadioGroup uses aria-label equal to the question text
    const group = screen.getByLabelText(q.text)
    // The prompt includes the numeric prefix "1. "
    expect(screen.getByText(`${1}. ${q.text}`)).toBeInTheDocument()

    // Within the question group, the four PHQ-9 option labels should be present
    const w = within(group)
    expect(w.getByLabelText('Not at all')).toBeInTheDocument()
    expect(w.getByLabelText('Several days')).toBeInTheDocument()
    expect(w.getByLabelText('More than half the days')).toBeInTheDocument()
    expect(w.getByLabelText('Nearly every day')).toBeInTheDocument()

    // Initially none of the radios for this question should be checked
    const notAtAll = w.getByLabelText('Not at all') as HTMLInputElement
    const severalDays = w.getByLabelText('Several days') as HTMLInputElement
    const moreThanHalf = w.getByLabelText('More than half the days') as HTMLInputElement
    const nearlyEvery = w.getByLabelText('Nearly every day') as HTMLInputElement

    expect(notAtAll.checked).toBe(false)
    expect(severalDays.checked).toBe(false)
    expect(moreThanHalf.checked).toBe(false)
    expect(nearlyEvery.checked).toBe(false)
  })

  it('checks the correct radio when an option is clicked within a question row', async () => {
    render(<Phq9ScorePage />)
    const user = userEvent.setup()
    const q = questions[0]
    expect(q).toBeDefined()
    if (!q) throw new Error('PHQ-9 question missing')
    const group = screen.getByLabelText(q.text)
    const w = within(group)

    const target = w.getByLabelText('More than half the days') as HTMLInputElement

    await act(async () => {
      await user.click(target)
    })

    // After clicking, the target radio should be checked and others not
    expect(target.checked).toBe(true)
    expect(w.getByLabelText('Not at all')).not.toBeChecked()
    expect(w.getByLabelText('Several days')).not.toBeChecked()
    expect(w.getByLabelText('Nearly every day')).not.toBeChecked()
  })
})
