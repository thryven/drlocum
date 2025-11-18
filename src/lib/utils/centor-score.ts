// src/lib/utils/centor-score.ts
export type AgeGroup = 'under15' | '15to44' | 'over44'

export interface CentorState {
  tonsillarExudate: boolean
  swollenNodes: boolean
  temperature: boolean
  coughAbsent: boolean
  age: AgeGroup
}

export const initialState: CentorState = {
  tonsillarExudate: false,
  swollenNodes: false,
  temperature: false,
  coughAbsent: false,
  age: '15to44',
}

export interface Criteria {
  id: keyof Omit<CentorState, 'age'>
  text: string
  description: string
}

export const criteria: Criteria[] = [
  { id: 'tonsillarExudate', text: 'Tonsillar Exudate or Swelling', description: 'White spots or pus on the tonsils.' },
  {
    id: 'swollenNodes',
    text: 'Swollen, Tender Anterior Cervical Nodes',
    description: 'Painful, swollen lymph nodes in the neck.',
  },
  { id: 'temperature', text: 'Temperature > 38°C (100.4°F)', description: 'History of fever or measured temperature.' },
  { id: 'coughAbsent', text: 'Absence of Cough', description: 'Patient is not coughing.' },
]

interface RiskResult {
  score: number
  risk: string
  management: string
  color: 'text-green-600' | 'text-yellow-600' | 'text-red-600'
}

export function calculateCentorScore(answers: CentorState): RiskResult {
  let score = 0
  if (answers.tonsillarExudate) score++
  if (answers.swollenNodes) score++
  if (answers.temperature) score++
  if (answers.coughAbsent) score++

  if (answers.age === 'under15') score++
  if (answers.age === 'over44') score--

  let risk = ''
  let management = ''
  let color: RiskResult['color'] = 'text-green-600'

  if (score <= 1) {
    risk = '<10% risk of Strep'
    management = 'No antibiotic or throat culture necessary.'
  } else if (score === 2) {
    risk = '11-17% risk of Strep'
    management = 'Throat culture or rapid antigen test (RADT) if clinical suspicion is high.'
    color = 'text-yellow-600'
  } else if (score === 3) {
    risk = '28-35% risk of Strep'
    management = 'Throat culture or RADT recommended.'
    color = 'text-red-600'
  } else {
    // Score >= 4
    risk = '>50% risk of Strep'
    management = 'Consider empirical antibiotics. Throat culture or RADT may not be necessary.'
    color = 'text-red-600'
  }

  return { score, risk, management, color }
}
