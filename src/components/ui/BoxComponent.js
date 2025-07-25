import { useEffect, useState } from "react"
import Lottie from "lottie-react"
import Image from "next/image"
import { steps } from "@/lib/utils"

const BoxComponent = ({ activeTab, tabs, setActiveTab }) => {
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
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {steps.map((step, i) => (
        <div
          key={i}
          className="bg-white/10 text-white p-2 rounded-md border border-white/20 text-[10px] shadow-sm flex items-center gap-1">
          {step.icon ? (
            <step.icon className="w-4 h-4 text-white shrink-0" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[8px]">
              {i + 1}
            </div>
          )}
          <span>{step.title || step}</span>
        </div>
      ))}
    </div>
  )

  const hasSteps = stepsKey && steps[stepsKey]
  
  // Split text into paragraphs for Grey Structure and Finishing
  const getTextContent = () => {
    if (typeof tab.description === "string") {
      return tab.description
    } else if (Array.isArray(tab.description)) {
      return tab.description.join(" ")
    }
    return null
  }
  
  const fullText = getTextContent()
  
  // For Grey Structure and Finishing, split into paragraphs
  const paragraphs = fullText ? fullText.split('\n').filter(p => p.trim()) : []
  const isGreyOrFinishing = tab.id === "grey" || tab.id === "finishing"
  const displayText = isGreyOrFinishing && !showFullText 
    ? paragraphs.slice(0, 2).join('\n') 
    : fullText

  const renderTable = (data) => {
    if (!data) return null

    if (tab.id === "duration") {
      return (
        <table className="w-full text-sm md:text-base text-left border-collapse">
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
            <h3 className="text-white font-semibold mb-2">Rates</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">Gray Structure</h4>
                <table className="w-full text-sm md:text-base text-left border-collapse">
                  <tbody>
                    {data.rates.grayStructure.map((row, i) => (
                      <tr key={i} className="hover:bg-white/10">
                        <td className="p-2 border-b border-white/20">
                          {row[0]}
                        </td>
                        <td className="p-2 border-b border-white/20">
                          {row[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">
                  Finishing (Starting From)
                </h4>
                <table className="w-full text-sm md:text-base text-left border-collapse">
                  <tbody>
                    {data.rates.finishing.map((row, i) => (
                      <tr key={i} className="hover:bg-white/10">
                        <td className="p-2 border-b border-white/20">
                          {row[0]}
                        </td>
                        <td className="p-2 border-b border-white/20">
                          {row[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {data.note && (
            <p className="text-gray-200 text-sm md:text-base">{data.note}</p>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <div className={`w-full max-w-5xl max-h-[95vh] min-h-[70vh] rounded-xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-lg ${
      showFullText && isGreyOrFinishing ? 'overflow-y-auto' : 'overflow-hidden'
    }`}>
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
            maskImage: "linear-gradient(135deg, black 20%, transparent 70%)",
            opacity: 0.3,
            transform: "scale(1.1)",
          }}
        />
      </div>

      {/* Content */}
      <div className={`relative z-20 p-5 md:p-8 text-white flex flex-col gap-4 ${
        showFullText && isGreyOrFinishing ? 'custom-scrollbar' : ''
      }`}>
        {/* First Row: Text/Table and Lottie */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {/* Text or Table Section */}
          <div className="flex-1 text-sm md:text-base">
            {tab.icon && <tab.icon className="w-6 h-6 text-white mb-2" />}
            <h2 className="text-lg md:text-2xl font-semibold mb-2">
              {tab.title}
            </h2>
            {tab.id === "duration" || tab.id === "cost" ? (
              renderTable(tab.description)
            ) : (
              <>
                <p
                  className="leading-tight text-gray-200"
                  dangerouslySetInnerHTML={{
                    __html: displayText.replace(/\n/g, "<br>"),
                  }}
                />
                {isGreyOrFinishing && (
                  <button
                    className="mt-2 text-yellow-400 hover:text-yellow-300 text-sm font-semibold hover:underline transition-colors duration-200"
                    onClick={() => setShowFullText(!showFullText)}>
                    {showFullText ? "Read Less" : "Read More"}
                  </button>
                )}
              </>
            )}
          </div>

          {/* Lottie Section */}
          <div className="flex justify-center md:w-0.4/3">
            {lottieData && (
              <Lottie
                animationData={lottieData}
                loop
                autoplay
                className="w-48 h-48 md:w-72 md:h-72"
              />
            )}
          </div>
        </div>

        {/* Second Row: Steps */}
        {hasSteps && !showFullText && (
          <div>
            <h3 className="text-white font-semibold mb-2">Steps</h3>
            <StepsGrid steps={steps[stepsKey]} />
          </div>
        )}
      </div>
    </div>
  )
}

export default BoxComponent
