// test/setup.d.ts
// Provide a minimal global augmentation so assigning a test ResizeObserver
// implementation does not require disabling TypeScript checks in the setup file.
declare global {
  interface Window {
    ResizeObserver?: typeof ResizeObserver
  }
}

export { }
