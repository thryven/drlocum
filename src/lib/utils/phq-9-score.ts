// src/lib/utils/phq-9-score.ts
export type AnswerValue = 0 | 1 | 2 | 3 | -1

export interface Question {
  id: keyof Phq9State
  text: string
}

export const questions: Question[] = [
  { id: 'q1', text: 'Little interest or pleasure in doing things' },
  { id: 'q2', text: 'Feeling down, depressed, or hopeless' },
  { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much' },
  { id: 'q4', text: 'Feeling tired or having little energy' },
  { id: 'q5', text: 'Poor appetite or overeating' },
  { id: 'q6', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down' },
  { id: 'q7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
  {
    id: 'q8',
    text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
  },
  { id: 'q9', text: 'Thoughts that you would be better off dead or of hurting yourself in some way' },
]

export type Phq9State = {
  [K in `q${number}`]: AnswerValue
}

export const initialState: Phq9State = questions.reduce((acc, q) => {
  acc[q.id] = -1
  return acc
}, {} as Phq9State)

type Severity = 'None-Minimal' | 'Mild' | 'Moderate' | 'Moderately Severe' | 'Severe'
type ResultColor = 'text-green-600' | 'text-yellow-600' | 'text-orange-500' | 'text-red-600' | 'text-red-700'

interface ScoreResult {
  score: number
  severity: Severity
  color: ResultColor
  recommendation: string
}

const getSeverityAndRecommendation = (
  score: number,
): { severity: Severity; color: ResultColor; recommendation: string } => {
  if (score <= 4)
    return {
      severity: 'None-Minimal',
      color: 'text-green-600',
      recommendation: 'No action needed. Symptoms are minimal.',
    }
  if (score <= 9)
    return {
      severity: 'Mild',
      color: 'text-yellow-600',
      recommendation: 'Watchful waiting; repeat PHQ-9 at follow-up.',
    }
  if (score <= 14)
    return {
      severity: 'Moderate',
      color: 'text-orange-500',
      recommendation: 'Consider counseling, follow-up, and/or pharmacotherapy.',
    }
  if (score <= 19)
    return {
      severity: 'Moderately Severe',
      color: 'text-red-600',
      recommendation: 'Active treatment with pharmacotherapy and/or psychotherapy.',
    }
  return {
    severity: 'Severe',
    color: 'text-red-700',
    recommendation: 'Immediate initiation of pharmacotherapy and/or psychotherapy.',
  }
}

export function calculatePhq9Score(answers: Phq9State): ScoreResult {
  const score = Object.values(answers).reduce((sum: number, value) => (value > -1 ? sum + value : sum), 0)

  const { severity, color, recommendation } = getSeverityAndRecommendation(score)

  return { score, severity, color, recommendation }
}
