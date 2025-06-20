"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/context/ThemeContext"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useActiveSection } from "@/context/ActiveSectionContext"
import { loginUser } from "@/utils/auth"

export default function NavBar() {
  const [navbar, setNavbar] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [render, setRender] = useState(true)
  const { theme, toggleTheme } = useTheme()
  const { setActiveSection, setScrollDirection } = useActiveSection()

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(false)
    }, 5000) // 2 seconds total loading time

    return () => clearTimeout(timer)
  }, [])
  const navRef = useRef(null)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    if (render) {
      loginUser()
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  const handleNavClick = (index) => {
    setScrollDirection(index > 0 ? "down" : "up")
    setActiveSection(index)
    setNavbar((p) => false)
  }

  const navItems = [
    { name: "PROPERTIES", href: "/", section: 0 },
    { name: "CONSTRUCTION", section: 1 },
    { name: "HOUSE LAYOUTS  ", section: 2 },
    // { name: "UAE CHAPTER", href: "/uae" },
    // { name: "LHR VERTICAL PROJECTS", href: "/vertical-projects" },
    { name: "CONTACT US", href: "/contact" },
  ]

  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="w-full">
      <nav
        className={`w-full fixed top-0 left-0 right-0 z-30 transition-all duration-300 py-1 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md"
            : "bg-transparent dark:bg-transparent py-2"
        }`}>
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          {/* MOBILE MENU */}
          <div className="flex justify-between items-center md:hidden">
            <Link href="/" onClick={() => handleNavClick(0)}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2">
                {/* Logo with circular white background 
                <div
                  className="flex items-center justify-center w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-full shadow-lg ring-2 ring-white/30 backdrop-blur-md isolate"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0) 80%)",
                  }}>
                */}
                <div className="flex items-center justify-center w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-full bg-white/100 shadow-lg">
                  <Image
                    src="/images/Logo/LogoTransparent.png"
                    alt="REALTOR MFI"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                  />
                </div>

                {/* Text visible only in mobile view */}
                <span
                  className={`font-semibold text-base sm:text-lg md:hidden ${
                    scrolled ? "text-primary dark:text-primary" : "text-white"
                  }`}
                  style={{ fontFamily: "Playfair Display, serif" }}>
                  REALTOR MFI
                </span>
              </motion.div>
            </Link>

            <button
              className={`p-2 rounded-md text-primary dark:text-white outline-none focus:border-primary focus:border ${
                scrolled
                  ? "bg-primary/10 dark:bg-primary/20"
                  : "bg-white/20 dark:bg-gray-900/30"
              }`}
              onClick={() => setNavbar(!navbar)}>
              {navbar ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* DESKTOP NAVBAR */}
          <div className="hidden md:flex w-full items-center justify-between">
            {/* LEFT 2 TABS */}
            <motion.ul className="flex gap-4" variants={navVariants}>
              {navItems.slice(0, 2).map((item) => (
                <motion.li key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href || "#"}
                    className={`text-[11px] hover:text-primary dark:hover:text-secondary font-medium relative group transition-colors duration-300 ${
                      scrolled
                        ? "text-gray-800 dark:text-gray-200"
                        : "text-white"
                    }`}
                    onClick={() =>
                      item.section !== undefined && handleNavClick(item.section)
                    }>
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-secondary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* CENTER LOGO WITH WHITE CIRCLE (No Title) */}
            <Link href="/" onClick={() => handleNavClick(0)}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center w-[70px] h-[70px] rounded-full shadow-2xl ring-2 ring-white/30 backdrop-blur-md isolate"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0) 80%)",
                  }}>
                  <Image
                    src="/images/Logo/LogoTransparent.png"
                    alt="REALTOR MFI"
                    width={60}
                    height={60}
                    className="w-[60px] h-[60px]"
                  />
                </div>

                {/* No title in desktop */}
              </motion.div>
            </Link>

            {/* RIGHT 2 TABS */}
            <motion.ul className="flex gap-4" variants={navVariants}>
              {navItems.slice(2, 4).map((item) => (
                <motion.li key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href || "#"}
                    className={`text-[11px] hover:text-primary dark:hover:text-secondary font-medium relative group transition-colors duration-300 ${
                      scrolled
                        ? "text-gray-800 dark:text-gray-200"
                        : "text-white"
                    }`}
                    onClick={() =>
                      item.section !== undefined && handleNavClick(item.section)
                    }>
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-secondary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          <div
            className={`md:hidden ${
              navbar
                ? "block absolute left-0 right-0 top-[60px] bg-white dark:bg-gray-900 shadow-lg z-40"
                : "hidden"
            }`}>
            <motion.ul
              ref={navRef}
              variants={navVariants}
              className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={itemVariants}
                  className="text-xs text-center border-b border-gray-200 dark:border-gray-700 py-2">
                  <Link
                    href={item.href || "#"}
                    className={`${
                      scrolled
                        ? "text-gray-800 dark:text-gray-200"
                        : "text-gray-800 dark:text-gray-200"
                    } hover:text-primary dark:hover:text-secondary font-medium transition-colors duration-300`}
                    onClick={() => {
                      if (item.section !== undefined)
                        handleNavClick(item.section)
                    }}>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </nav>
    </motion.div>
  )
}
