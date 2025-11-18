// src/components/calculator/empty-state-card.tsx
import { Info } from 'lucide-react'
import type React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EmptyStateCardProps {
  title: string
  description: string
  categoryName?: string | null
}

export const EmptyStateCard: React.FC<EmptyStateCardProps> = ({ title, description, categoryName }) => {
  return (
    <Card className='w-full shadow-lg'>
      <CardHeader>
        <CardTitle className='text-2xl md:text-3xl'>Dose Calculator</CardTitle>
        {categoryName && <CardDescription>Category: {categoryName}</CardDescription>}
      </CardHeader>
      <CardContent className='py-8 text-center'>
        <Info size={48} className='mx-auto mb-4 text-muted-foreground' />
        <p className='text-lg'>{title}</p>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </CardContent>
    </Card>
  )
}
