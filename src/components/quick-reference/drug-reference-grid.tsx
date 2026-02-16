// src/components/quick-reference/drug-reference-grid.tsx
'use client'

import { motion } from 'framer-motion'
import { Loader2, Search } from 'lucide-react'
import { useMemo } from 'react'
import { useDevice } from '@/hooks/use-device'
import type {
  QuickReferenceCalculation,
  QuickReferenceComplaintCategory,
  QuickReferenceMedication,
} from '@/lib/medication-reference'
import { cn } from '@/lib/utils'
import { AriaLabels } from '@/lib/utils/accessibility/labels'
import { DrugDosageCard } from './'

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
  const { isMobile } = useDevice()

  return (
    <div className='flex flex-col items-center justify-center py-12 px-4 text-center gap-element'>
      <div className='text-muted-foreground'>{icon || <Search size={isMobile ? 48 : 40} />}</div>
      <h3 className={cn('font-semibold text-foreground', isMobile ? 'text-lg' : 'text-base')}>{title}</h3>
      <p className={cn('text-muted-foreground max-w-md', isMobile ? 'text-sm' : 'text-xs')}>{description}</p>
    </div>
  )
}

/**
 * Renders a centered loading indicator and status message for dosage calculations.
 *
 * The visual layout adapts for mobile vs. desktop sizes.
 *
 * @returns A JSX element containing a spinner and the text "Calculating dosages..."
 */
function LoadingState() {
  const { isMobile } = useDevice()

  return (
    <div className='flex flex-col items-center justify-center py-12 px-4 text-center gap-element'>
      <div>
        <Loader2 size={isMobile ? 32 : 28} className='animate-spin text-muted-foreground' />
      </div>
      <p className={cn('text-muted-foreground', isMobile ? 'text-sm' : 'text-xs')}>Calculating dosages...</p>
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
  const { isMobile } = useDevice()

  return (
    <div
      className={cn(
        'grid gap-element auto-rows-max',
        // Responsive grid columns
        isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
      )}
    >
      {Array.from({ length: count }, (_, index) => {
        const skeletonId = `skeleton-${count}-${index}`
        return (
          <div key={skeletonId} className='animate-pulse'>
            <div
              className='rounded-lg border bg-card padding-element gap-inline'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div className='flex items-start justify-between'>
                <div className='gap-inline flex-1' style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className='h-4 bg-muted rounded w-3/4' />
                  <div className='h-3 bg-muted rounded w-1/2' />
                </div>
                <div className='h-4 w-4 bg-muted rounded' />
              </div>
              <div className='gap-inline' style={{ display: 'flex', flexDirection: 'column' }}>
                <div className='h-5 bg-muted rounded w-1/3' />
                <div className='h-3 bg-muted rounded w-2/3' />
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
 *
 * Renders loading placeholders, empty states, or a sorted grid of DrugDosageCard items.
 *
 * @param calculationResults - Map from medication `id` to its dosage calculation result; used to populate each card (missing entries render a card with `null` result)
 * @returns A React element containing the medication results grid, loading placeholders, or an appropriate empty state
 */
export function DrugReferenceGrid({
  drugs,
  categories,
  calculationResults,
  onDrugFavorite,
  isLoading = false,
  className,
  favorites,
}: Readonly<DrugReferenceGridProps>) {
  const { isMobile } = useDevice()

  const sortedDrugs = useMemo(() => [...drugs].sort((a, b) => a.name.localeCompare(b.name)), [drugs])

  // Show loading state
  if (isLoading) {
    return (
      <div className={cn('w-full', className)}>
        <LoadingState />
      </div>
    )
  }

  // Show loading grid if we have drugs but no calculation results yet
  if (drugs.length > 0 && calculationResults.size === 0) {
    return (
      <div className={cn('w-full', className)}>
        <LoadingGrid count={Math.min(drugs.length, 8)} />
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

  // Show empty state if drugs exist but no calculations available
  if (calculationResults.size === 0) {
    return (
      <div className={cn('w-full', className)}>
        <EmptyState
          title='No dosages available'
          description='Unable to calculate dosages for the selected medications. Please check the weight input and try again.'
        />
      </div>
    )
  }

  const gridAriaLabel = AriaLabels.searchResults(sortedDrugs.length)

  return (
    <div className={cn('w-full', className)} id='medication-results'>
      {/* Drug Cards Grid */}
      <motion.section
        className={cn(
          // Base grid styles with mobile optimizations
          'grid gap-inline auto-rows-max',
          // Responsive grid columns optimized for different screen sizes
          'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        )}
        style={{
          // CSS Grid masonry-like behavior
          gridAutoRows: 'max-content',
        }}
        variants={gridContainerVariants}
        initial='hidden'
        animate='visible'
        aria-label={gridAriaLabel}
        aria-live='polite'
        aria-busy={isLoading}
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
                onFavorite={onDrugFavorite ? () => onDrugFavorite(drug.id) : undefined}
                isFavorite={isFavorite}
                className={cn(
                  // Enhanced mobile touch feedback
                  'transition-all duration-200 ease-in-out',
                  // Ensure cards fill the grid cell properly
                  'h-full w-full',
                  // Mobile-specific optimizations
                  isMobile && [
                    'active:scale-[0.98]',
                    'touch-manipulation', // Optimize touch events
                  ],
                )}
              />
            </motion.div>
          )
        })}
      </motion.section>

      {/* Results Summary */}
      {drugs.length > 0 && (
        <div className='spacing-component text-center'>
          <p className={cn('text-muted-foreground', isMobile ? 'text-sm' : 'text-xs')}>
            Showing {drugs.length} medication{drugs.length === 1 ? '' : 's'}
            {calculationResults.size < drugs.length && (
              <span className='block spacing-inline'>Some medications may not have dosage calculations available</span>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
