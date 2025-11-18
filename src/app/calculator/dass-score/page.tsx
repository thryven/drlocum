// src/app/calculator/dass-score/page.tsx
'use client'

import { AlertTriangle, Check, RefreshCw } from 'lucide-react'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useDassScore } from '@/hooks/use-dass-score'
import { cn } from '@/lib/utils'
import type { AnswerValue, Question } from '@/lib/utils/dass-score'
import { questions } from '@/lib/utils/dass-score'

/**
 * Renders a single DASS-21 question row with four selectable response options (0–3).
 *
 * @param question - The question object containing at least `id` and `text`.
 * @param value - The currently selected answer value for this question.
 * @param onChange - Callback invoked with the new `AnswerValue` when the selection changes.
 * @param index - Zero-based position of the question used for display numbering.
 * @returns A JSX element representing the question label and a 4-option radio group for selecting an answer.
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
            Did not apply to me at all
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='1' id={`${question.id}-1`} />
          <Label htmlFor={`${question.id}-1`} className='font-normal'>
            Applied to me to some degree
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='2' id={`${question.id}-2`} />
          <Label htmlFor={`${question.id}-2`} className='font-normal'>
            Applied to me a considerable degree
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='3' id={`${question.id}-3`} />
          <Label htmlFor={`${question.id}-3`} className='font-normal'>
            Applied to me very much
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

/**
 * Render a result card showing a category title, numeric score, and severity indicator.
 *
 * @param title - Category name (e.g., "Depression", "Anxiety", "Stress")
 * @param score - Numeric score to display prominently
 * @param severity - Severity label shown in the alert (e.g., "Mild", "Moderate", "Severe")
 * @param color - Tailwind text color class applied to the severity label
 * @returns A Card containing the title, a large centered score, and an Alert with the severity and corresponding icon/variant
 */
function ResultCard({
  title,
  score,
  severity,
  color,
}: {
  readonly title: string
  readonly score: number
  readonly severity: string
  readonly color: 'text-green-600' | 'text-yellow-600' | 'text-orange-500' | 'text-red-600' | 'text-red-700'
}) {
  let variant: 'destructive' | 'accent' | 'default' = 'default'
  if (severity === 'Severe' || severity === 'Extremely Severe') {
    variant = 'destructive'
  } else if (severity === 'Moderate') {
    variant = 'accent'
  }

  const icon = variant === 'destructive' ? <AlertTriangle className='w-4 h-4' /> : <Check className='w-4 h-4' />

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='text-center space-y-2'>
        <p className='text-4xl font-bold'>{score}</p>
        <Alert variant={variant} className='text-left'>
          {icon}
          <AlertTitle className={cn(color)}>{severity}</AlertTitle>
        </Alert>
      </CardContent>
    </Card>
  )
}

/**
 * Render the DASS-21 questionnaire page that lets users complete 21 items, calculate category scores, reset responses, and view results.
 *
 * @returns A React element representing the DASS-21 questionnaire UI, including question rows, submit/reset actions, and conditional result cards.
 */
export default function DassScorePage() {
  const { answers, results, showResult, handleAnswerChange, handleSubmit, handleReset, isComplete } = useDassScore()

  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      <div className='mb-8 hidden md:block'>
        <h1 className='text-3xl font-bold tracking-tight'>Depression Anxiety Stress Scale (DASS-21)</h1>
        <p className='text-muted-foreground mt-2'>
          A set of 21 questions to measure the severity of symptoms of Depression, Anxiety and Stress.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <CardDescription>
              Please read each statement and select the number which indicates how much the statement applied to you
              over the past week.
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

      {showResult && results && (
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>The scores below indicate the severity of symptoms for each category.</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col md:flex-row gap-4'>
            <ResultCard title='Depression' {...results.depression} />
            <ResultCard title='Anxiety' {...results.anxiety} />
            <ResultCard title='Stress' {...results.stress} />
          </CardContent>
        </Card>
      )}

      <p className='text-xs text-muted-foreground mt-4 text-center'>
        The DASS-21 is a screening tool. It is not a substitute for a professional clinical diagnosis.
      </p>
    </div>
  )
}
