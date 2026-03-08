// src/features/dose-guide/hooks/use-complaint-filter.ts
'use client'

import { useMemo, useTransition } from 'react'
import { useDevice } from '@/hooks/use-device'
import { useScreenReader } from '@/hooks/use-screen-reader'
import { useCalculatorStore } from '../stores/calculator-store'
import type { QuickReferenceComplaintCategory as ComplaintCategory } from '../lib/types'

interface UseComplaintFilterProps {
  availableComplaints: ComplaintCategory[]
  onComplaintChange: (complaint: string) => void
}

/**
 * Hook to manage the logic for the complaint filter bar.
 *
 * This hook encapsulates state management for transitions, accessibility announcements,
 * and responsive rendering logic for the complaint filter bar.
 *
 * @param {UseComplaintFilterProps} props - The props for the hook.
 * @returns An object containing:
 * - `isMobile`: Boolean indicating if the device is mobile.
 * - `isCompactView`: Boolean indicating if compact view is enabled.
 * - `isPending`: Boolean indicating if a state transition is pending.
 * - `allFilters`: The complete list of filter categories, including 'Favorites'.
 * - `handleComplaintClick`: Callback to handle a click on a filter category.
 */
export function useComplaintFilter({ availableComplaints, onComplaintChange }: UseComplaintFilterProps) {
  const { isMobile } = useDevice()
  const { announceStatus } = useScreenReader()
  const [isPending, startTransition] = useTransition()
  const { isCompactView } = useCalculatorStore()

  const favoriteCategory: ComplaintCategory = useMemo(
    () => ({
      id: 'favorites',
      name: 'favorites',
      displayName: 'Favorites',
      color: 'yellow',
      icon: 'Star',
      enabled: true,
      sortOrder: -1, // Puts it at the start
    }),
    [],
  )

  const allFilters = useMemo(() => [favoriteCategory, ...availableComplaints], [favoriteCategory, availableComplaints])

  const handleComplaintClick = (complaintId: string | null) => {
    const newFilterId = complaintId === null ? 'favorites' : complaintId
    const complaint = allFilters.find((c) => c.id === newFilterId)
    startTransition(() => {
      onComplaintChange(newFilterId)
    })
    if (complaint) {
      announceStatus(`Filtering by ${complaint.displayName}`)
    }
  }

  return {
    isMobile,
    isCompactView,
    isPending,
    allFilters,
    handleComplaintClick,
  }
}
