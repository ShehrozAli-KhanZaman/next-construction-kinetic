'use client';

import { useState } from 'react';
import { DHA_PHASE_BOUNDS } from '../data/mapData';

const MapControls = ({ onPhaseSelect, selectedPhase, className = "" }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const phases = Object.entries(DHA_PHASE_BOUNDS).map(([key, data]) => ({
        id: key,
        name: data.name,
        plotCount: data.plots.length,
        availablePlots: data.plots.filter(plot => plot.status === 'available').length
    }));

    return (
        <div className={`bg-white rounded-lg shadow-lg ${className}`}>
            {/* Header */}
            <div
                className="p-4 cursor-pointer flex justify-between items-center"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 className="text-lg font-semibold text-gray-800">DHA Phases</h3>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Phase List */}
            {isExpanded && (
                <div className="border-t border-gray-200">
                    {phases.map((phase) => (
                        <div
                            key={phase.id}
                            onClick={() => onPhaseSelect(phase.id)}
                            className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${selectedPhase === phase.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium text-gray-900">{phase.name}</h4>
                                    <p className="text-sm text-gray-600">
                                        {phase.availablePlots} of {phase.plotCount} plots available
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {phase.availablePlots > 0 && (
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {phase.availablePlots} Available
                                        </span>
                                    )}
                                    {selectedPhase === phase.id && (
                                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Quick Stats */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-gray-900">
                            {phases.reduce((sum, phase) => sum + phase.plotCount, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Total Plots</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">
                            {phases.reduce((sum, phase) => sum + phase.availablePlots, 0)}
                        </p>
                        <p className="text-sm text-gray-600">Available</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapControls;
