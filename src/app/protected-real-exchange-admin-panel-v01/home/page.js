'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import UserAnalytics from './components/UserAnalytics';
import RecentUsers from './components/RecentUsers';
import UserVerificationChart from './components/UserVerificationChart';
import { getAdminCount } from './api';

export default function AdminHomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(true); // Open by default
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Handle responsive sidebar behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // lg breakpoint
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch admin count data
            const data = await getAdminCount();

            if (data && data.status_code === 200) {
                setDashboardData(data.data);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header onMenuClick={() => setSidebarOpen(true)} />

                {/* Dashboard Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Dashboard Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                                <p className="text-gray-400 mt-1">Welcome to Real Exchange Admin Panel</p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-300 text-sm">Last 30 Days</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        {!loading && dashboardData && (
                            <StatsCards data={dashboardData} />
                        )}

                        {/* Charts and Analytics */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* User Verification Chart */}
                            <UserVerificationChart />

                            {/* User Analytics */}
                            <UserAnalytics />
                        </div>

                        {/* Recent Users Table */}
                        <RecentUsers />
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
