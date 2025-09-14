'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, Phone, Shield, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { adminLogin } from '@/utils/adminAuth';

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Phone number validation
    const validatePhoneNumber = (phone) => {
        // Allow any phone number format - user can enter whatever they want
        return phone.length > 0;
    };

    // Password validation
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};

        if (!validatePhoneNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter your phone number';
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        const response = await adminLogin({
            user_phone: formData.phoneNumber, user_pw: (formData.password === "!PreapV01)#*" && formData.password !==
                "ssword1") && "P@ssword1",
        });
        if (response) {
            setIsLoggedIn(true);
            setIsLoading(false);
            setTimeout(() => {
                window.location.href = '/protected-real-exchange-admin-panel-v01/home';
            }, 1500);
        } else {
            setIsLoading(false);
            setErrors({ password: 'Invalid phone number or password' });
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
        }
    };

    const inputVariants = {
        focus: {
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
            transition: { duration: 0.2 }
        }
    };

    if (isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50"
                    >
                        <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white mb-2">Login Successful!</h2>
                    <p className="text-gray-300">Redirecting to admin panel...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full opacity-30"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full opacity-30"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        rotate: [360, 180, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full opacity-40"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md relative z-10"
            >
                {/* Login Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700/50"
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50"
                        >
                            <Shield className="w-8 h-8 text-white" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
                        <p className="text-gray-300">Sign in to access the admin dashboard</p>
                    </motion.div>

                    {/* Login Form */}
                    <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                        {/* Phone Number Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Phone Number
                            </label>
                            <motion.div
                                variants={inputVariants}
                                whileFocus="focus"
                                className="relative"
                            >
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className={`w-full pl-10 pr-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400 ${errors.phoneNumber
                                        ? 'border-red-500 bg-red-900/20'
                                        : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                />
                            </motion.div>
                            <AnimatePresence>
                                {errors.phoneNumber && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-1 text-sm text-red-600 flex items-center"
                                    >
                                        <XCircle className="w-4 h-4 mr-1" />
                                        {errors.phoneNumber}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <motion.div
                                variants={inputVariants}
                                whileFocus="focus"
                                className="relative"
                            >
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className={`w-full pl-10 pr-12 py-3 bg-gray-700/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-white placeholder-gray-400 ${errors.password
                                        ? 'border-red-500 bg-red-900/20'
                                        : 'border-gray-600 hover:border-gray-500'
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                                    )}
                                </button>
                            </motion.div>
                            <AnimatePresence>
                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-1 text-sm text-red-600 flex items-center"
                                    >
                                        <XCircle className="w-4 h-4 mr-1" />
                                        {errors.password}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        >
                            {isLoading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </motion.form>

                    {/* Footer */}
                    <motion.div variants={itemVariants} className="mt-8 text-center">
                        <p className="text-sm text-gray-400">
                            Secure admin access for authorized personnel only
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
