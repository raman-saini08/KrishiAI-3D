import React, { useState } from 'react';
import {
  Scan,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Camera,
  Activity,
  Cpu,
} from 'lucide-react';

interface AiLeafScan3DCardProps {
  onOpenScanner?: () => void;
  onAskAi?: (prompt: string) => void;
}

export const AiLeafScan3DCard: React.FC<AiLeafScan3DCardProps> = ({
  onOpenScanner,
  onAskAi,
}) => {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<'tomato' | 'wheat' | 'rice'>('tomato');

  const diagnoses = {
    tomato: {
      name: 'Tomato (Solanum lycopersicum)',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      disease: 'Early Blight (Alternaria solani)',
      status: 'Infected • Stage 1',
      confidence: 98.4,
      severity: 'Moderate',
      treatment: 'Neem oil spray (0.5%) + Copper oxychloride (2g/L)',
      recoveryDays: '6-8 days',
      isHealthy: false,
    },
    wheat: {
      name: 'Wheat (Triticum aestivum)',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      disease: 'Puccinia striiformis (Yellow Rust)',
      status: 'Trace Detected • Triage',
      confidence: 96.8,
      severity: 'Low',
      treatment: 'Propiconazole 25 EC (0.1%) spray immediately',
      recoveryDays: '4-5 days',
      isHealthy: false,
    },
    rice: {
      name: 'Basmati Rice (Oryza sativa)',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      disease: 'None Detected (Clean Leaf)',
      status: 'Optimal Health (Grade A)',
      confidence: 99.2,
      severity: 'Healthy',
      treatment: 'Maintain balanced water level & standard NPK ratio',
      recoveryDays: 'Ready for harvest',
      isHealthy: true,
    },
  };

  const active = diagnoses[selectedDiagnosis];

  return (
    <div className="relative rounded-3xl glass-card border border-[#b7efc5]/30 p-5 sm:p-6 bg-gradient-to-br from-[#12241b]/95 via-[#0b1710]/95 to-[#040c07]/95 shadow-2xl flex flex-col justify-between group hover:border-[#b7efc5]/60 transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,67,50,0.5)]">
      {/* Top Holographic Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#414844]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#0a1f16] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shadow-lg">
              <Scan className="w-5 h-5 text-[#b7efc5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#b7efc5] uppercase tracking-wider">
                  FEATURE 01 • REAL-TIME AI
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                AI Crop Disease Detection
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#102217] px-2.5 py-1 rounded-xl border border-[#b7efc5]/30 text-xs font-mono text-[#b7efc5]">
            <Cpu className="w-3.5 h-3.5 text-[#b7efc5]" />
            <span>Gemini Vision</span>
          </div>
        </div>

        {/* Crop Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 my-3 bg-[#0d1c14] p-1 rounded-2xl border border-[#414844]/50">
          {(['tomato', 'wheat', 'rice'] as const).map((cropKey) => (
            <button
              key={cropKey}
              onClick={() => setSelectedDiagnosis(cropKey)}
              className={`py-1.5 px-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                selectedDiagnosis === cropKey
                  ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 shadow-md font-bold'
                  : 'text-[#86af99] hover:text-white'
              }`}
            >
              {cropKey}
            </button>
          ))}
        </div>

        {/* 3D Leaf Scan Viewport with Laser Grid & Bounding Box */}
        <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden border border-[#b7efc5]/30 my-2 group/viewport">
          <img
            src={active.image}
            alt={active.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/viewport:scale-105"
          />

          {/* Holographic HUD Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Animated Laser Scanning Line */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#b7efc5] to-transparent shadow-[0_0_15px_#b7efc5] animate-scan-line z-20" />

          {/* Dynamic AI Bounding Detection Box */}
          <div
            className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-xl border-2 ${
              active.isHealthy
                ? 'border-[#52b788] shadow-[0_0_20px_rgba(82,183,136,0.5)]'
                : 'border-[#ff5449] shadow-[0_0_20px_rgba(255,84,73,0.5)]'
            } z-20 flex flex-col justify-between p-1.5 pointer-events-none`}
          >
            {/* Top Corner markers */}
            <div className="flex justify-between items-center">
              <span className="w-2 h-2 border-t-2 border-l-2 border-white" />
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-white font-bold">
                {active.confidence}% CONFIDENCE
              </span>
              <span className="w-2 h-2 border-t-2 border-r-2 border-white" />
            </div>

            {/* Bottom Corner markers */}
            <div className="flex justify-between items-center">
              <span className="w-2 h-2 border-b-2 border-l-2 border-white" />
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  active.isHealthy ? 'bg-[#1b4332] text-[#b7efc5]' : 'bg-[#93000a] text-[#ffdad6]'
                } font-bold`}
              >
                {active.disease.split(' ')[0]}
              </span>
              <span className="w-2 h-2 border-b-2 border-r-2 border-white" />
            </div>
          </div>

          {/* Bottom Live Result Pill in Viewport */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-20">
            <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/15">
              {active.isHealthy ? (
                <ShieldCheck className="w-3.5 h-3.5 text-[#b7efc5]" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5 text-[#ff897d]" />
              )}
              <span className="text-xs font-bold text-white truncate max-w-[170px]">
                {active.disease}
              </span>
            </div>

            <div className="bg-[#102217]/90 px-2 py-1 rounded-xl border border-[#b7efc5]/40 text-[#b7efc5] text-[11px] font-mono font-bold">
              {active.confidence}%
            </div>
          </div>
        </div>

        {/* Diagnosis & Recommended Cure Details */}
        <div className="bg-[#0e1e15] rounded-2xl p-3.5 border border-[#b7efc5]/20 space-y-2 mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#86af99]">Crop Subject:</span>
            <strong className="text-white font-medium">{active.name}</strong>
          </div>

          <div className="flex items-start justify-between text-xs gap-2 pt-1 border-t border-[#414844]/30">
            <span className="text-[#86af99] shrink-0">AI Treatment:</span>
            <span className="text-[#b7efc5] font-semibold text-right leading-tight">
              {active.treatment}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 flex items-center gap-2">
        <button
          onClick={onOpenScanner}
          className="flex-1 py-2.5 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>Analyze Your Leaf Live</span>
        </button>

        <button
          onClick={() =>
            onAskAi?.(`Tell me how to treat ${active.disease} on my ${active.name.split(' ')[0]} crop.`)
          }
          className="px-3.5 py-2.5 rounded-2xl bg-[#18231c] hover:bg-[#233128] border border-[#b7efc5]/30 text-[#b7efc5] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          title="Ask AI Advisor"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask Cure</span>
        </button>
      </div>
    </div>
  );
};
