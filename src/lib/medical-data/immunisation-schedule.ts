// src/lib/medical-data/immunisation-schedule.ts

export const ageMonths = ['0', '2', '3', '4', '5', '6', '9', '12', '15', '18', '21'] as const
export const ageYears = ['7', '13', '15'] as const

interface VaccineDose {
  age: string
  label: string
}

interface Vaccine {
  name: string
  doses: readonly VaccineDose[]
}

export const vaccines: readonly Vaccine[] = [
  { name: 'BCG', doses: [{ age: '0m', label: 'Single dose' }] },
  {
    name: 'Hepatitis B',
    doses: [{ age: '0m', label: 'Dose at birth' }],
  },
  {
    name: 'DTaP-IPV-Hep B-Hib',
    doses: [
      { age: '2m', label: 'Dose 1' },
      { age: '3m', label: 'Dose 2' },
      { age: '5m', label: 'Dose 3' },
      { age: '18m', label: 'Booster dose' },
    ],
  },
  {
    name: 'MMR (Meascles, Mumps, Rubella)',
    doses: [
      { age: '9m', label: 'Dose 1' },
      { age: '12m', label: 'Dose 2' },
    ],
  },
  {
    name: 'Pneumococcal (PCV)',
    doses: [
      { age: '4m', label: 'Dose 1' },
      { age: '6m', label: 'Dose 2' },
      { age: '15m', label: 'Booster dose' },
    ],
  },
  { name: 'DT (Diphtheria, Tetanus)', doses: [{ age: '7y', label: 'Booster dose' }] },
  { name: 'HPV', doses: [{ age: '13y', label: '1 Dose' }] },
  { name: 'Tetanus', doses: [{ age: '15y', label: 'Booster dose' }] },
] as const

interface AdditionalVaccine {
  name: string
  note: string
}

export const additionalVaccines: readonly AdditionalVaccine[] = [
  { name: 'Rotavirus', note: '2 or 3 doses given 4 weeks apart' },
  {
    name: 'Influenza',
    note: '2 doses annually for <8 years old, 1 dose annually for ≥8 years old',
  },
  { name: 'Meningococcal', note: "1-2 doses, depending on child's age & vaccine brand" },
  { name: 'Hepatitis A', note: '2 doses, 6 months apart' },
  { name: 'Varicella', note: '3 doses, at least 3 months apart' },
] as const
