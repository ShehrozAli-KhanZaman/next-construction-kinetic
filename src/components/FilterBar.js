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

  if (!filtersVisible) return null

  return (
    <div className="bg-gray-700 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 z-1000">
      {/* Numeric filters */}
      {["min_price", "max_price", "min_size", "max_size"].map((field) => (
        <input
          key={field}
          type="number"
          name={field}
          value={filters[field]}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={field
            .replace("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
          className="px-2 py-1 rounded-md text-black"
        />
      ))}
    </div>
  )
}

export default FilterBar
