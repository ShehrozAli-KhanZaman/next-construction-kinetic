# Map Module

This module provides an interactive map interface for exploring DHA phases and plot information using Mapbox.

## Features

- **Interactive Map**: Mapbox-powered map with DHA phase overlays
- **Plot Markers**: Visual markers showing available, sold, and reserved plots
- **Search Controls**: Cascading dropdown filters (City → Area → Sector → Plot)
- **Phase Selection**: Click-to-select DHA phases with overlay highlighting
- **Plot Information**: Detailed plot information modal
- **Responsive Design**: Works on desktop and mobile devices

## Components

### `MapboxMap.js`
Main map component that renders the Mapbox map with DHA phase overlays and plot markers.

### `SearchControls.js`
Cascading dropdown search interface for filtering properties by location.

### `MapControls.js`
Phase selection panel showing available DHA phases with plot statistics.

### `PlotInfo.js`
Modal component displaying detailed plot information when a plot marker is clicked.

### `page.js`
Main page component that integrates all map functionality.

## Setup

1. **Install Dependencies**
   ```bash
   npm install mapbox-gl react-map-gl
   ```

2. **Mapbox Token**
   - Mapbox tokens are configured in `config/mapbox.js`
   - Public token: `pk.eyJ1IjoiemlhaGFzc2FuIiwiYSI6ImNtNTR6bjk0ejE0ZXIybHNlbDIxYjRpanUifQ.cr1fg5yN9cei3OHaXZmM9Q`
   - For production, you can also set `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable

3. **Data Configuration**
   - Update `data/mapData.js` with your actual DHA phase bounds and plot data
   - Modify image URLs to point to your actual overlay images

## Usage

```jsx
import MapPage from './map/page';

// The map page is accessible at /map route
```

## Data Structure

The map uses the following data structure defined in `mapData.js`:

- **DHA_PHASE_BOUNDS**: Contains phase boundaries, names, image URLs, and plot data
- **SEARCH_DATA**: Hierarchical search data (City → Area → Sector → Plot)
- **Plot Data**: Each plot includes coordinates, size, status, and metadata

## Customization

- **Styling**: All components use Tailwind CSS classes for easy customization
- **Colors**: Plot status colors can be modified in the components
- **Bounds**: Phase boundaries can be updated in `mapData.js`
- **Images**: Overlay images can be replaced by updating the image URLs

## Browser Support

- Modern browsers with WebGL support
- Mobile browsers (iOS Safari, Chrome Mobile)
- IE11+ (with polyfills)

## Performance Notes

- Map overlays are loaded on demand
- Plot markers are only rendered for the selected phase
- Images are cached by the browser after first load
