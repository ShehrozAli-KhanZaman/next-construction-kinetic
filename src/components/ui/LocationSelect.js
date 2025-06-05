import React, { useState, useEffect } from "react"
import Select from "react-select"
import { useSearchParams, useRouter } from "next/navigation"
import { locations } from "@/lib/location"

const locationOptions = locations.map((loc) => ({ label: loc, value: loc }))

const LocationSelect = ({ onChange, paramName = "area" }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState(null)

  // Initialize selected location from searchParams
  useEffect(() => {
    const paramValue = searchParams.get(paramName)
    setSelectedLocation(
      paramValue
        ? locationOptions.find((opt) => opt.value === paramValue) || null
        : null
    )
  }, [searchParams, paramName])

  const handleAreaChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : ""
    setSelectedLocation(selectedOption)

    // Update URL with the selected location using paramName
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(paramName, value)
    } else {
      params.delete(paramName)
    }
    router.push(`?${params.toString()}`)

    // Trigger onChange callback with the updated filter
    if (onChange) {
      onChange({ [paramName]: value })
    }
  }

  return (
    <div className="w-full max-w-[300px]">
      <Select
        options={locationOptions}
        value={selectedLocation}
        onChange={handleAreaChange}
        isClearable
        placeholder="Select Area"
        className="text-white z-2000"
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: "#1F2937", // bg-gray-800
            borderColor: state.isFocused ? "#4B5563" : "#4B5563", // border-gray-600
            borderRadius: "0.375rem",
            padding: "0.25rem",
            color: "white",
            boxShadow: state.isFocused ? "0 0 0 1px #4B5563" : "none",
            "&:hover": {
              borderColor: "#6B7280", // border-gray-500
            },
          }),
          input: (provided) => ({
            ...provided,
            color: "white",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#D1D5DB", // text-gray-300
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#1F2937", // bg-gray-800
            borderRadius: "0.375rem",
            border: "1px solid #4B5563", // border-gray-600
            zIndex: 2000,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#374151" // bg-gray-700
              : state.isFocused
              ? "#4B5563" // bg-gray-600
              : "#1F2937", // bg-gray-800
            color: "white",
            "&:hover": {
              backgroundColor: "#4B5563", // bg-gray-600
            },
          }),
          clearIndicator: (provided) => ({
            ...provided,
            color: "#D1D5DB", // text-gray-300
            "&:hover": {
              color: "white",
            },
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: "#D1D5DB", // text-gray-300
            "&:hover": {
              color: "white",
            },
          }),
        }}
      />
    </div>
  )
}

export default LocationSelect
