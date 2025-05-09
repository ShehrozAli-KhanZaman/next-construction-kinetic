"use client"
// src/context/ActiveSectionContext.js
import React, { createContext, useState, useContext } from "react"

// Example of the context provider

const ActiveSectionContext = React.createContext()

export const ActiveSectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("down")

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        scrollDirection,
        setScrollDirection,
      }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

export const useActiveSection = () => useContext(ActiveSectionContext)
