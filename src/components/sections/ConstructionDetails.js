"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import BoxComponent from "../ui/BoxComponent"
import ModalComponent from "../ui/ModalComponent"
import { textSections } from "@/lib/utils"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { useActiveSection } from "@/context/ActiveSectionContext"

export default function ConstructionDetails() {
  const tabs = textSections
  const [activeTab, setActiveTab] = useState(null) // Initial state is null

  // Set default tab based on screen size
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches
    if (isDesktop) {
      setActiveTab(tabs[0].id) // Select first tab for desktop
    }
  }, [tabs])

  const particlesInit = async (main) => {
    await loadFull(main)
  }
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  }
  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }
  const { activeSection, setActiveSection, setScrollDirection } =
    useActiveSection()

  const handlePrevSection = () => {
    setScrollDirection("up")
    setActiveSection((prev) => prev - 1)
  }
  const handleNextSection = () => {
    setScrollDirection("down")
    setActiveSection((prev) => prev + 1)
  }
  let totalSections = 5
  return (
    <section className="relative min-h-screen w-full text-white overflow-hidden flex items-center justify-center py-4 px-4">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#ffffff" },
            number: { value: 50 },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.3 },
            links: { enable: false },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <div className="z-10 flex flex-col md:flex-row gap-6 w-full max-w-7xl min-h-screen items-center justify-center">
        {/* Left Column: Logo, Heading, and Sidemenu-style Tabs */}
        <div className="w-full md:w-1/5 flex flex-col gap-4 items-center justify-center min-h-[70vh] md:min-h-screen">
          {/* Heading */}
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-extrabold text-white drop-shadow-glow text-center">
            Construction FAQs
          </motion.h2>

          {/* Tabs */}
          <div className="flex flex-col gap-2 w-full">
            {tabs.map((tab, index) => (
              <motion.div
                key={tab.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                className={`cursor-pointer p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id ? "bg-white/30" : ""
                }`}
                onClick={() => handleTabClick(tab.id)}>
                {tab.icon && <tab.icon className="w-5 h-5 text-white" />}
                <h3 className="text-base font-medium">{tab.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Box (Hidden on Mobile) */}
        <div className="hidden md:flex w-full md:w-4/5 items-center justify-center min-h-[50vh] md:min-h-screen">
          <BoxComponent
            activeTab={activeTab}
            tabs={tabs}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Modal for Mobile */}
        {activeTab && (
          <div className="md:hidden">
            <ModalComponent
              activeTab={activeTab}
              tabs={tabs}
              setActiveTab={setActiveTab}
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevSection}
          className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Scroll to previous section"
          disabled={activeSection <= 0}
        >
          <FaArrowUp size={22} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextSection}
          className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Scroll to next section"
        >
          <FaArrowDown size={22} />
        </motion.button>
      </div>
    </section>
  )
}
