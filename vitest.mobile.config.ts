/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

// Mobile-specific test configuration
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: false,

    // Mobile test specific configuration
    include: [
      'src/test/unit/**/*.test.{ts,tsx}',
      'src/test/hooks/**/*.test.{ts,tsx}',
      'src/test/components/mobile/**/*.test.{ts,tsx}',
      'src/test/stores/mobile-navigation-store.test.ts',
      'src/test/integration/**/*.test.{ts,tsx}',
      'src/test/visual/**/*.test.{ts,tsx}',
      'src/test/accessibility/**/*.test.{ts,tsx}',
      'src/test/performance/**/*.test.{ts,tsx}',
      'src/test/mobile-test-suite.ts',
      'src/test/universal-test-runner.ts',
      'src/hooks/__tests__/**/*.test.{ts,tsx}',
    ],

    // Test timeout for performance tests
    testTimeout: 10000,

    // Coverage configuration for mobile components
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/hooks/use-device.ts',
        'src/hooks/use-mobile.ts',
        'src/hooks/use-mobile-keyboard.ts',
        'src/hooks/use-orientation*.ts',
        'src/components/mobile/**/*.{ts,tsx}',
        'src/lib/stores/mobile-navigation-store.ts',
      ],
      exclude: ['src/test/**', '**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        // Specific thresholds for mobile components
        'src/components/mobile/': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        'src/hooks/': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
    },

    // Reporter configuration
    reporters: ['verbose', 'json', 'html'],
    outputFile: {
      json: './test-results/mobile-test-results.json',
      html: './test-results/mobile-test-results.html',
    },

    // Environment variables for mobile testing
    env: {
      MOBILE_TEST_MODE: 'true',
      TOUCH_SIMULATION: 'true',
      PERFORMANCE_TESTING: 'true',
    },
  },

  // Define test environment globals for mobile testing
  define: {
    'process.env.MOBILE_TEST_MODE': JSON.stringify('true'),
  },
})
