// src/app/resources/neonatal-jaundice/page.tsx
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Neonatal Jaundice Assessment | Doses',
  description:
    "Visual Assessment of Neonatal Jaundice based on Kramer's rule and TSB level guidelines for phototherapy.",
}

/**
 * Renders the Neonatal Jaundice Assessment page by displaying images of reference charts and tables.
 *
 * @returns The React element for the Neonatal Jaundice Assessment page, showing images for Kramer's Rule, risk factors, and TSB levels.
 */
export default function NeonatalJaundicePage() {
  return (
    <div className='w-full max-w-4xl mx-auto pb-24 space-y-8'>
      <header className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Neonatal Jaundice Assessment</h1>
        <p className='text-muted-foreground mt-2'>Visual Assessment of Neonatal Jaundice and Management Guidelines.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Kramer&apos;s Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-hidden rounded-lg border shadow-md'>
            <Image
              src='/photos/kramers_rule.png'
              alt="Diagram of Kramer's Rule for Neonatal Jaundice"
              width={1200}
              height={800}
              className='w-full h-auto'
              priority
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Factors for Severe Neonatal Jaundice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-hidden rounded-lg border shadow-md'>
            <Image
              src='/photos/risk_factors_severe_nnj.png'
              alt='Table of risk factors for severe neonatal jaundice'
              width={1200}
              height={800}
              className='w-full h-auto'
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TSB Levels for Phototherapy and Exchange Transfusion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-hidden rounded-lg border shadow-md'>
            <Image
              src='/photos/tsb_level.jpg'
              alt='Chart of TSB levels for phototherapy and exchange transfusion'
              width={1200}
              height={1600}
              className='w-full h-auto'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
