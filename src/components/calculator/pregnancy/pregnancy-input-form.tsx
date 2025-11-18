// src/components/calculator/pregnancy/pregnancy-input-form.tsx
'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResponsiveDatePicker } from '@/components/ui/responsive-date-picker'

interface PregnancyInputFormProps {
  lmpDate: Date | undefined
  setLmpDate: (date: Date | undefined) => void
  ultrasoundDate: Date | undefined
  setUltrasoundDate: (date: Date | undefined) => void
  gaWeeks: string
  setGaWeeks: (weeks: string) => void
  gaDays: string
  setGaDays: (days: string) => void
}

/**
 * Renders a pregnancy input form with date pickers for LMP and first-trimester ultrasound and numeric inputs for gestational age.
 *
 * The LMP picker disables dates before 1900-01-01 and dates after today. The ultrasound picker disables dates after today and dates before the selected LMP (when present). The gestational age inputs (weeks and days) are disabled until an ultrasound date is selected.
 *
 * @returns A React element containing the pregnancy input form.
 */
export function PregnancyInputForm({
  lmpDate,
  setLmpDate,
  ultrasoundDate,
  setUltrasoundDate,
  gaWeeks,
  setGaWeeks,
  gaDays,
  setGaDays,
}: Readonly<PregnancyInputFormProps>) {
  const currentYear = new Date().getFullYear()

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='lmp-date'>First Day of Last Menstrual Period (LMP)</Label>
        <ResponsiveDatePicker
          triggerId='lmp-date'
          date={lmpDate}
          onSelect={setLmpDate}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          fromYear={1900}
          toYear={currentYear}
          aria-label='Select Last Menstrual Period date'
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='ultrasound-date'>First-Trimester Ultrasound Date</Label>
        <ResponsiveDatePicker
          triggerId='ultrasound-date'
          date={ultrasoundDate}
          onSelect={setUltrasoundDate}
          disabled={(date) => date > new Date() || !lmpDate || date < lmpDate}
          fromYear={lmpDate ? lmpDate.getFullYear() : 1900}
          toYear={currentYear}
          aria-label='Select ultrasound date'
        />
      </div>
      <div className='space-y-2'>
        <Label>Gestational Age at Ultrasound (CRL)</Label>
        <div className='flex items-center gap-2'>
          <Input
            type='number'
            placeholder='Weeks'
            value={gaWeeks}
            onChange={(e) => setGaWeeks(e.target.value)}
            min='4'
            max='14'
            aria-label='Gestational age in weeks'
            disabled={!ultrasoundDate}
          />
          <span className='text-muted-foreground'>weeks</span>
          <Input
            type='number'
            placeholder='Days'
            value={gaDays}
            onChange={(e) => setGaDays(e.target.value)}
            min='0'
            max='6'
            aria-label='Gestational age in days'
            disabled={!ultrasoundDate}
          />
          <span className='text-muted-foreground'>days</span>
        </div>
      </div>
    </div>
  )
}
