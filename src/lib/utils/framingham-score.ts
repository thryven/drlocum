// src/lib/utils/framingham-score.ts
type Gender = 'male' | 'female'

export interface FraminghamState {
  gender: Gender
  age: string
  totalCholesterol: string
  hdlCholesterol: string
  systolicBP: string
  isSmoker: 'yes' | 'no'
  isTreatedForBP: 'yes' | 'no'
  hasDiabetes: 'yes' | 'no'
}

export const initialState: FraminghamState = {
  gender: 'male',
  age: '55',
  totalCholesterol: '5.7',
  hdlCholesterol: '1.2',
  systolicBP: '135',
  isSmoker: 'no',
  isTreatedForBP: 'no',
  hasDiabetes: 'no',
}

// Original functions for Female - preserved as no new table was provided
const getAgePointsFemale = (age: number): number => {
  if (age <= 34) return -7
  if (age <= 39) return -3
  if (age <= 44) return 0
  if (age <= 49) return 3
  if (age <= 54) return 5
  if (age <= 59) return 8
  if (age <= 64) return 10
  if (age <= 69) return 12
  if (age <= 74) return 14
  return 16
}

const getTotalCholesterolPointsFemale = (age: number, tc: number): number => {
  if (age <= 39) {
    if (tc < 160) return 0
    if (tc <= 199) return 4
    if (tc <= 239) return 8
    if (tc <= 279) return 11
    return 13
  }
  if (age <= 49) {
    if (tc < 160) return 0
    if (tc <= 199) return 3
    if (tc <= 239) return 6
    if (tc <= 279) return 8
    return 10
  }
  if (age <= 59) {
    if (tc < 160) return 0
    if (tc <= 199) return 2
    if (tc <= 239) return 4
    if (tc <= 279) return 5
    return 7
  }
  if (age <= 69) {
    if (tc < 160) return 0
    if (tc <= 199) return 1
    if (tc <= 239) return 2
    if (tc <= 279) return 3
    return 4
  } // age >= 70
  if (tc < 160) return 0
  if (tc <= 199) return 1
  if (tc <= 239) return 1
  if (tc <= 279) return 2
  return 2
}

const getSmokingPointsFemale = (age: number, isSmoker: boolean): number => {
  if (!isSmoker) return 0
  if (age <= 39) return 9
  if (age <= 49) return 7
  if (age <= 59) return 4
  if (age <= 69) return 2
  return 1
}

const getHdlPointsFemale = (hdl: number): number => {
  if (hdl >= 60) return -1
  if (hdl >= 50) return 0
  if (hdl >= 40) return 1
  return 2
}

const getSystolicBpPointsFemale = (sbp: number, isTreated: boolean): number => {
  if (isTreated) {
    if (sbp < 120) return 0
    if (sbp <= 129) return 3
    if (sbp <= 139) return 4
    if (sbp <= 159) return 5
    return 6
  }
  if (sbp < 120) return 0
  if (sbp <= 129) return 1
  if (sbp <= 139) return 2
  if (sbp <= 159) return 3
  return 4
}

const getRiskPercent = (gender: Gender, points: number): string => {
  if (gender === 'male') {
    if (points <= 0) return '<1'
    if (points === 1) return '1'
    if (points === 2) return '1'
    if (points === 3) return '1'
    if (points === 4) return '1'
    if (points === 5) return '2'
    if (points === 6) return '2'
    if (points === 7) return '3'
    if (points === 8) return '4'
    if (points === 9) return '5'
    if (points === 10) return '6'
    if (points === 11) return '8'
    if (points === 12) return '10'
    if (points === 13) return '12'
    if (points === 14) return '16'
    if (points === 15) return '20'
    if (points === 16) return '25'
    return '>30'
  }
  // Female
  if (points < 9) return '<1'
  if (points === 9) return '1'
  if (points === 10) return '1'
  if (points === 11) return '1'
  if (points === 12) return '1'
  if (points === 13) return '2'
  if (points === 14) return '2'
  if (points === 15) return '3'
  if (points === 16) return '4'
  if (points === 17) return '5'
  if (points === 18) return '6'
  if (points === 19) return '8'
  if (points === 20) return '11'
  if (points === 21) return '14'
  if (points === 22) return '17'
  if (points === 23) return '22'
  if (points === 24) return '27'
  return '>30'
}

export function calculateFraminghamScore(state: FraminghamState) {
  const age = parseInt(state.age, 10)
  const tcMmolL = parseFloat(state.totalCholesterol)
  const hdlMmolL = parseFloat(state.hdlCholesterol)
  const sbp = parseInt(state.systolicBP, 10)

  if (Number.isNaN(age) || Number.isNaN(tcMmolL) || Number.isNaN(hdlMmolL) || Number.isNaN(sbp)) {
    return null
  }

  let totalPoints = 0

  if (state.gender === 'male') {
    // Age points
    if (age >= 75) totalPoints += 15
    else if (age >= 70) totalPoints += 14
    else if (age >= 65) totalPoints += 12
    else if (age >= 60) totalPoints += 11
    else if (age >= 55) totalPoints += 10
    else if (age >= 50) totalPoints += 8
    else if (age >= 45) totalPoints += 6
    else if (age >= 40) totalPoints += 5
    else if (age >= 35) totalPoints += 2
    else if (age >= 30) totalPoints += 0

    // HDL-C points
    if (hdlMmolL < 0.9) totalPoints += 2
    else if (hdlMmolL < 1.2) totalPoints += 1
    else if (hdlMmolL < 1.3) totalPoints += 0
    else if (hdlMmolL < 1.6) totalPoints -= 1
    else totalPoints -= 2

    // Total Cholesterol points
    if (tcMmolL >= 7.4) totalPoints += 4
    else if (tcMmolL >= 6.3) totalPoints += 3
    else if (tcMmolL >= 5.2) totalPoints += 2
    else if (tcMmolL >= 4.2) totalPoints += 1

    // SBP points
    if (state.isTreatedForBP === 'yes') {
      if (sbp >= 160) totalPoints += 5
      else if (sbp >= 140) totalPoints += 4
      else if (sbp >= 130) totalPoints += 3
      else if (sbp >= 120) totalPoints += 2
    } else {
      if (sbp >= 160) totalPoints += 3
      else if (sbp >= 140) totalPoints += 2
      else if (sbp >= 130) totalPoints += 1
      else if (sbp < 120) totalPoints -= 2
    }

    // Smoker points
    if (state.isSmoker === 'yes') totalPoints += 4

    // Diabetes points
    if (state.hasDiabetes === 'yes') totalPoints += 3
  } else {
    // Female calculation (old logic + diabetes)
    // Convert mmol/L to mg/dL for calculations as the tables are based on mg/dL
    const tcMgDl = tcMmolL * 38.67
    const hdlMgDl = hdlMmolL * 38.67

    const agePts = getAgePointsFemale(age)
    const tcPts = getTotalCholesterolPointsFemale(age, tcMgDl)
    const smokePts = getSmokingPointsFemale(age, state.isSmoker === 'yes')
    const hdlPts = getHdlPointsFemale(hdlMgDl)
    const sbpPts = getSystolicBpPointsFemale(sbp, state.isTreatedForBP === 'yes')

    totalPoints = agePts + tcPts + smokePts + hdlPts + sbpPts

    // Add points for diabetes (assuming 4 points for women as it's a common value)
    if (state.hasDiabetes === 'yes') totalPoints += 4
  }

  const riskPercent = getRiskPercent(state.gender, totalPoints)

  return { totalPoints, riskPercent }
}
