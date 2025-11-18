// src/components/ui/loading-spinner-overlay.tsx

'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  text?: string
  className?: string
}

export const OverlayLoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = 'Loading...', className }) => {
  return (
    <div
      className={cn(
        'flex fixed inset-0 z-50 flex-col justify-center items-center text-muted-foreground',
        'sm:static sm:h-screen sm:bg-transparent sm:z-auto',
        className,
      )}
      aria-live='polite'
    >
      <Loader2 className='w-10 h-10 animate-spin text-primary' />
      <p className='text-lg'>{text}</p>
    </div>
  )
}
