"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Background from "@/components/Background"
import { saveAs } from "file-saver"

const layouts = [
  {
    id: 1,
    size: "3 Marla",
    title: "3 Marla Modern Design",
    description:
      "Contemporary 3 marla house design with efficient space utilization",
    image: "/images/layouts/3marla.jpg",
    pdf: "/pdfs/3marla.pdf",
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
    size: "5 Marla",
    title: "5 Marla Classic Design",
    description: "Traditional 5 marla house layout with family-oriented spaces",
    image: "/images/layouts/5marla.jpg",
    pdf: "/pdfs/5marla.pdf",
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
    size: "10 Marla",
    title: "10 Marla Luxury Villa",
    description: "Luxurious 10 marla villa design with premium finishes",
    image: "/images/layouts/10marla.jpg",
    pdf: "/pdfs/10marla.pdf",
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

  // Commented size filtering logic
  /*
  const [selectedSize, setSelectedSize] = useState("All")
  const sizes = ["All", "3 Marla", "5 Marla", "10 Marla"]
  const filteredLayouts = selectedSize === "All" ? layouts : layouts.filter((l) => l.size === selectedSize)
  */
  const filteredLayouts = layouts // Using full layout list since size filter is disabled

  useEffect(() => {
    document.body.style.overflow = selectedLayout ? "hidden" : "auto"
    const handleEsc = (e) => {
      if (e.key === "Escape") closeLayout()
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [selectedLayout])

  const openLayout = (layout) => setSelectedLayout(layout)
  const closeLayout = () => setSelectedLayout(null)

  const handleDownload = (layout) => {
    saveAs(layout.pdf, `${layout.title}.pdf`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* <Background type="BIRDS" color={0x9b59b6} /> */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xs font-bold text-center mb-6 text-white uppercase tracking-wider">
          House Layouts
        </motion.h1>

        {/* Dropdown removed for now */}
        {/* 
        <div className="mb-4">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="text-sm px-3 py-2 rounded-md bg-white shadow-md">
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        */}

        {/* Responsive Grid: row on desktop, list on mobile */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto px-4">
          {filteredLayouts.map((layout, index) => (
            <motion.div
              key={layout.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -5, scale: 1.02, filter: "brightness(1.05)" }}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-300"
              onClick={() => openLayout(layout)}>
              <div className="relative h-32 md:h-40">
                <Image
                  src={layout.image}
                  alt={layout.title}
                  fill
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="/images/layouts/placeholder.jpg"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                  {layout.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                  {layout.description}
                </p>
                <div className="flex gap-1 flex-wrap mb-2">
                  {layout.features.slice(0, 2).map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {layout.features.length > 2 && (
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      +{layout.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal section remains unchanged */}
      {selectedLayout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLayout()
          }}
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
                  priority
                  placeholder="blur"
                  blurDataURL="/images/layouts/placeholder.jpg"
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

                <div className="flex justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDownload(selectedLayout)}
                    className="px-6 py-2 bg-primary text-white rounded-md font-medium shadow-sm hover:bg-primary/80 transition">
                    Download PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={closeLayout}
                    className="px-6 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 rounded-md font-medium shadow-sm">
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
