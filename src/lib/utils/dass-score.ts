// src/lib/utils/dass-score.ts
export type AnswerValue = 0 | 1 | 2 | 3 | -1

export interface Question {
  id: keyof DassState
  text: string
  scale: 'Depression' | 'Anxiety' | 'Stress'
}

export const questions: Question[] = [
  { id: 'q1', text: 'I found it hard to wind down', scale: 'Stress' },
  { id: 'q2', text: 'I was aware of dryness of my mouth', scale: 'Anxiety' },
  { id: 'q3', text: 'I couldn’t seem to experience any positive feeling at all', scale: 'Depression' },
  {
    id: 'q4',
    text: 'I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)',
    scale: 'Anxiety',
  },
  { id: 'q5', text: 'I found it difficult to work up the initiative to do things', scale: 'Depression' },
  { id: 'q6', text: 'I tended to over-react to situations', scale: 'Stress' },
  { id: 'q7', text: 'I experienced trembling (e.g. in the hands)', scale: 'Anxiety' },
  { id: 'q8', text: 'I felt that I was using a lot of nervous energy', scale: 'Stress' },
  {
    id: 'q9',
    text: 'I was worried about situations in which I might panic and make a fool of myself',
    scale: 'Anxiety',
  },
  { id: 'q10', text: 'I felt that I had nothing to look forward to', scale: 'Depression' },
  { id: 'q11', text: 'I found myself getting agitated', scale: 'Stress' },
  { id: 'q12', text: 'I found it difficult to relax', scale: 'Stress' },
  { id: 'q13', text: 'I felt down-hearted and blue', scale: 'Depression' },
  {
    id: 'q14',
    text: 'I was intolerant of anything that kept me from getting on with what I was doing',
    scale: 'Stress',
  },
  { id: 'q15', text: 'I felt I was close to panic', scale: 'Anxiety' },
  { id: 'q16', text: 'I was unable to become enthusiastic about anything', scale: 'Depression' },
  { id: 'q17', text: 'I felt I wasn’t worth much as a person', scale: 'Depression' },
  { id: 'q18', text: 'I felt that I was rather touchy', scale: 'Stress' },
  {
    id: 'q19',
    text: 'I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat)',
    scale: 'Anxiety',
  },
  { id: 'q20', text: 'I felt scared without any good reason', scale: 'Anxiety' },
  { id: 'q21', text: 'I felt that life was meaningless', scale: 'Depression' },
]

export type DassState = {
  [K in `q${number}`]: AnswerValue
}

export const initialState: DassState = questions.reduce((acc, q) => {
  acc[q.id] = -1
  return acc
}, {} as DassState)

type Severity = 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Extremely Severe'
type ResultColor = 'text-green-600' | 'text-yellow-600' | 'text-orange-500' | 'text-red-600' | 'text-red-700'

const getSeverity = (
  score: number,
  levels: [number, number, number, number],
): { severity: Severity; color: ResultColor } => {
  if (score <= levels[0]) return { severity: 'Normal', color: 'text-green-600' }
  if (score <= levels[1]) return { severity: 'Mild', color: 'text-yellow-600' }
  if (score <= levels[2]) return { severity: 'Moderate', color: 'text-orange-500' }
  if (score <= levels[3]) return { severity: 'Severe', color: 'text-red-600' }
  return { severity: 'Extremely Severe', color: 'text-red-700' }
}

export function calculateDassScore(answers: DassState) {
  let depressionScore = 0
  let anxietyScore = 0
  let stressScore = 0

  for (const [key, value] of Object.entries(answers)) {
    if (value > -1) {
      const question = questions.find((q) => q.id === key)
      if (question) {
        switch (question.scale) {
          case 'Depression':
            depressionScore += value
            break
          case 'Anxiety':
            anxietyScore += value
            break
          case 'Stress':
            stressScore += value
            break
        }
      }
    }
  }

  depressionScore *= 2
  anxietyScore *= 2
  stressScore *= 2

  const depressionResult = getSeverity(depressionScore, [9, 13, 20, 27])
  const anxietyResult = getSeverity(anxietyScore, [7, 9, 14, 19])
  const stressResult = getSeverity(stressScore, [14, 18, 25, 33])

  return {
    depression: { score: depressionScore, ...depressionResult },
    anxiety: { score: anxietyScore, ...anxietyResult },
    stress: { score: stressScore, ...stressResult },
  }
}
