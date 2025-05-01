import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"

const CardComponent = ({
  tab,
  setActiveTab,
  cardVariants,
  activeTab,
  animationVariants = null,
}) => (
  <Tilt
    tiltMaxAngleX={10}
    tiltMaxAngleY={10}
    perspective={1000}
    scale={1.05}
    transitionSpeed={1000}
    className="w-full max-w-[16vw]">
    <motion.div
      variants={animationVariants || cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
      className="relative bg-white/10 hover:bg-white/20 p-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
      <div className="absolute inset-0 rounded-lg border-2 border-transparent border-animated pointer-events-none"></div>

      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
      </div>

      <h2 className="text-sm md:text-base font-semibold mb-1 self-center py-2">
        {tab.title}
      </h2>
    </motion.div>
  </Tilt>
)

export default CardComponent
