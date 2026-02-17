'use client'

import { AlertTriangle, Baby, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useNeonateWeightLoss } from '@/hooks/use-neonate-weight-loss'
import { cn } from '@/lib/utils'

/**
 * Render a compact card that displays a titled metric value alongside its unit.
 *
 * @param title - The card header label
 * @param value - The metric value to emphasize
 * @param unit - The unit displayed next to the value
 * @returns A JSX element representing the styled result card
 */
function ResultCard({ title, value, unit }: { readonly title: string; readonly value: string; readonly unit: string }) {
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
 * Render an interpretation alert styled and iconified according to the interpretation's severity.
 *
 * The alert shows a severity-derived title (capitalized), an icon (baby for `normal`, warning otherwise),
 * and the interpretation message.
 *
 * @param interpretation - Object describing the interpretation:
 *   - `message`: The textual message to display inside the alert.
 *   - `severity`: One of `'normal' | 'concern' | 'danger'`, which controls styling and icon selection.
 * @returns A React element rendering a severity-styled alert containing an icon, a title, and the message.
 */
function InterpretationAlert({
  interpretation,
}: {
  readonly interpretation: { message: string; severity: 'normal' | 'concern' | 'danger' }
}) {
  const severityClasses = {
    normal: 'text-green-600 border-green-500/50 bg-green-50/50 dark:bg-green-900/20',
    concern: 'text-yellow-600 border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-900/20',
    danger: 'text-red-600 border-red-500/50 bg-red-50/50 dark:bg-red-900/20',
  }

  const Icon = interpretation.severity === 'normal' ? Baby : AlertTriangle

  return (
    <Alert className={cn('mt-4', severityClasses[interpretation.severity])}>
      <Icon className='h-4 w-4' />
      <AlertTitle>{interpretation.severity.charAt(0).toUpperCase() + interpretation.severity.slice(1)}</AlertTitle>
      <AlertDescription>{interpretation.message}</AlertDescription>
    </Alert>
  )
}

/**
 * Render the Neonate Weight Loss Calculator page UI.
 *
 * Renders a form for entering birth weight, current weight, weight unit, and infant age (hours),
 * shows validation errors when present, and displays computed weight-change results with an
 * interpretation alert when a result is available.
 *
 * @returns The React element for the neonate weight loss calculator page.
 */
export default function NeonateWeightLossPage() {
  const {
    birthWeight,
    setBirthWeight,
    currentWeight,
    setCurrentWeight,
    ageInHours,
    setAgeInHours,
    unit,
    setUnit,
    result,
    error,
    handleReset,
  } = useNeonateWeightLoss()

  return (
    <div className='w-full max-w-2xl mx-auto pb-24'>
      <div className='mb-8 hidden md:block'>
        <h1 className='text-3xl font-bold tracking-tight'>Neonate Weight Loss Calculator</h1>
        <p className='text-muted-foreground mt-2'>Calculate the percentage of weight change in newborns.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Data</CardTitle>
          <CardDescription>Enter the birth and current weights.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <Label>Weight Unit</Label>
            <RadioGroup value={unit} onValueChange={setUnit} className='flex gap-4'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='grams' id='grams' />
                <Label htmlFor='grams'>Grams</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='kg' id='kg' />
                <Label htmlFor='kg'>Kilograms</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='lb' id='lb' />
                <Label htmlFor='lb'>Pounds & Ounces</Label>
              </div>
            </RadioGroup>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='birthWeight'>Birth Weight</Label>
              <Input
                id='birthWeight'
                type='number'
                placeholder={`e.g., ${unit === 'grams' ? '3400' : '3.4'}`}
                value={birthWeight}
                onChange={(e) => setBirthWeight(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='currentWeight'>Current Weight</Label>
              <Input
                id='currentWeight'
                type='number'
                placeholder={`e.g., ${unit === 'grams' ? '3200' : '3.2'}`}
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
              />
            </div>
          </div>
          {unit === 'lb' && (
            <div className='text-xs text-muted-foreground'>
              Note: For pounds, use decimal values (e.g., 7.5 for 7 lb 8 oz).
            </div>
          )}

          <div className='space-y-2'>
            <Label htmlFor='ageInHours'>{`Infant's Age (hours)`}</Label>
            <Input
              id='ageInHours'
              type='number'
              placeholder='e.g., 48'
              value={ageInHours}
              onChange={(e) => setAgeInHours(e.target.value)}
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

      {result && !error && (
        <div className='mt-8 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Baby className='w-5 h-5 text-primary' />
                Weight Change Results
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-col sm:flex-row gap-3'>
                <ResultCard title='Weight Change' value={result.weightChange.toFixed(0)} unit='grams' />
                <ResultCard title='Percentage Change' value={result.percentageChange.toFixed(2)} unit='%' />
              </div>
              <InterpretationAlert interpretation={result.interpretation} />
            </CardContent>
          </Card>
        </div>
      )}

      <p className='text-xs text-muted-foreground mt-4 text-center'>
        This calculator is a tool for clinical guidance. Always consider the full clinical picture. Weight loss up to
        10% is generally considered normal in the first week.
      </p>
    </div>
  )
}
