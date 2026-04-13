import { useState, useCallback } from 'react';
import { PAKISTAN_DATA } from '../../map/data/mapData';

const normalizePhaseArea = (areaObject) => {
  if (!areaObject?.phase_area) return [];
  const phaseArea = areaObject.phase_area;
  if (Array.isArray(phaseArea) && phaseArea.length === 1 && Array.isArray(phaseArea[0]?.phase_area)) {
    return phaseArea[0].phase_area;
  }
  return Array.isArray(phaseArea) ? phaseArea : [];
};

const getSectorObjects = (areaObject) => normalizePhaseArea(areaObject);

const getPlotList = (sectorObject) => {
  if (!sectorObject) return [];
  if (Array.isArray(sectorObject.Plots)) return sectorObject.Plots.map((p) => String(p?.plot_number ?? p));
  if (Array.isArray(sectorObject.plots)) return sectorObject.plots.map((p) => String(p?.plot_number ?? p));
  return [];
};

const findSectorObject = (areaObject, sectorName) => {
  const sectorObjects = getSectorObjects(areaObject);
  return sectorObjects.find((s) => String(s?.sector) === String(sectorName));
};

const findPlotObject = (sectorObject, plotValue) => {
  if (!sectorObject) return null;
  const plots = Array.isArray(sectorObject.Plots) ? sectorObject.Plots : Array.isArray(sectorObject.plots) ? sectorObject.plots : [];
  return plots.find((p) => String(p?.plot_number ?? p) === String(plotValue)) || null;
};

export const useCascadingDropdowns = () => {
  const [city, setCity] = useState('Lahore'); // Default to Lahore
  const [area, setArea] = useState('');
  const [sector, setSector] = useState('');
  const [plotNumber, setPlotNumber] = useState('');

  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [plots, setPlots] = useState([]);

  // Initialize with default city
  const initializeCities = useCallback(() => {
    const cityList = PAKISTAN_DATA?.data?.map(c => c.city) || [];
    setCities(cityList);

    if (cityList.length > 0) {
      handleCityChange(cityList[0]);
    }
  }, []);

  const handleCityChange = useCallback((newCity) => {
    setCity(newCity);
    setArea('');
    setSector('');
    setPlotNumber('');

    const cityObject = PAKISTAN_DATA?.data?.find(c => c.city === newCity);
    const areaList = cityObject?.city_area?.map(a => a.phase) || [];
    setAreas(areaList);
    setSectors([]);
    setPlots([]);
  }, []);

  const handleAreaChange = useCallback((newArea) => {
    setArea(newArea);
    setSector('');
    setPlotNumber('');

    const cityObject = PAKISTAN_DATA?.data?.find(c => c.city === city);
    const areaObject = cityObject?.city_area?.find(a => a.phase === newArea);
    const sectorList = getSectorObjects(areaObject).map((s) => String(s?.sector)).filter(Boolean);
    setSectors(sectorList);
    setPlots([]);
  }, [city]);

  const handleSectorChange = useCallback((newSector) => {
    setSector(newSector);
    setPlotNumber('');

    const cityObject = PAKISTAN_DATA?.data?.find(c => c.city === city);
    const areaObject = cityObject?.city_area?.find(a => a.phase === area);
    const sectorObject = findSectorObject(areaObject, newSector);
    setPlots(getPlotList(sectorObject));
  }, [city, area]);

  const handlePlotChange = useCallback((newPlot) => {
    setPlotNumber(newPlot);
  }, []);

  const getAreaCoordinates = useCallback(() => {
    const cityObject = PAKISTAN_DATA?.data?.find(c => c.city === city);
    const areaObject = cityObject?.city_area?.find(a => a.phase === area);
    return areaObject?.coordinates || null;
  }, [city, area]);

  const getSectorCoordinates = useCallback(() => {
    const cityObject = PAKISTAN_DATA?.data?.find(c => c.city === city);
    const areaObject = cityObject?.city_area?.find(a => a.phase === area);
    const sectorObject = findSectorObject(areaObject, sector);
    return sectorObject?.coordinates || null;
  }, [city, area, sector]);

  const selectedPlot = (() => {
    if (!plotNumber) return null;
    const cityObject = PAKISTAN_DATA?.data?.find(c => c.city === city);
    const areaObject = cityObject?.city_area?.find(a => a.phase === area);
    const sectorObject = findSectorObject(areaObject, sector);
    return findPlotObject(sectorObject, plotNumber);
  })();

  const getPlotCoordinates = useCallback(() => {
    if (!plotNumber) return null;
    const cityObject = PAKISTAN_DATA?.data?.find(c => c.city === city);
    const areaObject = cityObject?.city_area?.find(a => a.phase === area);
    const sectorObject = findSectorObject(areaObject, sector);
    const plotObject = findPlotObject(sectorObject, plotNumber);
    return plotObject?.coordinates || null;
  }, [city, area, sector, plotNumber]);

  return {
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
  };
};
