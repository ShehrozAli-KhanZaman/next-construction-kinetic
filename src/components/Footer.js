"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Phone, Globe, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white py-16 border-t border-gray-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 blur-3xl rounded-full"></div>

      <div className="container mx-auto flex flex-col gap-12 px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Logo and Branding */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:col-span-5">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-md opacity-70"></div>
                <Image
                  src="/images/Logo/LogoTransparent.png"
                  alt="Construction Kinetics"
                  width={90}
                  height={90}
                  className="rounded-lg shadow-lg relative"
                />
              </motion.div>
            </Link>
            <h3 className="text-xl font-bold mt-4 mb-3 text-white">
              Construction Kinetics
            </h3>
            <p className="text-sm text-gray-400 max-w-xs text-center md:text-left">
              Transforming architectural dreams into reality with quality
              construction services.
            </p>

            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <motion.a
                whileHover={{ y: -3, color: "#4267B2" }}
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-gray-700 transition-colors duration-300">
                <Facebook size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, color: "#1DA1F2" }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-gray-700 transition-colors duration-300">
                <Twitter size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3, color: "#E1306C" }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-primary hover:bg-gray-700 transition-colors duration-300">
                <Instagram size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:col-span-3">
            <h3 className="text-lg font-semibold mb-5 text-white relative">
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-secondary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-secondary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Services
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link
                  href="/coming-soon"
                  className="text-gray-300 hover:text-secondary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Projects
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="transition-all">
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-secondary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                  Contact
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:col-span-4">
            <h3 className="text-lg font-semibold mb-5 text-white relative">
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-primary">
                  <Phone size={18} />
                </div>
                <a
                  href="tel:+923204300002"
                  className="text-gray-300 hover:text-primary transition-colors">
                  +92 320 430 0002
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-primary">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:realexchnge@gmail.com"
                  className="text-gray-300 hover:text-primary transition-colors">
                  realexchnge@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-primary">
                  <Globe size={18} />
                </div>
                <a
                  href="https://realtormfi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors">
                  realtormfi.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 pt-8 mt-2 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Construction Kinetics. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
