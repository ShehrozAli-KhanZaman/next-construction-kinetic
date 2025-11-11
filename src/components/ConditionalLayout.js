'use client';

import { usePathname } from 'next/navigation';
import NavBar from '@/components/Navbar';
import FloatingButton from '@/components/ui/FloatingButton';

export default function ConditionalLayout({ children }) {
    const pathname = usePathname();

    // Check if current path is an admin route
    const isAdminRoute = pathname?.startsWith('/protected-real-exchange-admin-panel-v01');
    const isPrivacyPolicyRoute = pathname?.startsWith('/privacy-policy');
    const isMapRoute = pathname?.startsWith('/map');

    if (isAdminRoute || isPrivacyPolicyRoute || isMapRoute) {
        // For admin routes, only render children without navbar and floating button
        return <>{children}</>;
    }

    // For regular routes, render with navbar and floating button
    return (
        <>
            {/* <Preloader /> */}
            <NavBar />
            {children}
            <FloatingButton />
        </>
    );
}
