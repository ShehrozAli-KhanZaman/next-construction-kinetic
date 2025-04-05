"use client"

import { motion } from "framer-motion"

const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  },
  slideDown: {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  slideRight: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  },
  bounce: {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    exit: { opacity: 0, y: 50 },
  },
}

// Floating object component
const FloatingObject = ({ color, size, delay, duration, left }) => {
  return (
    <motion.div
      className={`absolute ${
        left ? "left-0" : "right-0"
      } opacity-30 rounded-full z-0 pointer-events-none`}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        top: `${Math.random() * 80}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: left ? [0, 20, 0] : [0, -20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

// Connection lines component
const ConnectionLines = () => {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-5 z-0 pointer-events-none">
      <motion.path
        d="M0,50 Q50,0 100,50 T200,50"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.path
        d="M20,20 Q100,100 180,20"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5,
        }}
      />
    </svg>
  )
}

const SectionWrapper = ({
  children,
  id,
  className = "",
  alt = false,
  bgImage = "",
  animation = "fadeIn",
  delay = 0,
}) => {
  const sectionAnimation = animations[animation] || animations.fadeIn

  const bgStyle = bgImage
    ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {}

  return (
    <section
      id={id}
      className={`relative py-10 md:py-14 ${
        alt ? "section-alt" : "bg-white dark:bg-gray-900"
      } ${className}`}
      style={bgStyle}>
      {bgImage && (
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      )}

      {/* Background animated elements */}
      <FloatingObject
        color="var(--primary)"
        size="80px"
        delay={0}
        duration={6}
        left={true}
      />
      <FloatingObject
        color="var(--secondary)"
        size="60px"
        delay={1.5}
        duration={7}
        left={false}
      />
      <FloatingObject
        color="var(--primary)"
        size="40px"
        delay={2.5}
        duration={5}
        left={true}
      />

      <ConnectionLines />

      <motion.div
        initial={sectionAnimation.initial}
        whileInView={sectionAnimation.animate}
        viewport={{ once: true, amount: 0.1 }} // Reduced amount for earlier animations
        transition={{ duration: 0.7, delay }}
        className="container mx-auto px-4 relative z-10">
        {children}
      </motion.div>
    </section>
  )
}

export default SectionWrapper
