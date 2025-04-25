"use client"

import React from "react"

const PaginationControls = ({
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 rounded-2xl shadow-lg mt-6 sm:flex-nowrap flex-wrap">
      {/* Previous Button */}
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`transition-all duration-300 flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold tracking-wide ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg hover:scale-105 hover:brightness-110"
        }`}>
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Info */}
      <span className="text-gray-700 text-sm font-medium tracking-wide text-center flex-1 mt-2 sm:mt-0 sm:w-auto">
        Page <strong className="text-purple-600">{currentPage}</strong> of{" "}
        <strong className="text-purple-600">{totalPages}</strong>
      </span>

      {/* Next Button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`transition-all duration-300 flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold tracking-wide ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg hover:scale-105 hover:brightness-110"
        }`}>
        <span className="hidden sm:inline">Next</span>
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}

export default PaginationControls
