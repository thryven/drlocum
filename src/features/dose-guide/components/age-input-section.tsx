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
      <MobileFormField className="space-y-[clamp(0.35rem,0.6vw,0.6rem)]">
        <div className="flex items-center justify-between">
          <Label
            htmlFor={inputId}
            className="flex items-center gap-[clamp(0.35rem,0.7vw,0.6rem)] font-semibold text-[clamp(0.8rem,1vw,1.2rem)]"
          >
            <Calendar className="text-primary size-[clamp(0.9rem,1.2vw,1.35rem)]" />
            Age
          </Label>
        </div>

        <div className="flex items-center gap-[clamp(0.35rem,0.7vw,0.6rem)]">
          <MobileInput
            id={inputId}
            name="quick-age"
            type="text"
            mobileKeyboard="numeric"
            placeholder="e.g., 5"
            value={displayAge > 0 ? displayAge.toString() : ''}
            onChange={handleAgeValueChange}
            scrollIntoViewOnFocus={true}
            className="
              h-[clamp(2.5rem,3.5vw,3rem)]
              min-h-[44px]
              px-[clamp(0.6rem,1vw,0.9rem)]
              text-[clamp(0.9rem,1.1vw,1.1rem)]
              font-medium
            "
            disabled={disabled}
            min="0"
            step="1"
            showValidationIcon={false}
            aria-label="Patient age"
            aria-describedby={unitId}
          />

          <Button
            id={unitId}
            type="button"
            variant="outline"
            onClick={handleUnitToggle}
            disabled={disabled}
            className="
              h-[clamp(2.5rem,3.5vw,3rem)]
              min-w-[clamp(5rem,7vw,6rem)]
              px-[clamp(0.6rem,1vw,0.9rem)]
              text-[clamp(0.85rem,1vw,1rem)]
              font-medium
              transition-colors
            "
            aria-label={`Toggle age unit. Currently ${displayAgeUnit}`}
          >
            {displayAgeUnit === 'years' ? 'Years' : 'Months'}
          </Button>
        </div>
      </MobileFormField>
    </div>
  )
}
