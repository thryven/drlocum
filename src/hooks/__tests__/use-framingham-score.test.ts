// src/hooks/__tests__/use-framingham-score.test.ts

import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useFraminghamScore } from '../use-framingham-score'

// Behaviors covered:
// 1) Hides result when inputs change and only shows after submit
// 2) Computes result based on current state (male low risk example)
// 3) Reset restores initial values and hides result
// 4) Select/radio changes update state correctly
// 5) getRiskColor maps risks to expected color classes

describe('useFraminghamScore', () => {
  it('hides result on input changes and shows after submit', () => {
    const { result } = renderHook(() => useFraminghamScore())

    // Initially hidden
    expect(result.current.showResult).toBe(false)

    // Change a field -> stays hidden
    act(() => {
      result.current.handleInputChange('age', '40')
    })
    expect(result.current.showResult).toBe(false)

    // Submit -> shows result
    act(() => {
      const fakeEvent = { preventDefault: () => {} } as unknown as React.FormEvent
      result.current.handleSubmit(fakeEvent)
    })
    expect(result.current.showResult).toBe(true)
  })

  it('computes a valid low-risk male score after submit', () => {
    const { result } = renderHook(() => useFraminghamScore())

    act(() => {
      result.current.handleSelectChange('gender', 'male')
      result.current.handleInputChange('age', '40')
      result.current.handleInputChange('totalCholesterol', '4.7') // ~180 mg/dL
      result.current.handleInputChange('hdlCholesterol', '1.4') // ~55 mg/dL
      result.current.handleInputChange('systolicBP', '125')
      result.current.handleSelectChange('isSmoker', 'no')
      result.current.handleSelectChange('isTreatedForBP', 'no')
      result.current.handleSelectChange('hasDiabetes', 'no')
    })

    act(() => {
      const fakeEvent = { preventDefault: () => {} } as unknown as React.FormEvent
      result.current.handleSubmit(fakeEvent)
    })

    expect(result.current.showResult).toBe(true)
    expect(result.current.result?.totalPoints).toBe(3)
    expect(result.current.result?.riskPercent).toBe('2.8')
    expect(result.current.result?.targetLdl).toBe('<3.0')
  })

  it('resets to initial state and hides result', () => {
    const { result } = renderHook(() => useFraminghamScore())

    act(() => {
      result.current.handleInputChange('age', '65')
      result.current.handleSelectChange('isSmoker', 'yes')
    })

    act(() => {
      const fakeEvent = { preventDefault: () => {} } as unknown as React.FormEvent
      result.current.handleSubmit(fakeEvent)
    })
    expect(result.current.showResult).toBe(true)

    act(() => {
      result.current.handleReset()
    })

    expect(result.current.showResult).toBe(false)
    // initial gender is 'male' per initialState in utils
    expect(result.current.state.gender).toBe('male')
  })

  it('updates state on select/radio changes', () => {
    const { result } = renderHook(() => useFraminghamScore())

    act(() => {
      result.current.handleSelectChange('gender', 'female')
      result.current.handleSelectChange('isSmoker', 'yes')
      result.current.handleSelectChange('isTreatedForBP', 'yes')
    })

    expect(result.current.state.gender).toBe('female')
    expect(result.current.state.isSmoker).toBe('yes')
    expect(result.current.state.isTreatedForBP).toBe('yes')
  })

  it('maps risk to color classes', () => {
    const { result } = renderHook(() => useFraminghamScore())

    expect(result.current.getRiskColor(undefined)).toBe('text-muted-foreground')
    expect(result.current.getRiskColor('<1')).toBe('text-green-600')
    expect(result.current.getRiskColor('5')).toBe('text-yellow-500')
    expect(result.current.getRiskColor('10')).toBe('text-orange-500')
    expect(result.current.getRiskColor('20')).toBe('text-red-600')
    expect(result.current.getRiskColor('>30')).toBe('text-red-600')
  })
})
