"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Tilt from "react-parallax-tilt"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import Background from "../Background"
import { useRouter } from "next/navigation"

export default function ConstructionDetails() {
  const [activeTab, setActiveTab] = useState()
  const [shimmer, setShimmer] = useState(false)

  const tabs = [
    {
      id: "why",
      title: "Why Construction Kinetics?",
      description: [
        "Trusted construction services.",
        "Transparent and timely execution.",
        "Led by LUMS graduate Mr. Farhan.",
      ],
      image: "/images/why-construction.jpg", // Example image
      fullDetails:
        "We ensure top-notch quality and timely delivery of your construction projects.",
    },
    {
      id: "how",
      title: "How We Work",
      description: [
        "Understanding your needs.",
        "Custom budgets and schedules.",
        "Clear and frequent updates.",
      ],
      image: "/images/how-we-work.jpg", // Example image
      fullDetails:
        "Our approach is collaborative and tailored to your unique needs, with a transparent workflow.",
    },
    {
      id: "grey-structure",
      title: "Grey Structure",
      description: [
        "Foundation to framework.",
        "Roofing and blockwork.",
        "Durable base construction.",
      ],
      image: "/images/grey-structure.jpg", // Example image
      fullDetails:
        "The grey structure phase involves laying the foundation, building the frame, and installing the roof.",
    },
    {
      id: "finishing",
      title: "Finishing",
      description: [
        "Electrical, plumbing, flooring.",
        "Interior woodworks.",
        "High-end finish quality.",
      ],
      image: "/images/finishing.jpg", // Example image
      fullDetails:
        "Finishing touches include electrical work, plumbing, flooring, and high-end interior woodworks.",
    },
  ]

  const cardVariants = {
    initial: { scale: 1, rotateX: 0, rotateY: 0 },
    hover: { scale: 1.05, rotateX: -5, rotateY: 5 },
    tap: { scale: 0.95 },
  }

  const particlesInit = async (main) => {
    await loadFull(main)
  }
  const router = useRouter()

  const handleTabClick = (tabId) => {
    router.push(`/construction/${tabId}`)
  }

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900 text-white overflow-hidden p-6 flex flex-col justify-center pt-20">
      {/* <Background type="DOTS" color={0x2c3e50} /> */}
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

      {/* Cards Grid */}
      <div className="flex flex-col gap-6 md:gap-14 relative z-10 w-full max-w-7xl mx-auto">
        {/* First Row */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-14">
          {/* {tabs.slice(0, 2).map((tab) => (
            <Tilt
              key={tab.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              className="flex-1">
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() =>
                  setActiveTab(activeTab === tab.id ? null : tab.id)
                }
                className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
               
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                </div>

                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {tab.title}
                </h2>
                <div className="text-xs md:text-sm text-gray-200 space-y-1">
                  {tab.description
                    .slice(0, 2) // show only 2 points by default
                    .map((line, idx) => (
                      <p key={idx} className="block md:hidden">
                        {line}
                      </p>
                    ))}
                  {tab.description.map((line, idx) => (
                    <p key={idx} className="hidden md:block">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))} */}
          {tabs.slice(0, 2).map((tab) => (
            <Tilt
              key={tab.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              className="flex-1">
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  setActiveTab(activeTab === tab.id ? null : tab.id)
                  handleTabClick(tab.id)
                }}
                className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-animated"></div>

                {/* Shine */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                </div>

                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {tab.title}
                </h2>
                <div className="text-xs md:text-sm text-gray-200 space-y-1">
                  {tab.description.slice(0, 2).map((line, idx) => (
                    <p key={idx} className="block md:hidden">
                      {line}
                    </p>
                  ))}
                  {tab.description.map((line, idx) => (
                    <p key={idx} className="hidden md:block">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
        {/* Center Title */}
        <div className="flex items-center justify-center overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1, // Letters appear one by one like bricks
                },
              },
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="flex gap-1 justify-center" // Ensures the text is centered
            onAnimationComplete={() => setShimmer(true)} // Trigger shimmer effect once brick animation is done
          >
            {"Construction Kinetics".split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className={`text-lg md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-glow ${
                  shimmer ? "shimmer-effect" : ""
                }`} // Keep shimmer effect only if completed
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-14">
          {tabs.slice(2, 4).map((tab) => (
            <Tilt
              key={tab.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              className="flex-1">
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() =>
                  setActiveTab(activeTab === tab.id ? null : tab.id)
                }
                className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                </div>

                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {tab.title}
                </h2>
                <div className="text-xs md:text-sm text-gray-200 space-y-1">
                  {tab.description
                    .slice(0, 2) // show only 2 points by default
                    .map((line, idx) => (
                      <p key={idx} className="block md:hidden">
                        {line}
                      </p>
                    ))}
                  {tab.description.map((line, idx) => (
                    <p key={idx} className="hidden md:block">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
          {/* {tabs.slice(2, 4).map((tab) => (
            <Tilt
              key={tab.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              className="flex-1">
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() =>
                  setActiveTab(activeTab === tab.id ? null : tab.id)
                }
                className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">

                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-animated"></div>

                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                </div>

                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {tab.title}
                </h2>
                <div className="text-xs md:text-sm text-gray-200 space-y-1">
                  {tab.description
                    .slice(0, 2) // show only 2 points by default
                    .map((line, idx) => (
                      <p key={idx} className="block md:hidden">
                        {line}
                      </p>
                    ))}
                  {tab.description.map((line, idx) => (
                    <p key={idx} className="hidden md:block">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))} */}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            key="expanded-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 w-11/12 md:w-1/2 bg-white/90 text-gray-900 p-8 rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-md border border-gray-200">
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-3 right-5 text-gray-500 hover:text-black text-xl">
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {tabs.find((tab) => tab.id === activeTab)?.title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Full details about &quot;
              {tabs.find((tab) => tab.id === activeTab)?.title}&quot; will
              appear here.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
