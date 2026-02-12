import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the framingham score hook so we can control UI states
vi.mock('@/hooks/use-framingham-score', () => ({
  useFraminghamScore: vi.fn(),
}))

import { useFraminghamScore } from '@/hooks/use-framingham-score'
import FraminghamRiskScorePage from './page'

describe('FraminghamRiskScorePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows placeholder when there is no result', () => {
    const mockUseFramingham = useFraminghamScore as unknown as { mockReturnValue: (v: unknown) => void }
    mockUseFramingham.mockReturnValue({
      state: {
        gender: 'male',
        age: '',
        isSmoker: 'no',
        totalCholesterol: '',
        hdlCholesterol: '',
        systolicBP: '',
        isTreatedForBP: 'no',
      },
      result: null,
      showResult: false,
      handleInputChange: vi.fn(),
      handleSelectChange: vi.fn(),
      handleSubmit: vi.fn(),
      handleReset: vi.fn(),
      getRiskColor: vi.fn(),
    })

    render(<FraminghamRiskScorePage />)

    expect(screen.getByText('Results will be displayed here.')).toBeInTheDocument()
  })

  it('renders result values and applies risk color when showResult is true', () => {
    const mockUseFramingham = useFraminghamScore as unknown as { mockReturnValue: (v: unknown) => void }
    mockUseFramingham.mockReturnValue({
      state: {
        gender: 'female',
        age: '55',
        isSmoker: 'no',
        totalCholesterol: '5.2', // ~200 mg/dL
        hdlCholesterol: '1.3', // ~50 mg/dL
        systolicBP: '120',
        isTreatedForBP: 'no',
      },
      result: {
        totalPoints: 14,
        riskPercent: '11.7',
        riskCategory: 'Intermediate',
        targetLdl: '<2.6',
        targetNonHdlC: '<3.4',
        targetLdlDesc: 'mmol/L',
      },
      showResult: true,
      handleInputChange: vi.fn(),
      handleSelectChange: vi.fn(),
      handleSubmit: vi.fn(),
      handleReset: vi.fn(),
      getRiskColor: () => 'text-orange-500',
    })

    render(<FraminghamRiskScorePage />)

    expect(screen.getByText('14')).toBeInTheDocument()
    const riskEl = screen.getByText('11.7%')
    expect(riskEl).toBeInTheDocument()
    expect(riskEl).toHaveClass('text-orange-500')
    expect(screen.getByText('<2.6')).toBeInTheDocument()
    expect(screen.getByText('<3.4')).toBeInTheDocument()
  })

  it('calls handleReset when Reset button is clicked', () => {
    const mockReset = vi.fn()
    const mockUseFramingham = useFraminghamScore as unknown as { mockReturnValue: (v: unknown) => void }
    mockUseFramingham.mockReturnValue({
      state: {
        gender: 'male',
        age: '',
        isSmoker: 'no',
        totalCholesterol: '',
        hdlCholesterol: '',
        systolicBP: '',
        isTreatedForBP: 'no',
      },
      result: null,
      showResult: false,
      handleInputChange: vi.fn(),
      handleSelectChange: vi.fn(),
      handleSubmit: vi.fn(),
      handleReset: mockReset,
      getRiskColor: vi.fn(),
    })

    render(<FraminghamRiskScorePage />)

    const resetBtn = screen.getByRole('button', { name: /reset/i })
    fireEvent.click(resetBtn)
    expect(mockReset).toHaveBeenCalled()
  })

  it('calls handleSubmit when Calculate Risk button is clicked', () => {
    const mockSubmit = vi.fn()
    const mockUseFramingham = useFraminghamScore as unknown as { mockReturnValue: (v: unknown) => void }
    mockUseFramingham.mockReturnValue({
      state: {
        gender: 'male',
        age: '',
        isSmoker: 'no',
        totalCholesterol: '',
        hdlCholesterol: '',
        systolicBP: '',
        isTreatedForBP: 'no',
      },
      result: null,
      showResult: false,
      handleInputChange: vi.fn(),
      handleSelectChange: vi.fn(),
      handleSubmit: mockSubmit,
      handleReset: vi.fn(),
      getRiskColor: vi.fn(),
    })

    render(<FraminghamRiskScorePage />)

    const submitBtn = screen.getByRole('button', { name: /calculate risk/i })
    fireEvent.click(submitBtn)
    expect(mockSubmit).toHaveBeenCalled()
  })

  it('calls handleInputChange and handleSelectChange on interactions', () => {
    const mockInputChange = vi.fn()
    const mockSelectChange = vi.fn()
    const mockUseFramingham = useFraminghamScore as unknown as { mockReturnValue: (v: unknown) => void }
    mockUseFramingham.mockReturnValue({
      state: {
        gender: 'male',
        age: '',
        isSmoker: 'no',
        totalCholesterol: '',
        hdlCholesterol: '',
        systolicBP: '',
        isTreatedForBP: 'no',
      },
      result: null,
      showResult: false,
      handleInputChange: mockInputChange,
      handleSelectChange: mockSelectChange,
      handleSubmit: vi.fn(),
      handleReset: vi.fn(),
      getRiskColor: vi.fn(),
    })

    render(<FraminghamRiskScorePage />)

    // Change age input
    const ageInput = screen.getByLabelText('Age')
    fireEvent.change(ageInput, { target: { value: '45' } })
    expect(mockInputChange).toHaveBeenCalledWith('age', '45')

    // Select gender by clicking the Male radio label
    const maleRadio = screen.getByLabelText('Male')
    fireEvent.click(maleRadio)
    expect(mockSelectChange).toHaveBeenCalledWith('gender', 'male')
  })
})
