'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAdminLoggedIn, startSessionCheck } from '@/utils/adminAuth';

export default function AuthWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Don't apply auth wrapper to the login page itself
    const isLoginPage = pathname === '/protected-real-exchange-admin-panel-v01';

    useEffect(() => {
        // Start periodic session check
        startSessionCheck();

        // If on login page, don't check authentication
        if (isLoginPage) {
            setIsLoading(false);
            return;
        }

        // Check authentication status
        const checkAuth = () => {
            const loggedIn = isAdminLoggedIn();
            setIsLoading(false);

            if (!loggedIn) {
                // Redirect to login page if not authenticated
                router.push('/protected-real-exchange-admin-panel-v01');
            }
        };

        // Small delay to ensure localStorage is available
        const timer = setTimeout(checkAuth, 100);

        return () => clearTimeout(timer);
    }, [isLoginPage, router]);

    // If on login page, render children directly
    if (isLoginPage) {
        return <>{children}</>;
    }

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-white text-lg">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // If authenticated, render the protected content
    return <>{children}</>;
}
