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
}

export const initialState: FraminghamState = {
  gender: 'male',
  age: '55',
  totalCholesterol: '220',
  hdlCholesterol: '45',
  systolicBP: '135',
  isSmoker: 'no',
  isTreatedForBP: 'no',
}

const getAgePoints = (gender: Gender, age: number): number => {
  if (gender === 'male') {
    if (age <= 34) return -9
    if (age <= 39) return -4
    if (age <= 44) return 0
    if (age <= 49) return 3
    if (age <= 54) return 6
    if (age <= 59) return 8
    if (age <= 64) return 10
    if (age <= 69) return 11
    if (age <= 74) return 12
    return 13
  }
  // Female
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

const getTotalCholesterolPoints = (gender: Gender, age: number, tc: number): number => {
  if (gender === 'male') {
    if (age <= 39) {
      if (tc < 160) return 0
      if (tc <= 199) return 4
      if (tc <= 239) return 7
      if (tc <= 279) return 9
      return 11
    }
    if (age <= 49) {
      if (tc < 160) return 0
      if (tc <= 199) return 3
      if (tc <= 239) return 5
      if (tc <= 279) return 6
      return 8
    }
    if (age <= 59) {
      if (tc < 160) return 0
      if (tc <= 199) return 2
      if (tc <= 239) return 3
      if (tc <= 279) return 4
      return 5
    }
    if (age <= 69) {
      if (tc < 160) return 0
      if (tc <= 199) return 1
      if (tc <= 239) return 1
      if (tc <= 279) return 2
      return 3
    } // age >= 70
    if (tc < 160) return 0
    if (tc <= 199) return 0
    if (tc <= 239) return 0
    if (tc <= 279) return 1
    return 1
  }
  // Female
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

const getSmokingPoints = (gender: Gender, age: number, isSmoker: boolean): number => {
  if (!isSmoker) return 0
  if (gender === 'male') {
    if (age <= 39) return 8
    if (age <= 49) return 5
    if (age <= 59) return 3
    if (age <= 69) return 1
    return 1
  }
  // Female
  if (age <= 39) return 9
  if (age <= 49) return 7
  if (age <= 59) return 4
  if (age <= 69) return 2
  return 1
}

const getHdlPoints = (hdl: number): number => {
  if (hdl >= 60) return -1
  if (hdl >= 50) return 0
  if (hdl >= 40) return 1
  return 2
}

const getSystolicBpPoints = (gender: Gender, sbp: number, isTreated: boolean): number => {
  if (gender === 'male') {
    if (isTreated) {
      if (sbp < 120) return 0
      if (sbp <= 129) return 1
      if (sbp <= 139) return 2
      if (sbp <= 159) return 2
      return 3
    }
    if (sbp < 120) return 0
    if (sbp <= 129) return 0
    if (sbp <= 139) return 1
    if (sbp <= 159) return 1
    return 2
  }
  // Female
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
  const tc = parseInt(state.totalCholesterol, 10)
  const hdl = parseInt(state.hdlCholesterol, 10)
  const sbp = parseInt(state.systolicBP, 10)

  if (Number.isNaN(age) || Number.isNaN(tc) || Number.isNaN(hdl) || Number.isNaN(sbp)) {
    return null
  }

  const agePts = getAgePoints(state.gender, age)
  const tcPts = getTotalCholesterolPoints(state.gender, age, tc)
  const smokePts = getSmokingPoints(state.gender, age, state.isSmoker === 'yes')
  const hdlPts = getHdlPoints(hdl)
  const sbpPts = getSystolicBpPoints(state.gender, sbp, state.isTreatedForBP === 'yes')

  const totalPoints = agePts + tcPts + smokePts + hdlPts + sbpPts
  const riskPercent = getRiskPercent(state.gender, totalPoints)

  return { totalPoints, riskPercent }
}
