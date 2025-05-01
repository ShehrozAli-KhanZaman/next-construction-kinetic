"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SearchPropApi } from "@/utils/propertyApi"
import { formatPrice, formatSize } from "@/utils/formatUtils"
import { Filter, Moon, Sun } from "lucide-react"
import ContactButtons from "@/components/ui/ContactButtons"
import PaginationControls from "@/components/ui/PaginationControls"
import FilterBar from "@/components/FilterBar"

export default function PlotsPage() {
  const handleFiltersChange = (filters) => {
    updateUrlParams(filters)
  }
  const searchParams = useSearchParams()
  const [filtersVisible, setFiltersVisible] = useState(false)
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
  const [tableTheme, setTableTheme] = useState("dark")

  const toggleTableTheme = () => {
    setTableTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const isDark = tableTheme === "dark"

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="pt-20 px-2">
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
                <div className="relative mb-6 z-200">
                  <h2 className="text-xl font-semibold text-white text-center py-3 shadow-md bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-lg">
                    Plot Listings
                  </h2>

                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-2 ml-35">
                    <button
                      onClick={() => setFiltersVisible(!filtersVisible)}
                      className="px-4 py-2 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                      <Filter size={20} />
                    </button>
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

                <FilterBar
                  onChange={handleFiltersChange}
                  filtersVisible={filtersVisible}
                />

                <table
                  className={`min-w-full divide-y rounded-lg shadow-md overflow-hidden ${
                    isDark
                      ? "divide-gray-700 bg-gray-900 text-white"
                      : "divide-gray-200 bg-white text-gray-900"
                  }`}>
                  {/* Table Head */}
                  <thead
                    className={`${
                      isDark ? "bg-gray-800" : "bg-gray-200"
                    } sticky top-0 z-10`}>
                    <tr className="text-sm font-semibold">
                      <th
                        className="px-4 py-3 text-center cursor-pointer"
                        onClick={() => handleSort("prop_create_date")}>
                        Date{" "}
                        {sortConfig.key === "prop_create_date" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-center cursor-pointer"
                        onClick={() => handleSort("prop_address")}>
                        Plot No{" "}
                        {sortConfig.key === "prop_address" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-center cursor-pointer"
                        onClick={() => handleSort("prop_price")}>
                        Price{" "}
                        {sortConfig.key === "prop_price" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th
                        className="px-4 py-3 text-center cursor-pointer"
                        onClick={() => handleSort("prop_size")}>
                        Size{" "}
                        {sortConfig.key === "prop_size" &&
                          (sortConfig.direction === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="px-4 py-3 text-center">Type</th>
                      <th className="px-4 py-3 text-center">Remarks</th>
                      <th className="px-4 py-3 text-center">Details</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody
                    className={`text-sm ${
                      isDark
                        ? "divide-gray-700 text-gray-300"
                        : "divide-gray-200 text-gray-700"
                    } text-center`}>
                    {sortedPlots.map((plot, index) => (
                      <tr
                        key={index}
                        className={
                          isDark
                            ? index % 2 === 0
                              ? "bg-gray-900 hover:bg-gray-800"
                              : "bg-gray-800 hover:bg-gray-700"
                            : index % 2 === 0
                            ? "bg-white hover:bg-gray-100"
                            : "bg-gray-100 hover:bg-gray-200"
                        }>
                        <td className="px-4 py-3">
                          {new Date(
                            plot.prop_last_updated
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {typeof plot.prop_address === "object"
                            ? `${plot.prop_address?.address || ""}`
                            : plot.prop_address}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {formatPrice(plot.prop_price)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {formatSize(plot.prop_size)}
                        </td>
                        <td className="px-4 py-3">
                          {plot.prop_type?.sub_type}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {plot.prop_description}
                        </td>
                        <td className="px-4 py-3">
                          <ContactButtons
                            propertyType={"PLOT"}
                            propertyId={plot.prop_userfacing_id}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <PaginationControls
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
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
