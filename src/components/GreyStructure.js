"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function GreyStructure() {
  const [showFull, setShowFull] = useState(false)

  return (
    <section
      className="relative min-h-screen bg-gradient-to-br flex flex-col items-center justify-center text-center py-0 px-0 sm:py-6 sm:px-6 md:py-12 md:px-12 lg:py-20 lg:px-20"
      id="grey-structure">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full space-y-8">
        <h2 className="text-5xl font-extrabold text-gray-600 tracking-tight">
          Grey Structure
        </h2>

        <div className="space-y-1">
          <p className="text-lg text-gray-500">
            <a href="tel:+923204300002" className="hover:text-gray-700">
              Construction Kinetics: 0320 430 0002
            </a>
          </p>
          <p className="text-lg text-gray-500">
            <a
              href="https://realtormfi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors">
              RealtorMfi.com
            </a>
          </p>
        </div>

        <div className="text-left text-gray-600 leading-relaxed">
          <p>
            The grey structure construction of a house is the most critical
            phase of the building process, as it establishes the structural
            integrity and durability of the entire project.
          </p>

          <AnimatePresence>
            {showFull && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden mt-4 space-y-4 text-gray-500">
                <p>
                  This stage includes the construction of the foundation, walls,
                  columns, beams, slabs, staircases, and the roof, using
                  high-quality materials such as reinforced concrete, bricks,
                  and cement.
                </p>
                <p>
                  The process begins with detailed planning, site preparation,
                  and excavation, followed by laying the foundation with
                  precision to ensure load distribution and stability.
                </p>
                <p>
                  Rough plastering is applied to the walls to protect against
                  environmental factors and prepare surfaces for future
                  finishes. Attention to engineering standards and quality
                  control ensures long-term resilience.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowFull(!showFull)}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
            {showFull ? "Read Less" : "Read More"}
          </button>
        </div>

        <div className="w-full mt-12 text-left">
          <h3 className="text-3xl font-semibold text-gray-600 mb-6">
            Construction Steps:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Foundation Digging",
              "DPC Level & Foundation Filling",
              "Brick Work & Door Frames",
              "Slab Pouring",
              "Electric & Plumbing Works",
              "Safety Grills & Main Gate",
              "Plaster",
              "Moulding Design Work",
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <span className="text-lg font-medium text-gray-700">
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
