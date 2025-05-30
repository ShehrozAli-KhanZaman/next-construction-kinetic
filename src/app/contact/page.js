"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Download,
  ArrowDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "@/context/ThemeContext"
import ClientWrapper from "@/components/ClientWrapper"
import emailjs from "emailjs-com"
export default function ContactPage() {
  const { theme } = useTheme()
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
  })
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   service: "Grey Structure",
  //   message: "",
  // })
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
  // Force theme to sync with stored value when page loads
  useEffect(() => {
    // Add or remove dark class based on theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setFormStatus({ submitted: false, submitting: true, error: false })

  //   // Simulate form submission
  //   setTimeout(() => {
  //     setFormStatus({ submitted: true, submitting: false, error: false })
  //   }, 1500)
  // }
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

  return (
    <ClientWrapper>
      <div className="bg-white dark:bg-gray-900">
        {/* Header Banner */}
        <section
          className="relative py-20 md:py-28 overflow-hidden"
          style={{
            backgroundImage: "url(/images/Background/banner-1400x726.jpg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "600px",
          }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative z-10 text-center pt-40">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
            className="absolute top-[20%] left-[10%] w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full blur-xl"
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
            }}
            className="absolute bottom-[20%] right-[10%] w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-xl"
          />
        </section>

        {/* Contact Information and Form */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Let&apos;s Build Your{" "}
                    <span className="text-primary">Dream Project</span> Together
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    We are here to assist with any questions about our
                    construction services, architectural designs, or to provide
                    quotes for your upcoming projects.
                  </p>
                </div>

                <div className="space-y-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:+923204300002"
                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                        +92 320 430 0002
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:farhan@realtormfi.com"
                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                        farhan@realtormfi.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        Office
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        147 B, Commercial Area, AWT Phase 2 Lahore
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                    <span>Back to Homepage</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
              {/* Left Quotation Form Section */}
              <div className="w-full relative p-4 overflow-hidden flex flex-col justify-center items-center">
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
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                    className="space-y-5 w-full">
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
                          options: [
                            "1 Floor",
                            "2 Floors",
                            "3 Floors",
                            "4 Floors",
                          ],
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
                          label: "Finishings",
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
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-white dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">
                <span className="text-secondary">Visit</span> Our Office
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative rounded-xl overflow-hidden shadow-lg h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.109676326853!2d74.21242517564717!3d31.35481597412813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918550005ee2879%3A0x90248901119b1b1a!2sBrick%20Builders!5e0!3m2!1sen!2sus!4v1690376351362!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"></iframe>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </ClientWrapper>
  )
}
