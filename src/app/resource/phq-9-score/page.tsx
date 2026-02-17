// src/app/calculator/phq-9-score/page.tsx
'use client'

import { AlertTriangle, Check, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { usePhq9Score } from '@/hooks/use-phq-9-score'
import { cn } from '@/lib/utils'
import type { AnswerValue, Question } from '@/lib/utils/phq-9-score'
import { questions } from '@/lib/utils/phq-9-score'

/**
 * Render a single PHQ-9 question with a numbered prompt and four selectable answer options.
 *
 * The component displays the question text prefixed with its 1-based index and a radio group
 * offering the four PHQ-9 response choices (0–3). Selecting an option invokes `onChange`
 * with the chosen numeric `AnswerValue`.
 *
 * @param question - The question data (id and text) to display
 * @param value - The currently selected answer value for this question
 * @param onChange - Callback invoked with the new `AnswerValue` when the selection changes
 * @param index - Zero-based position of the question used to render its numeric prefix
 * @returns The rendered question row element
 */
function QuestionRow({
  question,
  value,
  onChange,
  index,
}: {
  readonly question: Question
  readonly value: AnswerValue
  readonly onChange: (value: AnswerValue) => void
  readonly index: number
}) {
  return (
    <div className='flex flex-col rounded-lg border p-4 transition-colors hover:bg-accent/50'>
      <div className='mb-4'>
        <Label className='font-medium'>
          {index + 1}. {question.text}
        </Label>
      </div>
      <RadioGroup
        value={String(value)}
        onValueChange={(val) => {
          onChange(Number.parseInt(val, 10) as AnswerValue)
        }}
        className='grid grid-cols-2 sm:grid-cols-4 gap-4'
        aria-label={question.text}
      >
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='0' id={`${question.id}-0`} />
          <Label htmlFor={`${question.id}-0`} className='font-normal'>
            Not at all
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='1' id={`${question.id}-1`} />
          <Label htmlFor={`${question.id}-1`} className='font-normal'>
            Several days
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='2' id={`${question.id}-2`} />
          <Label htmlFor={`${question.id}-2`} className='font-normal'>
            More than half the days
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='3' id={`${question.id}-3`} />
          <Label htmlFor={`${question.id}-3`} className='font-normal'>
            Nearly every day
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

/**
 * Render a card showing a PHQ-9 numeric score, its severity label, and a recommended action.
 *
 * @param score - Total PHQ-9 score to display
 * @param severity - Severity label corresponding to the score (e.g., "Minimal", "Mild", "Moderate", "Moderately Severe", "Severe")
 * @param color - CSS text color class applied to the severity title
 * @param recommendation - Short recommendation or guidance associated with the severity
 * @returns A Card element containing the numeric score and an Alert showing severity and recommendation
 */
function ResultCard({
  score,
  severity,
  color,
  recommendation,
}: {
  readonly score: number
  readonly severity: string
  readonly color: 'text-green-600' | 'text-yellow-600' | 'text-orange-500' | 'text-red-600' | 'text-red-700'
  readonly recommendation: string
}) {
  let variant: 'destructive' | 'accent' | 'default' = 'default'
  if (severity === 'Severe' || severity === 'Moderately Severe') {
    variant = 'destructive'
  } else if (severity === 'Moderate') {
    variant = 'accent'
  }

  const icon = variant === 'destructive' ? <AlertTriangle className='w-4 h-4' /> : <Check className='w-4 h-4' />

  return (
    <Card>
      <CardHeader>
        <CardTitle>PHQ-9 Score</CardTitle>
        <CardDescription>Depression Severity Assessment</CardDescription>
      </CardHeader>
      <CardContent className='text-center space-y-4'>
        <p className='text-6xl font-bold'>{score}</p>
        <Alert variant={variant} className='text-left'>
          {icon}
          <AlertTitle className={cn(color)}>{severity}</AlertTitle>
          <AlertDescription>{recommendation}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

/**
 * Render the PHQ-9 questionnaire page with all questions, form controls to calculate or reset answers, and a conditional result display.
 *
 * The page presents nine questions with selectable responses, disables submission until all questions are answered, and shows a summary card with score, severity, and recommendation after calculation.
 *
 * @returns A JSX element containing the questionnaire form, action buttons (Calculate Score, Reset), helper text when incomplete, and the result card when available.
 */
export default function Phq9ScorePage() {
  const { answers, result, showResult, handleAnswerChange, handleSubmit, handleReset, isComplete } = usePhq9Score()

  return (
    <div className='w-full max-w-2xl mx-auto pb-24'>
      <div className='mb-8 hidden md:block'>
        <h1 className='text-3xl font-bold tracking-tight'>Patient Health Questionnaire-9 (PHQ-9)</h1>
        <p className='text-muted-foreground mt-2'>A tool for monitoring the severity of depression.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <CardDescription>
              Over the last 2 weeks, how often have you been bothered by any of the following problems?
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {questions.map((q, index) => (
              <QuestionRow
                key={q.id}
                question={q}
                value={answers[q.id] ?? -1}
                onChange={(value) => {
                  handleAnswerChange(q.id, value)
                }}
                index={index}
              />
            ))}

            <div className='flex flex-col sm:flex-row gap-2 pt-4'>
              <Button type='submit' className='w-full' disabled={!isComplete}>
                Calculate Score
              </Button>
              <Button type='button' variant='outline' className='w-full' onClick={handleReset}>
                <RefreshCw className='w-4 h-4 mr-2' />
                Reset
              </Button>
            </div>
            {!isComplete && (
              <p className='text-sm text-center text-muted-foreground pt-2'>
                Please answer all questions to calculate the score.
              </p>
            )}
          </CardContent>
        </Card>
      </form>

      {showResult && result && (
        <div className='mt-8'>
          <ResultCard {...result} />
        </div>
      )}

      <p className='text-xs text-muted-foreground mt-4 text-center'>
        The PHQ-9 is a screening tool. It is not a substitute for a professional clinical diagnosis.
      </p>
    </div>
  )
}
