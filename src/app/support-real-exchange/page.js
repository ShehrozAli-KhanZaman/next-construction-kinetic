"use client"
// pages/support.js
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState("mail")

  return (
    <div>
      <Head>
        <title>Support - Real Exchange</title>
        <meta
          name="description"
          content="Get help and support for Real Exchange"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-12 mb-6 sm:mb-8 lg:mb-12">
          <div
            className="flex items-center justify-center w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full shadow-2xl ring-2 ring-white/30 backdrop-blur-md isolate"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 100%)",
            }}>
            <Image
              src="/images/Logo/Ck/RE.png"
              alt="REAL Exchange"
              width={120}
              height={120}
              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] object-contain"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 sm:mb-3 lg:mb-4">
              Support
            </h1>
            <h2 className="text-xl lg:text-2xl font-semibold text-white/80">
              Real Exchange
            </h2>
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8 lg:mt-12 h-96">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
          <button
            className={`${
              activeTab === "mail"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold`}
            onClick={() => setActiveTab("mail")}>
            Mail
          </button>
          <button
            className={`${
              activeTab === "call"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            } px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold`}
            onClick={() => setActiveTab("call")}>
            Call
          </button>
        </div>
        {activeTab === "mail" ? (
          <div>
            <h2 className="text-xl font-bold text-gray-600 mb-2">
              Send us an email
            </h2>
            <p>
              If you have any questions or need help, please send us an email at{" "}
              <a href="mailto:realexchnge@gmail.com">realexchnge@gmail.com</a>.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-600 mb-2">Call us</h2>
            <p>
              If you have any questions or need help, please call us at{" "}
              <a href={`tel:+923204300002`}>+923204300002</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SupportPage
