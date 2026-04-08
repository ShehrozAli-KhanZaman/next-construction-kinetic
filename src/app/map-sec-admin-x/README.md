# Secure Property Management Route

## Location
This is a hidden, security-proof route located at: `/map-sec-admin-x`

## Purpose
This route provides a secure property management interface that allows authorized users to:
- Browse properties using cascading dropdowns (City → Area → Sector → Plot)
- Visualize property locations on an interactive Mapbox map
- Navigate to specific plots with integrated coordinate display

## Features
- **Cascading Dropdowns**: Dropdowns enable/disable based on parent selection
- **Smart Clearing**: Selection changes automatically clear dependent dropdowns
- **Intelligent Coordinates**:
  - Uses embedded coordinates from `PAKISTAN_DATA` when available (direct display)
  - Falls back to Mapbox API for geocoding when coordinates aren't available
- **Dynamic Map Navigation**: Map automatically navigates to selected area/sector/plot
- **Marker Display**: Shows markers with labels for direct selection

## Folder Structure
```
map-sec-admin-x/
├── page.js                          # Main route page
├── components/
│   ├── SecureDropdowns.js          # Dropdown selector component
│   └── SecureMapViewer.js          # Map visualization component
├── config/
│   └── dropdownConfig.js           # Configuration for dropdowns and styling
└── hooks/
    └── useCascadingDropdowns.js    # Custom hook for dropdown logic
```

## Data Flow
1. Dropdowns trigger state changes via hooks
2. Hook retrieves coordinates from `PAKISTAN_DATA` (shared from `/map/data/mapData.js`)
3. Map component receives coordinates and either:
   - Uses direct coordinates: narrows to zoom level 15-17
   - Fetches via API: uses Mapbox geocoding with cache
4. Map navigates with flyTo animation and displays markers

## Recent Changes
- **Removed city dropdown**: Defaults to Lahore (only city available)
- **Mobile-responsive styling**: Matches main map's SearchControls appearance
- **Logo overlay**: Added company logo in bottom-right corner
- **Plot info overlay**: Only displays when plot number is selected
- **Full-screen layout**: Changed from grid layout to full-screen map like main page
- **Improved API error handling**: Better error logging for geocoding requests
- **Top overlay controls**: Search controls positioned as overlay on map

## Security Notes
- Route URL is intentionally obscure (`map-sec-admin-x`)
- Not linked from main navigation
- Requires direct URL access
- Consider adding authentication middleware if needed

## Dependencies
- `mapbox-gl`: Map rendering
- React hooks: State management
- Tailwind CSS: Styling
- PAKISTAN_DATA: Shared data structure
