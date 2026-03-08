// src/features/dose-guide/components/age-input-section.tsx
'use client'

import { Calendar } from 'lucide-react'
import { useCallback, useId } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MobileFormField } from '@/components/ui/mobile-form'
import { MobileInput } from '@/components/ui/mobile-input'
import { useScreenReader } from '@/hooks/use-screen-reader'
import { useCalculatorStore } from '../stores/calculator-store'
import type { AgeInputUnit } from '../lib/types'

interface AgeInputSectionProps {
  disabled?: boolean
}

/**
 * Render an age input paired with a years/months unit toggle.
 *
 * Updates the global calculator state and announces changes to assistive technologies when the
 * numeric age or unit is changed. Clearing the input resets the stored age to 0.
 *
 * @param disabled - If true, disables the age input and unit toggle.
 * @returns A React element containing a labeled age input and a years/months toggle button.
 */
export function AgeInputSection({ disabled }: Readonly<AgeInputSectionProps>) {
  // Directly use the global state from Zustand store
  const { displayAge, displayAgeUnit, setDisplayAge, setIsWeightManuallyEntered } = useCalculatorStore()
  const { announceStatus } = useScreenReader()

  const inputId = useId()
  const unitId = useId()

  const handleAgeValueChange = useCallback(
    (value: string) => {
      const numericValue = Number.parseInt(value, 10)
      // Only update if the value is a valid, non-negative integer
      if (!Number.isNaN(numericValue) && numericValue >= 0) {
        setDisplayAge(numericValue, displayAgeUnit)
        setIsWeightManuallyEntered(false) // Re-estimate weight when age changes
        announceStatus(`Age updated to ${numericValue} ${displayAgeUnit}`)
      } else if (value === '') {
        // Allow clearing the input
        setDisplayAge(0, displayAgeUnit)
        setIsWeightManuallyEntered(false)
        announceStatus('Age cleared')
      }
    },
    [displayAgeUnit, setDisplayAge, setIsWeightManuallyEntered, announceStatus],
  )

  const handleUnitToggle = useCallback(() => {
    const newUnit: AgeInputUnit = displayAgeUnit === 'years' ? 'months' : 'years'
    setDisplayAge(displayAge, newUnit)
    setIsWeightManuallyEntered(false) // Re-estimate weight when unit changes
    announceStatus(`Age unit changed to ${newUnit}`)
  }, [displayAge, displayAgeUnit, setDisplayAge, setIsWeightManuallyEntered, announceStatus])

  return (
    <div className='relative' id='age-input'>
      <MobileFormField className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label htmlFor={inputId} className='flex items-center gap-2 font-semibold text-sm md:text-base'>
            <Calendar className='text-primary size-4 md:size-5' />
            Age
          </Label>
        </div>

        <div className='flex items-center gap-2'>
          <MobileInput
            id={inputId}
            name='quick-age'
            type='text'
            mobileKeyboard='numeric'
            placeholder='e.g., 5'
            value={displayAge > 0 ? displayAge.toString() : ''}
            onChange={handleAgeValueChange}
            scrollIntoViewOnFocus={true}
            className='h-10 min-h-[44px] px-3 text-base font-medium md:h-12 md:min-h-[48px] md:px-4'
            disabled={disabled}
            min='0'
            step='1'
            showValidationIcon={false}
            aria-label='Patient age'
            aria-describedby={unitId}
          />
          <Button
            id={unitId}
            type='button'
            variant='outline'
            onClick={handleUnitToggle}
            disabled={disabled}
            className='h-10 min-w-[90px] px-3 text-sm font-medium transition-colors md:h-12'
            aria-label={`Toggle age unit. Currently ${displayAgeUnit}`}
          >
            {displayAgeUnit === 'years' ? 'Years' : 'Months'}
          </Button>
        </div>
      </MobileFormField>
    </div>
  )
}
