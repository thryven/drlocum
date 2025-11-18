/**
 * @fileoverview Tests for FloatingInput component
 */

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FloatingInput } from '../floating-input'

describe('FloatingInput', () => {
  it('renders with label', () => {
    render(<FloatingInput label='Email' />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('floats label on focus', () => {
    render(<FloatingInput label='Email' />)
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email')

    // Label should not be floating initially
    expect(label).not.toHaveClass('scale-[0.875]')

    // Focus the input
    fireEvent.focus(input)

    // Label should float
    expect(label).toHaveClass('scale-[0.875]')
  })

  it('keeps label floating when input has value', () => {
    render(<FloatingInput label='Email' value='test@example.com' />)
    const label = screen.getByText('Email')

    // Label should be floating because input has value
    expect(label).toHaveClass('scale-[0.875]')
  })

  it('displays error message', () => {
    render(<FloatingInput label='Email' error='Invalid email' />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('displays success message', () => {
    render(<FloatingInput label='Email' success='Email is valid' />)
    expect(screen.getByText('Email is valid')).toBeInTheDocument()
  })

  it('applies error state styling', () => {
    render(<FloatingInput label='Email' error='Invalid email' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-error')
  })

  it('applies success state styling', () => {
    render(<FloatingInput label='Email' success='Email is valid' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-success')
  })

  it('sets correct inputMode for mobile keyboard types', () => {
    const { rerender } = render(<FloatingInput label='Phone' mobileKeyboard='tel' />)
    let input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('inputMode', 'tel')

    rerender(<FloatingInput label='Amount' mobileKeyboard='decimal' />)
    input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('inputMode', 'decimal')
  })

  it('has minimum height of 44px for touch targets', () => {
    render(<FloatingInput label='Email' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('min-h-[44px]')
  })

  it('uses 16px base font size to prevent iOS zoom', () => {
    render(<FloatingInput label='Email' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('text-base')
  })
})
