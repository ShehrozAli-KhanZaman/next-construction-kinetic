'use client';

import { motion } from 'framer-motion';
import { Users, CheckCircle, XCircle, UserPlus, UserCheck, Clock } from 'lucide-react';

const tabs = [
    {
        id: 'all',
        label: 'All Users',
        icon: Users,
        description: 'View all users with custom filters',
        searchType: 'app_users_all'
    },
    {
        id: 'verified',
        label: 'Verified Users',
        icon: CheckCircle,
        description: 'All verified users',
        searchType: 'verified_users'
    },
    {
        id: 'unverified',
        label: 'Unverified Users',
        icon: XCircle,
        description: 'All users needing verification',
        searchType: 'all_unverified'
    },
    {
        id: 'app_users',
        label: 'App Users',
        icon: UserPlus,
        description: 'Users who signed up through the app',
        searchType: 'app_users_all'
    },
    {
        id: 'script_users',
        label: 'Script Users',
        icon: UserCheck,
        description: 'Users created by admin',
        searchType: 'script_users_all'
    },
    {
        id: 'recent',
        label: 'Recent Users',
        icon: Clock,
        description: 'Recently registered users',
        searchType: 'recent_app_users'
    }
];

export default function UserTabs({ activeTab, onTabChange }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
            <div className="flex items-center space-x-4 mb-6">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">User Categories</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <motion.button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-lg border transition-all duration-200 text-left ${isActive
                                ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                                : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                                }`}
                        >
                            <div className="flex items-center space-x-3 mb-2">
                                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                                <span className="font-semibold">{tab.label}</span>
                            </div>
                            <p className="text-sm text-gray-400">{tab.description}</p>
                        </motion.button>
                    );
                })}
            </div>

            {/* Active Tab Indicator */}
            <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="font-medium">Active Category:</span>
                    <span className="text-blue-400">
                        {tabs.find(tab => tab.id === activeTab)?.label}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
