import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Camera,
  Bot,
  FileText,
  DollarSign,
  CloudRain,
  Database,
  User,
  LayoutDashboard,
  Store,
  Map as MapIcon,
  Sprout,
  Play,
} from 'lucide-react';
import { DEFAULT_FARMER_LOCATION } from './data/indiaLocations';
import {
  BuyerProfile,
  LocationState,
  RoleType,
  AuthUser,
  AppLanguage,
  CropIntelligenceReport,
} from './types';
import { Header } from './components/Header';
import { LocationModal } from './components/LocationModal';
import { AiCropAnalyzer } from './components/AiCropAnalyzer';
import { CropIntelligenceReportView } from './components/CropIntelligenceReportView';
import { SmartPricingView } from './components/SmartPricingView';
import { WeatherDashboardView } from './components/WeatherDashboardView';
import { KnowledgeBaseTrainView } from './components/KnowledgeBaseTrainView';
import { AiFarmerAssistant } from './components/AiFarmerAssistant';
import { ProfileView } from './components/ProfileView';
import { MarketplaceView } from './components/MarketplaceView';
import { NearbyAgriMap } from './components/NearbyAgriMap';
import { WhatCanIGrow } from './components/WhatCanIGrow';
import { BuyerOffersModal } from './components/BuyerOffersModal';
import { Auth3DModal } from './components/Auth3DModal';
import { CropFieldsLoginPortal } from './components/CropFieldsLoginPortal';
import { AgriBackground3D } from './components/3d/AgriBackground3D';
import { FuturisticHero3D } from './components/FuturisticHero3D';
import { HackathonDemoTourModal } from './components/HackathonDemoTourModal';
import {
  getCurrentSessionUser,
  saveUserSession,
  logoutSession,
  saveUserToDB,
} from './services/authService';
import { getTranslation } from './data/translations';

const LANGUAGE_STORAGE_KEY = 'crop_rescuer_language_preference';

export function App() {
  // 1. Language Preference State with LocalStorage persistence
  const [selectedLanguage, setSelectedLanguage] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as AppLanguage;
      if (['en', 'hi', 'hinglish'].includes(saved)) return saved;
    } catch (_) {}
    return 'en';
  });

  const handleSelectLanguage = (lang: AppLanguage) => {
    setSelectedLanguage(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (_) {}
  };

  const t = (key: string) => getTranslation(key, selectedLanguage);

  // 2. Active Session User
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    return getCurrentSessionUser();
  });

  // 3. Portal Entry State
  const [hasEnteredPortal, setHasEnteredPortal] = useState<boolean>(() => {
    const active = getCurrentSessionUser();
    return !!active;
  });

  // 4. Farmer Location State
  const [currentLocation, setCurrentLocation] = useState<LocationState>(() => {
    const active = getCurrentSessionUser();
    if (active && active.state && active.district) {
      return {
        state: active.state,
        district: active.district,
        cityVillage: active.cityVillage || 'Niranjanpur',
        pincode: active.pincode || '248001',
        lat: 30.3165,
        lng: 78.0322,
        isCustom: true,
      };
    }
    return DEFAULT_FARMER_LOCATION;
  });

  const [role, setRole] = useState<RoleType>(currentUser?.role || 'farmer');
  const [activeTab, setActiveTab] = useState<string>('3d-hub');

  // 5. Active Diagnostic Crop Report
  const [activeCropReport, setActiveCropReport] = useState<CropIntelligenceReport | null>(null);

  // 6. Modals State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const [activeBuyerOffer, setActiveBuyerOffer] = useState<BuyerProfile | null>(null);
  const [assistantInitialPrompt, setAssistantInitialPrompt] = useState<string | undefined>();

  // Login handler
  const handlePortalEnter = (user: AuthUser, location: LocationState) => {
    saveUserSession(user);
    setCurrentUser(user);
    setRole(user.role);
    setCurrentLocation(location);
    setHasEnteredPortal(true);
  };

  const handleLogin = (user: AuthUser, location?: LocationState) => {
    saveUserSession(user);
    setCurrentUser(user);
    setRole(user.role);
    if (location) setCurrentLocation(location);
    setHasEnteredPortal(true);
  };

  const handleUpdateUser = (updatedUser: AuthUser) => {
    saveUserToDB(updatedUser);
    saveUserSession(updatedUser);
    setCurrentUser(updatedUser);
    setRole(updatedUser.role);
  };

  const handleLogout = () => {
    logoutSession();
    setCurrentUser(null);
    setHasEnteredPortal(false);
  };

  // Helper to open AI Assistant with preset question
  const handleOpenAiWithPrompt = (prompt?: string, report?: CropIntelligenceReport) => {
    if (report) setActiveCropReport(report);
    setAssistantInitialPrompt(prompt);
    setActiveTab('assistant');
  };

  const handleApplyDemoScenario = (scenarioId: string) => {
    setActiveTab('scanner');
  };

  // Main 8 Top-Level Navigation Tabs
  const navTabs = [
    { id: '3d-hub', label: t('nav.home'), icon: Sparkles },
    { id: 'scanner', label: t('nav.scanCrop'), icon: Camera },
    { id: 'assistant', label: t('nav.aiAssistant'), icon: Bot },
    { id: 'crop-report', label: t('nav.cropReport'), icon: FileText },
    { id: 'marketplace', label: t('nav.marketPrices'), icon: DollarSign },
    { id: 'weather', label: t('nav.weather'), icon: CloudRain },
    { id: 'knowledge-base', label: t('nav.knowledgeBase'), icon: Database },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ];

  // If user has not yet authenticated / entered from the Crop Fields Login Portal, render full-screen Portal
  if (!hasEnteredPortal) {
    return (
      <AgriBackground3D>
        <CropFieldsLoginPortal
          onEnter={handlePortalEnter}
          initialUser={currentUser}
        />
      </AgriBackground3D>
    );
  }

  return (
    <AgriBackground3D>
      <div className="min-h-screen flex flex-col text-[#dfe4e0]">
        {/* 1. Global Navigation Header with Language Selector & Demo Tour Button */}
        <Header
          currentLocation={currentLocation}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          role={role}
          onToggleRole={(newRole) => {
            setRole(newRole);
            if (currentUser) {
              const updated = { ...currentUser, role: newRole };
              handleUpdateUser(updated);
            }
          }}
          selectedLanguage={selectedLanguage}
          onSelectLanguage={handleSelectLanguage}
          onNavigateToProfile={() => setActiveTab('profile')}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenPortal={() => setHasEnteredPortal(false)}
          onOpenDemoTour={() => setIsDemoTourOpen(true)}
        />

        {/* 2. Secondary Desktop Navigation Bar */}
        <div className="hidden sm:block border-b border-[#95d4b3]/15 bg-[#0a150e]/85 backdrop-blur-xl sticky top-[65px] z-40">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'border-[#b7efc5] text-[#b7efc5] bg-[#1b4332]/35 shadow-inner'
                        : 'border-transparent text-[#8b938d] hover:text-white hover:bg-[#1c211e]/40'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#b7efc5] animate-pulse' : 'text-[#8b938d]'
                      }`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Demo Mode Launcher */}
            <button
              onClick={() => setIsDemoTourOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#854d0e]/60 hover:bg-[#854d0e] border border-[#fde047]/40 text-[#fde047] text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Judge Demo Tour</span>
            </button>
          </div>
        </div>

        {/* 3. Main Screen View Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-5 pb-20 sm:pb-8">
          {/* TAB 1: 3D Agri-Verse Flagship Hub */}
          {activeTab === '3d-hub' && (
            <FuturisticHero3D
              currentLocation={currentLocation}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onOpenCropAnalyzer={() => setActiveTab('scanner')}
              onOpenAiAssistant={handleOpenAiWithPrompt}
              onOpenMap={() => setActiveTab('map')}
              onOpenWhatCanIGrow={() => setActiveTab('what-can-i-grow')}
              onOpenMarketplace={() => setActiveTab('marketplace')}
              currentUser={currentUser}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onExploreDashboard={() => setActiveTab('scanner')}
            />
          )}

          {/* TAB 2: Scan My Crop (Live Camera + Upload + Sample Diagnostic) */}
          {activeTab === 'scanner' && (
            <AiCropAnalyzer
              currentLocation={currentLocation}
              language={selectedLanguage}
              onViewFullReport={(report) => {
                setActiveCropReport(report);
                setActiveTab('crop-report');
              }}
              onOpenAiAssistant={handleOpenAiWithPrompt}
              onOpenMarketplace={() => setActiveTab('marketplace')}
            />
          )}

          {/* TAB 3: Krishi AI Assistant (Voice + Chat + Context Grounded) */}
          {activeTab === 'assistant' && (
            <AiFarmerAssistant
              currentLocation={currentLocation}
              language={selectedLanguage}
              currentUser={currentUser}
              activeCropReport={activeCropReport}
              onOpenCropAnalyzer={() => setActiveTab('scanner')}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              initialPrompt={assistantInitialPrompt}
            />
          )}

          {/* TAB 4: Full Generated Crop Intelligence Report */}
          {activeTab === 'crop-report' && (
            <CropIntelligenceReportView
              report={activeCropReport}
              language={selectedLanguage}
              onAskAi={handleOpenAiWithPrompt}
              onOpenScanner={() => setActiveTab('scanner')}
              onOpenMarketplace={() => setActiveTab('marketplace')}
            />
          )}

          {/* TAB 5: Live Market Mandi Prices & "Sell or Wait?" Engine */}
          {activeTab === 'marketplace' && (
            <SmartPricingView
              currentLocation={currentLocation}
              language={selectedLanguage}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onOpenAiAssistant={handleOpenAiWithPrompt}
              onSelectBuyerForOffer={(buyer) => setActiveBuyerOffer(buyer)}
            />
          )}

          {/* TAB 6: Micro-Climate Weather & 7-Day Precision Forecast */}
          {activeTab === 'weather' && (
            <WeatherDashboardView
              currentLocation={currentLocation}
              language={selectedLanguage}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onAskAi={handleOpenAiWithPrompt}
            />
          )}

          {/* TAB 7: Train My Agri AI / Knowledge Base Ingestion Pipeline */}
          {activeTab === 'knowledge-base' && (
            <KnowledgeBaseTrainView
              language={selectedLanguage}
              onAskAiWithContext={handleOpenAiWithPrompt}
            />
          )}

          {/* TAB 8: Farmer Profile & Personalization Hub */}
          {activeTab === 'profile' && (
            <ProfileView
              currentLocation={currentLocation}
              language={selectedLanguage}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              role={role}
              onToggleRole={(newRole) => {
                setRole(newRole);
                if (currentUser) {
                  const updated = { ...currentUser, role: newRole };
                  handleUpdateUser(updated);
                }
              }}
              currentUser={currentUser}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
              onLogout={handleLogout}
              onOpenPortal={() => setHasEnteredPortal(false)}
              onUpdateUser={handleUpdateUser}
            />
          )}

          {/* Auxiliary Map & Crop Planning Views */}
          {activeTab === 'map' && (
            <NearbyAgriMap
              currentLocation={currentLocation}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onSelectBuyerForOffer={(buyer) => setActiveBuyerOffer(buyer)}
            />
          )}

          {activeTab === 'what-can-i-grow' && (
            <WhatCanIGrow
              currentLocation={currentLocation}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              onAskAiForCrop={handleOpenAiWithPrompt}
            />
          )}
        </main>

        {/* 4. Bottom Mobile Navigation Bar */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-[#95d4b3]/15 bg-[#0a0f0d]/95 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around shadow-2xl">
          {navTabs.slice(0, 5).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'text-[#b7efc5]' : 'text-[#8b938d]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </nav>

        {/* 5. Hackathon Guided Presentation Tour Modal */}
        <HackathonDemoTourModal
          isOpen={isDemoTourOpen}
          onClose={() => setIsDemoTourOpen(false)}
          language={selectedLanguage}
          onSelectLanguage={handleSelectLanguage}
          onNavigateToTab={(tab) => setActiveTab(tab)}
          onApplyDemoScenario={handleApplyDemoScenario}
        />

        {/* 6. 3D Spatial Auth Modal */}
        <Auth3DModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          currentUser={currentUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
          initialRole={role}
          onOpenPortal={() => setHasEnteredPortal(false)}
        />

        {/* 7. Location Selection Modal (Pan-India) */}
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          currentLocation={currentLocation}
          onLocationSelect={(newLoc) => setCurrentLocation(newLoc)}
        />

        {/* 8. Send Trade Offer Modal */}
        {activeBuyerOffer && (
          <BuyerOffersModal
            buyer={activeBuyerOffer}
            currentLocation={currentLocation}
            onClose={() => setActiveBuyerOffer(null)}
          />
        )}
      </div>
    </AgriBackground3D>
  );
}

export default App;
