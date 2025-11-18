// src/app/resources/neonatal-jaundice/page.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const metadata = {
  title: 'Neonatal Jaundice Assessment | Doses',
  description:
    "Visual Assessment of Neonatal Jaundice based on Kramer's rule and TSB level guidelines for phototherapy.",
}

interface KramerRule {
  level: number
  area: string
  umolL: string
  mgdL: string
}

interface TsbLevel {
  age: string
  lowRiskPhototherapy: string
  lowRiskExchangeTransfusion: string
  mediumRiskPhototherapy: string
  mediumRiskExchangeTransfusion: string
  highRiskPhototherapy: string
  highRiskExchangeTransfusion: string
}

const kramerRuleData: KramerRule[] = [
  { level: 1, area: 'Head and neck', umolL: '68 - 133', mgdL: '4 - 8' },
  { level: 2, area: 'Upper trunk (above umbilicus)', umolL: '85 - 204', mgdL: '5 - 12' },
  { level: 3, area: 'Lower trunk and thighs (below umbilicus)', umolL: '136 - 272', mgdL: '8 - 16' },
  { level: 4, area: 'Arms and lower legs', umolL: '187 - 306', mgdL: '11 - 18' },
  { level: 5, area: 'Palms and soles', umolL: '≥ 306', mgdL: '≥ 18' },
]

const tsbLevelsData: TsbLevel[] = [
  {
    age: '*6',
    lowRiskPhototherapy: '5 (80)',
    lowRiskExchangeTransfusion: '17 (290)',
    mediumRiskPhototherapy: '4 (60)',
    mediumRiskExchangeTransfusion: '14 (240)',
    highRiskPhototherapy: '2 (30)',
    highRiskExchangeTransfusion: '13 (220)',
  },
  {
    age: '*12',
    lowRiskPhototherapy: '6 (100)',
    lowRiskExchangeTransfusion: '18 (310)',
    mediumRiskPhototherapy: '5 (80)',
    mediumRiskExchangeTransfusion: '15 (260)',
    highRiskPhototherapy: '3 (50)',
    highRiskExchangeTransfusion: '14 (240)',
  },
  {
    age: '24',
    lowRiskPhototherapy: '9 (154)',
    lowRiskExchangeTransfusion: '19 (325)',
    mediumRiskPhototherapy: '7 (120)',
    mediumRiskExchangeTransfusion: '17 (291)',
    highRiskPhototherapy: '5 (86)',
    highRiskExchangeTransfusion: '15 (257)',
  },
  {
    age: '48',
    lowRiskPhototherapy: '12 (205)',
    lowRiskExchangeTransfusion: '22 (376)',
    mediumRiskPhototherapy: '10 (171)',
    mediumRiskExchangeTransfusion: '19 (325)',
    highRiskPhototherapy: '8 (137)',
    highRiskExchangeTransfusion: '17 (291)',
  },
  {
    age: '72',
    lowRiskPhototherapy: '15 (257)',
    lowRiskExchangeTransfusion: '24 (410)',
    mediumRiskPhototherapy: '12 (205)',
    mediumRiskExchangeTransfusion: '21 (359)',
    highRiskPhototherapy: '10 (171)',
    highRiskExchangeTransfusion: '18.5 (316)',
  },
  {
    age: '96',
    lowRiskPhototherapy: '17 (291)',
    lowRiskExchangeTransfusion: '25 (428)',
    mediumRiskPhototherapy: '14 (239)',
    mediumRiskExchangeTransfusion: '22.5 (385)',
    highRiskPhototherapy: '11 (188)',
    highRiskExchangeTransfusion: '19 (325)',
  },
  {
    age: '>96',
    lowRiskPhototherapy: '18 (308)',
    lowRiskExchangeTransfusion: '25 (428)',
    mediumRiskPhototherapy: '15 (257)',
    mediumRiskExchangeTransfusion: '22.5 (385)',
    highRiskPhototherapy: '12 (205)',
    highRiskExchangeTransfusion: '19 (325)',
  },
]

const tsbGuidelines: string[] = [
  'Start intensive phototherapy at TSB of 3 mg/dL (51 µmol/L) above the level for conventional phototherapy or when TSB increasing at >0.5 mg/dL (8.5 µmol/L) per hour.',
  'Risk factors are isoimmune haemolytic disease, G6PD deficiency, asphyxia and sepsis.',
  'The AAP exchange transfusion guidelines for babies ≥35 weeks gestation recommend:',
  'ET if baby shows signs of ABE or if TSB ≥5 mg/dL (85 µmol/L) above the ET levels.',
  'ET if TSB rises to ET levels despite intensive phototherapy in hospitalised babies.',
  'For readmitted babies without signs of ABE, if the TSB is above the ET levels, repeat TSB every 2 - 3 hours and consider ET if it is not expected to drop below ET levels after 6 hours of intensive phototherapy.',
]

/**
 * Page component rendering the Neonatal Jaundice Assessment UI, including Kramer’s Rule, risk-stratified TSB thresholds, and clinical guidelines.
 *
 * Renders three sections: a Kramer’s Rule reference table, a multi-column TSB threshold table for phototherapy and exchange transfusion (by risk group and age), and a list of clinical guideline statements. All content is driven from static data arrays.
 *
 * @returns The React element for the Neonatal Jaundice Assessment page.
 */
export default function NeonatalJaundicePage() {
  return (
    <div className='w-full max-w-6xl mx-auto pb-24'>
      <header className='mb-8'>
        <h1 className='section-header'>Neonatal Jaundice Assessment</h1>
        <p className='text-hierarchy-secondary mt-2'>
          Visual Assessment of Neonatal Jaundice (Kramer&apos;s Rule) and TSB Level Guidelines.
        </p>
      </header>

      <section className='space-y-component'>
        <Card>
          <CardHeader>
            <CardTitle>Kramer&apos;s Rule</CardTitle>
            <CardDescription>
              This rule correlates the progression of jaundice in a top-to-bottom direction with the level of serum
              bilirubin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Level</TableHead>
                  <TableHead>Area of the Body</TableHead>
                  <TableHead>Range of Serum Bilirubin (μmol/L)</TableHead>
                  <TableHead>Range of Serum Bilirubin (mg/dL)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kramerRuleData.map((row) => (
                  <TableRow key={row.level}>
                    <TableCell className='font-medium'>{row.level}</TableCell>
                    <TableCell>{row.area}</TableCell>
                    <TableCell>{row.umolL}</TableCell>
                    <TableCell>{row.mgdL}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className='text-xs text-muted-foreground mt-4 text-center'>
              Note: This is a guide for visual assessment. Actual serum bilirubin measurement is required for definitive
              diagnosis and management.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TSB Levels for Phototherapy and Exchange Transfusion</CardTitle>
            <CardDescription>In babies ≥35 weeks gestation (adapted from AAP Guidelines).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead rowSpan={2} className='align-bottom'>
                      Age (Hours of life)
                    </TableHead>
                    <TableHead colSpan={2} className='text-center border-l'>
                      Low Risk (&gt;38 weeks and well)
                    </TableHead>
                    <TableHead colSpan={2} className='text-center border-l'>
                      Medium Risk (&gt;38 weeks + risk factors, or 35-37 weeks + 6 days and well)
                    </TableHead>
                    <TableHead colSpan={2} className='text-center border-l'>
                      High Risk (35-37 weeks + 6 days with risk factors)
                    </TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className='text-center border-l'>Conventional Phototherapy</TableHead>
                    <TableHead className='text-center border-l'>Exchange Transfusion</TableHead>
                    <TableHead className='text-center border-l'>Conventional Phototherapy</TableHead>
                    <TableHead className='text-center border-l'>Exchange Transfusion</TableHead>
                    <TableHead className='text-center border-l'>Conventional Phototherapy</TableHead>
                    <TableHead className='text-center border-l'>Exchange Transfusion</TableHead>
                  </TableRow>
                  <TableRow>
                    <TableHead className='font-normal text-muted-foreground' />
                    <TableHead className='text-center font-normal text-muted-foreground border-l'>
                      TSB mg/dL (µmol/L)
                    </TableHead>
                    <TableHead className='text-center font-normal text-muted-foreground border-l'>
                      TSB mg/dL (µmol/L)
                    </TableHead>
                    <TableHead className='text-center font-normal text-muted-foreground border-l'>
                      TSB mg/dL (µmol/L)
                    </TableHead>
                    <TableHead className='text-center font-normal text-muted-foreground border-l'>
                      TSB mg/dL (µmol/L)
                    </TableHead>
                    <TableHead className='text-center font-normal text-muted-foreground border-l'>
                      TSB mg/dL (µmol/L)
                    </TableHead>
                    <TableHead className='text-center font-normal text-muted-foreground border-l'>
                      TSB mg/dL (µmol/L)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tsbLevelsData.map((row) => (
                    <TableRow key={row.age}>
                      <TableCell className='font-medium'>{row.age}</TableCell>
                      <TableCell className='text-center border-l'>{row.lowRiskPhototherapy}</TableCell>
                      <TableCell className='text-center border-l'>{row.lowRiskExchangeTransfusion}</TableCell>
                      <TableCell className='text-center border-l'>{row.mediumRiskPhototherapy}</TableCell>
                      <TableCell className='text-center border-l'>{row.mediumRiskExchangeTransfusion}</TableCell>
                      <TableCell className='text-center border-l'>{row.highRiskPhototherapy}</TableCell>
                      <TableCell className='text-center border-l'>{row.highRiskExchangeTransfusion}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clinical Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc list-inside space-y-2 text-sm text-muted-foreground'>
              {tsbGuidelines.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
