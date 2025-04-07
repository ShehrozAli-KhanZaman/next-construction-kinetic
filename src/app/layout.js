// src/app/layout.js
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import NavBar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Preloader from "@/components/Preloader"
import ClientWrapper from "@/components/ClientWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Construction Kinetics",
  description: "Building dreams with excellence",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ClientWrapper>
            <Preloader />
            <NavBar />
            {children}
            <Footer />
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
