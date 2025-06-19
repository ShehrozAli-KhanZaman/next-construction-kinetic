"use client"

import { motion } from "framer-motion"
import { FaArrowDown } from "react-icons/fa"
import { useActiveSection } from "@/context/ActiveSectionContext"

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
}

export default function ScrollDownButton({ totalSections = 4 }) {
  const { activeSection, setActiveSection, setScrollDirection } =
    useActiveSection()

  const handleNextSection = () => {
    setScrollDirection("down")
    setActiveSection((prev) => prev + 1)
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={handleNextSection}
      disabled={activeSection >= totalSections - 1}
      className="absolute bottom-14 flex items-center justify-center w-12 h-12 bg-transparent border border-white/20 rounded-full text-white hover:border-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed align-center"
      style={{ transformOrigin: "center" }}
      aria-label="Scroll to next section">
      <FaArrowDown size={24} />
    </motion.button>
  )
}
