import React, { useState, useEffect } from 'react';
import {
  User,
  MapPin,
  Building2,
  Wheat,
  ShieldCheck,
  Compass,
  Phone,
  Mail,
  CheckCircle,
  Save,
  Crosshair,
  Sparkles,
  LogOut,
  LogIn,
  Layers,
  Sprout,
} from 'lucide-react';
import { LocationState, RoleType, AuthUser, AppLanguage } from '../types';
import { Kisan3DCard } from './Kisan3DCard';
import { saveUserToDB } from '../services/authService';
import { getTranslation } from '../data/translations';

interface ProfileViewProps {
  currentLocation: LocationState;
  language: AppLanguage;
  onOpenLocationModal: () => void;
  role: RoleType;
  onToggleRole: (newRole: RoleType) => void;
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  onOpenPortal?: () => void;
  onUpdateUser?: (updatedUser: AuthUser) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentLocation,
  language,
  onOpenLocationModal,
  role,
  onToggleRole,
  currentUser,
  onOpenAuthModal,
  onLogout,
  onOpenPortal,
  onUpdateUser,
}) => {
  const t = (key: string) => getTranslation(key, language);

  const [fullName, setFullName] = useState(currentUser?.name || 'Ravi Kumar');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [email, setEmail] = useState(currentUser?.email || 'kisan@croprescuer.in');
  const [farmSize, setFarmSize] = useState<number>(currentUser?.landSizeAcres || 3.5);
  const [primaryCrops, setPrimaryCrops] = useState(
    currentUser?.primaryCrops?.join(', ') || 'Tomatoes, Potatoes, Basmati Rice, Wheat'
  );
  const [cropStage, setCropStage] = useState(currentUser?.currentCropStage || 'Fruiting');
  const [soilType, setSoilType] = useState(currentUser?.soilType || 'Alluvial Soil');
  const [farmingType, setFarmingType] = useState(currentUser?.farmingType || 'Organic / Natural');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name);
      setPhone(currentUser.phone);
      setEmail(currentUser.email);
      if (currentUser.landSizeAcres) setFarmSize(currentUser.landSizeAcres);
      if (currentUser.primaryCrops) setPrimaryCrops(currentUser.primaryCrops.join(', '));
      if (currentUser.currentCropStage) setCropStage(currentUser.currentCropStage);
      if (currentUser.soilType) setSoilType(currentUser.soilType);
      if (currentUser.farmingType) setFarmingType(currentUser.farmingType);
    }
  }, [currentUser]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const splitCrops = primaryCrops.split(',').map((c) => c.trim()).filter(Boolean);

    const updatedUser: AuthUser = {
      ...currentUser,
      name: fullName.trim() || currentUser.name,
      phone: phone.trim() || currentUser.phone,
      email: email.trim() || currentUser.email,
      landSizeAcres: Number(farmSize) || 3.5,
      primaryCrops: splitCrops.length > 0 ? splitCrops : currentUser.primaryCrops,
      currentCropStage: cropStage as any,
      soilType: soilType as any,
      farmingType: farmingType as any,
      state: currentLocation.state,
      district: currentLocation.district,
      cityVillage: currentLocation.cityVillage,
      pincode: currentLocation.pincode,
      updatedAt: new Date().toISOString(),
    };

    saveUserToDB(updatedUser);
    onUpdateUser?.(updatedUser);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 3D Digital Identity Smart Card Showcase */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#b7efc5]/25 card-3d-shadow relative overflow-hidden bg-gradient-to-b from-[#18231c]/90 to-[#0e1612]/95 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332] text-[#b7efc5] text-[11px] font-bold border border-[#b7efc5]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D HOLOGRAPHIC DIGITAL ID</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
              {currentUser ? currentUser.name : 'Digital Agri Identity'}
            </h2>
            <p className="text-xs text-[#95d4b3]">
              Hover and move your mouse to explore the 3D depth. Click to flip and scan your APMC-linked QR code.
            </p>
            {currentUser && (
              <p className="text-[11px] text-[#86af99] font-mono">
                User ID: <span className="text-[#b7efc5]">{currentUser.id}</span>
              </p>
            )}

            <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              {currentUser ? (
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-4 py-2 rounded-xl bg-[#381816] hover:bg-[#521e1a] text-[#ffb4ab] border border-[#ffb4ab]/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('header.logout')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 rounded-xl btn-3d-primary text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('header.login')}</span>
                </button>
              )}
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-center">
            <Kisan3DCard user={currentUser} onOpenAuth={onOpenAuthModal} />
          </div>
        </div>
      </div>

      {/* Form Settings */}
      <form onSubmit={handleSave} className="glass-card p-6 rounded-3xl border border-[#95d4b3]/25 space-y-5 text-xs">
        <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3">
          <h3 className="text-base font-bold text-white font-['Montserrat'] flex items-center gap-2">
            <User className="w-4 h-4 text-[#b7efc5]" />
            <span>{t('profile.title')}</span>
          </h3>
          <span className="text-[10px] text-[#95d4b3] font-mono">AI Personalization Active</span>
        </div>

        {/* Location Section */}
        <div className="bg-[#14231b] p-4 rounded-2xl border border-[#b7efc5]/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold">
              <MapPin className="w-4 h-4 text-[#b7efc5]" />
              <span>Registered Farm Location</span>
            </div>
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="px-3 py-1.5 rounded-lg bg-[#1b4332] hover:bg-[#2d6a4f] text-[#b7efc5] font-bold text-xs border border-[#b7efc5]/30 flex items-center gap-1 transition-all cursor-pointer"
            >
              <Crosshair className="w-3 h-3" />
              <span>Update Location</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[#c1c8c2]">
            <div>
              <span className="block text-[10px] text-[#86af99] font-medium">State / UT</span>
              <strong className="text-white text-xs">{currentLocation.state}</strong>
            </div>
            <div>
              <span className="block text-[10px] text-[#86af99] font-medium">District</span>
              <strong className="text-white text-xs">{currentLocation.district}</strong>
            </div>
            <div>
              <span className="block text-[10px] text-[#86af99] font-medium">City / Village</span>
              <strong className="text-white text-xs">{currentLocation.cityVillage || 'Niranjanpur'}</strong>
            </div>
            <div>
              <span className="block text-[10px] text-[#86af99] font-medium">PIN Code</span>
              <strong className="text-white text-xs">{currentLocation.pincode}</strong>
            </div>
          </div>
        </div>

        {/* Name, Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#c1c8c2] mb-1 font-semibold">{t('profile.name')}</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#c1c8c2] mb-1 font-semibold">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#c1c8c2] mb-1 font-semibold">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
            />
          </div>
        </div>

        {/* Agronomic Personalization Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[#c1c8c2] mb-1 font-semibold">{t('profile.farmSize')}</label>
            <input
              type="number"
              step="0.5"
              value={farmSize}
              onChange={(e) => setFarmSize(Number(e.target.value) || 0)}
              className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-mono focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#c1c8c2] mb-1 font-semibold">{t('profile.soilType')}</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none"
            >
              <option>Alluvial Soil</option>
              <option>Black Cotton Soil</option>
              <option>Red & Yellow Soil</option>
              <option>Clay Loam</option>
              <option>Sandy Loam</option>
            </select>
          </div>

          <div>
            <label className="block text-[#c1c8c2] mb-1 font-semibold">{t('profile.cropStage')}</label>
            <select
              value={cropStage}
              onChange={(e) => setCropStage(e.target.value)}
              className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none"
            >
              <option>Seedling</option>
              <option>Vegetative</option>
              <option>Flowering</option>
              <option>Fruiting</option>
              <option>Harvest Ready</option>
            </select>
          </div>

          <div>
            <label className="block text-[#c1c8c2] mb-1 font-semibold">{t('profile.farmingType')}</label>
            <select
              value={farmingType}
              onChange={(e) => setFarmingType(e.target.value)}
              className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none"
            >
              <option>Organic / Natural</option>
              <option>Conventional</option>
              <option>Precision / Tech</option>
              <option>Hydroponic / Protected</option>
            </select>
          </div>
        </div>

        {/* Primary Crops Input */}
        <div>
          <label className="block text-[#c1c8c2] mb-1 font-semibold">{t('profile.cropsGrown')}</label>
          <input
            type="text"
            value={primaryCrops}
            onChange={(e) => setPrimaryCrops(e.target.value)}
            placeholder="e.g. Tomatoes, Potatoes, Basmati Rice, Wheat"
            className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none"
          />
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-[#1b4332] text-[#b7efc5] text-xs font-semibold flex items-center gap-2 border border-[#b7efc5]/40 animate-in fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{t('profile.saved')}</span>
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          {onOpenPortal && (
            <button
              type="button"
              onClick={onOpenPortal}
              className="px-4 py-2.5 rounded-xl btn-3d-dark text-[#b7efc5] font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wheat className="w-4 h-4 text-[#b7efc5]" />
              <span>Switch / Reopen Login Portal</span>
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl btn-3d-primary font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t('profile.save')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
