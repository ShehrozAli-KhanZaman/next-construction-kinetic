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
  if (!size) return "N/A"

  // Convert to acres if size is 1 acre or more
  if (size >= 43560) {
    const acres = size / 43560
    return `${acres.toFixed(2)} Acre`
  }

  // Convert to kanals if size is 1 kanal or more
  if (size >= 5445) {
    const kanals = size / 5445
    return `${kanals.toFixed(2)} Kanal`
  }

  // Convert to marlas if size is 1 marla or more
  if (size >= 272.25) {
    const marlas = size / 272.25
    return `${marlas.toFixed(2)} Marla`
  }

  // For smaller sizes, show in square feet
  return `${size.toLocaleString()} sq ft`
}
