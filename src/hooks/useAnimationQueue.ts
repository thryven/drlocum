/**
 * @fileoverview Animation queue hook to limit simultaneous animations for performance.
 * Ensures maximum 3 animations run at once and provides staggered animation support.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

interface AnimationQueueItem {
  id: string
  callback: () => void | Promise<void>
  priority?: number
}

interface UseAnimationQueueOptions {
  maxConcurrent?: number
  staggerDelay?: number
}

/**
 * Hook to manage animation queue and limit simultaneous animations
 * @param options Configuration options
 * @returns Queue management functions
 */
export function useAnimationQueue(options: UseAnimationQueueOptions = {}) {
  const { maxConcurrent = 3, staggerDelay = 50 } = options

  const [queue, setQueue] = useState<AnimationQueueItem[]>([])
  const [running, setRunning] = useState<Set<string>>(new Set())
  const processingRef = useRef(false)

  const addToQueue = useCallback((id: string, callback: () => void | Promise<void>, priority = 0) => {
    setQueue((prev) => {
      const newItem: AnimationQueueItem = { id, callback, priority }
      const filtered = prev.filter((item) => item.id !== id)
      const updated = [...filtered, newItem]
      return updated.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    })
  }, [])

  const removeFromQueue = useCallback((id: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id))
    setRunning((prev) => {
      const updated = new Set(prev)
      updated.delete(id)
      return updated
    })
  }, [])

  const processQueue = useCallback(async () => {
    if (processingRef.current || running.size >= maxConcurrent) return
    processingRef.current = true

    const availableSlots = maxConcurrent - running.size
    const itemsToProcess = queue.slice(0, availableSlots)

    if (itemsToProcess.length > 0) {
      // Batch state updates
      setQueue((prev) => prev.slice(itemsToProcess.length))
      setRunning((prev) => {
        const newRunning = new Set(prev)
        for (const item of itemsToProcess) {
          newRunning.add(item.id)
        }
        return newRunning
      })

      // Process items
      await Promise.all(
        itemsToProcess.map(async (item, index) => {
          try {
            if (staggerDelay > 0 && index > 0) {
              await new Promise((resolve) => setTimeout(resolve, staggerDelay * index))
            }
            await Promise.resolve(item.callback())
          } catch (error) {
            console.error(`Animation ${item.id} failed:`, error)
          } finally {
            setRunning((prev) => {
              const updated = new Set(prev)
              updated.delete(item.id)
              return updated
            })
          }
        }),
      )
    }

    processingRef.current = false
  }, [queue, running.size, maxConcurrent, staggerDelay])

  useEffect(() => {
    if (queue.length > 0 && running.size < maxConcurrent) {
      processQueue()
    }
  }, [queue, running, maxConcurrent, processQueue])

  const clearQueue = useCallback(() => {
    setQueue([])
  }, [])

  const isAnimating = useCallback((id: string) => running.has(id), [running])

  return {
    addToQueue,
    removeFromQueue,
    clearQueue,
    isAnimating,
    queueLength: queue.length,
    runningCount: running.size,
  }
}

/**
 * Hook for staggered animations of multiple elements
 * @param count Number of elements to animate
 * @param delay Delay between each animation start
 * @returns Array of animation states
 */
export function useStaggeredAnimation(count: number, delay = 50) {
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const startStaggered = useCallback(() => {
    for (const timeout of timeoutsRef.current) {
      clearTimeout(timeout)
    }
    timeoutsRef.current = []
    setActiveIndices(new Set())

    for (let i = 0; i < count; i++) {
      const timeout = setTimeout(() => {
        setActiveIndices((prev) => new Set(prev).add(i))
      }, i * delay)
      timeoutsRef.current.push(timeout)
    }
  }, [count, delay])

  const reset = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setActiveIndices(new Set())
  }, [])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  return {
    startStaggered,
    reset,
    isActive: (index: number) => activeIndices.has(index),
    activeCount: activeIndices.size,
  }
}
