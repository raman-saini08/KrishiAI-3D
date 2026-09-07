import React, { useState } from 'react';
import {
  Sprout,
  Activity,
  Droplets,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
} from 'lucide-react';
import { LocationState } from '../../types';

interface SoilHealth3DCardProps {
  location: LocationState;
  onAskAi?: (prompt: string) => void;
}

export const SoilHealth3DCard: React.FC<SoilHealth3DCardProps> = ({ location, onAskAi }) => {
  const [soilLayer, setSoilLayer] = useState<'topsoil' | 'rootzone' | 'subsoil'>('topsoil');

  const layers = {
    topsoil: {
      depth: '0 – 15 cm',
      ph: 6.8,
      moisture: 72,
      nitrogen: 88,
      phosphorus: 45,
      potassium: 190,
      carbon: 0.86,
      texture: 'Loamy Alluvial Soil',
      microbes: 'High Microbial Biomass (1.4g/kg)',
    },
    rootzone: {
      depth: '15 – 45 cm',
      ph: 6.6,
      moisture: 84,
      nitrogen: 74,
      phosphorus: 38,
      potassium: 165,
      carbon: 0.62,
      texture: 'Clay-Loam Moisture Retentive',
      microbes: 'Active Mycorrhizal Network',
    },
    subsoil: {
      depth: '45 – 90 cm',
      ph: 7.1,
      moisture: 91,
      nitrogen: 52,
      phosphorus: 29,
      potassium: 140,
      carbon: 0.35,
      texture: 'Dense Silty Substratum',
      microbes: 'Mineral Reservoir Zone',
    },
  };

  const active = layers[soilLayer];

  // Helper for Circular SVG 3D Progress Ring
  const CircularGauge = ({
    value,
    max,
    label,
    unit,
    color,
    icon: Icon,
  }: {
    value: number;
    max: number;
    label: string;
    unit: string;
    color: string;
    icon: any;
  }) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(1, Math.max(0, value / max));
    const strokeDashoffset = circumference - progress * circumference;

    return (
      <div className="flex flex-col items-center bg-[#102217]/80 rounded-2xl p-2.5 border border-[#b7efc5]/20">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 70 70">
            <circle
              cx="35"
              cy="35"
              r={radius}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="35"
              cy="35"
              r={radius}
              stroke={color}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-white font-mono leading-none">{value}</span>
            <span className="text-[9px] text-[#86af99] leading-none mt-0.5">{unit}</span>
          </div>
        </div>
        <span className="text-[10px] font-bold text-[#c1c8c2] mt-1 text-center">{label}</span>
      </div>
    );
  };

  return (
    <div className="relative rounded-3xl glass-card border border-[#b7efc5]/30 p-5 sm:p-6 bg-gradient-to-br from-[#1b2b1a]/95 via-[#0d1c12]/95 to-[#050e08]/95 shadow-2xl flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#414844]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#0a1f16] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shadow-lg">
              <FlaskConical className="w-5 h-5 text-[#b7efc5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#b7efc5] uppercase tracking-wider">
                  3D SOIL SCANNER • NPK TELEMETRY
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                Subsurface Soil Health
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#102217] px-2.5 py-1 rounded-xl border border-[#b7efc5]/30 text-xs font-mono text-[#b7efc5]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>pH {active.ph} Sweet</span>
          </div>
        </div>

        {/* Soil Layer Depth Switcher Tabs */}
        <div className="grid grid-cols-3 gap-1.5 my-3 bg-[#0d1c14] p-1 rounded-2xl border border-[#414844]/50">
          {[
            { id: 'topsoil', label: 'Topsoil (0-15cm)' },
            { id: 'rootzone', label: 'Rootzone (15-45cm)' },
            { id: 'subsoil', label: 'Subsoil (45-90cm)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSoilLayer(tab.id as any)}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer truncate ${
                soilLayer === tab.id
                  ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 shadow-md font-bold'
                  : 'text-[#86af99] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Animated Circular NPK & Moisture Gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-2">
          <CircularGauge
            value={active.nitrogen}
            max={100}
            label="Nitrogen (N)"
            unit="kg/ha"
            color="#52b788"
            icon={Sprout}
          />
          <CircularGauge
            value={active.phosphorus}
            max={60}
            label="Phosphorus (P)"
            unit="kg/ha"
            color="#ffe066"
            icon={Zap}
          />
          <CircularGauge
            value={active.potassium}
            max={250}
            label="Potassium (K)"
            unit="kg/ha"
            color="#38bdf8"
            icon={Activity}
          />
          <CircularGauge
            value={active.moisture}
            max={100}
            label="Moisture"
            unit="%"
            color="#74c69d"
            icon={Droplets}
          />
        </div>

        {/* Soil Diagnostics & Fertility Report */}
        <div className="bg-[#0e1e15] rounded-2xl p-3.5 border border-[#b7efc5]/20 space-y-2 mt-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#86af99]">Soil Classification:</span>
            <strong className="text-white font-medium">{active.texture}</strong>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#414844]/30">
            <span className="text-[#86af99]">Organic Carbon (OC):</span>
            <span className="text-[#b7efc5] font-bold font-mono">{active.carbon}% (High Fertility)</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#414844]/30">
            <span className="text-[#86af99]">Biological Index:</span>
            <span className="text-[#95d4b3] font-medium">{active.microbes}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4">
        <button
          onClick={() =>
            onAskAi?.(`Generate an optimal bio-fertilizer recipe for my ${active.texture} with N:${active.nitrogen}, P:${active.phosphorus}, K:${active.potassium} in ${location.district}.`)
          }
          className="w-full py-2.5 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Custom Bio-Fertilizer Schedule</span>
        </button>
      </div>
    </div>
  );
};
