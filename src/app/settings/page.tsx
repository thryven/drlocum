// src/app/settings/page.tsx
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useDevice } from '@/hooks/use-device'
import { useCalculatorStore } from '@/lib/stores/calculator-store'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const { isCompactView, toggleCompactView } = useCalculatorStore()
  const { theme, setTheme } = useTheme()
  const { isMobile } = useDevice()

  const handleThemeChange = (isChecked: boolean) => {
    setTheme(isChecked ? 'dark' : 'light')
  }

  return (
    <div className='w-full max-w-2xl mx-auto pb-24'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
      </div>

      <Card>
        <CardContent className='space-y-6'>
          <div
            className={cn(
              'flex items-center justify-between rounded-lg border p-4',
              isMobile && 'flex-col items-start gap-4',
            )}
          >
            <div className='space-y-0.5'>
              <Label htmlFor='compact-view-switch' className='text-base font-medium'>
                Compact View
              </Label>
              <p className='text-sm text-muted-foreground'>
                Hide extra details on the quick reference cards for a cleaner look.
              </p>
            </div>
            <Switch id='compact-view-switch' checked={isCompactView} onCheckedChange={toggleCompactView} />
          </div>

          <div
            className={cn(
              'flex items-center justify-between rounded-lg border p-4',
              isMobile && 'flex-col items-start gap-4',
            )}
          >
            <div className='space-y-0.5'>
              <Label htmlFor='dark-mode-switch' className='text-base font-medium'>
                Dark Mode
              </Label>
            </div>
            <div className='flex items-center gap-2'>
              <Sun className='h-5 w-5 text-muted-foreground' />
              <Switch id='dark-mode-switch' checked={theme === 'dark'} onCheckedChange={handleThemeChange} />
              <Moon className='h-5 w-5 text-muted-foreground' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
