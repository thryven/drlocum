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

const getRiskPercent = (gender: Gender, points: number): string => {
  if (gender === 'male') {
    if (points <= 0) return '<1'
    if (points === 1) return '1.2'
    if (points === 2) return '1.5'
    if (points === 3) return '1.8'
    if (points === 4) return '2.1'
    if (points === 5) return '2.6'
    if (points === 6) return '3.1'
    if (points === 7) return '3.7'
    if (points === 8) return '4.5'
    if (points === 9) return '5.4'
    if (points === 10) return '6.5'
    if (points === 11) return '7.8'
    if (points === 12) return '9.4'
    if (points === 13) return '11.3'
    if (points === 14) return '13.6'
    if (points === 15) return '16.3'
    if (points === 16) return '19.5'
    if (points === 17) return '23.3'
    if (points >= 18) return '>25'
    return '>25' // Fallback for any unexpected high score
  }
  // Female
  if (points <= -2) return '<1'
  if (points === -1) return '1.0'
  if (points === 0) return '1.2'
  if (points === 1) return '1.5'
  if (points === 2) return '1.7'
  if (points === 3) return '2.0'
  if (points === 4) return '2.4'
  if (points === 5) return '2.8'
  if (points === 6) return '3.3'
  if (points === 7) return '3.9'
  if (points === 8) return '4.5'
  if (points === 9) return '5.3'
  if (points === 10) return '6.3'
  if (points === 11) return '7.3'
  if (points === 12) return '8.6'
  if (points === 13) return '10.0'
  if (points === 14) return '11.7'
  if (points === 15) return '13.7'
  if (points === 16) return '15.9'
  if (points === 17) return '18.5'
  if (points === 18) return '21.5'
  if (points === 19) return '24.8'
  if (points === 20) return '28.5'
  return '>30' // for 21+
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
    // Female calculation using new General CVD score
    // Age points
    if (age >= 75) totalPoints += 12
    else if (age >= 70) totalPoints += 11
    else if (age >= 65) totalPoints += 10
    else if (age >= 60) totalPoints += 9
    else if (age >= 55) totalPoints += 8
    else if (age >= 50) totalPoints += 7
    else if (age >= 45) totalPoints += 5
    else if (age >= 40) totalPoints += 4
    else if (age >= 35) totalPoints += 2
    else if (age >= 30) totalPoints += 0

    // HDL-C points
    if (hdlMmolL < 0.9) totalPoints += 2
    else if (hdlMmolL < 1.2) totalPoints += 1
    else if (hdlMmolL < 1.3) totalPoints += 0
    else if (hdlMmolL < 1.6) totalPoints -= 1
    else totalPoints -= 2

    // Total Cholesterol points
    if (tcMmolL >= 7.4) totalPoints += 5
    else if (tcMmolL >= 6.3) totalPoints += 4
    else if (tcMmolL >= 5.2) totalPoints += 3
    else if (tcMmolL >= 4.2) totalPoints += 1

    // SBP points
    if (state.isTreatedForBP === 'yes') {
      if (sbp >= 160) totalPoints += 7
      else if (sbp >= 150) totalPoints += 6
      else if (sbp >= 140) totalPoints += 5
      else if (sbp >= 130) totalPoints += 3
      else if (sbp >= 120) totalPoints += 2
      else totalPoints -= 1
    } else {
      if (sbp >= 160) totalPoints += 5
      else if (sbp >= 150) totalPoints += 4
      else if (sbp >= 140) totalPoints += 2
      else if (sbp >= 130) totalPoints += 1
      else if (sbp < 120) totalPoints -= 3
    }

    // Smoker points
    if (state.isSmoker === 'yes') totalPoints += 3

    // Diabetes points
    if (state.hasDiabetes === 'yes') totalPoints += 4
  }

  const riskPercent = getRiskPercent(state.gender, totalPoints)

  return { totalPoints, riskPercent }
}
