---
applyTo: "**/*"
---

# 🚀 Next.js Coding Guidelines

Next.js introduces specific patterns and APIs that require focused guidelines to ensure optimal performance, maintainability, and leverage its full feature set.

## 1\. 📂 Project Structure and File Organisation

A well-organised structure is vital for large Next.js applications.

- **`src/` Directory:** Prefer placing most application code within a top-level `src/` directory (e.g., `src/app`, `src/pages`, `src/components`). This cleanly separates application logic from configuration files and build outputs.
- **`app` Router (Recommended):**
  - **Pages:** Place route segments inside the `app/` directory. Use the convention `page.tsx` for route components and `layout.tsx` for shared UI across a segment.
  - **Loading and Error:** Use `loading.tsx` and `error.tsx` files within route segments to define loading skeletons and error boundaries for improved user experience.
  - **Route Handlers:** Use `route.ts` for API endpoints within the `app` directory.
- **Components:**
  - **Atomic Design:** Organise components into logical groups (e.g., `components/atoms`, `components/molecules`, `components/organisms`).
  - **Colocation:** For components that are only used within a specific route segment, consider placing them in a `components/` sub-folder *within that segment* for better locality.
- **Absolute Imports:** Configure `tsconfig.json` to use **absolute imports** (e.g., `@/components/Button`) instead of relative imports (e.g., `../../../components/Button`). This keeps imports clean and refactoring easy.

---

## 2\. 🎣 Data Fetching and Caching

Proper data fetching is crucial for performance. **Prefer the App Router's data fetching model over the legacy `getServerSideProps` / `getStaticProps` patterns.**

- **Server Components First:** Default to **React Server Components (RSCs)** for all non-interactive logic, including data fetching. Data fetching should happen directly in Server Components using `await fetch()`.
  - **Automatic Caching:** By default, `fetch()` calls in RSCs are automatically memoised, and the results are cached across requests, leveraging Next.js's data caching mechanism.
- **Server Actions for Mutations:** Use **Server Actions** for all data mutations (updates, deletes) instead of dedicated API routes when possible.
- **Client Component Data Fetching:** Only fetch data in Client Components when:
  - The data relies on **browser-specific APIs** (e.g., geo-location).
  - The data needs to be **continuously revalidated** on the client side (use a library like SWR or React Query).
  - Use the **`use client`** directive at the top of the file to mark it as a Client Component.

## 3\. 🧩 Components and Rendering

Optimising where and how components render directly impacts site performance.

- **"Use Client" Boundary:** Minimise the use of the **`use client`** directive. Place it at the lowest possible level.
  - **Pattern:** Create small **Client Wrapper Components** that encapsulate the interactive logic, and pass all static data and non-interactive children as props from the parent Server Component.
- **Server Component Props:** Server components can accept any serialisable props. **Avoid passing entire components (JSX) as props** to another Server Component; pass data instead.
- **Dynamic Components:** Use **`next/dynamic`** to lazy-load components that are not critical for the initial load. This reduces the initial JavaScript bundle size.

## 4\. 🔗 Routing and Navigation

- **`next/link`:** Always use the **`<Link>`** component from `next/link` for internal navigation. Do not use standard `<a>` tags for internal routes, as `<Link>` handles prefetching and client-side transitions.
- **`next/navigation`:** Use functions from `next/navigation` (e.g., `useRouter`, `redirect`) for programmatic navigation within the App Router, ensuring type safety and compatibility.

## 5\. ⚡ Performance and Optimisation

- **Image Optimisation:** Always use the **`<Image>`** component from `next/image` for locally hosted images. This ensures proper size optimisation, lazy loading, and correct caching.
- **Font Optimisation:** Use **`next/font`** for local font files and Google Fonts. This automatically handles font file optimisation and self-hosting, eliminating external network requests and ensuring fonts are loaded efficiently.
- **Environment Variables:** Use the `NEXT_PUBLIC_` prefix for any environment variables intended to be exposed to the browser (Client Components). All other variables are assumed to be **server-only** for security.

## 6\. 📝 Documentation (Next.js Specific)

- **Component Type:** In the JSDoc for components, always specify if it is a **Client Component** or a **Server Component**.

    ```typescript
    /**
     * @file A reusable button component.
     * @component Client Component
     * @param onClick The click handler.
     * @param children The button content.
     */
    'use client';
    export default function Button({ onClick, children }: ButtonProps) {
        // ...
    }
    ```

---

## 📝 General Principles & Formatting

These foundational rules ensure consistency, readability, and ease of maintenance across the codebase.

- **Consistency is Key:** If a specific convention is established in a project, **prioritise consistency** with that existing style over a new guideline, unless the existing style introduces a significant defect or risk.
- **Indentation:** Use **4 spaces** for indentation.
- **Semicolons:** Always use **semicolons** to terminate statements.
- **Quotes:** Prefer **single quotes** (`'`) for string literals, unless the string contains a single quote, in which case use double quotes (`"`).
- **Braces:** Always use **curly braces** (`{}`) for all control flow statements (`if`, `for`, `while`, etc.), even for single-line bodies, to prevent errors and improve readability.
- **Ternary Operators:** Only use the ternary operator for simple, straightforward assignments or expressions. Avoid nesting.

---

## 🏷️ Naming Conventions

Clear, descriptive naming is paramount for readability.

| Entity | Convention | Example | Rationale |
| :--- | :--- | :--- | :--- |
| **Classes, Interfaces, Types, Enums** | `PascalCase` | `UserProfile`, `ServiceLocator`, `ErrorType` | Standard convention for type declarations. |
| **Functions, Methods, Variables** | `camelCase` | `getUserData`, `calculateTotal`, `maximumValue` | Standard convention for values and executable code. |
| **Constants (global/module level)** | `SCREAMING_SNAKE_CASE` | `MAX_RETRIES`, `DEFAULT_TIMEOUT` | Clearly signals that the value should not be modified. |
| **Files** | `kebab-case` | `user-profile.ts`, `data-utils.ts` | Conventional for front-end projects, compatible with various tools. |
| **Interfaces (Prefixes)** | **Avoid** the `I` prefix (e.g., `IUser`). | Use `User` or `UserRepository`. | The type system already indicates it's a type; the prefix adds noise. |
| **Booleans** | Prefix with verbs like `is`, `has`, `can`. | `isActive`, `hasPermission`, `canSave` | Improves clarity when reading conditional logic. |

---

## 🛡️ Typing and Type Safety

Leveraging the type system is the primary benefit of using TypeScript.

### 1\. Strive for Strictness

- **Avoid `any`:** Use the `any` type only as a last resort or when dealing with genuinely untyped external data. Overuse of `any` defeats the purpose of TypeScript.
- **Use `unknown` over `any`:** When accepting unknown data (e.g., from an API or in a `catch` block), use `unknown`. Unlike `any`, `unknown` requires a type check (narrowing) before it can be used, promoting safer code.

    ```typescript
    // ❌ Bad
    function processData(data: any) { /* ... */ }

    // ✅ Good
    function processData(data: unknown) {
      if (typeof data === 'object' && data !== null && 'id' in data) {
        // 'data' is now narrowed down to a structured type within this block
        console.log(data.id);
      }
    }
    ```

- **Use `const` assertions:** Use `const` assertions (`as const`) on literals to create the narrowest possible type, ensuring immutability and preventing unintended modifications to arrays or objects.

### 2\. Type Definitions

- **`type` vs. `interface`:**
  - Use **`interface`** for defining the shape of objects, especially when you expect the interface to be **implemented by a class** (`class MyClass implements MyInterface`) or when it might need to be **extended** by other interfaces.
  - Use **`type`** for everything else, including primitive aliases, unions, intersections, tuple types, and mapped types. Prefer `type` aliases for simple object definitions when neither implementation nor extension is required.
- **Discriminated Unions:** Use **discriminated unions** for modeling state or results that can be one of several distinct shapes. This allows TypeScript to narrow the type correctly within conditional blocks.

    ```typescript
    type Success = { status: 'success'; data: User };
    type Failure = { status: 'error'; error: string };
    type Result = Success | Failure; // This is the discriminated union
    ```

- **Explicit Return Types:** Always explicitly define the return type for exported functions and complex functions. This makes the code clearer and prevents accidental changes to the return type from internal refactoring.

### 3\. Array and Readonly

- **Array Syntax:** Prefer the generic array syntax, especially when defining types.
  - `Array<string>` over `string[]` (for consistency with generics).
- **Immutability:** Use the **`readonly`** keyword or the **`Readonly<T>`** utility type to enforce immutability for object properties and parameters where the value should not be changed. Use **`ReadonlyArray<T>`** for arrays that should not be mutated.

---

## 🏗️ Code Structure and Organisation

### 1\. Imports and Exports

- **Named Exports:** Prefer **named exports** over default exports. This improves tooling support (e.g., auto-import/rename refactoring) and makes it clear what is being imported.

    ```typescript
    // ❌ Avoid default exports
    export default class UserProfile { /* ... */ }

    // ✅ Prefer named exports
    export class UserProfile { /* ... */ }
    ```

- **Explicit Imports:** Use **`import type`** when importing types/interfaces/enums only, ensuring they are correctly stripped from the compiled JavaScript and preventing circular dependency issues.

    ```typescript
    import type { UserProfile } from './types'; // Only imports the type
    import { saveUser } from './api';           // Imports the value (function)
    ```

### 2\. Functions and Modularity

- **Pure Functions:** Strive for functions to be **pure** (i.e., given the same input, they always return the same output, and they have no side effects) and **stateless**. This significantly improves testability and maintainability.
- **Single Responsibility:** Functions and classes should adhere to the **Single Responsibility Principle**. Each function should do one thing, and do it well.
- **Overloading:** Avoid excessive function overloading. If a function accepts vastly different argument sets, consider splitting it into multiple, distinct functions.

---

## 🚀 Efficiency and Performance

As you noted, avoiding unnecessary loops in favour of vectorized operations is key for performance with large datasets.

- **Vectorised Operations:** Use built-in array methods (`map`, `filter`, `reduce`, `some`, `every`) instead of explicit `for` or `forEach` loops when possible, as modern JavaScript engines often optimise these methods efficiently.
- **Destructuring and Spreading:** Use **object and array destructuring and spread syntax** to handle data manipulation concisely and often more efficiently than manual property assignment.
- **Memoisation:** For complex, expensive computations, implement **memoisation** to cache results and avoid recalculation (e.g., using `React.useMemo` or a custom memoisation utility).

---

## 📖 Documentation and Comments

Adhering to your requirement for comprehensive documentation is essential.

- **Docstrings:** Use **JSDoc-style comments** (`/** ... */`) for all **exported** functions, methods, classes, and types. This allows IDEs to provide rich, on-hover documentation.
  - Include a high-level explanation of the purpose.
  - Use `@param` to describe arguments, including any constraints.
  - Use `@returns` to describe the return value.
  - Use `@throws` to describe any errors/exceptions thrown.
- **Code Comments:** Use standard comments (`//` or `/* */`) judiciously to explain **why** a non-obvious choice was made, not **what** the code is doing (the code should generally be self-explanatory).
  - Explain **complex logic** or workarounds for external issues.
  - Use `// TODO:` for pending work or known issues.
