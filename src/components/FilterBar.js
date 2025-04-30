import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const FilterBar = ({ filtersVisible = true, onChange }) => {
  const searchParams = useSearchParams()

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
    history.replaceState(null, '', `?${params.toString()}`)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const updatedFilters = { ...filters, [name]: value }
    setFilters(updatedFilters)
    updateUrlParams(updatedFilters)
    if (onChange) onChange(updatedFilters)
  }

  if (!filtersVisible) return null

  return (
    <div className="bg-gray-700 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {['rent_location', 'min_price', 'max_price', 'min_size', 'max_size'].map((field) => (
        <input
          key={field}
          type={field.includes('price') || field.includes('size') ? 'number' : 'text'}
          name={field}
          value={filters[field]}
          onChange={handleFilterChange}
          placeholder={field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          className="px-2 py-1 rounded-md text-black"
        />
      ))}
    </div>
  )
}

export default FilterBar
