'use client'

import { useEffect, useState } from 'react'
import { calculatePregnancyInfo, type PregnancyInfo } from '@/lib/utils/pregnancy-calculator'

/**
 * Manages pregnancy-related input state and provides a computed PregnancyInfo plus a reset handler.
 *
 * Recomputes `pregnancyInfo` whenever `lmpDate`, `ultrasoundDate`, `gaWeeks`, or `gaDays` change; parses `gaWeeks` and `gaDays` from strings when present. The reset handler restores initial defaults.
 *
 * @returns An object containing:
 * - `lmpDate`: the last menstrual period date or `undefined`
 * - `setLmpDate`: setter for `lmpDate`
 * - `ultrasoundDate`: the ultrasound date or `undefined`
 * - `setUltrasoundDate`: setter for `ultrasoundDate`
 * - `gaWeeks`: gestational age weeks as a string
 * - `setGaWeeks`: setter for `gaWeeks`
 * - `gaDays`: gestational age days as a string
 * - `setGaDays`: setter for `gaDays`
 * - `pregnancyInfo`: the computed `PregnancyInfo` or `null`
 * - `handleReset`: function that resets inputs to their initial defaults
 */
export function usePregnancyCalculator() {
  const [lmpDate, setLmpDate] = useState<Date | undefined>(new Date())
  const [ultrasoundDate, setUltrasoundDate] = useState<Date | undefined>()
  const [gaWeeks, setGaWeeks] = useState<string>('')
  const [gaDays, setGaDays] = useState<string>('')
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyInfo | null>(null)

  useEffect(() => {
    if (lmpDate) {
      const parsedWeeks = Number.parseInt(gaWeeks, 10)
      const weeks = Number.isNaN(parsedWeeks) ? undefined : parsedWeeks
      const parsedDays = Number.parseInt(gaDays, 10)
      const days = Number.isNaN(parsedDays) ? undefined : parsedDays
      const info = calculatePregnancyInfo(lmpDate, ultrasoundDate, weeks, days)
      setPregnancyInfo(info)
    } else {
      setPregnancyInfo(null)
    }
  }, [lmpDate, ultrasoundDate, gaWeeks, gaDays])

  const handleReset = () => {
    setLmpDate(new Date())
    setUltrasoundDate(undefined)
    setGaWeeks('')
    setGaDays('')
  }

  return {
    lmpDate,
    setLmpDate,
    ultrasoundDate,
    setUltrasoundDate,
    gaWeeks,
    setGaWeeks,
    gaDays,
    setGaDays,
    pregnancyInfo,
    handleReset,
  }
}
