"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark")

  // Initialize theme from localStorage if available
  useEffect(() => {
    setTheme("dark")
    // const storedTheme = localStorage.getItem("theme")
    // if (storedTheme) {
    //   setTheme(storedTheme)
    // } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //   setTheme("dark")
    // }
  }, [])

  // Update HTML class when theme changes
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
