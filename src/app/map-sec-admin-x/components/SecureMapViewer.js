'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_CONFIG } from '../../map/config/mapbox';
import { DEFAULT_CENTER, MIN_ZOOM, MAX_ZOOM } from '../../map/data/mapData';

// Set Mapbox access token
mapboxgl.accessToken = MAPBOX_CONFIG.PUBLIC_TOKEN;

export default function SecureMapViewer({
  area,
  sector,
  plotNumber,
  getAreaCoordinates,
  getSectorCoordinates,
  getPlotCoordinates,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const geocodeCache = useRef(new Map());
  const currentMarker = useRef(null);

  // Initialize map
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
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Function to add marker on map
  const addMarkerToMap = (lat, lng, title) => {
    if (!map.current) return;

    // Remove existing marker
    if (currentMarker.current) {
      currentMarker.current.remove();
    }

    // Create popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(title);

    // Add new marker
    currentMarker.current = new mapboxgl.Marker({ color: '#3b82f6' })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map.current)
      .togglePopup();
  };

  // Function to build a Mapbox query string
  const buildGeocodeQuery = ({ type, plot, sector, area }) => {
    const normalizedArea = area?.trim();
    const normalizedSector = sector?.trim();
    const normalizedPlot = plot?.trim();

    if (type === 'plot') {
      return [normalizedPlot ? `Plot ${normalizedPlot}` : null, normalizedSector, normalizedArea, 'Lahore', 'Pakistan']
        .filter(Boolean)
        .join(', ');
    }

    if (type === 'sector') {
      return [normalizedSector, normalizedArea, 'Lahore', 'Pakistan']
        .filter(Boolean)
        .join(', ');
    }

    if (type === 'area') {
      return [normalizedArea, 'Lahore', 'Pakistan']
        .filter(Boolean)
        .join(', ');
    }

    return '';
  };

  const flyToCoords = (coords, zoom = 15) => {
    if (!map.current || !coords || coords.length !== 2) return;
    map.current.flyTo({
      center: [coords[1], coords[0]],
      zoom,
      essential: true
    });
  };

  const navigateToFallback = (coords, title, zoom) => {
    if (!coords || coords.length !== 2) return;
    if (title) addMarkerToMap(coords[0], coords[1], title);
    flyToCoords(coords, zoom);
  };

  const fetchGeocodeAndNavigate = async (query, title, fallbackQuery = '', fallbackCoords = null, fallbackZoom = 15) => {
    if (!map.current || !query?.trim()) {
      if (fallbackCoords) navigateToFallback(fallbackCoords, title, fallbackZoom);
      return;
    }

    const cacheKey = query.toLowerCase();
    const cachedFeature = geocodeCache.current.get(cacheKey);

    if (cachedFeature) {
      handleNavigateToFeature(cachedFeature, title);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 5000);

    try {
      const params = new URLSearchParams({
        access_token: MAPBOX_CONFIG.PUBLIC_TOKEN,
        limit: '1',
        country: 'pk',
        autocomplete: 'false',
        types: 'place,locality,neighborhood,region,address'
      });

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: controller.signal
        }
      );

      if (!response.ok) {
        console.warn('Geocoding API response not ok:', response.status, response.statusText);
        if (fallbackQuery) {
          await fetchGeocodeAndNavigate(fallbackQuery, title, '', fallbackCoords, fallbackZoom);
        } else if (fallbackCoords) {
          navigateToFallback(fallbackCoords, title, fallbackZoom);
        }
        return;
      }

      const data = await response.json();
      const feature = data.features?.[0];

      if (!feature) {
        console.warn('No geocoding feature found for query:', query);
        if (fallbackQuery) {
          await fetchGeocodeAndNavigate(fallbackQuery, title, '', fallbackCoords, fallbackZoom);
        } else if (fallbackCoords) {
          navigateToFallback(fallbackCoords, title, fallbackZoom);
        }
        return;
      }

      geocodeCache.current.set(cacheKey, feature);
      handleNavigateToFeature(feature, title);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('Geocoding request timed out for query:', query);
      } else if (error.message.includes('Failed to fetch') || error.message.includes('ERR_INTERNET_DISCONNECTED')) {
        console.warn('Network error fetching geocode for query:', query, '- using fallback');
      } else {
        console.error('Error fetching geocode:', error);
      }
      if (fallbackQuery) {
        await fetchGeocodeAndNavigate(fallbackQuery, title, '', fallbackCoords, fallbackZoom);
      } else if (fallbackCoords) {
        navigateToFallback(fallbackCoords, title, fallbackZoom);
      }
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  // Function to navigate to a feature
  const handleNavigateToFeature = (feature, title) => {
    if (!map.current) return;

    if (feature.center && feature.center.length === 2) {
      const [lng, lat] = feature.center;
      addMarkerToMap(lat, lng, title);
      map.current.flyTo({
        center: [lng, lat],
        zoom: 16,
        essential: true
      });
    }
  };

  // Handle plot selection
  useEffect(() => {
    if (!mapLoaded || !map.current || !plotNumber) return;

    const coords = getPlotCoordinates();
    if (coords && Array.isArray(coords) && coords.length === 2) {
      const [lat, lng] = coords;
      addMarkerToMap(lat, lng, `Plot ${plotNumber}`);
      map.current.flyTo({
        center: [lng, lat],
        zoom: 17,
        essential: true
      });
    } else {
      const query = buildGeocodeQuery({ type: 'plot', plot: plotNumber, sector, area });
      const fallbackQuery = buildGeocodeQuery({ type: 'sector', sector, area });
      const fallbackCoords = getSectorCoordinates() || getAreaCoordinates() || [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];
      fetchGeocodeAndNavigate(query, `Plot ${plotNumber}`, fallbackQuery, fallbackCoords, 15);
    }
  }, [plotNumber, mapLoaded, getPlotCoordinates, sector, area, getSectorCoordinates, getAreaCoordinates]);

  // Handle sector selection
  useEffect(() => {
    if (!mapLoaded || !map.current || !sector || plotNumber) return;

    const coords = getSectorCoordinates();
    if (coords && Array.isArray(coords) && coords.length === 2) {
      const [lat, lng] = coords;
      if (currentMarker.current) currentMarker.current.remove();
      map.current.flyTo({
        center: [lng, lat],
        zoom: 16,
        essential: true
      });
    } else {
      const query = buildGeocodeQuery({ type: 'sector', sector, area });
      const fallbackQuery = buildGeocodeQuery({ type: 'area', area });
      const fallbackCoords = getAreaCoordinates() || [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];
      fetchGeocodeAndNavigate(query, sector, fallbackQuery, fallbackCoords, 15);
    }
  }, [sector, mapLoaded, getSectorCoordinates, area, getAreaCoordinates]);

  // Handle area selection
  useEffect(() => {
    if (!mapLoaded || !map.current || !area || sector) return;

    const coords = getAreaCoordinates();
    if (coords && Array.isArray(coords) && coords.length === 2) {
      const [lat, lng] = coords;
      if (currentMarker.current) currentMarker.current.remove();
      map.current.flyTo({
        center: [lng, lat],
        zoom: 15,
        essential: true
      });
    } else {
      const query = buildGeocodeQuery({ type: 'area', area });
      const fallbackCoords = [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];
      fetchGeocodeAndNavigate(query, area, '', fallbackCoords, 14);
    }
  }, [area, mapLoaded, getAreaCoordinates]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg overflow-hidden border border-gray-200 shadow-md"
    />
  );
}
