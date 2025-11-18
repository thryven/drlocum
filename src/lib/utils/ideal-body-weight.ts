export type Gender = 'male' | 'female'

export function calculateIBW(heightCm: number, gender: Gender): number {
  const heightInInches = heightCm / 2.54
  const inchesOver5Feet = heightInInches > 60 ? heightInInches - 60 : 0

  const devine = gender === 'male' ? 50 + 2.3 * inchesOver5Feet : 45.5 + 2.3 * inchesOver5Feet

  return devine
}

export function calculateAdjBW(ibw: number, actualBw: number): number {
  if (actualBw <= ibw) return actualBw
  return ibw + 0.4 * (actualBw - ibw)
}
