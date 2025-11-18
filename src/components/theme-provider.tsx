// /src/components/theme-provider.tsx

'use client'

import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Wraps content with a theme provider and forwards received theme props to it.
 *
 * @param props - ThemeProvider props to forward to the underlying provider; the `children` property will be rendered inside the provider.
 * @returns A React element that provides theme context and renders the provided `children`.
 */
export function ThemeProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
