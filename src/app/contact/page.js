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

export default function ContactPage() {
  const { theme } = useTheme()
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Grey Structure",
    message: "",
  })

  // Force theme to sync with stored value when page loads
  useEffect(() => {
    // Add or remove dark class based on theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus({ submitted: false, submitting: true, error: false })

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitted: true, submitting: false, error: false })
    }, 1500)
  }

  return (
    <ClientWrapper>
      <div className="bg-white dark:bg-gray-900">
        {/* Header Banner */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 z-0"></div>

          {/* <div className="absolute inset-0 opacity-10">
          <Image
              src="/images/Background/pattern-bg.png"
              alt="Pattern"
              fill
              className="object-cover"
            />
          </div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Get in touch with our team for any inquiries or to discuss your
              construction project needs
            </p>
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
                        href="mailto:realexchnge@gmail.com"
                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                        realexchnge@gmail.com
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
                        DHA Phase 5, Lahore, Pakistan
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

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8">
                {formStatus.submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                      <Check size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      Thank you for contacting us. We will respond to your
                      inquiry shortly.
                    </p>
                    <button
                      onClick={() =>
                        setFormStatus({
                          submitted: false,
                          submitting: false,
                          error: false,
                        })
                      }
                      className="px-6 py-2 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary/90 rounded-lg font-medium hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                      Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="service"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Service Interested In
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50">
                            <option value="Grey Structure">
                              Grey Structure
                            </option>
                            <option value="Complete Construction">
                              Complete Construction
                            </option>
                            <option value="Architectural Design">
                              Architectural Design
                            </option>
                            <option value="Interior Design">
                              Interior Design
                            </option>
                            <option value="Renovation">Renovation</option>
                            <option value="Consultation">Consultation</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"></textarea>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={formStatus.submitting}
                          className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium shadow-sm transition-colors flex items-center justify-center gap-2">
                          {formStatus.submitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24">
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-12">
              <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                Mobile App
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Download Our <span className="text-primary">Real Exchange</span>{" "}
                App
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Access our services on the go with our mobile application.
                Available on both iOS and Android platforms.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://play.google.com/store/apps/details?id=com.techanzy.realexchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white rounded-xl px-6 py-3 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-3xl">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <polygon points="3 3 21 12 3 21 3 3"></polygon>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-xl font-semibold">Google Play</div>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://apps.apple.com/pk/app/real-exchange/id6475013131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white rounded-xl px-6 py-3 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-3xl">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="M12 2a9.96 9.96 0 0 1 7.383 16.617a9.869 9.869 0 0 1-1.242 1.148a9.9 9.9 0 0 1-6.129 2.235H11.99a9.9 9.9 0 0 1-6.124-2.23c-.399-.365-.75-.764-1.08-1.185A9.96 9.96 0 0 1 12 2"></path>
                      <path d="M12 8c-4 0-5 5-5 5 0 3.03 2 5 3.5 5S12 16.84 12 16.84"></path>
                      <path d="M12 8c4 0 5 5 5 5 0 3.03-2 5-3.5 5S12 16.84 12 16.84"></path>
                      <line x1="12" y1="2" x2="12" y2="4"></line>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-xl font-semibold">App Store</div>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
              className="flex justify-center">
              <div className="relative w-full max-w-3xl mt-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-md opacity-70"></div>
                <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600 relative">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        App Features
                      </h3>
                      <ul className="space-y-2 text-left">
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            Browse property listings
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            Search based on location & price
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            Save favorites & contact sellers
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-secondary mt-1">
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            Get notified about new properties
                          </span>
                        </li>
                      </ul>

                      <motion.div
                        className="mt-6 flex justify-center md:justify-start"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}>
                        <div className="bg-primary/10 dark:bg-primary/20 text-primary p-3 rounded-full">
                          <ArrowDown size={20} />
                        </div>
                      </motion.div>
                    </div>

                    <div className="max-w-[280px]">
                      <motion.div whileHover={{ y: -10 }} className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-b from-primary/30 to-secondary/30 rounded-3xl blur-md opacity-70"></div>
                        <Image
                          src="/images/app-mockup.jpg"
                          alt="Real Exchange App"
                          width={280}
                          height={560}
                          className="rounded-3xl shadow-2xl border-8 border-gray-800 relative"
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.109676326853!2d74.38981707564717!3d31.47629267412813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919076f4f54933f%3A0xe1ed89bd5f54c285!2sDHA%20Phase%205%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1690376351362!5m2!1sen!2sus"
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
