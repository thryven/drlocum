import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import IdealBodyWeightPage from './page'

// Behaviors covered:
// 1. Validates height and shows error for invalid or below 152.4 cm
// 2. Calculates IBW for male and female and renders result
// 3. Calculates AdjBW when actual body weight is provided and > 0
// 4. Hides AdjBW when actual body weight is empty or 0/invalid
// 5. Reset button restores defaults and clears errors/results

function getNumberInputByLabel(label: string) {
  // Fallback to getByLabelText using associated <Label htmlFor>
  return screen.getByLabelText(label)
}

describe('IdealBodyWeightPage', () => {
  it('renders initial form with defaults and no results until valid inputs', () => {
    render(<IdealBodyWeightPage />)
    expect(screen.getByText('Patient Data')).toBeInTheDocument()
    // Default height is 170 from hook
    const heightInput = getNumberInputByLabel('Height (cm)') as HTMLInputElement
    expect(heightInput.value).toBe('170')
    // No error initially
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    // Results render given defaults should be visible (height valid) after first paint
    expect(screen.getByText(/Ideal Body Weight \(IBW\) Result/i)).toBeInTheDocument()
    expect(screen.getByText('Ideal Body Weight (Devine)')).toBeInTheDocument()
  })

  it('shows error when height is invalid or below 152.4 cm', async () => {
    const user = userEvent.setup()
    render(<IdealBodyWeightPage />)
    const heightInput = getNumberInputByLabel('Height (cm)') as HTMLInputElement

    // Invalid: empty
    await user.clear(heightInput)
    expect(screen.getByText('Please enter a valid positive height.')).toBeInTheDocument()

    // Invalid: negative
    await user.clear(heightInput)
    await user.type(heightInput, '-10')
    expect(screen.getByText('Please enter a valid positive height.')).toBeInTheDocument()

    // Below minimum
    await user.clear(heightInput)
    await user.type(heightInput, '150')
    expect(screen.getByText('Height must be at least 5 feet (152.4 cm).')).toBeInTheDocument()
  })

  it('calculates IBW and displays result for male and female', async () => {
    const user = userEvent.setup()
    render(<IdealBodyWeightPage />)

    // With default male and height 170, IBW should be visible
    expect(screen.getByText(/Ideal Body Weight \(IBW\) Result/i)).toBeInTheDocument()
    expect(screen.getByText('Ideal Body Weight (Devine)')).toBeInTheDocument()

    // Switch to female and ensure still shows result
    const femaleRadio = screen.getByLabelText('Female')
    await user.click(femaleRadio)
    expect(screen.getByText(/Ideal Body Weight \(IBW\) Result/i)).toBeInTheDocument()
  })

  it('shows Adjusted Body Weight when actual body weight is provided and > 0', async () => {
    const user = userEvent.setup()
    render(<IdealBodyWeightPage />)

    const actualInput = getNumberInputByLabel('Actual Body Weight (kg) - Optional') as HTMLInputElement
    // Enter an actual body weight
    await user.type(actualInput, '90')

    expect(screen.getByText(/Adjusted Body Weight \(AdjBW\)/i)).toBeInTheDocument()
    expect(screen.getByText('Adjusted Body Weight')).toBeInTheDocument()
    // Info alert about AdjBW context appears
    expect(screen.getByText('What is Adjusted Body Weight?')).toBeInTheDocument()
  })

  it('hides Adjusted Body Weight when actual body weight is 0 or invalid', async () => {
    const user = userEvent.setup()
    render(<IdealBodyWeightPage />)

    const actualInput = getNumberInputByLabel('Actual Body Weight (kg) - Optional') as HTMLInputElement

    // Enter 0 -> AdjBW should not be present
    await user.clear(actualInput)
    await user.type(actualInput, '0')
    expect(screen.queryByText(/Adjusted Body Weight \(AdjBW\)/i)).not.toBeInTheDocument()

    // Enter invalid text -> AdjBW should not be present
    await user.clear(actualInput)
    await user.type(actualInput, 'abc')
    expect(screen.queryByText(/Adjusted Body Weight \(AdjBW\)/i)).not.toBeInTheDocument()
  })

  it('resets form to defaults and clears errors/results', async () => {
    const user = userEvent.setup()
    render(<IdealBodyWeightPage />)

    const heightInput = getNumberInputByLabel('Height (cm)') as HTMLInputElement
    const actualInput = getNumberInputByLabel('Actual Body Weight (kg) - Optional') as HTMLInputElement

    // Cause an error state first
    await user.clear(heightInput)
    await user.type(heightInput, '150')
    expect(screen.getByText('Height must be at least 5 feet (152.4 cm).')).toBeInTheDocument()

    // Fill actual BW to show AdjBW after reset it should clear
    await user.clear(heightInput)
    await user.type(heightInput, '170')
    await user.type(actualInput, '90')
    expect(screen.getByText(/Adjusted Body Weight \(AdjBW\)/i)).toBeInTheDocument()

    // Click Reset
    await user.click(screen.getByRole('button', { name: /reset/i }))

    // Defaults restored
    expect(heightInput.value).toBe('170')
    expect(actualInput.value).toBe('')

    // No error shown
    expect(screen.queryByText('Height must be at least 5 feet (152.4 cm).')).not.toBeInTheDocument()

    // AdjBW hidden
    expect(screen.queryByText(/Adjusted Body Weight \(AdjBW\)/i)).not.toBeInTheDocument()
  })
})
