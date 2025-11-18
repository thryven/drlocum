import { Droplets, ShieldHalf, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Clinical Resources | Doses',
  description: 'A collection of useful clinical reference guides and schedules for healthcare professionals.',
}

const resources = [
  {
    href: '/resources/national-immunisation-schedule',
    icon: ShieldHalf,
    title: 'National Immunisation Schedule',
    description: "Malaysia's National Immunisation Programme (NIP) schedule.",
  },
  {
    href: '/resources/haematological-parameters',
    icon: Droplets,
    title: 'Haematological Parameters',
    description: 'Reference values for haematological parameters in paediatrics.',
  },
  {
    href: '/resources/neonatal-jaundice',
    icon: Stethoscope,
    title: 'Neonatal Jaundice Assessment',
    description: "Kramer's rule and TSB level guidelines for phototherapy.",
  },
]

/**
 * Renders the Clinical Resources page with a header and a responsive grid of resource cards.
 *
 * @returns The page's React element containing a header and a grid of linked resource cards.
 */
export default function ResourcesPage() {
  return (
    <div className='w-full max-w-4xl mx-auto'>
      <header className='spacing-section'>
        <h1 className='section-header'>Clinical Resources</h1>
        <p className='text-hierarchy-secondary'>A collection of reference guides for clinical practice.</p>
      </header>

      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-element' aria-label='Available resources'>
        {resources.map((resource) => {
          const content = (
            <Card variant='default' interactive className='h-full'>
              <CardHeader>
                <div className='flex items-center gap-element'>
                  <resource.icon className='w-8 h-8 shrink-0 text-primary' />
                  <div className='flex-1'>
                    <CardTitle className='text-hierarchy-primary text-base'>{resource.title}</CardTitle>
                    <CardDescription className='text-hierarchy-tertiary spacing-inline'>
                      {resource.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )

          return (
            <Link href={resource.href} key={resource.href} className='focus-visible-ring rounded-lg'>
              {content}
            </Link>
          )
        })}
      </section>
    </div>
  )
}
