import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Theme } from '../types/portfolio'
import { ThemeContext } from './themeStore'

const STORAGE_KEY = 'binith-portfolio-theme'

function getInitialTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY)
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme
  } catch {
    // The theme still works when storage is unavailable.
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0a0a0b' : '#dfe3d7')

    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Theme persistence is optional.
    }
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
