// src/features/dose-guide/components/quick-drug-reference-page.tsx
'use client'

import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { Component } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MobileViewport } from '@/components/ui/mobile-viewport'
import { QuickReferenceSkipLinks } from '@/components/ui/skip-links'
import { useDevice } from '@/hooks/use-device'
import { useScreenReader } from '@/hooks/use-screen-reader'
import { cn } from '@/lib/utils'
import { ComplaintFilterBar, DrugReferenceGrid } from './'
import { AgeInputSection } from './age-input-section'
import { WeightInputSection } from './weight-input-section'
import { useDoseGuidePage } from '../hooks/use-dose-guide-page'
import type {
  QuickReferenceComplaintCategory,
  QuickReferenceMedication,
} from '../lib/types'

interface QuickDrugReferencePageProps {
  defaultWeight?: number
  initialComplaintFilter?: string
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

function QuickDrugReferenceContent(props: Readonly<QuickDrugReferencePageProps>) {
  const {
    isMobile,
    keyboard,
    getViewportStyles,
    isPending,
    swipeContainerRef,
    isDatabaseLoading,
    isClient,
    availableComplaints,
    selectedComplaintFilter,
    filteredDrugs,
    drugCalculationResults,
    favorites,
    handleFilterChange,
    handleDrugFavorite,
  } = useDoseGuidePage(props)

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

  const isKeyboardMode = isMobile && keyboard.isVisible

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
          'container mx-auto flex flex-col p-fluid-page gap-fluid-page',
          isMobile && [
            keyboard.isVisible && 'pb-2',
            'safe-area-inset-x safe-area-inset-bottom',
          ],
        )}
      >
        <Card
          className={cn(
            'shadow-xs border-0 bg-card/50 md:shadow-sm md:border md:bg-card',
            isKeyboardMode && 'shadow-none bg-transparent',
          )}
        >
          <CardContent className='p-fluid-page-card'>
            <div className='grid grid-cols-1 gap-inline md:grid-cols-2 md:gap-component'>
              <AgeInputSection disabled={!isClient} />
              <WeightInputSection disabled={!isClient} />
            </div>
          </CardContent>
        </Card>
        {availableComplaints.length > 1 && (
          <section id='category-filters' aria-labelledby='filters-heading'>
            <Card
              className={cn(
                'shadow-xs border-0 bg-card/50 md:shadow-sm md:border md:bg-card',
                isKeyboardMode && 'hidden sm:block',
              )}
            >
              <CardContent className='p-fluid-page-card-content'>
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
          categories={props.categories}
          calculationResults={drugCalculationResults}
          onDrugFavorite={handleDrugFavorite}
          isLoading={isDatabaseLoading || isPending}
          className={cn('mb-fluid-page-grid', isKeyboardMode && 'pb-2')}
          favorites={favorites}
        />
      </main>
    </MobileViewport>
  )
}

export function QuickDrugReferencePage(props: Readonly<QuickDrugReferencePageProps>) {
  return (
    <PageErrorBoundary>
      <QuickDrugReferenceContent {...props} />
    </PageErrorBoundary>
  )
}
