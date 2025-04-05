// src/app/layout.js
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import NavBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Preloader from "@/components/Preloader"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Construction Kinetics",
  description: "Premium construction services in Pakistan",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Preloader />
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
