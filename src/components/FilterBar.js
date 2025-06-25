import React, { useState } from "react"
import { useSearchParams } from "next/navigation"

const FilterBar = ({ filtersVisible = true, onChange }) => {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    area: searchParams.get("area") || "",
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
    history.replaceState(null, "", `?${params.toString()}`)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateUrlParams(filters)
      if (onChange) onChange(filters)
    }
  }

  // Function to convert number to PKR format (e.g., 1500000 → "15 Lakh Rupees")
  const numberToWords = (num) => {
    if (!num || num === "0") return ""

    const units = [
      "", // Ones
      "Thousand", // 10^3
      "Lakh", // 10^5
      "Crore", // 10^7
      "Arab", // 10^9
      "Kharab", // 10^11
      "Neel", // 10^13
      "Padma", // 10^15
      "Shankh", // 10^17
    ]

    num = parseInt(num, 10)
    if (num === 0) return "Zero"

    let result = ""
    let unitIndex = 0

    while (num > 0 && unitIndex < units.length) {
      let divisor
      if (unitIndex === 0) {
        divisor = 1000 // Handle the first chunk (up to thousands)
      } else if (unitIndex === 1) {
        divisor = 100 // Handle thousands to lakhs
      } else {
        divisor = 100 // Handle lakhs, crores, etc.
      }

      const chunk = Math.floor(num % divisor)
      if (chunk > 0) {
        result = `${chunk} ${units[unitIndex]}` + (result ? " " + result : "")
      }
      num = Math.floor(num / (unitIndex === 0 ? 1000 : 100))
      unitIndex++
    }

    return result.trim() + " Rupees"
  }

  if (!filtersVisible) return null

  return (
    <div className="bg-gray-700 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 z-1000">
      {["min_price", "max_price", "min_size", "max_size"].map((field) => {
        // Determine if the input should show placeholder for edge cases
        let displayValue = filters[field]
        const placeholderText = field
          .replace("_", " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())

        if (field === "min_price" && parseFloat(filters[field]) === 0) {
          displayValue = ""
        }
        if (field === "max_price" && parseFloat(filters[field]) > 1000000000) {
          displayValue = ""
        }

        return (
          <div key={field} className="flex flex-col">
            <input
              type="number"
              name={field}
              value={displayValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder={placeholderText}
              className="px-2 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {(field === "min_price" || field === "max_price") &&
              filters[field] &&
              parseFloat(filters[field]) <= 1000000000 && (
                <span className="text-xs text-gray-300 mt-1">
                  {numberToWords(filters[field])}
                </span>
              )}
          </div>
        )
      })}
    </div>
  )
}

export default FilterBar
