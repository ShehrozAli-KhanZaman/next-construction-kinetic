"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

const finishingSteps = [
  "False Ceiling",
  "Floor Tiles / Marble",
  "Washroom Tiles / Marble",
  "Interior Moulding / Design Work",
  "Elevation Tiles",
  "Lights Installations",
  "Wardrobes",
  "Doors",
  "Kitchen Cabinets and Accessories",
  "Exterior Paint / Rock Shield",
  "Paint & Polish",
]

export default function Finishing() {
  const [showFull, setShowFull] = useState(false)
  return (
    <section
      className="relative min-h-screen bg-gradient-to-br  flex flex-col items-center justify-center text-center py-0 px-0 sm:py-6 sm:px-6 md:py-12 md:px-12 lg:py-20 lg:px-20"
      id="finishing">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full space-y-10">
        <h2 className="text-5xl font-extrabold text-white tracking-tight">
          Finishing
        </h2>

        <div className="text-left text-gray-600 leading-relaxed">
          <p>
            The finishing phase of house construction is a meticulous process
            that transforms the grey structure into a functional, aesthetically
            refined, and habitable space.
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
                  This stage includes detailed plastering, precise flooring
                  installation, painting, and the addition of fixtures and
                  fittings. Smooth plastering and surface leveling prepare walls
                  and ceilings for final treatments, ensuring a flawless
                  foundation for paint, wallpaper, or textured finishes.
                </p>
                <p>
                  Premium flooring materials such as marble, granite, tiles, or
                  hardwood are installed with precision, enhancing both
                  durability and visual appeal.
                </p>
                <p>
                  Doors, windows, and cabinetry are installed with a focus on
                  alignment, durability, and aesthetic coherence. Decorative
                  moldings, skirting, and customized finishes bring a cohesive
                  and elegant look to the interiors.
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

        {/* Process Steps */}
        <div className="text-left">
          <h3 className="text-3xl font-semibold text-white mb-6">
            Key Finishing Steps:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {finishingSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl px-4 py-6 shadow-md transition-colors duration-300">
                {step}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="text-center text-gray-300 mt-12">
          <h3 className="text-3xl font-semibold text-white">
            Quality Assurance & Handover
          </h3>
          <p className="mt-3">
            Before final delivery, we conduct rigorous quality checks to ensure
            everything meets our high standards and your satisfaction.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
