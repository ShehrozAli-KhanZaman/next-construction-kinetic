'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const RasterTilesTest = ({ map, tilesUrl, opacity = 0.8 }) => {
    const sourceId = 'raster-tiles-source';
    const layerId = 'raster-tiles-layer';

    useEffect(() => {
        if (!map || !tilesUrl) return;

        // Add the raster tiles source
        map.addSource(sourceId, {
            type: 'raster',
            tiles: [tilesUrl],
            tileSize: 256
        });

        // Add the raster layer
        map.addLayer({
            id: layerId,
            type: 'raster',
            source: sourceId,
            paint: {
                'raster-opacity': opacity
            }
        });

        // Cleanup function
        return () => {
            if (map.getLayer(layerId)) {
                map.removeLayer(layerId);
            }
            if (map.getSource(sourceId)) {
                map.removeSource(sourceId);
            }
        };
    }, [map, tilesUrl, opacity]);

    return null; // This component doesn't render anything
};

export default RasterTilesTest;
