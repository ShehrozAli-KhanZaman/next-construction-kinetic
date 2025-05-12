import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import Image from "next/image"
import { steps } from "@/lib/utils"

const ModalComponent = ({ activeTab, tabs, setActiveTab, lotti }) => {
  const [lottieData, setLottieData] = useState(null)
  const [showFullText, setShowFullText] = useState(false)
  const tab = tabs.find((t) => t.id === activeTab)

  useEffect(() => {
    const loadLottie = async () => {
      if (tab?.lotti) {
        try {
          const res = await fetch(tab.lotti)
          const json = await res.json()
          setLottieData(json)
        } catch (err) {
          console.error("Failed to load Lottie animation:", err)
        }
      }
    }

    if (activeTab) {
      loadLottie()
      setShowFullText(false)
    } else {
      setLottieData(null)
    }
  }, [activeTab, tab])

  if (!tab) return null

  const stepsKey =
    tab.id === "grey" ? "grey" : tab.id === "finishing" ? "finishing" : null

  const StepsGrid = ({ steps }) => (
    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {steps.map((step, i) => (
        <div
          key={i}
          className="bg-white/10 text-white p-3 rounded-lg border border-white/20 text-xs shadow-sm flex items-center gap-2">
          {step.icon ? (
            <step.icon className="w-5 h-5 text-white shrink-0" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-xs">
              {i + 1}
            </div>
          )}
          <span>{step.title || step}</span>
        </div>
      ))}
    </div>
  )

  const hasSteps = stepsKey && steps[stepsKey]
  const charLimit = hasSteps ? 400 : 700
  const fullText = Array.isArray(tab.description)
    ? tab.description.join(" ")
    : tab.description
  const isTruncatable = fullText?.length > charLimit

  return (
    <AnimatePresence>
      {activeTab && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl max-h-[90vh] min-h-[60vh] overflow-y-auto rounded-xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-lg">
              {/* Background image */}
              <div className="absolute inset-0 z-10">
                <Image
                  src={tab.image}
                  alt="card visual"
                  fill
                  className="object-cover"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(135deg, black 20%, transparent 70%)",
                    maskImage:
                      "linear-gradient(135deg, black 20%, transparent 70%)",
                    opacity: 0.3,
                    transform: "scale(1.1)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-20 p-4 md:p-6 text-white flex flex-col md:flex-row gap-6 justify-center">
                {/* Mobile First: Lottie at Top */}
                <div className="md:hidden mb-4 flex justify-center">
                  {lottieData && (
                    <Lottie
                      animationData={lottieData}
                      loop
                      autoplay
                      className="w-44 h-44"
                    />
                  )}
                </div>

                {/* Left Section */}
                <div className="flex-1 text-sm md:text-base">
                  {tab.icon && <tab.icon className="w-6 h-6 text-white mb-2" />}
                  <h2 className="text-lg md:text-2xl font-semibold mb-2">
                    {tab.title}
                  </h2>

                  <p className="leading-tight text-gray-200">
                    {showFullText
                      ? fullText
                      : fullText?.slice(0, charLimit) + "..."}
                  </p>

                  {isTruncatable && (
                    <button
                      className="mt-2 text-emerald-400 text-sm hover:underline"
                      onClick={() => setShowFullText(!showFullText)}>
                      {showFullText ? "Read Less" : "Read More"}
                    </button>
                  )}

                  {/* Steps - Hidden when read more is active */}
                  {hasSteps && !showFullText && (
                    <div className="mt-6">
                      <h3 className="text-white font-semibold mb-2">Steps</h3>
                      <StepsGrid steps={steps[stepsKey]} />
                    </div>
                  )}
                </div>

                {/* Desktop: Lottie on Right */}
                <div className="hidden md:flex w-full md:w-1/3 items-center justify-center">
                  {lottieData && (
                    <Lottie
                      animationData={lottieData}
                      loop
                      autoplay
                      className="w-64 h-64" // Bigger Lottie for desktop
                    />
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveTab(null)}
                className="absolute top-4 right-4 text-white text-3xl hover:text-red-400 transition z-50"
                aria-label="Close">
                &times;
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ModalComponent
