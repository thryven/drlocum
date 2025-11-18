// src/lib/utils/pregnancy-calculator.ts
import { add, differenceInDays, format, sub } from 'date-fns'

interface Milestone {
  name: string
  startWeeks: number
  startDays?: number
  endWeeks: number
  endDays?: number
}

const pregnancyMilestones: Milestone[] = [
  { name: 'Blood Draw for Serum Integrated Screening', startWeeks: 10, endWeeks: 13, endDays: 6 },
  { name: 'First Fetal Heart Tones by Doppler', startWeeks: 11, endWeeks: 12 },
  { name: 'Nuchal Translucency (NT) Ultrasound', startWeeks: 11, startDays: 2, endWeeks: 14, endDays: 2 },
  { name: 'Best time for routine anatomy ultrasound', startWeeks: 18, endWeeks: 20 },
  { name: '2h OGTT in women not previously diagnosed with diabetes', startWeeks: 24, endWeeks: 28 },
  { name: 'Anti-D prophylaxis for women who are (RhD) Negative', startWeeks: 28, endWeeks: 28 },
  { name: 'Antepartum Fetal Surveillance in High Risk Patients', startWeeks: 32, endWeeks: 34 },
  { name: 'Screening for Vaginal and Rectal GBS colonization', startWeeks: 35, endWeeks: 37 },
]

export interface PregnancyInfo {
  lmpEdd: Date
  ultrasoundEdd: Date
  bestEstimateEdd: Date
  source: 'LMP' | 'Ultrasound' | 'LMP_CONFIRMED'
  gestationalAgeWeeks: number
  gestationalAgeDays: number
  conceptionDate: Date
  trimester: number
  firstTrimesterEnd: Date
  secondTrimesterEnd: Date
  discrepancyDays: number
  milestoneDates: Array<{
    name: string
    dateRange: string
  }>
}

/**
 * ACOG Committee Opinion No. 700 (2017, reaffirmed 2022)
 * Redating thresholds (difference between LMP and ultrasound)
 */
function getRedatingThreshold(gaWeeks: number): number {
  switch (true) {
    case gaWeeks < 5:
      return 0 // Do not redate before 5 weeks
    case gaWeeks <= 8:
      return 5
    case gaWeeks <= 13:
      return 7
    case gaWeeks <= 15:
      return 10
    case gaWeeks <= 21:
      return 14
    case gaWeeks <= 27:
      return 21
    default:
      return 21 // ≥28 weeks: generally do not redate
  }
}

/**
 * Main pregnancy info calculator (ACOG-compliant)
 */
export function calculatePregnancyInfo(
  lmpDate: Date | null | undefined,
  ultrasoundDate?: Date,
  gaWeeks?: number,
  gaDays?: number,
): PregnancyInfo | null {
  if (!lmpDate || Number.isNaN(lmpDate.getTime())) return null

  const lmpEdd = add(lmpDate, { days: 280 })
  let bestEstimateEdd = lmpEdd
  let ultrasoundEdd = lmpEdd
  let source: PregnancyInfo['source'] = 'LMP'
  let discrepancyDays = 0

  if (ultrasoundDate && gaWeeks !== undefined && gaDays !== undefined) {
    // Total GA in days from ultrasound measurement
    const measuredGaInDays = gaWeeks * 7 + gaDays
    ultrasoundEdd = add(ultrasoundDate, { days: 280 - measuredGaInDays })

    // GA by LMP (days between LMP and ultrasound date)
    const lmpBasedGaInDays = differenceInDays(ultrasoundDate, lmpDate)
    discrepancyDays = Math.abs(lmpBasedGaInDays - measuredGaInDays)

    const gaWeeksByLmp = Math.floor(lmpBasedGaInDays / 7)
    const redatingThreshold = getRedatingThreshold(gaWeeksByLmp)

    // Only redate if discrepancy strictly exceeds threshold
    if (gaWeeksByLmp >= 5 && discrepancyDays > redatingThreshold) {
      bestEstimateEdd = ultrasoundEdd
      source = 'Ultrasound'
    } else {
      source = 'LMP_CONFIRMED'
    }
  }

  const estimatedLmp = sub(bestEstimateEdd, { days: 280 })
  const today = new Date()

  // Gestational age (in days) from estimated LMP to today
  let currentGaInDays = differenceInDays(today, estimatedLmp)
  if (currentGaInDays < 0) currentGaInDays = 0 // Clamp for future LMPs

  const gestationalAgeWeeks = Math.floor(currentGaInDays / 7)
  const gestationalAgeDays = currentGaInDays % 7

  // Trimester cutoffs per ACOG
  const firstTrimesterEnd = add(estimatedLmp, { weeks: 13, days: 6 })
  const secondTrimesterEnd = add(estimatedLmp, { weeks: 27, days: 6 })

  let trimester = 1
  if (today > secondTrimesterEnd) trimester = 3
  else if (today > firstTrimesterEnd) trimester = 2

  const milestoneDates = pregnancyMilestones.map((m) => {
    const startDate = add(estimatedLmp, { weeks: m.startWeeks, days: m.startDays || 0 })
    const endDate = add(estimatedLmp, { weeks: m.endWeeks, days: m.endDays || 0 })
    const startStr = format(startDate, 'MMM d')
    const endStr = format(endDate, 'MMM d, yyyy')
    const isSameDay = format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')
    const dateRange = isSameDay ? endStr : `${startStr} - ${endStr}`
    return { name: m.name, dateRange }
  })

  return {
    lmpEdd,
    ultrasoundEdd,
    bestEstimateEdd,
    source,
    gestationalAgeWeeks,
    gestationalAgeDays,
    conceptionDate: add(estimatedLmp, { weeks: 2 }),
    trimester,
    firstTrimesterEnd,
    secondTrimesterEnd,
    discrepancyDays,
    milestoneDates,
  }
}
