// src/lib/medical-data/haematological-parameters.ts
/**
 * Haematological reference values by age group.
 * Source: Paediatric Protocols for Malaysian Hospitals, 4th Edition
 */
interface AgeData {
  age: string
}

interface HaematologicalData extends AgeData {
  hb: string
  pcv: string
  retics: string
  mcv: string
  mch: string
  twbc: string
  neutrophil: string
  lymphocyte: string
}

export interface DifferentialCount extends AgeData {
  relation: string
}

export const haematologicalData: HaematologicalData[] = [
  {
    age: 'Cord Blood',
    hb: '13.7-20.1',
    pcv: '45-65',
    retics: '5.0',
    mcv: '110',
    mch: '-',
    twbc: '9-30',
    neutrophil: '61',
    lymphocyte: '31',
  },
  {
    age: '2 weeks',
    hb: '13.0-20.0',
    pcv: '42-66',
    retics: '1.0',
    mcv: '-',
    mch: '29',
    twbc: '5-21',
    neutrophil: '40',
    lymphocyte: '63',
  },
  {
    age: '3 months',
    hb: '9.5-14.5',
    pcv: '31-41',
    retics: '1.0',
    mcv: '-',
    mch: '27',
    twbc: '6-18',
    neutrophil: '30',
    lymphocyte: '48',
  },
  {
    age: '6 months - 6 years',
    hb: '10.5-14.0',
    pcv: '33-42',
    retics: '1.0',
    mcv: '70-74',
    mch: '25-31',
    twbc: '6-15',
    neutrophil: '45',
    lymphocyte: '38',
  },
  {
    age: '7 - 12 years',
    hb: '11.0-16.0',
    pcv: '34-40',
    retics: '1.0',
    mcv: '76-80',
    mch: '26-32',
    twbc: '4.5-13.5',
    neutrophil: '55',
    lymphocyte: '38',
  },
  {
    age: 'Adult male',
    hb: '14.0-18.0',
    pcv: '42-52',
    retics: '1.6',
    mcv: '80',
    mch: '27-32',
    twbc: '5-10',
    neutrophil: '55',
    lymphocyte: '35',
  },
  {
    age: 'Adult female',
    hb: '12.0-16.0',
    pcv: '37-47',
    retics: '1.6',
    mcv: '80',
    mch: '26-34',
    twbc: '5-10',
    neutrophil: '55',
    lymphocyte: '35',
  },
]

export const differentialCountsData: DifferentialCount[] = [
  { age: 'Less than 7 days', relation: 'neutrophils > lymphocytes' },
  { age: '1 week - 4 years', relation: 'lymphocytes > neutrophils' },
  { age: '4 - 7 years', relation: 'neutrophils = lymphocytes' },
  { age: 'More than 7 years', relation: 'neutrophils > lymphocytes' },
]

export const pointsToNote: string[] = [
  'Differential WBC: eosinophils: 2-3%; monocytes: 6-9%',
  'Platelet counts are lower in first months of age; but normal range by 6 months',
  'Erythrocyte sedimentation rate (ESR) is < 16 mm/hr in children, provided PCV is at least 35%.',
]
