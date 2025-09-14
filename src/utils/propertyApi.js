import { getStoredToken, loginUser } from "./auth"
import { baseURL } from "./common"

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

// Helper function to get auth token with automatic refresh
const getAuthTokenWithRefresh = async () => {
  let authToken = getStoredToken()

  if (!authToken) {
    const loginResult = await loginUser({ user_phone: "", user_pw: "", isAdmin: false })

    if (loginResult && loginResult.data && loginResult.data.auth_token) {
      authToken = loginResult.data.auth_token
    } else {
      return null
    }
  }

  return authToken
}

export const SearchPropApi = async (searchParams) => {
  const authToken = await getAuthTokenWithRefresh()
  if (!authToken) {
    console.error("failed to refresh")
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
  let endpoint = "/realtorproperty/search?" + buildQueryString(searchParams)

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
  const authToken = await getAuthTokenWithRefresh()
  if (!authToken) {
    console.error("failed to refresh")
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
  const authToken = await getAuthTokenWithRefresh()
  if (!authToken) {
    console.error("failed to refresh")
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
