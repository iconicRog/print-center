import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('pc-theme')
    return stored === 'classic' || stored === 'aurora' ? stored : 'classic'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('pc-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((t) => (t === 'classic' ? 'aurora' : 'classic'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
