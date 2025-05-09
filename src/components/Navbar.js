"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/context/ThemeContext"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useActiveSection } from "@/context/ActiveSectionContext"

export default function NavBar() {
  const [navbar, setNavbar] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { setActiveSection, setScrollDirection } = useActiveSection()

  const navRef = useRef(null)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  // Handle navigation click to set active section and scroll direction
  const handleNavClick = (index) => {
    setScrollDirection(index > 0 ? "down" : "up")
    setActiveSection(index)
    setNavbar(false) // Close navbar after selection on mobile
  }

  const navItems = [
    { name: "About Work", section: 0 },
    { name: "Construction Kinetics", section: 1 },
    { name: "House Layouts", section: 2 },
    { name: "UAE Chapter", href: "/uae" },
    { name: "LHR Vertical Projects", href: "/vertical-projects" },
    { name: "Contact", href: "/contact" },
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
          <div>
            <div className="flex items-center justify-between py-2 md:py-2 md:block">
              <Link href="/" onClick={() => handleNavClick(0)}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2">
                  <Image
                    src="/images/Logo/Ck/CKT.png"
                    alt="Construction Kinetics"
                    width={45}
                    height={45}
                    className="rounded-lg shadow-lg w-auto h-auto max-w-[45px] max-h-[45px]"
                  />
                  <span
                    className={`font-semibold text-base sm:text-lg ${
                      scrolled ? "text-primary dark:text-primary" : "text-white"
                    }`}>
                    Construction Kinetics
                  </span>
                </motion.div>
              </Link>
              <div className="md:hidden flex items-center gap-4">
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
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center md:block md:pb-0 md:mt-0 ${
                navbar
                  ? "block absolute left-0 right-0 top-[60px] bg-white dark:bg-gray-900 shadow-lg"
                  : "hidden"
              }`}>
              <motion.ul
                ref={navRef}
                variants={navVariants}
                className={`items-center justify-center md:flex ${
                  scrolled
                    ? ""
                    : "md:bg-white/10 md:dark:bg-gray-900/20 md:backdrop-blur-sm md:rounded-full md:px-2 md:py-1"
                } ${navbar ? "px-4 py-2" : ""}`}>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    className="text-xs py-2 px-4 text-center border-b md:border-b-0 border-gray-200 dark:border-gray-700 md:border-0 md:flex md:items-center h-full relative z-10">
                    <Link
                      href={item.href || "#"}
                      className={`${
                        scrolled
                          ? "text-gray-800 dark:text-gray-200"
                          : navbar
                          ? "text-gray-800 dark:text-gray-200"
                          : "text-white"
                      } hover:text-primary dark:hover:text-secondary font-medium relative group transition-colors duration-300 block py-2`}
                      onClick={() => {
                        if (item.section !== undefined) {
                          handleNavClick(item.section)
                        }
                      }}>
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-secondary group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  )
}
