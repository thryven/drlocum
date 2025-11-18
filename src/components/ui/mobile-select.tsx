// src/components/ui/mobile-select.tsx
'use client'

import { Check, ChevronDown, Search } from 'lucide-react'
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import BottomSheet from './bottom-sheet'

export interface MobileSelectItem {
  value: string
  label: string
  group?: string
}

interface MobileSelectProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onChange'> {
  options: readonly MobileSelectItem[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  title?: string
  searchPlaceholder?: string
  emptyMessage?: string
  error?: string
  disabled?: boolean
  searchable?: boolean
}

export const MobileSelect = forwardRef<ElementRef<'button'>, MobileSelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option...',
      title = 'Select Option',
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      error,
      disabled,
      searchable = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const searchInputRef = useRef<HTMLInputElement>(null)

    const selectedLabel = useMemo(() => {
      return options.find((opt) => opt.value === value)?.label || placeholder
    }, [value, options, placeholder])

    const filteredOptions = useMemo(() => {
      if (!searchQuery.trim()) return options

      const query = searchQuery.toLowerCase()
      return options.filter(
        (option) => option.label.toLowerCase().includes(query) || option.group?.toLowerCase().includes(query),
      )
    }, [options, searchQuery])

    const groupedOptions = useMemo(() => {
      return filteredOptions.reduce<Map<string, MobileSelectItem[]>>((groups, option) => {
        const groupKey = option.group ?? 'Items'
        if (!groups.has(groupKey)) {
          groups.set(groupKey, [])
        }
        groups.get(groupKey)?.push(option)
        return groups
      }, new Map())
    }, [filteredOptions])

    const handleSelect = (selectedValue: string) => {
      onChange(selectedValue)
      setIsOpen(false)
      setSearchQuery('')
    }

    const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      if (open) {
        // Focus search input when opening
        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 100)
      } else {
        setSearchQuery('')
      }
    }

    const shouldShowGroupHeadings = groupedOptions.size > 1 && options.length > 5

    return (
      <>
        <Button
          ref={ref}
          variant='outline'
          size='touch'
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          className={cn(
            'w-full justify-between text-left font-normal min-h-[44px]',
            error && 'border-destructive focus-visible:ring-destructive',
            className,
          )}
          disabled={disabled}
          aria-invalid={!!error}
          onClick={() => handleOpenChange(true)}
          {...props}
        >
          <span className='truncate wrap-break-word flex-1 text-left'>{selectedLabel}</span>
          <ChevronDown className='h-4 w-4 opacity-50 ml-2 shrink-0' />
        </Button>

        <BottomSheet open={isOpen} onOpenChange={handleOpenChange} title={title}>
          <div className='flex flex-col h-full'>
            {/* Search Input */}
            {searchable && (
              <div className='p-4 border-b'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    ref={searchInputRef}
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-9 min-h-[44px]'
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className='flex-1 overflow-auto'>
              {filteredOptions.length === 0 ? (
                <div className='p-4 text-center text-muted-foreground'>{emptyMessage}</div>
              ) : (
                <div className='py-2'>
                  {Array.from(groupedOptions.entries()).map(([group, groupOptions]) => (
                    <div key={group}>
                      {shouldShowGroupHeadings && (
                        <div className='px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/50'>{group}</div>
                      )}
                      {groupOptions.map((option) => (
                        <button
                          type='button'
                          key={option.value}
                          className={cn(
                            'w-full flex items-center justify-between px-4 py-3 text-left',
                            'min-h-[44px] transition-colors hover:bg-accent focus:bg-accent',
                            'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring',
                            value === option.value && 'bg-accent',
                          )}
                          onClick={() => handleSelect(option.value)}
                        >
                          <span className='flex-1 truncate'>{option.label}</span>
                          {value === option.value && <Check className='h-4 w-4 text-primary ml-2 shrink-0' />}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </BottomSheet>
      </>
    )
  },
)

MobileSelect.displayName = 'MobileSelect'

export default MobileSelect
