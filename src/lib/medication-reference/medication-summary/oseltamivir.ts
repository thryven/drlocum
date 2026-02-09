import type { QuickReferenceMedication } from '../types'

/**
 * Oseltamivir (Fluhalt / Tamiflu)
 * Categories: antiviral
 *
 * High-level summary: Antiviral for Influenza A and B.
 * Indications: Treatment of influenza.
 * Contraindications: Allergy to oseltamivir.
 * Adverse effects: Nausea, vomiting, headache.
 * Pregnancy & Lactation: Use if benefit outweighs risk.
 * Sources: Frank Shann, local clinical guidelines.
 */
const oseltamivir: QuickReferenceMedication = {
  id: 'oseltamivir-quick',
  name: 'Oseltamivir',
  aliases: ['Fluhalt', 'Tamiflu'],
  dosingProfiles: [
    {
      formula: 'weight',
      amount: 3,
      unit: 'mg/kg/dose',
      frequency: 'BD',
      maxAge: 8, // < 9 months
    },
    {
      minAge: 9,
      maxAge: 11,
      formula: 'weight',
      amount: 3.5,
      unit: 'mg/kg/dose',
      frequency: 'BD',
    },
    {
      minAge: 12, // 1 year
      maxAge: 144, // up to 12 years
      formula: 'weight-tiered',
      amount: 0, // Base amount is not used for tiered
      unit: 'mg/dose',
      frequency: 'BD',
      weightTiers: [
        {
          minWeight: 0,
          maxWeight: 15,
          amount: 30,
        },
        {
          minWeight: 15.1,
          maxWeight: 23,
          amount: 45,
        },
        {
          minWeight: 23.1,
          maxWeight: 40,
          amount: 60,
        },
        {
          minWeight: 40.1,
          amount: 75,
        },
      ],
    },
  ],
  concentration: {
    amount: 60,
    unit: 'mg/5ml',
    formulation: 'suspension',
  },
  complaintCategories: ['antimicrobials'],
  enabled: true,
  notes: ['Treatment course is for 5 days.'],
}

export default oseltamivir
