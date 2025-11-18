import '@testing-library/jest-dom'

// Polyfill ResizeObserver for Radix UI components in JSDOM
declare global {
  interface Window {
    ResizeObserver?: new (callback: ResizeObserverCallback) => ResizeObserver
  }
}

class ResizeObserverPolyfill {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if ((globalThis as any).ResizeObserver === undefined) {
  ;(globalThis as any).ResizeObserver = ResizeObserverPolyfill
}
