// test/setup.ts
import '@testing-library/jest-dom'

// JSDOM polyfills or globals can be added here if needed
// Example: mock matchMedia for components relying on it
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => false,
  }),
})

// Polyfill ResizeObserver for Radix UI components in jsdom
class ResizeObserverPolyfill {
  callback: ResizeObserverCallback
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }
  observe() { }
  unobserve() { }
  disconnect() { }
}
// Minimal polyfill for tests that only need the API present.
// Prefer a real polyfill in integration tests that assert resize behavior.
if ((globalThis as any).ResizeObserver === undefined) {
  // Assign via a cast to avoid suppressing unrelated TypeScript checks
  ; (globalThis as any).ResizeObserver = ResizeObserverPolyfill
}
