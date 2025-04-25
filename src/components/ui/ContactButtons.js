import { Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const ContactButtons = ({ propertyType, propertyId }) => {
  const phoneNumber = "+923204300002"
  const whatsappMessage = `Hi, I just checked your ${propertyType} on RealtorMFI.com, and I would like to talk about property ID: ${propertyId}`

  return (
    <div className="flex justify-center items-center space-x-4 mt-6">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full shadow-lg transform transition-all hover:scale-110 hover:brightness-110">
        <FaWhatsapp size={20} />
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full shadow-lg transform transition-all hover:scale-110 hover:brightness-110">
        <Phone size={20} />
      </a>
    </div>
  )
}

export default ContactButtons
