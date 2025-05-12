"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import CardComponent from "../ui/CardComponent"
import ModalComponent from "../ui/ModalComponent"
import { textSections } from "@/lib/utils"
import Image from "next/image"
export default function ConstructionDetails() {
  const tabs = textSections
  const [activeTab, setActiveTab] = useState()
  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const handleTabClick = (tabId) => {
    // router.push(`/construction/${tabId}`)
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

      <div className="z-10 flex flex-col gap-3 md:gap-6 min-h-screen w-full pt-5 md:pt-10">
        {/* Top Row */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}>
            <CardComponent
              tab={tabs[0]}
              setActiveTab={setActiveTab}
              onCardClick={handleTabClick}
            />
          </motion.div>

          <motion.div
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}>
            <CardComponent
              tab={tabs[1]}
              setActiveTab={setActiveTab}
              onCardClick={handleTabClick}
            />
          </motion.div>
        </div>

        {/* Central Title */}
        <div className="flex flex-row items-center justify-center gap-2 md:gap-4 h-[10vh]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r  rounded-lg blur-md opacity-70"></div>
            <Image
              src="/images/Logo/CK/constructionKinetics.svg"
              alt="Construction Kinetics"
              width={80}
              height={80}
              className="rounded-lg shadow-lg relative"
            />
          </motion.div>
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-base md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-glow animate-pulse">
            Construction Kinetics
          </motion.h2>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}>
            <CardComponent
              tab={tabs[2]}
              setActiveTab={setActiveTab}
              onCardClick={handleTabClick}
            />
          </motion.div>

          <motion.div
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}>
            <CardComponent
              tab={tabs[3]}
              setActiveTab={setActiveTab}
              onCardClick={handleTabClick}
            />
          </motion.div>
        </div>
      </div>

      {activeTab && (
        <ModalComponent
          activeTab={activeTab}
          tabs={tabs}
          setActiveTab={setActiveTab}
        />
      )}
    </section>
  )
}
