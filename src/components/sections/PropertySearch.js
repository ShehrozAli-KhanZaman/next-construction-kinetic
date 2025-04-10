"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ModernDropdown from "@/components/ModernDropdown"
import Image from "next/image"

const propertyTypes = [
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "plot", label: "Plot" },
]

const locations = [
  { value: "lahore", label: "Lahore" },
  { value: "karachi", label: "Karachi" },
  { value: "islamabad", label: "Islamabad" },
  { value: "rawalpindi", label: "Rawalpindi" },
]

export default function PropertySearch() {
  const [formData, setFormData] = useState({
    type: "buy",
    propertyType: "",
    location: "",
    sizeRange: { min: "", max: "" },
    priceRange: { min: "", max: "" },
  })
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRangeChange = (field, subField, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const backgroundVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  }

  const titleVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const buyButtonVariants = {
    hidden: { x: "20vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  }

  const rentButtonVariants = {
    hidden: { x: "-20vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  }

  const searchRowVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const dropdownVariants = {
    hidden: { scale: 0, rotate: -10 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const moreOptionsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  const rangeInputVariants = {
    hidden: { scale: 0, y: 20 },
    visible: {
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0">
        <Image
          src="/images/Background/bg1.jpg"
          alt="Property Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full md:w-[55%] h-auto md:h-[40%] flex flex-col">
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Find Your Perfect Property
          </motion.h1>

          <div className="flex justify-center gap-4 mb-6">
            <motion.button
              variants={rentButtonVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleChange("type", "rent")}
              className={`px-6 py-2 text-sm md:text-base rounded-full transition-all duration-100 shadow-lg ${
                formData.type === "rent"
                  ? "bg-primary text-white shadow-primary/50"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}>
              Rent
            </motion.button>
            <motion.button
              variants={buyButtonVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleChange("type", "buy")}
              className={`px-6 py-2 text-sm md:text-base rounded-full transition-all duration-100 shadow-lg ${
                formData.type === "buy"
                  ? "bg-primary text-white shadow-primary/50"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}>
              Buy
            </motion.button>
          </div>

          <motion.div
            variants={searchRowVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 w-full">
            {/* Mobile View */}
            <div className="flex flex-col items-center gap-4 md:hidden">
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                className="w-[80%]">
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Property Type
                </label>
                <ModernDropdown
                  options={propertyTypes}
                  value={formData.propertyType}
                  onChange={(value) => handleChange("propertyType", value)}
                  placeholder="Select Type"
                />
              </motion.div>
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                className="w-[80%]">
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <ModernDropdown
                  options={locations}
                  value={formData.location}
                  onChange={(value) => handleChange("location", value)}
                  placeholder="Select Location"
                />
              </motion.div>
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                className="w-[80%]">
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Min Size
                </label>
                <input
                  type="number"
                  value={formData.sizeRange.min}
                  onChange={(e) =>
                    handleRangeChange("sizeRange", "min", e.target.value)
                  }
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Min"
                />
              </motion.div>
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                className="w-[80%]">
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Size
                </label>
                <input
                  type="number"
                  value={formData.sizeRange.max}
                  onChange={(e) =>
                    handleRangeChange("sizeRange", "max", e.target.value)
                  }
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Max"
                />
              </motion.div>
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                className="w-[80%]">
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  value={formData.priceRange.min}
                  onChange={(e) =>
                    handleRangeChange("priceRange", "min", e.target.value)
                  }
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Min"
                />
              </motion.div>
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                className="w-[80%]">
                <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  value={formData.priceRange.max}
                  onChange={(e) =>
                    handleRangeChange("priceRange", "max", e.target.value)
                  }
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Max"
                />
              </motion.div>
              <motion.button
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                type="submit"
                className="w-[80%] px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200">
                Find
              </motion.button>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-1/4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Property Type
                  </label>
                  <ModernDropdown
                    options={propertyTypes}
                    value={formData.propertyType}
                    onChange={(value) => handleChange("propertyType", value)}
                    placeholder="Select Type"
                  />
                </motion.div>
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <ModernDropdown
                    options={locations}
                    value={formData.location}
                    onChange={(value) => handleChange("location", value)}
                    placeholder="Select Location"
                  />
                </motion.div>
                <motion.button
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  type="submit"
                  className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 self-end">
                  Find
                </motion.button>
              </div>

              <div className="mt-4 text-center">
                <motion.button
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="text-sm text-primary hover:text-primary-dark transition-colors duration-200">
                  {showMoreOptions ? "Hide Options" : "More Options"}
                </motion.button>
              </div>

              <AnimatePresence>
                {showMoreOptions && (
                  <motion.div
                    variants={moreOptionsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mt-4">
                    <div className="flex items-center gap-4">
                      <motion.div
                        variants={rangeInputVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-1/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Min Size
                        </label>
                        <input
                          type="number"
                          value={formData.sizeRange.min}
                          onChange={(e) =>
                            handleRangeChange(
                              "sizeRange",
                              "min",
                              e.target.value
                            )
                          }
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Min"
                        />
                      </motion.div>
                      <motion.div
                        variants={rangeInputVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-1/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Max Size
                        </label>
                        <input
                          type="number"
                          value={formData.sizeRange.max}
                          onChange={(e) =>
                            handleRangeChange(
                              "sizeRange",
                              "max",
                              e.target.value
                            )
                          }
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Max"
                        />
                      </motion.div>
                      <motion.div
                        variants={rangeInputVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-1/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Min Price
                        </label>
                        <input
                          type="number"
                          value={formData.priceRange.min}
                          onChange={(e) =>
                            handleRangeChange(
                              "priceRange",
                              "min",
                              e.target.value
                            )
                          }
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Min"
                        />
                      </motion.div>
                      <motion.div
                        variants={rangeInputVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-1/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Max Price
                        </label>
                        <input
                          type="number"
                          value={formData.priceRange.max}
                          onChange={(e) =>
                            handleRangeChange(
                              "priceRange",
                              "max",
                              e.target.value
                            )
                          }
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Max"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
