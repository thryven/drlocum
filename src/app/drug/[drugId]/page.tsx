// src/app/drug/[drugId]/page.tsx

import { notFound } from 'next/navigation'
import { AlertCircle, TriangleAlert } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { findMedicationById } from '@/lib/medication-reference/filtering'
import { medications as allDrugData } from '@/lib/medication-reference/medication-summary'
import type { QuickReferenceMedication, DosingProfile } from '@/lib/medication-reference/types'

interface DrugPageProps {
  params: {
    drugId: string
  }
}

async function getDrugPageData(drugId: string) {
  if (typeof drugId !== 'string') {
    return null
  }

  const lookupId = `${drugId.replace(/-quick$/, '')}-quick`
  const quickRefDrug = findMedicationById(allDrugData, lookupId)

  if (!quickRefDrug) {
    return null
  }

  return { quickRefDrug }
}

export async function generateMetadata({ params }: { params: { drugId: string } }) {
  const data = await getDrugPageData(params.drugId)

  if (!data) {
    return {
      title: 'Drug Not Found',
      description: 'The requested medication could not be found.',
    }
  }

  const { quickRefDrug } = data
  const title = quickRefDrug.name
  const description = `Clinical information for ${quickRefDrug.name}.`

  return {
    title: `${title} | Drug Information`,
    description,
  }
}

function DosingTable({ profiles }: { profiles: DosingProfile[] }) {
  const getAgeRange = (profile: DosingProfile) => {
    const { minAge, maxAge, formula } = profile
    if (formula === 'weight-tiered') {
      return 'Weight-based tiers'
    }

    const ageParts: string[] = []
    if (minAge !== undefined) {
      ageParts.push(`≥${minAge}mo`)
    }
    if (maxAge !== undefined) {
      ageParts.push(`<${maxAge}mo`)
    }
    return ageParts.join(' ') || 'All ages'
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Indication/Age</TableHead>
            <TableHead>Dose</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Max Dose</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile, index) => (
            <TableRow key={index}>
              <TableCell>{getAgeRange(profile)}</TableCell>
              <TableCell>
                {profile.amount} {profile.unit}
              </TableCell>
              <TableCell>{profile.frequency}</TableCell>
              <TableCell>{profile.maxDose ? `${profile.maxDose} ${profile.maxDoseUnit}` : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default async function DrugPage({ params }: Readonly<DrugPageProps>) {
  const data = await getDrugPageData(params.drugId)

  if (!data) {
    notFound()
  }

  const { quickRefDrug } = data

  return (
    <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-8'>
      <header>
        <h1 className='text-3xl font-bold tracking-tight'>{quickRefDrug.name}</h1>
        {quickRefDrug.aliases && quickRefDrug.aliases.length > 0 && (
          <p className='text-muted-foreground italic'>Also known as: {quickRefDrug.aliases.join(', ')}</p>
        )}
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Dosing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <DosingTable profiles={quickRefDrug.dosingProfiles} />
        </CardContent>
      </Card>

      {quickRefDrug.concentration && (
        <Card>
          <CardHeader>
            <CardTitle>Formulation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {quickRefDrug.concentration.formulation}: {quickRefDrug.concentration.amount}
              {quickRefDrug.concentration.unit.replace('/', ' per ')}
            </p>
          </CardContent>
        </Card>
      )}

      {quickRefDrug.notes && quickRefDrug.notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Clinical Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc list-inside space-y-2'>
              {quickRefDrug.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {quickRefDrug.warnings && quickRefDrug.warnings.length > 0 && (
        <Alert variant='destructive'>
          <TriangleAlert className='h-4 w-4' />
          <AlertTitle>Warnings</AlertTitle>
          <AlertDescription>
            <ul className='list-disc list-inside space-y-1'>
              {quickRefDrug.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
