import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { useEffect, useState } from "react"
import Image from "next/image"
import Lottie from "lottie-react"

const CardComponent = ({
  tab,
  setActiveTab,
  cardVariants,
  activeTab,
  animationVariants = null,
  onCardClick,
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const loadLottie = async () => {
      if (tab.lotti) {
        try {
          const res = await fetch(tab.lotti)
          const json = await res.json()
          setAnimationData(json)
        } catch (err) {
          console.error("Failed to load Lottie animation:", err)
        }
      }
    }
    loadLottie()
  }, [tab.lotti])

  const handleClick = () => {
    setActiveTab(activeTab === tab.id ? null : tab.id)
    onCardClick?.(tab.id)
  }

  const content = (
    <div
      onClick={handleClick}
      className="relative group overflow-hidden cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-xl transition-all duration-500 rounded-xl flex flex-col justify-between p-2 md:p-3 w-full h-28 md:h-40 lg:h-44 max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">
      {/* Background Image with diagonal gradient mask */}
      <div className="absolute inset-1 z-10">
        <Image
          src={tab.image}
          alt="card visual"
          className="object-cover w-full h-full group-hover:opacity-40 transition duration-500"
          style={{
            WebkitMaskImage:
              "linear-gradient(135deg, black 20%, transparent 70%)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskImage: "linear-gradient(135deg, black 20%, transparent 70%)",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
            opacity: 0.3,
            transform: "scale(1.1)",
          }}
          width={300}
          height={200}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-between h-full">
        {/* Left Content */}
        <div className="flex flex-col justify-center flex-1 pr-2 sm:pr-4">
          {tab.icon && (
            <tab.icon className="w-4 h-4 md:w-6 md:h-6 text-white mb-1" />
          )}
          <h2 className="text-xs md:text-lg font-semibold text-white mb-1">
            {tab.title}
          </h2>
          <p className="text-[10px] md:text-sm text-gray-300 leading-tight line-clamp-2">
            {tab.description || "This is a short description of the service."}
          </p>
        </div>

        {/* Right Content (Lottie Animation) */}
        {/* <div className="w-16 h-16 md:w-40 md:h-40 flex-shrink-0">
          {animationData && (
            <Lottie animationData={animationData} loop autoplay />
          )}
        </div> */}
      </div>
    </div>
  )

  // Return plain card on mobile, animated + Tilt card on desktop
  return isMobile ? (
    <div className="w-full px-2 mb-3">{content}</div>
  ) : (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1000}
      className="w-full max-w-xl px-4 mb-4">
      <motion.div
        variants={animationVariants || cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        className="w-full h-full">
        {content}
      </motion.div>
    </Tilt>
  )
}

export default CardComponent
