// src/app/calculators/page.tsx
import { Baby, HeartPulse, Stethoscope, Weight } from 'lucide-react'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Medical Calculators | Doses',
  description: 'A collection of useful medical calculators for healthcare professionals.',
}

const calculators = [
  {
    href: '/calculator/pregnancy',
    icon: Baby,
    title: 'Pregnancy Due Date',
    description: 'Estimate due date based on Last Menstrual Period (LMP) and ultrasound.',
  },
  {
    href: '/calculator/neonate-weight-loss',
    icon: Weight,
    title: 'Neonate Weight Loss',
    description: 'Calculate weight loss percentage for newborns.',
  },
  {
    href: '/calculator/stop-bang',
    icon: Stethoscope,
    title: 'STOP-BANG Score',
    description: 'Assess risk for Obstructive Sleep Apnea (OSA).',
    disabled: false,
  },
  {
    href: '/calculator/ideal-body-weight',
    icon: Weight,
    title: 'Ideal Body Weight',
    description: 'Calculate ideal body weight.',
    disabled: false,
  },
  {
    href: '/calculator/centor-score',
    icon: Stethoscope,
    title: 'Centor Score',
    description: 'Determine the likelihood of streptococcal pharyngitis.',
    disabled: false,
  },
  {
    href: '/calculator/framingham-risk-score',
    icon: HeartPulse,
    title: 'Framingham Risk Score',
    description: 'Calculate 10-year risk of coronary heart disease.',
    disabled: false,
  },
  {
    href: '/calculator/dass-score',
    icon: Stethoscope,
    title: 'DASS-21',
    description: 'Measure the severity of symptoms of Depression, Anxiety, and Stress.',
    disabled: false,
  },
  {
    href: '/calculator/phq-9-score',
    icon: Stethoscope,
    title: 'PHQ-9',
    description: 'A tool for monitoring the severity of depression.',
    disabled: false,
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
        <h1 className='hidden section-header'>Medical Calculators</h1>
        <p className='hidden text-hierarchy-secondary'>A collection of essential tools for clinical practice.</p>
      </header>

      <section
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-element'
        aria-label='Available calculators'
      >
        {calculators.map((calc) => {
          const content = (
            <Card
              variant={calc.disabled ? 'flat' : 'default'}
              interactive={!calc.disabled}
              className={`h-full ${calc.disabled ? 'opacity-60' : ''}`}
            >
              <CardHeader>
                <div className='flex items-center gap-element'>
                  <calc.icon
                    className={`w-8 h-8 shrink-0 ${calc.disabled ? 'text-muted-foreground/50' : 'text-primary'}`}
                  />
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
      </section>
    </div>
  )
}
