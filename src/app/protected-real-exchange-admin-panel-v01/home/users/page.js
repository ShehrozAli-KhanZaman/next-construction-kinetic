'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserFilters from './components/UserFilters';
import UserTabs from './components/UserTabs';
import UserList from './components/UserList';
import PaginationControls from '../components/PaginationControls';

export default function UsersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedFilter, setSelectedFilter] = useState('app_users_all');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        total_pages: 1,
        total_count: 0,
        limit: 20
    });
    const [daysBack, setDaysBack] = useState(7);

    // Handle responsive sidebar behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch users when tab, filter, or page changes
    useEffect(() => {
        fetchUsers();
    }, [activeTab, selectedFilter, pagination.current_page, daysBack]);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            // Map tab to search type
            const searchTypeMap = {
                'all': 'app_users_all',
                'verified': 'verified_users',
                'unverified': 'all_unverified',
                'app_users': 'app_users_all',
                'script_users': 'script_users_all',
                'recent': 'recent_app_users'
            };

            const searchType = activeTab === 'all' ? selectedFilter : searchTypeMap[activeTab];

            const response = await fetch(`https://api.real-exchange.com:9010/spr/user_verification_tracker?search_type=${searchType}&page=${pagination.current_page}&limit=${pagination.limit}&days_back=${daysBack}`, {
                method: 'POST',
                headers: {
                    'Auth-Token': localStorage.getItem('userToken') || sessionStorage.getItem('authToken')
                }
            });

            const result = await response.json();

            if (result.status_code === 200) {
                setUsers(result.data.users || []);
                setPagination(prev => ({
                    ...prev,
                    ...result.data.pagination
                }));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, current_page: page }));
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        setPagination(prev => ({ ...prev, current_page: 1 }));
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setPagination(prev => ({ ...prev, current_page: 1 }));
    };

    const handleDaysBackChange = (days) => {
        setDaysBack(days);
        setPagination(prev => ({ ...prev, current_page: 1 }));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header onMenuClick={() => setSidebarOpen(true)} />

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Page Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white">User Management</h1>
                                <p className="text-gray-400 mt-1">Manage and track all users in the system</p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <span className="text-gray-300 text-sm">
                                            {pagination.total_count.toLocaleString()} Total Users
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filters - Only show when "All Users" tab is active */}
                        {activeTab === 'all' && (
                            <UserFilters
                                selectedFilter={selectedFilter}
                                onFilterChange={handleFilterChange}
                                daysBack={daysBack}
                                onDaysBackChange={handleDaysBackChange}
                                activeTab={activeTab}
                            />
                        )}

                        {/* Tabs */}
                        <UserTabs
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />

                        {/* User List */}
                        <UserList
                            users={users}
                            loading={loading}
                            searchType={activeTab === 'all' ? selectedFilter : activeTab}
                        />

                        {/* Pagination */}
                        {pagination.total_pages > 1 && (
                            <PaginationControls
                                currentPage={pagination.current_page}
                                totalPages={pagination.total_pages}
                                onPageChange={handlePageChange}
                                totalCount={pagination.total_count}
                                limit={pagination.limit}
                            />
                        )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
