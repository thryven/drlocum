/**
 * Data loading utilities for the Quick Reference Database
 */

// Import data
import { complaintCategories } from '../medical-data/complaint-categories'
import { medications } from './medication-summary'
import type { QuickReferenceComplaintCategory, QuickReferenceMedication } from './types'

/**
 * Error class for data loading failures
 */
class DataLoadingError extends Error {
  constructor(
    message: string,
    public readonly source: string,
    public readonly originalError?: Error,
  ) {
    super(message)
    this.name = 'DataLoadingError'
  }
}

/**
 * Load medication-summary from data files with error handling
 */
export function loadMedications(): QuickReferenceMedication[] {
  try {
    // Basic validation
    if (!Array.isArray(medications)) {
      throw new Error('Medications data is not an array.')
    }
    return medications
  } catch (error) {
    throw new DataLoadingError(
      'Failed to load medications data',
      'medication-summary.ts',
      error instanceof Error ? error : new Error(String(error)),
    )
  }
}

/**
 * Load complaint categories from data files with error handling
 */
export function loadComplaintCategories(): QuickReferenceComplaintCategory[] {
  try {
    // Basic validation
    if (!Array.isArray(complaintCategories)) {
      throw new Error('Complaint categories data is not an array.')
    }
    return complaintCategories
  } catch (error) {
    throw new DataLoadingError(
      'Failed to load complaint categories data',
      'complaint-categories.ts',
      error instanceof Error ? error : new Error(String(error)),
    )
  }
}
