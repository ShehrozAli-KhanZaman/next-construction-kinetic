'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';

const filterOptions = [
    { value: 'app_users_all', label: 'All App Users', description: 'All users who signed up through the app' },
    { value: 'app_users_unverified', label: 'Unverified App Users', description: 'App users who haven\'t verified their account' },
    { value: 'script_users_all', label: 'All Script Users', description: 'All users created by admin' },
    { value: 'script_users_logged_in_unverified', label: 'Script Users (Logged In)', description: 'Script users who logged in but not verified' },
    { value: 'script_users_not_logged_in', label: 'Script Users (Not Logged In)', description: 'Script users who haven\'t logged in yet' },
    { value: 'all_unverified', label: 'All Unverified Users', description: 'All users needing verification' },
    { value: 'verified_users', label: 'Verified Users', description: 'All verified users' },
    { value: 'recent_app_users', label: 'Recent App Users', description: 'Recent app users (last N days)' }
];

const daysBackOptions = [
    { value: 1, label: 'Last 1 Day' },
    { value: 3, label: 'Last 3 Days' },
    { value: 7, label: 'Last 7 Days' },
    { value: 14, label: 'Last 14 Days' },
    { value: 30, label: 'Last 30 Days' },
    { value: 90, label: 'Last 90 Days' }
];

export default function UserFilters({ selectedFilter, onFilterChange, daysBack, onDaysBackChange, activeTab }) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDaysOpen, setIsDaysOpen] = useState(false);

    const selectedFilterOption = filterOptions.find(option => option.value === selectedFilter);
    const selectedDaysOption = daysBackOptions.find(option => option.value === daysBack);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
            <div className="flex items-center space-x-4 mb-4">
                <Filter className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User Type Filter */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        User Type Filter
                    </label>
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-colors"
                        >
                            <div className="text-left">
                                <div className="font-medium">{selectedFilterOption?.label}</div>
                                <div className="text-xs text-gray-400">{selectedFilterOption?.description}</div>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isFilterOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                            >
                                {filterOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => {
                                            onFilterChange(option.value);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 hover:bg-gray-600 transition-colors ${selectedFilter === option.value ? 'bg-blue-600/20 text-blue-400' : 'text-white'
                                            }`}
                                    >
                                        <div className="font-medium">{option.label}</div>
                                        <div className="text-xs text-gray-400">{option.description}</div>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Days Back Filter (only show for recent_app_users) */}
                {selectedFilter === 'recent_app_users' && (
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Time Period
                        </label>
                        <div className="relative">
                            <button
                                onClick={() => setIsDaysOpen(!isDaysOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-colors"
                            >
                                <span className="font-medium">{selectedDaysOption?.label}</span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDaysOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDaysOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-50"
                                >
                                    {daysBackOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                onDaysBackChange(option.value);
                                                setIsDaysOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 hover:bg-gray-600 transition-colors ${daysBack === option.value ? 'bg-blue-600/20 text-blue-400' : 'text-white'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Active Filter Info */}
            <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <span className="font-medium">Active Filter:</span>
                    <span className="text-blue-400">{selectedFilterOption?.label}</span>
                    {selectedFilter === 'recent_app_users' && (
                        <>
                            <span className="text-gray-500">•</span>
                            <span className="text-green-400">{selectedDaysOption?.label}</span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
