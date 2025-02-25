import React, { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@mui/material';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Log theme changes for debugging
  useEffect(() => {
    console.log('Current theme:', theme);
    console.log('Resolved theme:', resolvedTheme);
  }, [theme, resolvedTheme]);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    console.log('Switching to theme:', newTheme);
    setTheme(newTheme);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="text"
      className={className}
      sx={{
        minWidth: 'auto',
        padding: '8px',
        borderRadius: '50%',
        position: 'relative',
      }}
      aria-label="Toggle theme"
    >
      <Sun
        className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        style={{
          position: resolvedTheme === 'dark' ? 'absolute' : 'static',
          opacity: resolvedTheme === 'dark' ? 0 : 1,
          transition: 'all 0.2s ease',
        }}
        aria-hidden="true"
      />
      <Moon
        className="h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        style={{
          position: resolvedTheme === 'light' ? 'absolute' : 'static',
          opacity: resolvedTheme === 'light' ? 0 : 1,
          transition: 'all 0.2s ease',
        }}
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
