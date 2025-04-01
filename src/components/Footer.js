"use client"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6  min-h-[180px] flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full px-10">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/Logo/LogoTransparent.png"
            alt="Construction Kinetics"
            width={80}
            height={80}
            className="rounded-lg shadow-lg"
          />
        </Link>

        {/* Copyright Text */}
        <div className="text-center text-sm text-gray-400 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Construction Kinetics. All rights
          reserved.
        </div>

        {/* Contact Information */}
        <div className="mt-4 md:mt-0 flex flex-col items-center md:items-start">
          <a href="tel:+923204300002" className="hover:text-gray-400">
            +92 320 430 0002
          </a>
          <a
            href="https://realtormfi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400">
            RealtorMfi.com
          </a>
        </div>
      </div>
    </footer>
  )
}
