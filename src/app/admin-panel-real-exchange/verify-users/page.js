"use client"

import { useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User, Smartphone, Shield, CheckCircle, Clock } from "lucide-react"
import { getStoredToken } from "@/utils/auth"
import { baseURL } from "@/utils/common"
import Image from "next/image"

export default function VerifyUsersPanel() {
  const [phone, setPhone] = useState("")
  const [verified, setVerified] = useState("true")
  const [enableFreeTrial, setEnableFreeTrial] = useState(false)
  const [loading, setLoading] = useState(false)
  const endpoint = "/acc/update_verified_acc"
  const freeTrialEndpoint = "/acc/update_expiry_user"

  const validatePhone = (phone) => {
    return phone.startsWith("+92") && phone.length >= 12
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().replace("T", " ").slice(0, 19)
  }

  const getSevenDaysFromNow = () => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return formatDate(date.toISOString())
  }

  const handleVerifyUser = async (e) => {
    e.preventDefault()
    if (!phone) {
      toast.error("Phone number is required")
      return
    }
    if (!validatePhone(phone)) {
      toast.error(
        "Phone number must start with +92 and be at least 12 characters"
      )
      return
    }
    const authToken = getStoredToken()
    if (!authToken) {
      toast.error("Token expired")
      return null
    }

    setLoading(true)

    try {
      // First API call - Update verification status
      const verifyConfig = {
        method: "post",
        url: baseURL + endpoint,
        headers: {
          "Auth-Token": authToken,
          "Content-Type": "application/json",
        },
        data: {
          user_phone: phone,
          verified_acc: verified === "true",
        },
      }

      await axios.request(verifyConfig)

      // Second API call - Enable free trial if checkbox is checked
      if (enableFreeTrial) {
        const freeTrialConfig = {
          method: "post",
          url: baseURL + freeTrialEndpoint,
          headers: {
            "Auth-Token": authToken,
            "Content-Type": "application/json",
          },
          data: {
            user_phone: phone,
            user_status: "free_trial",
            user_acc_expiry: getSevenDaysFromNow(),
            user_device_id: false,
          },
        }

        await axios.request(freeTrialConfig)
        toast.success("User verification status updated and free trial enabled successfully")
      } else {
        toast.success("User verification status updated successfully")
      }

      setPhone("") // Clear form after success
      setEnableFreeTrial(false) // Reset checkbox
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("Failed to update user status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-12 mb-6 sm:mb-8 lg:mb-12">
          <div
            className="flex items-center justify-center w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] rounded-full shadow-2xl ring-2 ring-white/30 backdrop-blur-md isolate"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 100%)",
            }}>
            <Image
              src="/images/Logo/Ck/RE.png"
              alt="REAL Exchange"
              width={120}
              height={120}
              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px] object-contain"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-2 sm:mb-3 lg:mb-4">
              User Verification Panel
            </h1>
            <h2 className="text-xl lg:text-2xl font-semibold text-white/80">
              Real Exchange
            </h2>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Guidance Section */}
            <div className="text-gray-200">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-400" />
                Verify User Accounts
              </h2>
              <ul className="space-y-4 text-base">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <div>
                    <span className="font-medium">Phone Number:</span> Enter a
                    phone number starting with +92 (e.g., +923494040400, min.
                    12 characters). Invalid entries trigger an error.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <div>
                    <span className="font-medium">Verification Status:</span> Select
                    True (verified) or False (unverified) from the dropdown to
                    update the user's verification status.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <div>
                    <span className="font-medium">Submit:</span> Click Verify User
                    to apply changes. Success or error notifications will appear.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <div>
                    <span className="font-medium">Free Trial:</span> Check "Enable Free Trial" to automatically set user status to free trial with 7-day expiry.
                  </div>
                </li>
              </ul>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 pl-12 bg-gray-700 text-white text-sm rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                    placeholder="+923123456789"
                    required
                    maxLength={13}
                  />
                  <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Verification Status
                </label>
                <div className="relative">
                  <select
                    value={verified}
                    onChange={(e) => setVerified(e.target.value)}
                    className="w-full p-4 pl-12 bg-gray-700 text-white text-sm rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 appearance-none">
                    <option value="true">Verified (True)</option>
                    <option value="false">Unverified (False)</option>
                  </select>
                  <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableFreeTrial}
                    onChange={(e) => setEnableFreeTrial(e.target.checked)}
                    className="w-5 h-5 text-green-600 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-300">Enable Free Trial</span>
                  <Clock className="w-5 h-5 text-green-400" />
                </label>
                {enableFreeTrial && (
                  <p className="text-xs text-green-400 mt-2 ml-8">
                    Will set user to free trial with 7-day expiry
                  </p>
                )}
              </div>
              <button
                onClick={handleVerifyUser}
                disabled={loading}
                className={`w-full py-4 rounded-xl text-white text-base font-semibold flex items-center justify-center gap-3 ${loading
                  ? "bg-green-400"
                  : "bg-green-600 hover:bg-green-700"
                  } transition-all duration-300 transform hover:-translate-y-1 shadow-md`}>
                <CheckCircle className="w-6 h-6" />
                {loading ? "Verifying..." : "Verify User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
