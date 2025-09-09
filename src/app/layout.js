// src/app/layout.js
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import { ActiveSectionProvider } from "@/context/ActiveSectionContext"
import NavBar from "@/components/Navbar"
import Preloader from "@/components/Preloader"
import ClientWrapper from "@/components/ClientWrapper"
import FloatingButton from "@/components/ui/FloatingButton"
import ConditionalLayout from "@/components/ConditionalLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Realtor MFI",
  description: "Your trusted partner in construction and real estate",
  icons: {
    icon: [
      { url: '/images/Logo/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/Logo/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/Logo/favicon.png',
    apple: '/images/Logo/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ActiveSectionProvider>
            <ClientWrapper>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </ClientWrapper>
          </ActiveSectionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
