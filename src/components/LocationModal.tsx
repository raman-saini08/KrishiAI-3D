import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Crosshair,
  Search,
  Check,
  X,
  Compass,
  AlertCircle,
  Building,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { INDIA_STATES_DATA } from '../data/indiaLocations';
import { DistrictInfo, LocationState, StateInfo } from '../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationState;
  onLocationSelect: (location: LocationState) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onLocationSelect,
}) => {
  const [selectedStateName, setSelectedStateName] = useState<string>(
    currentLocation.state || 'Uttarakhand',
  );
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>(
    currentLocation.district || 'Dehradun',
  );
  const [selectedCityVillage, setSelectedCityVillage] = useState<string>(
    currentLocation.cityVillage || 'Niranjanpur',
  );
  const [pincodeInput, setPincodeInput] = useState<string>(
    currentLocation.pincode || '248001',
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [detectionError, setDetectionError] = useState<string | null>(null);
  const [detectionSuccess, setDetectionSuccess] = useState<string | null>(null);

  // Selected State object
  const selectedState = useMemo<StateInfo | undefined>(() => {
    return INDIA_STATES_DATA.find((s) => s.name === selectedStateName) || INDIA_STATES_DATA[0];
  }, [selectedStateName]);

  // Selected District object
  const selectedDistrict = useMemo<DistrictInfo | undefined>(() => {
    return (
      selectedState?.districts.find((d) => d.name === selectedDistrictName) ||
      selectedState?.districts[0]
    );
  }, [selectedState, selectedDistrictName]);

  // Quick Preset Locations for immediate demonstration
  const presetLocations: LocationState[] = [
    {
      state: 'Uttarakhand',
      district: 'Dehradun',
      cityVillage: 'Niranjanpur',
      pincode: '248001',
      lat: 30.3165,
      lng: 78.0322,
      formattedAddress: 'Niranjanpur, Dehradun, Uttarakhand - 248001',
    },
    {
      state: 'Uttarakhand',
      district: 'Haridwar',
      cityVillage: 'Jwalapur',
      pincode: '249407',
      lat: 29.9457,
      lng: 78.1642,
      formattedAddress: 'Jwalapur, Haridwar, Uttarakhand - 249407',
    },
    {
      state: 'Maharashtra',
      district: 'Nashik',
      cityVillage: 'Lasalgaon',
      pincode: '422306',
      lat: 19.9975,
      lng: 73.7898,
      formattedAddress: 'Lasalgaon, Nashik, Maharashtra - 422306',
    },
    {
      state: 'Punjab',
      district: 'Ludhiana',
      cityVillage: 'Khanna',
      pincode: '141401',
      lat: 30.901,
      lng: 75.8573,
      formattedAddress: 'Khanna, Ludhiana, Punjab - 141401',
    },
    {
      state: 'Uttar Pradesh',
      district: 'Agra',
      cityVillage: 'Khandauli',
      pincode: '283126',
      lat: 27.1767,
      lng: 78.0081,
      formattedAddress: 'Khandauli, Agra, Uttar Pradesh - 283126',
    },
    {
      state: 'Himachal Pradesh',
      district: 'Shimla',
      cityVillage: 'Theog',
      pincode: '171201',
      lat: 31.1048,
      lng: 77.1734,
      formattedAddress: 'Theog, Shimla, Himachal Pradesh - 171201',
    },
    {
      state: 'Andhra Pradesh',
      district: 'Guntur',
      cityVillage: 'Tenali',
      pincode: '522201',
      lat: 16.3067,
      lng: 80.4365,
      formattedAddress: 'Tenali, Guntur, Andhra Pradesh - 522201',
    },
  ];

  // Geolocation detector handler
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setDetectionError(null);
    setDetectionSuccess(null);

    if (!navigator.geolocation) {
      setDetectionError('Geolocation is not supported by your browser. Please select manually.');
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Find closest district from our India database using distance calculation
        let closestDistance = Infinity;
        let bestMatch = {
          state: INDIA_STATES_DATA[0].name,
          district: INDIA_STATES_DATA[0].districts[0].name,
          cityVillage: INDIA_STATES_DATA[0].districts[0].citiesVillages[0].name,
          pincode: INDIA_STATES_DATA[0].districts[0].citiesVillages[0].pincode,
          lat: latitude,
          lng: longitude,
        };

        INDIA_STATES_DATA.forEach((s) => {
          s.districts.forEach((d) => {
            const dist = Math.sqrt(
              Math.pow(d.lat - latitude, 2) + Math.pow(d.lng - longitude, 2),
            );
            if (dist < closestDistance) {
              closestDistance = dist;
              bestMatch = {
                state: s.name,
                district: d.name,
                cityVillage: d.citiesVillages[0]?.name || d.headquarters,
                pincode: d.citiesVillages[0]?.pincode || '248001',
                lat: d.lat,
                lng: d.lng,
              };
            }
          });
        });

        setSelectedStateName(bestMatch.state);
        setSelectedDistrictName(bestMatch.district);
        setSelectedCityVillage(bestMatch.cityVillage);
        setPincodeInput(bestMatch.pincode);
        setDetectionSuccess(`Detected location: ${bestMatch.district}, ${bestMatch.state}`);
        setIsDetectingLocation(false);
      },
      (error) => {
        let msg = 'Unable to retrieve location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please choose your Indian State & District below.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location position unavailable. Please choose your State & District manually.';
        }
        setDetectionError(msg);
        setIsDetectingLocation(false);
      },
      { timeout: 10000, enableHighAccuracy: false },
    );
  };

  // State selection change
  const handleStateChange = (stateName: string) => {
    setSelectedStateName(stateName);
    const s = INDIA_STATES_DATA.find((item) => item.name === stateName);
    if (s && s.districts.length > 0) {
      const firstDistrict = s.districts[0];
      setSelectedDistrictName(firstDistrict.name);
      setSelectedCityVillage(firstDistrict.citiesVillages[0]?.name || firstDistrict.headquarters);
      setPincodeInput(firstDistrict.citiesVillages[0]?.pincode || '');
    }
  };

  // District selection change
  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrictName(districtName);
    const d = selectedState?.districts.find((item) => item.name === districtName);
    if (d && d.citiesVillages.length > 0) {
      setSelectedCityVillage(d.citiesVillages[0].name);
      setPincodeInput(d.citiesVillages[0].pincode);
    }
  };

  // Confirm and save location
  const handleSaveLocation = () => {
    const matchedCity = selectedDistrict?.citiesVillages.find(
      (c) => c.name.toLowerCase() === selectedCityVillage.toLowerCase(),
    );

    const lat = matchedCity?.lat || selectedDistrict?.lat || 30.3165;
    const lng = matchedCity?.lng || selectedDistrict?.lng || 78.0322;

    const newLoc: LocationState = {
      state: selectedStateName,
      district: selectedDistrictName,
      cityVillage: selectedCityVillage || selectedDistrictName,
      pincode: pincodeInput || matchedCity?.pincode || '248001',
      lat,
      lng,
      formattedAddress: `${selectedCityVillage || selectedDistrictName}, ${selectedDistrictName}, ${selectedStateName} - ${pincodeInput}`,
    };

    onLocationSelect(newLoc);
    onClose();
  };

  // Filtered list of states for search
  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return INDIA_STATES_DATA;
    const q = searchQuery.toLowerCase();
    return INDIA_STATES_DATA.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.districts.some((d) => d.name.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      id="location-intelligence-modal"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl glass-modal border border-[#b7efc5]/25 shadow-2xl overflow-hidden text-[#dfe4e0]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#414844]/50 bg-[#141a17]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1b4332] text-[#b7efc5] flex items-center justify-center border border-[#b7efc5]/30">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                Select Your Location
              </h3>
              <p className="text-xs text-[#95d4b3]">
                India-Wide Agro Hierarchy (State → District → Village/PIN)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8b938d] hover:text-white hover:bg-[#262b29] transition-colors"
            id="close-location-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 no-scrollbar">
          {/* 1. Detect My Location Button */}
          <div className="bg-gradient-to-r from-[#1b4332]/60 to-[#0e3727]/60 border border-[#b7efc5]/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b7efc5] text-[#0a0f0d] flex items-center justify-center font-bold shadow-md animate-pulse">
                <Crosshair className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Use My Current Location</h4>
                <p className="text-xs text-[#a5d0b9]">
                  Auto-detect nearest Indian District & APMC Mandi via GPS
                </p>
              </div>
            </div>
            <button
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#b7efc5] hover:bg-[#a5d0b9] text-[#0a0f0d] font-semibold text-xs transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
              id="detect-gps-location-btn"
            >
              {isDetectingLocation ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[#0a0f0d] border-t-transparent rounded-full animate-spin" />
                  Detecting...
                </>
              ) : (
                <>
                  <Crosshair className="w-3.5 h-3.5" />
                  Detect My Location
                </>
              )}
            </button>
          </div>

          {detectionError && (
            <div className="p-3 rounded-lg bg-[#93000a]/20 border border-[#ffb4ab]/30 text-xs text-[#ffdad6] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#ffb4ab] shrink-0" />
              <span>{detectionError}</span>
            </div>
          )}

          {detectionSuccess && (
            <div className="p-3 rounded-lg bg-[#12533a]/30 border border-[#b7efc5]/40 text-xs text-[#b7efc5] flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{detectionSuccess}</span>
            </div>
          )}

          {/* 2. Preset Quick Switch Regions (Demonstration) */}
          <div>
            <label className="block text-xs font-semibold text-[#86af99] uppercase tracking-wider mb-2">
              Quick Switch Regions (Judges Demo)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {presetLocations.map((preset) => {
                const isSelected =
                  preset.district === selectedDistrictName && preset.state === selectedStateName;
                return (
                  <button
                    key={`${preset.district}-${preset.state}`}
                    onClick={() => {
                      setSelectedStateName(preset.state);
                      setSelectedDistrictName(preset.district);
                      setSelectedCityVillage(preset.cityVillage);
                      setPincodeInput(preset.pincode);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-[#1b4332] border-[#b7efc5] text-white shadow-md'
                        : 'bg-[#1c211e]/70 border-[#414844]/50 hover:border-[#95d4b3]/60 text-[#dfe4e0]'
                    }`}
                  >
                    <div className="font-semibold truncate text-white">{preset.district}</div>
                    <div className="text-[10px] text-[#95d4b3] truncate">{preset.state}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Searchable Dropdowns for State -> District -> Village/City */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#86af99] uppercase tracking-wider">
                Manual Selection (All Indian States & UTs)
              </label>
            </div>

            {/* State Selector */}
            <div>
              <label className="block text-xs text-[#c1c8c2] mb-1">Select State / UT</label>
              <select
                value={selectedStateName}
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#b7efc5] transition-colors"
                id="state-select-dropdown"
              >
                {INDIA_STATES_DATA.map((state) => (
                  <option key={state.code} value={state.name} className="bg-[#141a17]">
                    {state.name} ({state.type}) - {state.region} India
                  </option>
                ))}
              </select>
            </div>

            {/* District Selector */}
            <div>
              <label className="block text-xs text-[#c1c8c2] mb-1">
                Select District in {selectedStateName}
              </label>
              <select
                value={selectedDistrictName}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#b7efc5] transition-colors"
                id="district-select-dropdown"
              >
                {selectedState?.districts.map((d) => (
                  <option key={d.name} value={d.name} className="bg-[#141a17]">
                    {d.name} ({d.climateZone})
                  </option>
                ))}
              </select>
            </div>

            {/* City / Village & PIN Code Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#c1c8c2] mb-1">City / Village / Tehsil</label>
                <select
                  value={selectedCityVillage}
                  onChange={(e) => {
                    setSelectedCityVillage(e.target.value);
                    const city = selectedDistrict?.citiesVillages.find(
                      (c) => c.name === e.target.value,
                    );
                    if (city) setPincodeInput(city.pincode);
                  }}
                  className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#b7efc5] transition-colors"
                  id="village-select-dropdown"
                >
                  {selectedDistrict?.citiesVillages.map((c) => (
                    <option key={c.name} value={c.name} className="bg-[#141a17]">
                      {c.name} (PIN: {c.pincode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#c1c8c2] mb-1">Postal PIN Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value)}
                  placeholder="e.g. 248001"
                  className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-[#717973] focus:outline-none focus:border-[#b7efc5] transition-colors"
                  id="pincode-input-field"
                />
              </div>
            </div>

            {/* Location preview info pill */}
            {selectedDistrict && (
              <div className="p-3.5 rounded-xl bg-[#1c211e] border border-[#95d4b3]/15 text-xs space-y-1 text-[#c1c8c2]">
                <div className="flex items-center gap-1.5 text-[#b7efc5] font-semibold">
                  <Building className="w-3.5 h-3.5" />
                  <span>Agro-Climatic Intelligence:</span>
                </div>
                <div>
                  <strong className="text-white">Major Crops:</strong>{' '}
                  {selectedDistrict.majorCrops.join(', ')}
                </div>
                <div>
                  <strong className="text-white">Nearby Mandis:</strong>{' '}
                  {selectedDistrict.mandis.join(' • ')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#414844]/50 bg-[#141a17]/90 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#414844] hover:bg-[#262b29] text-xs font-medium text-[#c1c8c2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveLocation}
            className="px-6 py-2.5 rounded-xl bg-[#b7efc5] hover:bg-[#a5d0b9] text-[#0a0f0d] text-xs font-bold transition-all shadow-md hover:scale-[1.02] active:scale-95 flex items-center gap-1.5"
            id="apply-location-btn"
          >
            Apply Location <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
