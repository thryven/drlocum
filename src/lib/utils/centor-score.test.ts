// src/lib/utils/centor-score.test.ts
import { describe, expect, it } from 'vitest'
import { type CentorState, calculateCentorScore } from './centor-score'

describe('calculateCentorScore', () => {
  it('calculates a score of 0 for a baseline adult', () => {
    const answers: CentorState = {
      tonsillarExudate: false,
      swollenNodes: false,
      temperature: false,
      coughAbsent: false,
      age: '15to44',
    }
    const result = calculateCentorScore(answers)
    expect(result.score).toBe(0)
    expect(result.risk).toBe('<10% risk of Strep')
  })

  it('calculates a score of 5 for a high-risk child', () => {
    const answers: CentorState = {
      tonsillarExudate: true,
      swollenNodes: true,
      temperature: true,
      coughAbsent: true,
      age: 'under15',
    }
    const result = calculateCentorScore(answers)
    expect(result.score).toBe(5)
    expect(result.risk).toBe('>50% risk of Strep')
  })

  it('calculates a negative score for an older adult with no symptoms', () => {
    const answers: CentorState = {
      tonsillarExudate: false,
      swollenNodes: false,
      temperature: false,
      coughAbsent: false,
      age: 'over44',
    }
    const result = calculateCentorScore(answers)
    expect(result.score).toBe(-1)
    expect(result.risk).toBe('<10% risk of Strep')
  })

  it('calculates an intermediate score correctly', () => {
    const answers: CentorState = {
      tonsillarExudate: true,
      swollenNodes: true,
      temperature: false,
      coughAbsent: false,
      age: '15to44',
    }
    const result = calculateCentorScore(answers)
    expect(result.score).toBe(2)
    expect(result.risk).toBe('11-17% risk of Strep')
  })
})
