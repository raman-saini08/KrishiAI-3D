import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  User,
  Globe,
  ChevronDown,
  Wheat,
  Building2,
  ShieldCheck,
  LogIn,
  LogOut,
  Play,
} from 'lucide-react';
import { LocationState, RoleType, AuthUser, AppLanguage } from '../types';
import { getTranslation } from '../data/translations';

interface HeaderProps {
  currentLocation: LocationState;
  onOpenLocationModal: () => void;
  role: RoleType;
  onToggleRole: (newRole: RoleType) => void;
  selectedLanguage: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
  onNavigateToProfile: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onOpenPortal?: () => void;
  onOpenDemoTour?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onOpenLocationModal,
  role,
  onToggleRole,
  selectedLanguage,
  onSelectLanguage,
  onNavigateToProfile,
  activeTab,
  onTabChange,
  currentUser,
  onOpenAuthModal,
  onOpenPortal,
  onOpenDemoTour,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = (key: string) => getTranslation(key, selectedLanguage);

  const supportedLanguages: { code: AppLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'hinglish', label: 'Hinglish', flag: '🌾' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-[#95d4b3]/15 backdrop-blur-xl bg-[#0a0f0d]/85 shadow-lg">
      {/* Top Notification Bar for Pan-India Coverage */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#0f281e] to-[#1b4332] border-b border-[#95d4b3]/10 py-1 px-4 text-center text-xs flex items-center justify-between text-[#a5d0b9]">
        <div className="flex items-center gap-1.5 mx-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-[#b7efc5] animate-ping" />
          <span className="font-medium text-[#b7efc5]">{t('header.panIndiaSync')}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onTabChange('3d-hub')}
          className="flex items-center gap-2.5 cursor-pointer group"
          id="header-brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1b4332] to-[#0a1f16] border border-[#b7efc5]/40 flex items-center justify-center p-1.5 shadow-md group-hover:border-[#b7efc5] transition-all">
            <svg
              className="w-full h-full text-[#b7efc5]"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="32,4 58,18 58,46 32,60 6,46 6,18"
                stroke="currentColor"
                strokeWidth="3.5"
                fill="none"
              />
              <path
                d="M32 50 C32 36 22 28 14 26 C22 24 30 28 32 36"
                fill="#40916c"
              />
              <path
                d="M32 50 C32 34 42 24 50 22 C42 22 34 28 32 36"
                fill="#95d4b3"
              />
              <path
                d="M32 50 L32 30"
                stroke="#b7efc5"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white font-['Montserrat']">
                Crop Rescuer <span className="text-[#b7efc5]">AI</span>
              </span>
            </div>
            <p className="text-[10px] text-[#95d4b3]/80 hidden sm:block">
              {selectedLanguage === 'hi' ? 'स्मार्ट कृषि एवं मंडी सहायक' : 'Smart Agriculture Platform'}
            </p>
          </div>
        </div>

        {/* Location Switcher Badge */}
        <div className="flex items-center">
          <button
            onClick={onOpenLocationModal}
            id="location-selector-trigger"
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#1c211e] hover:bg-[#262b29] border border-[#b7efc5]/30 hover:border-[#b7efc5] transition-all shadow-inner group cursor-pointer"
            title="Click to detect or change state/district"
          >
            <div className="w-6 h-6 rounded-full bg-[#1b4332] flex items-center justify-center text-[#b7efc5] group-hover:scale-110 transition-transform">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="text-left flex flex-col">
              <span className="text-[10px] font-medium text-[#86af99] uppercase tracking-wider leading-none">
                {t('header.location')}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[110px] sm:max-w-[190px] leading-tight">
                {currentLocation.district}, {currentLocation.state}
              </span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/30 font-medium hidden md:inline-block">
              {t('header.switch')}
            </span>
          </button>
        </div>

        {/* Right Actions: Demo Tour, Language Selector, Role Pill, 3D Login */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Tour Button for Judges */}
          {onOpenDemoTour && (
            <button
              onClick={onOpenDemoTour}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#854d0e] to-[#a16207] hover:from-[#a16207] hover:to-[#ca8a04] text-white border border-[#fde047]/40 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              title="Launch Guided Presentation Tour for Hackathon Judges"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">⚡ {t('nav.demoMode')}</span>
            </button>
          )}

          {/* Fully Functional Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c211e] hover:bg-[#262b29] border border-[#b7efc5]/30 text-xs text-[#dfe4e0] font-semibold transition-colors cursor-pointer"
              id="language-dropdown-btn"
            >
              <Globe className="w-3.5 h-3.5 text-[#95d4b3]" />
              <span>
                {supportedLanguages.find((l) => l.code === selectedLanguage)?.label || 'English'}
              </span>
              <ChevronDown className="w-3 h-3 text-[#8b938d]" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-modal py-2 shadow-2xl z-50 border border-[#b7efc5]/30 animate-in fade-in zoom-in-95 bg-[#0e1c14]">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#86af99] tracking-wider border-b border-[#414844]/40 font-mono">
                  Select Language (भाषा)
                </div>
                {supportedLanguages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onSelectLanguage(l.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#1b4332]/60 transition-colors cursor-pointer ${
                      selectedLanguage === l.code
                        ? 'text-[#b7efc5] font-bold bg-[#1b4332]/50'
                        : 'text-[#dfe4e0]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </span>
                    {selectedLanguage === l.code && (
                      <span className="w-2 h-2 rounded-full bg-[#b7efc5]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3D Login / Profile Interactive Button */}
          {currentUser ? (
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full bg-gradient-to-r from-[#17261e] to-[#121c17] hover:from-[#1e3328] hover:to-[#17261e] border border-[#b7efc5]/40 hover:border-[#b7efc5] shadow-md transition-all group cursor-pointer ${
                activeTab === 'profile' ? 'ring-2 ring-[#b7efc5]/40' : ''
              }`}
              title="Click to view 3D Kisan ID / Logout"
              id="header-3d-user-pill"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#b7efc5] shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white group-hover:text-[#b7efc5] transition-colors leading-none flex items-center gap-1">
                  <span>{currentUser.name.split(' ')[0]}</span>
                  <ShieldCheck className="w-3 h-3 text-[#b7efc5]" />
                </div>
                <span className="text-[9px] text-[#95d4b3] font-mono leading-none">
                  {currentUser.kisanId ? currentUser.kisanId.slice(0, 12) : '3D Verified'}
                </span>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 rounded-full btn-3d-primary font-bold text-xs flex items-center gap-1.5 shadow-lg group cursor-pointer"
              id="header-3d-login-btn"
            >
              <LogIn className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>{t('header.login')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
