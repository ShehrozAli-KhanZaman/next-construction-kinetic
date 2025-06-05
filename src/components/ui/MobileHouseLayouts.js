"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { layouts } from "@/lib/utils"
import SelectableButtonGroup from "./SelectableButtonGroup"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Document, Page, pdfjs } from "react-pdf"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const PdfViewer = ({ file, isModal = false }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 })
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  })
  const containerRef = useRef(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerDimensions({ width, height })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [isModal])

  const onDocumentLoadSuccess = async ({ numPages }) => {
    setNumPages(numPages)
    const pdf = await pdfjs.getDocument(file).promise
    const page = await pdf.getPage(1)
    const [x, y, width, height] = page.getViewport({ scale: 1 }).viewBox
    setPageDimensions({ width, height })
  }

  const calculateScale = () => {
    const containerWidth = containerDimensions.width || (isModal ? 480 : 300) // Increased modal width
    const containerHeight = containerDimensions.height || (isModal ? 360 : 112) // Increased modal height
    const scale50Percent = 0.5
    const scaleToFitWidth = containerWidth / pageDimensions.width
    const scaleToFitHeight = containerHeight / pageDimensions.height
    const fitScale = Math.min(scaleToFitWidth, scaleToFitHeight)
    // Ensure a minimum scale for modal to avoid very small PDFs
    return isModal ? Math.max(fitScale, 0.8) : scale50Percent
  }

  const scale =
    pageDimensions.width && pageDimensions.height
      ? calculateScale()
      : isModal
      ? 1.0
      : 0.6

  return (
    <div className="pdf-wrapper relative w-full h-full rounded-xl">
      <div className="pdf-controls absolute top-2 right-2 z-20">
        <a
          href={file}
          download
          className="download-button flex items-center justify-center w-8 h-8 bg-blue-600/80 hover:bg-blue-700/80 rounded-md transition-colors"
          title="Download PDF">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </a>
      </div>
      <div
        ref={containerRef}
        className="pdf-container w-full overflow-y-auto rounded-xl"
        style={{ maxHeight: isModal ? "20rem" : "7rem" }} // Increased modal maxHeight
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs rounded-xl">
              Loading PDF...
            </div>
          }
          error={
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs rounded-xl">
              Failed to load PDF
            </div>
          }>
          {numPages &&
            Array.from({ length: numPages }, (_, i) => (
              <div
                key={i}
                className="page-wrapper w-full overflow-x-auto flex justify-center mb-2">
                <Page
                  pageNumber={i + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="pdf-page"
                />
              </div>
            ))}
        </Document>
      </div>
    </div>
  )
}

const MobileHouseLayouts = () => {
  const [selectedLayout, setSelectedLayout] = useState(null)
  const [selectedId, setSelectedId] = useState(1)
  const filteredLayouts = layouts

  useEffect(() => {
    document.body.style.overflow = selectedLayout ? "hidden" : "auto"
    const handleEsc = (e) => {
      if (e.key === "Escape") closeLayout()
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [selectedLayout])

  const openLayout = (layout) => setSelectedLayout(layout)
  const closeLayout = () => setSelectedLayout(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const handleOptionA = () =>
    new Promise((resolve) => {
      setSelectedId(1)
      resolve()
    })

  const handleOptionC = () =>
    new Promise((resolve) => {
      setSelectedId(3)
      resolve()
    })

  const buttons = [
    { id: 1, label: "DHA", onPress: handleOptionA },
    { id: 3, label: "LDA", onPress: handleOptionC },
  ]

  const getPdfArray = (layout) => {
    if (selectedId === 1) return layout.imagesDHAPdf || []
    if (selectedId === 3) return layout.imagesLDAPdf || []
    return []
  }

  const isPdf = (file) => file.endsWith(".pdf")

  return (
    <section className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden pt-16">
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #ffffff;
          width: 8px;
          height: 8px;
          --swiper-navigation-size: 8px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
        }
        .swiper-pagination-bullet {
          background: #ffffff;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff;
          opacity: 1;
        }
        .pdf-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          background: #fff;
        }
        .pdf-container {
          width: 100%;
        }
        .page-wrapper {
          min-height: 100%;
        }
        .pdf-page {
          margin: 0 auto;
        }
        .download-button {
          z-index: 20;
        }
      `}</style>
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-start self-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-sm font-bold text-center mb-2 text-white uppercase tracking-wider">
          House Layouts
        </motion.h1>
        <div className="bg-black flex justify-center items-center mb-2">
          <SelectableButtonGroup buttons={buttons} initialSelectedId={1} />
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-1 max-w-sm mx-auto px-3">
          {filteredLayouts.map((layout, index) => (
            <motion.div
              key={layout.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -5, scale: 1.02, filter: "brightness(1.05)" }}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-300"
              onClick={() => openLayout(layout)}>
              <div className="flex flex-col">
                <div className="relative w-full h-22">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={5}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 15000, disableOnInteraction: true }}
                    lazy={true}
                    preloadImages={false}
                    className="w-full h-full rounded-xl"
                    style={{ touchAction: "pan-y" }}>
                    {getPdfArray(layout).length > 0 ? (
                      getPdfArray(layout).map((file, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="flex flex-col items-center h-full">
                            {isPdf(file) ? (
                              <PdfViewer file={file} />
                            ) : (
                              <Image
                                src={file}
                                alt={`Layout ${idx + 1}`}
                                className="w-full h-full object-contain rounded-xl"
                                width={150}
                                height={150}
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs rounded-xl">
                          No PDFs Available
                        </div>
                      </SwiperSlide>
                    )}
                  </Swiper>
                </div>
                <div className="p-1.5">
                  <h3 className="text-[10px] font-semibold text-gray-800 dark:text-white mb-1">
                    {layout.title}
                  </h3>
                  <p className="text-[10px] text-gray-600 dark:text-gray-300 mb-1 line-clamp-2">
                    {layout.description}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {layout.features.slice(0, 2).map((feature, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {layout.features.length > 2 && (
                      <span className="text-[10px] px-1 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        +{layout.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedLayout && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLayout()
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex flex-col">
              <div className="relative h-80">
                {" "}
                {/* Increased modal height */}
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={5}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 15000, disableOnInteraction: true }}
                  lazy={true}
                  preloadImages={false}
                  className="w-full h-full rounded-xl"
                  style={{ touchAction: "pan-y" }}>
                  {getPdfArray(selectedLayout).length > 0 ? (
                    getPdfArray(selectedLayout).map((file, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="flex flex-col items-center h-full">
                          {isPdf(file) ? (
                            <PdfViewer file={file} isModal={true} />
                          ) : (
                            <Image
                              src={file}
                              alt={`Layout ${idx + 1}`}
                              className="w-full h-full object-contain rounded-xl"
                              width={150}
                              height={150}
                            />
                          )}
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-xs rounded-xl">
                        No PDFs Available
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full mb-2">
                      House Layout
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {selectedLayout.title}
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeLayout}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {selectedLayout.description}
                </p>
                <div className="mb-3">
                  <h4 className="text-sm font-semibold mb-2 text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-y-1">
                    {selectedLayout.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                        <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default MobileHouseLayouts
