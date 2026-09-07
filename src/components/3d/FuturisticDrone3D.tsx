import React, { useState, useEffect } from 'react';
import {
  Navigation,
  BatteryCharging,
  Wifi,
  Radio,
  Eye,
  Crosshair,
  Sparkles,
  Layers,
  Thermometer,
  Compass,
} from 'lucide-react';

interface FuturisticDrone3DProps {
  onScanField?: () => void;
}

export const FuturisticDrone3D: React.FC<FuturisticDrone3DProps> = ({ onScanField }) => {
  const [telemetryMode, setTelemetryMode] = useState<'multispectral' | 'thermal' | 'lidar'>('multispectral');
  const [altitude, setAltitude] = useState(18.4);
  const [battery, setBattery] = useState(94);
  const [isScanning, setIsScanning] = useState(true);

  // Subtle telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude((prev) => +(18.0 + Math.random() * 0.8).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-3xl glass-card border border-[#b7efc5]/30 p-5 sm:p-6 bg-gradient-to-br from-[#0f2117]/90 via-[#0a150e]/95 to-[#050c08]/95 overflow-hidden shadow-2xl group">
      {/* Background Cyber Glow & Topographic Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#1b4332]/40 rounded-full blur-2xl pointer-events-none" />

      {/* Header with Drone Telemetry Status */}
      <div className="flex items-center justify-between relative z-10 pb-3 border-b border-[#414844]/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#183827] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shadow-inner">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm sm:text-base text-white font-['Montserrat']">
                Agri-Drone AI Patrol
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#1b4332] text-[#b7efc5] text-[10px] font-mono font-bold border border-[#b7efc5]/30">
                UAV-09 LIVE
              </span>
            </div>
            <p className="text-[11px] text-[#95d4b3]">Autonomous NDVI & Canopy Telemetry</p>
          </div>
        </div>

        {/* Live Signal & Battery */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 bg-[#102217] px-2.5 py-1 rounded-xl border border-[#b7efc5]/25 text-[#b7efc5] font-mono text-[11px]">
            <BatteryCharging className="w-3.5 h-3.5 text-[#b7efc5]" />
            <span>{battery}%</span>
          </div>
          <div className="flex items-center gap-1 bg-[#102217] px-2.5 py-1 rounded-xl border border-[#b7efc5]/25 text-[#38bdf8] font-mono text-[11px]">
            <Wifi className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>5G LINK</span>
          </div>
        </div>
      </div>

      {/* 3D Drone Flight & Laser Scanning Stage */}
      <div className="relative my-4 h-48 sm:h-52 w-full rounded-2xl bg-[#08120b]/80 border border-[#b7efc5]/20 overflow-hidden flex items-center justify-center">
        {/* Animated Crop Terrain Surface */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e2518] via-[#09170e] to-transparent opacity-80" />
        
        {/* Topographic Field Scanning Grid */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(to_right,rgba(183,239,197,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(183,239,197,0.08)_1px,transparent_1px)] bg-[size:24px_24px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />

        {/* Downward Laser Scanning Projection Cone */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-40 h-28 pointer-events-none z-10">
          <div
            className={`w-full h-full bg-gradient-to-b ${
              telemetryMode === 'thermal'
                ? 'from-[#f97316]/30 to-transparent'
                : telemetryMode === 'lidar'
                ? 'from-[#38bdf8]/30 to-transparent'
                : 'from-[#52b788]/30 to-transparent'
            } [clip-path:polygon(50%_0%,0%_100%,100%_100%)] animate-pulse`}
          />
          {/* Ground Scanning Target Reticle */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-7 rounded-[50%] border ${
              telemetryMode === 'thermal'
                ? 'border-[#f97316]/70 shadow-[0_0_15px_#f97316]'
                : telemetryMode === 'lidar'
                ? 'border-[#38bdf8]/70 shadow-[0_0_15px_#38bdf8]'
                : 'border-[#b7efc5]/70 shadow-[0_0_15px_#b7efc5]'
            } animate-ping`}
          />
        </div>

        {/* 3D DRONE CRAFT (CSS 3D Vector Assembly) */}
        <div className="relative z-20 animate-float-3d flex flex-col items-center">
          {/* Quad Rotors Container */}
          <div className="relative w-36 h-20 flex items-center justify-center">
            {/* Cross Arms */}
            <div className="absolute w-32 h-2.5 bg-gradient-to-r from-[#1b3d2b] via-[#2d6a4f] to-[#1b3d2b] rounded-full shadow-lg border border-[#b7efc5]/40" />
            <div className="absolute w-2.5 h-16 bg-gradient-to-b from-[#1b3d2b] via-[#2d6a4f] to-[#1b3d2b] rounded-full shadow-lg border border-[#b7efc5]/40" />

            {/* Central Drone Core Capsule */}
            <div className="relative z-30 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1b4332] via-[#0d2218] to-[#040c07] border-2 border-[#b7efc5] shadow-[0_0_20px_rgba(183,239,197,0.4)] flex flex-col items-center justify-center p-1">
              <Crosshair className="w-5 h-5 text-[#b7efc5] animate-spin" style={{ animationDuration: '6s' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping mt-0.5" />
            </div>

            {/* Rotor 1 (Top Left) */}
            <div className="absolute top-0 left-0 w-8 h-8 rounded-full border-2 border-[#b7efc5]/50 flex items-center justify-center animate-spin" style={{ animationDuration: '0.12s' }}>
              <div className="w-7 h-1 bg-[#b7efc5] rounded-full shadow-[0_0_6px_#b7efc5]" />
            </div>

            {/* Rotor 2 (Top Right) */}
            <div className="absolute top-0 right-0 w-8 h-8 rounded-full border-2 border-[#b7efc5]/50 flex items-center justify-center animate-spin" style={{ animationDuration: '0.12s' }}>
              <div className="w-7 h-1 bg-[#b7efc5] rounded-full shadow-[0_0_6px_#b7efc5]" />
            </div>

            {/* Rotor 3 (Bottom Left) */}
            <div className="absolute bottom-0 left-0 w-8 h-8 rounded-full border-2 border-[#b7efc5]/50 flex items-center justify-center animate-spin" style={{ animationDuration: '0.12s' }}>
              <div className="w-7 h-1 bg-[#b7efc5] rounded-full shadow-[0_0_6px_#b7efc5]" />
            </div>

            {/* Rotor 4 (Bottom Right) */}
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full border-2 border-[#b7efc5]/50 flex items-center justify-center animate-spin" style={{ animationDuration: '0.12s' }}>
              <div className="w-7 h-1 bg-[#b7efc5] rounded-full shadow-[0_0_6px_#b7efc5]" />
            </div>
          </div>

          {/* Telemetry Tag below Drone */}
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/70 border border-[#b7efc5]/40 text-[10px] font-mono text-[#b7efc5] tracking-wider shadow-md">
            ALT: {altitude}m • SPEED: 14 km/h
          </div>
        </div>

        {/* HUD Telemetry Corner Overlays */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-[#86af99] space-y-0.5 bg-black/50 p-2 rounded-xl border border-white/10 backdrop-blur-sm">
          <div>GPS: 30.3165° N, 78.0322° E</div>
          <div>SWATH: 4.8 HECTARES</div>
          <div className="text-[#b7efc5]">STATUS: PATROLLING PLOT-3</div>
        </div>

        <div className="absolute top-3 right-3 text-[10px] font-mono text-right text-[#86af99] space-y-0.5 bg-black/50 p-2 rounded-xl border border-white/10 backdrop-blur-sm">
          <div>CANOPY: 96% DENSE</div>
          <div>SOIL TEMP: 24.6°C</div>
          <div className="text-[#38bdf8]">AI CONF: 99.2%</div>
        </div>
      </div>

      {/* Sensor Mode Switchers & Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Sensor Mode Pills */}
        <div className="flex items-center gap-1 bg-[#102217] p-1 rounded-2xl border border-[#414844]/60 w-full sm:w-auto justify-center">
          <button
            onClick={() => setTelemetryMode('multispectral')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              telemetryMode === 'multispectral'
                ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 shadow-sm'
                : 'text-[#86af99] hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Multispectral</span>
          </button>

          <button
            onClick={() => setTelemetryMode('thermal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              telemetryMode === 'thermal'
                ? 'bg-[#c2410c] text-white border border-[#fb923c]/40 shadow-sm'
                : 'text-[#86af99] hover:text-white'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Thermal NDVI</span>
          </button>

          <button
            onClick={() => setTelemetryMode('lidar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              telemetryMode === 'lidar'
                ? 'bg-[#0369a1] text-white border border-[#38bdf8]/40 shadow-sm'
                : 'text-[#86af99] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>LiDAR Height</span>
          </button>
        </div>

        {/* Action Trigger */}
        <button
          onClick={onScanField}
          className="w-full sm:w-auto px-4 py-2 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sync Drone Survey</span>
        </button>
      </div>
    </div>
  );
};
