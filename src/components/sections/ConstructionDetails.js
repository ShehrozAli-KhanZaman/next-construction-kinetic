"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Tilt from "react-parallax-tilt"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

export default function ConstructionDetails() {
  const [activeTab, setActiveTab] = useState()

  const tabs = [
    {
      id: "why",
      title: "Why Construction Kinetics?",
      description: [
        "Trusted construction services.",
        "Transparent and timely execution.",
        "Led by LUMS graduate Mr. Farhan.",
      ],
    },
    {
      id: "how",
      title: "How We Work",
      description: [
        "Understanding your needs.",
        "Custom budgets and schedules.",
        "Clear and frequent updates.",
      ],
    },
    {
      id: "grey-structure",
      title: "Grey Structure",
      description: [
        "Foundation to framework.",
        "Roofing and blockwork.",
        "Durable base construction.",
      ],
    },
    {
      id: "finishing",
      title: "Finishing",
      description: [
        "Electrical, plumbing, flooring.",
        "Interior woodworks.",
        "High-end finish quality.",
      ],
    },
  ]

  const cardVariants = {
    initial: { scale: 1, rotateX: 0, rotateY: 0 },
    hover: { scale: 1.05, rotateX: -5, rotateY: 5 },
    tap: { scale: 0.95 },
  }

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900 text-white overflow-hidden p-6 flex flex-col justify-center pt-20">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            color: { value: "#ffffff" },
            number: { value: 50 },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.3 },
            links: { enable: false },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Cards Grid */}
      <div className="flex flex-col gap-6 relative z-10 w-full max-w-7xl mx-auto">
        {/* First Row */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {tabs.slice(0, 2).map((tab) => (
            <Tilt
              key={tab.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              className="flex-1">
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() =>
                  setActiveTab(activeTab === tab.id ? null : tab.id)
                }
                className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
                {/* Shine */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                </div>

                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {tab.title}
                </h2>
                <div className="text-xs md:text-sm text-gray-200 space-y-1">
                  {tab.description
                    .slice(0, 2) // show only 2 points by default
                    .map((line, idx) => (
                      <p key={idx} className="block md:hidden">
                        {line}
                      </p>
                    ))}
                  {tab.description.map((line, idx) => (
                    <p key={idx} className="hidden md:block">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>

        {/* Center Title */}
        <div className="flex items-center justify-center hidden md:block">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse neon-text">
            Construction Kinetics
          </motion.h1>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {tabs.slice(2, 4).map((tab) => (
            <Tilt
              key={tab.id}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              className="flex-1">
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() =>
                  setActiveTab(activeTab === tab.id ? null : tab.id)
                }
                className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
                {/* Shine */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                </div>

                <h2 className="text-lg md:text-xl font-semibold mb-2">
                  {tab.title}
                </h2>
                <div className="text-xs md:text-sm text-gray-200 space-y-1">
                  {tab.description
                    .slice(0, 2) // show only 2 points by default
                    .map((line, idx) => (
                      <p key={idx} className="block md:hidden">
                        {line}
                      </p>
                    ))}
                  {tab.description.map((line, idx) => (
                    <p key={idx} className="hidden md:block">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            key="expanded-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 w-11/12 md:w-1/2 bg-white/90 text-gray-900 p-8 rounded-2xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-md border border-gray-200">
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-3 right-5 text-gray-500 hover:text-black text-xl">
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {tabs.find((tab) => tab.id === activeTab)?.title}
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Full details about &quot;
              {tabs.find((tab) => tab.id === activeTab)?.title}&quot; will
              appear here.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import Tilt from "react-parallax-tilt"
// import Particles from "react-tsparticles"
// import { loadFull } from "tsparticles"

// export default function ConstructionDetails() {
//   const [activeTab, setActiveTab] = useState(null)

//   const tabs = [
//     {
//       id: "why",
//       title: "Why Construction Kinetics?",
//       description: [
//         "Trusted construction services.",
//         "Transparent and timely execution.",
//         "Led by LUMS graduate Mr. Farhan.",
//       ],
//     },
//     {
//       id: "how",
//       title: "How We Work",
//       description: [
//         "Understanding your needs.",
//         "Custom budgets and schedules.",
//         "Clear and frequent updates.",
//       ],
//     },
//     {
//       id: "grey-structure",
//       title: "Grey Structure",
//       description: [
//         "Foundation to framework.",
//         "Roofing and blockwork.",
//         "Durable base construction.",
//       ],
//     },
//     {
//       id: "finishing",
//       title: "Finishing",
//       description: [
//         "Electrical, plumbing, flooring.",
//         "Interior woodworks.",
//         "High-end finish quality.",
//       ],
//     },
//   ]

//   const cardVariants = {
//     initial: { scale: 1, rotateX: 0, rotateY: 0 },
//     hover: { scale: 1.05, rotateX: -5, rotateY: 5 },
//     tap: { scale: 0.95 },
//   }

//   const particlesInit = async (main) => {
//     await loadFull(main)
//   }

//   return (
//     <section className="relative min-h-screen w-full bg-gradient-to-tr from-slate-900 via-gray-800 to-slate-900 text-white overflow-hidden p-6 flex flex-col justify-center pt-20">
//       {/* Particles Background */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           background: { color: "transparent" },
//           fpsLimit: 60,
//           particles: {
//             color: { value: "#ffffff" },
//             number: { value: 50 },
//             size: { value: { min: 1, max: 3 } },
//             move: { enable: true, speed: 0.5 },
//             opacity: { value: 0.3 },
//             links: { enable: false },
//           },
//           detectRetina: true,
//         }}
//         className="absolute inset-0 z-0"
//       />

//       {/* Cards Grid */}
//       <div className="grid grid-cols-3 grid-rows-3 gap-6 flex-1 relative z-10">
//         {/* Top-left card */}
//         <Tilt
//           key={tabs[0].id}
//           tiltMaxAngleX={10}
//           tiltMaxAngleY={10}
//           perspective={1000}
//           scale={1.05}
//           transitionSpeed={1000}>
//           <motion.div
//             variants={cardVariants}
//             initial="initial"
//             whileHover="hover"
//             whileTap="tap"
//             onClick={() =>
//               setActiveTab(activeTab === tabs[0].id ? null : tabs[0].id)
//             }
//             className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
//             {/* Sparkle Shine */}
//             <div className="absolute inset-0 overflow-hidden rounded-xl">
//               <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
//             </div>
//             <h2 className="text-lg md:text-xl font-semibold mb-2">
//               {tabs[0].title}
//             </h2>
//             <div className="text-xs md:text-sm text-gray-200 space-y-1">
//               {tabs[0].description.map((line, idx) => (
//                 <p key={idx}>{line}</p>
//               ))}
//             </div>
//           </motion.div>
//         </Tilt>

//         {/* Top-center empty */}
//         {/* Empty div (hidden on mobile view) */}
//         <div className="hidden md:block"></div>

//         {/* Top-right card */}
//         <Tilt
//           key={tabs[1].id}
//           tiltMaxAngleX={10}
//           tiltMaxAngleY={10}
//           perspective={1000}
//           scale={1.05}
//           transitionSpeed={1000}>
//           <motion.div
//             variants={cardVariants}
//             initial="initial"
//             whileHover="hover"
//             whileTap="tap"
//             onClick={() =>
//               setActiveTab(activeTab === tabs[1].id ? null : tabs[1].id)
//             }
//             className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
//             {/* Sparkle Shine */}
//             <div className="absolute inset-0 overflow-hidden rounded-xl">
//               <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
//             </div>
//             <h2 className="text-lg md:text-xl font-semibold mb-2">
//               {tabs[1].title}
//             </h2>
//             <div className="text-xs md:text-sm text-gray-200 space-y-1">
//               {tabs[1].description.map((line, idx) => (
//                 <p key={idx}>{line}</p>
//               ))}
//             </div>
//           </motion.div>
//         </Tilt>

//         {/* Middle-left empty */}
//         {/* Empty div (hidden on mobile view) */}
//         <div className="hidden md:block"></div>

//         {/* Center Title */}
//         <div className="flex items-center justify-center">
//           <motion.h1
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//               duration: 1.5,
//               ease: "easeInOut",
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//             className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse neon-text">
//             Construction Kinetics
//           </motion.h1>
//         </div>

//         {/* Middle-right empty */}
//         {/* Empty div (hidden on mobile view) */}
//         <div className="hidden md:block"></div>

//         {/* Bottom-left card */}
//         <Tilt
//           key={tabs[2].id}
//           tiltMaxAngleX={10}
//           tiltMaxAngleY={10}
//           perspective={1000}
//           scale={1.05}
//           transitionSpeed={1000}>
//           <motion.div
//             variants={cardVariants}
//             initial="initial"
//             whileHover="hover"
//             whileTap="tap"
//             onClick={() =>
//               setActiveTab(activeTab === tabs[2].id ? null : tabs[2].id)
//             }
//             className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
//             {/* Sparkle Shine */}
//             <div className="absolute inset-0 overflow-hidden rounded-xl">
//               <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
//             </div>
//             <h2 className="text-lg md:text-xl font-semibold mb-2">
//               {tabs[2].title}
//             </h2>
//             <div className="text-xs md:text-sm text-gray-200 space-y-1">
//               {tabs[2].description.map((line, idx) => (
//                 <p key={idx}>{line}</p>
//               ))}
//             </div>
//           </motion.div>
//         </Tilt>

//         {/* Bottom-center empty */}
//         {/* Empty div (hidden on mobile view) */}
//         <div className="hidden md:block"></div>

//         {/* Bottom-right card */}
//         <Tilt
//           key={tabs[3].id}
//           tiltMaxAngleX={10}
//           tiltMaxAngleY={10}
//           perspective={1000}
//           scale={1.05}
//           transitionSpeed={1000}>
//           <motion.div
//             variants={cardVariants}
//             initial="initial"
//             whileHover="hover"
//             whileTap="tap"
//             onClick={() =>
//               setActiveTab(activeTab === tabs[3].id ? null : tabs[3].id)
//             }
//             className="relative bg-white/10 hover:bg-white/20 p-5 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-500 backdrop-blur-lg border border-white/20 group overflow-hidden">
//             {/* Sparkle Shine */}
//             <div className="absolute inset-0 overflow-hidden rounded-xl">
//               <div className="absolute w-1/3 h-full bg-gradient-to-r from-white/10 to-white/0 transform rotate-12 group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
//             </div>
//             <h2 className="text-lg md:text-xl font-semibold mb-2">
//               {tabs[3].title}
//             </h2>
//             <div className="text-xs md:text-sm text-gray-200 space-y-1">
//               {tabs[3].description.map((line, idx) => (
//                 <p key={idx}>{line}</p>
//               ))}
//             </div>
//           </motion.div>
//         </Tilt>
//       </div>

//       {/* Expanded Content */}
//       <AnimatePresence>
//         {activeTab && (
//           <motion.div
//             key="expanded-content"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.5 }}
//             className="absolute top-1/2 left-1/2 w-11/12 md:w-1/2 bg-white/90 text-gray-900 p-8 rounded-2xl shadow-2xl
//               transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-blur-md border border-gray-200">
//             <button
//               onClick={() => setActiveTab(null)}
//               className="absolute top-3 right-5 text-gray-500 hover:text-black text-xl">
//               ✖
//             </button>
//             <h2 className="text-2xl font-bold mb-4">
//               {tabs.find((tab) => tab.id === activeTab)?.title}
//             </h2>
//             <p className="text-sm leading-relaxed text-gray-700">
//               {/* Detailed content here */}
//               Full details about &quot;
//               {tabs.find((tab) => tab.id === activeTab)?.title}&quot; will
//               appear here.
//             </p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   )
// }
