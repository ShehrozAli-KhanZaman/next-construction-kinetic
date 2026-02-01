'use client';

import { useState } from 'react';

const PlotInfo = ({ plot, isVisible, onClose, className = "" }) => {
    if (!isVisible || !plot) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'sold':
                return 'text-red-600 bg-red-50 border-red-200';
            case 'reserved':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'available':
                return 'Available';
            case 'sold':
                return 'Sold';
            case 'reserved':
                return 'Reserved';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{plot.id}</h2>
                            <p className="text-gray-600">Plot Information</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(plot.status)}`}>
                            {getStatusText(plot.status)}
                        </span>
                    </div>

                    {/* Plot Details */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Plot ID</label>
                                <p className="text-lg font-semibold text-gray-900">{plot.id}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Size</label>
                                <p className="text-lg font-semibold text-gray-900">{plot.size}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Coordinates</label>
                            <p className="text-sm text-gray-600">
                                Lat: {plot.coordinates[1].toFixed(6)}, Lng: {plot.coordinates[0].toFixed(6)}
                            </p>
                        </div>

                        {plot.price && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <p className="text-2xl font-bold text-green-600">{plot.price}</p>
                            </div>
                        )}

                        {plot.description && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <p className="text-gray-600">{plot.description}</p>
                            </div>
                        )}

                        {plot.features && plot.features.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                                <ul className="space-y-1">
                                    {plot.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-3">
                        {plot.status === 'available' && (
                            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                                Inquire Now
                            </button>
                        )}
                        <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium">
                            View Details
                        </button>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                        <h4 className="font-medium text-gray-800 mb-2">Contact for this plot:</h4>
                        <p className="text-sm text-gray-600">Phone: +92 300 1234567</p>
                        <p className="text-sm text-gray-600">Email: info@realtormfi.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlotInfo;
