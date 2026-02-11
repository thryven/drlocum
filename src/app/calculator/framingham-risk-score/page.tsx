// src\app\calculator\framingham-risk-score\page.tsx
'use client'

import { AlertTriangle, HeartPulse, RefreshCw } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFraminghamScore } from '@/hooks/use-framingham-score'
import { cn } from '@/lib/utils'
import type { FraminghamState } from '@/lib/utils/framingham-score'

interface PatientDataCardProps {
  state: FraminghamState
  handleInputChange: (field: keyof FraminghamState, value: string) => void
  handleSelectChange: (field: keyof FraminghamState, value: string) => void
  handleReset: () => void
}

/**
 * Render a card containing inputs for patient clinical data used to calculate the Framingham 10-year CHD risk.
 *
 * @param state - Current form values for the patient (gender, age, cholesterol, blood pressure, smoker/treatment flags)
 * @param handleInputChange - Called with a field key and string value when a numeric input changes
 * @param handleSelectChange - Called with a field key and string value when a select or radio value changes
 * @param handleReset - Resets the form to its initial state
 * @returns The React element for the patient data input card
 */
function PatientDataCard({
  state,
  handleInputChange,
  handleSelectChange,
  handleReset,
}: Readonly<PatientDataCardProps>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Data</CardTitle>
        <CardDescription>Enter the following clinical information.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <Label>Gender</Label>
          <RadioGroup
            value={state.gender}
            onValueChange={(value) => handleSelectChange('gender', value)}
            className='flex gap-4'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='male' id='male' />{' '}
              <Label htmlFor='male' className='font-normal'>
                Male
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='female' id='female' />{' '}
              <Label htmlFor='female' className='font-normal'>
                Female
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='age'>Age</Label>
            <Input
              id='age'
              type='number'
              value={state.age}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('age', e.target.value)}
              min='20'
              max='79'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='isSmoker'>Smoker</Label>
            <Select value={state.isSmoker} onValueChange={(value) => handleSelectChange('isSmoker', value)}>
              <SelectTrigger id='isSmoker'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='yes'>Yes</SelectItem>
                <SelectItem value='no'>No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='totalCholesterol'>Total Cholesterol (mmol/L)</Label>
            <Input
              id='totalCholesterol'
              type='number'
              value={state.totalCholesterol}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('totalCholesterol', e.target.value)}
              step='0.1'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='hdlCholesterol'>HDL Cholesterol (mmol/L)</Label>
            <Input
              id='hdlCholesterol'
              type='number'
              value={state.hdlCholesterol}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('hdlCholesterol', e.target.value)}
              step='0.1'
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='systolicBP'>Systolic BP (mmHg)</Label>
            <Input
              id='systolicBP'
              type='number'
              value={state.systolicBP}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('systolicBP', e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='isTreatedForBP'>Treated for HBP?</Label>
            <Select value={state.isTreatedForBP} onValueChange={(value) => handleSelectChange('isTreatedForBP', value)}>
              <SelectTrigger id='isTreatedForBP'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='yes'>Yes</SelectItem>
                <SelectItem value='no'>No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='hasDiabetes'>Diabetes</Label>
            <Select value={state.hasDiabetes} onValueChange={(value) => handleSelectChange('hasDiabetes', value)}>
              <SelectTrigger id='hasDiabetes'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='yes'>Yes</SelectItem>
                <SelectItem value='no'>No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 pt-4'>
          <Button type='submit' className='w-full'>
            Calculate Risk
          </Button>
          <Button type='button' variant='outline' className='w-full' onClick={handleReset}>
            <RefreshCw className='w-4 h-4 mr-2' /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Page component for calculating the 10-year risk of hard coronary heart disease.
 *
 * Renders a two-column UI with a patient data input card (gender, age, smoking status,
 * cholesterol, blood pressure and treatment) and a results card that displays the
 * Framingham point total and calculated 10-year CHD risk. Includes controls to
 * calculate and reset inputs and an interpretation section with risk thresholds.
 *
 * Intended for adults aged 20–79 without known heart disease or diabetes.
 *
 * @returns The React element for the Framingham Risk Score page containing the input form, results display, and interpretation.
 */
export default function FraminghamRiskScorePage() {
  const { state, result, showResult, handleInputChange, handleSelectChange, handleSubmit, handleReset, getRiskColor } =
    useFraminghamScore()

  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      <div className='mb-8 hidden md:block'>
        <h1 className='text-3xl font-bold tracking-tight'>Framingham Risk Score</h1>
        <p className='text-muted-foreground mt-2'>For 10-Year Risk of General Cardiovascular Disease.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <PatientDataCard
            state={state}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleReset={handleReset}
          />

          {/* Results Column */}
          <Card className={cn('transition-opacity duration-300', showResult ? 'opacity-100' : 'opacity-50')}>
            <CardHeader>
              <CardTitle>Risk Score</CardTitle>
              <CardDescription>{`The patient's 10-year risk assessment.`}</CardDescription>
            </CardHeader>
            <CardContent className='text-center space-y-6'>
              {showResult && result !== null ? (
                <>
                  <div>
                    <p className='text-sm text-muted-foreground'>Framingham Point Total</p>
                    <p className='text-5xl font-bold text-primary'>{result.totalPoints}</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>10-Year CVD Risk</p>
                    <p className={cn('text-6xl font-bold', getRiskColor(result.riskPercent))}>{result.riskPercent}%</p>
                  </div>
                </>
              ) : (
                <div className='flex flex-col items-center justify-center h-full text-muted-foreground py-10'>
                  <HeartPulse className='w-16 h-16 mb-4' />
                  <p>Results will be displayed here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </form>
      <Card className='mt-8'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <AlertTriangle className='w-5 h-5 text-orange-500' /> Interpretation
          </CardTitle>
        </CardHeader>
        <CardContent className='text-sm text-muted-foreground space-y-2'>
          <p>
            <strong className='text-foreground'>Low Risk:</strong> Less than 10%
          </p>
          <p>
            <strong className='text-foreground'>Intermediate Risk:</strong> 10% to 20%
          </p>
          <p>
            <strong className='text-foreground'>High Risk:</strong> Greater than 20%
          </p>
          <p className='text-xs mt-4'>
            This tool is an estimate and should be used to support, not replace, clinical judgment. It is intended for
            adults aged 20-79 without known heart disease or diabetes.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
