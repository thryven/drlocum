// src/lib/utils/stop-bang-score.ts
export type YesNo = 'yes' | 'no'

export interface Question {
  id: keyof StopBangState
  text: string
  description?: string
}

export const questions: Question[] = [
  {
    id: 'snoring',
    text: 'Do you Snore loudly?',
    description: 'Louder than talking or loud enough to be heard through closed doors.',
  },
  { id: 'tired', text: 'Do you often feel Tired, fatigued, or sleepy during the daytime?' },
  { id: 'observed', text: 'Has anyone Observed you stop breathing or choking/gasping during your sleep?' },
  { id: 'pressure', text: 'Do you have or are you being treated for high blood Pressure?' },
  { id: 'bmi', text: 'Is your Body Mass Index (BMI) greater than 35 kg/m²?' },
  { id: 'age', text: 'Is your Age over 50 years old?' },
  { id: 'neck', text: 'Is your Neck circumference greater than 40 cm?' },
  { id: 'gender', text: 'Is your Gender male?' },
]

export interface StopBangState {
  snoring: YesNo
  tired: YesNo
  observed: YesNo
  pressure: YesNo
  bmi: YesNo
  age: YesNo
  neck: YesNo
  gender: YesNo
}

export const initialState: StopBangState = {
  snoring: 'no',
  tired: 'no',
  observed: 'no',
  pressure: 'no',
  bmi: 'no',
  age: 'no',
  neck: 'no',
  gender: 'no',
}

interface RiskResult {
  risk: 'Low' | 'Intermediate' | 'High'
  score: number
  color: 'text-green-600' | 'text-yellow-600' | 'text-red-600'
  description: string
}

export function calculateStopBangScore(answers: StopBangState): RiskResult {
  const score = Object.values(answers).filter((answer) => answer === 'yes').length

  let risk: RiskResult['risk'] = 'Low'
  let color: RiskResult['color'] = 'text-green-600'
  let description = ''

  if (score >= 5) {
    risk = 'High'
    color = 'text-red-600'
    description = 'You are at high risk for moderate to severe Obstructive Sleep Apnea.'
  } else if (score >= 3) {
    risk = 'Intermediate'
    color = 'text-yellow-600'
    description = 'You are at intermediate risk for moderate to severe Obstructive Sleep Apnea.'
  } else {
    risk = 'Low'
    color = 'text-green-600'
    description = 'You are at low risk for moderate to severe Obstructive Sleep Apnea.'
  }

  // High risk refinement based on specific criteria for intermediate scores
  const isMale = answers.gender === 'yes'
  const hasHighBmi = answers.bmi === 'yes'
  const hasLargeNeck = answers.neck === 'yes'

  if (risk === 'Intermediate' && (isMale || hasHighBmi || hasLargeNeck)) {
    risk = 'High'
    color = 'text-red-600'
    description = 'You are at high risk for moderate to severe Obstructive Sleep Apnea based on specific risk factors.'
  }

  return { score, risk, color, description }
}
