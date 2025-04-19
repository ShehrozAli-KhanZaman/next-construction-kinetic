"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { HouseDataApi } from "@/utils/propertyApi"
import Navbar from "@/components/Navbar"
import { formatPrice, formatSize } from "@/utils/formatUtils"

export default function HousesPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [houses, setHouses] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  })

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true)
        const params = {
          house_location: searchParams.get("house_location") || "",
          size_min: searchParams.get("min_size") || "",
          size_max: searchParams.get("max_size") || "",
          price_min: searchParams.get("min_price") || "",
          price_max: searchParams.get("max_price") || "",
          pool: searchParams.get("pool") || "all",
          page: currentPage,
        }

        const result = await HouseDataApi(params)

        if (result && result.data && result.data.prop_page) {
          if (
            result.data.prop_page.Houses &&
            Array.isArray(result.data.prop_page.Houses)
          ) {
            setHouses(result.data.prop_page.Houses)
            setTotalPages(result.data.prop_page.metadata.total_pages)
            setItemsPerPage(result.data.prop_page.metadata.prop_per_page)
            setTotalItems(result.data.prop_page.metadata.total_prop)
            setError(null)
          } else {
            setError("No houses found")
            setHouses([])
          }
        } else {
          setError("No houses found")
          setHouses([])
        }
      } catch (err) {
        setError("Failed to fetch houses. Please try again.")
        console.error("Error fetching houses:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHouses()
  }, [searchParams, currentPage])

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat("en-PK", {
  //     style: "currency",
  //     currency: "PKR",
  //     maximumFractionDigits: 0,
  //   }).format(price)
  // }

  // const formatSize = (size) => {
  //   return `${size.toLocaleString()} sq ft`
  // }

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedHouses = [...houses].sort((a, b) => {
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
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
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
                    <div className="grid grid-cols-9 gap-4 p-4 text-sm font-medium text-gray-700">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("house_date")}>
                        <span>Date</span>
                        {sortConfig.key === "house_date" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("house_location")}>
                        <span>Area</span>
                        {sortConfig.key === "house_location" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("house_number")}>
                        <span>House No</span>
                        {sortConfig.key === "house_number" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("house_price")}>
                        <span>Price</span>
                        {sortConfig.key === "house_price" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => handleSort("house_size")}>
                        <span>Size</span>
                        {sortConfig.key === "house_size" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span>Beds</span>
                      </div>
                      <div className="flex items-center">
                        <span>Baths</span>
                      </div>
                      <div className="flex items-center">
                        <span>Old/New</span>
                      </div>
                      <div className="flex items-center">
                        <span>Details</span>
                      </div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {sortedHouses.map((house, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-9 gap-4 p-4 text-sm text-gray-900 hover:bg-gray-50">
                        <div>
                          {new Date(house.house_date).toLocaleDateString()}
                        </div>
                        <div>{house.house_location}</div>
                        <div>{house.house_number}</div>
                        <div>{formatPrice(house.house_price)}</div>
                        <div>{formatSize(house.house_size)}</div>
                        <div>{house.house_beds}</div>
                        <div>{house.house_baths}</div>
                        <div>{house.house_type}</div>
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
            {totalItems > itemsPerPage && (
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
                <div className="flex-1 flex justify-between items-center">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}>
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === totalPages
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
