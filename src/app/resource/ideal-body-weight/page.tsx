// src/app/calculator/ideal-body-weight/page.tsx
'use client'

import { Info, RefreshCw, Weight } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useIdealBodyWeight } from '@/hooks/use-ideal-body-weight'

/**
 * Render a compact result card that displays a title, a prominent value, and its unit.
 *
 * @param title - Short label shown above the value
 * @param value - Formatted numeric or textual result shown prominently
 * @param unit - Unit label displayed alongside the value
 * @returns The card element containing the title, bold value, and unit label
 */
function ResultCard({ title, value, unit }: Readonly<{ title: string; value: string; unit: string }>) {
  return (
    <Card className='text-center bg-secondary/30 flex-1'>
      <CardHeader className='p-3 pb-2'>
        <CardDescription className='text-xs'>{title}</CardDescription>
      </CardHeader>
      <CardContent className='p-3 pt-0'>
        <p className='text-xl font-bold text-primary'>
          {value} <span className='text-base font-normal text-muted-foreground'>{unit}</span>
        </p>
      </CardContent>
    </Card>
  )
}

/**
 * Page component that calculates and displays Ideal Body Weight (Devine) and, when applicable, Adjusted Body Weight for adult patients.
 *
 * @returns The React element for the Ideal Body Weight calculator page.
 */
export default function IdealBodyWeightPage() {
  const { gender, heightCm, actualBw, error, results, setGender, setHeightCm, setActualBw, handleReset } =
    useIdealBodyWeight()

  const handleGenderChange = (value: string) => {
    if (value === 'male' || value === 'female') {
      setGender(value)
    }
  }

  return (
    <div className='w-full max-w-2xl mx-auto pb-24'>
      <div className='mb-8 hidden md:block'>
        <h1 className='text-3xl font-bold tracking-tight'>Ideal Body Weight (IBW) Calculator</h1>
        <p className='text-muted-foreground mt-2'>
          Estimate Ideal Body Weight using the Devine formula for adult patients.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Data</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={handleGenderChange} className='flex gap-4'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='male' id='male' />
                <Label htmlFor='male'>Male</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='female' id='female' />
                <Label htmlFor='female'>Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='height'>Height (cm)</Label>
            <Input
              id='height'
              type='number'
              placeholder='e.g., 170'
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='actualBw'>Actual Body Weight (kg) - Optional</Label>
            <Input
              id='actualBw'
              type='number'
              placeholder='For Adjusted Body Weight calculation'
              value={actualBw}
              onChange={(e) => setActualBw(e.target.value)}
            />
          </div>

          <Button onClick={handleReset} variant='outline' className='w-full sm:w-auto'>
            <RefreshCw className='w-4 h-4 mr-2' />
            Reset
          </Button>

          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {results && !error && (
        <div className='mt-8 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Weight className='w-5 h-5 text-primary' />
                Ideal Body Weight (IBW) Result
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-center'>
                <ResultCard title='Ideal Body Weight (Devine)' value={results.ibw.toFixed(1)} unit='kg' />
              </div>
            </CardContent>
          </Card>

          {results.adjBw && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Weight className='w-5 h-5 text-primary' />
                  Adjusted Body Weight (AdjBW)
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex justify-center'>
                  <ResultCard title='Adjusted Body Weight' value={results.adjBw.toFixed(1)} unit='kg' />
                </div>
                <Alert variant='default'>
                  <Info className='w-4 h-4' />
                  <AlertTitle>What is Adjusted Body Weight?</AlertTitle>
                  <AlertDescription>
                    AdjBW is used for dosing certain medications in overweight patients. It accounts for the fact that
                    some drugs do not distribute well into fat tissue.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <p className='text-xs text-muted-foreground mt-4 text-center'>
        IBW formulas are estimates and may not be accurate for all populations, such as very tall or short individuals,
        or athletes. Clinical judgment is advised.
      </p>
    </div>
  )
}
