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
  Calendar,
  MapPin,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { LocationState, AppLanguage, WeatherDataState } from '../types';
import { getTranslation } from '../data/translations';

interface WeatherDashboardViewProps {
  currentLocation: LocationState;
  language: AppLanguage;
  onOpenLocationModal: () => void;
  onAskAi: (prompt: string) => void;
}

export const WeatherDashboardView: React.FC<WeatherDashboardViewProps> = ({
  currentLocation,
  language,
  onOpenLocationModal,
  onAskAi,
}) => {
  const t = (key: string) => getTranslation(key, language);

  const weatherData: WeatherDataState = {
    currentTemp: 28,
    feelsLike: 30,
    condition: 'Rainy',
    humidity: 78,
    windSpeed: '16 km/h SW',
    rainProbability: 80,
    rainfallVolumeMm: 24,
    uvIndex: 4.2,
    soilMoisturePct: 82,
    advisory: `Moderate to heavy rain predicted in ${currentLocation.district} over the next 36 hours. Hold off on nitrogen foliar spraying and ensure open drainage furrows in standing crops.`,
    lastUpdated: 'Updated 10 mins ago via IMD Agri-Met Network',
    forecast: [
      {
        day: 'Today',
        date: 'Aug 22',
        tempMin: 22,
        tempMax: 28,
        condition: 'Rainy',
        rainProb: 80,
        humidity: 78,
        windSpeed: 16,
        advisory: 'Postpone pesticide spraying due to imminent rain wash-off.',
      },
      {
        day: 'Tomorrow',
        date: 'Aug 23',
        tempMin: 21,
        tempMax: 27,
        condition: 'Thunderstorm',
        rainProb: 85,
        humidity: 84,
        windSpeed: 20,
        advisory: 'Check field bunds and drainage outlets to avoid waterlogging.',
      },
      {
        day: 'Monday',
        date: 'Aug 24',
        tempMin: 23,
        tempMax: 30,
        condition: 'Partly Cloudy',
        rainProb: 35,
        humidity: 68,
        windSpeed: 12,
        advisory: 'Favorable window for bio-fertilizer soil incorporation.',
      },
      {
        day: 'Tuesday',
        date: 'Aug 25',
        tempMin: 24,
        tempMax: 32,
        condition: 'Sunny',
        rainProb: 15,
        humidity: 58,
        windSpeed: 10,
        advisory: 'Good sunlight; ideal for weeding and intercultural operations.',
      },
      {
        day: 'Wednesday',
        date: 'Aug 26',
        tempMin: 24,
        tempMax: 33,
        condition: 'Sunny',
        rainProb: 10,
        humidity: 54,
        windSpeed: 11,
        advisory: 'Monitor soil moisture; schedule drip irrigation if dry.',
      },
      {
        day: 'Thursday',
        date: 'Aug 27',
        tempMin: 23,
        tempMax: 31,
        condition: 'Partly Cloudy',
        rainProb: 25,
        humidity: 62,
        windSpeed: 14,
        advisory: 'Optimal weather for harvesting mature vegetable batches.',
      },
      {
        day: 'Friday',
        date: 'Aug 28',
        tempMin: 22,
        tempMax: 29,
        condition: 'Cloudy',
        rainProb: 45,
        humidity: 70,
        windSpeed: 15,
        advisory: 'High humidity may increase fungal spore activity.',
      },
    ],
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#b7efc5]/25 bg-gradient-to-br from-[#12241b]/95 via-[#0b1710]/95 to-[#040c07]/95 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] text-[#b7efc5] text-xs font-bold border border-[#b7efc5]/30">
              <CloudRain className="w-3.5 h-3.5" />
              <span>{t('weather.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Montserrat']">
              Hyper-Local Agri Micro-Climate & Irrigation Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#95d4b3] max-w-2xl">
              {t('weather.subtitle')}
            </p>
          </div>

          <div
            onClick={onOpenLocationModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#14231b] hover:bg-[#1f3125] border border-[#b7efc5]/30 text-xs text-white cursor-pointer transition-all shadow-md self-start md:self-auto group"
          >
            <MapPin className="w-4 h-4 text-[#b7efc5] group-hover:scale-110 transition-transform" />
            <span>
              {currentLocation.district}, {currentLocation.state}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#1b4332] text-[#b7efc5] font-bold">
              Change
            </span>
          </div>
        </div>
      </section>

      {/* 2. LIVE TELEMETRY HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 Cols): Current Temperature & Live Animated Stage */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-[#b7efc5]/25 bg-gradient-to-br from-[#0c2016]/90 via-[#0a1811]/95 to-[#040c07]/95 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-ping" />
                <span className="text-xs font-bold text-[#b7efc5] uppercase font-mono tracking-wider">
                  Live Satellite & Ground Telemetry
                </span>
              </div>
              <span className="text-[10px] text-[#86af99] font-mono">{weatherData.lastUpdated}</span>
            </div>

            {/* Main Temperature Hero */}
            <div className="flex items-center justify-between mt-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight font-['Montserrat']">
                    {weatherData.currentTemp}°C
                  </span>
                  <span className="text-sm font-semibold text-[#95d4b3]">
                    {t('weather.feelsLike')} {weatherData.feelsLike}°C
                  </span>
                </div>
                <div className="text-base font-bold text-[#b7efc5] mt-1 flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-[#38bdf8]" />
                  <span>Monsoon Showers in {currentLocation.district}</span>
                </div>
              </div>

              {/* Weather Graphic Ring */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1b4332] to-[#0d2218] border-2 border-[#b7efc5]/40 flex flex-col items-center justify-center p-2 shadow-2xl">
                <CloudRain className="w-10 h-10 text-[#38bdf8] animate-pulse" />
                <span className="text-[10px] font-mono text-[#b7efc5] font-bold mt-1">{weatherData.rainProbability}% Rain</span>
              </div>
            </div>

            {/* 4 Microclimate Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="bg-[#14231b] p-3 rounded-2xl border border-[#b7efc5]/20 text-center">
                <div className="text-[10px] text-[#86af99] flex items-center justify-center gap-1 font-mono">
                  <Droplets className="w-3 h-3 text-[#38bdf8]" /> {t('weather.humidity')}
                </div>
                <strong className="text-sm text-white font-mono block mt-1">{weatherData.humidity}%</strong>
              </div>

              <div className="bg-[#14231b] p-3 rounded-2xl border border-[#b7efc5]/20 text-center">
                <div className="text-[10px] text-[#86af99] flex items-center justify-center gap-1 font-mono">
                  <Wind className="w-3 h-3 text-[#b7efc5]" /> {t('weather.wind')}
                </div>
                <strong className="text-sm text-white font-mono block mt-1">{weatherData.windSpeed}</strong>
              </div>

              <div className="bg-[#14231b] p-3 rounded-2xl border border-[#b7efc5]/20 text-center">
                <div className="text-[10px] text-[#86af99] flex items-center justify-center gap-1 font-mono">
                  <Sun className="w-3 h-3 text-[#ffe066]" /> {t('weather.uv')}
                </div>
                <strong className="text-sm text-white font-mono block mt-1">{weatherData.uvIndex} (Safe)</strong>
              </div>

              <div className="bg-[#14231b] p-3 rounded-2xl border border-[#b7efc5]/20 text-center">
                <div className="text-[10px] text-[#86af99] flex items-center justify-center gap-1 font-mono">
                  <Droplets className="w-3 h-3 text-[#74c69d]" /> Soil Moisture
                </div>
                <strong className="text-sm text-[#b7efc5] font-mono block mt-1">{weatherData.soilMoisturePct}% (Optimal)</strong>
              </div>
            </div>
          </div>

          {/* AI Precision Advisory Note */}
          <div className="p-4 rounded-2xl bg-[#102419] border border-[#b7efc5]/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#b7efc5] shrink-0 mt-0.5" />
            <div className="text-xs text-[#d8f3dc] leading-relaxed">
              <strong className="text-[#b7efc5] block mb-0.5">{t('weather.advisory')}:</strong>
              {weatherData.advisory}
            </div>
          </div>
        </div>

        {/* Right (5 Cols): Interactive Action with Krishi AI */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-7 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-[#414844]/40 pb-2.5">
              <MessageSquare className="w-4 h-4 text-[#b7efc5]" />
              <span>Ask Krishi AI About Weather</span>
            </h3>

            <p className="text-xs text-[#c1c8c2] leading-relaxed">
              Connect weather forecasts directly to your crop irrigation schedule, foliar pesticide timing, and post-harvest drying safety.
            </p>

            {/* Quick Weather Query Chips */}
            <div className="space-y-2 pt-2">
              {[
                '💧 Should I water my crops with this rain forecast?',
                '🌿 When is the safest dry day for pesticide spraying?',
                '🚜 Can I harvest my vegetables before the heavy rain?',
                '⚠️ What measures to take for high humidity mold risk?',
              ].map((query, i) => (
                <button
                  key={i}
                  onClick={() => onAskAi(query.replace(/^[^\w]+/, ''))}
                  className="w-full text-left p-3 rounded-2xl bg-[#14231b] hover:bg-[#1b3024] border border-[#414844]/50 hover:border-[#b7efc5]/40 text-xs text-[#d8f3dc] font-medium transition-all cursor-pointer truncate"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              onAskAi(
                `Based on today's ${weatherData.currentTemp}°C weather and ${weatherData.rainProbability}% rain probability in ${currentLocation.district}, what agronomic actions do you recommend?`
              )
            }
            className="w-full py-3.5 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Farm Weather Action Plan</span>
          </button>
        </div>
      </section>

      {/* 3. 7-DAY PRECISION MICRO-CLIMATE FORECAST CARDS */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3">
          <h3 className="font-bold text-lg text-white font-['Montserrat'] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#b7efc5]" />
            <span>{t('weather.forecast')}</span>
          </h3>
          <span className="text-xs text-[#95d4b3] font-mono">7-Day Outlook</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          {weatherData.forecast.map((f, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                idx === 0
                  ? 'bg-[#1b4332]/60 border-[#b7efc5] text-white shadow-md'
                  : 'bg-[#14231b]/80 border-[#b7efc5]/15 text-[#dfe4e0] hover:border-[#b7efc5]/40'
              }`}
            >
              <div className="text-center space-y-1">
                <span className="text-xs font-bold block">{f.day}</span>
                <span className="text-[10px] text-[#86af99] font-mono block">{f.date}</span>

                <div className="py-2 flex justify-center">
                  {f.condition === 'Sunny' ? (
                    <Sun className="w-8 h-8 text-[#ffe066]" />
                  ) : f.condition === 'Rainy' || f.condition === 'Thunderstorm' ? (
                    <CloudRain className="w-8 h-8 text-[#38bdf8]" />
                  ) : (
                    <Cloud className="w-8 h-8 text-[#94a3b8]" />
                  )}
                </div>

                <div className="font-bold text-sm text-white font-mono">
                  {f.tempMax}° / <span className="text-[#86af99]">{f.tempMin}°</span>
                </div>
                <div className="text-[10px] text-[#38bdf8] font-mono font-semibold">
                  {f.rainProb}% Rain
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-[#414844]/30 text-[10px] text-[#95d4b3] leading-tight text-center line-clamp-2">
                {f.advisory}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
