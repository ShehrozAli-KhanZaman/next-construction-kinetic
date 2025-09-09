'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Phone, MoreVertical, CheckCircle, XCircle, Clock, User } from 'lucide-react';

const getStatusIcon = (verified) => {
    if (verified) {
        return <CheckCircle className="w-4 h-4 text-green-400" />;
    } else {
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'active':
            return 'bg-green-100 text-green-800';
        case 'inactive':
            return 'bg-red-100 text-red-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatPhone = (phone) => {
    if (!phone) return 'N/A';
    return phone;
};

const getUserTypeIcon = (userType) => {
    switch (userType) {
        case 'app_user':
            return <User className="w-4 h-4 text-blue-400" />;
        case 'script_user':
            return <Users className="w-4 h-4 text-purple-400" />;
        default:
            return <User className="w-4 h-4 text-gray-400" />;
    }
};

const getUserTypeColor = (userType) => {
    switch (userType) {
        case 'app_user':
            return 'bg-blue-100 text-blue-800';
        case 'script_user':
            return 'bg-purple-100 text-purple-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function UserList({ users, loading, searchType }) {
    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400 text-lg">Loading users...</p>
                        <p className="text-gray-500 text-sm mt-2">Fetching data from server</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
                <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No Users Found</h3>
                    <p className="text-gray-500">
                        No users match the current filter criteria. Try adjusting your filters.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
        >
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-white">Users List</h3>
                        <p className="text-gray-400 mt-1">
                            Showing {users.length} users • Filter: {searchType.replace('_', ' ')}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Total: {users.length}</span>
                    </div>
                </div>
            </div>

            {/* Users List */}
            <div className="divide-y divide-gray-700">
                {users.map((user, index) => (
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
                                    {getUserTypeIcon(user.user_type)}
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
                                    <div className="flex items-center space-x-1">
                                        <Phone className="w-4 h-4" />
                                        <span>{formatPhone(user.user_phone)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status and Actions */}
                            <div className="flex items-center space-x-3">
                                <div className="flex flex-col items-end space-y-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.user_status)}`}>
                                        {user.user_status?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUserTypeColor(user.user_type)}`}>
                                        {user.user_type?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="text-right text-xs text-gray-400">
                                        <div>ID: {user.user_id}</div>
                                        {user.days_since_signup && (
                                            <div>{user.days_since_signup} days ago</div>
                                        )}
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-gray-600 transition-colors">
                                        <MoreVertical className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">Created:</span>
                                <span className="text-white">{formatDate(user.user_create_date)}</span>
                            </div>
                            {user.user_last_login && (
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-400">Last Login:</span>
                                    <span className="text-white">{formatDate(user.user_last_login)}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-400">Verification:</span>
                                <span className={`font-medium ${user.verified_acc ? 'text-green-400' : 'text-red-400'}`}>
                                    {user.verified_acc ? 'Verified' : 'Unverified'}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
