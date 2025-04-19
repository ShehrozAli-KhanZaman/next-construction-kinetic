"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Background from "@/components/Background"
import { locations } from "@/lib/location"

const propertyTypes = ["Plot", "House"]

const dropdownVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const moreOptionsVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.3 } },
}

const rangeInputVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export default function PropertySearch() {
  const router = useRouter()
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    propertyType: "Plot",
    location: "",
    sizeRange: { min: "", max: "" },
    priceRange: { min: "", max: "" },
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRangeChange = (range, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [range]: { ...prev[range], [field]: value },
    }))
  }
  const handleSearch = () => {
    const path =
      formData.propertyType === "Plot"
        ? "/properties/plots"
        : "/properties/houses"

    const params = []

    params.push(`type=${formData.propertyType}`)

    if (formData.propertyType === "Plot" && formData.location) {
      params.push(`area=${encodeURIComponent(formData.location)}`)
    } else if (formData.location) {
      params.push(`house_location=${encodeURIComponent(formData.location)}`)
    }

    if (formData.sizeRange.min) {
      params.push(`min_size=${formData.sizeRange.min}`)
    }
    if (formData.sizeRange.max) {
      params.push(`max_size=${formData.sizeRange.max}`)
    }
    if (formData.priceRange.min) {
      params.push(`min_price=${formData.priceRange.min}`)
    }
    if (formData.priceRange.max) {
      params.push(`max_price=${formData.priceRange.max}`)
    }

    // Always add pool
    params.push(`pool=all`)

    const queryString = params.join("&")

    router.push(`${path}?${queryString}`)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Background type="GLOBE" color={0x1a1a1a} />
      {/* <div className="absolute inset-0 bg-black/50 z-0" /> */}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20 pb-15">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-xl font-bold text-center mb-5 text-white">
          Find Your Property
        </motion.h1>

        {/* Mobile View */}
        <div className="md:hidden w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-lg p-5 mb-40">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => handleChange("propertyType", e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                {propertyTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="text-black text-sm">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="" className="text-black text-sm">
                  Select Location
                </option>
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="text-black text-sm">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Min Size (sq ft)
                </label>
                <input
                  type="number"
                  value={formData.sizeRange.min}
                  onChange={(e) =>
                    handleRangeChange("sizeRange", "min", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Min size"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Max Size (sq ft)
                </label>
                <input
                  type="number"
                  value={formData.sizeRange.max}
                  onChange={(e) =>
                    handleRangeChange("sizeRange", "max", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Max size"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  value={formData.priceRange.min}
                  onChange={(e) =>
                    handleRangeChange("priceRange", "min", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Min price"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  value={formData.priceRange.max}
                  onChange={(e) =>
                    handleRangeChange("priceRange", "max", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Max price"
                />
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  "Find Properties"
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block w-full max-w-lg bg-white/10 backdrop-blur-md rounded-lg p-4 mb-40">
          <div className="flex items-center gap-5">
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              className="w-[20%]">
              <label className="block text-xs font-medium text-white mb-1">
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => handleChange("propertyType", e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-[12px]">
                {propertyTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                    className="text-black text-[12px]">
                    {type}
                  </option>
                ))}
              </select>
            </motion.div>
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              // className="w-1/3"
            >
              <label className="block text-xs font-medium text-white mb-1">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-[12px]">
                <option value="" className="text-black text-[12px]">
                  Select Location
                </option>
                {locations.map((loc) => (
                  <option
                    key={loc}
                    value={loc}
                    className="text-black text-[12px]">
                    {loc}
                  </option>
                ))}
              </select>
            </motion.div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="animated-hover-btn flex self-end justify-center items-center px-6 py-2 text-sm bg-[#33a137] text-white rounded-lg hover:bg-[#f7b928] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                <span>Find</span>
              )}
            </button>

            {/* <motion.button
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              onClick={handleSearch}
              className="px-6 py-2 text-sm bg-[#33a137] text-white rounded-lg hover:bg-[#f7b928] transition-colors duration-200 self-end">
              Find
            </motion.button> */}
          </div>

          <div className="mt-2 text-left">
            <motion.button
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="text-[10.5px] text-white hover:text-primary transition-colors duration-200">
              {showMoreOptions ? "🔼 Hide Options" : "🔽 More Options"}
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
                    // className="w-1/5"
                  >
                    <label className="block text-[11px] font-medium text-white mb-1">
                      Min Size
                    </label>
                    <input
                      type="number"
                      value={formData.sizeRange.min}
                      onChange={(e) =>
                        handleRangeChange("sizeRange", "min", e.target.value)
                      }
                      className="w-full p-2 text-[12px] bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Min"
                    />
                  </motion.div>
                  <motion.div
                    variants={rangeInputVariants}
                    initial="hidden"
                    animate="visible"
                    // className="w-1/5"
                  >
                    <label className="block text-[11px] font-medium text-white mb-1">
                      Max Size
                    </label>
                    <input
                      type="number"
                      value={formData.sizeRange.max}
                      onChange={(e) =>
                        handleRangeChange("sizeRange", "max", e.target.value)
                      }
                      className="w-full p-2 text-[12px] bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Max"
                    />
                  </motion.div>
                  <motion.div
                    variants={rangeInputVariants}
                    initial="hidden"
                    animate="visible"
                    // className="w-1/5"
                  >
                    <label className="block text-[11px] font-medium text-white mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      value={formData.priceRange.min}
                      onChange={(e) =>
                        handleRangeChange("priceRange", "min", e.target.value)
                      }
                      className="w-full p-2 text-[12px] bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Min"
                    />
                  </motion.div>
                  <motion.div
                    variants={rangeInputVariants}
                    initial="hidden"
                    animate="visible"
                    // className="w-1/5"
                  >
                    <label className="block text-[11px] font-medium text-white mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      value={formData.priceRange.max}
                      onChange={(e) =>
                        handleRangeChange("priceRange", "max", e.target.value)
                      }
                      className="w-full p-2 text-[12px] bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Max"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
