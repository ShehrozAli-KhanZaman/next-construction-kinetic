import React from "react"
import { FilterIcon } from "lucide-react"

const TableHeader = ({ sortConfig, handleSort, searchParams }) => {
  return (
    <tr className="text-sm font-semibold">
      <th className="px-4 py-1 text-center">
        <div className="flex items-center justify-center gap-2">
          <span
            className="cursor-pointer"
            onClick={() => handleSort("prop_create_date")}>
            Date
          </span>
          {sortConfig.key === "prop_create_date" &&
            (sortConfig.direction === "asc" ? "↑" : "↓")}
          {sortConfig.key !== "prop_create_date" && (
            <FilterIcon
              size={15}
              className="text-white-500 hover:text-yellow-400 cursor-pointer"
              onClick={() => handleSort("prop_create_date")}
            />
          )}
        </div>
      </th>
      {!searchParams.get("area") && (
        <th className="px-4 py-1 text-center">
          <div className="flex items-center justify-center gap-2">
            <span
              className="cursor-pointer"
              onClick={() => handleSort("prop_address.area")}>
              Area
            </span>
            {sortConfig.key === "prop_address.area" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
            {sortConfig.key !== "prop_address.area" && (
              <FilterIcon
                size={15}
                className="text-white-500 hover:text-yellow-400 cursor-pointer"
                onClick={() => handleSort("prop_address.area")}
              />
            )}
          </div>
        </th>
      )}
      <th className="px-4 py-1 text-center">
        <div className="flex items-center justify-center gap-2">
          <span
            className="cursor-pointer"
            onClick={() => handleSort("prop_address.address")}>
            Plot No
          </span>
          {sortConfig.key === "prop_address.address" &&
            (sortConfig.direction === "asc" ? "↑" : "↓")}
          {sortConfig.key !== "prop_address.address" && (
            <FilterIcon
              size={15}
              className="text-white-500 hover:text-yellow-400 cursor-pointer"
              onClick={() => handleSort("prop_address.address")}
            />
          )}
        </div>
      </th>
      <th className="px-4 py-1 text-center">
        <div className="flex items-center justify-center gap-2">
          <span
            className="cursor-pointer"
            onClick={() => handleSort("prop_price")}>
            Price
          </span>
          {sortConfig.key === "prop_price" &&
            (sortConfig.direction === "asc" ? "↑" : "↓")}
          {sortConfig.key !== "prop_price" && (
            <FilterIcon
              size={15}
              className="text-white-500 hover:text-yellow-400 cursor-pointer"
              onClick={() => handleSort("prop_price")}
            />
          )}
        </div>
      </th>
      <th className="px-4 py-1 text-center">
        <div className="flex items-center justify-center gap-2">
          <span
            className="cursor-pointer"
            onClick={() => handleSort("prop_size")}>
            Size
          </span>
          {sortConfig.key === "prop_size" &&
            (sortConfig.direction === "asc" ? "↑" : "↓")}
          {sortConfig.key !== "prop_size" && (
            <FilterIcon
              size={15}
              className="text-white-500 hover:text-yellow-400 cursor-pointer"
              onClick={() => handleSort("prop_size")}
            />
          )}
        </div>
      </th>
      <th className="px-4 py-1 text-center">Type</th>
      <th className="px-4 py-1 text-center">Remarks</th>
      <th className="px-4 py-1 text-center">Details</th>
    </tr>
  )
}

export default TableHeader
