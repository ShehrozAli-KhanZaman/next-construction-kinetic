"use client"

import { motion } from "framer-motion"
import { FaArrowUp } from "react-icons/fa"
import { useActiveSection } from "@/context/ActiveSectionContext"

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
}

export default function ScrollUpButton() {
  const { activeSection, setActiveSection, setScrollDirection } =
    useActiveSection()

  const handlePrevSection = () => {
    setScrollDirection("up")
    setActiveSection((prev) => prev - 1)
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={handlePrevSection}
      disabled={activeSection <= 0}
      className="absolute top-14 flex items-center justify-center w-12 h-12 bg-transparent border border-white/20 rounded-full text-white hover:border-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ transformOrigin: "center" }}
      aria-label="Scroll to previous section">
      <FaArrowUp size={24} />
    </motion.button>
  )
}
