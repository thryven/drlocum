import type { QuickReferenceMedication } from '../types'

/**
 * Diphenhydramine (Benadryl)
 * Categories: allergy
 *
 * MIMS:
 * 2-6 years 6.25 mg 4-6 hourly
 * 6-12 years 12.5-25 mg 4-6 hourly
 * >12 years 25-50 mg 3 or 4 times daily
 *
 * Frank Shann: 1-2 mg/kg 6-8H
 */
const diphenhydramine_7: QuickReferenceMedication = {
  id: 'diphenhydramine-7-quick',
  name: 'Diphenhydramine(7mg)',
  dosingProfiles: [
    {
      minAge: 24, // 2 years
      maxAge: 71, // up to 5 years
      formula: 'fixed',
      amount: 2.5,
      unit: 'mL/dose',
      frequency: 'TDS',
    },
    {
      minAge: 72, // 6 years
      maxAge: 143, // up to 12 years
      formula: 'fixed',
      amount: 5,
      unit: 'mL/dose',
      frequency: 'TDS',
    },
  ],
  concentration: {
    amount: 7,
    unit: 'mg/5ml',
    formulation: 'syrup',
  },
  complaintCategories: ['allergy'],
  enabled: true,
}

export default diphenhydramine_7
