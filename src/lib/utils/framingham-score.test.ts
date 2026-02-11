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
      isTreatedForBP: 'no',
      hasDiabetes: 'no', // 0 pts
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(2) + TC(1) + HDL(-1) + SBP(0) + Smoker(0) + Diabetes(0) = 2
    expect(result?.totalPoints).toBe(2)
    expect(result?.riskPercent).toBe('1.5')
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
    // Points: 11 + 3 + 2 + 5 + 4 + 3 = 28
    expect(result?.totalPoints).toBe(28)
    expect(result?.riskPercent).toBe('>25')
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

describe('calculateFraminghamScore for Women (New General CVD Score)', () => {
  it('calculates score for a low-risk female', () => {
    const state: FraminghamState = {
      gender: 'female',
      age: '42', // 4 pts
      totalCholesterol: '4.4', // 1 pt
      hdlCholesterol: '1.7', // -2 pts
      systolicBP: '115', // -3 pts (not treated)
      isSmoker: 'no', // 0 pts
      isTreatedForBP: 'no',
      hasDiabetes: 'no', // 0 pts
    }
    const result = calculateFraminghamScore(state)
    // Points: Age(4) + TC(1) + HDL(-2) + SBP(-3) + Smoker(0) + Diabetes(0) = 0
    expect(result?.totalPoints).toBe(0)
    expect(result?.riskPercent).toBe('1.2')
  })

  it('calculates score for a high-risk female smoker with diabetes', () => {
    const state: FraminghamState = {
      gender: 'female',
      age: '65', // 10 pts
      totalCholesterol: '6.7', // 4 pts
      hdlCholesterol: '1.2', // 0 pts
      systolicBP: '145', // 5 pts (treated)
      isSmoker: 'yes', // 3 pts
      isTreatedForBP: 'yes',
      hasDiabetes: 'yes', // 4 pts
    }
    const result = calculateFraminghamScore(state)
    // Points: 10 + 4 + 0 + 5 + 3 + 4 = 26
    expect(result?.totalPoints).toBe(26)
    expect(result?.riskPercent).toBe('>30')
  })

  it('calculates score for a mid-risk female', () => {
    const state: FraminghamState = {
      gender: 'female',
      age: '52', // 7 pts
      totalCholesterol: '5.5', // 3 pts
      hdlCholesterol: '1.0', // 1 pt
      systolicBP: '135', // 3 pts (treated)
      isSmoker: 'no', // 0 pts
      isTreatedForBP: 'yes',
      hasDiabetes: 'no', // 0 pts
    }
    const result = calculateFraminghamScore(state)
    // Points: 7 + 3 + 1 + 3 + 0 + 0 = 14
    expect(result?.totalPoints).toBe(14)
    expect(result?.riskPercent).toBe('11.7')
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
