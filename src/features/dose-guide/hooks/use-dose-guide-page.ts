// src/features/dose-guide/hooks/use-dose-guide-page.ts
'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useDevice } from '@/hooks/use-device'
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard'
import { useScreenReader } from '@/hooks/use-screen-reader'
import { useSwipeGesture } from '@/hooks/use-swipe-gesture'
import { useToast } from '@/hooks/use-toast'
import { getWeightForAge } from '../lib/calculations/utils'
import { useCalculatorStore } from '../stores/calculator-store'
import type {
  QuickReferenceCalculation,
  QuickReferenceComplaintCategory,
  QuickReferenceMedication,
} from '../lib/types'
import { useQuickReferenceDatabase } from './use-quick-reference-database'

interface DoseGuidePageProps {
  defaultWeight?: number | undefined
  initialComplaintFilter?: string | undefined
  medications: QuickReferenceMedication[]
  categories: QuickReferenceComplaintCategory[]
}

export function useDoseGuidePage({
  defaultWeight,
  initialComplaintFilter,
  medications,
  categories,
}: DoseGuidePageProps) {
  const { isMobile } = useDevice()
  const { keyboard, getViewportStyles } = useMobileKeyboard({ adjustViewport: isMobile })
  const { announceStatus } = useScreenReader()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const swipeContainerRef = useRef<HTMLDivElement>(null)

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
    selectedComplaintFilter,
    medications,
    favorites,
    getFilteredMedications,
    displayAgeUnit,
    displayAge,
    isWeightManuallyEntered,
    displayWeight,
    setDrugCalculationResults,
    calculateDose,
    setDisplayWeight,
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
        description: `${drug.name} has been ${isCurrentlyFavorite ? 'removed from' : 'added to'} your favorites.`,
        duration: 3000,
      })
    },
    [medications, favorites, toggleFavorite, announceStatus, toast],
  )

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

  useEffect(() => {
    setIsClient(true)
    if (defaultWeight) setDisplayWeight(defaultWeight)
    if (initialComplaintFilter) setSelectedComplaintFilter(initialComplaintFilter)
    announceStatus('Dose guide loaded for pediatric patients')
  }, [defaultWeight, initialComplaintFilter, setDisplayWeight, setSelectedComplaintFilter, announceStatus])

  useEffect(() => {
    if (isClient && !isDatabaseLoading) {
      calculateAllDoses()
    }
  }, [isClient, isDatabaseLoading, calculateAllDoses])

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

  return {
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
  }
}
