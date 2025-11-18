// src/app/calculator/centor-score/page.test.tsx

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import CentorScorePage from './page'

// The page relies on pure UI primitives and the useCentorScore hook which calls calculateCentorScore.
// These tests assert the visible behavior without mocking, as calculations are deterministic and synchronous.

describe('CentorScorePage', () => {
  it('renders the initial form correctly and hides result', () => {
    render(<CentorScorePage />)

    expect(screen.getByText('Modified Centor Score')).toBeInTheDocument()
    expect(screen.getByText('Clinical Criteria')).toBeInTheDocument()
    expect(screen.getByText('Select all that apply to the patient.')).toBeInTheDocument()

    // Criteria present
    expect(screen.getByLabelText('Tonsillar Exudate or Swelling')).toBeInTheDocument()
    expect(screen.getByLabelText('Swollen, Tender Anterior Cervical Nodes')).toBeInTheDocument()
    expect(screen.getByLabelText('Temperature > 38°C (100.4°F)')).toBeInTheDocument()
    expect(screen.getByLabelText('Absence of Cough')).toBeInTheDocument()

    // Age radios
    expect(screen.getByLabelText('3 - 14 years')).toBeInTheDocument()
    expect(screen.getByLabelText('15 - 44 years')).toBeInTheDocument()
    expect(screen.getByLabelText('45 years and older')).toBeInTheDocument()

    // Result not visible until submit
    expect(screen.queryByText('Result: Centor Score')).not.toBeInTheDocument()
  })

  it('calculates and displays score 0 with low-risk messaging by default', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })

    // Score 0 for default answers (15-44, no criteria)
    expect(await screen.findByText('Result: Centor Score')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('<10% risk of Strep')).toBeInTheDocument()
    expect(screen.getByText('No antibiotic or throat culture necessary.')).toBeInTheDocument()
  })

  it('calculates a high score (≥4) and shows high-risk messaging', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    // Select all criteria and choose under15 to add +1 age point
    await act(async () => {
      await user.click(screen.getByLabelText('Tonsillar Exudate or Swelling'))
      await user.click(screen.getByLabelText('Swollen, Tender Anterior Cervical Nodes'))
      await user.click(screen.getByLabelText('Temperature > 38°C (100.4°F)'))
      await user.click(screen.getByLabelText('Absence of Cough'))
      await user.click(screen.getByLabelText('3 - 14 years'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })

    // 4 criteria + age under15 = 5
    expect(await screen.findByText('Result: Centor Score')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('>50% risk of Strep')).toBeInTheDocument()
    expect(
      screen.getByText('Consider empirical antibiotics. Throat culture or RADT may not be necessary.'),
    ).toBeInTheDocument()
  })

  it('calculates an intermediate score and shows appropriate risk range', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    // Two positive criteria, keep age 15-44 (0 modifier)
    await act(async () => {
      await user.click(screen.getByLabelText('Tonsillar Exudate or Swelling'))
      await user.click(screen.getByLabelText('Temperature > 38°C (100.4°F)'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })

    // Score should be 2
    expect(await screen.findByText('Result: Centor Score')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('11-17% risk of Strep')).toBeInTheDocument()
    expect(
      screen.getByText('Throat culture or rapid antigen test (RADT) if clinical suspicion is high.'),
    ).toBeInTheDocument()
  })

  it('supports negative score when age ≥45 with no other criteria', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    await act(async () => {
      await user.click(screen.getByLabelText('45 years and older'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })

    // Score should be -1
    expect(await screen.findByText('Result: Centor Score')).toBeInTheDocument()
    expect(screen.getByText('-1')).toBeInTheDocument()
    // Low risk bucket applies for score <= 1
    expect(screen.getByText('<10% risk of Strep')).toBeInTheDocument()
    expect(screen.getByText('No antibiotic or throat culture necessary.')).toBeInTheDocument()
  })

  it('resets the form and hides the result when Reset is clicked', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    // Produce a non-zero score first
    await act(async () => {
      await user.click(screen.getByLabelText('Absence of Cough'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })

    expect(await screen.findByText('Result: Centor Score')).toBeInTheDocument()

    // Reset
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /Reset/i }))
    })

    // Result hidden and checkboxes cleared
    expect(screen.queryByText('Result: Centor Score')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Absence of Cough')).not.toBeChecked()
    // Age default is 15-44; ensure selecting another then reset goes back to default
    await act(async () => {
      await user.click(screen.getByLabelText('3 - 14 years'))
    })
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /Reset/i }))
    })
    // Now calculate again to see score 0 at default
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })
    expect(await screen.findByText('Result: Centor Score')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  // New tests for additional behaviors
  it('shows yellow score color and accent alert when score is 2', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    await act(async () => {
      await user.click(screen.getByLabelText('Tonsillar Exudate or Swelling'))
      await user.click(screen.getByLabelText('Temperature > 38°C (100.4°F)'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })

    const scoreEl = screen.getByText('2')
    expect(scoreEl).toHaveClass('text-yellow-600')

    const alert = screen.getByRole('alert')
    // accent variant is represented by text-accent-foreground or [&>svg]:text-accent
    expect(alert.className).toMatch(/accent/)
  })

  it('shows red score color and destructive alert when score is 3', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    await act(async () => {
      await user.click(screen.getByLabelText('Tonsillar Exudate or Swelling'))
      await user.click(screen.getByLabelText('Swollen, Tender Anterior Cervical Nodes'))
      await user.click(screen.getByLabelText('Temperature > 38°C (100.4°F)'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })

    const scoreEl = screen.getByText('3')
    expect(scoreEl).toHaveClass('text-red-600')

    const alert = screen.getByRole('alert')
    // destructive variant includes text-destructive or dark:text-destructive-foreground etc
    expect(alert.className).toMatch(/destructive/)
  })

  it('shows green score color and non-destructive alert when score <= 1', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })

    const scoreEl = screen.getByText('0')
    expect(scoreEl).toHaveClass('text-green-600')

    const alert = screen.getByRole('alert')
    // default variant lacks destructive markers
    expect(alert.className).not.toMatch(/destructive/)
  })

  it('updates computed score across submissions when toggling criteria', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    // First compute with 1 criterion
    await act(async () => {
      await user.click(screen.getByLabelText('Absence of Cough'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })
    expect(await screen.findByText('Result: Centor Score')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()

    // Toggle off the criterion and recompute
    await act(async () => {
      await user.click(screen.getByLabelText('Absence of Cough'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('applies age modifiers correctly between submissions', async () => {
    const user = userEvent.setup()
    render(<CentorScorePage />)

    // Start default (15-44), select one criterion => score 1
    await act(async () => {
      await user.click(screen.getByLabelText('Absence of Cough'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })
    expect(await screen.findByText('Result: Centor Score')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()

    // Change age to over44 => -1 modifier, result should drop to 0 when recomputed
    await act(async () => {
      await user.click(screen.getByLabelText('45 years and older'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })
    expect(screen.getByText('0')).toBeInTheDocument()

    // Change age to under15 => +1 modifier, result should rise to 2 when recomputed
    await act(async () => {
      await user.click(screen.getByLabelText('3 - 14 years'))
      await user.click(screen.getByRole('button', { name: 'Calculate Score' }))
    })
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
