import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Building2,
  Store,
  Compass,
  Layers,
  Crosshair,
  Send,
  Phone,
  Sparkles,
  Info,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';
import {
  ALL_INDIA_BUYERS,
  ALL_INDIA_MANDIS,
  calculateDistanceKm,
} from '../data/indiaLocations';
import { BuyerProfile, LocationState, MarketMandi } from '../types';

interface NearbyAgriMapProps {
  currentLocation: LocationState;
  onOpenLocationModal: () => void;
  onSelectBuyerForOffer: (buyer: any) => void;
}

export const NearbyAgriMap: React.FC<NearbyAgriMapProps> = ({
  currentLocation,
  onOpenLocationModal,
  onSelectBuyerForOffer,
}) => {
  const [showBuyers, setShowBuyers] = useState(true);
  const [showMandis, setShowMandis] = useState(true);
  const [showRadiusRings, setShowRadiusRings] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'buyer' | 'mandi' | 'farmer';
    data: any;
  } | null>(null);

  // Compute buyers with relative map coordinates & distance
  const mappedBuyers = useMemo(() => {
    return ALL_INDIA_BUYERS.map((b) => {
      const distance = calculateDistanceKm(currentLocation.lat, currentLocation.lng, b.lat, b.lng);
      // Map lat/lng offset to 0-100% SVG coordinates relative to farmer
      const deltaLng = (b.lng - currentLocation.lng) * 8; // scale factor
      const deltaLat = (currentLocation.lat - b.lat) * 8; // inverted for SVG Y
      const x = Math.max(10, Math.min(90, 50 + deltaLng));
      const y = Math.max(10, Math.min(90, 50 + deltaLat));
      return { ...b, distanceKm: distance, mapX: x, mapY: y };
    });
  }, [currentLocation]);

  // Compute mandis with relative map coordinates & distance
  const mappedMandis = useMemo(() => {
    return ALL_INDIA_MANDIS.map((m) => {
      const distance = calculateDistanceKm(currentLocation.lat, currentLocation.lng, m.lat, m.lng);
      const deltaLng = (m.lng - currentLocation.lng) * 8;
      const deltaLat = (currentLocation.lat - m.lat) * 8;
      const x = Math.max(10, Math.min(90, 50 + deltaLng));
      const y = Math.max(10, Math.min(90, 50 + deltaLat));
      return { ...m, distanceKm: distance, mapX: x, mapY: y };
    });
  }, [currentLocation]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-card p-5 rounded-2xl border border-[#b7efc5]/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1b4332] text-[#b7efc5] flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
              Interactive Agriculture Geo-Map
            </h1>
          </div>
          <p className="text-xs text-[#95d4b3] mt-1">
            Real-time visual map centering your farm in <strong className="text-white">{currentLocation.district}, {currentLocation.state}</strong>
          </p>
        </div>

        {/* Location switcher */}
        <button
          onClick={onOpenLocationModal}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1c211e] hover:bg-[#262b29] border border-[#b7efc5]/30 text-xs text-white"
        >
          <MapPin className="w-3.5 h-3.5 text-[#b7efc5]" />
          <span>Change Location Center</span>
        </button>
      </div>

      {/* Map Canvas Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive SVG Radar Map (8 Cols) */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-4 border border-[#95d4b3]/20 relative overflow-hidden bg-[#0c1210] flex flex-col justify-between min-h-[480px]">
          {/* Top Layer Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-20 bg-[#141a17]/90 p-2.5 rounded-xl border border-[#414844]/50 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs text-[#86af99] font-semibold">
              <Layers className="w-3.5 h-3.5 text-[#b7efc5]" />
              <span>Map Layers:</span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setShowBuyers(!showBuyers)}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  showBuyers
                    ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 font-semibold'
                    : 'bg-[#1c211e] text-[#8b938d] border border-[#414844]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#52b788]" />
                Buyers ({mappedBuyers.length})
              </button>

              <button
                onClick={() => setShowMandis(!showMandis)}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  showMandis
                    ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 font-semibold'
                    : 'bg-[#1c211e] text-[#8b938d] border border-[#414844]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#f4a261]" />
                Mandis ({mappedMandis.length})
              </button>

              <button
                onClick={() => setShowRadiusRings(!showRadiusRings)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  showRadiusRings
                    ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 font-semibold'
                    : 'bg-[#1c211e] text-[#8b938d] border border-[#414844]'
                }`}
              >
                Distance Rings
              </button>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-[400px] my-2 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Dark Map Grid Lines */}
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(149, 212, 179, 0.05)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />

              {/* Distance Rings (Centered at Farmer [50, 50]) */}
              {showRadiusRings && (
                <>
                  {/* 10 km ring */}
                  <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(183, 239, 197, 0.25)" strokeWidth="0.5" strokeDasharray="1,1" />
                  <text x="51" y="41" fill="#86af99" fontSize="2.5" opacity="0.8">10 km</text>

                  {/* 25 km ring */}
                  <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(183, 239, 197, 0.2)" strokeWidth="0.5" strokeDasharray="1,1" />
                  <text x="51" y="29" fill="#86af99" fontSize="2.5" opacity="0.8">25 km</text>

                  {/* 50 km ring */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(183, 239, 197, 0.15)" strokeWidth="0.5" strokeDasharray="1,1" />
                  <text x="51" y="16" fill="#86af99" fontSize="2.5" opacity="0.8">50 km</text>
                </>
              )}

              {/* Farmer Center Pin (Active Location) */}
              <g
                className="cursor-pointer"
                onClick={() =>
                  setSelectedEntity({
                    type: 'farmer',
                    data: currentLocation,
                  })
                }
              >
                <circle cx="50" cy="50" r="4.5" fill="#1b4332" stroke="#b7efc5" strokeWidth="1" className="animate-pulse" />
                <circle cx="50" cy="50" r="2" fill="#b7efc5" />
              </g>

              {/* Verified Buyers Markers */}
              {showBuyers &&
                mappedBuyers.map((b) => (
                  <g
                    key={b.id}
                    className="cursor-pointer hover:scale-125 transition-transform"
                    onClick={() =>
                      setSelectedEntity({
                        type: 'buyer',
                        data: b,
                      })
                    }
                  >
                    <circle
                      cx={b.mapX}
                      cy={b.mapY}
                      r="3.5"
                      fill="#0e3727"
                      stroke="#52b788"
                      strokeWidth="1"
                    />
                    <circle cx={b.mapX} cy={b.mapY} r="1.5" fill="#b7efc5" />
                  </g>
                ))}

              {/* Mandi APMC Markers */}
              {showMandis &&
                mappedMandis.map((m) => (
                  <g
                    key={m.id}
                    className="cursor-pointer hover:scale-125 transition-transform"
                    onClick={() =>
                      setSelectedEntity({
                        type: 'mandi',
                        data: m,
                      })
                    }
                  >
                    <polygon
                      points={`${m.mapX},${m.mapY - 3} ${m.mapX + 3},${m.mapY + 3} ${m.mapX - 3},${m.mapY + 3}`}
                      fill="#4a2810"
                      stroke="#f4a261"
                      strokeWidth="1"
                    />
                  </g>
                ))}
            </svg>

            {/* Pulsing Radar Ring around user */}
            <div className="absolute w-24 h-24 rounded-full border border-[#b7efc5]/30 animate-ping pointer-events-none" />
          </div>

          {/* Map Legend Footer */}
          <div className="flex flex-wrap items-center justify-between text-xs text-[#c1c8c2] border-t border-[#414844]/40 pt-2 z-20">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b7efc5] border border-white" />
                <span>Your Farm ({currentLocation.district})</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#52b788]" />
                <span>Verified Buyers</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#f4a261] rotate-45" />
                <span>APMC Mandis</span>
              </span>
            </div>
            <div className="text-[10px] text-[#86af99]">Click any pin for details</div>
          </div>
        </div>

        {/* Right: Selected Entity Inspector / Nearby List (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedEntity ? (
            <div className="glass-card rounded-2xl p-5 border border-[#b7efc5]/30 bg-[#141a17]/95 shadow-xl animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#414844]/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#b7efc5] bg-[#1b4332] px-2 py-0.5 rounded-md border border-[#b7efc5]/25">
                  {selectedEntity.type === 'buyer'
                    ? 'Verified Buyer'
                    : selectedEntity.type === 'mandi'
                    ? 'APMC Mandi Market'
                    : 'Your Current Farm'}
                </span>
                <button
                  onClick={() => setSelectedEntity(null)}
                  className="p-1 text-[#8b938d] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedEntity.type === 'buyer' && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedEntity.data.avatar}
                      alt={selectedEntity.data.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#b7efc5]/30"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        {selectedEntity.data.name}
                      </h4>
                      <p className="text-xs text-[#86af99]">
                        {selectedEntity.data.companyName}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#181d1a] border border-[#414844]/40 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#86af99]">Distance:</span>
                      <strong className="text-[#b7efc5]">
                        {selectedEntity.data.distanceKm} km away
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#86af99]">Looking For:</span>
                      <strong className="text-white">
                        {selectedEntity.data.cropsWanted.join(', ')}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#86af99]">Target Price:</span>
                      <strong className="text-[#b7efc5]">
                        ₹{selectedEntity.data.expectedPricePerKg} / kg
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectBuyerForOffer(selectedEntity.data)}
                    className="w-full py-2.5 rounded-xl bg-[#b7efc5] text-[#0a0f0d] text-xs font-bold hover:bg-[#a5d0b9] transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Harvest Offer
                  </button>
                </div>
              )}

              {selectedEntity.type === 'mandi' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <h4 className="font-bold text-sm text-white">{selectedEntity.data.name}</h4>
                    <p className="text-xs text-[#95d4b3]">
                      {selectedEntity.data.district}, {selectedEntity.data.state} • {selectedEntity.data.distanceKm} km away
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-[#86af99] uppercase">
                      Live Mandi Arrivals
                    </div>
                    {selectedEntity.data.commodities.map((c: any) => (
                      <div
                        key={c.crop}
                        className="p-2 rounded-lg bg-[#181d1a] border border-[#414844]/40 flex justify-between items-center text-xs"
                      >
                        <span className="text-white font-medium">{c.crop}</span>
                        <div className="text-right">
                          <strong className="text-[#b7efc5]">₹{c.modalPrice}/kg</strong>
                          <span className="text-[10px] text-[#86af99] block">
                            Vol: {c.arrivalVolumeTonnes}T
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedEntity.type === 'farmer' && (
                <div className="mt-3 space-y-2 text-xs">
                  <h4 className="font-bold text-white">Your Farm Coordinates</h4>
                  <p className="text-[#95d4b3]">
                    {currentLocation.cityVillage}, {currentLocation.district}, {currentLocation.state}
                  </p>
                  <p className="text-[#86af99]">
                    GPS: {currentLocation.lat.toFixed(4)}° N, {currentLocation.lng.toFixed(4)}° E
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-5 border border-[#95d4b3]/15 space-y-3">
              <h3 className="font-bold text-sm text-white font-['Montserrat']">
                Closest Agri Hubs
              </h3>
              <p className="text-xs text-[#86af99]">
                Click on any item in the list or on the map to inspect live buyer rates and mandi arrivals.
              </p>

              <div className="space-y-2">
                {mappedBuyers.slice(0, 3).map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedEntity({ type: 'buyer', data: b })}
                    className="p-3 rounded-xl bg-[#181d1a] hover:bg-[#262b29] border border-[#414844]/50 cursor-pointer transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{b.name}</div>
                      <div className="text-[10px] text-[#86af99]">{b.district}, {b.state}</div>
                    </div>
                    <span className="text-[#b7efc5] font-bold">{b.distanceKm} km</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
