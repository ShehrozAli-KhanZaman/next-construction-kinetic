// src/app/protected-real-exchange-admin-panel-v01/layout.js
import "../globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import { ActiveSectionProvider } from "@/context/ActiveSectionContext"
import ClientWrapper from "@/components/ClientWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Admin Panel - Realtor MFI",
    description: "Secure admin access for authorized personnel",
    icons: {
        icon: [
            { url: '/images/Logo/Ck/RE.png', sizes: '32x32', type: 'image/png' },
            { url: '/images/Logo/Ck/RE.png', sizes: '16x16', type: 'image/png' },
        ],
        shortcut: '/images/Logo/Ck/RE.png',
        apple: '/images/Logo/Ck/RE.png',
    },
}

export default function AdminLayout({ children }) {
    return (
        <ThemeProvider>
            <ActiveSectionProvider>
                <ClientWrapper>
                    {children}
                </ClientWrapper>
            </ActiveSectionProvider>
        </ThemeProvider>
    )
}
