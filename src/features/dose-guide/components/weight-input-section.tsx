// src/features/dose-guide/components/weight-input-section.tsx
'use client'

import { Weight } from 'lucide-react'
import { useId } from 'react'
import { Label } from '@/components/ui/label'
import { MobileFormField } from '@/components/ui/mobile-form'
import { MobileInput } from '@/components/ui/mobile-input'
import { useWeightInput } from '../hooks/use-weight-input'

interface WeightInputSectionProps {
  disabled?: boolean
}

/**
 * Render a weight input section for entering patient weight in kilograms
 * with validation, debounced updates to the calculator store,
 * and screen reader announcements.
 */
export function WeightInputSection({ disabled }: Readonly<WeightInputSectionProps>) {
  const { localValue, handleInputChange } = useWeightInput()
  const inputId = useId()
  const descriptionId = useId()

  return (
    <div className="relative" id="weight-input">
      <MobileFormField className="space-y-fluid-input-field">
        
        <div className="flex items-center justify-between">
          <Label
            htmlFor={inputId}
            className="flex items-center gap-fluid-base font-semibold text-fluid-input-label"
          >
            <Weight className="text-primary size-fluid-icon-lg" />
            Weight (Optional)
          </Label>
        </div>

        <div id={descriptionId} className="sr-only"></div>

        <div className="flex items-center gap-fluid-base">
          <div className="relative flex-1">
            
            <MobileInput
              id={inputId}
              name="quick-weight"
              type="text"
              mobileKeyboard="decimal"
              placeholder="e.g., 15.5"
              value={localValue}
              onChange={handleInputChange}
              scrollIntoViewOnFocus={true}
              className="h-fluid-input min-h-[44px] pl-fluid-input pr-fluid-input-unit text-fluid-input-value font-medium"
              disabled={disabled}
              min="0"
              step="0.1"
              showValidationIcon={false}
              aria-label="Patient weight in kilograms"
              aria-describedby={descriptionId}
            />

            <label
              htmlFor={inputId}
              className="absolute top-1/2 -translate-y-1/2 cursor-text font-medium text-muted-foreground text-fluid-unit right-fluid-unit"
            >
              kg
            </label>

          </div>
        </div>

      </MobileFormField>
    </div>
  )
}
