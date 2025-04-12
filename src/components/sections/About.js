"use client"

import { motion } from "framer-motion"
import Background from "@/components/Background"

export default function About() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Background type="NET" color={0x8a2be2} />
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16 md:pt-20">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          About Us
        </motion.h1>

        {/* Add your about us content here */}
      </div>
    </section>
  )
}
