import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Sparkles,
  QrCode,
  Wheat,
  Building2,
  Zap,
  Award,
  RefreshCw,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import { AuthUser } from '../types';

interface Kisan3DCardProps {
  user: AuthUser | null;
  onOpenAuth: () => void;
}

export const Kisan3DCard: React.FC<Kisan3DCardProps> = ({ user, onOpenAuth }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    glareX: 50,
    glareY: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      glareX: 50,
      glareY: 50,
    });
  };

  const isFarmer = !user || user.role === 'farmer';

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: tiltStyle.transform,
          transition: 'transform 0.12s ease-out',
        }}
        className="w-full max-w-md h-56 sm:h-60 relative cursor-pointer preserve-3d group select-none"
        id="kisan-3d-smart-card"
        title="Click to flip card in 3D"
      >
        {/* Holographic Specular Highlight Glare */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-30 transition-opacity duration-200 group-hover:opacity-100 opacity-60"
          style={{
            background: `radial-gradient(circle at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(183, 239, 197, 0.25) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`,
          }}
        />

        {/* CARD CONTAINER FLIP WRAPPER */}
        <div
          className="w-full h-full relative preserve-3d transition-transform duration-700 rounded-2xl"
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* ================= FRONT OF 3D CARD ================= */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#1c382b] via-[#10241b] to-[#07130e] border-2 border-[#b7efc5]/40 p-4 sm:p-5 text-white flex flex-col justify-between overflow-hidden shadow-2xl backface-hidden">
            {/* Hologram background foil waves */}
            <div className="absolute inset-0 hologram-sheen opacity-30 pointer-events-none" />

            {/* Top Bar: Emblems & Digital Chip */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0d1d16] border border-[#b7efc5]/50 flex items-center justify-center text-[#b7efc5] shadow-inner">
                  {isFarmer ? <Wheat className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#b7efc5] block leading-none">
                    BHARAT AGRI-NETWORK
                  </span>
                  <span className="text-xs font-bold text-white leading-tight">
                    {isFarmer ? 'Digital Kisan Card' : 'Certified Buyer Pass'}
                  </span>
                </div>
              </div>

              {/* 3D Smart Microchip */}
              <div className="w-10 h-7 rounded-md bg-gradient-to-br from-[#ffe066] via-[#d49b28] to-[#874e0d] border border-[#ffec99] p-1 shadow-md flex flex-col justify-between">
                <div className="w-full h-0.5 bg-[#4d2a07]/60" />
                <div className="flex justify-between px-0.5">
                  <div className="w-1.5 h-1.5 border border-[#4d2a07]/60 rounded-full" />
                  <div className="w-1.5 h-1.5 border border-[#4d2a07]/60 rounded-full" />
                </div>
                <div className="w-full h-0.5 bg-[#4d2a07]/60" />
              </div>
            </div>

            {/* Middle: User Info & Photo */}
            <div className="flex items-center gap-3.5 my-auto relative z-10">
              <div className="w-14 h-14 rounded-xl bg-black/40 border-2 border-[#b7efc5]/60 overflow-hidden shadow-md shrink-0">
                <img
                  src={
                    user?.avatar ||
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
                  }
                  alt={user?.name || 'Kisan User'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm sm:text-base truncate text-white">
                    {user?.name || 'Ramesh Singh Negi'}
                  </h4>
                  <ShieldCheck className="w-4 h-4 text-[#b7efc5] shrink-0" />
                </div>
                <p className="text-[11px] text-[#95d4b3] truncate">
                  {user?.role === 'buyer'
                    ? user?.companyName || 'GreenAgro Wholesale Hub'
                    : `Cultivator • ${user?.landSizeAcres || 3.5} Acres Farm`}
                </p>
                <p className="text-[10px] text-[#86af99] truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#b7efc5]" />
                  {user ? `${user.district}, ${user.state}` : 'Dehradun, Uttarakhand'}
                </p>
              </div>
            </div>

            {/* Bottom Bar: ID & Holographic Seal */}
            <div className="pt-2 border-t border-[#b7efc5]/25 flex items-center justify-between text-xs relative z-10">
              <div>
                <span className="text-[9px] text-[#86af99] uppercase tracking-wider block font-mono">
                  {isFarmer ? 'Kisan Unique ID' : 'APMC Reg Number'}
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#b7efc5]">
                  {user?.kisanId || user?.traderId || 'IN-UK-2026-8849'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] bg-[#0c1f15] border border-[#b7efc5]/40 px-2 py-0.5 rounded-md text-[#b7efc5]">
                <Sparkles className="w-3 h-3 text-[#b7efc5]" />
                <span className="font-bold">VERIFIED 2026</span>
              </div>
            </div>
          </div>

          {/* ================= BACK OF 3D CARD ================= */}
          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#0c1712] via-[#12231b] to-[#08100c] border-2 border-[#b7efc5]/40 p-4 sm:p-5 text-white flex flex-col justify-between overflow-hidden shadow-2xl rotate-y-180 backface-hidden">
            {/* Magnetic Stripe */}
            <div className="w-[calc(100%+2.5rem)] -mx-5 -mt-5 h-8 bg-black/90 border-b border-[#414844] flex items-center px-4">
              <span className="font-mono text-[9px] text-[#717973] tracking-widest">
                01001100 01001111 01000011 01000001
              </span>
            </div>

            {/* Middle: QR & Verified Credentials */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="space-y-1 text-xs">
                <div className="text-[10px] text-[#86af99] uppercase font-bold">
                  Pan-India Agri-Grid Sync
                </div>
                <div className="text-[11px] text-[#dfe4e0] font-mono">
                  Mandi Node: <span className="text-[#b7efc5]">APMC-{user?.district || 'Dehradun'}</span>
                </div>
                <div className="text-[10px] text-[#86af99]">
                  Emergency Helpline: <span className="text-white font-bold">1800-180-1551</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="w-2 h-2 rounded-full bg-[#b7efc5] animate-ping" />
                  <span className="text-[10px] text-[#b7efc5] font-semibold">Active AI Shield</span>
                </div>
              </div>

              {/* QR Code */}
              <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-lg shrink-0 flex items-center justify-center">
                <QrCode className="w-14 h-14 text-black" />
              </div>
            </div>

            {/* Bottom Bar: Action Hint */}
            <div className="pt-2 border-t border-[#414844]/50 flex items-center justify-between text-[10px] text-[#86af99]">
              <span>Authorized by Ministry of Agriculture</span>
              <span className="text-[#b7efc5] font-medium">Click to flip front ↻</span>
            </div>
          </div>
        </div>
      </div>

      {/* Helper trigger button below 3D card */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="text-xs px-3 py-1.5 rounded-full bg-[#18221c] border border-[#b7efc5]/30 text-[#95d4b3] hover:text-white hover:border-[#b7efc5] transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3 h-3 text-[#b7efc5]" />
          <span>3D Flip Card</span>
        </button>

        <button
          onClick={onOpenAuth}
          className="text-xs px-3.5 py-1.5 rounded-full btn-3d-primary font-bold flex items-center gap-1.5 shadow-md"
        >
          <Zap className="w-3 h-3" />
          <span>{user ? 'Manage Profile & Logout' : 'Login / Register 3D'}</span>
        </button>
      </div>
    </div>
  );
};
