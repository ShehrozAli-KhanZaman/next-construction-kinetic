"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SearchPropApi } from "@/utils/propertyApi"
import { formatPrice, formatSize } from "@/utils/formatUtils"
import Navbar from "@/components/Navbar"

export default function PlotsPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [plots, setPlots] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  })

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await SearchPropApi({
          area: searchParams.get("area") || searchParams.get("location") || "",
          size_min: searchParams.get("min_size") || "",
          size_max: searchParams.get("max_size") || "",
          price_min: searchParams.get("min_price") || "",
          price_max: searchParams.get("max_price") || "",
          pool: searchParams.get("pool") || "all",
          type: searchParams.get("type") || "Plot",
          page: currentPage,
        })

        if (result.data?.prop_page?.properties) {
          setPlots(result.data.prop_page.properties)
          setPagination({
            currentPage: result.data.prop_page.metadata.current_page,
            totalPages: result.data.prop_page.metadata.total_pages,
            totalItems: result.data.prop_page.metadata.total_prop,
          })
        } else {
          setError("No plots found")
          setPlots([])
        }
      } catch (err) {
        console.error("Error fetching plots:", err)
        setError("Failed to fetch plots. Please try again.")
        setPlots([])
      } finally {
        setLoading(false)
      }
    }

    fetchPlots()
  }, [searchParams, currentPage])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedPlots = [...plots].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
    }
    return 0
  })

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      setCurrentPage(pagination.currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setCurrentPage(pagination.currentPage + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-400">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Table Header */}
                  <div className="bg-gray-100 border-b border-gray-200">
                    <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium text-gray-700">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("prop_create_date")}>
                        <span>Date</span>
                        {sortConfig.key === "prop_create_date" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("prop_address")}>
                        <span>Plot No</span>
                        {sortConfig.key === "prop_address" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("prop_price")}>
                        <span>Price</span>
                        {sortConfig.key === "prop_price" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("prop_size")}>
                        <span>Size</span>
                        {sortConfig.key === "prop_size" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span>Agent Name</span>
                      </div>
                      <div className="flex items-center">
                        <span>Estate</span>
                      </div>
                      <div className="flex items-center">
                        <span>Details</span>
                      </div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {sortedPlots.map((plot, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-7 gap-4 p-4 text-sm text-gray-900 hover:bg-gray-50">
                        <div>
                          {new Date(plot.prop_create_date).toLocaleDateString()}
                        </div>
                        <div>
                          {typeof plot.prop_address === "object"
                            ? `${plot.prop_address.address || ""}`
                            : // , ${
                              //     plot.prop_address.area || ""
                              //   }, ${plot.prop_address.city || ""}

                              plot.prop_address}
                        </div>
                        <div>{formatPrice(plot.prop_price)}</div>
                        <div>{formatSize(plot.prop_size)}</div>
                        <div>{plot.agent_name || "N/A"}</div>
                        <div>{plot.estate || "N/A"}</div>
                        <div>
                          <button className="text-primary hover:text-primary-dark">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
                <div className="flex-1 flex justify-between items-center">
                  <button
                    onClick={handlePreviousPage}
                    disabled={pagination.currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      pagination.currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}>
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      pagination.currentPage === pagination.totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
