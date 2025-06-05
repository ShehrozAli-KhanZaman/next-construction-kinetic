"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { RentDataApi } from "@/utils/propertyApi"
import { formatPrice, formatSize } from "@/utils/formatUtils"
import { Moon, Sun, Filter } from "lucide-react"
import ContactButtons from "@/components/ui/ContactButtons"
import PaginationControls from "@/components/ui/PaginationControls"
import FloatingButton from "@/components/ui/FloatingButton"
import LocationSelect from "@/components/ui/LocationSelect"
import ContactPopup from "@/components/ui/ContactPopup"

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
  const [id, setId] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [filters, setFilters] = useState({
    rent_location: searchParams.get("rent_location") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    min_size: searchParams.get("min_size") || "",
    max_size: searchParams.get("max_size") || "",
  })

  const updateUrlParams = (updatedFilters) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    const fetchRents = async () => {
      try {
        setLoading(true)
        const paramMap = {
          rent_location: "rent_location",
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
      const valueA = a[sortConfig.key] || ""
      const valueB = b[sortConfig.key] || ""
      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1
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

  const handleLocationChange = (updatedFilters) => {
    const updated = { ...filters, ...updatedFilters }
    setFilters(updated)
    updateUrlParams(updated)
  }

  const truncateRemarks = (text) => {
    if (!text) return ""
    const words = text.split(" ")
    if (words.length > 2) {
      return words.slice(0, 2).join(" ") + "..."
    }
    return text
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-4 hidden sm:block">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white rounded-lg px-4 py-3 shadow-md">
                Rent Listings
              </h2>
              <LocationSelect
                onChange={handleLocationChange}
                paramName="rent_location"
              />
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                  <Filter size={20} />
                </button>
                <button
                  onClick={toggleTableTheme}
                  className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Header: Two rows (h2 + buttons, then location select) */}
          <div className="px-4 sm:hidden">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-white rounded-lg px-4 py-3 shadow-md">
                Rent Listings
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFiltersVisible(!filtersVisible)}
                  className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                  <Filter size={20} />
                </button>
                <button
                  onClick={toggleTableTheme}
                  className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
            <LocationSelect
              onChange={handleLocationChange}
              paramName="rent_location"
            />
          </div>

          {filtersVisible && (
            <div className="bg-gray-700 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <input
                type="number"
                name="min_price"
                value={filters.min_price}
                onChange={handleFilterChange}
                placeholder="Min Price"
                className="px-2 py-1 rounded-md text-black"
              />
              <input
                type="number"
                name="max_price"
                value={filters.max_price}
                onChange={handleFilterChange}
                placeholder="Max Price"
                className="px-2 py-1 rounded-md text-black"
              />
              <input
                type="number"
                name="min_size"
                value={filters.min_size}
                onChange={handleFilterChange}
                placeholder="Min Size"
                className="px-2 py-1 rounded-md text-black"
              />
              <input
                type="number"
                name="max_size"
                value={filters.max_size}
                onChange={handleFilterChange}
                placeholder="Max Size"
                className="px-2 py-1 rounded-md text-black"
              />
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t"></div>
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
                    isDark ? "bg-gray-800 text-gray-300" : "white text-gray-700"
                  }`}>
                  <tr className="text-sm font-semibold">
                    <th
                      onClick={() => handleSort("rent_date")}
                      className="px-4 py-3 text-center cursor-pointer">
                      Date{" "}
                      {sortConfig.key === "rent_date" &&
                        (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </th>
                    {!searchParams.get("rent_location") && (
                      <th
                        onClick={() => handleSort("rent_location")}
                        className="px-4 py-3 text-center cursor-pointer">
                        Area{" "}
                        {sortConfig.key === "rent_location" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                    )}
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
                      className="px-3 py-3 text-center cursor-pointer">
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
                <tbody
                  className={`text-sm ${
                    isDark
                      ? "divide-gray-700 text-gray-300"
                      : "divide-gray-200 text-gray-700"
                  } text-center`}>
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
                      <td className="px-4 py-1">
                        {new Date(rent.rent_last_updated).toLocaleDateString()}
                      </td>
                      {!searchParams.get("rent_location") && (
                        <td className="px-4 py-1 whitespace-nowrap">
                          {rent.rent_location || ""}
                        </td>
                      )}
                      <td className="px-4 py-1 whitespace-nowrap">
                        {rent.rent_number}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap">
                        {formatPrice(rent.rent_price)}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap">
                        {formatSize(rent.rent_size)}
                      </td>
                      <td className="px-4 py-1">{rent.rent_beds}</td>
                      <td className="px-4 py-1">{rent.rent_baths}</td>
                      <td className="px-4 py-1 whitespace-nowrap">
                        {truncateRemarks(rent.rent_type)}
                      </td>
                      <td className="px-4 py-1 whitespace-nowrap">
                        <ContactButtons
                          propertyType={"RENT"}
                          propertyId={rent.rent_number}
                          setIsPopupOpen={setIsPopupOpen}
                          setId={setId}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {isPopupOpen && (
            <ContactPopup
              id={id}
              onClose={() => setIsPopupOpen(false)}
              propertyType={"RENT"}
            />
          )}
          <FloatingButton />

          {totalItems > itemsPerPage && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
