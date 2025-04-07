"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/context/ThemeContext"

export default function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    // Add or remove dark class based on theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return children
}
