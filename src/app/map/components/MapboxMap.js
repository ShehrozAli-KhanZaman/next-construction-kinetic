'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DHA_OVERLAY_CONFIG, DEFAULT_CENTER, MIN_ZOOM, MAX_ZOOM } from '../data/mapData';
import { MAPBOX_CONFIG } from '../config/mapbox';

// Set Mapbox access token
mapboxgl.accessToken = MAPBOX_CONFIG.PUBLIC_TOKEN;

const MapboxMap = ({
    selectedCity,
    selectedArea,
    selectedSector,
    selectedPlot,
    onPlotClick,
    className = "",
}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [plotMarkers, setPlotMarkers] = useState([]);
    const geocodeCache = useRef(new Map());

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: MAPBOX_CONFIG.DEFAULT_STYLE,
            center: [DEFAULT_CENTER.lng, DEFAULT_CENTER.lat],
            zoom: 11,
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM,
            attributionControl: false
        });

        map.current.on('load', () => {
            setMapLoaded(true);
            // addDHAOverlays();
        });

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);

    const addDHAOverlays = (area = selectedArea) => {
        if (!map.current || !mapLoaded) return;

        // Clear existing overlays
        clearOverlays();

        if (!area || !DHA_OVERLAY_CONFIG[area]) return;

        const overlayConfig = DHA_OVERLAY_CONFIG[area];

        overlayConfig.overlays.forEach((overlay) => {
            const sourceId = `dha-${overlay.id}`;
            const layerId = `dha-${overlay.id}-layer`;

            // Add raster source with proper image handling
            map.current.addSource(sourceId, {
                type: 'image',
                url: overlay.image,
                coordinates: [
                    [overlay.bounds[0][1], overlay.bounds[0][0]], // SW
                    [overlay.bounds[1][1], overlay.bounds[0][0]], // SE
                    [overlay.bounds[1][1], overlay.bounds[1][0]], // NE
                    [overlay.bounds[0][1], overlay.bounds[1][0]]  // NW
                ]
            });

            // Add raster layer
            map.current.addLayer({
                id: layerId,
                type: 'raster',
                source: sourceId,
                paint: {
                    'raster-opacity': 0.8
                }
            });
        });
    };

    const clearOverlays = () => {
        if (!map.current) return;

        // Remove all DHA overlay layers and sources
        Object.values(DHA_OVERLAY_CONFIG).forEach(config => {
            config.overlays.forEach(overlay => {
                const layerId = `dha-${overlay.id}-layer`;
                const sourceId = `dha-${overlay.id}`;

                if (map.current.getLayer(layerId)) {
                    map.current.removeLayer(layerId);
                }
                if (map.current.getSource(sourceId)) {
                    map.current.removeSource(sourceId);
                }
            });
        });
    };

    useEffect(() => {
        if (!mapLoaded || !map.current || !selectedArea || selectedSector) return;

        if (DHA_OVERLAY_CONFIG[selectedArea]) {
            const overlays = DHA_OVERLAY_CONFIG[selectedArea].overlays;
            if (overlays.length > 0) {
                const allBounds = overlays.map(overlay => overlay.bounds);
                const minLat = Math.min(...allBounds.map(bounds => bounds[0][0]));
                const maxLat = Math.max(...allBounds.map(bounds => bounds[1][0]));
                const minLng = Math.min(...allBounds.map(bounds => bounds[0][1]));
                const maxLng = Math.max(...allBounds.map(bounds => bounds[1][1]));

                map.current.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
                    padding: 50,
                    maxZoom: 15
                });
            }
        } else {
            const query = selectedArea + ", Punjab, Pakistan";
            const fitToFeature = (feature) => {
                if (!feature || !map.current) return;

                if (feature.bbox && feature.bbox.length === 4) {
                    const [minLng, minLat, maxLng, maxLat] = feature.bbox;
                    map.current.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
                        padding: 40,
                        maxZoom: 17
                    });
                } else if (feature.center && feature.center.length === 2) {
                    map.current.flyTo({
                        center: feature.center,
                        zoom: 15,
                        essential: true
                    });
                }
            };
            const fetchGeocode = async () => {
                try {
                    const params = new URLSearchParams({
                        access_token: MAPBOX_CONFIG.PUBLIC_TOKEN,
                        limit: '1'
                    });

                    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?${params.toString()}`);

                    if (!response.ok) {
                        console.error('Failed to fetch sector location', response.statusText);
                        return;
                    }

                    const data = await response.json();
                    const feature = data.features?.[0];
                    if (!feature) return;

                    fitToFeature(feature);
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error('Error fetching sector location', error);
                    }
                }
            };
            fetchGeocode();
        }
    }, [selectedArea, selectedSector, mapLoaded]);

    useEffect(() => {
        if (!mapLoaded || !map.current || !selectedSector) return;
        let end = ", Punjab, Pakistan"
        const queryParts = [selectedSector, selectedArea, selectedCity, end].filter(Boolean);
        if (queryParts.length === 0) return;

        const query = queryParts.join(', ');
        const cacheKey = query.toLowerCase();

        const fitToFeature = (feature) => {
            if (!feature || !map.current) return;

            if (feature.bbox && feature.bbox.length === 4) {
                const [minLng, minLat, maxLng, maxLat] = feature.bbox;
                map.current.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
                    padding: 40,
                    maxZoom: 17
                });
            } else if (feature.center && feature.center.length === 2) {
                map.current.flyTo({
                    center: feature.center,
                    zoom: 15,
                    essential: true
                });
            }
        };

        const cachedFeature = geocodeCache.current.get(cacheKey);
        if (cachedFeature) {
            fitToFeature(cachedFeature);
            return;
        }

        const controller = new AbortController();

        const fetchGeocode = async () => {
            try {
                const params = new URLSearchParams({
                    access_token: MAPBOX_CONFIG.PUBLIC_TOKEN,
                    limit: '1'
                });

                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?${params.toString()}`, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    console.error('Failed to fetch sector location', response.statusText);
                    return;
                }

                const data = await response.json();
                const feature = data.features?.[0];
                if (!feature) return;

                geocodeCache.current.set(cacheKey, feature);
                fitToFeature(feature);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error fetching sector location', error);
                }
            }
        };

        fetchGeocode();

        return () => controller.abort();
    }, [selectedSector, selectedArea, selectedCity, mapLoaded]);

    useEffect(() => {
        if (!mapLoaded || !map.current) return;

        // Clear existing markers
        plotMarkers.forEach(marker => marker.remove());
        const newMarkers = [];

        // Add plot marker for selected plot
        if (selectedPlot) {
            const markerElement = document.createElement('div');
            markerElement.className = 'w-6 h-6 rounded-full cursor-pointer border-2 bg-blue-500 border-blue-700 flex items-center justify-center';
            markerElement.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>';
            markerElement.title = `Selected Plot: ${selectedPlot}`;

            // Calculate center of the selected area for marker placement
            let markerCoords = [DEFAULT_CENTER.lng, DEFAULT_CENTER.lat];

            if (selectedArea && DHA_OVERLAY_CONFIG[selectedArea]) {
                const overlays = DHA_OVERLAY_CONFIG[selectedArea].overlays;
                if (overlays.length > 0) {
                    // Use the first overlay's center as marker position
                    const bounds = overlays[0].bounds;
                    markerCoords = [
                        (bounds[0][1] + bounds[1][1]) / 2,
                        (bounds[0][0] + bounds[1][0]) / 2
                    ];
                }
            }

            const marker = new mapboxgl.Marker(markerElement)
                .setLngLat(markerCoords)
                .addTo(map.current);

            newMarkers.push(marker);
        }

        setPlotMarkers(newMarkers);

        return () => {
            newMarkers.forEach(marker => marker.remove());
        };
    }, [selectedPlot, selectedArea, mapLoaded, onPlotClick]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            <div ref={mapContainer} className="w-full h-full rounded-lg" />
            {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-gray-600">Loading map...</div>
                </div>
            )}
        </div>
    );
};

export default MapboxMap;
