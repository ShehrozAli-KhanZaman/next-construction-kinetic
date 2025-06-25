export const formatPrice = (price) => {
  if (!price) return "N/A"

  // Convert to crores if price is 1 crore or more
  // if (price >= 10000000) {
  //   const crores = price / 10000000
  //   return `${crores.toFixed(2)} Crore`
  // }

  // Convert to lakhs if price is 1 lakh or more
  if (price >= 100000) {
    const lakhs = price / 100000
    return `${lakhs.toFixed(0)} Lac`
  }

  // For smaller amounts, show in thousands
  const thousands = price / 1000
  return `${thousands.toFixed(0)} Thousand`
}

export const formatSize = (size) => {
  // Handle invalid or non-positive sizes
  if (!size || size <= 0 || isNaN(size)) return "N/A"

  // Helper function to format number (remove trailing zeros and handle large numbers)
  const formatNumber = (num) => {
    const rounded = Number(num.toFixed(2)) // Round to 2 decimal places
    return rounded % 1 === 0
      ? rounded.toLocaleString() // No decimals for whole numbers
      : rounded.toFixed(0).replace(/\.?0+$/, "") // Remove trailing zeros
  }

  // Helper function to determine singular/plural unit
  const getUnit = (value, singular) => {
    return Number(value) === 1 ? singular : `${singular}s`
  }

  // Convert to acres if size is 1 acre or more
  if (size >= 43560) {
    const acres = size / 43560
    return `${formatNumber(acres)} ${getUnit(acres, "Acre")}`
  }

  // Convert to kanals if size is 1 kanal or more
  if (size >= 9000) {
    const kanals = size / 4500
    return `${formatNumber(kanals)} ${getUnit(kanals, "Kanal")}`
  }

  // Convert to marlas if size is 1 marla or more
  if (size >= 225) {
    const marlas = size / 225
    return `${formatNumber(marlas)} ${getUnit(marlas, "Marla")}`
  }

  // For smaller sizes, show in square feet
  return `${size.toLocaleString()} sq ft`
}
