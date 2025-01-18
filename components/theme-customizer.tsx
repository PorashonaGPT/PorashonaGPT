'use client'

import * as React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

interface ThemeCustomizerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemeCustomizer({ open, onOpenChange }: ThemeCustomizerProps) {
  const { theme, setTheme } = useTheme()
  const [customColors, setCustomColors] = React.useState({
    primary: '',
    secondary: '',
    accent: '',
    background: '',
  })

  const handleColorChange = (colorType: keyof typeof customColors) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColors(prev => ({ ...prev, [colorType]: e.target.value }))
  }

  const applyCustomTheme = () => {
    const root = document.documentElement
    Object.entries(customColors).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${key}`, value)
      }
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize Theme</SheetTitle>
          <SheetDescription>
            Adjust the colors to create your custom theme.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="primary" className="text-right">
              Primary
            </Label>
            <Input
              id="primary"
              type="color"
              value={customColors.primary}
              onChange={handleColorChange('primary')}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="secondary" className="text-right">
              Secondary
            </Label>
            <Input
              id="secondary"
              type="color"
              value={customColors.secondary}
              onChange={handleColorChange('secondary')}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accent" className="text-right">
              Accent
            </Label>
            <Input
              id="accent"
              type="color"
              value={customColors.accent}
              onChange={handleColorChange('accent')}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="background" className="text-right">
              Background
            </Label>
            <Input
              id="background"
              type="color"
              value={customColors.background}
              onChange={handleColorChange('background')}
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={applyCustomTheme}>Apply Theme</Button>
      </SheetContent>
    </Sheet>
  )
}

