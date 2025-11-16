'use client';

import { useState, useEffect } from 'react';
import { PAKISTAN_DATA } from '../data/mapData';

const SearchControls = ({
    city,
    area,
    sector,
    plotNumber,
    setCity,
    setArea,
    setSector,
    setPlotNumber,
    setLoading,
    className = ""
}) => {
    const [selectedCity, setSelectedCity] = useState(city || "Lahore");
    const [selectedArea, setSelectedArea] = useState(area || "");
    const [selectedSector, setSelectedSector] = useState(sector || "");
    const [selectedPlot, setSelectedPlot] = useState(plotNumber || "");

    const [areas, setAreas] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [plots, setPlots] = useState([]);

    // Initialize with default city
    useEffect(() => {
        const defaultCity = PAKISTAN_DATA.data.find(c => c.city === "Lahore");
        if (defaultCity) {
            const nextAreas = defaultCity.city_area.map(a => a.phase);
            setAreas(nextAreas);
            setSelectedCity("Lahore");
        }
    }, []);

    const handleCityChange = (cityValue) => {
        setSelectedCity(cityValue);
        setSelectedArea('');
        setSelectedSector('');
        setSelectedPlot('');

        const city = PAKISTAN_DATA.data.find(c => c.city === cityValue);
        const nextAreas = city ? city.city_area.map(a => a.phase) : [];
        setAreas(nextAreas);
        setSectors([]);
        setPlots([]);

        setCity(cityValue);
        setArea('');
        setSector('');
        setPlotNumber('');
    };

    const handleAreaChange = (areaValue) => {
        setSelectedArea(areaValue);
        setSelectedSector('');
        setSelectedPlot('');

        const city = PAKISTAN_DATA.data.find(c => c.city === selectedCity);
        const area = city?.city_area.find(ar => ar.phase === areaValue);
        const nextSectors = area ? area.phase_area.map(s => s.sector) : [];
        setSectors(nextSectors);
        setPlots([]);

        setArea(areaValue);
        setSector('');
        setPlotNumber('');

        if (setLoading) {
            setLoading(true);
            setTimeout(() => setLoading(false), 300);
        }
    };

    const handleSectorChange = (sectorValue) => {
        setSelectedSector(sectorValue);
        setSelectedPlot('');

        const city = PAKISTAN_DATA.data.find(c => c.city === selectedCity);
        const area = city?.city_area.find(ar => ar.phase === selectedArea);
        const sector = area?.phase_area.find(se => se.sector === sectorValue);
        const nextPlots = sector?.Plots?.map(p => String(p)) || [];
        setPlots(nextPlots);

        setSector(sectorValue);
        setPlotNumber('');
    };

    const handlePlotChange = (plotValue) => {
        setSelectedPlot(plotValue);
        setPlotNumber(plotValue);
    };

    return (
        <div className={`rounded-lg border border-gray-200 p-3 sm:p-4 ${className}`} style={{ backgroundColor: 'rgba(252, 221, 221, 0.94)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}>
            <h3 className="text-sm sm:text-lg font-normal sm:font-semibold text-black mb-2 sm:mb-4 text-center sm:text-left">Search Properties</h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-4">
                {/* City Dropdown */}
                <div>
                    <select
                        value={selectedCity}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full px-1.5 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={true}
                    >
                        <option value="" className="text-black">City</option>
                        {PAKISTAN_DATA.data.map(city => (
                            <option key={city.city} value={city.city} className="text-black">
                                {city.city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Area Dropdown */}
                <div>
                    <select
                        value={selectedArea}
                        onChange={(e) => handleAreaChange(e.target.value)}
                        disabled={!selectedCity}
                        className="w-full px-1.5 py-1 sm:px-3 sm:py-2 border-0 rounded-sm text-xs sm:text-base text-black bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="" className="text-black">Area</option>
                        {areas.map(area => (
                            <option key={area} value={area} className="text-black">
                                {area}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sector Dropdown */}
                <div>
                    <select
                        value={selectedSector}
                        onChange={(e) => handleSectorChange(e.target.value)}
                        disabled={!selectedArea}
                        className="w-full px-1.5 py-1 sm:px-3 sm:py-2 border-0 rounded-sm text-xs sm:text-base text-black bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="" className="text-black">Sector</option>
                        {sectors.map(sector => (
                            <option key={sector} value={sector} className="text-black">
                                {sector}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Plot Dropdown */}
                <div>
                    <select
                        value={selectedPlot}
                        onChange={(e) => handlePlotChange(e.target.value)}
                        disabled={!selectedSector}
                        className="w-full px-1.5 py-1 sm:px-3 sm:py-2 border-0 rounded-sm text-xs sm:text-base text-black bg-white focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="" className="text-black">Plot</option>
                        {plots.map(plot => (
                            <option key={plot} value={plot} className="text-black">
                                {plot}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


        </div>
    );
};

export default SearchControls;
