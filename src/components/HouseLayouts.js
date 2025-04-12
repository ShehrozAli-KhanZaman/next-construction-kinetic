"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Background from "@/components/Background"

const layouts = [
  {
    id: 1,
    title: "3 Marla Modern Design",
    description:
      "Contemporary 3 marla house design with efficient space utilization",
    image: "/images/layouts/3marla.jpg",
    features: [
      "2 Bedrooms",
      "1 Bathroom",
      "Kitchen",
      "Small Garden",
      "Living Room",
    ],
  },
  {
    id: 2,
    title: "5 Marla Classic Design",
    description: "Traditional 5 marla house layout with family-oriented spaces",
    image: "/images/layouts/5marla.jpg",
    features: [
      "3 Bedrooms",
      "2 Bathrooms",
      "Kitchen with Dining",
      "Drawing Room",
      "Small Courtyard",
    ],
  },
  {
    id: 3,
    title: "10 Marla Luxury Villa",
    description: "Luxurious 10 marla villa design with premium finishes",
    image: "/images/layouts/10marla.jpg",
    features: [
      "4 Bedrooms",
      "3 Bathrooms",
      "Modern Kitchen",
      "Drawing Room",
      "Dining Area",
      "Garden",
      "Car Parking",
    ],
  },
]

const HouseLayouts = () => {
  const [selectedLayout, setSelectedLayout] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const openLayout = (layout) => {
    setSelectedLayout(layout)
  }

  const closeLayout = () => {
    setSelectedLayout(null)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Background type="BIRDS" color={0x9b59b6} />
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          House Layouts
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-20 h-20 bg-secondary/20 dark:bg-secondary/10 rounded-full absolute -top-10 -left-10 lg:left-[15%] z-0"
          />

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-32 h-32 bg-primary/10 dark:bg-primary/5 rounded-full absolute -bottom-16 -right-10 lg:right-[15%] z-0"
          />

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4">
            Architectural Designs
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            House <span className="text-primary">Layout</span> Designs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our collection of carefully crafted architectural designs
            for different plot sizes
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {layouts.map((layout, index) => (
            <motion.div
              key={layout.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={layout.image}
                  alt={layout.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-white">
                    {layout.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {layout.description}
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {layout.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="inline-block text-xs px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {layout.features.length > 3 && (
                    <span className="inline-block text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      +{layout.features.length - 3} more
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openLayout(layout)}
                  className="w-full py-3 bg-secondary hover:bg-secondary/90 text-gray-900 rounded-md font-medium shadow-sm transition-colors duration-300">
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for layout details */}
      {selectedLayout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-full">
                <Image
                  src={selectedLayout.image}
                  alt={selectedLayout.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full mb-2">
                      House Layout
                    </span>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {selectedLayout.title}
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeLayout}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedLayout.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white flex items-center">
                    <span className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {selectedLayout.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600 dark:text-gray-300">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end mt-8">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={closeLayout}
                    className="px-6 py-2 bg-secondary hover:bg-secondary/90 text-gray-900 rounded-md font-medium shadow-sm">
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default HouseLayouts
