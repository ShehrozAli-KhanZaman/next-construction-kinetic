// src/app/layout.js
import NavBar from "@/components/Navbar"
import "../globals.css"
import { Inter } from "next/font/google"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Construction Kinetics",
  description: "A modern web application for construction projects.",
}

export default function ContactLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NavBar />
        <main className="flex-1 w-full max-w-8xl mx-auto py-70">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
