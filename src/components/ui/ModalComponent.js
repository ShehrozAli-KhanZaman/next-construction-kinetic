import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import Image from "next/image"
import { steps } from "@/lib/utils"

const ModalComponent = ({ activeTab, tabs, setActiveTab }) => {
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
    <div className="mt-2 grid grid-cols-2 gap-1">
      {steps.map((step, i) => (
        <div
          key={i}
          className="bg-white/10 text-white p-1 rounded-md border border-white/20 text-[10px] shadow-sm flex items-center gap-1">
          {step.icon ? (
            <step.icon className="w-3 h-3 text-white shrink-0" />
          ) : (
            <div className="w-3 h-3 rounded-full bg-white/30 flex items-center justify-center text-[8px]">
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
  const fullText =
    typeof tab.description === "string"
      ? tab.description
      : Array.isArray(tab.description)
      ? tab.description.join(" ")
      : null

  const renderTable = (data) => {
    if (!data) return null

    if (tab.id === "duration") {
      return (
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr>
              {data.headers.map((header, i) => (
                <th
                  key={i}
                  className="p-2 border-b border-white/20 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i} className="hover:bg-white/10">
                {row.map((cell, j) => (
                  <td key={j} className="p-2 border-b border-white/20">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    }

    if (tab.id === "cost") {
      return (
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-white font-semibold mb-2 text-sm">Rates</h3>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-white font-medium mb-1 text-xs">
                  Gray Structure
                </h4>
                <table className="w-full text-xs text-left border-collapse table-fixed">
                  <tbody>
                    {data.rates.grayStructure.map((row, i) => (
                      <tr key={i} className="hover:bg-white/10">
                        <td className="p-2 border-b border-white/20 w-1/2">
                          {row[0]}
                        </td>
                        <td className="p-2 border-b border-white/20 w-1/2">
                          {row[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 text-xs">
                  Finishing (Starting From)
                </h4>
                <table className="w-full text-xs text-left border-collapse table-fixed">
                  <tbody>
                    {data.rates.finishing.map((row, i) => (
                      <tr key={i} className="hover:bg-white/10">
                        <td className="p-2 border-b border-white/20 w-1/2">
                          {row[0]}
                        </td>
                        <td className="p-2 border-b border-white/20 w-1/2">
                          {row[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {data.note && <p className="text-gray-200 text-xs">{data.note}</p>}
        </div>
      )
    }

    return null
  }

  return (
    <AnimatePresence>
      {activeTab && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2">
            <div className="relative w-full h-[80vh] overflow-y-auto rounded-xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-lg mt-12">
              {/* Background */}
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

              <div className="relative z-20 p-4 text-white flex flex-col gap-4">
                <h2 className="text-lg font-bold">Construction planning?</h2>
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="relative z-20 p-4 text-white flex flex-col gap-4">
                    {tab.icon && (
                      <tab.icon className="w-5 h-5 text-white mb-1" />
                    )}
                    <h3 className="text-base font-semibold">{tab.title}</h3>
                  </div>
                  {lottieData && (
                    <div className="flex justify-center">
                      <Lottie
                        animationData={lottieData}
                        loop
                        autoplay
                        className="w-28 h-28"
                      />
                    </div>
                  )}
                </div>

                <div className="text-xs">
                  {tab.id === "duration" || tab.id === "cost" ? (
                    renderTable(tab.description)
                  ) : (
                    <>
                      <p className="text-gray-200">
                        {showFullText
                          ? fullText
                          : fullText?.slice(0, charLimit) + "..."}
                      </p>
                      {fullText?.length > charLimit && (
                        <button
                          className="mt-1 text-emerald-400 text-xs hover:underline"
                          onClick={() => setShowFullText(!showFullText)}>
                          {showFullText ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </>
                  )}
                </div>

                {hasSteps && !showFullText && (
                  <div>
                    <h4 className="text-white font-semibold mb-2 text-sm">
                      Steps
                    </h4>
                    <StepsGrid steps={steps[stepsKey]} />
                  </div>
                )}
              </div>

              <button
                onClick={() => setActiveTab(null)}
                className="absolute top-3 right-4 text-white text-2xl hover:text-red-400 z-50"
                aria-label="Close">
                ×
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ModalComponent
