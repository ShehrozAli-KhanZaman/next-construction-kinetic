"use client"

import { useState } from "react"
import { useActiveSection } from "@/context/ActiveSectionContext"
import { FaArrowDown, FaArrowUp, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { motion } from "framer-motion"

const images = [
  "/images/Maps/Kanal/DHA/E-DHA-1K-1.jpg",
  "/images/Maps/Kanal/DHA/E-DHA-1K-2.jpg",
  "/images/Maps/Kanal/DHA/E-DHA-1K-3.jpg"
]

export default function PlanDesignBuild() {
  const { activeSection, setActiveSection, setScrollDirection } = useActiveSection()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevSection = () => {
    setScrollDirection("up")
    setActiveSection((prev) => prev - 1)
  }
  const handleNextSection = () => {
    setScrollDirection("down")
    setActiveSection((prev) => prev + 1)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-6 px-3 pt-12 md:pt-24">
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto relative z-10">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-2xl md:text-4xl font-extrabold text-center mb-4"
        >
          Plan. Design. Build.
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-center mb-4 max-w-2xl relative "
        >
          <span className="absolute inset-0 bg-black/60 rounded-lg -z-10"></span>
          <span className="relative z-10">
            From concept to completion, we offer expert architectural and construction services that turn your vision into reality.<br/>
            Modern designs, quality materials, and trusted craftsmanship.<br/>
            Smart planning, modern aesthetics, and flawless execution — made to impress, built to last.
          </span>
        </motion.p>
        

        
        {/* Desktop Images */}
        <div className="hidden md:flex flex-wrap justify-center gap-3 mb-3 w-full">
          {images.map((src, idx) => (
            <motion.img
              key={src}
              src={src}
              alt={`Plan Design Build ${idx+1}`}
              className="rounded-lg shadow-md object-cover w-64 h-40"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden w-full max-w-xs mb-4">
          <div className="relative">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Plan Design Build ${currentImageIndex + 1}`}
              className="w-full h-36 rounded-lg shadow-md object-cover"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Carousel Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <FaChevronRight size={14} />
            </button>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-2 gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Client Section */}
        <div className="flex items-center gap-4">
          <motion.img
            src="/images/Logo/Ceo.jpg"
            alt="Muhammad Farhan Ilyas"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <div className="flex flex-col">
            <motion.div
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span>Muhammad Farhan Ilyas</span>
            </motion.div>
            <motion.div
              className="flex justify-between items-center text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="text-white">MBA LUMS</span>
              <span className="text-orange-400">CEO - Realtor MFI</span>
            </motion.div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevSection}
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Scroll to previous section"
            disabled={activeSection <= 0}
          >
            <FaArrowUp size={22} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextSection}
            className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Scroll to next section"
          >
            <FaArrowDown size={22} />
          </motion.button>
        </div>
      </div>
    </section>
  )
} 