"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { useRouter, useSearchParams } from "next/navigation"

const PdfViewer = () => {
    const [pdfUrl, setPdfUrl] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultLayoutPluginInstance = defaultLayoutPlugin()

    useEffect(() => {
        const pdf = searchParams.get('pdf')
        if (pdf) {
            setPdfUrl(decodeURIComponent(pdf))
        }
    }, [searchParams])

    const handleBack = () => router.back()

    if (!pdfUrl) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">No PDF Selected</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Please go back and select a PDF to view</p>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleBack} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800 shadow-lg">Go Back</motion.button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col pt-16">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleBack} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </motion.button>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">PDF Viewer</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{pdfUrl.split("/").pop()}</p>
                        </div>
                    </div>

                    <motion.a href={pdfUrl} download whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold transition-all duration-300 hover:from-green-700 hover:to-green-800 shadow-lg flex items-center space-x-2">
                        <span>Download</span>
                    </motion.a>
                </div>
            </motion.div>

            <div className="flex-1 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl h-full overflow-hidden border border-gray-200 dark:border-gray-700">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} defaultScale={0.5} />
                    </Worker>
                </div>
            </div>
        </div>
    )
}

export default PdfViewer
