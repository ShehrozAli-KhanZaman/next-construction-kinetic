import { getStoredToken } from "./auth"

const baseURL = "https://api.real-exchange.com:9001"
const buildQueryString = (params) => {
  return Object.entries(params)
    .filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
    .map(([key, value]) => {
      if (key === "area") {
        return `${key}=${value}` // Don't encode area
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join("&")
}

export const SearchPropApi = async (searchParams) => {
  const authToken = getStoredToken()
  if (!authToken) {
    console.error("No auth token found")
    return null
  }

  var myHeaders = new Headers()
  myHeaders.append("Auth-Token", authToken)
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  // Build the query string using the searchParams
  let endpoint = "/prop/search?" + buildQueryString(searchParams)

  return fetch(baseURL + endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return result
      } else {
        console.error("Request successful but no data returned")
        return null
      }
    })
    .catch((error) => {
      console.error("Error encountered: Properties Not Found", error)
      return null
    })
}

export const HouseDataApi = async (searchParams) => {
  const authToken = getStoredToken()
  if (!authToken) {
    console.error("No auth token found")
    return null
  }

  var myHeaders = new Headers()
  myHeaders.append("Auth-Token", authToken)
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  let endpoint = "/houses/search?pool=all&" + new URLSearchParams(searchParams)
  return fetch(baseURL + endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return result
      } else {
        console.error("Request Successful but no data returned")
        return null
      }
    })
    .catch((error) => {
      console.error("Error encountered: Houses Not Found", error)
      return null
    })
}

export const RentDataApi = async (searchParams) => {
  const authToken = getStoredToken()
  if (!authToken) {
    console.error("No auth token found")
    return null
  }

  var myHeaders = new Headers()
  myHeaders.append("Auth-Token", authToken)
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  let endpoint = "/rent/search?pool=all&" + new URLSearchParams(searchParams)

  return fetch(baseURL + endpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result) {
        return result
      } else {
        console.error("Request Successful but no data returned")
        return null
      }
    })
    .catch((error) => {
      console.error("Error encountered: Houses Not Found", error)
      return null
    })
}
