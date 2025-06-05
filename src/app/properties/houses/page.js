"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HouseDataApi } from "@/utils/propertyApi"
import { formatPrice, formatSize } from "@/utils/formatUtils"
import { Filter, Moon, Sun } from "lucide-react"
import ContactButtons from "@/components/ui/ContactButtons"
import PaginationControls from "@/components/ui/PaginationControls"
import FilterBar from "@/components/FilterBar"
import FloatingButton from "@/components/ui/FloatingButton"
import LocationSelect from "@/components/ui/LocationSelect"

export default function HousesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
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
  const [filtersVisible, setFiltersVisible] = useState(false)

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true)
        const paramMap = {
          house_location: "house_location",
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

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedHouses = [...houses].sort((a, b) => {
    if (sortConfig.key) {
      const valueA = a[sortConfig.key] || ""
      const valueB = b[sortConfig.key] || ""
      if (valueA < valueB) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (valueA > valueB) {
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

  const isDark = tableTheme === "dark"
  const handleFiltersChange = (filters) => {
    updateUrlParams(filters)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="pt-20 px-1">
        <div className="max-w-7xl">
          <div className="bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {/* Desktop Header: Single row with h2, location select, buttons */}
              <div className="px-4 hidden sm:block">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white rounded-lg px-4 py-3 shadow-md">
                    House Listings
                  </h2>
                  <LocationSelect
                    onChange={handleFiltersChange}
                    paramName="house_location"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setFiltersVisible(!filtersVisible)}
                      className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                      <Filter size={20} />
                    </button>
                    <button
                      onClick={toggleTableTheme}
                      className="flex items-center justify-center px-4 py-2 text-white hover:bg-primary/80 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110">
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
              </div>
              {/* Mobile Header: Two rows (h2 + buttons, then location select) */}
              <div className="px-4 sm:hidden">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-white rounded-lg px-4 py-3 shadow-md">
                    House Listings
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setFiltersVisible(!filtersVisible)}
                      className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                      <Filter size={20} />
                    </button>
                    <button
                      onClick={toggleTableTheme}
                      className="flex items-center justify-center px-4 py-2 text-white hover:bg-primary/80 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110">
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
                <LocationSelect
                  onChange={handleFiltersChange}
                  paramName="house_location"
                />
              </div>
              <FilterBar
                onChange={handleFiltersChange}
                filtersVisible={filtersVisible}
              />
              {loading ? (
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-400">{error}</div>
              ) : (
                <table
                  className={`min-w-full ${
                    isDark
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-900 border border-gray-300"
                  } rounded-lg shadow-md overflow-hidden`}>
                  <thead
                    className={`sticky top-0 z-10 ${
                      isDark
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                    <tr className="text-sm font-semibold">
                      <th
                        className="px-4 py-3 text-center cursor-pointer"
                        onClick={() => handleSort("house_date")}>
                        Date{" "}
                        {sortConfig.key === "house_date" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      {!searchParams.get("house_location") && (
                        <th
                          className="px-4 py-3 text-center cursor-pointer"
                          onClick={() => handleSort("house_location")}>
                          Area{" "}
                          {sortConfig.key === "house_location" &&
                            (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                      )}
                      <th
                        className="px-4 py-3 text-center cursor-pointer"
                        onClick={() => handleSort("house_number")}>
                        House No{" "}
                        {sortConfig.key === "house_number" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-center cursor-pointer"
                        onClick={() => handleSort("house_price")}>
                        Price{" "}
                        {sortConfig.key === "house_price" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-center cursor-pointer"
                        onClick={() => handleSort("house_size")}>
                        Size{" "}
                        {sortConfig.key === "house_size" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="px-4 py-3 text-center">Beds</th>
                      <th className="px-4 py-3 text-center">Baths</th>
                      <th className="px-4 py-3 text-center">Old/New</th>
                      <th className="px-4 py-3 text-center">Details</th>
                    </tr>
                  </thead>
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
                        } text-center`}>
                        <td className="px-4 py-1">
                          {new Date(
                            house.house_last_updated
                          ).toLocaleDateString()}
                        </td>
                        {!searchParams.get("house_location") && (
                          <td className="px-4 py-1 whitespace-nowrap">
                            {house.house_location || ""}
                          </td>
                        )}
                        <td className="px-4 py-1 whitespace-nowrap">
                          {house.house_number}
                        </td>
                        <td className="px-4 py-1 whitespace-nowrap">
                          {formatPrice(house.house_price)}
                        </td>
                        <td className="px-4 py-1 whitespace-nowrap">
                          {formatSize(house.house_size)}
                        </td>
                        <td className="px-4 py-1">{house.house_beds}</td>
                        <td className="px-4 py-1">{house.house_baths}</td>
                        <td className="px-4 py-1 whitespace-nowrap">
                          {house.house_type}
                        </td>
                        <td className="px-4 py-1">
                          <ContactButtons
                            propertyType={"HOUSE"}
                            propertyId={house.house_id}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
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
    </div>
  )
}
