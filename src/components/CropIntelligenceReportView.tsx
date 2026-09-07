import React from 'react';
import {
  FileText,
  Printer,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Sprout,
  Droplets,
  Thermometer,
  Layers,
  TrendingUp,
  DollarSign,
  Building2,
  Calendar,
  MapPin,
  MessageSquare,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { CropIntelligenceReport, AppLanguage } from '../types';
import { getTranslation } from '../data/translations';

interface CropIntelligenceReportViewProps {
  report: CropIntelligenceReport | null;
  language: AppLanguage;
  onAskAi: (prompt: string, report?: CropIntelligenceReport) => void;
  onOpenScanner: () => void;
  onOpenMarketplace: () => void;
}

export const CropIntelligenceReportView: React.FC<CropIntelligenceReportViewProps> = ({
  report,
  language,
  onAskAi,
  onOpenScanner,
  onOpenMarketplace,
}) => {
  const t = (key: string) => getTranslation(key, language);

  if (!report) {
    return (
      <div className="p-12 text-center glass-card rounded-3xl border border-dashed border-[#414844] space-y-4 max-w-xl mx-auto my-12">
        <FileText className="w-12 h-12 text-[#86af99] mx-auto" />
        <h2 className="text-xl font-bold text-white">No Crop Report Generated Yet</h2>
        <p className="text-xs text-[#95d4b3]">
          Scan a crop photo with our AI Camera or select a demo sample to generate a full Crop Intelligence Report.
        </p>
        <button
          onClick={onOpenScanner}
          className="px-6 py-3 rounded-2xl btn-3d-primary font-bold text-xs shadow-lg cursor-pointer"
        >
          Scan My Crop Now →
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300 print:bg-white print:text-black">
      {/* 1. Top Header & Action Controls */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#b7efc5]/25 bg-gradient-to-br from-[#12241b]/95 via-[#0b1710]/95 to-[#040c07]/95 shadow-2xl relative overflow-hidden print:border-none print:bg-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] text-[#b7efc5] text-xs font-bold border border-[#b7efc5]/30">
              <FileText className="w-3.5 h-3.5" />
              <span>{t('report.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Montserrat'] print:text-black">
              Crop Intelligence & Agronomic Valuation
            </h1>
            <p className="text-xs sm:text-sm text-[#95d4b3] max-w-2xl print:text-gray-700">
              {t('report.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-2xl bg-[#18261e] hover:bg-[#233328] border border-[#b7efc5]/30 text-[#b7efc5] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t('report.exportPdf')}</span>
            </button>

            <button
              onClick={onOpenScanner}
              className="px-4 py-2.5 rounded-2xl btn-3d-primary font-bold text-xs shadow-lg cursor-pointer"
            >
              Scan New Crop
            </button>
          </div>
        </div>
      </section>

      {/* 2. SECTION A: BASIC INFORMATION & CROP VITALS */}
      <section className="glass-card rounded-3xl p-6 sm:p-7 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3 mb-5">
          <h2 className="font-bold text-base sm:text-lg text-white font-['Montserrat'] flex items-center gap-2">
            <Sprout className="w-5 h-5 text-[#b7efc5]" />
            <span>{t('report.basicInfo')}</span>
          </h2>
          <span className="text-xs text-[#86af99] font-mono flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#b7efc5]" /> {report.scannedAt}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Crop Image Viewport */}
          <div className="md:col-span-4 relative h-48 rounded-2xl overflow-hidden border border-[#b7efc5]/30 shadow-md">
            <img src={report.imageUrl} alt={report.cropName} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3 right-3 text-xs text-white">
              <span className="font-bold block">{report.cropName}</span>
              <span className="text-[11px] text-[#95d4b3] font-mono">{report.variety}</span>
            </div>
          </div>

          {/* Vitals Bento Metrics */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#14231b] p-3.5 rounded-2xl border border-[#b7efc5]/20">
              <span className="text-[10px] text-[#86af99] uppercase font-mono block">{t('report.healthScore')}</span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">{report.healthScore} / 100</div>
              <div className="w-full bg-[#1e2f25] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#40916c] to-[#b7efc5] h-full rounded-full"
                  style={{ width: `${report.healthScore}%` }}
                />
              </div>
            </div>

            <div className="bg-[#14231b] p-3.5 rounded-2xl border border-[#b7efc5]/20">
              <span className="text-[10px] text-[#86af99] uppercase font-mono block">{t('report.growthStage')}</span>
              <strong className="text-sm text-white block mt-1">{report.growthStage}</strong>
              <span className="text-[10px] text-[#95d4b3] mt-1 block">Active Cultivation</span>
            </div>

            <div className="bg-[#14231b] p-3.5 rounded-2xl border border-[#b7efc5]/20">
              <span className="text-[10px] text-[#86af99] uppercase font-mono block">Diagnostic Status</span>
              <strong className="text-sm text-[#b7efc5] block mt-1">{report.diagnosisName}</strong>
              <span className="text-[10px] text-[#ffe066] font-mono mt-1 block">{report.confidenceScore}% Confidence</span>
            </div>

            <div className="bg-[#14231b] p-3.5 rounded-2xl border border-[#b7efc5]/20 col-span-2 sm:col-span-3">
              <span className="text-[10px] text-[#86af99] uppercase font-mono block">Leaf & Foliar Condition</span>
              <p className="text-white font-medium mt-1 leading-relaxed">{report.leafCondition}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION B: FARMING & AGRONOMIC REQUIREMENTS */}
      <section className="glass-card rounded-3xl p-6 sm:p-7 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3 mb-5">
          <h2 className="font-bold text-base sm:text-lg text-white font-['Montserrat'] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#b7efc5]" />
            <span>{t('report.farmingReqs')}</span>
          </h2>
          <span className="text-xs text-[#b7efc5] font-semibold">Agronomic Benchmark</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          <div className="bg-[#14231b] p-4 rounded-2xl border border-[#b7efc5]/20 space-y-1">
            <div className="flex items-center gap-1.5 text-[#b7efc5] font-bold text-[11px]">
              <Sprout className="w-3.5 h-3.5" />
              <span>{t('report.soilReq')}</span>
            </div>
            <p className="text-[#d8f3dc] leading-relaxed mt-1">{report.farmingRequirements.soilConditions}</p>
          </div>

          <div className="bg-[#14231b] p-4 rounded-2xl border border-[#b7efc5]/20 space-y-1">
            <div className="flex items-center gap-1.5 text-[#38bdf8] font-bold text-[11px]">
              <Droplets className="w-3.5 h-3.5" />
              <span>{t('report.waterReq')}</span>
            </div>
            <p className="text-[#d8f3dc] leading-relaxed mt-1">{report.farmingRequirements.waterRequirements}</p>
          </div>

          <div className="bg-[#14231b] p-4 rounded-2xl border border-[#b7efc5]/20 space-y-1">
            <div className="flex items-center gap-1.5 text-[#f59e0b] font-bold text-[11px]">
              <Thermometer className="w-3.5 h-3.5" />
              <span>{t('report.tempRange')}</span>
            </div>
            <p className="text-[#d8f3dc] leading-relaxed mt-1">{report.farmingRequirements.temperatureRange}</p>
          </div>

          <div className="bg-[#14231b] p-4 rounded-2xl border border-[#b7efc5]/20 space-y-1">
            <div className="flex items-center gap-1.5 text-[#74c69d] font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('report.fertilizerReq')}</span>
            </div>
            <p className="text-[#d8f3dc] leading-relaxed mt-1">{report.farmingRequirements.fertilizerRequirements}</p>
          </div>
        </div>
      </section>

      {/* 4. SECTION C: RISK ANALYSIS & TREATMENT PROTOCOL */}
      <section className="glass-card rounded-3xl p-6 sm:p-7 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3 mb-5">
          <h2 className="font-bold text-base sm:text-lg text-white font-['Montserrat'] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#ff897d]" />
            <span>{t('report.riskAnalysis')} & Treatment</span>
          </h2>
          <span className="text-xs font-bold text-[#ffdad6] bg-red-950/60 border border-red-500/30 px-2.5 py-0.5 rounded-full">
            Severity: {report.severityLevel}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Treatment Steps */}
          <div className="space-y-3">
            <div className="bg-[#102419] p-4 rounded-2xl border border-[#52b788]/30">
              <span className="text-[11px] font-bold text-[#52b788] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> {t('report.organicCure')}
              </span>
              <ul className="space-y-1.5 text-[#d8f3dc]">
                {report.treatmentPlan.organicRemedies.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#52b788] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#102419] p-4 rounded-2xl border border-[#38bdf8]/30">
              <span className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> {t('report.chemicalCure')}
              </span>
              <ul className="space-y-1.5 text-[#d8f3dc]">
                {report.treatmentPlan.chemicalTreatments.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-[#14231b] p-4 rounded-2xl border border-[#b7efc5]/20 space-y-3">
            <div>
              <span className="text-[10px] text-[#86af99] uppercase font-mono block">Pathogen Spore Dynamics</span>
              <p className="text-white font-medium mt-0.5">{report.riskAnalysis.diseaseRisks}</p>
            </div>
            <div>
              <span className="text-[10px] text-[#86af99] uppercase font-mono block">Weather Vulnerability</span>
              <p className="text-white font-medium mt-0.5">{report.riskAnalysis.weatherRisks}</p>
            </div>
            <div>
              <span className="text-[10px] text-[#86af99] uppercase font-mono block">{t('report.prevention')}</span>
              <ul className="space-y-1 text-[#b7efc5] mt-1">
                {report.treatmentPlan.preventionMethods.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b7efc5]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION D: MARKET & PROFIT INTELLIGENCE + "SELL OR WAIT?" */}
      <section className="glass-card rounded-3xl p-6 sm:p-7 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3 mb-5">
          <h2 className="font-bold text-base sm:text-lg text-white font-['Montserrat'] flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#ffe066]" />
            <span>{t('report.economicInfo')}</span>
          </h2>
          <span className="text-xs text-[#86af99] font-mono">{report.economicInfo.dataSource}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Smart Pricing "Sell or Wait?" Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#1a2f22] to-[#102217] p-5 rounded-3xl border-2 border-[#b7efc5]/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#86af99] uppercase tracking-wider font-mono">
                Smart Pricing AI Decision
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1b4332] text-[#b7efc5] text-xs font-extrabold border border-[#b7efc5]/50 shadow-sm">
                {report.economicInfo.bestSellingRecommendation}
              </span>
            </div>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-black text-white font-['Montserrat']">
                ₹{report.economicInfo.currentCropPrice}
                <span className="text-sm font-normal text-[#95d4b3]"> / kg</span>
              </span>
              <span className="text-xs font-bold text-[#b7efc5] bg-[#1b4332] px-2 py-0.5 rounded-md">
                +{report.economicInfo.priceMovementPct}% Trend
              </span>
            </div>

            <p className="text-xs text-[#d8f3dc] leading-relaxed pt-1">
              {report.economicInfo.sellWaitRationale}
            </p>

            <div className="pt-2 border-t border-[#414844]/40 flex items-center justify-between text-xs text-[#86af99]">
              <span>Mandi Range: <strong className="text-white">{report.economicInfo.mandiPriceRange}</strong></span>
              <span className="text-[#b7efc5] font-semibold">{report.economicInfo.estimatedDemand}</span>
            </div>
          </div>

          {/* Right: Quick Action to Sell or Chat */}
          <div className="lg:col-span-6 space-y-3">
            <div className="bg-[#14231b] p-4 rounded-2xl border border-[#b7efc5]/20 text-xs text-[#c1c8c2] leading-relaxed">
              <p>
                Direct procurement aggregators in <strong>{report.locationLabel}</strong> are actively bidding for Grade A batches. Connect directly without middleman deductions.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onOpenMarketplace}
                className="flex-1 py-3 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>View Verified Buyer Offers</span>
              </button>

              <button
                onClick={() =>
                  onAskAi(
                    `Give me a detailed selling strategy for my ${report.cropName} batch given current price ₹${report.economicInfo.currentCropPrice}/kg in ${report.locationLabel}.`,
                    report
                  )
                }
                className="px-4 py-3 rounded-2xl bg-[#18261e] hover:bg-[#233328] border border-[#b7efc5]/30 text-[#b7efc5] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask Krishi AI</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
