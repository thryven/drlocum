// src/lib/utils/stop-bang-score.test.ts
import { describe, expect, it } from 'vitest'
import { calculateStopBangScore, type StopBangState } from './stop-bang-score'

describe('calculateStopBangScore', () => {
  it('returns Low risk for a score of 0-2', () => {
    const answers: StopBangState = {
      snoring: 'yes',
      tired: 'yes',
      observed: 'no',
      pressure: 'no',
      bmi: 'no',
      age: 'no',
      neck: 'no',
      gender: 'no',
    }
    const result = calculateStopBangScore(answers)
    expect(result.score).toBe(2)
    expect(result.risk).toBe('Low')
  })

  it('returns Intermediate risk for a score of 3-4', () => {
    const answers: StopBangState = {
      snoring: 'yes',
      tired: 'yes',
      observed: 'yes',
      pressure: 'no',
      bmi: 'no',
      age: 'no',
      neck: 'no',
      gender: 'no',
    }
    const result = calculateStopBangScore(answers)
    expect(result.score).toBe(3)
    expect(result.risk).toBe('Intermediate')
  })

  it('returns High risk for a score of 5-8', () => {
    const answers: StopBangState = {
      snoring: 'yes',
      tired: 'yes',
      observed: 'yes',
      pressure: 'yes',
      bmi: 'yes',
      age: 'no',
      neck: 'no',
      gender: 'no',
    }
    const result = calculateStopBangScore(answers)
    expect(result.score).toBe(5)
    expect(result.risk).toBe('High')
  })

  it('refines to High risk for score 3 with specific criteria (BMI)', () => {
    const answers: StopBangState = {
      snoring: 'yes',
      tired: 'yes',
      observed: 'no',
      pressure: 'no',
      bmi: 'yes', // BMI > 35
      age: 'no',
      neck: 'no',
      gender: 'no',
    }
    const result = calculateStopBangScore(answers)
    expect(result.score).toBe(3)
    expect(result.risk).toBe('High') // Refined to high
  })

  it('refines to High risk for score 4 with specific criteria (Male)', () => {
    const answers: StopBangState = {
      snoring: 'yes',
      tired: 'yes',
      observed: 'yes',
      pressure: 'no',
      bmi: 'no',
      age: 'no',
      neck: 'no',
      gender: 'yes', // Male
    }
    const result = calculateStopBangScore(answers)
    expect(result.score).toBe(4)
    expect(result.risk).toBe('High') // Refined to high
  })
})
