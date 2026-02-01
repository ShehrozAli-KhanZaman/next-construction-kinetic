'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ImageOverlayTest from '../components/ImageOverlayTest';
import { MAPBOX_CONFIG } from '../config/mapbox';

// Set Mapbox access token
mapboxgl.accessToken = MAPBOX_CONFIG.PUBLIC_TOKEN;

export default function ImageTestPage() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: MAPBOX_CONFIG.DEFAULT_STYLE,
            center: [74.3587, 31.5204], // Lahore center
            zoom: 11,
            attributionControl: false
        });

        map.current.on('load', () => {
            setMapLoaded(true);
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    const testImagePath = "/images/DHA/FotoJet.png"; // Change this to your image path
    const testBounds = [
        [31.46842, 74.38909], // SW corner
        [31.48551, 74.41385], // NE corner
    ];

    const handleToggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    const handleFitBounds = () => {
        if (map.current) {
            map.current.fitBounds([
                [testBounds[0][1], testBounds[0][0]], // SW
                [testBounds[1][1], testBounds[1][0]]  // NE
            ], {
                padding: 50,
                maxZoom: 15
            });
        }
    };

    return (
        <div className="relative h-screen w-full">
            {/* Map */}
            <div ref={mapContainer} className="w-full h-full" />

            {/* Test Controls */}
            <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-4 shadow-lg z-10">
                <h3 className="font-semibold text-gray-800 mb-3">Image Overlay Test</h3>

                <div className="space-y-2">
                    <button
                        onClick={handleToggleOverlay}
                        className={`w-full px-4 py-2 rounded-lg transition-colors ${showOverlay
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {showOverlay ? 'Hide Overlay' : 'Show Overlay'}
                    </button>

                    <button
                        onClick={handleFitBounds}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Fit to Image Bounds
                    </button>
                </div>

                <div className="mt-3 text-sm text-gray-600">
                    <p><strong>Image:</strong> {testImagePath}</p>
                    <p><strong>Bounds:</strong> {JSON.stringify(testBounds)}</p>
                </div>
            </div>

            {/* Loading Overlay */}
            {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-gray-600">Loading map...</div>
                </div>
            )}

            {/* Image Overlay Component */}
            {mapLoaded && showOverlay && (
                <ImageOverlayTest
                    map={map.current}
                    imagePath={testImagePath}
                    bounds={testBounds}
                    opacity={0.8}
                />
            )}
        </div>
    );
}
