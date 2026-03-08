// src/features/dose-guide/components/age-input-section.tsx
'use client'

import { Calendar } from 'lucide-react'
import { useId } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MobileFormField } from '@/components/ui/mobile-form'
import { MobileInput } from '@/components/ui/mobile-input'
import { useAgeInput } from '../hooks'

interface AgeInputSectionProps {
  disabled?: boolean
}

/**
 * Renders the UI for the age input section.
 * This is a presentational component that gets its state and logic
 * from the `useAgeInput` hook.
 *
 * @param disabled - If true, disables the age input and unit toggle.
 * @returns A React element containing a labeled age input and a years/months toggle button.
 */
export function AgeInputSection({ disabled }: Readonly<AgeInputSectionProps>) {
  const { displayAge, displayAgeUnit, handleAgeValueChange, handleUnitToggle } = useAgeInput()
  const inputId = useId()
  const unitId = useId()

  return (
    <div className="relative" id="age-input">
      <MobileFormField className="space-y-fluid-input-field">
        <div className="flex items-center justify-between">
          <Label
            htmlFor={inputId}
            className="flex items-center gap-fluid-base font-semibold text-fluid-input-label"
          >
            <Calendar className="text-primary size-fluid-input-icon" />
            Age
          </Label>
        </div>

        <div className="flex items-center gap-fluid-base">
          <MobileInput
            id={inputId}
            name="quick-age"
            type="text"
            mobileKeyboard="numeric"
            placeholder="e.g., 5"
            value={displayAge > 0 ? displayAge.toString() : ''}
            onChange={handleAgeValueChange}
            scrollIntoViewOnFocus={true}
            className="h-fluid-input min-h-[44px] px-fluid-input text-fluid-input-value font-medium"
            disabled={disabled}
            min="0"
            step="1"
            showValidationIcon={false}
          />

          <Button
            id={unitId}
            type="button"
            variant="outline"
            onClick={handleUnitToggle}
            disabled={disabled}
            className="h-fluid-input w-fluid-toggle-btn px-fluid-input text-fluid-sm font-medium transition-colors"
          >
            {displayAgeUnit === 'years' ? 'Years' : 'Months'}
          </Button>
        </div>
      </MobileFormField>
    </div>
  )
}
