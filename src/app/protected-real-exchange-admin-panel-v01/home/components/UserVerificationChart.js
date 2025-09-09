'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { getAdminCount } from '../api';

// Dynamically import recharts to avoid SSR issues
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });

export default function UserVerificationChart() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchChartData();
    }, []);

    const fetchChartData = async () => {
        try {
            setLoading(true);
            const data = await getAdminCount();

            if (data && data.status_code === 200) {
                const counts = data.data.counts;
                const newChartData = [
                    { name: 'Verified Users', value: counts.verified_users, fill: '#10B981' },
                    { name: 'Unverified Users', value: counts.unverified_users, fill: '#F59E0B' },
                    { name: 'Script Users', value: counts.script_users, fill: '#8B5CF6' }
                ];
                setChartData(newChartData);
            }
        } catch (error) {
            console.error('Error fetching chart data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            </motion.div>
        );
    }

    if (!chartData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
                <div className="text-center text-gray-400">
                    <p>Failed to load chart data</p>
                </div>
            </motion.div>
        );
    }

    const COLORS = ['#10B981', '#F59E0B', '#8B5CF6'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
                    <p className="text-white font-medium">{payload[0].name}</p>
                    <p className="text-gray-300">
                        {payload[0].value} users ({((payload[0].value / 1164) * 100).toFixed(1)}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">User Distribution</h3>
            </div>

            {/* Chart */}
            <div className="h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => {
                                return <Cell key={`cell-${index}`} fill={entry.fill} />;
                            })}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                User distribution shows the breakdown of verified, unverified, and script users in the system.
                This helps track verification progress and user engagement.
            </p>

            {/* Stats */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-300">{chartData[0].value.toLocaleString()} Verified Users</span>
                    </div>
                    <span className="text-white font-medium">{Math.round((chartData[0].value / (chartData[0].value + chartData[1].value + chartData[2].value)) * 100)}%</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-300">{chartData[1].value.toLocaleString()} Unverified Users</span>
                    </div>
                    <span className="text-white font-medium">{Math.round((chartData[1].value / (chartData[0].value + chartData[1].value + chartData[2].value)) * 100)}%</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-300">{chartData[2].value.toLocaleString()} Script Users</span>
                    </div>
                    <span className="text-white font-medium">{Math.round((chartData[2].value / (chartData[0].value + chartData[1].value + chartData[2].value)) * 100)}%</span>
                </div>
            </div>
        </motion.div>
    );
}
