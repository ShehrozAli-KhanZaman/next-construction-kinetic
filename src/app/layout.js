// src/app/layout.js
import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Construction Kinetics",
  description: "A modern web application for construction projects.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
