import type { QuickReferenceMedication } from '../types'

/**
 * Prednisolone (Prelone)
 * Categories: respiratory, allergy
 *
 * MIMS: 0.14-2 mg/kg daily in 3 or 4 divided doses.
 *
 * Frank Shann:
 * Asthma - 1 mg/kg daily
 *
 * BNFc:
 * Asthma - 1 month–11 years: 1–2 mg/kg once daily (max. per dose 40 mg)
 */
const prednisolone_3: QuickReferenceMedication = {
  id: 'prednisolone-3-quick',
  name: 'Prednisolone(3mg)',
  dosingProfiles: [
    {
      formula: 'weight',
      amount: 1,
      unit: 'mg/kg/day',
      frequency: 'TDS',
    },
  ],
  concentration: {
    amount: 3,
    unit: 'mg/5ml',
    formulation: 'syrup',
  },
  complaintCategories: ['corticosteroids', 'respiratory', 'allergy'],
  enabled: true,
}

export default prednisolone_3
