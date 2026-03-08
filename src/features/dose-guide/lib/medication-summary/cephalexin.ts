import type { QuickReferenceMedication } from '../types'

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
      amount: 25,
      unit: 'mg/kg/dose',
      frequency: 'BD',
      minAge: 1,
    },
  ],
  concentration: {
    amount: 250,
    unit: 'mg/5ml',
    formulation: 'suspension',
  },
  complaintCategories: ['antimicrobials'],
  enabled: true,
}

export default cephalexin
