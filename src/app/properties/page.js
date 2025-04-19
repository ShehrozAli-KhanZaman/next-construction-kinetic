"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SearchPropApi, HouseDataApi } from "@/utils/propertyApi"
import Navbar from "@/components/Navbar"

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [properties, setProperties] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const fetchProperties = async () => {
      console.log("/properties ")
      try {
        setLoading(true)
        const params = {
          prop_type: searchParams.get("prop_type") || "Plot",
          location: searchParams.get("location") || "",
          min_size: searchParams.get("min_size") || "",
          max_size: searchParams.get("max_size") || "",
          min_price: searchParams.get("min_price") || "",
          max_price: searchParams.get("max_price") || "",
          page: currentPage,
        }

        const result =
          params.prop_type === "Plot"
            ? await SearchPropApi(params)
            : await HouseDataApi(params)

        setProperties(result.data.prop_page.properties)
        setTotalPages(result.data.prop_page.metadata.total_pages)
        setItemsPerPage(result.data.prop_page.metadata.prop_per_page)
        setTotalItems(result.data.prop_page.metadata.total_prop)
        setError(null)
      } catch (err) {
        setError("Failed to fetch properties. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [searchParams, currentPage])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatSize = (size) => {
    return `${size.toLocaleString()} sq ft`
  }

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-600">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Table Header */}
                  <div className="bg-gray-100 border-b border-gray-200">
                    <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <span>Date</span>
                      </div>
                      <div className="flex items-center">
                        <span>Plot No</span>
                      </div>
                      <div className="flex items-center">
                        <span>Price</span>
                      </div>
                      <div className="flex items-center">
                        <span>Size</span>
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
                    {properties.map((property, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-7 gap-4 p-4 text-sm text-gray-900 hover:bg-gray-50">
                        <div>
                          {new Date(
                            property.prop_create_date
                          ).toLocaleDateString()}
                        </div>
                        <div>{property.prop_address}</div>
                        <div>{formatPrice(property.prop_price)}</div>
                        <div>{formatSize(property.prop_size)}</div>
                        <div>{property.agent_name || "N/A"}</div>
                        <div>{property.estate || "N/A"}</div>
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
