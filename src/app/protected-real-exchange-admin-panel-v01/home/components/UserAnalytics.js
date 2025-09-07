'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';
import { getAdminCount } from '../api';

export default function UserAnalytics() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            setLoading(true);
            const data = await getAdminCount();

            if (data && data.status_code === 200) {
                setAnalyticsData(data.data);
            }
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            </motion.div>
        );
    }

    if (!analyticsData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
                <div className="text-center text-gray-400">
                    <p>Failed to load analytics data</p>
                </div>
            </motion.div>
        );
    }

    const verificationRate = Math.round((analyticsData.counts.verified_users / analyticsData.counts.total_users) * 100);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">User Analytics</h3>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                        {analyticsData.counts.total_users.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Total Users</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                        {verificationRate}%
                    </div>
                    <div className="text-sm text-gray-400">Verification Rate</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Verification Progress</span>
                    <span>{analyticsData.counts.verified_users} / {analyticsData.counts.total_users}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${verificationRate}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                    />
                </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <UserCheck className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                            <div className="text-white font-medium">Verified Users</div>
                            <div className="text-gray-400 text-sm">{analyticsData.counts.verified_users} accounts</div>
                        </div>
                    </div>
                    <div className="text-green-400 font-bold">+{verificationRate}%</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                            <UserX className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                            <div className="text-white font-medium">Unverified Users</div>
                            <div className="text-gray-400 text-sm">{analyticsData.counts.unverified_users} accounts</div>
                        </div>
                    </div>
                    <div className="text-orange-400 font-bold">-{100 - verificationRate}%</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <div className="text-white font-medium">New Users Today</div>
                            <div className="text-gray-400 text-sm">{analyticsData.counts.today_app_users} registrations</div>
                        </div>
                    </div>
                    <div className="text-blue-400 font-bold">+{analyticsData.counts.today_app_users}</div>
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200">
                    View Detailed Analytics →
                </button>
            </div>
        </motion.div>
    );
}
