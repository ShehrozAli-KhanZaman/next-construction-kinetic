'use client';

import { useEffect } from 'react';
import SecureDropdowns from './components/SecureDropdowns';
import SecureMapViewer from './components/SecureMapViewer';
import { useCascadingDropdowns } from './hooks/useCascadingDropdowns';
import Image from 'next/image';
import { SquareArrowUpRight } from 'lucide-react';

export default function SecureMapAdminPage() {
  const {
    city,
    area,
    sector,
    plotNumber,
    selectedPlot,
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

  const directionCoords = getPlotCoordinates() || getSectorCoordinates() || getAreaCoordinates();

  const openDirections = () => {
    if (!directionCoords || directionCoords.length !== 2) return;
    const [lat, lng] = directionCoords;
    const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const url = isIOS
      ? `maps://?daddr=${lat},${lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

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

      {/* Bottom info popup */}
      {(plotNumber) && (
        <div className="absolute inset-x-4 bottom-24 z-20 flex justify-center">
          <div className="w-full max-w-xl rounded-xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-900">
                {area ? `${area} - ${city}` : city}
              </h3>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <span className="font-medium text-gray-900">Plot No:</span>{' '}
                <span>{plotNumber || '-'}</span>
              </div>
              <div className="text-right">
                <span className="font-medium text-gray-900">Sector:</span>{' '}
                <span>{sector || '-'}</span>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div>
                <span className="font-medium text-gray-900">Size:</span>{' '}
                <span>{selectedPlot?.size || 'N/A'}</span>
              </div>
              <div className="text-right">
                <span className="font-medium text-gray-900">Feature:</span>{' '}
                <span>{selectedPlot?.feature || 'N/A'}</span>
              </div>
            </div>

            <div className="mt-2 flex justify-center ">
              <button
                type="button"
                onClick={openDirections}
                disabled={!directionCoords}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 gap-1"
              >
                Direction <SquareArrowUpRight className="h-4 w-4 text-white-500 inline-block mr-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logo */}
      <div className="absolute bottom-4 right-4 bg-transparent rounded-lg p-3 z-10">
        <Image src="/images/Logo/Ck/ReLogo.png" alt="Real Exchange" width={100} height={100} className="w-auto h-auto" />
      </div>
    </div>
  );
}
