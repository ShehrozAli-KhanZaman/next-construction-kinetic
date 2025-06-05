import { useState } from "react"
import { Copy, Phone, X } from "lucide-react"

const ContactPopup = ({ id, onClose, propertyType }) => {
  const [copiedMobile, setCopiedMobile] = useState(false)
  const phoneNumber = "+923204300002"
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedMobile(true)
    setTimeout(() => setCopiedMobile(false), 5000)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex flex-col items-center mt-10">
        <div className="bg-white rounded-lg w-80 relative z-2000">
          {/* Green Stripe */}
          <div className="bg-green-500 h-1 rounded-t-lg"></div>

          <div className="p-4">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}>
              <X size={25} />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">
              Contact Us
            </h2>
            <p className="text-center text-gray-800 ">Muhammad Farhan Ilyas</p>
            <p className="text-center font-semibold text-gray-800 mb-4">
              Realtor
            </p>

            {/* Contact Info */}
            <div className="flex items-center justify-between text-gray-800">
              <div className="mr-2">
                <Phone size={17} />
              </div>
              <div className="flex-1 text-left ml-2">
                <div className="text-gray-800 text-xs mb-1">Phone</div>
                <div
                  className="text-blue-500 cursor-pointer"
                  onClick={() => (window.location.href = `tel:${phoneNumber}`)}>
                  {phoneNumber}
                </div>
              </div>
              <div>
                <button
                  className="text-green-500 px-2 py-1 rounded flex flex-row items-center"
                  onClick={() => handleCopy(phoneNumber)}>
                  <Copy size={17} className="mr-1" />
                  {copiedMobile ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Property Reference */}
            <p className="text-center text-sm mt-4 text-gray-800">
              Please quote property reference
            </p>
            <p className="text-center font-semibold text-gray-800 m-1">
              {propertyType} - ID{id}
            </p>
            <p className="text-center text-xs text-gray-800">when calling us</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPopup
