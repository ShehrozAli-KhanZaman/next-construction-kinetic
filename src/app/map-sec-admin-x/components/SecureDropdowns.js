'use client';

import { DROPDOWN_CONFIG, STYLE_CONFIG } from '../config/dropdownConfig';

export default function SecureDropdowns({
  city,
  area,
  sector,
  plotNumber,
  cities,
  areas,
  sectors,
  plots,
  onCityChange,
  onAreaChange,
  onSectorChange,
  onPlotChange
}) {
  return (
    <div className={`rounded-lg border border-gray-200 p-3 sm:p-4`} style={{ backgroundColor: 'rgba(252, 221, 221, 0.94)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
      <h3 className="text-sm sm:text-lg font-normal sm:font-semibold text-black mb-2 sm:mb-4 text-center sm:text-left">Search Properties</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-4">
        {/* City Dropdown */}
        <div>
          <select
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full px-1.5 py-1 sm:px-3 sm:py-2 border-0 rounded-sm text-xs sm:text-base text-black bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="" className="text-black">City</option>
            {cities.map(c => (
              <option key={c} value={c} className="text-black">{c}</option>
            ))}
          </select>
        </div>

        {/* Area Dropdown */}
        <div>
          <select
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            disabled={!city}
            className="w-full px-1.5 py-1 sm:px-3 sm:py-2 border-0 rounded-sm text-xs sm:text-base text-black bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="" className="text-black">Area</option>
            {areas.map(a => (
              <option key={a} value={a} className="text-black">{a}</option>
            ))}
          </select>
        </div>

        {/* Sector Dropdown */}
        <div>
          <select
            value={sector}
            onChange={(e) => onSectorChange(e.target.value)}
            disabled={!area}
            className="w-full px-1.5 py-1 sm:px-3 sm:py-2 border-0 rounded-sm text-xs sm:text-base text-black bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="" className="text-black">Sector</option>
            {sectors.map(s => (
              <option key={s} value={s} className="text-black">{s}</option>
            ))}
          </select>
        </div>

        {/* Plot Number Dropdown */}
        <div>
          <select
            value={plotNumber}
            onChange={(e) => onPlotChange(e.target.value)}
            disabled={!sector}
            className="w-full px-1.5 py-1 sm:px-3 sm:py-2 border-0 rounded-sm text-xs sm:text-base text-black bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="" className="text-black">Plot</option>
            {plots.map(p => (
              <option key={p} value={p} className="text-black">{p}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
