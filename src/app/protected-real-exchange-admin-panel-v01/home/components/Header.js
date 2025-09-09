'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Bell,
    MessageSquare,
    Folder,
    Globe,
    Settings,
    MoreVertical,
    Menu
} from 'lucide-react';

export default function Header({ onMenuClick }) {
    const [notifications] = useState({
        bell: 12,
        message: 5,
        folder: 2
    });

    return (
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left Side */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <Menu className="w-6 h-6 text-gray-400" />
                    </button>

                    {/* Search Bar */}
                    <div className="hidden md:block relative">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-80 pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <div className="flex items-center space-x-3">
                        {/* Bell Notification */}
                        <div className="relative">
                            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <Bell className="w-6 h-6 text-gray-400" />
                            </button>
                            {notifications.bell > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                                >
                                    <span className="text-xs font-bold text-white">{notifications.bell}</span>
                                </motion.div>
                            )}
                        </div>

                        {/* Message Notification */}
                        <div className="relative">
                            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <MessageSquare className="w-6 h-6 text-gray-400" />
                            </button>
                            {notifications.message > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                                >
                                    <span className="text-xs font-bold text-white">{notifications.message}</span>
                                </motion.div>
                            )}
                        </div>

                        {/* Folder Notification */}
                        <div className="relative">
                            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                                <Folder className="w-6 h-6 text-gray-400" />
                            </button>
                            {notifications.folder > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                                >
                                    <span className="text-xs font-bold text-white">{notifications.folder}</span>
                                </motion.div>
                            )}
                        </div>

                        {/* Language Selector */}
                        <div className="flex items-center space-x-2">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-300">ENGLISH</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                        <div className="text-right">
                            <p className="text-sm font-medium text-white">Admin User</p>
                            <p className="text-xs text-gray-400">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">AU</span>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <Settings className="w-5 h-5 text-gray-400" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
