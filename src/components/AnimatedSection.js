"use client"

import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedSection({
  children,
  isActive,
  direction = "up",
  className = "",
}) {
  const variants = {
    enter: (direction) => ({
      x: direction === "left" ? 1000 : direction === "right" ? -1000 : 0,
      y: direction === "up" ? 1000 : direction === "down" ? -1000 : 0,
      opacity: 0,
      scale: 0.5,
      rotateX: 90,
      rotateY: 45,
      perspective: 1000,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: [1, 1.05, 1],
      rotateX: 0,
      rotateY: 0,
      perspective: 1000,
    },
    exit: (direction) => ({
      x: direction === "left" ? -1000 : direction === "right" ? 1000 : 0,
      y: direction === "up" ? -1000 : direction === "down" ? 1000 : 0,
      opacity: 0,
      scale: 0.5,
      rotateX: -90,
      rotateY: -45,
      perspective: 1000,
    }),
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="section"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: {
              type: "spring",
              stiffness: 200,
              damping: 20,
              duration: 0.5,
            },
            rotateX: { type: "spring", stiffness: 200, damping: 20 },
            rotateY: { type: "spring", stiffness: 200, damping: 20 },
          }}
          className={`fixed inset-0 overflow-hidden ${className}`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}>
          <style jsx global>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="h-full w-full transform-gpu">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
