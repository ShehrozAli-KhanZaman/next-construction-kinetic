"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Select from "react-select"
import { useRouter } from "next/navigation"
import { layoutsImagesPdfs } from "@/lib/utils"
import SelectableButtonGroup from "./ui/SelectableButtonGroup"
import { useActiveSection } from "@/context/ActiveSectionContext"
import { FaArrowUp, FaArrowDown } from "react-icons/fa"

const HouseLayouts = () => {
  const [selectedAuthority, setSelectedAuthority] = useState("DHA")
  const [selectedSize, setSelectedSize] = useState("5 Marla")
  const [selectedPdf, setSelectedPdf] = useState("")
  const router = useRouter()
  const { activeSection, setActiveSection, setScrollDirection } = useActiveSection()

  const handleAuthorityChange = (authority) => {
    setSelectedAuthority(authority)
    setSelectedPdf("") // Reset selected PDF when authority changes
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size)
    setSelectedPdf("") // Reset selected PDF when size changes
  }

  const handlePdfSelect = (option) => {
    setSelectedPdf(option.value)
  }

  const handleViewOnline = () => {
    if (selectedPdf) {
      // Navigate to a new page with the PDF
      router.push(`/pdf-viewer?pdf=${encodeURIComponent(selectedPdf)}`)
    }
  }

  const handleDownload = () => {
    if (selectedPdf) {
      const link = document.createElement('a')
      link.href = selectedPdf
      link.download = selectedPdf.split("/").pop()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handlePrevSection = () => {
    setScrollDirection("up")
    setActiveSection((prev) => prev - 1)
  }

  const handleNextSection = () => {
    setScrollDirection("down")
    setActiveSection((prev) => prev + 1)
  }

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Find the selected layout based on size
  const selectedLayout = layoutsImagesPdfs.find(
    (layout) => layout.size === selectedSize
  )

  // Get files based on authority
  const files = selectedLayout
    ? selectedAuthority === "DHA"
      ? selectedLayout.imagesDHAPdf
      : selectedLayout.imagesLDAPdf
    : []

  // Filter PDFs and create options for react-select
  const pdfs = files.filter((file) => file.endsWith(".pdf"))
  const pdfOptions = pdfs.map((pdf) => ({
    value: pdf,
    label: pdf.split("/").pop().replace(".pdf", "")
  }))

  // Create size buttons for SelectableButtonGroup
  const sizeButtons = [
    { id: 1, label: "5 Marla", onPress: () => handleSizeChange("5 Marla") },
    { id: 2, label: "10 Marla", onPress: () => handleSizeChange("10 Marla") },
    { id: 3, label: "1 Kanal", onPress: () => handleSizeChange("1 Kanal") },
  ]

  // Custom styles for react-select with dark mode support
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3b82f6' : '#f3f4f6'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    })
  }

  // Dark mode styles for react-select
  const darkModeStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#374151',
      borderColor: state.isFocused ? '#3b82f6' : '#4b5563',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#4b5563' : '#374151',
      color: state.isSelected ? 'white' : '#d1d5db',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3b82f6' : '#4b5563'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#374151',
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#d1d5db'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af'
    }),
    input: (provided) => ({
      ...provided,
      color: '#d1d5db'
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 pt-15">
      {/* Custom Up Navigation Button - Positioned to avoid navbar */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handlePrevSection}
        disabled={activeSection <= 0}
        className="absolute top-24 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-transparent border border-white/20 rounded-full text-white hover:border-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
        style={{ transformOrigin: "center" }}
        aria-label="Scroll to previous section">
        <FaArrowUp size={20} />
      </motion.button>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8"
      >
        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold bg-white bg-clip-text text-transparent tracking-wide mb-8 text-center"
        >
          House Layouts
        </motion.h1>

        {/* Authority Selection */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex space-x-3">
            {["DHA", "LDA"].map((authority) => (
              <motion.button
                key={authority}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAuthorityChange(authority)}
                className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex-1 overflow-hidden ${
                  selectedAuthority === authority
                    ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/30"
                    : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 shadow-md border border-gray-200/50 dark:border-gray-600/50"
                }`}
              >
                <span className="relative z-10">{authority}</span>
                {selectedAuthority === authority && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Size Selection with SelectableButtonGroup */}
        <motion.div variants={itemVariants} className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Select Size
          </h3>
            <SelectableButtonGroup 
              buttons={sizeButtons} 
              initialSelectedId={1}
            />
        </motion.div>

        {/* PDF Selection with React Select */}
        <motion.div variants={itemVariants} className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Select PDF
          </h3>
          <Select
            options={pdfOptions}
            onChange={handlePdfSelect}
            placeholder="Choose a PDF..."
            isDisabled={pdfOptions.length === 0}
            styles={darkModeStyles}
            className="text-sm"
          />
        </motion.div>

        {/* Action Buttons */}
        {selectedPdf && (
          <motion.div variants={itemVariants} className="space-y-3 mb-16">
            {/* View Online Button */}
            <motion.button
              onClick={handleViewOnline}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-500/25 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View PDF Online
            </motion.button>

            {/* Download Button */}
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Custom Down Navigation Button - Positioned to avoid overlapping with download button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleNextSection}
        disabled={activeSection >= 3}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-transparent border border-white/20 rounded-full text-white hover:border-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
        style={{ transformOrigin: "center" }}
        aria-label="Scroll to next section">
        <FaArrowDown size={20} />
      </motion.button>
    </section>
  )
}

export default HouseLayouts
