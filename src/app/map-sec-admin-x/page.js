'use client';

import { useEffect } from 'react';
import SecureDropdowns from './components/SecureDropdowns';
import SecureMapViewer from './components/SecureMapViewer';
import { useCascadingDropdowns } from './hooks/useCascadingDropdowns';
import Image from 'next/image';

export default function SecureMapAdminPage() {
  const {
    city,
    area,
    sector,
    plotNumber,
    cities,
    areas,
    sectors,
    plots,
    handleCityChange,
    handleAreaChange,
    handleSectorChange,
    handlePlotChange,
    initializeCities,
    getAreaCoordinates,
    getSectorCoordinates,
    getPlotCoordinates,
  } = useCascadingDropdowns();

  // Initialize cities on mount
  useEffect(() => {
    initializeCities();
  }, [initializeCities]);

  return (
    <div className="relative h-screen w-full">
      {/* Map (full-screen) */}
      <SecureMapViewer
        area={area}
        sector={sector}
        plotNumber={plotNumber}
        getAreaCoordinates={getAreaCoordinates}
        getSectorCoordinates={getSectorCoordinates}
        getPlotCoordinates={getPlotCoordinates}
        className="w-full h-full"
      />

      {/* Search controls overlay */}
      <div className="absolute top-4 left-0 right-0 z-20 px-4">
        <SecureDropdowns
          city={city}
          area={area}
          sector={sector}
          plotNumber={plotNumber}
          cities={cities}
          areas={areas}
          sectors={sectors}
          plots={plots}
          onCityChange={handleCityChange}
          onAreaChange={handleAreaChange}
          onSectorChange={handleSectorChange}
          onPlotChange={handlePlotChange}
          className="w-full max-w-5xl mx-auto"
        />
      </div>

      {/* Map Overlay Info (bottom-left to avoid overlapping the controls) */}
      {plotNumber && (
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg z-10">
          <h3 className="font-semibold text-gray-800">
            {area}
          </h3>
          <p className="text-sm text-gray-600">
            Selected Plot: {plotNumber}
          </p>
        </div>
      )}

      {/* Logo */}
      <div className="absolute bottom-4 right-4 bg-transparent rounded-lg p-3 z-10">
        <Image src="/images/Logo/Ck/ReLogo.png" alt="Real Exchange" width={100} height={100} className="w-auto h-auto" />
      </div>
    </div>
  );
}
