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
      <MobileFormField className="space-y-[clamp(0.4rem,0.7vw,0.7rem)]">
        
        <div className="flex items-center justify-between">
          <Label
            htmlFor={inputId}
            className="flex items-center gap-[clamp(0.4rem,0.7vw,0.6rem)] font-semibold text-[clamp(0.8rem,1vw,1.2rem)]"
          >
            <Weight className="text-primary size-[clamp(0.95rem,1.3vw,1.4rem)]" />
            Weight (Optional)
          </Label>
        </div>

        <div id={descriptionId} className="sr-only"></div>

        <div className="flex items-center gap-[clamp(0.4rem,0.7vw,0.6rem)]">
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
              className="
                h-[clamp(2.5rem,3.5vw,3rem)]
                min-h-[44px]
                pl-[clamp(0.7rem,1vw,1rem)]
                pr-[clamp(2.5rem,4vw,3.5rem)]
                text-[clamp(0.9rem,1.1vw,1.1rem)]
                font-medium
              "
              disabled={disabled}
              min="0"
              step="0.1"
              showValidationIcon={false}
              aria-label="Patient weight in kilograms"
              aria-describedby={descriptionId}
            />

            <label
              htmlFor={inputId}
              className="
                absolute
                right-[clamp(0.7rem,1vw,1rem)]
                top-1/2
                -translate-y-1/2
                cursor-text
                font-medium
                text-muted-foreground
                text-[clamp(0.8rem,1vw,1rem)]
              "
            >
              kg
            </label>

          </div>
        </div>

      </MobileFormField>
    </div>
  )
}
