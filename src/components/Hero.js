"use client"

import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"

export default function Hero() {
  const controls = useAnimation()

  useEffect(() => {
    // Start the animation sequence
    controls.start("visible")
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative text-white min-h-screen flex flex-col justify-center bg-cover bg-center pt-20 overflow-hidden"
      style={{ backgroundImage: "url('/images/Background/bg1.jpg')" }}>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 2 === 0 ? "bg-primary/30" : "bg-secondary/30"
            }`}
            style={{
              width: Math.random() * 15 + 5,
              height: Math.random() * 15 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.2, 0.5, 0],
              scale: [1, Math.random() * 0.5 + 1.5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 10,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-block bg-secondary text-black px-4 py-1 rounded-full text-sm font-medium mb-4">
                Premium Construction Services
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Building Your <span className="text-secondary">Dream Home</span>{" "}
              With Expert Craftsmanship
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg max-w-lg">
              Transform your vision into reality with our professional
              construction and architectural design services in Pakistan.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium shadow-lg">
                  Get Started
                </motion.button>
              </Link>
              <Link href="#house-layouts">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium border border-white/20">
                  View Layouts
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-end px-4">
            <motion.div
              className="relative w-full max-w-[280px]"
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 180, 360],
                boxShadow: [
                  "0 0 10px rgba(247, 185, 40, 0.3)",
                  "0 0 20px rgba(247, 185, 40, 0.5)",
                  "0 0 10px rgba(247, 185, 40, 0.3)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}>
              <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-2xl">
                <Image
                  src="/images/Logo/logoTransparent.png"
                  alt="Construction Kinetics"
                  width={180}
                  height={180}
                  className="w-36 h-36 md:w-40 md:h-40 object-contain mx-auto"
                />
                <motion.p
                  className="text-center font-medium text-lg mt-2"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(255,255,255,0)",
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 0px rgba(255,255,255,0)",
                    ],
                    color: [
                      "rgba(255,255,255,1)",
                      "rgba(247,185,40,1)",
                      "rgba(255,255,255,1)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}>
                  Construction Kinetics
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated shapes */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-14 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-16 w-48 h-48 bg-secondary/20 rounded-full blur-2xl pointer-events-none"
      />

      <motion.div
        animate={{
          x: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 0.9, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-36 h-36 bg-primary/15 rounded-full blur-2xl pointer-events-none"
      />
    </section>
  )
}
