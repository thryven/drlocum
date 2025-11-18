/**
 * @fileoverview A component that renders toasts from the `useToast` hook.
 * It listens for new toasts and displays them in a `ToastViewport`.
 */

'use client'

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

/**
 * Renders active toast notifications inside a ToastProvider and includes the ToastViewport.
 *
 * @returns The JSX element containing the toast provider with rendered toasts and the viewport.
 */
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className='grid gap-1'>
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
