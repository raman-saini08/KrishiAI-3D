import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Sparkles,
  Camera,
  MessageSquare,
  Map as MapIcon,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Building2,
  Wheat,
  Scale,
  ArrowUpRight,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Info,
  Send,
  Phone,
  Sprout,
  Store,
} from 'lucide-react';
import {
  estimateLocationPrice,
  getNearbyBuyers,
  getNearbyMandis,
} from '../data/indiaLocations';
import {
  BuyerProfile,
  CropListing,
  LocationState,
  MarketMandi,
  PriceEstimateResult,
  QualityGrade,
  AuthUser,
} from '../types';
import { Kisan3DCard } from './Kisan3DCard';

interface FarmerDashboardProps {
  currentLocation: LocationState;
  onOpenLocationModal: () => void;
  onOpenCropAnalyzer: () => void;
  onOpenAiAssistant: (initialPrompt?: string) => void;
  onOpenMap: () => void;
  onOpenWhatCanIGrow: () => void;
  onOpenMarketplace: () => void;
  onSelectBuyerForOffer: (buyer: BuyerProfile) => void;
  currentUser?: AuthUser | null;
  onOpenAuthModal?: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  currentLocation,
  onOpenLocationModal,
  onOpenCropAnalyzer,
  onOpenAiAssistant,
  onOpenMap,
  onOpenWhatCanIGrow,
  onOpenMarketplace,
  onSelectBuyerForOffer,
  currentUser,
  onOpenAuthModal,
}) => {
  // Pricing Estimator State
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomatoes');
  const [selectedGrade, setSelectedGrade] = useState<QualityGrade>('Grade A');
  const [selectedQuantity, setSelectedQuantity] = useState<number>(500);

  // Distance Radius Filter for Buyers
  const [buyerRadiusFilter, setBuyerRadiusFilter] = useState<
    '10' | '25' | '50' | '100' | 'same-district' | 'same-state' | 'all-india'
  >('100');

  // Compute live location-aware price estimate
  const priceEstimate: PriceEstimateResult = useMemo(() => {
    return estimateLocationPrice(
      selectedCrop,
      selectedGrade,
      currentLocation.state,
      currentLocation.district,
      selectedQuantity,
    );
  }, [selectedCrop, selectedGrade, selectedQuantity, currentLocation.state, currentLocation.district]);

  // Compute nearby buyers with dynamic distance
  const nearbyBuyers = useMemo(() => {
    return getNearbyBuyers(currentLocation, buyerRadiusFilter, 'All');
  }, [currentLocation, buyerRadiusFilter]);

  // Compute nearby mandis with dynamic distance
  const nearbyMandis = useMemo(() => {
    return getNearbyMandis(currentLocation);
  }, [currentLocation]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. HERO SECTION: 3D Greetings + Interactive 3D Kisan Smart Card Showcase */}
      <section className="glass-card rounded-3xl p-5 sm:p-7 border border-[#b7efc5]/25 bg-gradient-to-br from-[#18231c]/95 via-[#111915]/95 to-[#0b2419]/60 card-3d-shadow relative overflow-hidden agri-grid-bg">
        {/* Background glow circle */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-[#1b4332]/40 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex-1 space-y-3 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-[#b7efc5] uppercase tracking-wider">
              <span className="animate-wave inline-block text-base">👋</span>
              <span>
                {currentUser
                  ? `Namaste, ${currentUser.name.split(' ')[0]} Ji`
                  : 'Namaste, Kisan Mitra'}
              </span>
              <span className="text-[#86af99]">• Kharif Season 2026</span>
              {currentUser?.isVerified && (
                <span className="px-2 py-0.5 rounded-full bg-[#1b4332] text-[#b7efc5] text-[10px] font-bold border border-[#b7efc5]/30">
                  KYC Verified
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight font-['Montserrat']">
              Pan-India Agri Command
            </h1>

            <p className="text-xs sm:text-sm text-[#95d4b3] max-w-xl">
              AI crop disease diagnosis, real-time APMC Mandi rates, and direct procurement
              matching across India with 3D Spatial Agri-ID.
            </p>

            {/* Prominent Location Display Pill */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div
                onClick={onOpenLocationModal}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141b17]/95 hover:bg-[#1f2924] border border-[#b7efc5]/40 hover:border-[#b7efc5] cursor-pointer transition-all shadow-md group"
                id="dashboard-location-pill"
              >
                <div className="w-6 h-6 rounded-full bg-[#1b4332] text-[#b7efc5] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-left">
                  <span className="text-[#86af99] font-medium mr-1">Farm Location:</span>
                  <strong className="text-white font-semibold">
                    {currentLocation.cityVillage ? `${currentLocation.cityVillage}, ` : ''}
                    {currentLocation.district}, {currentLocation.state}
                  </strong>
                  <span className="text-[#95d4b3] ml-1">({currentLocation.pincode})</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1b4332] text-[#b7efc5] font-semibold border border-[#b7efc5]/30">
                  Switch
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#1b4332]/40 border border-[#95d4b3]/30 text-[11px] text-[#b7efc5] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>AI Mandi Shield Active</span>
              </div>
            </div>

            {/* Quick Primary 3D Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <button
                onClick={onOpenCropAnalyzer}
                className="px-5 py-3 rounded-xl btn-3d-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                id="hero-scan-crop-btn"
              >
                <Camera className="w-4 h-4" />
                <span>Analyze My Crop</span>
              </button>

              <button
                onClick={() => onOpenAiAssistant('What is the current mandi price in my district?')}
                className="px-4 py-3 rounded-xl btn-3d-dark text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                id="hero-ask-ai-btn"
              >
                <Sparkles className="w-4 h-4 text-[#b7efc5]" />
                <span>Ask AI Advisor</span>
              </button>

              <button
                onClick={onOpenMap}
                className="px-4 py-3 rounded-xl btn-3d-dark text-[#dfe4e0] font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                id="hero-map-btn"
              >
                <MapIcon className="w-4 h-4 text-[#95d4b3]" />
                <span>Agri-Map</span>
              </button>
            </div>
          </div>

          {/* Right: Interactive 3D Smart Kisan Card Widget */}
          <div className="w-full lg:w-[360px] shrink-0">
            <Kisan3DCard user={currentUser || null} onOpenAuth={onOpenAuthModal || (() => {})} />
          </div>
        </div>
      </section>

      {/* 2. FOUR BENTO STATS METRICS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Field Health */}
        <div className="glass-card p-4 rounded-2xl border border-[#95d4b3]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#86af99] uppercase tracking-wider">
              Crop Health
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#1b4332]/60 text-[#b7efc5] flex items-center justify-center text-xs font-bold">
              86%
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
              Optimal
            </div>
            <div className="mt-1.5 w-full bg-[#181d1a] h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#40916c] to-[#b7efc5] h-full w-[86%] rounded-full" />
            </div>
            <p className="text-[10px] text-[#95d4b3] mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Low pathogen risk in {currentLocation.district}
            </p>
          </div>
        </div>

        {/* Metric 2: Estimated Crop Value */}
        <div className="glass-card p-4 rounded-2xl border border-[#95d4b3]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#86af99] uppercase tracking-wider">
              Est. Harvest Value
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#1b4332]/60 text-[#b7efc5] flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-white font-['Montserrat'] flex items-baseline gap-1">
              ₹42,500
              <span className="text-xs font-semibold text-[#b7efc5]">+6.4%</span>
            </div>
            {/* SVG Mini Sparkline */}
            <div className="mt-2 h-5 w-full">
              <svg className="w-full h-full text-[#b7efc5]" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path
                  d="M0,16 Q20,12 40,14 T70,6 T100,2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-[10px] text-[#86af99]">Based on 1.2 tonnes standing crop</p>
          </div>
        </div>

        {/* Metric 3: Waste Reduced */}
        <div className="glass-card p-4 rounded-2xl border border-[#95d4b3]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#86af99] uppercase tracking-wider">
              Loss Prevented
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#1b4332]/60 text-[#b7efc5] flex items-center justify-center">
              <Sprout className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
              126 kg
            </div>
            <p className="text-xs text-[#a5d0b9] mt-1">Saved from early blight</p>
            <p className="text-[10px] text-[#86af99] mt-1">AI triage early intervention</p>
          </div>
        </div>

        {/* Metric 4: Nearby Verified Buyers */}
        <div className="glass-card p-4 rounded-2xl border border-[#95d4b3]/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#86af99] uppercase tracking-wider">
              Active Buyers
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#1b4332]/60 text-[#b7efc5] flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
              {nearbyBuyers.length} Verified
            </div>
            <div className="flex items-center -space-x-1.5 mt-2">
              {nearbyBuyers.slice(0, 4).map((b) => (
                <img
                  key={b.id}
                  src={b.avatar}
                  alt={b.name}
                  className="w-5 h-5 rounded-full border border-[#0a0f0d] object-cover"
                />
              ))}
              <span className="text-[10px] text-[#b7efc5] ml-2 font-medium">Seeking Harvest</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION-AWARE AI PRICE ESTIMATOR WIDGET */}
      <section className="glass-card rounded-2xl p-5 sm:p-6 border border-[#b7efc5]/25 bg-[#141a17]/90 shadow-xl" id="location-price-estimator-widget">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#414844]/40">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1b4332] text-[#b7efc5] flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Montserrat']">
                AI Crop Price Estimator
              </h2>
            </div>
            <p className="text-xs text-[#95d4b3] mt-0.5">
              Grounded in <strong className="text-white">{currentLocation.district}, {currentLocation.state}</strong> APMC Mandi benchmarks
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenWhatCanIGrow}
              className="px-3 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#b7efc5] border border-[#b7efc5]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sprout className="w-3.5 h-3.5" />
              What Can I Grow?
            </button>
          </div>
        </div>

        {/* Inputs row: Crop, Quality Grade, Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-medium text-[#c1c8c2] mb-1.5">
              Select Commodity
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-[#1c211e] border border-[#414844] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#b7efc5] transition-colors"
              id="price-crop-select"
            >
              <option value="Tomatoes">Tomatoes (Tamatar)</option>
              <option value="Potatoes">Potatoes (Aloo)</option>
              <option value="Onions">Onions (Pyaz)</option>
              <option value="Basmati Rice">Basmati Rice (Chawal)</option>
              <option value="Wheat">Wheat (Gehu)</option>
              <option value="Apples">Apples (Seb)</option>
              <option value="Garlic">Garlic (Lahsun)</option>
              <option value="Ginger">Ginger (Adrak)</option>
              <option value="Mustard">Mustard (Sarson)</option>
              <option value="Red Chili">Red Chili (Mirchi)</option>
            </select>
          </div>

          {/* Quality Grade */}
          <div>
            <label className="block text-xs font-medium text-[#c1c8c2] mb-1.5">
              Quality Grade (AI Assessed)
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-[#1c211e] p-1 rounded-xl border border-[#414844]">
              {(['Grade A', 'Grade B', 'Grade C'] as QualityGrade[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedGrade === g
                      ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 shadow-sm'
                      : 'text-[#8b938d] hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-xs font-medium text-[#c1c8c2] mb-1.5">
              Available Quantity (kg)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={50}
                step={50}
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value) || 0)}
                className="w-full bg-[#1c211e] border border-[#414844] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#b7efc5] transition-colors"
                id="price-quantity-input"
              />
              <span className="text-xs text-[#86af99] font-semibold">kg</span>
            </div>
          </div>
        </div>

        {/* Pricing Results Display Card */}
        <div className="bg-gradient-to-r from-[#181d1a] via-[#1b4332]/40 to-[#181d1a] rounded-2xl p-4 sm:p-5 border border-[#b7efc5]/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#414844]/50">
            {/* Price Range */}
            <div className="pr-4">
              <span className="text-xs text-[#86af99] uppercase font-semibold tracking-wider">
                Estimated Price Range
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-white mt-1 font-['Montserrat']">
                ₹{priceEstimate.minEstimatedPrice} – ₹{priceEstimate.maxEstimatedPrice}
                <span className="text-sm font-normal text-[#95d4b3]"> / kg</span>
              </div>
              <div className="text-xs text-[#b7efc5] mt-1 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+5.2% 7-day price momentum in {currentLocation.district}</span>
              </div>
            </div>

            {/* Recommended Target Price */}
            <div className="pt-3 md:pt-0 md:px-4">
              <span className="text-xs text-[#86af99] uppercase font-semibold tracking-wider">
                Recommended Selling Target
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-[#b7efc5] mt-1 font-['Montserrat']">
                ₹{priceEstimate.recommendedPrice}
                <span className="text-sm font-normal text-white"> / kg</span>
              </div>
              <div className="text-xs text-[#c1c8c2] mt-1">
                Total Batch Value: <strong className="text-white">₹{(priceEstimate.recommendedPrice * selectedQuantity).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Mandi Benchmark */}
            <div className="pt-3 md:pt-0 md:pl-4">
              <span className="text-xs text-[#86af99] uppercase font-semibold tracking-wider">
                Nearby Mandi Benchmark
              </span>
              <div className="text-lg sm:text-xl font-bold text-white mt-1 font-['Montserrat'] truncate">
                ₹{priceEstimate.mandiBenchmarkPrice} / kg
              </div>
              <div className="text-xs text-[#95d4b3] mt-1 truncate">
                {priceEstimate.nearbyMandiName}
              </div>
            </div>
          </div>

          {/* AI Factors breakdown */}
          <div className="mt-4 pt-3 border-t border-[#414844]/40 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#c1c8c2]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b7efc5]" />
              <span><strong>Quality Factor:</strong> {priceEstimate.factors.qualityImpact}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b7efc5]" />
              <span><strong>Location Demand:</strong> {priceEstimate.factors.locationDemand}</span>
            </div>
          </div>

          {/* Mandatory User-Requested Disclaimer */}
          <div className="mt-3 text-[11px] text-[#95d4b3]/80 italic flex items-center gap-1.5 bg-[#0f1412]/60 px-3 py-1.5 rounded-lg border border-[#95d4b3]/10">
            <Info className="w-3.5 h-3.5 text-[#b7efc5] shrink-0" />
            <span>Price estimate based on crop quality ({selectedGrade}), selected location ({currentLocation.district}, {currentLocation.state}) and market conditions.</span>
          </div>
        </div>
      </section>

      {/* 4. NEARBY BUYERS & NEARBY MANDIS DUAL SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Nearby Verified Buyers */}
        <section className="lg:col-span-2 glass-card rounded-2xl p-5 sm:p-6 border border-[#95d4b3]/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#b7efc5]" />
                <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                  Nearby Verified Buyers
                </h3>
              </div>
              <p className="text-xs text-[#95d4b3]">
                Direct procurement aggregators sorted by distance from {currentLocation.cityVillage || currentLocation.district}
              </p>
            </div>

            <button
              onClick={onOpenMarketplace}
              className="text-xs text-[#b7efc5] hover:underline font-semibold flex items-center gap-1 self-start sm:self-auto"
            >
              View All Marketplace Listings <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Radius Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
            <span className="text-[11px] font-semibold text-[#86af99] mr-1 shrink-0">Radius:</span>
            {[
              { id: '10', label: 'Within 10 km' },
              { id: '25', label: 'Within 25 km' },
              { id: '50', label: 'Within 50 km' },
              { id: '100', label: 'Within 100 km' },
              { id: 'same-district', label: 'Same District' },
              { id: 'same-state', label: 'Same State' },
              { id: 'all-india', label: 'All India' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setBuyerRadiusFilter(f.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  buyerRadiusFilter === f.id
                    ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 font-semibold shadow-sm'
                    : 'bg-[#1c211e] text-[#c1c8c2] border border-[#414844]/50 hover:border-[#95d4b3]/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Buyers Cards Grid */}
          <div className="space-y-3">
            {nearbyBuyers.length === 0 ? (
              <div className="p-8 text-center glass-card rounded-xl border border-dashed border-[#414844]">
                <Building2 className="w-8 h-8 text-[#8b938d] mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">No buyers found in this radius</p>
                <p className="text-xs text-[#86af99] mt-1">Try expanding your search radius to 100 km or All India.</p>
                <button
                  onClick={() => setBuyerRadiusFilter('all-india')}
                  className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#1b4332] text-[#b7efc5] text-xs font-semibold"
                >
                  Show All India Buyers
                </button>
              </div>
            ) : (
              nearbyBuyers.slice(0, 4).map((buyer) => (
                <div
                  key={buyer.id}
                  className="p-4 rounded-xl glass-card border border-[#95d4b3]/15 hover:border-[#b7efc5]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={buyer.avatar}
                      alt={buyer.name}
                      className="w-11 h-11 rounded-xl object-cover border border-[#b7efc5]/30 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-sm text-white group-hover:text-[#b7efc5] transition-colors">
                          {buyer.name}
                        </h4>
                        {buyer.isVerified && (
                          <span className="px-1.5 py-0.2 text-[10px] rounded bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/30 font-medium">
                            Verified
                          </span>
                        )}
                        <span className="text-[11px] text-[#86af99] font-medium">
                          ⭐ {buyer.rating}
                        </span>
                      </div>
                      <p className="text-xs text-[#c1c8c2] mt-0.5">{buyer.companyName}</p>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#95d4b3] mt-1.5">
                        <span className="inline-flex items-center gap-1 font-semibold text-[#b7efc5]">
                          <MapPin className="w-3 h-3" />
                          {buyer.distanceKm} km away ({buyer.district}, {buyer.state})
                        </span>
                        <span>•</span>
                        <span className="text-[#dfe4e0]">Wants: <strong className="text-white">{buyer.cropsWanted.join(', ')}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <div className="text-right hidden sm:block mr-2">
                      <div className="text-xs font-semibold text-white">₹{buyer.expectedPricePerKg}/kg</div>
                      <div className="text-[10px] text-[#86af99]">Req: {buyer.requiredQuantityKg} kg</div>
                    </div>
                    <button
                      onClick={() => onSelectBuyerForOffer(buyer)}
                      className="px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#b7efc5] text-xs font-bold border border-[#b7efc5]/30 transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      Send Offer
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Column: Nearby Mandis with Live Tickers */}
        <section className="glass-card rounded-2xl p-5 sm:p-6 border border-[#95d4b3]/15 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-[#b7efc5]" />
                <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                  Nearby Mandis
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1b4332] text-[#b7efc5] font-semibold animate-pulse">
                Live Rates
              </span>
            </div>
            <p className="text-xs text-[#95d4b3] mb-4">
              Government APMC Yards closest to your registered coordinate
            </p>

            {/* Mandi Rate Tickers */}
            <div className="space-y-3">
              {nearbyMandis.slice(0, 3).map((mandi) => (
                <div
                  key={mandi.id}
                  className="p-3.5 rounded-xl bg-[#181d1a]/80 border border-[#414844]/50 hover:border-[#b7efc5]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-xs text-white truncate max-w-[170px]">
                      {mandi.name}
                    </h5>
                    <span className="text-[11px] font-bold text-[#b7efc5]">
                      {mandi.distanceKm} km
                    </span>
                  </div>
                  <div className="text-[10px] text-[#86af99] mt-0.5">
                    {mandi.district}, {mandi.state} • Updated {mandi.lastUpdated}
                  </div>

                  {/* Mandi Commodities snippet */}
                  <div className="mt-2 pt-2 border-t border-[#414844]/30 grid grid-cols-2 gap-2 text-xs">
                    {mandi.commodities.slice(0, 2).map((c) => (
                      <div key={c.crop} className="bg-[#1c211e] p-1.5 rounded-lg">
                        <div className="text-[10px] text-[#c1c8c2] truncate">{c.crop}</div>
                        <div className="font-bold text-white text-xs flex items-center justify-between">
                          <span>₹{c.modalPrice}/kg</span>
                          <span
                            className={`text-[10px] font-semibold ${
                              c.dailyChange === 'up'
                                ? 'text-[#b7efc5]'
                                : c.dailyChange === 'down'
                                ? 'text-[#ff897d]'
                                : 'text-[#86af99]'
                            }`}
                          >
                            {c.dailyChange === 'up' ? '↑' : c.dailyChange === 'down' ? '↓' : '•'} {Math.abs(c.trendPct)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenMap}
            className="w-full mt-4 py-2.5 rounded-xl bg-[#1c211e] hover:bg-[#262b29] border border-[#b7efc5]/30 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <MapIcon className="w-3.5 h-3.5 text-[#b7efc5]" />
            Explore Live Mandi Map
          </button>
        </section>
      </div>

      {/* 5. RECENT FIELD SCANS & QUICK ACTIONS */}
      <section className="glass-card rounded-2xl p-5 sm:p-6 border border-[#95d4b3]/15">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
              Recent Field Diagnostics
            </h3>
            <p className="text-xs text-[#95d4b3]">AI photo triage and disease scans</p>
          </div>
          <button
            onClick={onOpenCropAnalyzer}
            className="px-3.5 py-1.5 rounded-xl bg-[#1b4332] text-[#b7efc5] text-xs font-bold flex items-center gap-1 hover:bg-[#2d6a4f] transition-colors"
          >
            <Camera className="w-3.5 h-3.5" />
            New Scan
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Scan 1 */}
          <div className="p-3.5 rounded-xl bg-[#181d1a] border border-[#414844]/50 flex gap-3 items-center">
            <img
              src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80"
              alt="Tomato Leaf Scan"
              className="w-16 h-16 rounded-lg object-cover border border-[#95d4b3]/20"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">Tomato Field A</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30">
                  Grade B
                </span>
              </div>
              <div className="text-[11px] text-[#ffdad6] font-medium truncate mt-0.5">
                Early Blight Detected
              </div>
              <div className="text-[10px] text-[#86af99] mt-1">
                Remedy applied: Neem oil 0.5%
              </div>
            </div>
          </div>

          {/* Scan 2 */}
          <div className="p-3.5 rounded-xl bg-[#181d1a] border border-[#414844]/50 flex gap-3 items-center">
            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80"
              alt="Basmati Scan"
              className="w-16 h-16 rounded-lg object-cover border border-[#95d4b3]/20"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">Basmati Plot 4</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/30">
                  Grade A
                </span>
              </div>
              <div className="text-[11px] text-[#b7efc5] font-medium truncate mt-0.5">
                Healthy (98% Score)
              </div>
              <div className="text-[10px] text-[#86af99] mt-1">
                Harvest in 12 days
              </div>
            </div>
          </div>

          {/* Scan 3 */}
          <div className="p-3.5 rounded-xl bg-[#181d1a] border border-[#414844]/50 flex gap-3 items-center">
            <img
              src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=200&q=80"
              alt="Potato Scan"
              className="w-16 h-16 rounded-lg object-cover border border-[#95d4b3]/20"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">Potato Kufri Block</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/30">
                  Grade A
                </span>
              </div>
              <div className="text-[11px] text-[#b7efc5] font-medium truncate mt-0.5">
                Healthy • Ready for APMC
              </div>
              <div className="text-[10px] text-[#86af99] mt-1">
                Est. Price: ₹22/kg
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
