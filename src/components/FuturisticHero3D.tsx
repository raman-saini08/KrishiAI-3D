import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Camera,
  MessageSquare,
  Compass,
  Store,
  Sprout,
  ShieldCheck,
  TrendingUp,
  CloudSun,
  Activity,
  Cpu,
  Rotate3d,
  Layers,
  MapPin,
  ChevronRight,
  Zap,
  Wheat,
  Building2,
  Award,
} from 'lucide-react';
import { LocationState, AuthUser, RoleType } from '../types';
import { ThreePlantCanvas } from './3d/ThreePlantCanvas';
import { FuturisticDrone3D } from './3d/FuturisticDrone3D';
import { AiLeafScan3DCard } from './3d/AiLeafScan3DCard';
import { Weather3DCard } from './3d/Weather3DCard';
import { Market3DCard } from './3d/Market3DCard';
import { FarmerAdvisory3DCard } from './3d/FarmerAdvisory3DCard';
import { SoilHealth3DCard } from './3d/SoilHealth3DCard';
import { AgriMap3DCard } from './3d/AgriMap3DCard';
import { Kisan3DCard } from './Kisan3DCard';

interface FuturisticHero3DProps {
  currentLocation: LocationState;
  onOpenLocationModal: () => void;
  onOpenCropAnalyzer: () => void;
  onOpenAiAssistant: (initialPrompt?: string) => void;
  onOpenMap: () => void;
  onOpenWhatCanIGrow: () => void;
  onOpenMarketplace: () => void;
  currentUser?: AuthUser | null;
  onOpenAuthModal?: () => void;
  onExploreDashboard?: () => void;
}

export const FuturisticHero3D: React.FC<FuturisticHero3DProps> = ({
  currentLocation,
  onOpenLocationModal,
  onOpenCropAnalyzer,
  onOpenAiAssistant,
  onOpenMap,
  onOpenWhatCanIGrow,
  onOpenMarketplace,
  currentUser,
  onOpenAuthModal,
  onExploreDashboard,
}) => {
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'plant' | 'drone' | 'soil' | 'map'>('plant');

  const stats = [
    { label: 'Pan-India APMC Mandis', value: '1,420+', icon: Store, trend: '+12 Syncing' },
    { label: 'AI Diagnostic Precision', value: '99.4%', icon: Cpu, trend: 'ICAR Grounded' },
    { label: 'Crop Waste Averted', value: '₹2.4 Cr+', icon: Sprout, trend: 'Across 28 States' },
    { label: 'Verified Agro-Buyers', value: '3,850+', icon: Building2, trend: 'Instant Settlement' },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 animate-in fade-in duration-500">
      {/* ========================================================================= */}
      {/* 1. GRAND 3D FLOATING GLASS DASHBOARD HERO PANEL */}
      {/* ========================================================================= */}
      <section className="relative rounded-[2.5rem] p-6 sm:p-10 md:p-12 glass-card border border-[#b7efc5]/35 bg-gradient-to-br from-[#14261c]/95 via-[#0e1d15]/95 to-[#06120b]/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(183,239,197,0.18)] overflow-hidden">
        {/* Subtle Cyber-Agri Background Matrix & Radial Glow */}
        <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1b4332]/50 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#e9c46a]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Badges & Live Status */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102419]/90 border border-[#b7efc5]/40 text-xs font-semibold text-[#b7efc5] shadow-lg backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b7efc5] animate-ping" />
            <span className="font-bold tracking-wide uppercase text-[11px]">
              Next-Gen AgriTech Platform • India 2026
            </span>
          </div>

          <div
            onClick={onOpenLocationModal}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16231c]/90 hover:bg-[#1f3026] border border-[#b7efc5]/30 hover:border-[#b7efc5] text-xs text-[#dfe4e0] cursor-pointer transition-all shadow-md group"
            title="Switch your district / state location"
          >
            <MapPin className="w-3.5 h-3.5 text-[#b7efc5] group-hover:scale-110 transition-transform" />
            <span>
              Farm Location:{' '}
              <strong className="text-white">
                {currentLocation.district}, {currentLocation.state}
              </strong>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1b4332] text-[#b7efc5] font-bold">
              Switch
            </span>
          </div>
        </div>

        {/* Hero Content Grid: Left Main Pitch, Right 3D Interactive Plant / Card */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (7 Cols): Headings & Glowing CTA */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-['Montserrat']">
              AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b7efc5] via-[#74c69d] to-[#ffe066]">Smart Agriculture</span> for a Better Tomorrow
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#c5decb] font-medium max-w-2xl leading-relaxed">
              Empowering farmers with AI crop diagnosis, smart advisory, weather intelligence and real-time market insights.
            </p>

            {/* Glowing 3D CTA Button & Primary Quick Actions */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onExploreDashboard || onOpenCropAnalyzer}
                className="px-6 sm:px-8 py-4 rounded-2xl btn-3d-primary font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(183,239,197,0.4)] cursor-pointer group transform-gpu hover:scale-[1.02]"
                id="hero-explore-farming-cta"
              >
                <span>Explore Smart Farming</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={onOpenCropAnalyzer}
                className="px-5 py-4 rounded-2xl btn-3d-dark text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:border-[#b7efc5]/50"
                id="hero-scan-leaf-btn"
              >
                <Camera className="w-4 h-4 text-[#b7efc5]" />
                <span>Instant Leaf Scan</span>
              </button>

              <button
                onClick={() => onOpenAiAssistant('What is the best price strategy for my standing crop today?')}
                className="px-4 py-4 rounded-2xl bg-[#102217] hover:bg-[#183122] border border-[#b7efc5]/30 text-[#b7efc5] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                id="hero-ask-ai-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>Talk to Kisan AI</span>
              </button>
            </div>

            {/* Holographic Feature Ticker Ribbons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-[#95d4b3]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#b7efc5]" />
                <span>Government Mandi Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-[#b7efc5]" />
                <span>Real-time Gemini Vision</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wheat className="w-4 h-4 text-[#ffe066]" />
                <span>Zero Middlemen Commission</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Interactive 3D Plant Model / 3D Smart Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <ThreePlantCanvas onScanLeaf={onOpenCropAnalyzer} />
          </div>
        </div>

        {/* 4 BENTO QUICK METRICS RIBBON */}
        <div className="relative z-10 mt-10 pt-8 border-t border-[#414844]/40 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#0e1d15]/80 border border-[#b7efc5]/20 backdrop-blur-md flex flex-col justify-between hover:border-[#b7efc5]/40 transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#86af99]">
                  <span className="font-semibold uppercase tracking-wider">{st.label}</span>
                  <Icon className="w-4 h-4 text-[#b7efc5] group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-2">
                  <div className="text-2xl sm:text-3xl font-black text-white font-['Montserrat']">
                    {st.value}
                  </div>
                  <div className="text-[10px] text-[#b7efc5] font-mono mt-0.5">{st.trend}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FOUR PREMIUM FLOATING 3D FEATURE CARDS */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332]/50 border border-[#b7efc5]/30 text-xs font-semibold text-[#b7efc5]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered Innovation Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-['Montserrat']">
            Intelligent AgriTech Solutions
          </h2>
          <p className="text-xs sm:text-sm text-[#95d4b3]">
            Interactive 3D capabilities designed to optimize crop yield, eliminate post-harvest wastage, and maximize farmer profitability.
          </p>
        </div>

        {/* 4 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: AI Crop Disease Detection */}
          <AiLeafScan3DCard
            onOpenScanner={onOpenCropAnalyzer}
            onAskAi={onOpenAiAssistant}
          />

          {/* Card 2: Smart Weather Advisory */}
          <Weather3DCard
            location={currentLocation}
            onAskAi={onOpenAiAssistant}
          />

          {/* Card 3: Live Market Intelligence */}
          <Market3DCard
            location={currentLocation}
            onOpenMarketplace={onOpenMarketplace}
            onAskAi={onOpenAiAssistant}
          />

          {/* Card 4: Personalized Farmer Advisory */}
          <FarmerAdvisory3DCard
            location={currentLocation}
            currentUser={currentUser}
            onOpenAiAssistant={onOpenAiAssistant}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. 3D DIGITAL TWIN & SPATIAL COMMAND CENTER */}
      {/* ========================================================================= */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#b7efc5]/30 bg-gradient-to-br from-[#122218]/90 via-[#0a150e]/95 to-[#040c07]/95 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#414844]/40">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#1b4332] text-[#b7efc5] flex items-center justify-center shadow-md">
                <Rotate3d className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
                Spatial Farm Simulator & Digital Twin
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#95d4b3] mt-1">
              Real-time hardware & soil telemetry synchronized with autonomous UAV drone patrol
            </p>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-[#0f2117] p-1.5 rounded-2xl border border-[#b7efc5]/30 self-start md:self-auto">
            {[
              { id: 'plant', label: '3D Crop Twin' },
              { id: 'drone', label: 'AI Drone Patrol' },
              { id: 'soil', label: 'Soil Telemetry' },
              { id: 'map', label: 'Agri-Grid Radar' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveInteractiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeInteractiveTab === tab.id
                    ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 font-bold shadow-md'
                    : 'text-[#86af99] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Display Area based on selected interactive tab */}
        <div className="mt-6">
          {activeInteractiveTab === 'plant' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <ThreePlantCanvas onScanLeaf={onOpenCropAnalyzer} />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#102217] p-5 rounded-2xl border border-[#b7efc5]/25 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#b7efc5]" />
                    <h4 className="font-bold text-white text-sm">3D Botanical Geometry Engine</h4>
                  </div>
                  <p className="text-xs text-[#c5decb] leading-relaxed">
                    Interactive 3D model with real-time chlorophyll SPAD tracking, cellular hydration dynamics, and simulated wind physics. Click and drag anywhere to orbit 360°.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="bg-[#182b20] p-2.5 rounded-xl">
                      <span className="text-[10px] text-[#86af99] block">PHOTOSYNTHESIS</span>
                      <strong className="text-white font-mono text-sm">94.2% Optimal</strong>
                    </div>
                    <div className="bg-[#182b20] p-2.5 rounded-xl">
                      <span className="text-[10px] text-[#86af99] block">STOMATAL RES.</span>
                      <strong className="text-[#b7efc5] font-mono text-sm">Low (Hydrated)</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenCropAnalyzer}
                  className="w-full py-3 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Launch Live Image Analyzer</span>
                </button>
              </div>
            </div>
          )}

          {activeInteractiveTab === 'drone' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <FuturisticDrone3D onScanField={onOpenCropAnalyzer} />
              </div>
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-[#102217] p-5 rounded-2xl border border-[#b7efc5]/25 space-y-3">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#ffe066]" />
                    Autonomous Field Scouting
                  </h4>
                  <p className="text-xs text-[#c5decb] leading-relaxed">
                    Agri-drone equipped with 4K multispectral sensors, LiDAR canopy measurement, and real-time NDVI foliage computation.
                  </p>
                  <div className="p-2.5 rounded-xl bg-[#142b1e] border border-[#b7efc5]/20 text-[11px] text-[#b7efc5]">
                    ✓ Automatic flight path generated for 3.5-acre plot in {currentLocation.district}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeInteractiveTab === 'soil' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <SoilHealth3DCard location={currentLocation} onAskAi={onOpenAiAssistant} />
              </div>
              <div className="lg:col-span-5">
                <Kisan3DCard user={currentUser || null} onOpenAuth={onOpenAuthModal || (() => {})} />
              </div>
            </div>
          )}

          {activeInteractiveTab === 'map' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7">
                <AgriMap3DCard location={currentLocation} onOpenFullMap={onOpenMap} />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#102217] p-5 rounded-2xl border border-[#b7efc5]/25 space-y-3">
                  <h4 className="font-bold text-white text-sm">Pan-India Geographic Coverage</h4>
                  <p className="text-xs text-[#c5decb] leading-relaxed">
                    Integrated GIS network connecting local APMC mandis, food processors, cold chains, and verified wholesale agro-buyers.
                  </p>
                </div>
                <button
                  onClick={onOpenMap}
                  className="w-full py-3 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Navigate Interactive Agri-Map</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
