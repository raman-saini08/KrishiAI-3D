import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Bot,
  Mic,
  Send,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { LocationState, AuthUser } from '../../types';

interface FarmerAdvisory3DCardProps {
  location: LocationState;
  currentUser?: AuthUser | null;
  onOpenAiAssistant?: (initialPrompt?: string) => void;
}

export const FarmerAdvisory3DCard: React.FC<FarmerAdvisory3DCardProps> = ({
  location,
  currentUser,
  onOpenAiAssistant,
}) => {
  const [quickPrompt, setQuickPrompt] = useState<string>('When should I harvest my wheat in Dehradun?');

  const presetPrompts = [
    '🌾 When should I harvest my crop?',
    '💧 Fertilizer dose for tomato early blight',
    '📈 Price forecast for basmati rice next month',
    '🚜 Govt subsidy schemes available in my state',
  ];

  return (
    <div className="relative rounded-3xl glass-card border border-[#b7efc5]/30 p-5 sm:p-6 bg-gradient-to-br from-[#15271d]/95 via-[#0b1710]/95 to-[#040c07]/95 shadow-2xl flex flex-col justify-between group hover:border-[#b7efc5]/60 transition-all duration-300 transform-gpu hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,67,50,0.5)]">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#414844]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1b4332] to-[#0a1f16] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shadow-lg">
              <Bot className="w-5 h-5 text-[#b7efc5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#b7efc5] uppercase tracking-wider">
                  FEATURE 04 • 24/7 ADVISORY
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                Personalized Farmer Advisory
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#102217] px-2.5 py-1 rounded-xl border border-[#b7efc5]/30 text-xs font-mono text-[#b7efc5]">
            <Cpu className="w-3.5 h-3.5 text-[#b7efc5]" />
            <span>Kisan LLM</span>
          </div>
        </div>

        {/* AI Conversation Preview Bubble Stage */}
        <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden border border-[#b7efc5]/20 bg-[#07130b]/80 p-3.5 flex flex-col justify-between my-3">
          {/* User Query Bubble */}
          <div className="flex items-start gap-2 max-w-[85%] self-end">
            <div className="bg-[#1b4332] text-white p-2.5 rounded-2xl rounded-tr-none text-xs shadow-md border border-[#b7efc5]/30">
              <p className="font-medium">
                {currentUser?.name ? `${currentUser.name.split(' ')[0]}: ` : 'Kisan: '}
                "Best organic spray for leaf yellowing in {location.district}?"
              </p>
            </div>
          </div>

          {/* AI Response Bubble with Hologram Glow */}
          <div className="flex items-start gap-2 max-w-[92%] self-start">
            <div className="w-6 h-6 rounded-full bg-[#102217] border border-[#b7efc5] flex items-center justify-center text-[#b7efc5] shrink-0 mt-0.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#b7efc5]" />
            </div>
            <div className="bg-[#0f2117]/90 text-[#d8f3dc] p-2.5 rounded-2xl rounded-tl-none text-xs border border-[#b7efc5]/30 shadow-lg">
              <p className="leading-relaxed">
                For {location.district} soil conditions, spray <strong>Neem Kernel Extract (5%)</strong> + Fermented Buttermilk (1:10) every 5 days. It reverses nitrogen deficiency and repels whiteflies.
              </p>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-[#95d4b3] font-mono">
                <span>✓ Verified by ICAR Agri-Standards</span>
                <span>• 28 Langs Voice</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-[#86af99] uppercase tracking-wider block">
            Suggested Agri Queries:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {presetPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => onOpenAiAssistant?.(p.replace(/^[^\w]+/, ''))}
                className="text-left p-2 rounded-xl bg-[#0e1d14] hover:bg-[#182d20] border border-[#414844]/50 hover:border-[#b7efc5]/40 text-[11px] text-[#c1c8c2] hover:text-white transition-all truncate cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4">
        <button
          onClick={() => onOpenAiAssistant?.()}
          className="w-full py-2.5 rounded-2xl btn-3d-primary font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat with Kisan AI Voice & Text</span>
        </button>
      </div>
    </div>
  );
};
