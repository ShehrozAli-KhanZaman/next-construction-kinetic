'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
    totalCount,
    limit
}) {
    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, totalCount);

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                {/* Results Info */}
                <div className="text-sm text-gray-400">
                    Showing <span className="text-white font-medium">{startItem.toLocaleString()}</span> to{' '}
                    <span className="text-white font-medium">{endItem.toLocaleString()}</span> of{' '}
                    <span className="text-white font-medium">{totalCount.toLocaleString()}</span> results
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                    {/* First Page */}
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-colors ${currentPage === 1
                            ? 'text-gray-500 cursor-not-allowed'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            }`}
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </button>

                    {/* Previous Page */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-colors ${currentPage === 1
                            ? 'text-gray-500 cursor-not-allowed'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                        {visiblePages.map((page, index) => {
                            if (page === '...') {
                                return (
                                    <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                                        ...
                                    </span>
                                );
                            }

                            const isActive = page === currentPage;
                            return (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>

                    {/* Next Page */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-colors ${currentPage === totalPages
                            ? 'text-gray-500 cursor-not-allowed'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            }`}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Last Page */}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-colors ${currentPage === totalPages
                            ? 'text-gray-500 cursor-not-allowed'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            }`}
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Page Info */}
            <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Page {currentPage} of {totalPages}</span>
                    <span>
                        {Math.ceil(totalCount / limit)} total pages
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
