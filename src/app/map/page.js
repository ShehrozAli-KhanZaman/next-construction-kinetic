'use client';

import { useState } from 'react';
import MapboxMap from './components/MapboxMap';
import SearchControls from './components/SearchControls';

export default function MapPage() {
    const [city, setCity] = useState("Lahore");
    const [area, setArea] = useState("");
    const [sector, setSector] = useState("");
    const [plotNumber, setPlotNumber] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle plot click from map
    const handlePlotClick = (plot) => {
        console.log('Plot clicked:', plot);
    };

    return (
        <div className="relative h-screen w-full">
            {/* Map (full-screen) */}
            <MapboxMap
                selectedCity={city}
                selectedArea={area}
                selectedSector={sector}
                selectedPlot={plotNumber}
                onPlotClick={handlePlotClick}
                className="w-full h-full"
            />

            {/* Search controls overlay */}
            <div className="absolute top-4 left-0 right-0 z-20 px-4">
                <SearchControls
                    city={city}
                    area={area}
                    sector={sector}
                    plotNumber={plotNumber}
                    setCity={setCity}
                    setArea={setArea}
                    setSector={setSector}
                    setPlotNumber={setPlotNumber}
                    setLoading={setLoading}
                    className="w-full max-w-5xl mx-auto"
                />
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            )}

            {/* Map Overlay Info (bottom-left to avoid overlapping the controls) */}
            {area && (
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg z-10">
                    <h3 className="font-semibold text-gray-800">
                        {area}
                    </h3>
                    {plotNumber && (
                        <p className="text-sm text-gray-600">
                            Selected Plot: {plotNumber}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
