# drlocum Application Architecture

This document provides a high-level overview of the drlocum application's architecture, technology stack, and key design patterns.

## 1. Technology Stack

The application is built on a modern, robust technology stack chosen for performance, type safety, and maintainability.

- **Framework**: **Next.js 16+** with the **App Router** is used for its hybrid rendering capabilities (Server and Client Components), file-based routing, and performance optimizations.
- **Language**: **TypeScript** is used across the entire codebase to ensure type safety and improve developer experience. The configuration is set to `strict` mode.
- **UI Components**: **shadcn/ui** provides a set of accessible and composable base components, built on top of **Radix UI**.
- **Styling**: **Tailwind CSS** is used for utility-first styling, allowing for rapid and consistent UI development. A custom theme is defined in `src/app/globals.css` and related style files.
- **State Management**: **Zustand** is used for lightweight, client-side state management. It is used for global state like the audience mode (pediatric/adult) and for persisting calculator inputs.
- **Code Quality**: **Biome.js** is used for linting and formatting, ensuring a consistent and high-quality codebase.
- **Testing**: **Vitest** is used for unit and integration testing, with a configuration that supports the jsdom environment for React component testing.

## 2. Project Structure

The project follows a feature-oriented structure within the Next.js App Router paradigm.

```text
/src
|-- /app/                # Next.js App Router (pages and layouts)
|   |-- /calculator/     # Medical calculator pages
|   |-- /drug/           # Dynamic drug detail pages
|   |-- /resources/      # Clinical resource pages
|   |-- globals.css      # Core and theme styles
|   `-- layout.tsx       # Root application layout
|
|-- /components/         # Reusable React components
|   |-- /ui/             # shadcn/ui base components
|   |-- /common/         # App-wide shared components
|   |-- /layout/         # Layout components (e.g., nav bar)
|   `-- /quick-reference/ # Components for the main page
|
|-- /hooks/              # Custom React hooks (e.g., use-centor-score)
|
|-- /lib/                # Core application logic and data
|   |-- /medical-data/   # Static data for clinical resources
|   |-- /quick-reference-database/ # The core medication database
|   |   |-- /calculations/ # Dosage calculation engine
|   |   |-- /medications/  # Individual medication data files
|   |   |-- data-loader.ts # Functions to load medication data
|   |   `-- filtering.ts   # Functions to filter and sort medications
|   |-- /stores/         # Zustand state stores
|   |-- /types/          # Shared TypeScript types
|   `-- /utils/          # Utility functions
|
`-- /test/               # Test setup and configurations
```

## 3. Core Architectural Concepts

### 3.1. Medication Database Engine

The heart of the application is the modular medication database located in `src/lib/quick-reference-database/`.

- **Data Source**: Each medication is defined in its own TypeScript file within a category-based folder structure (e.g., `medications/analgesics/paracetamol.ts`).
- **Auto-Discovery**: An `index.ts` file in each medication category folder automatically aggregates and exports all medications, making the system easily extensible.
- **Type Safety**: All medication data conforms to the `QuickReferenceMedication` interface defined in `types.ts`, which is enforced by TypeScript and Zod schemas for runtime validation.
- **Calculation Engine**: The `calculations/` directory contains pure functions that handle all dosage computations. This isolates complex business logic from the UI.

### 3.2. State Management

The application uses a combination of state management strategies:

- **Zustand**: For minimal, client-side global state.
  - `app-store.ts`: Manages global settings like the current audience (pediatric vs. adult).
  - `calculator-store.ts`: Manages state for the various medical calculators, including user inputs.
- **URL State**: For calculator pages, state is often stored in the URL search parameters to allow for sharing and deep linking.
- **Local Storage**: Zustand's `persist` middleware is used to save user preferences (like audience mode) to local storage.

### 3.3. Rendering Strategy (Next.js App Router)

- **Server Components by Default**: Most pages and components are React Server Components (RSCs) to minimize the client-side JavaScript bundle and improve initial load times. Data is fetched on the server where possible.
- **Client Components for Interactivity**: The `'use client'` directive is used sparingly for components that require user interaction, state, or browser-only APIs (e.g., forms, interactive calculators).
- **Suspense for Loading States**: `Suspense` boundaries are used to show loading fallbacks while server components are fetching data, providing a better user experience.

## 4. Key Design Patterns

- **Separation of Concerns**: The application clearly separates UI components, business logic (calculations), and state management. This makes the codebase easier to understand, test, and maintain.
- **Composition over Inheritance**: UI is built by composing smaller, single-purpose components, following the pattern encouraged by React and shadcn/ui.
- **Progressive Web App (PWA)**: The application is designed as a PWA, with a service worker for offline capabilities and caching, and a manifest for "add to homescreen" functionality. This is configured in `next.config.ts` and `src/app/layout.tsx`.
- **Accessibility**: The application aims to be accessible, using semantic HTML, ARIA attributes, and keyboard-navigable components provided by Radix UI.
