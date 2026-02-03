// src/app/resources/national-immunisation-schedule/page.tsx
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'National Immunisation Schedule | Doses',
  description: "Malaysia's National Immunisation Programme (NIP) schedule, updated as of August 2023.",
}

/**
 * Render the National Immunisation Schedule page with images of the official schedules.
 *
 * @returns The page markup containing the immunisation schedule images.
 */
export default function NationalImmunisationSchedulePage() {
  return (
    <div className='w-full max-w-4xl mx-auto pb-24 space-y-8'>
      <header className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>National Immunisation Schedule</h1>
        <p className='text-muted-foreground mt-2'>Ministry of Health Malaysia</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>National Immunisation Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-hidden rounded-lg border shadow-md'>
            <Image
              src='/photos/jadual_imunisasi.jpg'
              alt='National Immunisation Schedule for Malaysia'
              width={1200}
              height={1600}
              className='w-full h-auto'
              priority
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Catch-up Immunisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-hidden rounded-lg border shadow-md'>
            <Image
              src='/photos/jadual-imunisasi-jenis-tahun.png'
              alt='Catch-up immunisation schedule'
              width={1200}
              height={800}
              className='w-full h-auto'
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Recommended Vaccination</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-hidden rounded-lg border shadow-md'>
            <Image
              src='/photos/jadual-imunisasi-hospital-swasta.png'
              alt='Other recommended vaccinations available in private hospitals'
              width={1200}
              height={800}
              className='w-full h-auto'
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
