// src/features/dose-guide/components/drug-reference-grid.tsx
'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { memo, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { DrugDosageCard } from './'
import type {
  QuickReferenceCalculation,
  QuickReferenceComplaintCategory,
  QuickReferenceMedication,
} from '../lib/types'

interface DrugReferenceGridProps {
  drugs: readonly QuickReferenceMedication[]
  categories: readonly QuickReferenceComplaintCategory[]
  calculationResults: Map<string, QuickReferenceCalculation>
  onDrugFavorite?: (drugId: string) => void
  isLoading?: boolean
  className?: string
  favorites: string[]
}

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
}

/**
 * Render a centered empty-state message with an optional icon, title, and description.
 *
 * @param title - Heading text displayed prominently in the empty state
 * @param description - Supporting descriptive text shown below the title
 * @param icon - Optional React node to display above the title; a default search icon is used when omitted
 * @returns A JSX element containing a centered icon, title, and description with responsive sizing for mobile
 */
function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-12 px-4 text-center gap-element'>
      <div className='text-muted-foreground'>
        {icon || <Search className='h-[clamp(2.5rem,5vw,3rem)] w-[clamp(2.5rem,5vw,3rem)]' />}
      </div>
      <h3 className='font-semibold text-foreground text-[clamp(1rem,2vw,1.125rem)]'>{title}</h3>
      <p className='text-muted-foreground max-w-md text-[clamp(0.75rem,1.5vw,0.875rem)]'>{description}</p>
    </div>
  )
}

/**
 * Render a responsive grid of skeleton cards used as a placeholder while content is loading.
 *
 * The grid adapts column count for mobile and larger viewports and generates `count` pulsing skeleton cards.
 *
 * @param count - Number of skeleton cards to render (defaults to 8)
 * @returns A JSX.Element containing the responsive grid of skeleton placeholders
 */
function LoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <div className='grid auto-rows-max grid-cols-2 gap-element md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {Array.from({ length: count }, (_, index) => {
        const skeletonId = `skeleton-${count}-${index}`
        return (
          <div key={skeletonId} className='animate-pulse'>
            <div
              className='gap-inline rounded-lg border bg-card padding-element'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1 gap-inline' style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='h-4 w-3/4 rounded bg-muted' />
                  <div className='h-3 w-1/2 rounded bg-muted' />
                </div>
                <div className='h-4 w-4 rounded bg-muted' />
              </div>
              <div className='gap-inline' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='h-5 w-1/3 rounded bg-muted' />
                <div className='h-3 w-2/3 rounded bg-muted' />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const gridItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

/**
 * Render a responsive, accessible grid of medication dosage cards.
 * Renders loading placeholders, empty states, or a sorted grid of DrugDosageCard items.
 *
 * This component is wrapped in React.memo to prevent unnecessary re-renders.
 *
 * @param calculationResults - Map from medication `id` to its dosage calculation result; used to populate each card (missing entries render a card with `null` result)
 * @returns A React element containing the medication results grid, loading placeholders, or an appropriate empty state
 */
export const DrugReferenceGrid = memo(function DrugReferenceGrid({
  drugs,
  categories,
  calculationResults,
  onDrugFavorite,
  isLoading = false,
  className,
  favorites,
}: Readonly<DrugReferenceGridProps>) {
  const sortedDrugs = useMemo(() => [...drugs].sort((a, b) => a.name.localeCompare(b.name)), [drugs])

  // Show loading skeleton grid
  if (isLoading) {
    return (
      <div className={cn('w-full', className)}>
        <LoadingGrid count={8} />
      </div>
    )
  }

  // Show empty state if no drugs
  if (drugs.length === 0) {
    return (
      <div className={cn('w-full', className)}>
        <EmptyState
          title='No medications found'
          description='Try adjusting your filters or check back later for more medications.'
        />
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)} id='medication-results'>
      {/* Drug Cards Grid */}
      <motion.section
        className='grid auto-rows-max grid-cols-2 gap-inline md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
        style={{
          // CSS Grid masonry-like behavior
          gridAutoRows: 'max-content',
        }}
        variants={gridContainerVariants}
        initial='hidden'
        animate='visible'
      >
        {sortedDrugs.map((drug) => {
          const calculationResult = calculationResults.get(drug.id) || null
          const isFavorite = favorites.includes(drug.id)

          return (
            <motion.div
              key={drug.id}
              variants={gridItemVariants}
              className='h-full'
              style={{ minHeight: 'fit-content' }}
            >
              <DrugDosageCard
                drug={drug}
                calculationResult={calculationResult}
                categories={categories}
                onDrugFavorite={onDrugFavorite ? () => onDrugFavorite(drug.id) : undefined}
                isFavorite={isFavorite}
                className='h-full w-full touch-manipulation transition-all duration-200 ease-in-out active:scale-[0.98]'
              />
            </motion.div>
          )
        })}
      </motion.section>

      {/* Results Summary */}
      {drugs.length > 0 && (
        <div className='spacing-component text-center'>
          <p className='text-muted-foreground text-[clamp(0.75rem,1.5vw,0.875rem)]'>
            Showing {drugs.length} medication{drugs.length === 1 ? '' : 's'}
            {calculationResults.size < drugs.length && (
              <span className='block spacing-inline'>Some medications may not have dosage calculations available</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
})
