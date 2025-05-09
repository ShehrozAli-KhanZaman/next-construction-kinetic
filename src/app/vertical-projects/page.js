// app/vertical-projects/page.js
"use client"

import { Building2 } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    name: "Gold Crest",
    location: "DHA, Lahore",
    description: "Luxury high-rise living in the heart of DHA.",
  },
  {
    name: "Springs",
    location: "Canal Bank, Lahore",
    description: "Contemporary apartments with state-of-the-art amenities.",
  },
  {
    name: "Penta Square",
    location: "Phase 5, DHA, Lahore",
    description: "Upscale residential and commercial vertical community.",
  },
  {
    name: "New Life Residencies",
    location: "Johar Town, Lahore",
    description: "Affordable vertical lifestyle with modern comforts.",
  },
  {
    name: "Defence View Apartments",
    location: "Defence Road, Lahore",
    description: "Elegant apartments with peaceful surroundings.",
  },
]

export default function VerticalProjectsPage() {
  return (
    <div className="min-h-screen px-6 pt-28 pb-12 bg-gray-100 dark:bg-[#0f0f0f] transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Vertical Projects in Lahore
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition duration-300">
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">
                {project.name}
              </h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              📍 {project.location}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {project.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
