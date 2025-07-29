"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { locations } from "@/lib/location"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SelectableButtonGroup from "../ui/SelectableButtonGroup"
import LocationSelect from "../LocationSelectProp"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { useActiveSection } from "@/context/ActiveSectionContext"

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
  const { activeSection, setActiveSection, setScrollDirection } = useActiveSection()
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showMobileOptions, setShowMobileOptions] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(1)
  const [formData, setFormData] = useState({
    propertyType: "Plot",
    location: "",
    sizeRange: { min: "", max: "" },
    priceRange: { min: "0", max: "90000000000000000" },
  })
  const [displaySizeRange, setDisplaySizeRange] = useState({ min: "", max: "" })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const locationOptions = locations.map((loc) => ({ label: loc, value: loc }))

  const handleRangeChange = (range, field, value) => {
    if (range === "sizeRange") {
      // Update display value (what user sees)
      setDisplaySizeRange((prev) => ({
        ...prev,
        [field]: value,
      }))
      
      // Convert marla to square feet and update form data (what gets saved)
      let convertedValue = value
      if (value) {
        convertedValue = (parseFloat(value) * 225).toString()
      }
      
      setFormData((prev) => ({
        ...prev,
        [range]: { ...prev[range], [field]: convertedValue },
      }))
    } else {
      // For other ranges (price), use the value as is
      setFormData((prev) => ({
        ...prev,
        [range]: { ...prev[range], [field]: value },
      }))
    }
  }
  const handleSearch = () => {
    setLoading(true)
    try {
      let path =
        formData.propertyType === "Plot"
          ? "/properties/plots"
          : "/properties/houses"

      if (selectedId === 2) {
        path =
          formData.propertyType === "Plot"
            ? "/properties/rent"
            : "/properties/rent"
      }

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

      params.push(`pool=all`)

      const queryString = params.join("&")

      router.push(`${path}?${queryString}`)
    } catch (error) {
      toast.error("Please Try Again!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } finally {
      setLoading(false)
    }
  }
  const handleOptionA = () =>
    new Promise(() => {
      setSelectedId(1)
    })

  const handleOptionB = () =>
    new Promise(() => {
      setSelectedId(2)
      handleChange("propertyType", "House")
    })

  const handleOptionC = () =>
    new Promise((resolve) => {
      console.log("Option C selected")
      setTimeout(resolve, 1000)
    })

  const buttons = [
    { id: 1, label: "BUY", onPress: handleOptionA },
    { id: 2, label: "RENT", onPress: handleOptionB },
  ]
  const handleFilterChange = (filter) => {
    handleChange("location", filter)
  }

  const handlePrevSection = () => {
    setScrollDirection("up")
    setActiveSection((prev) => prev - 1)
  }
  const handleNextSection = () => {
    setScrollDirection("down")
    setActiveSection((prev) => prev + 1)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20 pb-15">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-xl font-bold text-center mb-5 text-white">
          Find Your Property
        </motion.h1>

        <div className="bg-black flex justify-center items-center">
          <SelectableButtonGroup buttons={buttons} initialSelectedId={1} />
        </div>

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
                className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm max-w-[275px]"
                disabled={selectedId === 2}>
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

            <LocationSelect onChange={handleFilterChange} />
            {/* <div>
              <label className="block text-xs font-medium text-white mb-1">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                <option value="" className="text-black text-sm">
                  Select Location
                </option>
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="text-black text-sm">
                    {loc}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="text-left">
              <motion.button
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setShowMobileOptions((v) => !v)}
                className="text-[10.5px] text-white hover:text-primary transition-colors duration-200">
                {showMobileOptions ? "🔼 Hide Options" : "🔽 More Options"}
              </motion.button>
            </div>

            {showMobileOptions && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">
                      Min Size (marla)
                    </label>
                    <input
                      type="number"
                      value={displaySizeRange.min}
                      onChange={(e) =>
                        handleRangeChange("sizeRange", "min", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="Min marla"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">
                      Max Size (marla)
                    </label>
                    <input
                      type="number"
                      value={displaySizeRange.max}
                      onChange={(e) =>
                        handleRangeChange("sizeRange", "max", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="Max marla"
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
              </>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="animated-hover-btn flex self-center justify-center items-center px-6 py-2 text-sm bg-[#33a137] text-white rounded-lg hover:bg-[#f7b928] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-2 w-2 border-t-2 border-b-2 border-white"></div>
                    <span>finding...</span>
                  </div>
                ) : (
                  <span>Find</span>
                )}
              </button>
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
                className="w-full px-3 py-2 bg-transparent border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary text-[12px]"
                disabled={selectedId === 2}>
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
            <LocationSelect onChange={handleFilterChange} />
            {/* <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible">
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
            </motion.div> */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className="animated-hover-btn flex self-end justify-center items-center px-6 py-2 text-sm bg-[#33a137] text-white rounded-lg hover:bg-[#f7b928] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-2 w-2 border-t-2 border-b-2 border-white"></div>
                  <span>finding...</span>
                </div>
              ) : (
                <span>Find</span>
              )}
            </button>
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
                    animate="visible">
                    <label className="block text-[11px] font-medium text-white mb-1">
                      Min Size (marla)
                    </label>
                    <input
                      type="number"
                      value={displaySizeRange.min}
                      onChange={(e) =>
                        handleRangeChange("sizeRange", "min", e.target.value)
                      }
                      className="w-full p-2 text-[12px] bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Min marla"
                    />
                  </motion.div>
                  <motion.div
                    variants={rangeInputVariants}
                    initial="hidden"
                    animate="visible">
                    <label className="block text-[11px] font-medium text-white mb-1">
                      Max Size (marla)
                    </label>
                    <input
                      type="number"
                      value={displaySizeRange.max}
                      onChange={(e) =>
                        handleRangeChange("sizeRange", "max", e.target.value)
                      }
                      className="w-full p-2 text-[12px] bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Max marla"
                    />
                  </motion.div>
                  <motion.div
                    variants={rangeInputVariants}
                    initial="hidden"
                    animate="visible">
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
                    animate="visible">
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

        {/* Navigation Buttons */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextSection}
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg"
            aria-label="Scroll to next section"
          >
            <FaArrowDown size={22} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "0.375rem",
    padding: "2px 6px",
    fontSize: "12px",
    color: "white",
    boxShadow: state.isFocused ? "0 0 0 2px var(--tw-ring-color)" : "none",
    "&:hover": {
      borderColor: "rgba(255, 255, 255, 0.4)",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 2000,
    backgroundColor: "white",
    color: "black",
    fontSize: "12px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
    color: "black",
    fontSize: "12px",
    cursor: "pointer",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
    fontSize: "12px",
  }),
  placeholder: (base) => ({
    ...base,
    color: "white",
    fontSize: "12px",
  }),
}
