import { Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const ContactButtons = ({
  propertyType,
  propertyId,
  setIsPopupOpen,
  setId,
}) => {
  const whatsappMessage = `Hi, I just checked your ${propertyType} on RealtorMFI.com, and I would like to talk about property ID: ${propertyId}`

  return (
    <div className="flex justify-center items-center space-x-4">
      {/* WhatsApp Button */}
      {/* <a
        href={`https://wa.me/message/2HVNP5DPG5BOP1?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-1 bg-green-500 text-white rounded-full shadow-lg transform transition-all hover:scale-110 hover:brightness-110">
        <FaWhatsapp size={14} />
      </a> */}

      {/* Phone Button */}
      <a
        // href={`tel:${phoneNumber}`}
        className="flex items-center justify-center p-1 bg-green-500 text-white rounded-full shadow-lg transform transition-all hover:scale-110 hover:brightness-110"
        onClick={() => (setIsPopupOpen(true), setId(propertyId))}>
        <Phone size={14} />
      </a>
    </div>
  )
}

export default ContactButtons
