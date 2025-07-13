import { Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const FloatingButton = () => {
  return (
    <>
      {/* <div className="fixed bottom-28 right-8 z-50">
        <a
          href="https://wa.me/message/2HVNP5DPG5BOP1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full shadow-lg transform transition-all hover:scale-110 hover:brightness-110">
          <Phone size={28} />
        </a>
      </div> */}
      <div className="fixed bottom-14 right-8 z-50">
        <a
          href="https://wa.me/message/2HVNP5DPG5BOP1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2 bg-green-500 text-white rounded-full shadow-lg transform transition-all hover:scale-110 hover:brightness-110">
          <FaWhatsapp size={32} />
        </a>
      </div>
    </>
  )
}

export default FloatingButton
