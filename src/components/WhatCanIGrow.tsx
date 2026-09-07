import React, { useState, useMemo } from 'react';
import {
  Sprout,
  MapPin,
  Sparkles,
  Droplets,
  Calendar,
  Layers,
  TrendingUp,
  DollarSign,
  Info,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { getCropRecommendations } from '../data/indiaLocations';
import { CropSuitabilityRecommendation, LocationState } from '../types';

interface WhatCanIGrowProps {
  currentLocation: LocationState;
  onOpenLocationModal: () => void;
  onAskAiForCrop?: (cropName: string) => void;
}

export const WhatCanIGrow: React.FC<WhatCanIGrowProps> = ({
  currentLocation,
  onOpenLocationModal,
  onAskAiForCrop,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<'Kharif' | 'Rabi' | 'Zaid'>('Kharif');
  const [landAreaAcres, setLandAreaAcres] = useState<number>(2.5);
  const [soilType, setSoilType] = useState<string>('Alluvial Loam');
  const [waterAvailability, setWaterAvailability] = useState<'High' | 'Medium' | 'Low'>('Medium');

  // Compute recommendations grounded in active State & District
  const recommendations: CropSuitabilityRecommendation[] = useMemo(() => {
    return getCropRecommendations(
      currentLocation.state,
      currentLocation.district,
      selectedSeason,
      soilType,
    );
  }, [currentLocation.state, currentLocation.district, selectedSeason, soilType]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-card p-5 sm:p-6 rounded-2xl border border-[#b7efc5]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1b4332] text-[#b7efc5] flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
              What Can I Grow? — AI Crop Planner
            </h1>
          </div>
          <p className="text-xs text-[#95d4b3] mt-1">
            Agro-climatic suitability engine grounded for <strong className="text-white">{currentLocation.district}, {currentLocation.state}</strong>
          </p>
        </div>

        <button
          onClick={onOpenLocationModal}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1c211e] hover:bg-[#262b29] border border-[#b7efc5]/30 text-xs text-white self-start md:self-auto"
        >
          <MapPin className="w-3.5 h-3.5 text-[#b7efc5]" />
          <span>Change Soil/District ({currentLocation.district})</span>
        </button>
      </div>

      {/* Input Parameters Form */}
      <div className="glass-card rounded-2xl p-5 border border-[#95d4b3]/15">
        <h3 className="text-xs font-semibold text-[#86af99] uppercase tracking-wider mb-3">
          Field & Climatic Parameters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          {/* Season */}
          <div>
            <label className="block text-[#c1c8c2] mb-1 font-medium">Cropping Season</label>
            <div className="grid grid-cols-3 gap-1 bg-[#181d1a] p-1 rounded-xl border border-[#414844]">
              {(['Kharif', 'Rabi', 'Zaid'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSeason(s)}
                  className={`py-1.5 font-semibold rounded-lg transition-all ${
                    selectedSeason === s
                      ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 shadow-sm'
                      : 'text-[#8b938d] hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Land Area */}
          <div>
            <label className="block text-[#c1c8c2] mb-1 font-medium">Cultivable Land (Acres)</label>
            <input
              type="number"
              min={0.5}
              step={0.5}
              value={landAreaAcres}
              onChange={(e) => setLandAreaAcres(Number(e.target.value) || 1)}
              className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
            />
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-[#c1c8c2] mb-1 font-medium">Predominant Soil Type</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
            >
              <option value="Alluvial Loam">Alluvial Loam (Gangetic & Tarai)</option>
              <option value="Black Cotton Soil">Black Cotton Soil (Regur)</option>
              <option value="Red Sandy Loam">Red Sandy Loam</option>
              <option value="Mountain Forest Soil">Mountain Forest Soil</option>
              <option value="Laterite Soil">Laterite Soil</option>
            </select>
          </div>

          {/* Water Availability */}
          <div>
            <label className="block text-[#c1c8c2] mb-1 font-medium">Water / Irrigation</label>
            <select
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(e.target.value as any)}
              className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
            >
              <option value="High">Perennial Canal / Tube-well (High)</option>
              <option value="Medium">Seasonal Borewell (Medium)</option>
              <option value="Low">Rainfed / Dryland (Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white font-['Montserrat'] flex items-center gap-2">
          <span>High-Suitability Crops for {currentLocation.district}, {currentLocation.state}</span>
          <span className="text-xs text-[#b7efc5] font-normal">({recommendations.length} Recommended)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.crop}
              className="glass-card rounded-2xl p-5 border border-[#95d4b3]/15 hover:border-[#b7efc5]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Crop Name & Suitability Score */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#414844]/40">
                  <div>
                    <h4 className="text-base font-bold text-white">{rec.crop}</h4>
                    <span className="text-xs text-[#95d4b3] font-medium">
                      Season: {rec.season} • Duration: {rec.durationDays}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold text-[#86af99] uppercase">Suitability</div>
                    <div className="text-lg font-bold text-[#b7efc5] font-['Montserrat']">
                      {rec.suitabilityScore}%
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#181d1a] border border-[#414844]/30">
                    <span className="text-[#86af99] block text-[10px] uppercase font-semibold">
                      Est. Yield / Acre
                    </span>
                    <span className="font-bold text-white">{rec.expectedYieldPerAcre}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#181d1a] border border-[#414844]/30">
                    <span className="text-[#86af99] block text-[10px] uppercase font-semibold">
                      Mandi Price Range
                    </span>
                    <span className="font-bold text-[#b7efc5]">{rec.estimatedPriceRange}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#181d1a] border border-[#414844]/30">
                    <span className="text-[#86af99] block text-[10px] uppercase font-semibold">
                      Est. Profit for {landAreaAcres} Acres
                    </span>
                    <span className="font-bold text-[#b7efc5]">
                      ₹{(rec.estimatedProfitPerAcre * landAreaAcres).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#181d1a] border border-[#414844]/30">
                    <span className="text-[#86af99] block text-[10px] uppercase font-semibold">
                      Local Demand Status
                    </span>
                    <span className="font-bold text-white">{rec.localDemandStatus}</span>
                  </div>
                </div>

                {/* Key Agronomy Advisory */}
                <p className="text-xs text-[#c1c8c2] bg-[#141a17] p-3 rounded-xl border border-[#95d4b3]/15">
                  <strong className="text-[#b7efc5]">Expert Advisory:</strong> {rec.keyAdvisory}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#414844]/30 flex justify-end">
                <button
                  onClick={() =>
                    onAskAiForCrop?.(
                      `Provide a complete cultivation guide, seed varieties, and fertilizer schedule for ${rec.crop} in ${currentLocation.district}, ${currentLocation.state}.`,
                    )
                  }
                  className="text-xs font-semibold text-[#b7efc5] hover:text-white flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Get AI Cultivation Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
