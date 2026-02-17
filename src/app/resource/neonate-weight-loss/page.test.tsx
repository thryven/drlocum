// src/app/calculator/neonate-weight-loss/page.test.tsx

import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import NeonateWeightLossPage from './page'

describe('NeonateWeightLossPage', () => {
  it('renders the initial form correctly', () => {
    render(<NeonateWeightLossPage />)
    expect(screen.getByText('Neonate Weight Loss Calculator')).toBeInTheDocument()
    expect(screen.getByLabelText('Birth Weight')).toBeInTheDocument()
    expect(screen.getByLabelText('Current Weight')).toBeInTheDocument()
    expect(screen.getByLabelText("Infant's Age (hours)")).toBeInTheDocument()
    expect(screen.queryByText('Weight Change Results')).not.toBeInTheDocument()
  })

  it('calculates and displays weight loss percentage and interpretation', async () => {
    const user = userEvent.setup()
    render(<NeonateWeightLossPage />)

    const birthWeightInput = screen.getByLabelText('Birth Weight')
    const currentWeightInput = screen.getByLabelText('Current Weight')

    await act(async () => {
      await user.type(birthWeightInput, '3500')
      await user.type(currentWeightInput, '3300')
    })

    // Verify calculation results
    expect(await screen.findByText('Weight Change')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument() // 3500 - 3300
    expect(screen.getByText('5.71')).toBeInTheDocument() // (200 / 3500) * 100
    expect(screen.getByText(/normal for a newborn/i)).toBeInTheDocument()
  })

  it('shows an error if current weight is greater than birth weight', async () => {
    const user = userEvent.setup()
    render(<NeonateWeightLossPage />)

    const birthWeightInput = screen.getByLabelText('Birth Weight')
    const currentWeightInput = screen.getByLabelText('Current Weight')

    await act(async () => {
      await user.type(birthWeightInput, '3300')
      await user.type(currentWeightInput, '3500')
    })

    expect(
      await screen.findByText('Current weight cannot be greater than birth weight for this calculator.'),
    ).toBeInTheDocument()
  })

  it('resets the form when the reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<NeonateWeightLossPage />)

    const birthWeightInput = screen.getByLabelText('Birth Weight')
    const currentWeightInput = screen.getByLabelText('Current Weight')

    await act(async () => {
      await user.type(birthWeightInput, '3500')
      await user.type(currentWeightInput, '3300')
    })

    // Ensure results are visible before resetting
    expect(await screen.findByText('Weight Change Results')).toBeInTheDocument()

    const resetButton = screen.getByRole('button', { name: /Reset/i })
    await act(async () => {
      await user.click(resetButton)
    })

    // Check that inputs are cleared and results are hidden
    expect(birthWeightInput).toHaveValue(null)
    expect(currentWeightInput).toHaveValue(null)
    expect(screen.queryByText('Weight Change Results')).not.toBeInTheDocument()
  })

  it('calculates correctly when units are changed to kg', async () => {
    const user = userEvent.setup()
    render(<NeonateWeightLossPage />)

    // Change unit to kg
    const kgRadio = screen.getByLabelText('Kilograms')
    await act(async () => {
      await user.click(kgRadio)
    })

    const birthWeightInput = screen.getByLabelText('Birth Weight')
    const currentWeightInput = screen.getByLabelText('Current Weight')

    await act(async () => {
      await user.type(birthWeightInput, '3.5')
      await user.type(currentWeightInput, '3.3')
    })

    // Verify calculation results
    expect(await screen.findByText('Weight Change')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument() // (3.5 - 3.3) * 1000
    expect(screen.getByText('5.71')).toBeInTheDocument() // (200 / 3500) * 100
  })
})
