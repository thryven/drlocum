import type { QuickReferenceMedication } from '../types'

/**
 * Augmentin (Amoxicillin/Clavulanate, Co-amoxiclav)
 * Categories: antibiotics
 *
 * High-level summary: Broad-spectrum antibiotic for resistant bacteria.
 * Indications: Sinusitis, pneumonia, skin infections, animal bites.
 * Contraindications: Penicillin allergy, history of liver problems with Augmentin.
 * Adverse effects: Diarrhea (common), nausea, rash.
 * Pregnancy & Lactation: Use if benefit outweighs risk. Compatible with breastfeeding.
 * Sources: MIMS, Drugs.com, local clinical guidelines.
 */
const augmentin_228: QuickReferenceMedication = {
  id: 'augmentin-228-quick',
  name: 'Augmentin (228mg)',
  dosingProfiles: [
    {
      minAge: 24, // 2 years
      maxAge: 83, // up to 6 years
      formula: 'fixed',
      amount: 10,
      unit: 'mL/dose',
      frequency: 'BD',
      maxDose: 10,
      maxDoseUnit: 'mL/dose',
    },
    {
      minAge: 84, // 7 years
      maxAge: 155, // up to 12 years
      formula: 'fixed',
      amount: 10,
      unit: 'mL/dose',
      frequency: 'BD',
      maxDose: 10,
      maxDoseUnit: 'mL/dose',
    },
  ],
  concentration: {
    amount: 200, // based on amoxicillin component
    unit: 'mg/5ml',
    formulation: 'suspension',
  },
  complaintCategories: ['antimicrobials'],
  enabled: true,
}

export default augmentin_228
