// src/lib/utils/framingham-score.test.ts
import { describe, expect, it } from 'vitest'
import { calculateFraminghamScore, type FraminghamState } from './framingham-score'

describe('calculateFraminghamScore for Men (New General CVD Score)', () => {
  it('calculates score for a low-risk male', () => {
    const state: FraminghamState = {
      gender: 'male',
      age: '38', // 2 pts
      totalCholesterol: '5.0', // 1 pt
      hdlCholesterol: '1.4', // -1 pt
      systolicBP: '125', // 0 pts
      isSmoker: 'no', // 0 pts
      isTreatedForBP: 'no', // SBP 120-129 not treated
      hasDiabetes: 'no', // 0 pts
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(2) + TC(1) + HDL(-1) + SBP(0) + Smoker(0) + Diabetes(0) = 2
    expect(result?.totalPoints).toBe(2)
  })

  it('calculates score for a high-risk male smoker with diabetes', () => {
    const state: FraminghamState = {
      gender: 'male',
      age: '62', // 11 pts
      totalCholesterol: '6.5', // 3 pts
      hdlCholesterol: '0.8', // 2 pts
      systolicBP: '165', // 5 pts (treated)
      isSmoker: 'yes', // 4 pts
      isTreatedForBP: 'yes',
      hasDiabetes: 'yes', // 3 pts
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(11) + TC(3) + HDL(2) + SBP(5) + Smoker(4) + Diabetes(3) = 28
    expect(result?.totalPoints).toBe(28)
    expect(result?.riskPercent).toBe('>30')
  })

  it('handles edge cases for male calculations', () => {
    const state: FraminghamState = {
      gender: 'male',
      age: '25', // 0 pts
      totalCholesterol: '4.1', // 0 pts
      hdlCholesterol: '1.7', // -2 pts
      systolicBP: '110', // -2 pts
      isSmoker: 'no', // 0 pts
      isTreatedForBP: 'no',
      hasDiabetes: 'no', // 0 pts
    }
    const result = calculateFraminghamScore(state)
    // Points: 0 + 0 - 2 - 2 + 0 + 0 = -4
    expect(result?.totalPoints).toBe(-4)
    expect(result?.riskPercent).toBe('<1')
  })
})

describe('calculateFraminghamScore for Women (Original Logic + Diabetes)', () => {
  it('calculates score for a low-risk female', () => {
    const state: FraminghamState = {
      gender: 'female',
      age: '42',
      totalCholesterol: '4.4', // ~170 mg/dL -> 3 pts
      hdlCholesterol: '1.7', // ~65 mg/dL -> -1 pt
      systolicBP: '115',
      isSmoker: 'no',
      isTreatedForBP: 'no',
      hasDiabetes: 'no', // 0 pts
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(0) + TC(3) + Smoke(0) + HDL(-1) + BP(0) + Diabetes(0) = 2
    expect(result?.totalPoints).toBe(2)
    expect(result?.riskPercent).toBe('<1')
  })

  it('calculates score for a high-risk female smoker with diabetes', () => {
    const state: FraminghamState = {
      gender: 'female',
      age: '65',
      totalCholesterol: '6.7', // ~260 mg/dL
      hdlCholesterol: '1.2', // ~45 mg/dL
      systolicBP: '145',
      isSmoker: 'yes',
      isTreatedForBP: 'yes',
      hasDiabetes: 'yes', // +4 points
    }
    const result = calculateFraminghamScore(state)
    // Original Points: Age(10) + TC(3) + Smoke(2) + HDL(1) + BP(5) = 21
    // New Total: 21 + 4 (diabetes) = 25
    expect(result?.totalPoints).toBe(25)
    expect(result?.riskPercent).toBe('>30')
  })
})

describe('calculateFraminghamScore general functionality', () => {
  it('returns null for invalid input', () => {
    const state: FraminghamState = {
      gender: 'male',
      age: 'abc',
      totalCholesterol: '4.7',
      hdlCholesterol: '1.4',
      systolicBP: '125',
      isSmoker: 'no',
      isTreatedForBP: 'no',
      hasDiabetes: 'no',
    }
    const result = calculateFraminghamScore(state)
    expect(result).toBeNull()
  })
})
