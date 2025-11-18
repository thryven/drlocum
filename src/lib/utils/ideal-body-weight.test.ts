// src/lib/utils/ideal-body-weight.test.ts
import { describe, expect, it } from 'vitest'
import { calculateAdjBW, calculateIBW } from './ideal-body-weight'

describe('calculateIBW', () => {
  it('calculates IBW for a male of 180cm height', () => {
    const heightCm = 180
    const result = calculateIBW(heightCm, 'male')
    expect(result).toBeCloseTo(74.99, 1)
  })

  it('calculates IBW for a female of 165cm height', () => {
    const heightCm = 165
    const result = calculateIBW(heightCm, 'female')
    expect(result).toBeCloseTo(56.91, 1)
  })

  it('handles height exactly at 5 feet (152.4cm)', () => {
    const heightCm = 152.4
    const result = calculateIBW(heightCm, 'male')
    expect(result).toBe(50)
  })
})

describe('calculateAdjBW', () => {
  it('returns actual body weight if it is less than ideal body weight', () => {
    const ibw = 70
    const actualBw = 65
    const result = calculateAdjBW(ibw, actualBw)
    expect(result).toBe(actualBw)
  })

  it('calculates adjusted body weight correctly for overweight patient', () => {
    const ibw = 60
    const actualBw = 80
    // AdjBW = 60 + 0.4 * (80 - 60) = 60 + 0.4 * 20 = 60 + 8 = 68
    const result = calculateAdjBW(ibw, actualBw)
    expect(result).toBe(68)
  })

  it('returns ideal body weight if actual body weight is equal to it', () => {
    const ibw = 75
    const actualBw = 75
    const result = calculateAdjBW(ibw, actualBw)
    expect(result).toBe(ibw)
  })
})
