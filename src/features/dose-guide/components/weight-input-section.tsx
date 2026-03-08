// src/features/dose-guide/components/weight-input-section.tsx
'use client'

import { Weight } from 'lucide-react'
import { useCallback, useEffect, useId, useState } from 'react'
import { Label } from '@/components/ui/label'
import { MobileFormField } from '@/components/ui/mobile-form'
import { MobileInput } from '@/components/ui/mobile-input'
import { useScreenReader } from '@/hooks/use-screen-reader'
import { useCalculatorStore } from '../stores/calculator-store'

interface WeightInputSectionProps {
  disabled?: boolean
}

/**
 * Render a weight input section for entering patient weight in kilograms with validation, debounced updates to the calculator store, and screen reader announcements.
 *
 * @returns The rendered weight input section as JSX
 */
export function WeightInputSection({ disabled }: Readonly<WeightInputSectionProps>) {
  const { announceStatus } = useScreenReader()

  const { displayWeight, setDisplayWeight, setIsWeightManuallyEntered } = useCalculatorStore()

  const inputId = useId()
  const descriptionId = useId()

  // Local input string preserves what the user types (including "15." or ".5")
  const [localValue, setLocalValue] = useState<string>(displayWeight === undefined ? '' : String(displayWeight))

  const handleInputChange = useCallback(
    (value: string) => {
      setLocalValue(value)

      if (value.trim() === '') {
        // Cleared input: reflect that in store and don't mark as manual entry
        setDisplayWeight(undefined)
        setIsWeightManuallyEntered(false)
        announceStatus('Weight cleared')
        return
      }

      const numericValue = Number.parseFloat(value)
      if (!Number.isNaN(numericValue) && numericValue > 0) {
        // Valid numeric weight -> update immediately
        setDisplayWeight(numericValue)
        setIsWeightManuallyEntered(true)
        announceStatus(`Weight updated to ${numericValue} kilograms`)
      } else {
        // Invalid or incomplete decimal input (e.g., "15." or "abc") -> clear stored weight
        setDisplayWeight(undefined)
        setIsWeightManuallyEntered(true)
      }
    },
    [announceStatus, setDisplayWeight, setIsWeightManuallyEntered],
  )

  // Keep local input in sync if displayWeight is changed externally
  useEffect(() => {
    const displayStr = displayWeight === undefined ? '' : String(displayWeight)
    if (displayStr !== localValue) {
      setLocalValue(displayStr)
    }
  }, [displayWeight, localValue])

  return (
    <div className='relative' id='weight-input'>
      <MobileFormField className='space-y-2'>
        <div className='flex items-center justify-between'>
          <Label htmlFor={inputId} className='flex items-center gap-2 font-semibold text-sm md:text-base'>
            <Weight className='text-primary size-4 md:size-5' />
            Weight (Optional)
          </Label>
        </div>

        <div id={descriptionId} className='sr-only'></div>

        <div className='flex items-center gap-2'>
          <div className='relative flex-1'>
            <MobileInput
              id={inputId}
              name='quick-weight'
              type='text'
              mobileKeyboard='decimal'
              placeholder='e.g., 15.5'
              value={localValue}
              onChange={handleInputChange}
              scrollIntoViewOnFocus={true}
              className='h-10 min-h-[44px] pl-3 pr-12 text-base font-medium md:h-12 md:min-h-[48px] md:pl-4'
              disabled={disabled}
              min='0'
              step='0.1'
              showValidationIcon={false}
              aria-label='Patient weight in kilograms'
              aria-describedby={descriptionId}
            />
            <label
              htmlFor={inputId}
              className='absolute right-3 top-1/2 -translate-y-1/2 cursor-text font-medium text-muted-foreground text-sm md:text-base'
            >
              kg
            </label>
          </div>
        </div>
      </MobileFormField>
    </div>
  )
}
