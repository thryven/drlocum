export type WeightUnit = 'grams' | 'kg' | 'lb'

interface NeonateWeightLossResult {
  weightChange: number // in grams
  percentageChange: number
  interpretation: {
    message: string
    severity: 'normal' | 'concern' | 'danger'
  }
}

function convertToGrams(weight: number, unit: WeightUnit): number {
  switch (unit) {
    case 'grams':
      return weight
    case 'kg':
      return weight * 1000
    case 'lb':
      return weight * 453.592
    default:
      return 0
  }
}

function getInterpretation(percentageLoss: number, ageInHours?: number): NeonateWeightLossResult['interpretation'] {
  // Age-specific thresholds
  if (ageInHours !== undefined) {
    if (ageInHours <= 24) {
      if (percentageLoss <= 4) return { message: 'Normal weight loss for the first 24 hours.', severity: 'normal' }
      if (percentageLoss <= 5) return { message: 'Acceptable weight loss, but monitor feeding.', severity: 'concern' }
      return {
        message: 'Weight loss exceeds expected range for <24 hours. Further evaluation needed.',
        severity: 'danger',
      }
    }
    if (ageInHours <= 48) {
      if (percentageLoss <= 7) return { message: 'Normal weight loss for the first 48 hours.', severity: 'normal' }
      if (percentageLoss <= 8) return { message: 'Acceptable weight loss, but monitor feeding.', severity: 'concern' }
      return {
        message: 'Weight loss exceeds expected range for <48 hours. Further evaluation needed.',
        severity: 'danger',
      }
    }
    if (ageInHours <= 72) {
      if (percentageLoss <= 10) return { message: 'Normal weight loss for the first 72 hours.', severity: 'normal' }
      return { message: 'Weight loss exceeds 10%. Further clinical evaluation needed.', severity: 'danger' }
    }
  }

  // General thresholds if age is not provided
  if (percentageLoss <= 7) {
    return {
      message: 'This amount of weight loss is generally considered normal for a newborn.',
      severity: 'normal',
    }
  }
  if (percentageLoss <= 10) {
    return {
      message: 'This weight loss is acceptable, but feeding should be assessed.',
      severity: 'concern',
    }
  }
  return {
    message: 'Weight loss is more than 10%. This requires further clinical evaluation.',
    severity: 'danger',
  }
}

export function calculateNeonateWeightLoss(
  birthWeight: number,
  currentWeight: number,
  unit: WeightUnit,
  ageInHours?: number,
): NeonateWeightLossResult {
  const birthWeightGrams = convertToGrams(birthWeight, unit)
  const currentWeightGrams = convertToGrams(currentWeight, unit)

  const weightChange = birthWeightGrams - currentWeightGrams
  const percentageChange = (weightChange / birthWeightGrams) * 100

  const interpretation = getInterpretation(percentageChange, ageInHours)

  return {
    weightChange,
    percentageChange,
    interpretation,
  }
}
