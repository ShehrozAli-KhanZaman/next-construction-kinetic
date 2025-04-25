import React, { useEffect, useState } from "react"

const SelectableButtonGroup = ({ buttons = [], initialSelectedId = null }) => {
  const [selectedId, setSelectedId] = useState(initialSelectedId)
  const [loadingId, setLoadingId] = useState(null)

  // Default selection to first button if none specified
  useEffect(() => {
    if (!initialSelectedId && buttons.length > 0) {
      setSelectedId(buttons[0].id)
    }
  }, [initialSelectedId, buttons])

  const handleClick = async (button) => {
    setSelectedId(button.id)
    setLoadingId(button.id)
    try {
      if (button.onPress) {
        await button.onPress()
      }
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="w-full max-w-lg flex flex-row rounded-lg p-2 mb-2 self-center items-center justify-center gap-4">
      {buttons.map((button) => {
        const isSelected = selectedId === button.id
        const isLoading = loadingId === button.id

        return (
          <button
            key={button.id}
            onClick={() => handleClick(button)}
            disabled={isLoading}
            className={`animated-hover-btn selectable-btn ${
              isSelected ? "selected" : "no-gradient"
            } flex self-end justify-center items-center px-6 py-2 text-sm rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}>
            <span>{button.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default SelectableButtonGroup
