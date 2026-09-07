import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Camera,
  MessageSquare,
  FileText,
  DollarSign,
  CloudRain,
  User,
  Globe,
  Play,
  RotateCcw,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { AppLanguage, AuthUser, LocationState } from '../types';
import { getTranslation } from '../data/translations';

interface HackathonDemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
  onNavigateToTab: (tabId: string) => void;
  onApplyDemoScenario: (scenarioId: string) => void;
}

export const HackathonDemoTourModal: React.FC<HackathonDemoTourModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectLanguage,
  onNavigateToTab,
  onApplyDemoScenario,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const t = (key: string) => getTranslation(key, language);

  if (!isOpen) return null;

  const demoSteps = [
    {
      step: 1,
      title: 'Language Selection & Localization',
      subtitle: 'Complete instant UI translation across English, Hindi, and Hinglish.',
      actionTab: '3d-hub',
      icon: Globe,
      description: 'Switch between English, Hindi, and natural Hinglish. Krishi AI and all UI components update in real-time.',
    },
    {
      step: 2,
      title: 'Farmer Profile & Location Personalization',
      subtitle: 'District-grounded soil, farm holding, and Kharif/Rabi parameters.',
      actionTab: 'profile',
      icon: User,
      description: 'Configure farm location (e.g., Dehradun, Uttarakhand), soil type, and primary crops to personalize AI recommendations.',
    },
    {
      step: 3,
      title: 'Scan My Crop (Camera / Upload / Samples)',
      subtitle: 'Live viewfinder or sample image analysis.',
      actionTab: 'scanner',
      icon: Camera,
      description: 'Capture a leaf with the device camera or select a demonstration sample (Tomato Early Blight, Wheat Yellow Rust, Basmati).',
    },
    {
      step: 4,
      title: 'AI Multi-Stage Pathology Pipeline',
      subtitle: 'Crop ID → Plant Health → Disease/Pest Triage → Remedies.',
      actionTab: 'scanner',
      icon: Sparkles,
      description: 'Experience the 5-stage AI vision diagnostic with 98.4% confidence score and ICAR-backed treatment plan.',
    },
    {
      step: 5,
      title: 'Generated Crop Intelligence Report',
      subtitle: 'Complete agronomic, risk, and economic evaluation.',
      actionTab: 'crop-report',
      icon: FileText,
      description: 'Review the comprehensive report with soil requirements, water schedules, risk matrix, and exportable PDF summary.',
    },
    {
      step: 6,
      title: 'Micro-Climate Weather & Irrigation Alert',
      subtitle: '7-day precipitation forecast & farm telemetry.',
      actionTab: 'weather',
      icon: CloudRain,
      description: 'Inspect rainfall probabilities and AI-driven precision irrigation alerts to prevent foliar wash-off.',
    },
    {
      step: 7,
      title: 'Mandi Arbitrage & "Sell or Wait?" Engine',
      subtitle: 'Live APMC benchmarks & direct buyer procurement.',
      actionTab: 'marketplace',
      icon: DollarSign,
      description: 'Analyze the AI "Sell or Wait?" recommendation based on arrival volumes, storage life, and regional price momentum.',
    },
    {
      step: 8,
      title: 'Krishi AI Voice & Chat Agronomist',
      subtitle: 'Bilingual voice-enabled AI assistant with full contextual awareness.',
      actionTab: 'assistant',
      icon: MessageSquare,
      description: 'Ask Krishi AI any question via voice or text. The assistant automatically remembers the scanned crop and farm location.',
    },
  ];

  const activeStepData = demoSteps[currentStep - 1];
  const StepIcon = activeStepData.icon;

  const handleNext = () => {
    if (currentStep < demoSteps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onNavigateToTab(demoSteps[nextStep - 1].actionTab);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onNavigateToTab(demoSteps[prevStep - 1].actionTab);
    }
  };

  const handleJumpToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    onNavigateToTab(demoSteps[stepNumber - 1].actionTab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#12241b] via-[#0e1d15] to-[#06110a] rounded-3xl border-2 border-[#b7efc5]/40 shadow-2xl p-6 sm:p-8 text-[#dfe4e0] space-y-6 relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#414844]/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1b4332] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shadow-lg">
              <Play className="w-5 h-5 text-[#b7efc5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#b7efc5] uppercase font-mono tracking-wider">
                  HACKATHON DEMO TOUR • STEP {currentStep} OF 8
                </span>
              </div>
              <h3 className="font-extrabold text-lg sm:text-xl text-white font-['Montserrat']">
                {t('demo.title')}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Ribbon */}
        <div className="grid grid-cols-8 gap-1.5">
          {demoSteps.map((s) => (
            <button
              key={s.step}
              onClick={() => handleJumpToStep(s.step)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                s.step === currentStep
                  ? 'bg-[#b7efc5] shadow-[0_0_10px_#b7efc5]'
                  : s.step < currentStep
                  ? 'bg-[#40916c]'
                  : 'bg-[#1e2f25]'
              }`}
              title={`Step ${s.step}: ${s.title}`}
            />
          ))}
        </div>

        {/* Active Step Content Stage */}
        <div className="bg-[#102217]/90 p-5 sm:p-6 rounded-3xl border border-[#b7efc5]/30 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1b4332] border border-[#b7efc5]/50 flex items-center justify-center text-[#b7efc5] shrink-0 shadow-lg">
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base sm:text-lg font-['Montserrat']">
                {activeStepData.title}
              </h4>
              <p className="text-xs text-[#95d4b3] font-medium mt-0.5">
                {activeStepData.subtitle}
              </p>
              <p className="text-xs text-[#d8f3dc] mt-2 leading-relaxed">
                {activeStepData.description}
              </p>
            </div>
          </div>

          {/* Interactive Step Helper Widget */}
          {currentStep === 1 && (
            <div className="pt-2 border-t border-[#414844]/40 flex items-center gap-2">
              <span className="text-xs text-[#86af99] font-semibold">Switch Language:</span>
              {(['en', 'hi', 'hinglish'] as AppLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onSelectLanguage(lang)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    language === lang
                      ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 shadow-md'
                      : 'bg-[#18261e] text-[#86af99] hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी (Hindi)' : 'Hinglish'}
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="pt-2 border-t border-[#414844]/40 space-y-2">
              <span className="text-[10px] font-bold text-[#86af99] uppercase">
                Quick Scenario Selectors:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onApplyDemoScenario('sample-tomato-blight')}
                  className="p-2 rounded-xl bg-[#14231b] border border-[#b7efc5]/30 hover:border-[#b7efc5] text-[11px] font-bold text-white transition-all text-left"
                >
                  🍅 Tomato Blight
                </button>
                <button
                  onClick={() => onApplyDemoScenario('sample-wheat-rust')}
                  className="p-2 rounded-xl bg-[#14231b] border border-[#b7efc5]/30 hover:border-[#b7efc5] text-[11px] font-bold text-white transition-all text-left"
                >
                  🌾 Wheat Rust
                </button>
                <button
                  onClick={() => onApplyDemoScenario('sample-basmati-healthy')}
                  className="p-2 rounded-xl bg-[#14231b] border border-[#b7efc5]/30 hover:border-[#b7efc5] text-[11px] font-bold text-white transition-all text-left"
                >
                  🍚 Basmati Harvest
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-4 py-2.5 rounded-2xl bg-[#14231b] hover:bg-[#1f3125] border border-[#414844] text-xs font-semibold text-[#c1c8c2] hover:text-white transition-all disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-[#86af99] hover:text-white transition-colors cursor-pointer"
            >
              Exit Tour
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-2xl btn-3d-primary font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{currentStep === demoSteps.length ? 'Finish & Explore' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
