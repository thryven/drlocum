import type { QuickReferenceMedication } from '../types'

/**
 * Promethazine (Phenergan)
 * Categories: allergy
 *
 * Frank Shann: 0.2-0.5 mg/kg tds
 *
 * MIMS, BNFc:
 * 2-5 years 5 mg bid
 * 6-12 years 5-10 mg bid
 */
const promethazine: QuickReferenceMedication = {
  id: 'promethazine-quick',
  name: 'Promethazine',
  dosingProfiles: [
    {
      formula: 'weight',
      amount: 0.3,
      unit: 'mg/kg/dose',
      frequency: 'TDS',
      minAge: 24,
    },
  ],
  concentration: {
    amount: 5,
    unit: 'mg/5ml',
    formulation: 'syrup',
  },
  complaintCategories: ['allergy'],
  enabled: true,
}

export default promethazine
