"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SearchPropApi, HouseDataApi } from "@/utils/propertyApi"
import { useSearchParams } from "next/navigation"
export default function PropertyResults({ onClose }) {
  const searchParams = useSearchParams()

  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResults = async () => {
      console.log(
        "These are received seachparams in property Results : ",
        searchParams
      )
      try {
        setLoading(true)

        const paramsObj = Object.fromEntries(searchParams.entries())

        let response
        if (paramsObj.type === "Plot") {
          response = await SearchPropApi(paramsObj)
        } else {
          response = await HouseDataApi(paramsObj)
        }

        if (response && response.status_code === 200) {
          setResults(response.data.prop_page)
        } else {
          setError("No results found")
        }
      } catch (err) {
        setError("Error fetching results")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [searchParams])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatSize = (size) => {
    return `${size.toLocaleString()} sq ft`
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-center">Loading results...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <p className="text-red-500">{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Search Results</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {searchParams.prop_type === "Plot" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results?.properties?.map((property) => (
                  <tr key={property.prop_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.prop_title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.prop_address.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatSize(property.prop_size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(property.prop_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {property.prop_contact_number}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beds
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Baths
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results?.Houses?.map((house) => (
                  <tr key={house.house_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {house.house_location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatSize(house.house_size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatPrice(house.house_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {house.house_beds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {house.house_baths}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {house.house_phone_no}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {results?.metadata && (
          <div className="mt-4 text-sm text-gray-500">
            Page {results.metadata.current_page} of{" "}
            {results.metadata.total_pages} ({results.metadata.total_prop} total
            properties)
          </div>
        )}
      </div>
    </motion.div>
  )
}
