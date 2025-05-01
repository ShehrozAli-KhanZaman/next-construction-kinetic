"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { useRouter } from "next/navigation"
import CardComponent from "../ui/CardComponent"

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

  const bounceFadeInVertical = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: [0, -50, 0],
      transition: {
        opacity: { duration: 0.6, delay },
        y: {
          duration: 10,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    },
  })

  const bounceFadeInHorizontal = (delay = 0) => ({
    initial: { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: [0, -50, 0],
      transition: {
        opacity: { duration: 0.6, delay },
        x: {
          duration: 10,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    },
  })
  const bounceFadeInHorizontal1 = (delay = 0) => ({
    initial: { opacity: 0, x: 100, y: 100 },
    animate: {
      opacity: 1,
      x: [0, -100, 0],
      y: [0, -100, 0],
      transition: {
        opacity: { duration: 0.6, delay },
        x: {
          duration: 12,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        },
      },
    },
  })

  return (
    <section className="relative min-h-screen w-full text-white overflow-hidden p-6 flex flex-col justify-center pt-20">
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
      <div className="grid grid-cols-4 grid-rows-3 gap-6 max-w-7xl mx-auto w-full relative z-10">
        {/* Card 1: col 1 row 1 - from left */}
        <div className="col-start-1 row-start-1 w-full">
          <CardComponent
            tab={tabs[0]}
            setActiveTab={setActiveTab}
            cardVariants={cardVariants}
            activeTab={activeTab}
            animationVariants={bounceFadeInVertical(0)}
          />
        </div>

        {/* Card 2: col 3 row 1 - from bottom */}
        <div className="col-start-3 row-start-1 w-full">
          <CardComponent
            tab={tabs[1]}
            setActiveTab={setActiveTab}
            cardVariants={cardVariants}
            activeTab={activeTab}
            animationVariants={bounceFadeInHorizontal(1)}
          />
        </div>

        {/* Center Title (spanning row 2) */}
        <div className="col-span-4 row-start-2 flex justify-center items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="flex gap-1 justify-center"
            onAnimationComplete={() => setShimmer(true)}>
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
                className={`text-base md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-glow ${
                  shimmer ? "shimmer-effect" : ""
                }`}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Card 3: col 2 row 3 - from top */}
        <div className="col-start-2 row-start-3 w-full">
          <CardComponent
            tab={tabs[2]}
            setActiveTab={setActiveTab}
            cardVariants={cardVariants}
            activeTab={activeTab}
            animationVariants={bounceFadeInHorizontal1(0)}
          />
        </div>

        {/* Card 4: col 4 row 3 - from right */}
        <div className="col-start-4 row-start-3 w-full">
          <CardComponent
            tab={tabs[3]}
            setActiveTab={setActiveTab}
            cardVariants={cardVariants}
            activeTab={activeTab}
            animationVariants={bounceFadeInVertical(1)}
          />
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
