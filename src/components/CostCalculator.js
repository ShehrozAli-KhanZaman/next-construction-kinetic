"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const plotSizes = [
  { value: "3marla", label: "3 Marla (675 sq ft)", rate: 3200 },
  { value: "5marla", label: "5 Marla (1125 sq ft)", rate: 3100 },
  { value: "7marla", label: "7 Marla (1575 sq ft)", rate: 3050 },
  { value: "10marla", label: "10 Marla (2250 sq ft)", rate: 3000 },
  { value: "1kanal", label: "1 Kanal (4500 sq ft)", rate: 2900 },
]

const locations = [
  { value: "dhalahore", label: "DHA Lahore", multiplier: 1.2 },
  { value: "bahria", label: "Bahria Town", multiplier: 1.1 },
  { value: "gulberg", label: "Gulberg", multiplier: 1.15 },
  { value: "johar", label: "Johar Town", multiplier: 1.05 },
  { value: "modeltown", label: "Model Town", multiplier: 1.1 },
]

const packageTypes = [
  { value: "grey", label: "Grey Structure", multiplier: 0.6 },
  { value: "standard", label: "Standard Finishing", multiplier: 1.0 },
  { value: "premium", label: "Premium Finishing", multiplier: 1.3 },
  { value: "luxury", label: "Luxury Finishing", multiplier: 1.6 },
]

const CostCalculator = () => {
  const [plotSize, setPlotSize] = useState(plotSizes[0].value)
  const [location, setLocation] = useState(locations[0].value)
  const [packageType, setPackageType] = useState(packageTypes[0].value)
  const [floors, setFloors] = useState(1)
  const [cost, setCost] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const calculateCost = () => {
    const selectedPlot = plotSizes.find((p) => p.value === plotSize)
    const selectedLocation = locations.find((l) => l.value === location)
    const selectedPackage = packageTypes.find((p) => p.value === packageType)

    // Base calculation
    const baseSize =
      selectedPlot.rate * parseInt(selectedPlot.label.match(/\d+/)[0]) * 225 // marla to sq ft
    const locationMultiplier = selectedLocation.multiplier
    const packageMultiplier = selectedPackage.multiplier
    const floorMultiplier = 1 + (floors - 1) * 0.1 // 10% increase per additional floor

    const totalCost =
      baseSize * locationMultiplier * packageMultiplier * floorMultiplier

    setCost(totalCost)
    setShowResult(true)
  }

  const formVariants = {
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
    <section id="cost-calculator" className="py-20 section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 dark:text-white">
            Cost <span className="text-primary">Calculator</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get an instant estimation for your construction project based on
            your requirements
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={formVariants}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 bg-primary p-8 text-white flex flex-col justify-center">
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-4">
                Personalize Your Estimate
              </motion.h3>
              <motion.p variants={itemVariants} className="mb-6 text-white/80">
                Select your preferences to get an approximate cost estimation
                for your construction project.
              </motion.p>
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  <div>Select your plot size</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  <div>Choose your location</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  <div>Specify finishing requirements</div>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-3 p-8">
              <motion.div variants={formVariants} className="space-y-6">
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                      Plot Size
                    </label>
                    <select
                      value={plotSize}
                      onChange={(e) => setPlotSize(e.target.value)}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      {plotSizes.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                      Location
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      {locations.map((loc) => (
                        <option key={loc.value} value={loc.value}>
                          {loc.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                      Package Type
                    </label>
                    <select
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      {packageTypes.map((pkg) => (
                        <option key={pkg.value} value={pkg.value}>
                          {pkg.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                      Number of Floors
                    </label>
                    <select
                      value={floors}
                      onChange={(e) => setFloors(parseInt(e.target.value))}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-primary">
                      <option value={1}>1 Floor</option>
                      <option value={2}>2 Floors</option>
                      <option value={3}>3 Floors</option>
                      <option value={4}>4 Floors</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={calculateCost}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-md font-semibold shadow-md transition-colors duration-300">
                    Calculate Cost
                  </motion.button>
                </motion.div>
              </motion.div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-8 p-6 bg-gradient-to-r from-secondary/10 to-primary/10 dark:from-secondary/5 dark:to-primary/5 rounded-lg border border-secondary/20 dark:border-primary/20">
                  <h3 className="text-xl font-semibold mb-2 text-center text-gray-800 dark:text-white">
                    Estimated Construction Cost
                  </h3>
                  <div className="flex justify-center">
                    <div className="text-3xl font-bold text-primary dark:text-secondary">
                      Rs. {cost.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-300">
                    This is an approximate estimate and may vary based on
                    specific requirements and market conditions.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CostCalculator
