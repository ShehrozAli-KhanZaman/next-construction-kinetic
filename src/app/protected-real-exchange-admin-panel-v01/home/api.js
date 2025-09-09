import { baseUrl } from "@/utils/baseUrl"

// Get auth token from localStorage or sessionStorage
const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('userToken') || sessionStorage.getItem('authToken');
    }
    return null;
};

export const getAdminCount = async () => {
    const authToken = getAuthToken();

    if (!authToken) {
        console.error("No auth token found");
        return null;
    }

    var myHeaders = new Headers();
    myHeaders.append("Auth-Token", authToken);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    };

    const endpoint = baseUrl + "/spr/user_verification_tracker?search_type=admin_count";

    try {
        const response = await fetch(endpoint, requestOptions);
        const result = await response.json();

        if (result.status_code === 200 && result.data && result.data.counts) {
            return result;
        } else {
            console.error("Getting admin count failed:", result.message);
            return null;
        }
    } catch (error) {
        console.error("Error getting admin count:", error);
        return null;
    }
};

export const getUsers = async (searchType = "app_users_all", page = 1, limit = 10, daysBack = 14) => {
    const authToken = getAuthToken();

    if (!authToken) {
        console.error("No auth token found");
        return null;
    }

    var myHeaders = new Headers();
    myHeaders.append("Auth-Token", authToken);

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
    };

    const endpoint = `${baseUrl}/spr/user_verification_tracker?search_type=${searchType}&days_back=${daysBack}&page=${page}&limit=${limit}`;

    try {
        const response = await fetch(endpoint, requestOptions);
        const result = await response.json();

        if (result.status_code === 200) {
            return result;
        } else {
            console.error("Getting users failed:", result.message);
            return null;
        }
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
};