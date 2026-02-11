// src/lib/utils/framingham-score.test.ts
import { describe, expect, it } from 'vitest'
import { calculateFraminghamScore, type FraminghamState } from './framingham-score'

describe('calculateFraminghamScore', () => {
  it('calculates score for a low-risk male', () => {
    const state: FraminghamState = {
      gender: 'male',
      age: '40',
      totalCholesterol: '4.7', // ~180 mg/dL
      hdlCholesterol: '1.4', // ~55 mg/dL
      systolicBP: '125',
      isSmoker: 'no',
      isTreatedForBP: 'no',
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(0) + TC(3) + Smoke(0) + HDL(0) + BP(0) = 3
    expect(result?.totalPoints).toBe(3)
    expect(result?.riskPercent).toBe('1')
  })

  it('calculates score for a high-risk male smoker', () => {
    const state: FraminghamState = {
      gender: 'male',
      age: '62',
      totalCholesterol: '6.5', // ~250 mg/dL
      hdlCholesterol: '0.9', // ~35 mg/dL
      systolicBP: '150',
      isSmoker: 'yes',
      isTreatedForBP: 'yes',
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(10) + TC(2) + Smoke(1) + HDL(2) + BP(2) = 17
    expect(result?.totalPoints).toBe(17)
    expect(result?.riskPercent).toBe('>30')
  })

  it('calculates score for a low-risk female', () => {
    const state: FraminghamState = {
      gender: 'female',
      age: '42',
      totalCholesterol: '4.4', // ~170 mg/dL
      hdlCholesterol: '1.7', // ~65 mg/dL
      systolicBP: '115',
      isSmoker: 'no',
      isTreatedForBP: 'no',
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(0) + TC(3) + Smoke(0) + HDL(-1) + BP(0) = 2
    expect(result?.totalPoints).toBe(2)
    expect(result?.riskPercent).toBe('<1')
  })

  it('calculates score for a high-risk female smoker', () => {
    const state: FraminghamState = {
      gender: 'female',
      age: '65',
      totalCholesterol: '6.7', // ~260 mg/dL
      hdlCholesterol: '1.2', // ~45 mg/dL
      systolicBP: '145',
      isSmoker: 'yes',
      isTreatedForBP: 'yes',
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(12) + TC(3) + Smoke(2) + HDL(1) + BP(5) = 23
    expect(result?.totalPoints).toBe(23)
    expect(result?.riskPercent).toBe('22')
  })

  it('returns null for invalid input', () => {
    const state: FraminghamState = {
      gender: 'male',
      age: 'abc',
      totalCholesterol: '4.7',
      hdlCholesterol: '1.4',
      systolicBP: '125',
      isSmoker: 'no',
      isTreatedForBP: 'no',
    }
    const result = calculateFraminghamScore(state)
    expect(result).toBeNull()
  })
})
