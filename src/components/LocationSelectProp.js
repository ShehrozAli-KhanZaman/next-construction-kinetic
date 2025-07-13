"use client"

import React, { useState } from "react"
import Select from "react-select"
import { motion } from "framer-motion"
import { locations } from "@/lib/location"

const locationOptions = locations.map((loc) => ({ label: loc, value: loc }))

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const LocationSelect = ({ onChange }) => {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleAreaChange = (selectedOption) => {
    setSelectedLocation(selectedOption)
    if (onChange) {
      onChange(selectedOption?.value || "")
    }
  }

  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[275px]">
      <label className="block text-[12px] font-medium text-white mb-1">
        Location
      </label>
      <Select
        options={locationOptions}
        value={selectedLocation}
        onChange={handleAreaChange}
        isClearable
        placeholder="Select Location"
        className="text-[12px] z-2000 text-white"
        menuPortalTarget={document.body}
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: "transparent",
            borderColor: state.isFocused ? "#4B5563" : "#4B5563",
            borderWidth: "1px",
            borderRadius: " border border-white/20 rounded-md", //"0.375rem",
            minHeight: "32px", // Decreased height
            height: "35px", // Force height
            padding: "0 4px",
            color: "white",
            boxShadow: state.isFocused ? "0 0 0 1pxrgb(191, 202, 218)" : "none",
            "&:hover": {
              borderColor: "white",
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            height: "30px",
            padding: "0 6px",
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            height: "30px",
          }),
          input: (provided) => ({
            ...provided,
            color: "white",
            margin: 0,
            paddingBottom: 0,
            paddingTop: 0,
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "white",
            fontSize: "12px",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white",
            fontSize: "12px",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#1F2937",
            borderRadius: "0.375rem",
            border: "1px solid #4B5563",
            zIndex: 2000,
          }),
          menuList: (provided) => ({
            ...provided,
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "auto",
            scrollbarColor: "#6B7280 transparent", // gray-500
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? "#374151"
              : state.isFocused
              ? "#4B5563"
              : "#1F2937",
            color: "white",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#4B5563",
            },
            maxHeight: "150px",
            overflowY: "auto",
          }),
          clearIndicator: (provided) => ({
            ...provided,
            color: "#D1D5DB",
            padding: "0 4px",
            "&:hover": {
              color: "white",
            },
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            color: "#D1D5DB",
            padding: "0 4px",
            "&:hover": {
              color: "white",
            },
          }),
        }}
      />
    </motion.div>
  )
}

export default LocationSelect
