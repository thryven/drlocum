import { AlertCircle, Info, TriangleAlert } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { cn } from './lib/utils'

/**
 * Renders a styled callout box with an icon for displaying informational, warning, or danger messages.
 * @param props - The component props
 * @param props.children - The content to display inside the callout
 * @param props.type - The callout type (default, warning, or danger)
 */
export function Callout(
  props: Readonly<{
    children: React.ReactNode
    type?: 'default' | 'warning' | 'danger'
  }>,
) {
  const { children, type = 'default' } = props
  const typeClasses = {
    default: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
    warning:
      'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
    danger: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
  }
  const Icon = {
    default: Info,
    warning: TriangleAlert,
    danger: AlertCircle,
  }[type]

  return (
    <div className={cn('my-6 flex items-start rounded-md border p-4', typeClasses[type])}>
      <Icon className='mr-3 h-5 w-5 shrink-0' />
      <div className='prose-p:m-0 prose-ul:m-0 prose-li:m-0'>{children}</div>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{children}</h1>,
    // Add our custom components to the list
    Callout,
    ...components,
  }
}
