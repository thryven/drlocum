import type { QuickReferenceMedication } from '../../types'

/**
 * Cephalexin (Keflex)
 * Categories: antibiotics
 *
 * High-level summary: First-generation cephalosporin antibiotic.
 * Indications: Skin infections (cellulitis), urinary tract infections, strep throat.
 * Contraindications: Known severe allergy to cephalosporins.
 * Adverse effects: Diarrhea, nausea, abdominal pain.
 * Pregnancy & Lactation: Generally considered safe.
 * Sources: MIMS, Drugs.com, local clinical guidelines.
 */
const cephalexin: QuickReferenceMedication = {
  id: 'cephalexin-quick',
  name: 'Cephalexin',
  dosingProfiles: [
    {
      formula: 'weight',
      amount: 12.5,
      unit: 'mg/kg/dose',
      frequency: 'QID',
      maxDose: 500,
      maxDoseUnit: 'mg/dose',
      minAge: 1, // Suitable from 1 month onwards
    },
  ],
  concentration: {
    amount: 125,
    unit: 'mg/5ml',
    formulation: 'suspension',
  },
  complaintCategories: ['antibiotics'],
  enabled: true,
}

export default cephalexin
