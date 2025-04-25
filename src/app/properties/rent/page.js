"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { RentDataApi } from "@/utils/propertyApi"
import { formatPrice, formatSize } from "@/utils/formatUtils"
import { Moon, Sun, Filter } from "lucide-react"
import ContactButtons from "@/components/ui/ContactButtons"
import PaginationControls from "@/components/ui/PaginationControls"

export default function RentListingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rents, setRents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
  const [filtersVisible, setFiltersVisible] = useState(false)

  const [filters, setFilters] = useState({
    rent_location: searchParams.get("area") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    min_size: searchParams.get("min_size") || "",
    max_size: searchParams.get("max_size") || "",
  })

  const updateUrlParams = (updatedFilters) => {
    const params = new URLSearchParams()
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    const fetchRents = async () => {
      try {
        setLoading(true)
        const paramMap = {
          rent_location: "area",
          size_min: "min_size",
          size_max: "max_size",
          price_min: "min_price",
          price_max: "max_price",
          pool: "all",
        }

        const params = Object.entries(paramMap).reduce(
          (acc, [key, param]) => {
            const value = searchParams.get(param)
            if (value !== null && value !== "") {
              acc[key] = value
            }
            return acc
          },
          { page: currentPage }
        )

        // const params = {
        //   rent_location: searchParams.get("area") || "",
        //   size_min: searchParams.get("min_size") || "",
        //   size_max: searchParams.get("max_size") || "",
        //   price_min: searchParams.get("min_price") || "",
        //   price_max: searchParams.get("max_price") || "",
        //   page: currentPage,
        // }

        const result = await RentDataApi(params)

        if (
          result?.data?.prop_page?.Rents &&
          Array.isArray(result.data.prop_page.Rents)
        ) {
          setRents(result.data.prop_page.Rents)
          setTotalPages(result.data.prop_page.metadata?.total_pages || 1)
          setItemsPerPage(result.data.prop_page.metadata?.prop_per_page || 10)
          setTotalItems(result.data.prop_page.metadata?.total_prop || 0)
          setError(null)
        } else {
          setError("No rent listings found")
          setRents([])
        }
      } catch (err) {
        setError("Failed to fetch rent listings. Please try again.")
        console.error("Error fetching rent listings:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRents()
  }, [searchParams, currentPage])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedRents = [...rents].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const [tableTheme, setTableTheme] = useState("dark")
  const toggleTableTheme = () =>
    setTableTheme((prev) => (prev === "dark" ? "light" : "dark"))
  const isDark = tableTheme === "dark"

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const updatedFilters = { ...filters, [name]: value }
    setFilters(updatedFilters)
    updateUrlParams(updatedFilters)
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="relative mb-6">
            <h2 className="text-xl font-semibold text-white text-center py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-lg">
              Rent Listings
            </h2>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-2">
              {/* <button
                onClick={() => setFiltersVisible(!filtersVisible)}
                className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                <Filter size={20} />
              </button> */}
              <button
                onClick={toggleTableTheme}
                className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {filtersVisible && (
            <div className="bg-gray-700 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <input
                type="text"
                name="rent_location"
                value={filters.rent_location}
                onChange={handleFilterChange}
                placeholder="Location"
                className="px-2 py-1 rounded-md"
              />
              <input
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleFilterChange}
                placeholder="Min Price"
                className="px-2 py-1 rounded-md"
              />
              <input
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handleFilterChange}
                placeholder="Max Price"
                className="px-2 py-1 rounded-md"
              />
              <input
                type="number"
                name="min_size"
                value={filters.min_size}
                onChange={handleFilterChange}
                placeholder="Min Size"
                className="px-2 py-1 rounded-md"
              />
              <input
                type="number"
                name="max_size"
                value={filters.max_size}
                onChange={handleFilterChange}
                placeholder="Max Size"
                className="px-2 py-1 rounded-md"
              />
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-400">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table
                className={`min-w-full ${
                  isDark
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-900 border"
                } rounded-lg shadow-md`}>
                <thead
                  className={`${
                    isDark
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  }`}>
                  <tr className="text-sm font-semibold">
                    <th
                      onClick={() => handleSort("rent_date")}
                      className="px-4 py-3 text-center cursor-pointer">
                      Date{" "}
                      {sortConfig.key === "rent_date" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => handleSort("rent_number")}
                      className="px-4 py-3 text-center cursor-pointer">
                      Rent No{" "}
                      {sortConfig.key === "rent_number" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => handleSort("rent_price")}
                      className="px-4 py-3 text-center cursor-pointer">
                      Price{" "}
                      {sortConfig.key === "rent_price" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th
                      onClick={() => handleSort("rent_size")}
                      className="px-4 py-3 text-center cursor-pointer">
                      Size{" "}
                      {sortConfig.key === "rent_size" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    <th className="px-4 py-3 text-center">Beds</th>
                    <th className="px-4 py-3 text-center">Baths</th>
                    <th className="px-4 py-3 text-center">Type</th>
                    <th className="px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRents.map((rent, index) => (
                    <tr
                      key={index}
                      className={`${
                        isDark
                          ? index % 2 === 0
                            ? "bg-gray-900"
                            : "bg-gray-800"
                          : index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-100"
                      } hover:bg-opacity-75 text-center`}>
                      <td className="px-4 py-3">
                        {new Date(rent.rent_last_updated).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{rent.rent_number}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatPrice(rent.rent_price)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatSize(rent.rent_size)}
                      </td>
                      <td className="px-4 py-3">{rent.rent_beds}</td>
                      <td className="px-4 py-3">{rent.rent_baths}</td>
                      <td className="px-4 py-3">{rent.rent_type}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {/* <a
                          href={`tel:${rent.rent_phone_no}`}
                          className="text-primary hover:underline">
                          {rent.rent_phone_no}
                        </a> */}
                        <ContactButtons
                          propertyType={"RENT"}
                          propertyId={rent.rent_number}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalItems > itemsPerPage && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />
            // <div className="flex justify-between items-center px-4 py-3 bg-white border-t border-gray-200 rounded-2xl shadow-lg mt-6 sm:flex-nowrap flex-wrap">
            //   {/* Previous Button */}
            //   <button
            //     onClick={handlePreviousPage}
            //     disabled={currentPage === 1}
            //     className={`transition-all duration-300 flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold tracking-wide ${
            //       currentPage === 1
            //         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            //         : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg hover:scale-105 hover:brightness-110"
            //     }`}>
            //     <svg
            //       xmlns="http://www.w3.org/2000/svg"
            //       className="h-5 w-5"
            //       fill="none"
            //       viewBox="0 0 24 24"
            //       stroke="currentColor">
            //       <path
            //         strokeLinecap="round"
            //         strokeLinejoin="round"
            //         strokeWidth={2}
            //         d="M15 19l-7-7 7-7"
            //       />
            //     </svg>
            //     <span className="hidden sm:inline">Previous</span>
            //   </button>

            //   {/* Centered Page Info */}
            //   <span className="text-gray-700 text-sm font-medium tracking-wide text-center flex-1 mt-2 sm:mt-0 sm:w-auto">
            //     Page <strong className="text-purple-600">{currentPage}</strong>{" "}
            //     of <strong className="text-purple-600">{totalPages}</strong>
            //   </span>

            //   {/* Next Button */}
            //   <button
            //     onClick={handleNextPage}
            //     disabled={currentPage === totalPages}
            //     className={`transition-all duration-300 flex items-center gap-3 px-5 py-3 rounded-full text-sm font-semibold tracking-wide ${
            //       currentPage === totalPages
            //         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            //         : "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg hover:scale-105 hover:brightness-110"
            //     }`}>
            //     <span className="hidden sm:inline">Next</span>
            //     <svg
            //       xmlns="http://www.w3.org/2000/svg"
            //       className="h-5 w-5"
            //       fill="none"
            //       viewBox="0 0 24 24"
            //       stroke="currentColor">
            //       <path
            //         strokeLinecap="round"
            //         strokeLinejoin="round"
            //         strokeWidth={2}
            //         d="M9 5l7 7-7 7"
            //       />
            //     </svg>
            //   </button>
            // </div>
          )}
        </div>
      </div>
    </div>
  )
}
