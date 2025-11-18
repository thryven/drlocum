import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { differentialCountsData, haematologicalData, pointsToNote } from '@/lib/medical-data/haematological-parameters'

export const metadata = {
  title: 'Haematological Parameters | Doses',
  description:
    'Reference values for haematological parameters in paediatrics from the Malaysian Hospital Paediatric Protocols, 4th Edition.',
}

/**
 * Renders the Haematological Parameters page with pediatric reference ranges, differential counts, and notes.
 *
 * @returns A React element containing tables and a notes list presenting pediatric haematological reference values.
 */
export default function HaematologicalParametersPage() {
  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Haematological Parameters</h1>
        <p className='text-muted-foreground mt-2'>
          Reference values from Paediatric Protocols for Malaysian Hospitals, 4th Edition.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parameter Ranges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Age</TableHead>
                  <TableHead>Hb (g/dL)</TableHead>
                  <TableHead>PCV (%)</TableHead>
                  <TableHead>Retics (%)</TableHead>
                  <TableHead>MCV (fl) Lowest</TableHead>
                  <TableHead>MCH (pg) Lowest</TableHead>
                  <TableHead>TWBC (x1000)</TableHead>
                  <TableHead>Neutrophil (Mean)</TableHead>
                  <TableHead>Lymphocyte (Mean)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {haematologicalData.map((row) => (
                  <TableRow key={row.age}>
                    <TableCell className='font-medium'>{row.age}</TableCell>
                    <TableCell>{row.hb}</TableCell>
                    <TableCell>{row.pcv}</TableCell>
                    <TableCell>{row.retics}</TableCell>
                    <TableCell>{row.mcv}</TableCell>
                    <TableCell>{row.mch}</TableCell>
                    <TableCell>{row.twbc}</TableCell>
                    <TableCell>{row.neutrophil}</TableCell>
                    <TableCell>{row.lymphocyte}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
        <Card>
          <CardHeader>
            <CardTitle>Differential Counts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Age</TableHead>
                  <TableHead>Relation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {differentialCountsData.map((row) => (
                  <TableRow key={row.age}>
                    <TableCell className='font-medium'>{row.age}</TableCell>
                    <TableCell>{row.relation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Points to Note</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='list-disc list-inside space-y-2 text-sm text-muted-foreground'>
              {pointsToNote.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
