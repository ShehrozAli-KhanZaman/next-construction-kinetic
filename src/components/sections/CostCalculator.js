"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Background from "@/components/Background"
import emailjs from "emailjs-com"
import Link from "next/link"

export default function CostCalculator() {
  const [formData, setFormData] = useState({
    houseSize: "",
    location: "dha",
    floors: "1-floor",
    beds: "2-beds",
    baths: "2-baths",
    kitchens: "1-kitchen",
    type: "single-family",
    finishings: "basic",
    notes: "",
    phone: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)

    const templateParams = {
      houseSize: formData.houseSize,
      location: formData.location,
      floors: formData.floors,
      beds: formData.beds,
      baths: formData.baths,
      kitchens: formData.kitchens,
      type: formData.type,
      finishings: formData.finishings,
      notes: formData.notes,
      phone: formData.phone,
    }

    try {
      const result = await emailjs.send(
        "service_nar3pyc", // Service ID
        "template_9gbai9h", // Template ID
        templateParams,
        "OPtAKYuroNBRiNBLT" // Public Key
      )
      console.log("Email successfully sent!", result.text)
    } catch (error) {
      console.error("Email send error:", error)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* <Background type="NET" color={0x3498db} /> */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center  px-4 md:px-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Form Section */}
          {/* Left Quotation Form Section */}
          <div className="w-full md:w-1/2 relative p-4 md:p-6 max-h-[90vh] overflow-auto flex flex-col justify-center items-center">
            {/* Background Glow */}
            <motion.div
              className="absolute w-72 h-72 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-3xl rounded-full -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Get a Quotation
            </motion.h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-8">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Request Submitted
                </h2>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  We will get back to you shortly with a detailed quotation.
                </p>
                <Link href="https://realtormfi.com/">
                  <button className="mt-4 px-6 py-2 text-sm font-medium text-white bg-green-600 dark:bg-green-700 rounded-full hover:bg-green-500 dark:hover:bg-green-600 transition-colors duration-300">
                    Back to Home
                  </button>
                </Link>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                className="space-y-4 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    {
                      label: "House Size",
                      name: "houseSize",
                      options: [
                        "3 Marla",
                        "5 Marla",
                        "8 Marla",
                        "10 Marla",
                        "1 Kanal",
                        "2 Kanal",
                      ],
                    },
                    {
                      label: "Location",
                      name: "location",
                      options: [
                        "DHA",
                        "LDA",
                        "Bahria Town",
                        "Gulberg",
                        "Cooperative society",
                      ],
                    },
                    {
                      label: "Number of Floors",
                      name: "floors",
                      options: ["1 Floor", "2 Floors", "3 Floors", "4 Floors"],
                    },
                    {
                      label: "Number of Beds",
                      name: "beds",
                      options: [
                        "2 Beds",
                        "3 Beds",
                        "4 Beds",
                        "5 Beds",
                        "6 Beds",
                        "7 Beds",
                        "8 Beds",
                        "9 Beds",
                        "10 Beds",
                      ],
                    },
                    {
                      label: "Number of Baths",
                      name: "baths",
                      options: ["2 Baths", "3 Baths", "4 Baths", "5 Baths"],
                    },
                    {
                      label: "Number of Kitchens",
                      name: "kitchens",
                      options: ["1 Kitchen", "2 Kitchens", "3 Kitchens"],
                    },
                    {
                      label: "Type",
                      name: "type",
                      options: ["Single Family", "Duplex"],
                    },
                    {
                      label: "Finishing",
                      name: "finishings",
                      options: ["Basic", "Standard", "Premium", "Luxury"],
                    },
                  ].map((field) => (
                    <div key={field.name} className="col-span-1">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {field.label}
                      </label>
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.name === "houseSize"}
                        className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option value="">
                          {field.name === "houseSize"
                            ? `Select ${field.label}`
                            : "Select an option"}
                        </option>
                        {field.options.map((opt) => (
                          <option
                            key={opt}
                            value={opt.toLowerCase().replace(/\s/g, "-")}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional Notes
                    </label>
                    <input
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter some additional notes"
                      className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                      className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs bg-primary hover:bg-primary-dark text-white rounded-md font-medium transition-all duration-300">
                    Get Quotation
                  </button>
                </motion.div>
              </motion.form>
            )}
          </div>

          {/* Right Info Section - Hidden on mobile */}
          <div className="hidden md:flex w-full md:w-1/2 relative bg-gray-100 dark:bg-gray-900 p-6 md:p-8 flex-col justify-center items-center text-center max-h-[90vh] overflow-hidden">
            {/* Decorative Background Glow Ring */}
            <motion.div
              className="absolute w-72 h-72 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 opacity-30 blur-3xl rounded-full -z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            {/* Floating content card */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8 max-w-md"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}>
              <motion.h3
                className="text-2xl font-extrabold text-gray-800 dark:text-white mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}>
                Why Choose Us?
              </motion.h3>
              <motion.p
                className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}>
                Get instant quotes based on accurate specifications. Our team
                will reach out with precise cost estimates based on your inputs.
                <br />
                Fast, simple, and effective.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
