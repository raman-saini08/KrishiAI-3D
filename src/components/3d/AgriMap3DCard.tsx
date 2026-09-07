import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Navigation,
  Sparkles,
  Building2,
  Store,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { LocationState } from '../../types';

interface AgriMap3DCardProps {
  location: LocationState;
  onOpenFullMap?: () => void;
}

export const AgriMap3DCard: React.FC<AgriMap3DCardProps> = ({ location, onOpenFullMap }) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'mandis' | 'buyers' | 'drones'>('all');

  const nodes = [
    { id: 1, name: `${location.district} APMC Yard`, type: 'mandi', x: 48, y: 44, ping: true },
    { id: 2, name: 'FreshAgro Aggregator', type: 'buyer', x: 62, y: 36, ping: false },
    { id: 3, name: 'Kisan Cluster Plot 4', type: 'farm', x: 34, y: 56, ping: false },
    { id: 4, name: 'Drone Delivery Hub-2', type: 'drone', x: 74, y: 65, ping: true },
    { id: 5, name: 'Cold Storage Facility', type: 'buyer', x: 26, y: 30, ping: false },
  ];

  return (
    <div className="relative rounded-3xl glass-card border border-[#b7efc5]/30 p-5 sm:p-6 bg-gradient-to-br from-[#102419]/95 via-[#0a150e]/95 to-[#040a06]/95 shadow-2xl flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#414844]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#0a1f16] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shadow-lg">
              <Compass className="w-5 h-5 text-[#b7efc5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#b7efc5] uppercase tracking-wider">
                  SPATIAL GIS • PAN-INDIA
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                Interactive Agri-Grid Map
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#102217] px-2.5 py-1 rounded-xl border border-[#b7efc5]/30 text-xs font-mono text-[#b7efc5]">
            <span className="w-2 h-2 rounded-full bg-[#b7efc5] animate-ping" />
            <span>RADAR LIVE</span>
          </div>
        </div>

        {/* Map Filter Pills */}
        <div className="grid grid-cols-4 gap-1 my-3 bg-[#0d1c14] p-1 rounded-2xl border border-[#414844]/50">
          {[
            { id: 'all', label: 'All Nodes' },
            { id: 'mandis', label: 'Mandis' },
            { id: 'buyers', label: 'Buyers' },
            { id: 'drones', label: 'Drones' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLayer(tab.id as any)}
              className={`py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeLayer === tab.id
                  ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 shadow-md font-bold'
                  : 'text-[#86af99] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Map Holographic Radar Stage */}
        <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden border border-[#b7efc5]/20 bg-[#051009] p-4 flex flex-col justify-between">
          {/* Cyber Topographic Map Texture */}
          <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

          {/* Radar Sweep Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-[#b7efc5]/20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#b7efc5]/10 pointer-events-none" />

          {/* Connected Drone Flight Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 120 100 Q 180 60 240 120 T 320 90"
              fill="none"
              stroke="#52b788"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          </svg>

          {/* Interactive Map Pin Nodes */}
          {nodes.map((n) => {
            const isVisible =
              activeLayer === 'all' ||
              (activeLayer === 'mandis' && n.type === 'mandi') ||
              (activeLayer === 'buyers' && n.type === 'buyer') ||
              (activeLayer === 'drones' && n.type === 'drone');

            if (!isVisible) return null;

            return (
              <div
                key={n.id}
                style={{ top: `${n.y}%`, left: `${n.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/node cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  {n.ping && (
                    <span className="absolute w-6 h-6 rounded-full bg-[#b7efc5]/40 animate-ping" />
                  )}
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shadow-lg transition-transform group-hover/node:scale-125 ${
                      n.type === 'mandi'
                        ? 'bg-[#1b4332] border-[#b7efc5] text-[#b7efc5]'
                        : n.type === 'buyer'
                        ? 'bg-[#0369a1] border-[#38bdf8] text-[#38bdf8]'
                        : n.type === 'drone'
                        ? 'bg-[#c2410c] border-[#fb923c] text-white'
                        : 'bg-[#40916c] border-white text-white'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover/node:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-lg bg-black/90 border border-[#b7efc5]/40 text-[10px] font-bold text-white whitespace-nowrap shadow-xl pointer-events-none">
                  {n.name}
                </div>
              </div>
            );
          })}

          {/* Corner Status Pill */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-[#95d4b3] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <span>Center: {location.district}, {location.state}</span>
            <span className="font-bold text-[#b7efc5]">5 Active Nodes in 25km</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4">
        <button
          onClick={onOpenFullMap}
          className="w-full py-2.5 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Open Full Interactive Agri-Map</span>
        </button>
      </div>
    </div>
  );
};
