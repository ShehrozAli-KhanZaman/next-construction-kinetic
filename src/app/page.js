/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import AnimatedSection from "@/components/AnimatedSection"
import PropertySearch from "@/components/sections/PropertySearch"
import ConstructionDetails from "@/components/sections/ConstructionDetails"
import CostCalculator from "@/components/sections/CostCalculator"
import HouseLayouts from "@/components/HouseLayouts"
import { ToastContainer } from "react-toastify"
import Background from "@/components/Background"
import { useActiveSection } from "@/context/ActiveSectionContext"

export default function Home() {
  const containerRef = useRef(null)
  const {
    activeSection,
    scrollDirection,
    setActiveSection,
    setScrollDirection,
  } = useActiveSection()

  const sections = [
    { component: PropertySearch },
    { component: ConstructionDetails },
    { component: HouseLayouts },
    { component: CostCalculator },
    // { component: Contact },
  ]

  // Throttle function outside the useEffect to avoid redefinition
  const throttle = (() => {
    let lastScrollTime = 0
    return () => {
      const now = Date.now()
      if (now - lastScrollTime < 800) return false
      lastScrollTime = now
      return true
    }
  })()

  useEffect(() => {
    const container = containerRef.current
    let touchStartY = 0

    const handleWheel = (e) => {
      e.preventDefault()
      if (!throttle()) return

      const newDirection = e.deltaY > 0 ? "down" : "up"
      setScrollDirection(newDirection)

      setActiveSection((prev) => {
        const newSection = newDirection === "down" ? prev + 1 : prev - 1
        return Math.max(0, Math.min(newSection, sections.length - 1))
      })
    }

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY

      if (Math.abs(deltaY) < 50 || !throttle()) return

      const newDirection = deltaY > 0 ? "down" : "up"
      setScrollDirection(newDirection)

      setActiveSection((prev) => {
        const newSection = newDirection === "down" ? prev + 1 : prev - 1
        return Math.max(0, Math.min(newSection, sections.length - 1))
      })
    }

    if (container) {
      // Add event listeners for mouse wheel and touch events
      container.addEventListener("wheel", handleWheel, { passive: false })
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        // Cleanup event listeners
        container.removeEventListener("wheel", handleWheel)
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [sections.length, setActiveSection, setScrollDirection])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden touch-none">
      <ToastContainer />
      <Background type="GLOBE" color={0x1a1a1a} />
      <AnimatePresence mode="sync">
        {sections.map((section, index) => {
          const Component = section.component
          return (
            <AnimatedSection
              key={index}
              isActive={activeSection === index}
              direction={scrollDirection}>
              <Component />
            </AnimatedSection>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
