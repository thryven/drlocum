// src/app/calculators/page.tsx
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Clinical Tools & Resources | Doses',
  description: 'A collection of useful medical calculators and clinical resources for healthcare professionals.',
}

const calculators = [
  {
    href: '/resource/pregnancy',
    title: 'Pregnancy Due Date',
    description: 'Estimate due date based on Last Menstrual Period (LMP) and ultrasound.',
  },
  {
    href: '/resource/neonate-weight-loss',
    title: 'Neonate Weight Loss',
    description: 'Calculate weight loss percentage for newborns.',
  },
  {
    href: '/resource/stop-bang',
    title: 'STOP-BANG Score',
    description: 'Assess risk for Obstructive Sleep Apnea (OSA).',
    disabled: false,
  },
  {
    href: '/resource/ideal-body-weight',
    title: 'Ideal Body Weight',
    description: 'Calculate ideal body weight.',
    disabled: false,
  },
  {
    href: '/resource/centor-score',
    title: 'Centor Score',
    description: 'Determine the likelihood of streptococcal pharyngitis.',
    disabled: false,
  },
  {
    href: '/resource/framingham-risk-score',
    title: 'Framingham Risk Score',
    description: 'Calculate 10-year risk of coronary heart disease.',
    disabled: false,
  },
  {
    href: '/resource/dass-score',
    title: 'DASS-21',
    description: 'Measure the severity of symptoms of Depression, Anxiety, and Stress.',
    disabled: false,
  },
  {
    href: '/resource/phq-9-score',
    title: 'PHQ-9',
    description: 'A tool for monitoring the severity of depression.',
    disabled: false,
  },
]

const resources = [
  {
    href: '/resource/national-immunisation-schedule',
    title: 'National Immunisation Schedule',
    description: "Malaysia's National Immunisation Programme (NIP) schedule.",
  },
  {
    href: '/resource/haematological-parameters',
    title: 'Haematological Parameters',
    description: 'Reference values for haematological parameters in paediatrics.',
  },
  {
    href: '/resource/neonatal-jaundice',
    title: 'Neonatal Jaundice Assessment',
    description: "Kramer's rule and TSB level guidelines for phototherapy.",
  },
]

/**
 * Renders the Medical Calculators page showing a responsive grid of calculator cards.
 *
 * Each calculator card displays an icon, title, and description. Disabled calculators
 * are rendered non-interactive with reduced opacity and a not-allowed cursor; enabled
 * calculators are wrapped in a Next.js Link to their respective `href`.
 *
 * @returns The React element for the Medical Calculators page.
 */
export default function CalculatorsPage() {
  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      <header className='spacing-section'>
        <h1 className='hidden section-header'>Clinical Tools & Resources</h1>
        <p className='hidden text-hierarchy-secondary'>A collection of essential tools for clinical practice.</p>
      </header>

      <section className='mb-12'>
        <h2 className='text-2xl font-bold tracking-tight mb-6'>Medical Calculators</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-element' aria-label='Available calculators'>
          {calculators.map((calc) => {
            const content = (
              <Card
                variant={calc.disabled ? 'flat' : 'default'}
                interactive={!calc.disabled}
                className={`h-full ${calc.disabled ? 'opacity-60' : ''}`}
              >
                <CardHeader>
                  <div className='flex items-center gap-element'>
                    <div className='flex-1'>
                      <CardTitle className='text-hierarchy-primary text-base'>{calc.title}</CardTitle>
                      <CardDescription className='text-hierarchy-tertiary spacing-inline'>
                        {calc.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )

            if (calc.disabled) {
              return (
                <div key={calc.href} className='cursor-not-allowed'>
                  {content}
                </div>
              )
            }

            return (
              <Link href={calc.href} key={calc.href} className='focus-visible-ring rounded-lg'>
                {content}
              </Link>
            )
          })}
        </div>
      </section>

      <section aria-label='Available resources'>
        <h2 className='text-2xl font-bold tracking-tight mb-6'>Clinical Resources</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-element'>
          {resources.map((resource) => {
            const content = (
              <Card variant='default' interactive className='h-full'>
                <CardHeader>
                  <div className='flex items-center gap-element'>
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
        </div>
      </section>
    </div>
  )
}
