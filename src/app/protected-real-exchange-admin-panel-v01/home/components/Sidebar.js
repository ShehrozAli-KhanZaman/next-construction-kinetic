'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Users,
    UserCheck,
    Settings,
    BarChart3,
    FileText,
    Shield,
    ChevronDown,
    ChevronRight,
    X,
    LogOut
} from 'lucide-react';
import { adminLogout } from '@/utils/adminAuth';

export default function Sidebar({ isOpen, onClose }) {
    const [expandedItems, setExpandedItems] = useState({
        dashboard: true,
        users: false,
        analytics: false
    });
    const [searchQuery, setSearchQuery] = useState('');

    const toggleExpanded = (item) => {
        setExpandedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const handleLogout = () => {
        adminLogout();
        window.location.href = '/protected-real-exchange-admin-panel-v01';
    };

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            active: true,
            subItems: [
                { label: 'Dashboard Overview', href: '/protected-real-exchange-admin-panel-v01/home' },
                { label: 'User Analytics', href: '/protected-real-exchange-admin-panel-v01/home/users' },
                // { label: 'Reports', href: '/protected-real-exchange-admin-panel-v01/reports' }
            ]
        },
        {
            id: 'users',
            label: 'User Management',
            icon: Users,
            subItems: [
                { label: 'All Users', href: '/protected-real-exchange-admin-panel-v01/home/users' },
                { label: 'Verify Users', href: '/protected-real-exchange-admin-panel-v01/home/verify-users' },
                { label: 'Update User Status', href: '/protected-real-exchange-admin-panel-v01/home/update-user-status' }
            ]
        },
        // {
        //     id: 'analytics',
        //     label: 'Analytics',
        //     icon: BarChart3,
        //     subItems: [
        //         { label: 'User Statistics', href: '/protected-real-exchange-admin-panel-v01/stats' },
        //         { label: 'Performance', href: '/protected-real-exchange-admin-panel-v01/performance' },
        //         { label: 'Reports', href: '/protected-real-exchange-admin-panel-v01/reports' }
        //     ]
        // }
    ];

    // Filter menu items based on search query
    const filteredMenuItems = menuItems.filter(item => {
        if (!searchQuery.trim()) return true;

        const searchLower = searchQuery.toLowerCase();
        const matchesLabel = item.label.toLowerCase().includes(searchLower);
        const matchesSubItems = item.subItems?.some(subItem =>
            subItem.label.toLowerCase().includes(searchLower)
        );

        return matchesLabel || matchesSubItems;
    });

    return (
        <>
            {/* Mobile Overlay - Only show on mobile when sidebar is toggled */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                initial={{ x: -300 }}
                animate={{ x: isOpen ? 0 : -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-800 border-r border-gray-700 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Real Exchange</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 space-y-2">
                    {filteredMenuItems.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-gray-400 text-sm">
                                No menu items found for "{searchQuery}"
                            </div>
                        </div>
                    ) : (
                        filteredMenuItems.map((item) => (
                            <div key={item.id}>
                                <button
                                    onClick={() => toggleExpanded(item.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${item.active
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    {expandedItems[item.id] ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {expandedItems[item.id] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="ml-8 mt-2 space-y-1">
                                                {item.subItems.map((subItem, index) => (
                                                    <a
                                                        key={index}
                                                        href={subItem.href}
                                                        className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                                    >
                                                        {subItem.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))
                    )}
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-700">
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-600 transition-colors mb-4"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>

                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            Real Exchange Admin Panel © 2025-26<br />
                            All Rights Reserved
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
