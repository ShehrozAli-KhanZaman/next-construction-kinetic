"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedSection from "@/components/AnimatedSection"
import PropertySearch from "@/components/sections/PropertySearch"
import ConstructionDetails from "@/components/sections/ConstructionDetails"
import CostCalculator from "@/components/sections/CostCalculator"
import HouseLayouts from "@/components/HouseLayouts"
import Hero from "../components/Hero"
import Services from "../components/Services"
import How from "../components/How"
import Projects from "../components/Projects"
import Why from "@/components/Why"
import ConstructionProcess from "@/components/ConstructionProcess"
import GreyStructure from "@/components/GreyStructure"
import Finishing from "@/components/Finishing"
import Costing from "@/components/Costing"
import SectionWrapper from "@/components/SectionWrapper"
import FeaturedProperties from "@/components/sections/FeaturedProperties"
import AboutUs from "@/components/sections/About"
import Contact from "@/components/sections/Contact"

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollDirection, setScrollDirection] = useState("down")

  const sections = [
    { component: PropertySearch, direction: "up" },
    { component: ConstructionDetails, direction: "up" },
    { component: CostCalculator, direction: "up" },
    { component: HouseLayouts, direction: "up" },
    // { component: FeaturedProperties, direction: "up" },
    // { component: AboutUs, direction: "up" },
    { component: Contact, direction: "up" },
  ]

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        setScrollDirection("down")
        setActiveSection((prev) => Math.min(prev + 1, sections.length - 1))
      } else {
        setScrollDirection("up")
        setActiveSection((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {sections.map((section, index) => (
          <AnimatedSection
            key={index}
            isActive={activeSection === index}
            direction={scrollDirection}>
            <section.component />
          </AnimatedSection>
        ))}
      </AnimatePresence>
    </div>
  )
}
