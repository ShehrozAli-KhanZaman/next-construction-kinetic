import {
  List,
  ChevronUp,
  ChevronDown,
  Clock,
  History,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  X,
  Circle,
} from "lucide-react"

const SortModal = ({ isOpen, onClose, handleSort }) => {
  if (!isOpen) return null

  const sortOptions = [
    {
      label: "Plot No (Asc)",
      icon: ChevronUp,
      sortKey: "prop_address.address",
      sortOrder: "asc",
    },
    {
      label: "Plot No (Desc)",
      icon: ChevronDown,
      sortKey: "prop_address.address",
      sortOrder: "desc",
    },
    {
      label: "Newest (Date)",
      icon: Clock,
      sortKey: "prop_create_date",
      sortOrder: "desc",
    },
    {
      label: "Oldest (Date)",
      icon: History,
      sortKey: "prop_create_date",
      sortOrder: "asc",
    },
    {
      label: "Price (Low to High)",
      icon: ArrowUp,
      sortKey: "prop_price",
      sortOrder: "asc",
    },
    {
      label: "Price (High to Low)",
      icon: ArrowDown,
      sortKey: "prop_price",
      sortOrder: "desc",
    },
    {
      label: "Size (Min to Max)",
      icon: ArrowUpDown,
      sortKey: "prop_size",
      sortOrder: "asc",
    },
    {
      label: "Size (Max to Min)",
      icon: ArrowUpDown,
      sortKey: "prop_size",
      sortOrder: "desc",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-80 max-w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <List className="text-black mr-2" size={20} />
            <span className="text-lg font-bold text-black">Sort by</span>
          </div>
          <button onClick={onClose} className="text-black font-bold">
            <X size={20} />
          </button>
        </div>
        <hr className="border-gray-300 mb-4" />
        <div className="space-y-2">
          {sortOptions.map((option, index) => (
            <button
              key={index}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded"
              onClick={() => {
                handleSort(option.sortKey, option.sortOrder)
                onClose()
              }}>
              <div className="flex items-center">
                <option.icon className="text-black mr-2" size={18} />
                <span className="text-base font-medium text-black">
                  {option.label}
                </span>
              </div>
              <Circle className="text-black" size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SortModal
