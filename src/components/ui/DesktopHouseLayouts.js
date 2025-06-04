"use client"

import { useState, useEffect } from "react"
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

const DesktopHouseLayouts = () => {
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
    <section className="relative min-h-screen w-full overflow-hidden">
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #ffffff;
          width: 24px;
          height: 24px;
          --swiper-navigation-size: 12px;
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
        .pdf-container {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          position: relative;
        }
        .download-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 24px;
          height: 24px;
          background: rgba(37, 99, 235, 0.8);
          border-radius: 4px;
          padding: 4px;
          transition: background 0.3s;
        }
        .download-icon:hover {
          background: rgba(30, 64, 175, 0.8);
        }
      `}</style>
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center self-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-xl font-bold text-center mb-4 text-white uppercase tracking-wider">
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
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto px-4">
          {filteredLayouts.map((layout, index) => (
            <motion.div
              key={layout.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -5, scale: 1.02, filter: "brightness(1.05)" }}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-300"
              onClick={() => openLayout(layout)}>
              <div className="flex flex-col">
                <div className="relative w-full h-48 lg:h-64">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={5}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 15000, disableOnInteraction: true }}
                    lazy={true}
                    preloadImages={false}
                    className="w-full h-full"
                    style={{ touchAction: "pan-y" }}>
                    {getPdfArray(layout).length > 0 ? (
                      getPdfArray(layout).map((file, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="flex flex-col items-center h-full">
                            {isPdf(file) ? (
                              <div className="pdf-container">
                                <Document
                                  file={file}
                                  loading={
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-sm">
                                      Loading PDF...
                                    </div>
                                  }
                                  error={
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-sm">
                                      Failed to load PDF
                                    </div>
                                  }>
                                  <Page
                                    pageNumber={1}
                                    scale={0.8}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="w-full"
                                  />
                                  <a
                                    href={file}
                                    download
                                    className="download-icon">
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
                                </Document>
                              </div>
                            ) : (
                              <Image
                                src={file}
                                alt={`Layout ${idx + 1}`}
                                className="w-full h-full object-contain"
                                width={200}
                                height={200}
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 text-sm">
                          No PDFs Available
                        </div>
                      </SwiperSlide>
                    )}
                  </Swiper>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                    {layout.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                    {layout.description}
                  </p>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {layout.features.slice(0, 2).map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary/90 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {layout.features.length > 2 && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm mt-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="grid grid-cols-2">
              <div className="relative h-100">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={5}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 15000, disableOnInteraction: true }}
                  lazy={true}
                  preloadImages={false}
                  className="w-full h-full"
                  style={{ touchAction: "pan-y" }}>
                  {getPdfArray(selectedLayout).length > 0 ? (
                    getPdfArray(selectedLayout).map((file, idx) => (
                      <SwiperSlide key={idx}>
                        <div className="flex flex-col items-center h-full">
                          {isPdf(file) ? (
                            <div className="pdf-container">
                              <Document
                                file={file}
                                loading={
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500">
                                    Loading PDF...
                                  </div>
                                }
                                error={
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500">
                                    Failed to load PDF
                                  </div>
                                }>
                                <Page
                                  pageNumber={1}
                                  scale={0.8}
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                  className="w-full"
                                />
                                <a
                                  href={file}
                                  download
                                  className="download-icon">
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
                              </Document>
                            </div>
                          ) : (
                            <Image
                              src={file}
                              alt={`Layout ${idx + 1}`}
                              className="w-full h-full object-contain"
                              width={200}
                              height={200}
                            />
                          )}
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500">
                        No PDFs Available
                      </div>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full mb-2">
                      House Layout
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
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
                      className="h-6 w-6"
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
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {selectedLayout.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white flex items-center">
                    <span className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center text-primary mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {selectedLayout.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600 dark:text-gray-300">
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

export default DesktopHouseLayouts
