'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    MapPin,
    Calendar,
    DollarSign,
    Ticket,
    MoreVertical,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';
import { getUsers } from '../api';

export default function RecentUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getUsers("app_users_all", currentPage, 10, 14);

            if (data && data.status_code === 200) {
                setUsers(data.data.users);
                setTotalPages(data.data.pagination.total_pages);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'free_trial':
                return 'bg-blue-500/20 text-blue-400';
            case 'read_only':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'verified':
                return 'bg-green-500/20 text-green-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    const getStatusIcon = (verified) => {
        if (verified) {
            return <CheckCircle className="w-4 h-4 text-green-400" />;
        }
        return <Clock className="w-4 h-4 text-yellow-400" />;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatPhone = (phone) => {
        if (!phone) return 'N/A';
        return phone.replace(/(\+92)(\d{3})(\d{7})/, '$1 $2 $3');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl border border-gray-700"
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Recent User Registrations</h3>
                    <a
                        href="/protected-real-exchange-admin-panel-v01/home/users"
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                        View all →
                    </a>
                </div>
            </div>

            {/* Users List */}
            <div className="divide-y divide-gray-700">
                {loading ? (
                    <div className="p-6 text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading users...</p>
                    </div>
                ) : (
                    users.map((user, index) => (
                        <motion.div
                            key={user.user_id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-6 hover:bg-gray-700/50 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                {/* User Avatar */}
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        {user.user_full_name?.charAt(0) || 'U'}
                                    </span>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <h4 className="text-white font-medium truncate">
                                            {user.user_full_name || 'Unknown User'}
                                        </h4>
                                        {getStatusIcon(user.verified_acc)}
                                    </div>

                                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{user.user_address?.city || 'N/A'}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(user.user_create_date)}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="w-4 h-4" />
                                            <span>{user.user_company_name || 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="mt-2 text-sm text-gray-500">
                                        {formatPhone(user.user_phone)}
                                    </div>
                                </div>

                                {/* Status and Actions */}
                                <div className="flex items-center space-x-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.user_status)}`}>
                                        {user.user_status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                                    </span>

                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-400">
                                            {user.days_since_signup} days ago
                                        </span>
                                        {/* <button className="p-2 rounded-lg hover:bg-gray-600 transition-colors">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="p-6 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            Showing {users.length} of {totalPages * 10} users
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-2 text-sm text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
