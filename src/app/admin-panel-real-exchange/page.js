"use client"

import { useRef, useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { User, Smartphone, Clock, CheckCircle } from "lucide-react"
import { getStoredToken } from "@/utils/auth"
import { baseURL } from "@/utils/common"
import Image from "next/image"

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("updateStatus")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState("active")
  const [expiry, setExpiry] = useState("")
  const [nullPhone, setNullPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const dateInputRef = useRef(null)
  const endpoint = "/acc/update_expiry_user"

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toISOString().replace("T", " ").slice(0, 19)
  }

  const validatePhone = (phone) => {
    return phone.startsWith("+92") && phone.length >= 12
  }

  const handleUpdateStatus = async (e) => {
    e.preventDefault()
    if (!phone) {
      toast.error("Phone number is required")
      return
    }
    if (!status) {
      toast.error("Account status is required")
      return
    }
    if (!expiry) {
      toast.error("Account expiry date is required")
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
      console.error("No auth token found")
      toast.error("Token expired")
      return null
    }

    setLoading(true)

    try {
      const config = {
        method: "post",
        url: baseURL + endpoint,
        headers: {
          "Auth-Token": authToken,
          "Content-Type": "application/json",
        },
        data: {
          user_phone: phone,
          user_status: status,
          user_acc_expiry: expiry ? formatDate(expiry) : undefined,
          user_device_id: true,
        },
      }

      const response = await axios.request(config)
      toast.success("User status updated successfully")
    } catch (error) {
      toast.error("Failed to update user status")
    } finally {
      setLoading(false)
    }
  }

  const handleSetDeviceIdNull = async (e) => {
    e.preventDefault()
    if (!nullPhone) {
      toast.error("Phone number is required")
      return
    }
    if (!validatePhone(nullPhone)) {
      toast.error(
        "Phone number must start with +92 and be at least 12 characters"
      )
      return
    }
    const authToken = getStoredToken()
    if (!authToken) {
      console.error("No auth token found")
      toast.error("Token expired")
      return null
    }

    setLoading(true)
    try {
      const config = {
        method: "post",
        url: baseURL + endpoint,
        headers: {
          "Auth-Token": authToken,
          "Content-Type": "application/json",
        },
        data: {
          user_phone: nullPhone,
          user_device_id: true,
        },
      }

      const response = await axios.request(config)
      toast.success(response?.message || "Device ID set to null successfully")
    } catch (error) {
      toast.error("Failed to set device ID to null")
    } finally {
      setLoading(false)
    }
  }

  const openCalendar = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker()
    }
  }

  const preventManualInput = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <div className="w-full max-w-5xl">
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
              Admin Control Center
            </h1>
            <h2 className="text-xl lg:text-2xl font-semibold text-white/80">
              Real Exchange
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-10 justify-center">
          <button
            onClick={() => setActiveTab("updateStatus")}
            className={`px-8 py-4 text-sm md:text-xl font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
              activeTab === "updateStatus"
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}>
            Set User Status
          </button>
          <button
            onClick={() => setActiveTab("setDeviceId")}
            className={`px-8 py-4 text-sm md:text-xl font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
              activeTab === "setDeviceId"
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}>
            Set User Device ID
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "updateStatus" && (
          <div className="bg-gray-800 rounded-2xl p-10 shadow-xl border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Guidance Section */}
              <div className="text-gray-200">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-indigo-400" />
                  Update User Status
                </h2>
                <ul className="space-y-4 text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <div>
                      <span className="font-medium">Phone Number:</span> Enter a
                      phone number starting with +92 (e.g., +923494040400, min.
                      12 characters). Invalid entries trigger an error.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <div>
                      <span className="font-medium">Status:</span> Select Active
                      (full access), Expiry (account expired), or Free Trial
                      (limited access) from the dropdown.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <div>
                      <span className="font-medium">Account Expiry:</span>{" "}
                      Choose a date/time for expiry, sent as YYYY-MM-DD HH:MM:SS
                      (e.g., 2027-07-23 15:54:57). Leave blank if not needed.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400">•</span>
                    <div>
                      <span className="font-medium">Submit:</span> Click Update
                      Status to apply changes. Success or error notifications
                      appear.
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
                      className="w-full p-4 pl-12 bg-gray-700 text-white text-sm rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                      placeholder="+923123456789"
                      required
                      maxLength={13}
                    />
                    <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full p-4 pl-12 bg-gray-700 text-white text-sm rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 appearance-none">
                      <option value="active">Active</option>
                      <option value="expiry">Expiry</option>
                      <option value="free_trial">Free Trial</option>
                    </select>
                    <CheckCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Account Expiry
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      onClick={openCalendar}
                      onKeyDown={preventManualInput}
                      ref={dateInputRef}
                      className="w-full p-4 pl-12 bg-gray-700 text-white text-sm rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 cursor-pointer"
                      step="1"
                    />
                    <Clock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white cursor-pointer"
                      onClick={openCalendar}
                    />
                  </div>
                </div>
                <button
                  onClick={handleUpdateStatus}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl text-white text-base font-semibold flex items-center justify-center gap-3 ${
                    loading
                      ? "bg-indigo-400"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } transition-all duration-300 transform hover:-translate-y-1 shadow-md`}>
                  <CheckCircle className="w-6 h-6" />
                  {loading ? "Updating..." : "Update Status"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "setDeviceId" && (
          <div className="bg-gray-800 rounded-2xl p-10 shadow-xl border border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Guidance Section */}
              <div className="text-gray-200">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-red-400" />
                  Set Device ID to Null
                </h2>
                <ul className="space-y-4 text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <div>
                      <span className="font-medium">Phone Number:</span> Enter a
                      phone number starting with +92 (e.g., +923494040400, min.
                      12 characters). Invalid entries trigger an error.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <div>
                      <span className="font-medium">Submit:</span> Click Set
                      Device ID to Null to unlink the device. Success or error
                      notifications appear.
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
                      value={nullPhone}
                      onChange={(e) => setNullPhone(e.target.value)}
                      className="w-full p-4 pl-12 bg-gray-700 text-white text-sm rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                      placeholder="+923123456789"
                      required
                      maxLength={13}
                    />
                    <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white" />
                  </div>
                </div>
                <button
                  onClick={handleSetDeviceIdNull}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl text-white text-base font-semibold flex items-center justify-center gap-3 ${
                    loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                  } transition-all duration-300 transform hover:-translate-y-1 shadow-md`}>
                  <Smartphone className="w-6 h-6" />
                  {loading ? "Processing..." : "Set Device ID to Null"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
