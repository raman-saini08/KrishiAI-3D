import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Store,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  DollarSign,
  MapPin,
} from 'lucide-react';
import { LocationState } from '../../types';

interface Market3DCardProps {
  location: LocationState;
  onOpenMarketplace?: () => void;
  onAskAi?: (prompt: string) => void;
}

export const Market3DCard: React.FC<Market3DCardProps> = ({
  location,
  onOpenMarketplace,
  onAskAi,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<'Tomato' | 'Basmati' | 'Potato' | 'Wheat'>('Tomato');

  const marketData = {
    Tomato: {
      mandiPrice: '₹34/kg',
      directBuyerPrice: '₹38/kg',
      trend: '+8.4%',
      isPositive: true,
      bars: [22, 26, 25, 29, 31, 34, 38],
      arbitrageExtra: '₹4,000 / ton',
      demandLevel: 'High Demand',
      buyerName: 'FreshBasket Aggregators',
      distance: '14 km away',
    },
    Basmati: {
      mandiPrice: '₹44/kg',
      directBuyerPrice: '₹48/kg',
      trend: '+5.2%',
      isPositive: true,
      bars: [36, 38, 40, 39, 42, 44, 48],
      arbitrageExtra: '₹4,000 / ton',
      demandLevel: 'Export Surplus',
      buyerName: 'Himalayan Organic Mills',
      distance: '22 km away',
    },
    Potato: {
      mandiPrice: '₹22/kg',
      directBuyerPrice: '₹24.5/kg',
      trend: '+3.1%',
      isPositive: true,
      bars: [18, 19, 20, 21, 21, 22, 24.5],
      arbitrageExtra: '₹2,500 / ton',
      demandLevel: 'Steady',
      buyerName: 'AgroPro Cold Chain',
      distance: '9 km away',
    },
    Wheat: {
      mandiPrice: '₹27.5/kg',
      directBuyerPrice: '₹30/kg',
      trend: '+6.0%',
      isPositive: true,
      bars: [22, 23, 24, 25, 26, 27.5, 30],
      arbitrageExtra: '₹2,500 / ton',
      demandLevel: 'MSP High',
      buyerName: 'Bharat Flour Mills',
      distance: '18 km away',
    },
  };

  const active = marketData[selectedCrop];

  return (
    <div className="relative rounded-3xl glass-card border border-[#b7efc5]/30 p-5 sm:p-6 bg-gradient-to-br from-[#1b2b1f]/95 via-[#0f1d14]/95 to-[#06110a]/95 shadow-2xl flex flex-col justify-between group hover:border-[#b7efc5]/60 transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,67,50,0.5)]">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#414844]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#0a1f16] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shadow-lg">
              <TrendingUp className="w-5 h-5 text-[#b7efc5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#b7efc5] uppercase tracking-wider">
                  FEATURE 03 • MANDI ARBITRAGE
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                Live Market Intelligence
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#102217] px-2.5 py-1 rounded-xl border border-[#b7efc5]/30 text-xs font-mono text-[#b7efc5]">
            <span className="w-2 h-2 rounded-full bg-[#b7efc5] animate-ping" />
            <span>APMC SYNC</span>
          </div>
        </div>

        {/* Commodity Selector Chips */}
        <div className="grid grid-cols-4 gap-1 my-3 bg-[#0d1c14] p-1 rounded-2xl border border-[#414844]/50">
          {(['Tomato', 'Basmati', 'Potato', 'Wheat'] as const).map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCrop === crop
                  ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 shadow-md font-bold'
                  : 'text-[#86af99] hover:text-white'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* 3D Floating Market Holographic Chart Stage */}
        <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden border border-[#b7efc5]/20 bg-[#07130b]/80 p-4 flex flex-col justify-between">
          {/* Price Header & Gain */}
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[10px] text-[#86af99] uppercase font-mono">
                Direct Buyer Rate
              </span>
              <div className="text-3xl font-black text-[#b7efc5] font-['Montserrat'] flex items-baseline gap-2">
                {active.directBuyerPrice}
                <span className="text-xs font-bold text-[#b7efc5] bg-[#1b4332] px-2 py-0.5 rounded-md border border-[#b7efc5]/40">
                  {active.trend}
                </span>
              </div>
              <div className="text-[11px] text-[#86af99]">
                APMC Mandi Base: <span className="text-white font-medium">{active.mandiPrice}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-[#b7efc5] uppercase tracking-wider block">
                Profit Arbitrage
              </span>
              <span className="text-sm font-bold text-white font-mono">
                +{active.arbitrageExtra}
              </span>
            </div>
          </div>

          {/* 3D Isometric Bar Chart Columns */}
          <div className="relative z-10 flex items-end justify-between gap-2 h-18 pt-2">
            {active.bars.map((val, idx) => {
              const heightPct = Math.min(100, Math.max(25, (val / 50) * 100));
              const isPeak = idx === active.bars.length - 1;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group/bar">
                  <div className="w-full bg-[#102217] rounded-t-lg relative overflow-hidden flex items-end h-16 border border-[#b7efc5]/20">
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        isPeak
                          ? 'bg-gradient-to-t from-[#40916c] to-[#b7efc5] shadow-[0_0_12px_#b7efc5]'
                          : 'bg-gradient-to-t from-[#1b4332] to-[#52b788]'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-[#86af99]">
                    D{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nearby Buyer Bid Snapshot */}
        <div className="bg-[#0e1e15] rounded-2xl p-3 border border-[#b7efc5]/20 mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#b7efc5] shrink-0" />
            <div>
              <div className="font-bold text-white truncate max-w-[160px]">
                {active.buyerName}
              </div>
              <div className="text-[10px] text-[#86af99] flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#b7efc5]" /> {active.distance}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#1b4332] text-[#b7efc5] font-semibold border border-[#b7efc5]/30">
              Verified Bid
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4">
        <button
          onClick={onOpenMarketplace}
          className="w-full py-2.5 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Store className="w-4 h-4" />
          <span>Explore Live Marketplace & Mandis</span>
        </button>
      </div>
    </div>
  );
};
