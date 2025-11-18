// src/app/resources/national-immunisation-schedule/page.tsx

import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { additionalVaccines, ageMonths, ageYears, vaccines } from '@/lib/medical-data/immunisation-schedule'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'National Immunisation Schedule | Doses',
  description: "Malaysia's National Immunisation Programme (NIP) schedule, updated as of August 2023.",
}

/**
 * Render the National Immunisation Schedule page with a responsive table of vaccines by age and a grid of descriptive cards.
 *
 * @returns The page markup containing a responsive immunisation schedule table (month/year columns with scheduled dose indicators) and a grid of vaccine description cards.
 */
export default function NationalImmunisationSchedulePage() {
  return (
    <div className='w-full max-w-6xl mx-auto pb-24'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>National Immunisation Schedule</h1>
      </div>

      <Card>
        <CardContent className='p-2 md:p-4'>
          <div className='overflow-x-auto'>
            <Table className='w-full table-fixed border-collapse'>
              <TableHeader>
                <TableRow className='bg-primary/10'>
                  <TableHead className='sticky left-0 z-10 bg-primary/10 w-[200px] border-r' rowSpan={2}>
                    Vaccine
                  </TableHead>
                  <TableHead className='text-center border-r' colSpan={ageMonths.length}>
                    Age (Month)
                  </TableHead>
                  <TableHead className='text-center' colSpan={ageYears.length}>
                    Age (Year)
                  </TableHead>
                </TableRow>
                <TableRow className='bg-primary/10'>
                  {ageMonths.map((age) => (
                    <TableHead
                      key={`month-${age}`}
                      className='text-center p-2 border-r w-12 whitespace-normal wrap-break-word'
                    >
                      {age}
                    </TableHead>
                  ))}
                  {ageYears.map((age) => (
                    <TableHead
                      key={`year-${age}`}
                      className='text-center p-2 border-r w-12 whitespace-normal wrap-break-word'
                    >
                      {age}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccines.map((vaccine) => (
                  <TableRow key={vaccine.name}>
                    <TableCell className='sticky left-0 z-10 bg-background font-medium border-r'>
                      {vaccine.name}
                    </TableCell>
                    {ageMonths.map((age) => {
                      const dose = vaccine.doses.find((d) => d.age === `${age}m`)
                      return (
                        <TableCell
                          key={`${vaccine.name}-month-${age}`}
                          className={cn(
                            'text-center p-2 border-r text-xs whitespace-normal wrap-break-word',
                            dose && 'bg-green-100/50 dark:bg-green-900/50',
                          )}
                        >
                          {dose ? (
                            <>
                              <span className='font-semibold'>{dose.label}</span>
                              <span className='sr-only'>(Dose scheduled)</span>
                            </>
                          ) : null}
                        </TableCell>
                      )
                    })}
                    {ageYears.map((age) => {
                      const dose = vaccine.doses.find((d) => d.age === `${age}y`)
                      return (
                        <TableCell
                          key={`${vaccine.name}-year-${age}`}
                          className={cn(
                            'text-center p-2 border-r text-xs whitespace-normal wrap-break-word',
                            dose && 'bg-green-100/50 dark:bg-green-900/50',
                          )}
                        >
                          {dose ? (
                            <>
                              <span className='font-semibold'>{dose.label}</span>
                              <span className='sr-only'>(Dose scheduled)</span>
                            </>
                          ) : null}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className='mt-6' />

      <Card>
        <CardContent className='p-2 md:p-4'>
          <h2 className='text-lg font-semibold mb-2'>Additional Vaccination</h2>
          <div className='overflow-x-auto'>
            <Table className='w-full table-fixed border-collapse'>
              <TableHeader>
                <TableRow className='bg-primary/10'>
                  <TableHead className='w-56'>Vaccine</TableHead>
                  <TableHead>Schedule / Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalVaccines.map((v) => (
                  <TableRow key={v.name}>
                    <TableCell className='font-medium'>{v.name}</TableCell>
                    <TableCell className='whitespace-normal'>{v.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
