import React, { useState } from 'react';
import {
  Sun,
  CloudRain,
  Cloud,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { LocationState } from '../../types';

interface Weather3DCardProps {
  location: LocationState;
  onAskAi?: (prompt: string) => void;
}

export const Weather3DCard: React.FC<Weather3DCardProps> = ({ location, onAskAi }) => {
  const [weatherCondition, setWeatherCondition] = useState<'sunny' | 'rain' | 'cloudy' | 'frost'>('rain');

  const conditions = {
    sunny: {
      label: 'Sunny & Clear',
      temp: '32°C',
      feelsLike: '35°C',
      humidity: '48%',
      windSpeed: '12 km/h NW',
      rainfall: '0%',
      uvIndex: '8.4 (High)',
      advisory: 'Irrigate crops during early morning or late evening to prevent evaporation.',
      bgGradient: 'from-[#2e1d08]/90 via-[#18231c]/95 to-[#0b1710]/95',
      accentColor: '#f59e0b',
    },
    rain: {
      label: 'Monsoon Showers',
      temp: '26°C',
      feelsLike: '28°C',
      humidity: '86%',
      windSpeed: '18 km/h SW',
      rainfall: '85% (32mm)',
      uvIndex: '3.2 (Low)',
      advisory: 'Rainfall expected within 12h. Postpone foliar spraying & ensure drainage.',
      bgGradient: 'from-[#082032]/90 via-[#0d231a]/95 to-[#05110b]/95',
      accentColor: '#38bdf8',
    },
    cloudy: {
      label: 'Overcast & Humid',
      temp: '28°C',
      feelsLike: '30°C',
      humidity: '72%',
      windSpeed: '14 km/h S',
      rainfall: '25% (4mm)',
      uvIndex: '5.1 (Moderate)',
      advisory: 'High humidity increases fungal pathogen risk. Monitor lower foliage.',
      bgGradient: 'from-[#17252a]/90 via-[#11241b]/95 to-[#08120c]/95',
      accentColor: '#94a3b8',
    },
    frost: {
      label: 'Cold Wave & Frost Alert',
      temp: '8°C',
      feelsLike: '6°C',
      humidity: '65%',
      windSpeed: '8 km/h N',
      rainfall: '5%',
      uvIndex: '2.0 (Low)',
      advisory: 'Frost alert! Cover sensitive nursery beds with agro-net or mulch.',
      bgGradient: 'from-[#1e1b4b]/90 via-[#0e241c]/95 to-[#06120c]/95',
      accentColor: '#a78bfa',
    },
  };

  const active = conditions[weatherCondition];

  return (
    <div
      className={`relative rounded-3xl glass-card border border-[#b7efc5]/30 p-5 sm:p-6 bg-gradient-to-br ${active.bgGradient} shadow-2xl flex flex-col justify-between group hover:border-[#b7efc5]/60 transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,67,50,0.5)]`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#414844]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#0a1f16] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shadow-lg">
              <CloudRain className="w-5 h-5 text-[#b7efc5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#b7efc5] uppercase tracking-wider">
                  FEATURE 02 • MICRO-CLIMATE
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                Smart Weather Advisory
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#86af99] font-mono block">LOCATION NODE</span>
            <span className="text-xs font-bold text-white">
              {location.district}, {location.state}
            </span>
          </div>
        </div>

        {/* Dynamic Condition Switcher Pills */}
        <div className="grid grid-cols-4 gap-1 my-3 bg-[#0c1811] p-1 rounded-2xl border border-[#414844]/50">
          {[
            { id: 'sunny', label: 'Sunny', icon: Sun },
            { id: 'rain', label: 'Rain', icon: CloudRain },
            { id: 'cloudy', label: 'Cloudy', icon: Cloud },
            { id: 'frost', label: 'Frost', icon: Wind },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = weatherCondition === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setWeatherCondition(item.id as any)}
                className={`py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 shadow-md font-bold'
                    : 'text-[#86af99] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Animated Weather Stage Display */}
        <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden border border-[#b7efc5]/20 bg-[#06120b]/70 p-4 flex flex-col justify-between">
          {/* Weather Simulation Effects in Canvas/CSS */}
          {weatherCondition === 'sunny' && (
            <div className="absolute top-2 right-4 w-28 h-28 pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#fef08a] shadow-[0_0_50px_rgba(245,158,11,0.8)] animate-pulse" />
              <div className="absolute inset-0 w-28 h-28 border border-[#f59e0b]/40 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
            </div>
          )}

          {weatherCondition === 'rain' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-4 -right-4 w-32 h-20 bg-[#38bdf8]/15 rounded-full blur-xl" />
              {/* Rain Streaks */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.18)_1px,transparent_1px)] bg-[size:16px_36px] animate-pulse" />
            </div>
          )}

          {weatherCondition === 'frost' && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-6 -right-6 w-36 h-28 bg-[#a78bfa]/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 border-t-2 border-[#a78bfa]/30" />
            </div>
          )}

          {/* Temperature & Main Stat */}
          <div className="relative z-10">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-['Montserrat']">
                {active.temp}
              </span>
              <span className="text-sm font-semibold text-[#95d4b3]">
                Feels {active.feelsLike}
              </span>
            </div>
            <div className="text-xs font-bold text-[#b7efc5] mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#b7efc5] animate-ping" />
              <span>{active.label}</span>
            </div>
          </div>

          {/* Microclimate 3D Data Pills */}
          <div className="grid grid-cols-3 gap-2 relative z-10">
            <div className="bg-[#102217]/85 backdrop-blur-md p-2 rounded-xl border border-white/10 text-center">
              <div className="text-[10px] text-[#86af99] flex items-center justify-center gap-1">
                <Droplets className="w-3 h-3 text-[#38bdf8]" /> Humidity
              </div>
              <div className="text-xs font-bold text-white mt-0.5">{active.humidity}</div>
            </div>

            <div className="bg-[#102217]/85 backdrop-blur-md p-2 rounded-xl border border-white/10 text-center">
              <div className="text-[10px] text-[#86af99] flex items-center justify-center gap-1">
                <Wind className="w-3 h-3 text-[#b7efc5]" /> Wind
              </div>
              <div className="text-xs font-bold text-white mt-0.5">{active.windSpeed}</div>
            </div>

            <div className="bg-[#102217]/85 backdrop-blur-md p-2 rounded-xl border border-white/10 text-center">
              <div className="text-[10px] text-[#86af99] flex items-center justify-center gap-1">
                <CloudRain className="w-3 h-3 text-[#38bdf8]" /> Rainfall
              </div>
              <div className="text-xs font-bold text-white mt-0.5">{active.rainfall}</div>
            </div>
          </div>
        </div>

        {/* AI Kisan Advisory Note */}
        <div className="bg-[#0e1e15] rounded-2xl p-3 border border-[#b7efc5]/20 mt-3 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#b7efc5] shrink-0 mt-0.5" />
          <p className="text-xs text-[#d8f3dc] leading-relaxed">
            <strong className="text-[#b7efc5]">Smart Action:</strong> {active.advisory}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <button
          onClick={() =>
            onAskAi?.(`What crops and irrigation schedule do you recommend based on today's ${active.label} in ${location.district}?`)
          }
          className="w-full py-2.5 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Get 7-Day Precision Forecast</span>
        </button>
      </div>
    </div>
  );
};
