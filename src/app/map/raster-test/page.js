'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RasterTilesTest from '../components/RasterTilesTest';
import { MAPBOX_CONFIG } from '../config/mapbox';

// Set Mapbox access token
mapboxgl.accessToken = MAPBOX_CONFIG.PUBLIC_TOKEN;

export default function RasterTilesTestPage() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentZoom, setCurrentZoom] = useState(11);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: MAPBOX_CONFIG.DEFAULT_STYLE,
            center: [74.3587, 31.5204], // Lahore center
            zoom: 11,
            minZoom: 10,
            maxZoom: 16, // Limit max zoom to prevent blurriness
            attributionControl: false
        });

        map.current.on('load', () => {
            setMapLoaded(true);
        });

        // Track zoom level changes
        map.current.on('zoom', () => {
            setCurrentZoom(Math.round(map.current.getZoom() * 10) / 10);
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    // Using your MapTiler generated tiles
    const tilesUrl = "/images/DHA/mp/{z}/{x}/{y}.png";

    // Bounds from metadata.json
    const tileBounds = [74.38922617, 31.46999767, 74.41492281, 31.48744368]; // [west, south, east, north]

    const handleToggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const handleFitBounds = () => {
        if (map.current) {
            map.current.fitBounds([
                [tileBounds[0], tileBounds[1]], // SW corner
                [tileBounds[2], tileBounds[3]]  // NE corner
            ], {
                padding: 50,
                maxZoom: 15 // Slightly lower than map maxZoom to ensure crisp tiles
            });
        }
    };

    return (
        <div className="relative h-screen w-full">
            {/* Map */}
            <div ref={mapContainer} className="w-full h-full" />

            {/* Test Controls */}
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-4 shadow-lg z-10">
                <h3 className="font-semibold text-gray-800 mb-3">Raster Tiles Test</h3>

                <div className="space-y-2">
                    <button
                        onClick={handleToggleOverlay}
                        className={`w-full px-4 py-2 rounded-lg transition-colors ${showOverlay
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {showOverlay ? 'Hide Tiles' : 'Show Tiles'}
                    </button>

                    <button
                        onClick={handleFitBounds}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Fit to Tile Bounds
                    </button>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                    <p><strong>Current Zoom:</strong> {currentZoom} (Max: 16)</p>
                    <p><strong>Tiles URL:</strong> {tilesUrl}</p>
                    <p className="text-xs text-gray-500 mt-2">
                        <strong>Note:</strong> Zoom limited to prevent image blurriness.<br />
                        Optimal zoom range: 10-16
                    </p>
                </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-lg p-4 shadow-lg z-10 max-w-md">
                <h4 className="font-semibold text-gray-800 mb-2">How to Generate Tiles:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Method 1 - GDAL2Tiles:</strong></p>
                    <code className="block bg-gray-100 p-1 rounded text-xs">
                        gdal2tiles.py -z 14-20 your-image.png ./tiles
                    </code>
                    <p><strong>Method 2 - MapTiler Desktop:</strong></p>
                    <p className="text-xs">Free GUI tool for generating tiles</p>
                </div>
            </div>

            {/* Loading Overlay */}
            {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-gray-600">Loading map...</div>
                </div>
            )}

            {/* Raster Tiles Component */}
            {mapLoaded && showOverlay && (
                <RasterTilesTest
                    map={map.current}
                    tilesUrl={tilesUrl}
                    opacity={0.8}
                />
            )}
        </div>
    );
}
