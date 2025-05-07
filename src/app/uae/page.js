"use client"
import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import {
  FaBed,
  FaMapMarkerAlt,
  FaDollarSign,
  FaExpandArrowsAlt,
} from "react-icons/fa"
import { dubaiProjects } from "@/lib/utils"

export default function UAEPropertiesPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <Image
          src="/images/Background/bg7.jpg" // Replace with actual image
          alt="Dubai Luxury"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        <div className="absolute inset-0 flex items-center justify-center px-6 pt-20">
          <div className="bg-white text-black max-w-7xl w-full rounded-2xl shadow-xl p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Big Italic Heading */}
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight">
              Buy Dubai Properties: <br />
              Luxury Property for Sale in UAE
            </h1>

            {/* Right: Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
              Experience the pinnacle of luxury with buying a property in Dubai,
              where stunning architecture meets world-class amenities. Each
              residence seamlessly blends elegance with comfort, offering
              breathtaking views of the city skyline and pristine beaches. Buy
              Dubai properties and embrace a lifestyle defined by sophistication
              and unmatched beauty.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Target Section */}
      <div className="py-10 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
          DISCOVER A <br />
          <span className="text-gradient bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
            Premium Lifestyle
          </span>
        </h2>
      </div>

      {/* Cards Section */}
      <div className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dubaiProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              {/* Image Carousel */}
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                key={`swiper-${index}`}
                className="w-full h-64"
                spaceBetween={10}
                slidesPerView={1}>
                {project.image.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-64 overflow-hidden group">
                      {project.tag && (
                        <div className="absolute top-4 left-[-42px] rotate-[-45deg] z-20">
                          <div className="bg-gradient-to-r from-[#ee0979] to-[#ff6a00] text-white text-[10px] sm:text-xs font-semibold px-10 py-[6px] shadow-md text-center w-[160px]">
                            {project.tag}
                          </div>
                        </div>
                      )}
                      <Image
                        src={img}
                        alt={`${project.name} image ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="p-5 space-y-3">
                <h2 className="text-2xl font-bold text-white">
                  {project.name}
                </h2>
                <p className="text-gray-400 text-sm">{project.description}</p>

                <div className="grid grid-cols-1 gap-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <FaBed className="text-lg text-purple-400" />
                    <span>{project.bedroomRange}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-lg text-red-400" />
                    <span>{project.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-300 border-t border-gray-700 pt-4">
                  <div>
                    <p className="text-gray-400 mb-1 font-semibold">
                      Price From:
                    </p>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-green-400" />
                      <span>{project.priceRange.from}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 font-semibold">
                      Price To:
                    </p>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-green-400" />
                      <span>{project.priceRange.to}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 font-semibold">
                      Area From:
                    </p>
                    <div className="flex items-center gap-2">
                      <FaExpandArrowsAlt className="text-blue-400" />
                      <span>{project.areaRange.from}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1 font-semibold">Area To:</p>
                    <div className="flex items-center gap-2">
                      <FaExpandArrowsAlt className="text-blue-400" />
                      <span>{project.areaRange.to}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
