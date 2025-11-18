// src/lib/growth-charts.ts

interface GrowthDataPoint {
  ageMonths: number
  weightLbs: number
  weightKg: number
}

/**
 * Average weight data for females from birth to 20 years.
 * Source: https://www.disabled-world.com/calculators-charts/height-weight-teens.php
 * @type {GrowthDataPoint[]}
 */
const femaleWeights: GrowthDataPoint[] = [
  // 0-11 months
  { ageMonths: 0, weightLbs: 7.3, weightKg: 3.31 },
  { ageMonths: 1, weightLbs: 9.6, weightKg: 4.35 },
  { ageMonths: 2, weightLbs: 11.7, weightKg: 5.3 },
  { ageMonths: 3, weightLbs: 13.3, weightKg: 6.03 },
  { ageMonths: 4, weightLbs: 14.6, weightKg: 6.62 },
  { ageMonths: 5, weightLbs: 15.8, weightKg: 7.17 },
  { ageMonths: 6, weightLbs: 16.6, weightKg: 7.53 },
  { ageMonths: 7, weightLbs: 17.4, weightKg: 7.9 },
  { ageMonths: 8, weightLbs: 18.1, weightKg: 8.21 },
  { ageMonths: 9, weightLbs: 18.8, weightKg: 8.53 },
  { ageMonths: 10, weightLbs: 19.4, weightKg: 8.8 },
  { ageMonths: 11, weightLbs: 19.9, weightKg: 9.03 },
  { ageMonths: 12, weightLbs: 20.4, weightKg: 9.25 },
  { ageMonths: 13, weightLbs: 21, weightKg: 9.53 },
  { ageMonths: 14, weightLbs: 21.5, weightKg: 9.75 },
  { ageMonths: 15, weightLbs: 22, weightKg: 9.98 },
  { ageMonths: 16, weightLbs: 22.5, weightKg: 10.21 },
  { ageMonths: 17, weightLbs: 23, weightKg: 10.43 },
  { ageMonths: 18, weightLbs: 23.4, weightKg: 10.61 },
  { ageMonths: 19, weightLbs: 23.9, weightKg: 10.84 },
  { ageMonths: 20, weightLbs: 24.4, weightKg: 11.07 },
  { ageMonths: 21, weightLbs: 24.9, weightKg: 11.29 },
  { ageMonths: 22, weightLbs: 25.4, weightKg: 11.52 },
  { ageMonths: 23, weightLbs: 25.9, weightKg: 11.75 },
  { ageMonths: 24, weightLbs: 26.5, weightKg: 12.02 },
  { ageMonths: 36, weightLbs: 31.5, weightKg: 14.29 },
  { ageMonths: 48, weightLbs: 34, weightKg: 15.42 },
  { ageMonths: 60, weightLbs: 39.5, weightKg: 17.92 },
  { ageMonths: 72, weightLbs: 44, weightKg: 19.96 },
  { ageMonths: 84, weightLbs: 49.5, weightKg: 22.45 },
  { ageMonths: 96, weightLbs: 57, weightKg: 25.85 },
  { ageMonths: 108, weightLbs: 62, weightKg: 28.12 },
  { ageMonths: 120, weightLbs: 70.5, weightKg: 31.98 },
  { ageMonths: 132, weightLbs: 81.5, weightKg: 36.97 },
  { ageMonths: 144, weightLbs: 91.5, weightKg: 41.5 },
  { ageMonths: 156, weightLbs: 101, weightKg: 45.81 },
  { ageMonths: 168, weightLbs: 106, weightKg: 48.08 },
  { ageMonths: 180, weightLbs: 115, weightKg: 52.16 },
  { ageMonths: 192, weightLbs: 118, weightKg: 53.52 },
  { ageMonths: 204, weightLbs: 120, weightKg: 54.43 },
  { ageMonths: 216, weightLbs: 125, weightKg: 56.7 },
  { ageMonths: 228, weightLbs: 126, weightKg: 57.15 },
  { ageMonths: 240, weightLbs: 128, weightKg: 58.06 },
]

/**
 * Average weight data for males from birth to 20 years.
 * Source: https://www.disabled-world.com/calculators-charts/height-weight-teens.php
 * @type {GrowthDataPoint[]}
 */
const maleWeights: GrowthDataPoint[] = [
  // 0-11 months
  { ageMonths: 0, weightLbs: 7.4, weightKg: 3.36 },
  { ageMonths: 1, weightLbs: 9.8, weightKg: 4.45 },
  { ageMonths: 2, weightLbs: 12.3, weightKg: 5.58 },
  { ageMonths: 3, weightLbs: 14.1, weightKg: 6.4 },
  { ageMonths: 4, weightLbs: 15.4, weightKg: 6.99 },
  { ageMonths: 5, weightLbs: 16.6, weightKg: 7.53 },
  { ageMonths: 6, weightLbs: 17.5, weightKg: 7.94 },
  { ageMonths: 7, weightLbs: 18.3, weightKg: 8.3 },
  { ageMonths: 8, weightLbs: 19, weightKg: 8.62 },
  { ageMonths: 9, weightLbs: 19.6, weightKg: 8.89 },
  { ageMonths: 10, weightLbs: 20.1, weightKg: 9.12 },
  { ageMonths: 11, weightLbs: 20.8, weightKg: 9.43 },
  { ageMonths: 12, weightLbs: 21.3, weightKg: 9.66 },
  { ageMonths: 13, weightLbs: 21.8, weightKg: 9.89 },
  { ageMonths: 14, weightLbs: 22.3, weightKg: 10.12 },
  { ageMonths: 15, weightLbs: 22.7, weightKg: 10.3 },
  { ageMonths: 16, weightLbs: 23.2, weightKg: 10.52 },
  { ageMonths: 17, weightLbs: 23.7, weightKg: 10.75 },
  { ageMonths: 18, weightLbs: 24.1, weightKg: 10.93 },
  { ageMonths: 19, weightLbs: 24.6, weightKg: 11.16 },
  { ageMonths: 20, weightLbs: 25, weightKg: 11.34 },
  { ageMonths: 21, weightLbs: 25.5, weightKg: 11.57 },
  { ageMonths: 22, weightLbs: 25.9, weightKg: 11.75 },
  { ageMonths: 23, weightLbs: 26.3, weightKg: 11.93 },
  { ageMonths: 24, weightLbs: 27.5, weightKg: 12.47 },
  { ageMonths: 36, weightLbs: 31.5, weightKg: 14.29 },
  { ageMonths: 48, weightLbs: 36, weightKg: 16.33 },
  { ageMonths: 60, weightLbs: 40.5, weightKg: 18.37 },
  { ageMonths: 72, weightLbs: 45.5, weightKg: 20.64 },
  { ageMonths: 84, weightLbs: 50.5, weightKg: 22.91 },
  { ageMonths: 96, weightLbs: 56.5, weightKg: 25.63 },
  { ageMonths: 108, weightLbs: 63, weightKg: 28.58 },
  { ageMonths: 120, weightLbs: 70.5, weightKg: 31.98 },
  { ageMonths: 132, weightLbs: 78.5, weightKg: 35.61 },
  { ageMonths: 144, weightLbs: 88, weightKg: 39.92 },
  { ageMonths: 156, weightLbs: 100, weightKg: 45.36 },
  { ageMonths: 168, weightLbs: 112, weightKg: 50.8 },
  { ageMonths: 180, weightLbs: 123.5, weightKg: 56.02 },
  { ageMonths: 192, weightLbs: 134, weightKg: 60.78 },
  { ageMonths: 204, weightLbs: 142, weightKg: 64.41 },
  { ageMonths: 216, weightLbs: 147.5, weightKg: 66.9 },
  { ageMonths: 228, weightLbs: 152, weightKg: 68.95 },
  { ageMonths: 240, weightLbs: 155, weightKg: 70.31 },
]

/**
 * Average weight data for children from birth to 20 years, averaged from male and female charts.
 * This provides a gender-neutral reference.
 * @type {GrowthDataPoint[]}
 */
export const averageWeights: GrowthDataPoint[] = (() => {
  // Create a map from ageMonths to male data
  const maleMap = new Map<number, GrowthDataPoint>()
  for (const data of maleWeights) {
    maleMap.set(data.ageMonths, data)
  }

  return femaleWeights.map((femaleData) => {
    const maleData = maleMap.get(femaleData.ageMonths)

    if (!maleData) {
      return { ...femaleData } as GrowthDataPoint
    }

    return {
      ageMonths: femaleData.ageMonths,
      weightLbs: Number.parseFloat(((femaleData.weightLbs + maleData.weightLbs) / 2).toFixed(2)),
      weightKg: Number.parseFloat(((femaleData.weightKg + maleData.weightKg) / 2).toFixed(2)),
    } as GrowthDataPoint
  })
})()
