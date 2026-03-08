// src/features/dose-guide/components/quick-drug-reference-page.tsx
'use client'

import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { Component } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MobileViewport } from '@/components/ui/mobile-viewport'
import { useDevice } from '@/hooks/use-device'
import { cn } from '@/lib/utils'
import { ComplaintFilterBar, DrugReferenceGrid } from './'
import { AgeInputSection } from './age-input-section'
import { WeightInputSection } from './weight-input-section'
import { useDoseGuidePage } from '../hooks/use-dose-guide-page'
import type { QuickReferenceComplaintCategory, QuickReferenceMedication } from '../lib/types'

interface QuickDrugReferencePageProps {
  defaultWeight?: number
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

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // In a real application, you would send this to an error tracking service like Sentry
    console.error('Dose Guide Page Error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  override render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />
    }
    return this.props.children
  }
}

function ErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  const router = useRouter()
  const { isMobile } = useDevice()

  const handleGoBack = () => {
    router.back()
  }

  const handleRetryClick = () => {
    onRetry() // Resets the error boundary's internal state
    router.refresh() // This tells Next.js to re-fetch Server Components and re-render
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
          <Button onClick={handleRetryClick} className='w-full' size={isMobile ? 'touch' : 'default'}>
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

function QuickDrugReferenceContent(props: QuickDrugReferencePageProps) {
  const {
    isMobile,
    keyboard,
    getViewportStyles,
    isPending,
    swipeContainerRef,
    isDatabaseLoading,
    availableComplaints,
    selectedComplaintFilter,
    filteredDrugs,
    drugCalculationResults,
    favorites,
    handleFilterChange,
    handleDrugFavorite,
  } = useDoseGuidePage(props)

  const isLoading = isDatabaseLoading || isPending
  const isKeyboardMode = isMobile && keyboard.isVisible
  const hasFilters = availableComplaints.length > 1

  return (
    <MobileViewport
      ref={swipeContainerRef}
      className='min-h-screen bg-background'
      style={getViewportStyles()}
      adjustForKeyboard={isMobile}
    >
      <main
        id='main-content'
        className={cn(
          'container mx-auto flex flex-col p-fluid-page gap-fluid-page',
          isMobile && [keyboard.isVisible && 'pb-2', 'safe-area-inset-x safe-area-inset-bottom'],
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
              <AgeInputSection disabled={isLoading} />
              <WeightInputSection disabled={isLoading} />
            </div>
          </CardContent>
        </Card>
        {hasFilters && (
          <section id='category-filters'>
            <Card
              className={cn(
                'shadow-xs border-0 bg-card/50 md:shadow-sm md:border md:bg-card',
                isKeyboardMode && 'hidden sm:block',
              )}
            >
              <CardContent className='p-fluid-page-card-content'>
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
          isLoading={isLoading}
          className={cn('mb-fluid-page-grid', isKeyboardMode && 'pb-2')}
          favorites={favorites}
        />
      </main>
    </MobileViewport>
  )
}

export function QuickDrugReferencePage(props: QuickDrugReferencePageProps) {
  return (
    <PageErrorBoundary>
      <QuickDrugReferenceContent {...props} />
    </PageErrorBoundary>
  )
}
