"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { HouseDataApi } from "@/utils/propertyApi"
import Navbar from "@/components/Navbar"
import { formatPrice, formatSize } from "@/utils/formatUtils"
import { Moon, Sun } from "lucide-react"

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

  const [tableTheme, setTableTheme] = useState("dark")

  const toggleTableTheme = () => {
    setTableTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const isDark = tableTheme === "dark"

  return (
    <div className="min-h-screen bg-gray-900">
      {/* <Navbar /> */}
      <div className="pt-20 px-1">
        <div className="max-w-7xl">
          <div className="bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-400">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                {/* Header with toggle */}
                <div className="relative mb-6">
                  <h2 className="text-xl font-semibold text-white text-center py-3 shadow-md bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-lg">
                    House Listings
                  </h2>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-2 ml-35">
                    <button
                      onClick={toggleTableTheme}
                      className="flex items-center justify-center px-4 py-2  text-white hover:bg-primary/80 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110">
                      {isDark ? (
                        <Sun
                          size={20}
                          className="transition-transform duration-300 ease-in-out transform hover:rotate-180"
                        />
                      ) : (
                        <Moon
                          size={20}
                          className="transition-transform duration-300 ease-in-out transform hover:rotate-180"
                        />
                      )}
                    </button>
                  </div>
                </div>

                <table
                  className={`min-w-full ${
                    isDark
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-900 border border-gray-300"
                  } rounded-lg shadow-md overflow-hidden`}>
                  {/* Table Head */}
                  <thead
                    className={`sticky top-0 z-10 ${
                      isDark
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                    <tr className="text-sm font-semibold">
                      <th
                        className="px-4 py-3 text-left cursor-pointer"
                        onClick={() => handleSort("house_date")}>
                        Date{" "}
                        {sortConfig.key === "house_date" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      {/* <th
                        className="px-4 py-3 text-left cursor-pointer"
                        onClick={() => handleSort("house_location")}>
                        Area{" "}
                        {sortConfig.key === "house_location" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th> */}
                      <th
                        className="px-4 py-3 text-left cursor-pointer"
                        onClick={() => handleSort("house_number")}>
                        House No{" "}
                        {sortConfig.key === "house_number" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-left cursor-pointer"
                        onClick={() => handleSort("house_price")}>
                        Price{" "}
                        {sortConfig.key === "house_price" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-left cursor-pointer"
                        onClick={() => handleSort("house_size")}>
                        Size{" "}
                        {sortConfig.key === "house_size" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="px-4 py-3 text-left">Beds</th>
                      <th className="px-4 py-3 text-left">Baths</th>
                      <th className="px-4 py-3 text-left">Old/New</th>
                      <th className="px-4 py-3 text-left">Details</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {sortedHouses.map((house, index) => (
                      <tr
                        key={index}
                        className={`text-sm transition-all ${
                          isDark
                            ? index % 2 === 0
                              ? "bg-gray-900 hover:bg-gray-800"
                              : "bg-gray-800 hover:bg-gray-700"
                            : index % 2 === 0
                            ? "bg-white hover:bg-gray-100"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}>
                        <td className="px-4 py-3">
                          {new Date(house.house_date).toLocaleDateString()}
                        </td>
                        {/* <td className="px-4 py-3">{house.house_location}</td> */}
                        <td className="px-4 py-3">{house.house_number}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {formatPrice(house.house_price)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {formatSize(house.house_size)}
                        </td>
                        <td className="px-4 py-3">{house.house_beds}</td>
                        <td className="px-4 py-3">{house.house_baths}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {house.house_type}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href="tel:+923204300002"
                            className="text-primary hover:underline transition duration-150 whitespace-nowrap">
                            M. Farhan Ilyas
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
