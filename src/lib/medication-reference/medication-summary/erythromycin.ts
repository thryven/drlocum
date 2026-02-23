import type { QuickReferenceMedication } from '../types'

/**
 * Erythromycin (Eryc)
 * Categories: antibiotics
 *
 * High-level summary: Macrolide antibiotic, alternative to penicillin.
 * Indications: Whooping cough, diphtheria, atypical pneumonia.
 * Contraindications: Allergy to macrolides, certain heart conditions (QT prolongation).
 * Adverse effects: GI upset (very common), nausea, vomiting.
 * Pregnancy & Lactation: Generally safe. Use with caution in lactation.
 * Sources: MIMS, Drugs.com, local clinical guidelines.
 */
const erythromycin: QuickReferenceMedication = {
  id: 'erythromycin-quick',
  name: 'Erythromycin',
  dosingProfiles: [
    {
      formula: 'weight',
      amount: 20,
      unit: 'mg/kg/dose',
      frequency: 'BD',
      minAge: 2,
    },
  ],
  concentration: {
    amount: 400,
    unit: 'mg/5ml',
    formulation: 'suspension',
  },
  complaintCategories: ['antimicrobials'],
  enabled: true,
}

export default erythromycin
