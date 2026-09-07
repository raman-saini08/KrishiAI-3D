import React, { useState, useMemo } from 'react';
import {
  Store,
  Filter,
  Search,
  MapPin,
  Sparkles,
  Plus,
  ShieldCheck,
  Phone,
  Send,
  TrendingUp,
  Tag,
  Scale,
  Calendar,
  X,
  Check,
} from 'lucide-react';
import {
  ALL_INDIA_CROP_LISTINGS,
  calculateDistanceKm,
  estimateLocationPrice,
} from '../data/indiaLocations';
import { CropListing, LocationState, QualityGrade, RoleType, AuthUser } from '../types';
import { getUserListings, saveUserListing } from '../services/userDataService';

interface MarketplaceViewProps {
  currentLocation: LocationState;
  role: RoleType;
  currentUser?: AuthUser | null;
  onSelectBuyerForOffer?: (buyer: any) => void;
  onOpenAiAssistant?: (prompt: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  currentLocation,
  role,
  currentUser,
  onSelectBuyerForOffer,
  onOpenAiAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<'nearby' | 'recommended' | 'all-india'>('nearby');
  const [distanceRadius, setDistanceRadius] = useState<
    '10' | '25' | '50' | '100' | 'same-district' | 'same-state' | 'all-india'
  >('100');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User created listings + default dataset
  const [listings, setListings] = useState<CropListing[]>(() => {
    const userCustom = currentUser?.id ? getUserListings(currentUser.id) : [];
    return [...userCustom, ...ALL_INDIA_CROP_LISTINGS];
  });

  // New Listing Modal State
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCropType, setNewCropType] = useState('Tomatoes');
  const [newVariety, setNewVariety] = useState('Himsona Hybrid Red');
  const [newGrade, setNewGrade] = useState<QualityGrade>('Grade A');
  const [newQuantityKg, setNewQuantityKg] = useState<number>(500);
  const [newPricePerKg, setNewPricePerKg] = useState<number>(35);
  const [newDescription, setNewDescription] = useState('AI quality verified field harvest.');

  // Crop Filter Options
  const cropFilters = [
    'All',
    'Tomatoes',
    'Potatoes',
    'Onions',
    'Basmati Rice',
    'Apples',
    'Red Chili',
  ];

  // Calculate distance for each listing from current location
  const listingsWithDistance = useMemo(() => {
    return listings.map((l) => {
      const dist = calculateDistanceKm(currentLocation.lat, currentLocation.lng, l.lat, l.lng);
      return { ...l, distanceKm: dist };
    });
  }, [listings, currentLocation]);

  // Filter listings based on active Tab, Radius, Crop filter, and Search Query
  const filteredListings = useMemo(() => {
    let result = [...listingsWithDistance];

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.cropType.toLowerCase().includes(q) ||
          item.district.toLowerCase().includes(q) ||
          item.state.toLowerCase().includes(q) ||
          item.farmerName.toLowerCase().includes(q),
      );
    }

    // Crop Filter
    if (selectedCropFilter !== 'All') {
      result = result.filter((item) =>
        item.cropType.toLowerCase().includes(selectedCropFilter.toLowerCase()),
      );
    }

    // Tab Filters
    if (activeTab === 'nearby') {
      if (distanceRadius === '10') result = result.filter((item) => item.distanceKm <= 10);
      else if (distanceRadius === '25') result = result.filter((item) => item.distanceKm <= 25);
      else if (distanceRadius === '50') result = result.filter((item) => item.distanceKm <= 50);
      else if (distanceRadius === '100') result = result.filter((item) => item.distanceKm <= 100);
      else if (distanceRadius === 'same-district') {
        result = result.filter((item) => item.district.toLowerCase() === currentLocation.district.toLowerCase());
      } else if (distanceRadius === 'same-state') {
        result = result.filter((item) => item.state.toLowerCase() === currentLocation.state.toLowerCase());
      }
      result.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (activeTab === 'recommended') {
      // Recommended: Grade A first, then nearest
      result.sort((a, b) => {
        if (a.grade === 'Grade A' && b.grade !== 'Grade A') return -1;
        if (b.grade === 'Grade A' && a.grade !== 'Grade A') return 1;
        return a.distanceKm - b.distanceKm;
      });
    }

    return result;
  }, [listingsWithDistance, activeTab, distanceRadius, selectedCropFilter, searchQuery, currentLocation]);

  // Handle Add New Listing
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: CropListing = {
      id: `listing-${Date.now()}`,
      title: newTitle || `${newCropType} (${newGrade})`,
      cropType: newCropType,
      variety: newVariety,
      grade: newGrade,
      quantityKg: newQuantityKg,
      pricePerKg: newPricePerKg,
      cityVillage: currentLocation.cityVillage || currentLocation.district,
      district: currentLocation.district,
      state: currentLocation.state,
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      farmerName: currentUser ? `${currentUser.name} (You)` : 'You (Verified Farmer)',
      farmerPhone: currentUser?.phone || '+91 98765 43210',
      farmerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      imageUrl:
        newCropType === 'Tomatoes'
          ? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80'
          : newCropType === 'Potatoes'
          ? 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80'
          : 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
      harvestDate: 'Just Harvested',
      diseaseStatus: 'Healthy',
      aiVerified: true,
      description: newDescription,
    };

    if (currentUser?.id) {
      saveUserListing(currentUser.id, newListing);
    }
    setListings([newListing, ...listings]);
    setIsNewListingModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header & Listing Trigger */}
      <div className="glass-card p-5 sm:p-6 rounded-2xl border border-[#b7efc5]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1b4332] text-[#b7efc5] flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
              Pan-India Agricultural Marketplace
            </h1>
          </div>
          <p className="text-xs text-[#95d4b3] mt-1">
            Direct farmer-to-buyer trade across India • Live location distance sorting from <strong className="text-white">{currentLocation.district}, {currentLocation.state}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewListingModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#b7efc5] hover:bg-[#a5d0b9] text-[#0a0f0d] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            id="list-harvest-btn"
          >
            <Plus className="w-4 h-4" />
            List My Harvest
          </button>
        </div>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="glass-card rounded-2xl p-4 border border-[#95d4b3]/15 space-y-3">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#414844]/40 pb-3">
          <div className="flex items-center gap-2">
            {[
              { id: 'nearby', label: '📍 Nearby Produce' },
              { id: 'recommended', label: '⭐ AI Recommended' },
              { id: 'all-india', label: '🇮🇳 All India Grid' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/40 shadow-sm'
                    : 'text-[#c1c8c2] hover:text-white hover:bg-[#1c211e]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#86af99]" />
            <input
              type="text"
              placeholder="Search crop, state, or farmer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#181d1a] border border-[#414844] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-[#717973] focus:outline-none focus:border-[#b7efc5]"
            />
          </div>
        </div>

        {/* Distance Radius Filter (when in Nearby mode) */}
        {activeTab === 'nearby' && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
            <span className="text-[11px] font-semibold text-[#86af99] mr-1 shrink-0">Radius:</span>
            {[
              { id: '10', label: '10 km' },
              { id: '25', label: '25 km' },
              { id: '50', label: '50 km' },
              { id: '100', label: '100 km' },
              { id: 'same-district', label: `In ${currentLocation.district}` },
              { id: 'same-state', label: `In ${currentLocation.state}` },
              { id: 'all-india', label: 'All India' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setDistanceRadius(r.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  distanceRadius === r.id
                    ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 font-semibold'
                    : 'bg-[#181d1a] text-[#c1c8c2] border border-[#414844]/40 hover:border-[#95d4b3]/40'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}

        {/* Crop Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar">
          <span className="text-[11px] font-semibold text-[#86af99] mr-1 shrink-0">Crop:</span>
          {cropFilters.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCropFilter(crop)}
              className={`px-3 py-1 rounded-lg text-xs transition-all whitespace-nowrap ${
                selectedCropFilter === crop
                  ? 'bg-[#b7efc5] text-[#0a0f0d] font-bold shadow-sm'
                  : 'bg-[#1c211e] text-[#dfe4e0] border border-[#414844]/50 hover:border-[#b7efc5]/30'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.length === 0 ? (
          <div className="col-span-full p-12 text-center glass-card rounded-2xl border border-dashed border-[#414844]">
            <Store className="w-10 h-10 text-[#8b938d] mx-auto mb-2" />
            <h3 className="text-base font-bold text-white">No crop listings match your criteria</h3>
            <p className="text-xs text-[#86af99] mt-1">
              Try adjusting your distance radius or crop filter to explore more results.
            </p>
            <button
              onClick={() => {
                setSelectedCropFilter('All');
                setDistanceRadius('all-india');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#1b4332] text-[#b7efc5] text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="glass-card rounded-2xl overflow-hidden border border-[#95d4b3]/15 hover:border-[#b7efc5]/50 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-black/40">
                  <img
                    src={listing.imageUrl}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Quality Grade Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-md ${
                        listing.grade === 'Grade A'
                          ? 'bg-[#1b4332]/90 text-[#b7efc5] border border-[#b7efc5]/40 backdrop-blur-md'
                          : 'bg-[#181d1a]/90 text-[#ffdad6] border border-[#ffb4ab]/40 backdrop-blur-md'
                      }`}
                    >
                      {listing.grade}
                    </span>
                  </div>

                  {/* Distance Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0a0f0d]/80 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1 border border-white/10">
                      <MapPin className="w-3 h-3 text-[#b7efc5]" />
                      {listing.distanceKm} km away
                    </span>
                  </div>

                  {listing.aiVerified && (
                    <div className="absolute bottom-2 left-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#12533a]/80 text-[#b7efc5] text-[10px] font-semibold flex items-center gap-1 border border-[#b7efc5]/30 backdrop-blur-md">
                        <ShieldCheck className="w-3 h-3" /> AI Quality Scanned
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2.5">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-[#b7efc5] transition-colors truncate">
                      {listing.title}
                    </h3>
                    <p className="text-xs text-[#95d4b3] font-medium">{listing.variety}</p>
                  </div>

                  {/* Location Info */}
                  <div className="text-xs text-[#c1c8c2] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#86af99] shrink-0" />
                    <span className="truncate">
                      {listing.cityVillage}, {listing.district}, {listing.state}
                    </span>
                  </div>

                  {/* Quantity and Price Row */}
                  <div className="p-2.5 rounded-xl bg-[#181d1a] border border-[#414844]/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#86af99] uppercase block font-semibold">
                        Available Quantity
                      </span>
                      <span className="text-sm font-bold text-white">
                        {listing.quantityKg} kg
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#86af99] uppercase block font-semibold">
                        Asking Price
                      </span>
                      <span className="text-base font-bold text-[#b7efc5] font-['Montserrat']">
                        ₹{listing.pricePerKg} <span className="text-xs text-white">/ kg</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#8b938d] line-clamp-2">{listing.description}</p>
                </div>
              </div>

              {/* Card Footer: Farmer Contact & Action */}
              <div className="p-4 pt-0 border-t border-[#414844]/30 mt-2">
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={listing.farmerAvatar}
                      alt={listing.farmerName}
                      className="w-7 h-7 rounded-full object-cover border border-[#b7efc5]/30"
                    />
                    <div className="text-xs truncate max-w-[110px]">
                      <span className="font-semibold text-white truncate block">
                        {listing.farmerName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:${listing.farmerPhone}`}
                      className="p-2 rounded-xl bg-[#1c211e] hover:bg-[#262b29] text-[#95d4b3] border border-[#414844] transition-colors"
                      title="Call Farmer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() =>
                        onSelectBuyerForOffer?.({
                          name: listing.farmerName,
                          companyName: `${listing.cropType} Producer`,
                          cropsWanted: [listing.cropType],
                          expectedPricePerKg: listing.pricePerKg,
                          requiredQuantityKg: listing.quantityKg,
                          district: listing.district,
                          state: listing.state,
                          distanceKm: listing.distanceKm,
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-[#1b4332] hover:bg-[#2d6a4f] text-[#b7efc5] text-xs font-bold border border-[#b7efc5]/30 transition-all flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      Trade Offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 30-DAY PRICE TREND & AI MARKET PREDICTION */}
      <section className="glass-card rounded-2xl p-5 sm:p-6 border border-[#95d4b3]/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#b7efc5]" />
              <h3 className="font-bold text-base sm:text-lg text-white font-['Montserrat']">
                Regional Price Trend & 14-Day AI Forecast
              </h3>
            </div>
            <p className="text-xs text-[#95d4b3]">
              Based on historical APMC modal arrivals in <strong className="text-white">{currentLocation.district}, {currentLocation.state}</strong>
            </p>
          </div>

          <span className="text-xs text-[#b7efc5] font-semibold bg-[#1b4332] px-3 py-1 rounded-xl border border-[#b7efc5]/30 self-start sm:self-auto">
            Forecast: Bullish (+6.8% Expected)
          </span>
        </div>

        {/* Interactive SVG Trend Visualizer */}
        <div className="h-44 w-full bg-[#141a17] rounded-xl p-4 border border-[#414844]/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#86af99]">
            <span>₹40/kg (Peak)</span>
            <span>Historical Mandi Data & AI Projection</span>
            <span>₹25/kg (Low)</span>
          </div>

          <div className="relative h-24 w-full">
            <svg className="w-full h-full text-[#b7efc5]" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#b7efc5" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#b7efc5" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Shaded Area */}
              <path
                d="M0,80 Q50,75 100,60 T200,45 T300,30 T400,15 L400,100 L0,100 Z"
                fill="url(#priceGradient)"
              />
              {/* Curve Line */}
              <path
                d="M0,80 Q50,75 100,60 T200,45 T300,30 T400,15"
                fill="none"
                stroke="#b7efc5"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Historical vs Forecast divider point */}
              <circle cx="280" cy="33" r="5" fill="#b7efc5" stroke="#0a0f0d" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#86af99] border-t border-[#414844]/30 pt-1">
            <span>2 Weeks Ago</span>
            <span>Last Week</span>
            <span className="text-[#b7efc5] font-bold">Today (₹35/kg)</span>
            <span className="text-[#a5d0b9]">Next Week (AI Est: ₹37.50)</span>
          </div>
        </div>
      </section>

      {/* CREATE HARVEST LISTING MODAL */}
      {isNewListingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-modal rounded-2xl border border-[#b7efc5]/30 shadow-2xl p-6 text-[#dfe4e0] max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 border-b border-[#414844]">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#b7efc5]" />
                <h3 className="text-base font-bold text-white font-['Montserrat']">
                  List Harvest for Sale
                </h3>
              </div>
              <button
                onClick={() => setIsNewListingModalOpen(false)}
                className="p-1 rounded-full text-[#8b938d] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-[#c1c8c2] mb-1">Listing Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Himsona Tomatoes (Grade A)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#c1c8c2] mb-1">Commodity</label>
                  <select
                    value={newCropType}
                    onChange={(e) => setNewCropType(e.target.value)}
                    className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                  >
                    <option value="Tomatoes">Tomatoes</option>
                    <option value="Potatoes">Potatoes</option>
                    <option value="Onions">Onions</option>
                    <option value="Basmati Rice">Basmati Rice</option>
                    <option value="Apples">Apples</option>
                    <option value="Red Chili">Red Chili</option>
                    <option value="Wheat">Wheat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#c1c8c2] mb-1">Quality Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value as QualityGrade)}
                    className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                  >
                    <option value="Grade A">Grade A (Premium)</option>
                    <option value="Grade B">Grade B (Standard)</option>
                    <option value="Grade C">Grade C (Industrial/Discounted)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#c1c8c2] mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    min={50}
                    required
                    value={newQuantityKg}
                    onChange={(e) => setNewQuantityKg(Number(e.target.value))}
                    className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                  />
                </div>

                <div>
                  <label className="block text-[#c1c8c2] mb-1">Asking Price (₹ / kg)</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newPricePerKg}
                    onChange={(e) => setNewPricePerKg(Number(e.target.value))}
                    className="w-full bg-[#181d1a] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                  />
                </div>
              </div>

              {/* Attached Location */}
              <div className="p-3 rounded-xl bg-[#181d1a] border border-[#b7efc5]/20 text-xs text-[#95d4b3]">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <MapPin className="w-3.5 h-3.5 text-[#b7efc5]" />
                  <span>Auto-Attached Farm Location:</span>
                </div>
                <div className="mt-1 text-[#dfe4e0]">
                  {currentLocation.cityVillage}, {currentLocation.district}, {currentLocation.state} ({currentLocation.pincode})
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewListingModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#414844] text-[#c1c8c2] hover:bg-[#262b29]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#b7efc5] text-[#0a0f0d] font-bold hover:bg-[#a5d0b9] shadow-md"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
