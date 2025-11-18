# Copilot Instructions — Doses (doseright)

This file gives concise, repo-specific guidance to AI coding agents working on Doses.

- **Tooling:** Use `npm ci` for installs. Validate changes with `npm run preflight`.

Architecture & important paths

- **Framework:** This is a Next.js 16 project using the App Router, React Server Components, and TypeScript.
- **App Router (Next.js + App dir):** UI and routes live under `src/app/*` (e.g. `src/app/layout.tsx`, `src/app/page.tsx`). Create route segments as folders containing `page.tsx`, `layout.tsx`, `loading.tsx`, and `error.tsx` as needed.
- **Components & patterns:** Reusable UI lives under `src/components/*`. Keep client-interactive parts minimal — add `"use client"` only in leaf components that need state or browser APIs.
- **Lib / utils:** Helper functions and shared types are under `src/lib` and `src/lib/*` (see `src/lib/utils.ts`, `src/lib/types.ts`). Prefer plain objects and interfaces over classes.

Developer workflows (exact commands)

- Install: `npm ci` (do not use pnpm/yarn unless instructed).
- Dev server: `npm run dev` (app runs on port `9002`).
- Preflight: `npm run preflight` — runs install, format, lint, build, typecheck and tests (use this before merging).
- Tests: `npm test` (Vitest). Use `describe` / `it` / `expect` and `vi` for mocks; place `vi.mock()` at top of test files.
- Lint/format: `npm run lint`, `npm run format` (Biome/biomejs configured).
- Typecheck: `npm run typecheck`.

Project-specific conventions

- **TypeScript:** Avoid `any`. Prefer `unknown` then narrow. Expose types via `src/lib/types.ts` and colocate related types with features.
- **React:** Use functional components + Hooks. Server Components are default in `src/app`; add `"use client"` only when necessary and keep client components small.
- **State:** Project uses `zustand` stores — prefer small focused stores for local UI state.
- **Styling:** Tailwind + `shadcn/ui` patterns. Follow existing utility classes for spacing and color tokens.

Security & checks (required)

- **Codacy / Trivy:** After editing files, run the Codacy CLI analyze step for each edited file (rootPath=repo root, file=edited path). If dependencies change, run Trivy scan and do not proceed if vulnerabilities are introduced.
- **If required tools are missing:** Notify the user and offer to install or run via the repo's MCP server integrations.

Examples (how to implement common edits)

- To add a new route: create `src/app/my-route/page.tsx` and `src/app/my-route/layout.tsx` (if shared UI is needed). Use server components for data fetching; add `"use client"` inside small interactive components only.
- To add a server action: create an exported `async` function in a server file and use `"use server"` (see `GEMINI.md` for pattern). Invoke via a `<form action={myAction}>` or from server-handled events.
- To add tests: create `src/.../component.test.tsx` adjacent to code. Use `vi.mock()` at top when mocking module-level constants.

What to check before creating a PR

- Create/update a todo list with the provided todo tool (this repo requires tracking work).
- Run `npm run preflight` and fix all lint/type/test failures.
- Run Codacy CLI analysis for each changed file and address its issues.

Where to look for context

- `GEMINI.md` — examples and Next.js App Router patterns used by automated agents.
- `README.md` and `ARCHITECTURE.md` — high-level project purpose and components.
- `src/app`, `src/components`, `src/lib` — canonical examples of routing, components, and utilities.
- `.github/instructions/` — additional instructions for specific tools and patterns used in this repo.
