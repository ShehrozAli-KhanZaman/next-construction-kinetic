'use client';

// src/app/protected-real-exchange-admin-panel-v01/layout.js
import "../globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import { ActiveSectionProvider } from "@/context/ActiveSectionContext"
import ClientWrapper from "@/components/ClientWrapper"
import AuthWrapper from "./components/AuthWrapper"

const inter = Inter({ subsets: ["latin"] })

export default function AdminLayout({ children }) {
    return (
        <ThemeProvider>
            <ActiveSectionProvider>
                <ClientWrapper>
                    <AuthWrapper>
                        {children}
                    </AuthWrapper>
                </ClientWrapper>
            </ActiveSectionProvider>
        </ThemeProvider>
    )
}
