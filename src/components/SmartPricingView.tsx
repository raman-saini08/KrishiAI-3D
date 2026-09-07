import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Scale,
  Building2,
  Store,
  DollarSign,
  AlertCircle,
  Sparkles,
  Info,
  Calendar,
  MapPin,
  ChevronRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import {
  LocationState,
  QualityGrade,
  AppLanguage,
  SellWaitRecommendation,
  SmartPricingResult,
} from '../types';
import { getTranslation } from '../data/translations';
import { estimateLocationPrice, getNearbyBuyers, getNearbyMandis } from '../data/indiaLocations';

interface SmartPricingViewProps {
  currentLocation: LocationState;
  language: AppLanguage;
  onOpenLocationModal: () => void;
  onOpenAiAssistant: (prompt: string) => void;
  onSelectBuyerForOffer?: (buyer: any) => void;
}

export const SmartPricingView: React.FC<SmartPricingViewProps> = ({
  currentLocation,
  language,
  onOpenLocationModal,
  onOpenAiAssistant,
  onSelectBuyerForOffer,
}) => {
  const [selectedCrop, setSelectedCrop] = useState('Tomatoes');
  const [selectedGrade, setSelectedGrade] = useState<QualityGrade>('Grade A');
  const [selectedQuantity, setSelectedQuantity] = useState<number>(500);

  const t = (key: string) => getTranslation(key, language);

  // Compute live price estimate
  const priceEstimate = useMemo(() => {
    return estimateLocationPrice(
      selectedCrop,
      selectedGrade,
      currentLocation.state,
      currentLocation.district,
      selectedQuantity
    );
  }, [selectedCrop, selectedGrade, selectedQuantity, currentLocation.state, currentLocation.district]);

  // Compute Smart Pricing "Sell or Wait?" decision
  const smartPricingDecision: SmartPricingResult = useMemo(() => {
    const isUp = priceEstimate.trend === 'up';
    const isGradeA = selectedGrade === 'Grade A';

    let decision: SellWaitRecommendation = 'MONITOR MARKET';
    let headline = 'Price momentum is holding steady.';
    let rationale =
      'Current arrival volumes are balanced with retail demand. Monitor prices over the next 2-3 days before dispatching large shipments.';

    if (isUp && isGradeA) {
      decision = 'WAIT FOR BETTER PRICE';
      headline = 'Upward price surge (+8.4%) in progress.';
      rationale = `Tight arrival volumes in ${currentLocation.district} APMC mandis are pushing Grade A prices higher. Waiting 2 to 4 days could yield an extra ₹2,500 – ₹4,000 per ton.`;
    } else if (!isUp || selectedGrade === 'Grade C') {
      decision = 'SELL NOW';
      headline = 'Immediate sale recommended to prevent post-harvest shrinkage.';
      rationale = `Perishable produce in Grade ${selectedGrade.slice(-1)} risks weight loss. Direct food processors in ${currentLocation.district} are offering immediate payment.`;
    }

    return {
      decision,
      headline,
      rationale,
      confidencePct: 94.6,
      currentPrice: priceEstimate.recommendedPrice,
      expected7DayPrice: Math.round(priceEstimate.recommendedPrice * (isUp ? 1.08 : 0.96)),
      mandiBenchmark: priceEstimate.mandiBenchmarkPrice,
      demandStatus: isUp ? 'High' : 'Moderate',
      priceMomentum: isUp ? '+8.4%' : '-3.1%',
      factors: {
        arrivalVolumeImpact: 'Moderate Daily Arrivals (-12% from last week)',
        weatherStorageRisk: 'Low Storage Risk under current dry conditions',
        buyerDemandScore: 'High Regional Processor Demand',
        qualityPremium: `${selectedGrade} commands 15% premium over modal benchmark`,
      },
      dataSource: `${currentLocation.district} APMC Yard Benchmarks`,
      timestamp: 'Live Updated Today',
    };
  }, [priceEstimate, selectedGrade, currentLocation]);

  const nearbyBuyers = useMemo(() => {
    return getNearbyBuyers(currentLocation, '100', 'All');
  }, [currentLocation]);

  const nearbyMandis = useMemo(() => {
    return getNearbyMandis(currentLocation);
  }, [currentLocation]);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#b7efc5]/25 bg-gradient-to-br from-[#12241b]/95 via-[#0b1710]/95 to-[#040c07]/95 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] text-[#b7efc5] text-xs font-bold border border-[#b7efc5]/30">
              <Scale className="w-3.5 h-3.5" />
              <span>{t('pricing.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Montserrat']">
              Mandi Arbitrage & "Sell or Wait?" Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-[#95d4b3] max-w-2xl">
              {t('pricing.subtitle')}
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

      {/* 2. CROP SELECTOR & "SELL OR WAIT?" MAIN DECISION ENGINE */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Commodity Selector Form */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-5 sm:p-7 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-base border-b border-[#414844]/40 pb-2.5 flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#b7efc5]" />
            <span>Commodity & Quality Parameters</span>
          </h3>

          <div className="space-y-3.5 text-xs">
            {/* Commodity */}
            <div>
              <label className="block font-semibold text-[#c1c8c2] mb-1">Select Crop Commodity</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2.5 text-sm text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Tomatoes">Tomatoes (Tamatar)</option>
                <option value="Potatoes">Potatoes (Aloo)</option>
                <option value="Onions">Onions (Pyaz)</option>
                <option value="Basmati Rice">Basmati Rice (Chawal)</option>
                <option value="Wheat">Wheat (Gehu)</option>
                <option value="Apples">Apples (Seb)</option>
                <option value="Garlic">Garlic (Lahsun)</option>
                <option value="Mustard">Mustard (Sarson)</option>
              </select>
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block font-semibold text-[#c1c8c2] mb-1">Quality Grade (AI Assessed)</label>
              <div className="grid grid-cols-3 gap-1.5 bg-[#14231b] p-1 rounded-xl border border-[#414844]">
                {(['Grade A', 'Grade B', 'Grade C'] as QualityGrade[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      selectedGrade === g
                        ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 shadow-sm'
                        : 'text-[#86af99] hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold text-[#c1c8c2] mb-1">Available Harvest Quantity (kg)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={50}
                  step={50}
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value) || 0)}
                  className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none"
                />
                <span className="text-xs text-[#86af99] font-bold">KG</span>
              </div>
            </div>

            {/* Total Batch Estimated Worth */}
            <div className="p-3.5 rounded-2xl bg-[#102419] border border-[#b7efc5]/30 space-y-1">
              <span className="text-[10px] text-[#86af99] uppercase font-mono block">Estimated Total Batch Value</span>
              <div className="text-2xl font-black text-[#b7efc5] font-['Montserrat']">
                ₹{(smartPricingDecision.currentPrice * selectedQuantity).toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#95d4b3]">
                At ₹{smartPricingDecision.currentPrice}/kg recommended target
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): "Sell or Wait?" Decision Hero Card */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-7 border-2 border-[#b7efc5]/35 bg-gradient-to-br from-[#172c1f] via-[#0e1d15] to-[#07130b] shadow-2xl space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#b7efc5]" />
                <h3 className="font-bold text-lg text-white font-['Montserrat']">
                  AI Smart Recommendation
                </h3>
              </div>
              <span className="text-[10px] text-[#86af99] font-mono">{smartPricingDecision.dataSource}</span>
            </div>

            {/* Big Decision Badge */}
            <div className="my-4 p-5 rounded-3xl bg-[#0b1b11]/90 border border-[#b7efc5]/40 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#86af99] uppercase tracking-wider font-mono">
                  Selling Recommendation
                </span>
                <span
                  className={`px-4 py-1.5 rounded-2xl text-xs sm:text-sm font-black shadow-lg uppercase tracking-wide ${
                    smartPricingDecision.decision === 'SELL NOW'
                      ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]'
                      : smartPricingDecision.decision === 'WAIT FOR BETTER PRICE'
                      ? 'bg-[#854d0e] text-[#fef08a] border border-[#fef08a]'
                      : 'bg-[#0369a1] text-white border border-[#38bdf8]'
                  }`}
                >
                  {smartPricingDecision.decision}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {smartPricingDecision.headline}
              </div>

              <p className="text-xs text-[#d8f3dc] leading-relaxed pt-1">
                {smartPricingDecision.rationale}
              </p>
            </div>

            {/* 4 Factor Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-[#14231b] p-3 rounded-xl border border-[#b7efc5]/20">
                <span className="text-[10px] text-[#86af99] block font-mono">ARRIVAL VOLUME</span>
                <span className="text-white font-medium">{smartPricingDecision.factors.arrivalVolumeImpact}</span>
              </div>
              <div className="bg-[#14231b] p-3 rounded-xl border border-[#b7efc5]/20">
                <span className="text-[10px] text-[#86af99] block font-mono">STORAGE RISK</span>
                <span className="text-white font-medium">{smartPricingDecision.factors.weatherStorageRisk}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#414844]/40 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() =>
                onOpenAiAssistant(
                  `Should I sell my ${selectedQuantity}kg of ${selectedGrade} ${selectedCrop} today or wait for next week's rate in ${currentLocation.district}?`
                )
              }
              className="flex-1 py-3 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Krishi AI for Price Forecast</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. NEARBY MANDI RATES & VERIFIED BUYER OFFERS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nearby APMC Mandis */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#414844]/40 pb-2.5">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Store className="w-4 h-4 text-[#b7efc5]" />
              <span>Nearby APMC Mandi Benchmarks</span>
            </h3>
            <span className="text-[10px] text-[#b7efc5] font-mono">Live Synced</span>
          </div>

          <div className="space-y-2.5">
            {nearbyMandis.slice(0, 3).map((m) => (
              <div key={m.id} className="p-3.5 rounded-2xl bg-[#14231b] border border-[#b7efc5]/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-white truncate">{m.name}</h4>
                  <span className="text-[11px] text-[#b7efc5] font-mono">{m.distanceKm} km away</span>
                </div>
                <div className="text-[10px] text-[#86af99]">{m.district}, {m.state} • Updated {m.lastUpdated}</div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  {m.commodities.slice(0, 2).map((c) => (
                    <div key={c.crop} className="bg-[#1b2b20] p-1.5 rounded-lg flex justify-between items-center">
                      <span className="text-[10px] text-[#c1c8c2]">{c.crop}</span>
                      <strong className="text-white font-mono">₹{c.modalPrice}/kg</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Verified Direct Buyers */}
        <div className="glass-card rounded-3xl p-5 sm:p-6 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#414844]/40 pb-2.5">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#b7efc5]" />
              <span>Direct Wholesale Buyers (Zero Cut)</span>
            </h3>
            <span className="text-[10px] text-[#ffe066] font-mono">Fast Settlement</span>
          </div>

          <div className="space-y-2.5">
            {nearbyBuyers.slice(0, 3).map((b) => (
              <div key={b.id} className="p-3.5 rounded-2xl bg-[#14231b] border border-[#b7efc5]/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-xl object-cover border border-[#b7efc5]/30" />
                  <div>
                    <h4 className="font-bold text-xs text-white">{b.name}</h4>
                    <p className="text-[10px] text-[#95d4b3]">{b.companyName}</p>
                    <span className="text-[10px] text-[#86af99]">{b.distanceKm} km away • Wants {b.cropsWanted.join(', ')}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white font-mono">₹{b.expectedPricePerKg}/kg</div>
                  <button
                    onClick={() => onSelectBuyerForOffer?.(b)}
                    className="mt-1 px-3 py-1 rounded-xl bg-[#1b4332] text-[#b7efc5] text-[11px] font-bold border border-[#b7efc5]/30 hover:bg-[#2d6a4f] transition-all cursor-pointer"
                  >
                    Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
