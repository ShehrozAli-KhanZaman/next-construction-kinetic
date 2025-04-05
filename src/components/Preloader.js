"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds total loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6,
          }}
          data-preloader="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary w-screen max-w-full overflow-hidden">
          <div className="relative w-[90%] sm:w-auto mx-auto">
            {/* Decorative circles */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -inset-8 md:-inset-12 rounded-full bg-white blur-lg"
            />

            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-12 w-full max-w-[320px] sm:w-72 md:w-96 flex flex-col items-center gap-6">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 2, ease: "linear" },
                  scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                }}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <img
                  src="/images/Logo/LogoTransparent.png"
                  alt="Logo"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </motion.div>

              <div className="text-center">
                <h2 className="text-lg md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  Construction Kinetics
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  Building dreams with excellence
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Loader2 size={24} className="text-primary animate-spin" />
                <span className="text-gray-700 dark:text-gray-300">
                  Loading...
                </span>
              </div>
            </div>
          </div>

          {/* Animated dots background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: Math.random() * 0.5 + 0.3,
                  x: Math.random() * 10 - 5,
                  y: Math.random() * 10 - 5,
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 2 + 1,
                  repeatType: "mirror",
                }}
                style={{
                  position: "absolute",
                  width: Math.random() * 5 + 2,
                  height: Math.random() * 5 + 2,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
