"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Hammer,
  Wrench,
  Droplets,
  Paintbrush,
  Ruler,
  ToyBrick,
  Building,
  Layers3,
  Lightbulb,
  Plug,
  ShowerHead,
  Sofa,
  DoorOpen,
  Fan,
} from "lucide-react"
import Image from "next/image"
import { steps, textSections } from "@/lib/utils"

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

const Card = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleReadMore = () => setExpanded(!expanded)
  const truncated = content?.split(" ").slice(0, 50).join(" ") + "..."

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={1}
      variants={sectionVariants}
      className="bg-[#1e1e1e]/70 border border-white/10 backdrop-blur-lg text-white rounded-2xl shadow-xl p-6 md:p-8 my-8 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-300 text-sm md:text-base whitespace-pre-line leading-relaxed">
        {expanded ? content : truncated}
      </p>
      <button
        onClick={toggleReadMore}
        className="text-emerald-400 text-xs mt-3 hover:underline">
        {expanded ? "Read Less" : "Read More"}
      </button>
    </motion.div>
  )
}

const stepIcons = {
  grey: [Hammer, Wrench, Ruler, ToyBrick, Layers3, Building, Lightbulb, Plug],
  finishing: [
    Droplets,
    Paintbrush,
    ShowerHead,
    Sofa,
    DoorOpen,
    Fan,
    Lightbulb,
    Plug,
  ],
}

const StepCard = ({ step, index, section }) => {
  const Icon = stepIcons[section]?.[index] || CheckCircle
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="flex flex-col items-center bg-[#1c1c1c] border border-white/10 rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-center">
      <Icon className="text-green-400 mb-3" size={24} />
      <p className="text-sm text-gray-300">{step}</p>
    </motion.div>
  )
}

const StepsGrid = ({ title, items, section }) => (
  <section className="max-w-6xl mx-auto my-10 px-4">
    <motion.h3
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-xl md:text-2xl font-semibold text-white mb-6 text-center">
      {title}
    </motion.h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {items.map((step, i) => (
        <StepCard key={i} step={step} index={i} section={section} />
      ))}
    </div>
  </section>
)

export default function RealtorMFI({ params }) {
  const { tabId } = params
  const section = textSections.find((sec) => sec.id === tabId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getImageSrc = () => {
    switch (section?.title) {
      case "Grey Structure":
        return "/images/Background/bg7.jpg"
      case "Finishing":
        return "/images/Background/bg6.jpg"
      case "How We Work":
        return "/images/Background/bg5.jpg"
      default:
        return "/images/Background/bg1.jpg"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#121212] to-[#1a1a1a] text-white px-4 md:px-16 py-16">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-12 mb-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300">
            Build Better with Realtor MFI
          </h1>
          <p className="text-gray-400 mt-4 text-sm md:text-base max-w-md">
            High-quality housing construction backed by trust, transparency, and
            innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-lg border border-white/10 mx-auto">
          <Image
            src={getImageSrc()}
            alt="Construction"
            width={600}
            height={400}
            className="object-cover w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Main Description */}
      <Card
        title={section?.title || "Realtor MFI"}
        content={section?.content || ""}
      />

      {/* Steps Section */}
      {section?.title === "Grey Structure" && (
        <StepsGrid
          title="Grey Structure Steps"
          items={steps.grey}
          section="grey"
        />
      )}
      {section?.title === "Finishing" && (
        <StepsGrid
          title="Finishing Steps"
          items={steps.finishing}
          section="finishing"
        />
      )}
    </main>
  )
}
