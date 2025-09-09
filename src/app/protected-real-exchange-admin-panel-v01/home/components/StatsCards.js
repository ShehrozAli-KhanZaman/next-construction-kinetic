'use client';

import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCards({ data }) {
    const stats = [
        {
            title: 'Total Users',
            value: data.counts.total_users,
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10',
            iconColor: 'text-blue-400',
            trend: '+12%',
            trendUp: true,
            description: 'All registered users'
        },
        {
            title: 'Verified Users',
            value: data.counts.verified_users,
            icon: UserCheck,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-500/10',
            iconColor: 'text-green-400',
            trend: `+${data.summary.verification_rate}%`,
            trendUp: true,
            description: 'Verified accounts'
        },
        {
            title: 'App Users',
            value: data.counts.non_script_users,
            icon: Users,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10',
            iconColor: 'text-purple-400',
            trend: `+${data.summary.app_user_percentage}%`,
            trendUp: true,
            description: 'Mobile app users'
        },
        {
            title: 'Unverified Users',
            value: data.counts.unverified_users,
            icon: UserX,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500/10',
            iconColor: 'text-orange-400',
            trend: '-5%',
            trendUp: false,
            description: 'Pending verification'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                        </div>
                        <div className="flex items-center space-x-1">
                            {stat.trendUp ? (
                                <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : (
                                <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            <span className={`text-sm font-medium ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                            {stat.value.toLocaleString()}
                        </h3>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{stat.description}</p>
                    </div>

                    {/* Mini Chart */}
                    <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (stat.value / Math.max(...stats.map(s => s.value))) * 100)}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
