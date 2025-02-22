import React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@mui/material'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="text"
            sx={{
                minWidth: 'auto',
                padding: '8px',
                borderRadius: '50%',
            }}
            aria-label="Toggle theme"
        >
            <Sun
                className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                aria-hidden="true"
            />
            <Moon
                className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                aria-hidden="true"
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
} 