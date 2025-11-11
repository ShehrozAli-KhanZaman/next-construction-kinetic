'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const ImageOverlayTest = ({ map, imagePath, bounds, opacity = 0.8 }) => {
    const sourceId = 'test-image-source';
    const layerId = 'test-image-layer';

    useEffect(() => {
        if (!map || !imagePath || !bounds) return;

        // Add the image source
        map.addSource(sourceId, {
            type: 'image',
            url: imagePath,
            coordinates: [
                [bounds[0][1], bounds[0][0]], // SW
                [bounds[1][1], bounds[0][0]], // SE  
                [bounds[1][1], bounds[1][0]], // NE
                [bounds[0][1], bounds[1][0]]  // NW
            ]
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
    }, [map, imagePath, bounds, opacity]);

    return null; // This component doesn't render anything
};

export default ImageOverlayTest;
