export const loginUser = async ({ user_phone, user_pw, isAdmin = false }) => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  var raw = JSON.stringify({
    user_phone: isAdmin ? user_phone : "+923494040586",
    user_pw: isAdmin ? user_pw : "P@ssword1",
  })

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  const endpoint = "https://api.real-exchange.com:9001/auth/login"

  try {
    const response = await fetch(endpoint, requestOptions)
    const result = await response.json()

    if (result.status_code === 200 && result.data && result.data.auth_token) {
      // Store token in localStorage
      localStorage.setItem("userToken", result.data.auth_token)
      // Store user data if needed
      localStorage.setItem("userData", JSON.stringify(result))
      return result
    } else {
      console.error("Login failed:", result.message)
      return null
    }
  } catch (error) {
    console.error("Error during login:", error)
    return null
  }
}

// Function to get stored token
export const getStoredToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userToken")
  }
  return null
}

// Function to check if user is logged in
export const isLoggedIn = () => {
  return !!getStoredToken()
}

// Function to logout
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userData")
  }
}

// Function to get user data
export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("userData")
    return userData ? JSON.parse(userData) : null
  }
  return null
}
