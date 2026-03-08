import type { QuickReferenceMedication } from '../types'

/**
 * Dexamethasone (Decadron)
 * Categories: respiratory, allergy
 *
 * BNFc: Child: 10–100 micrograms/kg daily in divided doses
 */
const dexamethasone: QuickReferenceMedication = {
  id: 'dexamethasone-quick',
  name: 'Dexamethasone',
  dosingProfiles: [
    {
      formula: 'weight',
      amount: 0.15,
      unit: 'mg/kg/dose',
      frequency: 'TDS',
    },
  ],
  concentration: {
    amount: 0.5,
    unit: 'mg/5ml',
    formulation: 'syrup',
  },
  complaintCategories: ['corticosteroids', 'respiratory', 'allergy'],
  enabled: false,
}

export default dexamethasone
