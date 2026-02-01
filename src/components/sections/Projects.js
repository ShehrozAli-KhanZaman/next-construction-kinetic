"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { FaArrowDown, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa"
import { useActiveSection } from "@/context/ActiveSectionContext"

const featuredProject = {
  title: "The Springs Apartment Homes",
  tagline: "Luxury Urban Living in Lahore",
  developer: "Orbit Housing / Orbit Developers",
  location: "Canal Bank Road (near DHA EME & Izmir Town), Lahore",
  description:
    "One of Lahore's most distinguished residential developments, reimagining modern apartment living with comfort, convenience, and community-centric design. Contemporary architecture, thoughtful planning, and lifestyle-driven amenities.",
  highlights: [
    "Prime Location on Main Canal Road",
    "DHA, Metro, Ring Road connectivity",
    "Retail, education & healthcare nearby",
    "High-demand rental market",
  ],
  slug: "the-springs",
}

export default function Projects() {
  const router = useRouter()
  const { activeSection, setActiveSection, setScrollDirection } = useActiveSection()

  const handleExplore = () => {
    router.push(`/projects/${featuredProject.slug}`)
  }

  const handleNextSection = () => {
    setScrollDirection("down")
    setActiveSection((prev) => prev + 1)
  }

  const handlePrevSection = () => {
    setScrollDirection("up")
    setActiveSection((prev) => prev - 1)
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-emerald-900/10" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-1 md:px-6 py-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse text-white" />
            Featured Project
          </span>
        </motion.div>

        {/* Main card - clickable */}
        <motion.button
          onClick={handleExplore}
          className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 p-6 md:p-10 lg:p-12 shadow-2xl">
            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-emerald-500/20" />

            <div className="relative">
              {/* Split layout: left content, right highlights */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                {/* Left - Main content */}
                <div className="flex-1 space-y-6">
                  <motion.h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <span className="block text-white/90">
                      {featuredProject.title}
                    </span>
                    <span className="block lg:mt-1 bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                      {featuredProject.tagline}
                    </span>
                  </motion.h2>

                  <div className="hidden md:block space-y-4">
                    <p className="text-sm text-emerald-400/90 font-medium">
                      {featuredProject.developer}
                    </p>

                    <div className="flex items-start gap-3 text-white/70">
                      {/* <FaMapMarkerAlt className="mt-0.5 flex-shrink-0 text-emerald-400/80" /> */}
                      <p className="text-sm md:text-base leading-relaxed">
                        {featuredProject.description}
                      </p>
                    </div>

                  </div>

                  {/* Location badge */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-white text-base md:text-base">
                      <FaMapMarkerAlt className="text-emerald-400" size={12} />
                      {featuredProject.location}
                    </span>
                  </div>
                </div>

                {/* Right - YouTube video (visible on all screens) */}
                <div
                  className="w-full lg:w-80 flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                  role="presentation"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/30 border border-white/5">
                    <iframe
                      src="https://www.youtube.com/embed/WdJnuc3SQKI?autoplay=1&mute=0&loop=1&playlist=WdJnuc3SQKI"
                      title="The Springs Apartment Homes"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.button>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4 mt-2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevSection}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors disabled:opacity-50"
            disabled={activeSection <= 0}
            aria-label="Previous section"
          >
            <FaArrowDown className="rotate-180" size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextSection}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
            aria-label="Next section"
          >
            <FaArrowDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
