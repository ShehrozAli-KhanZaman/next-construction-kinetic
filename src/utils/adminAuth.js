// Admin-specific authentication utilities
// Separate from the main application authentication

// Admin login function
export const adminLogin = async ({ user_phone, user_pw }) => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({
        user_phone: user_phone,
        user_pw: user_pw,
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
            // Store admin token in localStorage with admin prefix
            localStorage.setItem("adminToken", result.data.auth_token)
            // Store admin user data if needed
            localStorage.setItem("adminData", JSON.stringify(result))
            // Set login timestamp for 1-hour expiry
            localStorage.setItem("adminLoginTime", Date.now().toString())
            // Set isAdminLoggedIn flag
            localStorage.setItem("isAdminLoggedIn", "true")
            return result
        } else {
            console.error("Admin login failed:", result.message)
            return null
        }
    } catch (error) {
        console.error("Error during admin login:", error)
        return null
    }
}

// Function to get stored admin token
export const getAdminToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("adminToken")
    }
    return null
}

// Function to check if admin is logged in
export const isAdminLoggedIn = () => {
    if (typeof window === "undefined") return false;

    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    const loginTime = localStorage.getItem("adminLoginTime");

    if (!isLoggedIn || !loginTime) {
        return false;
    }

    // Check if 1 hour (3600000 ms) has passed
    const currentTime = Date.now();
    const timeDiff = currentTime - parseInt(loginTime);
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    if (timeDiff > oneHour) {
        // Session expired, clear all admin data
        adminLogout();
        return false;
    }

    return true;
}

// Function to logout admin
export const adminLogout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminData")
        localStorage.removeItem("adminLoginTime")
        localStorage.removeItem("isAdminLoggedIn")
    }
}

// Function to get admin data
export const getAdminData = () => {
    if (typeof window !== "undefined") {
        const adminData = localStorage.getItem("adminData")
        return adminData ? JSON.parse(adminData) : null
    }
    return null
}

// Function to validate admin token (optional - for future use)
export const validateAdminToken = async () => {
    const token = getAdminToken()
    if (!token) return false

    // You can add API call here to validate token with server
    // For now, just check if token exists
    return true
}

// Function to check session expiry and clear if expired
export const checkSessionExpiry = () => {
    if (typeof window === "undefined") return false;

    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    const loginTime = localStorage.getItem("adminLoginTime");

    if (!isLoggedIn || !loginTime) {
        return false;
    }

    // Check if 1 hour has passed
    const currentTime = Date.now();
    const timeDiff = currentTime - parseInt(loginTime);
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

    if (timeDiff > oneHour) {
        // Session expired, clear all admin data
        adminLogout();
        return false;
    }

    return true;
}

// Function to start periodic session check (call this on app load)
export const startSessionCheck = () => {
    if (typeof window === "undefined") return;

    // Check every 5 minutes
    setInterval(() => {
        checkSessionExpiry();
    }, 5 * 60 * 1000); // 5 minutes
}
