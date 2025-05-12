"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { useRouter } from "next/navigation"
import CardComponent from "../ui/CardComponent"
import { ShieldCheck, Workflow, Building2, Paintbrush2 } from "lucide-react"
import Image from "next/image"
import Lottie from "lottie-react"
import ModalComponent from "../ui/ModalComponent"
import { textSections } from "@/lib/utils"
export default function ConstructionDetails() {
  const tabs = textSections
  // [
  //   {
  //     id: "why",
  //     title: "Why Construction Kinetics?",
  //     description: [
  //       "Trusted construction services.",
  //       "Transparent and timely execution.",
  //       "Led by LUMS graduate Mr. Farhan.",
  //     ],
  //     image: "/images/Background/bg1.jpg",
  //     icon: ShieldCheck,
  //     fullDetails:
  //       "We ensure top-notch quality and timely delivery of your construction projects.",
  //     lotti: "/animations/man.json",
  //   },
  //   {
  //     id: "how",
  //     title: "How We Work",
  //     description: [
  //       "Understanding your needs.",
  //       "Custom budgets and schedules.",
  //       "Clear and frequent updates.",
  //     ],
  //     image: "/images/Background/bg4.jpg",
  //     icon: Workflow,
  //     fullDetails:
  //       "Our approach is collaborative and tailored to your unique needs, with a transparent workflow.",
  //     lotti: "/animations/how1.json",
  //   },
  //   {
  //     id: "grey-structure",
  //     title: "Grey Structure",
  //     description: [
  //       "Foundation to framework.",
  //       "Roofing and blockwork.",
  //       "Durable frame and base construction.",
  //     ],
  //     image: "/images/Background/bg7.jpg",
  //     icon: Building2,
  //     fullDetails:
  //       "The grey structure phase involves laying the foundation, building the frame, and installing the roof.",
  //     lotti: "/animations/mobbuild.json",
  //   },
  //   {
  //     id: "finishing",
  //     title: "Finishing",
  //     description: [
  //       "Electrical, plumbing, flooring.",
  //       "Interior woodworks.",
  //       "High-end interior finish quality.",
  //     ],
  //     image: "/images/Background/bg5.jpg",
  //     icon: Paintbrush2,
  //     fullDetails:
  //       "Finishing touches include electrical work, plumbing, flooring, and high-end interior woodworks.",
  //     lotti: "/animations/buildings.json",
  //   },
  // ]
  const [activeTab, setActiveTab] = useState()
  const particlesInit = async (main) => {
    await loadFull(main)
  }
  const router = useRouter()

  const handleTabClick = (tabId) => {
    // router.push(`/construction/${tabId}`)
  }
  // const [lottieData, setLottieData] = useState(null)

  // Inside the render block
  // useEffect(() => {
  //   const loadLottie = async () => {
  //     const tab = tabs.find((t) => t.id === activeTab)
  //     if (tab?.lotti) {
  //       const data = await fetch(tab.lotti)
  //       setLottieData(data.default)
  //     }
  //   }

  //   if (activeTab) {
  //     loadLottie()
  //   } else {
  //     setLottieData(null) // reset
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [activeTab])
  return (
    <section className="relative min-h-screen w-full text-white overflow-hidden flex items-center justify-center py-20 px-4">
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

      <div className="z-10 flex flex-col gap-3 md:gap-6 min-h-screen w-full pt-1 md:pt-10">
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
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-glow animate-pulse">
          🔆 Construction Kinetics 🔆
        </motion.h2>

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
