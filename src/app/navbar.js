import Link from "next/link"
import { motion } from "framer-motion"
export default function Navbar() {
  // ... existing code ...

  return (
    <nav
      className="fixed top-0 left-0 w-full bg-transparent z-50 transition-all duration-300"
      ref={navbarRef}>
      <div
        className={`container mx-auto px-4 py-4 ${
          isScrolled ? "py-2" : "py-4"
        } transition-all duration-300`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 mr-2 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">CK</span>
            </div>
            <div>
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                Construction
              </span>
              <span className="text-primary font-semibold">Kinetics</span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/services" className="nav-link">
              Services
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/projects" className="nav-link">
              Projects
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
            <Link href="/coming-soon" className="nav-link">
              Coming Soon
            </Link>
          </div>

          {/* ... existing code for mobile menu button ... */}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-xl mx-4 mt-2 p-4">
          <div className="flex flex-col space-y-3">
            <Link href="/" className="mobile-nav-link">
              Home
            </Link>
            <Link href="/services" className="mobile-nav-link">
              Services
            </Link>
            <Link href="/about" className="mobile-nav-link">
              About
            </Link>
            <Link href="/projects" className="mobile-nav-link">
              Projects
            </Link>
            <Link href="/contact" className="mobile-nav-link">
              Contact
            </Link>
            <Link href="/coming-soon" className="mobile-nav-link">
              Coming Soon
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
