"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Background from "@/components/Background"

export default function ConstructionDetails() {
  const [activeTab, setActiveTab] = useState(null)

  const tabs = [
    {
      id: "why",
      title: "Why Construction Kinetics?",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Construction Kinetics is a trusted name in the housing Construction
            industry, committed to delivering excellence through transparency,
            quality, and timely project execution.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Under the leadership of Mr. Farhan Ilyas, a distinguished graduate
            of LUMS, the company has built a reputation for prioritizing client
            needs and requirements at every step.
          </p>
        </div>
      ),
    },
    {
      id: "how",
      title: "How We Work",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Our process begins with understanding your vision and requirements.
            We then develop a comprehensive plan that aligns with your budget
            and timeline.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Our team of experts ensures quality at every stage, from planning to
            execution, with regular updates and transparent communication.
          </p>
        </div>
      ),
    },
    {
      id: "grey-structure",
      title: "Grey Structure",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Our grey structure construction includes:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Foundation work</li>
            <li>Structural framework</li>
            <li>Brickwork and blockwork</li>
            <li>Plastering</li>
            <li>Roofing</li>
          </ul>
        </div>
      ),
    },
    {
      id: "finishing",
      title: "Finishing",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Our finishing services include:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Electrical work</li>
            <li>Plumbing</li>
            <li>Flooring</li>
            <li>Painting</li>
            <li>Woodwork</li>
          </ul>
        </div>
      ),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Background type="DOTS" color={0x2c3e50} />
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          Construction Details
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              variants={itemVariants}
              onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
              className={`p-4 rounded-lg text-center transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}>
              {tab.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              {tabs.find((tab) => tab.id === activeTab)?.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
