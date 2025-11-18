/**
 * @fileoverview ARIA label generator functions for accessibility.
 * @lintignore
 */

export const AriaLabels = {
  /**
   * ARIA label for a drug dosage card.
   * Handles empty inputs gracefully by returning a fallback message.
   * @param drugName - The name of the drug.
   * @param dosageText - The calculated dosage to be announced.
   * @returns A descriptive string for screen readers.
   */
  drugDosageCard: (drugName: string, dosageText: string) => {
    if (!drugName?.trim() || !dosageText?.trim()) {
      return 'Drug information is currently unavailable.'
    }
    return `${drugName}. Calculated dose: ${dosageText}.`
  },

  /**
   * ARIA label for a search results region.
   * Handles invalid count gracefully.
   * @param count - The number of results.
   * @param query - The search query, if any.
   * @returns A descriptive string for screen readers.
   */
  searchResults: (count: number, query?: string) => {
    if (typeof count !== 'number' || count < 0) {
      return 'Counting search results...'
    }
    const plural = count !== 1 ? 's' : ''
    if (query) {
      return `${count} medication${plural} found for "${query}".`
    }
    return `${count} medication${plural} available.`
  },
}
