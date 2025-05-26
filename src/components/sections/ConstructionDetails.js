"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import BoxComponent from "../ui/BoxComponent"
import ModalComponent from "../ui/ModalComponent"
import { textSections } from "@/lib/utils"
import Image from "next/image"

export default function ConstructionDetails() {
  const tabs = textSections
  const [activeTab, setActiveTab] = useState(tabs[0].id)

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <section className="relative min-h-screen w-full text-white overflow-hidden flex items-center justify-center py-10 px-4">
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
        <div className="w-full md:w-1/5 flex flex-col gap-4 items-center justify-center min-h-[50vh] md:min-h-screen">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg blur-md opacity-70"></div>
              <Image
                src="/images/Logo/LogoTransparent.png"
                alt="Construction Kinetics"
                width={100}
                height={100}
                className="rounded-lg shadow-lg relative"
              />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-glow animate-pulse text-center">
            Planning house construction?
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
    </section>
  )
}
