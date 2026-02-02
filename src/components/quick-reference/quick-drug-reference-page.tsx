// src/components/quick-reference/quick-drug-reference-page.tsx
'use client'

import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { Component, useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MobileViewport } from '@/components/ui/mobile-viewport'
import { QuickReferenceSkipLinks } from '@/components/ui/skip-links'
import { useDevice } from '@/hooks/use-device'
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard'
import { useScreenReader } from '@/hooks/use-screen-reader'
import { useSwipeGesture } from '@/hooks/use-swipe-gesture'
import { useToast } from '@/hooks/use-toast'
import type {
  QuickReferenceCalculation,
  QuickReferenceComplaintCategory,
  QuickReferenceMedication,
} from '@/lib/medication-reference'
import { useQuickReferenceDatabase } from '@/lib/medication-reference'
import { getWeightForAge } from '@/lib/medication-reference/calculations'
import { useCalculatorStore } from '@/lib/stores/calculator-store'
import { cn } from '@/lib/utils'
import { ComplaintFilterBar, DrugReferenceGrid, WeightInputSection } from './'
import { AgeInputSection } from './age-input-section'

interface QuickDrugReferencePageProps {
  defaultWeight?: number | undefined
  initialComplaintFilter?: string | undefined
  medications: QuickReferenceMedication[]
  categories: QuickReferenceComplaintCategory[]
}

// --- Error Boundary Component ---
interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class PageErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    globalThis.location.reload()
  }

  override render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />
    }
    return this.props.children
  }
}

/**
 * Render a fullscreen error fallback UI for the dose guide page.
 *
 * Shows a descriptive error card with actions to retry loading or navigate back.
 *
 * @param error - The occurred error; its message and stack are shown only in development.
 * @param onRetry - Callback invoked when the user requests a retry.
 * @returns A React element that displays the error message, "Try Again" and "Go Back" actions, and development-only error details when NODE_ENV is "development".
 */
function ErrorFallback({ error, onRetry }: Readonly<{ error: Error; onRetry: () => void }>) {
  const router = useRouter()
  const { isMobile } = useDevice()
  const { announceNavigation } = useScreenReader()

  const handleGoBack = () => {
    announceNavigation('Previous page')
    router.back()
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center'>
            <AlertTriangle className='w-6 h-6 text-destructive' />
          </div>
          <CardTitle className={cn(isMobile ? 'text-lg' : 'text-xl')}>Something went wrong</CardTitle>
          <CardDescription className={cn(isMobile ? 'text-sm' : 'text-xs')}>
            We encountered an error while loading the dose guide. This has been reported automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Button onClick={onRetry} className='w-full' size={isMobile ? 'touch' : 'default'}>
            <RefreshCw className='w-4 h-4 mr-2' />
            Try Again
          </Button>
          <Button variant='outline' onClick={handleGoBack} className='w-full' size={isMobile ? 'touch' : 'default'}>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Go Back
          </Button>
          {process.env.NODE_ENV === 'development' && (
            <details className='mt-4'>
              <summary className='text-xs text-muted-foreground cursor-pointer'>Error Details (Development)</summary>
              <pre className='mt-2 text-xs bg-muted p-2 rounded overflow-auto'>
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Render the pediatric dose guide UI and keep client-side dosing state in sync.
 *
 * Computes and stores dose calculations for the currently filtered pediatric medication-summary based on the displayed age and either a manually entered or age-derived weight, and provides handlers for navigation and user interactions (filter changes, selection, favorites, delete, history, share, refresh, and swipe navigation).
 *
 * @param defaultWeight - Optional initial weight to populate the weight input
 * @param initialComplaintFilter - Optional initial complaint/category filter to apply
 * @param medications - Quick-reference medication-summary used for filtering and dose calculations
 * @param categories - Complaint categories used to build the category filter bar
 * @returns The dose guide content as a React element
 */
function QuickDrugReferenceContent({
  defaultWeight,
  initialComplaintFilter,
  medications,
  categories,
}: Readonly<QuickDrugReferencePageProps>) {
  const { isMobile } = useDevice()
  const { keyboard, getViewportStyles } = useMobileKeyboard({ adjustViewport: isMobile })
  const { announceStatus } = useScreenReader()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const swipeContainerRef = useRef<HTMLDivElement>(null)

  // Zustand store state and actions
  const {
    displayAge,
    displayAgeUnit,
    displayWeight,
    isWeightManuallyEntered,
    selectedComplaintFilter,
    drugCalculationResults,
    favorites,
    toggleFavorite,
    setDisplayWeight,
    setSelectedComplaintFilter,
    setDrugCalculationResults,
  } = useCalculatorStore()

  // Quick Reference Database hook
  const {
    isLoading: isDatabaseLoading,
    error: databaseError,
    getFilteredMedications,
    getEnabledCategories,
    calculateDose,
  } = useQuickReferenceDatabase(medications, categories)

  const [isClient, setIsClient] = useState(false)

  const availableComplaints = useMemo(() => getEnabledCategories(), [getEnabledCategories])

  const calculateAllDoses = useCallback(() => {
    if (isDatabaseLoading) return

    let medsToCalculate: QuickReferenceMedication[]
    if (selectedComplaintFilter === 'favorites') {
      medsToCalculate = medications.filter((med) => favorites.includes(med.id))
    } else {
      medsToCalculate = getFilteredMedications(selectedComplaintFilter, 'paediatric')
    }

    const results = new Map<string, QuickReferenceCalculation>()
    const ageInMonths = displayAgeUnit === 'years' ? displayAge * 12 : displayAge

    let weightToUse: number | undefined
    if (isWeightManuallyEntered) {
      if (typeof displayWeight !== 'number' || Number.isNaN(displayWeight)) {
        setDrugCalculationResults(new Map())
        return
      }
      weightToUse = displayWeight
    } else {
      weightToUse = getWeightForAge(ageInMonths)
    }

    if (typeof weightToUse !== 'number' || Number.isNaN(weightToUse) || weightToUse <= 0) {
      setDrugCalculationResults(new Map())
      return
    }

    if (!isWeightManuallyEntered && weightToUse !== displayWeight) {
      setDisplayWeight(weightToUse)
    }

    for (const medication of medsToCalculate) {
      const result = calculateDose(medication.id, weightToUse, ageInMonths)
      if (result) {
        results.set(medication.id, {
          medicationId: medication.id,
          doseMg: result.doseMg,
          adminVolumeMl: result.adminVolume,
          frequencyText: result.frequency,
          formulationText: medication.concentration?.formulation ?? 'N/A',
          isCalculationValid: result.isValid,
          hasWarnings: result.warnings.length > 0,
          warningCount: result.warnings.length,
          doseRateText: result.doseRateText ?? null,
          concentrationText: medication.concentration
            ? `${medication.concentration.amount}${medication.concentration.unit}`
            : 'N/A',
        })
      }
    }
    setDrugCalculationResults(results)
  }, [
    isDatabaseLoading,
    getFilteredMedications,
    selectedComplaintFilter,
    displayAgeUnit,
    displayAge,
    isWeightManuallyEntered,
    displayWeight,
    setDrugCalculationResults,
    setDisplayWeight,
    calculateDose,
    medications,
    favorites,
  ])

  const handleFilterChange = useCallback(
    (complaintId: string) => {
      startTransition(() => {
        setSelectedComplaintFilter(complaintId)
      })
    },
    [setSelectedComplaintFilter],
  )

  const handleDrugFavorite = useCallback(
    (drugId: string) => {
      const drug = medications.find((d) => d.id === drugId)
      if (!drug) return
      const isCurrentlyFavorite = favorites.includes(drugId)
      toggleFavorite(drugId)
      announceStatus(`${drug.name} ${isCurrentlyFavorite ? 'removed from' : 'added to'} favorites`)
      toast({
        title: isCurrentlyFavorite ? 'Removed from Favorites' : 'Added to Favorites',
        description: `${drug.name} has been ${
          isCurrentlyFavorite ? 'removed from' : 'added to'
        } your favorites.`,
        duration: 3000,
      })
    },
    [medications, announceStatus, toggleFavorite, favorites, toast],
  )

  // Swipe gesture handling
  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      if (availableComplaints.length === 0) return

      const currentIndex = availableComplaints.findIndex(
        (c) => c.id === (selectedComplaintFilter ?? availableComplaints[0]?.id),
      )
      if (currentIndex === -1) return

      const nextIndex =
        direction === 'left'
          ? (currentIndex + 1) % availableComplaints.length
          : (currentIndex - 1 + availableComplaints.length) % availableComplaints.length

      const nextComplaint = availableComplaints[nextIndex]
      if (nextComplaint) {
        handleFilterChange(nextComplaint.id)
      }
    },
    [availableComplaints, selectedComplaintFilter, handleFilterChange],
  )

  useSwipeGesture(
    swipeContainerRef,
    {
      onSwipeLeft: () => handleSwipe('left'),
      onSwipeRight: () => handleSwipe('right'),
    },
    { enabled: isMobile },
  )

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true)
    if (defaultWeight) setDisplayWeight(defaultWeight)
    if (initialComplaintFilter) setSelectedComplaintFilter(initialComplaintFilter)
    announceStatus('Dose guide loaded for pediatric patients')
  }, [defaultWeight, initialComplaintFilter, setDisplayWeight, setSelectedComplaintFilter, announceStatus])

  // Calculate doses when dependencies change
  useEffect(() => {
    if (isClient && !isDatabaseLoading) {
      calculateAllDoses()
    }
  }, [isClient, isDatabaseLoading, calculateAllDoses])

  // Handle database errors
  useEffect(() => {
    if (databaseError) {
      throw new Error(databaseError)
    }
  }, [databaseError])

  const filteredDrugs = useMemo(() => {
    if (selectedComplaintFilter === 'favorites') {
      return medications.filter((med) => favorites.includes(med.id))
    }
    return getFilteredMedications(selectedComplaintFilter, 'paediatric')
  }, [medications, selectedComplaintFilter, favorites, getFilteredMedications])

  if (!isClient) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto' />
          <p className='text-sm text-muted-foreground'>Loading dose guide...</p>
        </div>
      </div>
    )
  }

  return (
    <MobileViewport
      ref={swipeContainerRef}
      className='min-h-screen bg-background'
      style={getViewportStyles()}
      adjustForKeyboard={isMobile}
    >
      <QuickReferenceSkipLinks />

        <main
          id='main-content'
          className={cn(
            'container mx-auto px-4 py-6 gap-component',
            isMobile && [
              'px-3 py-4 gap-element',
              keyboard.isVisible && 'pb-2',
              'safe-area-inset-x safe-area-inset-bottom',
            ],
          )}
          style={{ display: 'flex', flexDirection: 'column' }}
          aria-label='Dose guide content'
        >
          <Card
            className={cn(
              isMobile && ['shadow-xs border-0 bg-card/50', keyboard.isVisible && 'shadow-none bg-transparent'],
            )}
          >
            <CardContent className={cn('padding-component', isMobile && 'pt-2 px-2 pb-2')}>
              <div className={cn('grid', isMobile ? 'grid-cols-1 gap-inline' : 'grid-cols-2 gap-component')}>
                <AgeInputSection disabled={!isClient} />
                <WeightInputSection disabled={!isClient} />
              </div>
            </CardContent>
          </Card>
          {availableComplaints.length > 1 && (
            <section id='category-filters' aria-labelledby='filters-heading'>
              <Card
                className={cn(isMobile && ['shadow-xs border-0 bg-card/50', keyboard.isVisible && 'hidden sm:block'])}
              >
                <CardContent className={cn('padding-component', isMobile && 'padding-element')}>
                  <h2 id='filters-heading' className='sr-only'>
                    Category Filters
                  </h2>
                  <ComplaintFilterBar
                    availableComplaints={availableComplaints}
                    selectedComplaint={selectedComplaintFilter}
                    onComplaintChange={handleFilterChange}
                  />
                </CardContent>
              </Card>
            </section>
          )}
          <DrugReferenceGrid
            drugs={filteredDrugs}
            categories={categories}
            calculationResults={drugCalculationResults}
            onDrugFavorite={handleDrugFavorite}
            isLoading={isDatabaseLoading || isPending}
            className={cn('spacing-component', isMobile && ['spacing-element', keyboard.isVisible && 'pb-2'])}
            favorites={favorites}
          />
        </main>
    </MobileViewport>
  )
}

/**
 * Render the dose guide page wrapped in an error boundary.
 *
 * @param props - Props forwarded to QuickDrugReferenceContent (page configuration and data)
 * @returns A React element that renders the dose guide content inside a page-level error boundary
 */
export function QuickDrugReferencePage(props: Readonly<QuickDrugReferencePageProps>) {
  return (
    <PageErrorBoundary>
      <QuickDrugReferenceContent {...props} />
    </PageErrorBoundary>
  )
}
