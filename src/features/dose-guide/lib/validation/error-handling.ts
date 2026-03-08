/**
 * @fileoverview Error handling and recovery functions for the Quick Reference Database validation process.
 * This file provides a centralized error handler that can log validation issues, generate user-friendly
 * messages, and attempt recovery using predefined strategies like falling back to default data.
 */

import type {
  DosingProfile,
  ErrorContext,
  ErrorRecoveryOptions,
  QuickReferenceComplaintCategory,
  QuickReferenceMedication,
  ValidationResult,
} from '../types'

/**
 * Manages validation errors with logging and recovery capabilities.
 * Implemented as a singleton to maintain a consistent error log across the application.
 */
export class ValidationErrorHandler {
  private static instance: ValidationErrorHandler | undefined = undefined
  private errorLog: Array<{ context: ErrorContext; error: Error; message: string }> = []

  /**
   * Retrieves the singleton instance of the error handler.
   */
  public static getInstance(): ValidationErrorHandler {
    ValidationErrorHandler.instance ??= new ValidationErrorHandler()
    return ValidationErrorHandler.instance
  }

  /**
   * Handles a validation error, logs it, and attempts recovery based on the provided options.
   * @param error - The validation error or result object.
   * @param context - The context in which the error occurred.
   * @param options - Recovery and logging options.
   * @returns An object indicating success, a user-friendly message, and any recovered data.
   */
  public handleValidationError(
    error: Error | ValidationResult,
    context: ErrorContext,
    options?: ErrorRecoveryOptions,
  ): { success: boolean; message: string; recoveredData?: unknown } {
    const {
      fallbackToDefaults = true,
      skipInvalidItems = true,
      logErrors = true,
      showUserFriendlyMessages = true,
    } = options ?? {}

    let errorMessage = ''
    let userMessage = ''

    if (error instanceof Error) {
      errorMessage = error.message
      userMessage = this.createUserFriendlyMessage(error, context)
    } else {
      errorMessage = error.errors.join('; ')
      userMessage = this.createUserFriendlyValidationMessage(error, context)
    }

    if (logErrors) {
      this.logError(context, error instanceof Error ? error : new Error(errorMessage), errorMessage)
    }

    const recoveryResult = this.attemptRecovery(error, context, {
      fallbackToDefaults,
      skipInvalidItems,
      logErrors,
      showUserFriendlyMessages,
    })

    return {
      success: recoveryResult.success,
      message: showUserFriendlyMessages ? userMessage : errorMessage,
      recoveredData: recoveryResult.data,
    }
  }

  /**
   * Generates a user-friendly error message from a generic Error object.
   */
  private createUserFriendlyMessage(error: Error, context: ErrorContext): string {
    const operation = context.operation.toLowerCase().replaceAll('_', ' ')

    if (error.message.includes('JSON')) {
      return 'There was a problem reading the medication data file. Please check the file format.'
    }
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Unable to load medication data. Please check your connection.'
    }
    if (error.message.includes('permission') || error.message.includes('access')) {
      return `Access denied while ${operation}. Please check permissions.`
    }

    switch (context.operation) {
      case 'LOAD_MEDICATIONS':
        return 'Failed to load medications. Some may not be available.'
      case 'LOAD_CATEGORIES':
        return 'Failed to load categories. Default categories will be used.'
      case 'CALCULATE_DOSE':
        return `Unable to calculate dose for ${context.medicationId || 'this medication'}. Please verify the data.`
      case 'VALIDATE_MEDICATION':
        return `Validation failed for ${context.medicationId || 'a medication'}. Please review the medication data.`
      default:
        return `An error occurred during ${operation}. Please try again.`
    }
  }

  /**
   * Generates a user-friendly message from a ValidationResult object.
   */
  private createUserFriendlyValidationMessage(result: ValidationResult, context: ErrorContext): string {
    if (result.errors.length === 0) return 'Validation successful.'

    const medicationName = context.medicationId || 'a medication'
    const errorCount = result.errors.length

    if (errorCount === 1) {
      const error = result.errors[0]
      if (error?.includes('required')) return `Missing required information for ${medicationName}.`
      if (error?.includes('positive')) return `Invalid dose for ${medicationName}. Dose must be positive.`
      if (error?.includes('age')) return `Age restriction issue for ${medicationName}. Check age limits.`
    }

    return `${medicationName} has ${errorCount} validation ${errorCount === 1 ? 'error' : 'errors'}. Please review.`
  }

  /**
   * Attempts to recover from a validation error based on context and options.
   */
  private attemptRecovery(
    _error: Error | ValidationResult,
    context: ErrorContext,
    options: ErrorRecoveryOptions,
  ): { success: boolean; data?: unknown } {
    if (!options.fallbackToDefaults && !options.skipInvalidItems) {
      return { success: false }
    }

    switch (context.operation) {
      case 'LOAD_MEDICATIONS':
        if (options.fallbackToDefaults) {
          return { success: true, data: this.getDefaultMedications() }
        }
        break
      case 'LOAD_CATEGORIES':
        if (options.fallbackToDefaults) {
          return { success: true, data: this.getDefaultCategories() }
        }
        break
      case 'VALIDATE_MEDICATION':
        if (options.skipInvalidItems) {
          return { success: true, data: null } // Skip the invalid item
        }
        break
      default:
        return { success: false }
    }
    return { success: false }
  }

  /**
   * Logs an error to the internal error log for debugging.
   */
  private logError(context: ErrorContext, error: Error, message: string): void {
    const logEntry = { context: { ...context, timestamp: new Date() }, error, message }
    this.errorLog.push(logEntry)
    if (this.errorLog.length > 100) {
      this.errorLog = this.errorLog.slice(-100)
    }
  }

  /**
   * Returns a copy of the current error log.
   */
  public getErrorLog(): Array<{ context: ErrorContext; error: Error; message: string }> {
    return [...this.errorLog]
  }

  /**
   * Clears the internal error log.
   */
  public clearErrorLog(): void {
    this.errorLog = []
  }

  /**
   * Provides a default medication object for fallback recovery.
   */
  private getDefaultMedications(): QuickReferenceMedication[] {
    const defaultDosingProfile: DosingProfile = {
      formula: 'weight',
      amount: 15,
      unit: 'mg/kg/dose',
      frequency: 'QID',
      maxDose: 1000,
      minAge: 1,
    }
    return [
      {
        id: 'paracetamol-default',
        name: 'Paracetamol',
        aliases: [],
        dosingProfiles: [defaultDosingProfile],
        concentration: { amount: 120, unit: 'mg/5ml', formulation: 'syrup' },
        complaintCategories: ['pain-fever'],
        enabled: true,
        notes: ['Default fallback medication'],
      },
    ]
  }

  /**
   * Provides default category objects for fallback recovery.
   */
  private getDefaultCategories(): QuickReferenceComplaintCategory[] {
    return [
      {
        id: 'all',
        name: 'all',
        displayName: 'All Medications',
        color: 'gray',
        icon: '/icons/category.svg',
        enabled: true,
        sortOrder: 0,
      },
      {
        id: 'pain-fever',
        name: 'pain-fever',
        displayName: 'Pain & Fever',
        color: 'orange',
        icon: '/icons/dew_point.svg',
        enabled: true,
        sortOrder: 1,
      },
    ]
  }
}
