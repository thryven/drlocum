// /src/components/ui/searchable-select.tsx
'use client'

import { Search } from 'lucide-react'
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useDevice } from '@/hooks/use-device'
import { cn } from '@/lib/utils'

export interface SearchableSelectItem {
  value: string
  label: string
  group?: string
}

interface SearchableSelectProps {
  options: readonly SearchableSelectItem[]
  value: string
  onChange: (value: string) => void
  triggerLabel: string
  dialogTitle: string
  searchPlaceholder: string
  emptyMessage?: string
  error?: string
  disabled?: boolean
}

export const SearchableSelect: FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  triggerLabel,
  dialogTitle,
  searchPlaceholder,
  emptyMessage = 'No results found.',
  error,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { isMobile } = useDevice()

  const selectedLabel = useMemo(() => {
    return options.find((opt) => opt.value === value)?.label || triggerLabel
  }, [value, options, triggerLabel])

  const groupedOptions = useMemo(() => {
    return options.reduce<Map<string, SearchableSelectItem[]>>((groups, option) => {
      const groupKey = option.group ?? 'Items'
      if (!groups.has(groupKey)) {
        groups.set(groupKey, [])
      }
      groups.get(groupKey)?.push(option)
      return groups
    }, new Map())
  }, [options])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
    setIsOpen(false)
    setSearch('')
  }

  const shouldShowGroupHeadings = groupedOptions.size > 1 && options.length > 5

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild={true}>
        <Button
          variant='outline'
          size={isMobile ? 'touch' : 'default'}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          className={cn(
            'w-full justify-start text-left font-normal',
            error && 'border-destructive focus-visible:ring-destructive',
          )}
          disabled={disabled}
          aria-invalid={!!error}
        >
          <span className='truncate wrap-break-word'>{selectedLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className='p-0 w-full max-w-[95vw] overflow-auto sm:max-w-[425px]'
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className='px-4 pt-4 pb-2'>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Command value={search} onValueChange={setSearch} className='h-full'>
          <div className='relative px-4 border-b'>
            <Search
              className='absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-muted-foreground'
              aria-hidden='true'
            />
            <CommandInput
              ref={searchInputRef}
              placeholder={searchPlaceholder}
              className={cn('pl-8', isMobile ? 'h-12 min-h-[48px]' : 'h-12')}
            />
          </div>
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {Array.from(groupedOptions.entries()).map(([group, groupOptions]) => (
              <CommandGroup key={group} heading={shouldShowGroupHeadings ? group : ''}>
                {groupOptions.map((option) => (
                  <CommandItem key={option.value} value={option.label} onSelect={() => handleSelect(option.value)}>
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
