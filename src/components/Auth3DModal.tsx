import React, { useState, useRef } from 'react';
import {
  X,
  Lock,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Building2,
  Wheat,
  Fingerprint,
  QrCode,
  MapPin,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Zap,
  AlertCircle,
} from 'lucide-react';
import { AuthUser, RoleType, LocationState } from '../types';
import {
  loginWithCredentials,
  registerUser,
  authenticateWithGoogle,
  loginAsDemoUser,
  logoutSession,
} from '../services/authService';

interface Auth3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser | null;
  onLogin: (user: AuthUser, location?: LocationState) => void;
  onLogout: () => void;
  initialRole?: RoleType;
  onOpenPortal?: () => void;
}

export const Auth3DModal: React.FC<Auth3DModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  initialRole = 'farmer',
  onOpenPortal,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'otp'>('signin');
  const [role, setRole] = useState<RoleType>(initialRole);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [district, setDistrict] = useState('Dehradun');
  const [state, setState] = useState('Uttarakhand');
  const [cityVillage, setCityVillage] = useState('Niranjanpur');
  const [showPassword, setShowPassword] = useState(false);
  const [otpValue, setOtpValue] = useState(['4', '8', '2', '9']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFlippedToBack, setIsFlippedToBack] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  // 3D Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
    glareX: 50,
    glareY: 50,
  });

  if (!isOpen) return null;

  // Handle Mouse Move for Dynamic 3D Spatial Tilt & Light Reflection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      glareX,
      glareY,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)',
      glareX: 50,
      glareY: 50,
    });
  };

  // Explicit Demo Mode Login
  const handleQuickDemoLogin = (type: 'farmer' | 'buyer') => {
    setIsLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      const { user, location } = loginAsDemoUser(type);
      onLogin(user, location);
      setIsLoading(false);
      onClose();
    }, 400);
  };

  // Real Form Submission Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      try {
        if (authMode === 'signup') {
          if (!fullName.trim()) {
            setErrorMessage('Please enter your full name.');
            setIsLoading(false);
            return;
          }
          if (!phoneOrEmail.trim()) {
            setErrorMessage('Please enter your phone number or email.');
            setIsLoading(false);
            return;
          }

          const isPhone = !phoneOrEmail.includes('@');
          const { user, location } = registerUser({
            name: fullName.trim(),
            email: !isPhone ? phoneOrEmail.trim() : undefined,
            phone: isPhone ? phoneOrEmail.trim() : '+91 98765 43210',
            password: password || 'kisan2026',
            role,
            state: state || 'Uttarakhand',
            district: district || 'Dehradun',
            cityVillage: cityVillage || 'Local Village',
            pincode: '248001',
            farmSizeAcres: role === 'farmer' ? 3.5 : undefined,
          });

          onLogin(user, location);
          setIsLoading(false);
          onClose();
        } else {
          // Sign In or OTP
          if (!phoneOrEmail.trim()) {
            setErrorMessage('Please enter your phone number or email.');
            setIsLoading(false);
            return;
          }

          const result = loginWithCredentials(phoneOrEmail, password, role);
          if ('error' in result) {
            setErrorMessage(result.error);
            setIsLoading(false);
            return;
          }

          onLogin(result.user, result.location);
          setIsLoading(false);
          onClose();
        }
      } catch (err: any) {
        setErrorMessage('Authentication failed. Please check your credentials.');
        setIsLoading(false);
      }
    }, 450);
  };

  const handlePerformLogout = () => {
    logoutSession();
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Background Animated Ambient 3D Glow Orbs */}
      <div className="absolute w-96 h-96 rounded-full bg-[#1b4332]/40 blur-3xl pointer-events-none -top-10 -left-10 animate-pulse" />
      <div className="absolute w-96 h-96 rounded-full bg-[#b7efc5]/15 blur-3xl pointer-events-none -bottom-10 -right-10 animate-pulse" />

      {/* Main 3D Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: tiltStyle.transform,
          transition: 'transform 0.12s ease-out',
        }}
        className="relative w-full max-w-lg preserve-3d perspective-1500"
      >
        {/* Floating 3D Top Badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 translate-z-40">
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1b4332] via-[#2d6a4f] to-[#1b4332] border border-[#b7efc5]/50 text-[#b7efc5] text-xs font-bold shadow-xl flex items-center gap-1.5 backdrop-blur-md animate-float-badge">
            <Sparkles className="w-3.5 h-3.5 text-[#b7efc5]" />
            <span>3D SECURE AGRI-ID AUTHENTICATION</span>
          </div>
        </div>

        {/* 3D Glass Card Body */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#18221c]/95 via-[#111714]/95 to-[#0c120f]/98 border border-[#b7efc5]/30 p-6 sm:p-8 text-[#dfe4e0] card-3d-glow-primary overflow-hidden backdrop-blur-2xl">
          {/* Dynamic Glare / Specular Highlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
            style={{
              background: `radial-gradient(circle at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(183, 239, 197, 0.15) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)`,
            }}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 p-2 rounded-full bg-[#1c2420] text-[#8b938d] hover:text-white hover:bg-[#28352e] border border-[#414844] transition-all hover:rotate-90"
            id="close-3d-auth-modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* LOGGED IN USER STATE: 3D DIGITAL KISAN SMART CARD & LOGOUT */}
          {currentUser ? (
            <div className="space-y-6 pt-2">
              <div className="text-center">
                <span className="text-xs text-[#86af99] uppercase tracking-wider font-semibold">
                  Active Session
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat'] mt-0.5">
                  Welcome, {currentUser.name}
                </h2>
                <p className="text-xs text-[#b7efc5] mt-0.5">
                  ID: <span className="font-mono">{currentUser.id}</span>
                </p>
              </div>

              {/* Holographic 3D Kisan / Trader Smart Card */}
              <div
                onClick={() => setIsFlippedToBack(!isFlippedToBack)}
                className="relative cursor-pointer group preserve-3d transition-transform duration-700"
                style={{
                  transform: isFlippedToBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                title="Click to flip card"
              >
                {/* Front of Card */}
                <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-[#1b4332] via-[#0d2218] to-[#08150f] border-2 border-[#b7efc5]/40 p-5 text-white flex flex-col justify-between overflow-hidden shadow-2xl relative backface-hidden">
                  <div className="absolute inset-0 hologram-sheen opacity-25 pointer-events-none" />

                  {/* Card Header */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#07130e] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5]">
                        {currentUser.role === 'farmer' ? <Wheat className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#b7efc5] block leading-tight">
                          BHARAT AGRI-PASS
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {currentUser.role === 'farmer' ? 'Verified Kisan ID' : 'Certified Buyer ID'}
                        </span>
                      </div>
                    </div>

                    {/* Gold Microchip */}
                    <div className="w-9 h-7 rounded bg-gradient-to-br from-[#ffe066] to-[#b38600] border border-[#fff3bf] p-1 shadow-inner flex flex-col justify-between">
                      <div className="w-full h-0.5 bg-black/40" />
                      <div className="w-full h-0.5 bg-black/40" />
                    </div>
                  </div>

                  {/* Card Center: Info */}
                  <div className="flex items-center gap-4 relative z-10 my-auto">
                    <div className="w-14 h-14 rounded-xl bg-black/40 border-2 border-[#b7efc5]/60 overflow-hidden shadow-md shrink-0">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-base truncate text-white">{currentUser.name}</h4>
                      <p className="text-xs text-[#95d4b3] truncate">
                        {currentUser.role === 'buyer'
                          ? currentUser.companyName || 'Agri-Trade Enterprise'
                          : `Cultivator • ${currentUser.landSizeAcres || 3.5} Acres`}
                      </p>
                      <p className="text-[11px] text-[#86af99] truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#b7efc5]" />
                        {currentUser.district}, {currentUser.state}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom: ID Number */}
                  <div className="pt-2 border-t border-[#b7efc5]/20 flex items-center justify-between text-xs relative z-10">
                    <div>
                      <span className="text-[9px] text-[#86af99] uppercase tracking-wider block font-mono">
                        Unique Identity
                      </span>
                      <span className="font-mono text-sm font-bold tracking-widest text-[#b7efc5]">
                        {currentUser.kisanId || currentUser.traderId || 'IN-UK-2026-8849'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] bg-[#07130e] border border-[#b7efc5]/40 px-2 py-0.5 rounded text-[#b7efc5]">
                      <Sparkles className="w-3 h-3 text-[#b7efc5]" />
                      <span>CLICK TO FLIP</span>
                    </div>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 w-full h-52 rounded-2xl bg-gradient-to-br from-[#0a1410] via-[#102219] to-[#070e0b] border-2 border-[#b7efc5]/40 p-5 text-white flex flex-col justify-between overflow-hidden shadow-2xl rotate-y-180 backface-hidden">
                  <div className="w-[calc(100%+2.5rem)] -mx-5 -mt-5 h-8 bg-black/90 border-b border-[#414844] flex items-center px-4">
                    <span className="font-mono text-[9px] text-[#717973] tracking-widest">
                      DIGITAL SIGNATURE VALID 2026 • AI AGRI-NETWORK
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div className="space-y-1 text-xs">
                      <div className="text-[10px] text-[#86af99] uppercase">Mandi Sync Point</div>
                      <div className="font-semibold text-white">APMC {currentUser.district}</div>
                      <div className="text-[10px] text-[#86af99] pt-1">Helpline: 1800-180-1551</div>
                    </div>
                    <div className="w-16 h-16 bg-white p-1 rounded-xl shadow-lg shrink-0 flex items-center justify-center">
                      <QrCode className="w-14 h-14 text-black" />
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-[#86af99] pt-2 border-t border-[#414844]/50">
                    Emergency Kisan Support • 24/7 AI Protected
                  </div>
                </div>
              </div>

              {/* User Actions */}
              <div className="space-y-3 pt-2">
                {!logoutConfirm ? (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setLogoutConfirm(true)}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#2a1b1b] hover:bg-[#3d2424] border border-[#ff897d]/30 text-[#ffb4ab] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                      id="auth-logout-btn"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out Session</span>
                    </button>
                    {onOpenPortal && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenPortal();
                        }}
                        className="py-3 px-4 rounded-xl bg-[#1c2621] hover:bg-[#25352c] border border-[#b7efc5]/30 text-[#b7efc5] text-xs font-semibold transition-all"
                      >
                        Switch Account
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#2a1b1b]/80 border border-[#ff897d]/50 text-center space-y-3">
                    <p className="text-xs text-[#ffdad6] font-medium">
                      Are you sure you want to log out from <strong>{currentUser.name}</strong>?
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setLogoutConfirm(false)}
                        className="flex-1 py-2 rounded-xl bg-[#1c2420] text-xs text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handlePerformLogout}
                        className="flex-1 py-2 rounded-xl bg-[#ba1a1a] text-xs font-bold text-white shadow-lg"
                        id="confirm-logout-btn"
                      >
                        Yes, Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* NON-LOGGED IN STATE: 3D LOGIN & REGISTRATION */
            <div className="space-y-5 pt-2">
              <div className="text-center space-y-1">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1b4332] text-[#b7efc5] font-semibold uppercase tracking-wider">
                  Biometric & Spatial Auth
                </span>
                <h3 className="text-xl font-bold text-white font-['Montserrat']">
                  {authMode === 'signup' ? 'Create Digital Kisan Account' : 'Sign In to Crop Rescuer'}
                </h3>
              </div>

              {/* Segmented Role Switcher */}
              <div className="flex p-1 rounded-2xl bg-[#141a17] border border-[#414844]">
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    role === 'farmer'
                      ? 'bg-[#1b4332] text-[#b7efc5] shadow-md border border-[#b7efc5]/30'
                      : 'text-[#8b938d] hover:text-white'
                  }`}
                >
                  <Wheat className="w-3.5 h-3.5" />
                  <span>Farmer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    role === 'buyer'
                      ? 'bg-[#1b4332] text-[#b7efc5] shadow-md border border-[#b7efc5]/30'
                      : 'text-[#8b938d] hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Buyer / Trader</span>
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-[#2a1b1b] border border-[#ff897d]/50 text-[#ffb4ab] text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Fast 1-Click Demo Profiles */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-[#86af99]">
                  <span>🚀 Instant Demo Profiles:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('farmer')}
                    disabled={isLoading}
                    className="p-2.5 rounded-xl bg-[#1c2621] hover:bg-[#25352c] border border-[#414844] hover:border-[#b7efc5]/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-[#b7efc5]">
                      🌾 Demo Farmer
                    </div>
                    <div className="text-[10px] text-[#86af99]">Ravi Kumar (Dehradun)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('buyer')}
                    disabled={isLoading}
                    className="p-2.5 rounded-xl bg-[#1c2621] hover:bg-[#25352c] border border-[#414844] hover:border-[#b7efc5]/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-[#b7efc5]">
                      🏢 Demo Buyer
                    </div>
                    <div className="text-[10px] text-[#86af99]">Aman Aggarwal (Delhi)</div>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              {authMode === 'otp' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center space-y-1">
                    <p className="text-xs text-[#c1c8c2]">
                      Enter 4-digit code sent to <strong className="text-white">{phoneOrEmail}</strong>
                    </p>
                    <div className="flex justify-center gap-3 pt-2">
                      {otpValue.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newOtp = [...otpValue];
                            newOtp[idx] = e.target.value;
                            setOtpValue(newOtp);
                          }}
                          className="w-12 h-12 rounded-xl bg-[#141a17] border-2 border-[#b7efc5]/50 text-center font-bold text-lg text-white focus:outline-none focus:border-[#b7efc5] shadow-inner"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl btn-3d-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 mt-4"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Fingerprint className="w-4 h-4" />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="text-xs text-[#86af99] hover:text-white"
                    >
                      ← Back to Password Login
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  {authMode === 'signup' && (
                    <div>
                      <label className="block text-[#c1c8c2] mb-1 font-semibold">
                        {role === 'farmer' ? 'Farmer Full Name' : 'Company / Trader Name'}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3 text-[#86af99]" />
                        <input
                          type="text"
                          required
                          placeholder={role === 'farmer' ? 'e.g. Ananya Sharma' : 'e.g. GreenAgro Mandi Hub'}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#141a17] border border-[#414844] rounded-xl pl-9 pr-3 py-2.5 text-white placeholder:text-[#717973] focus:outline-none focus:border-[#b7efc5]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[#c1c8c2] mb-1 font-semibold">
                      Mobile Number or Email
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-3 text-[#86af99]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 9876543210 or ananya@gmail.com"
                        value={phoneOrEmail}
                        onChange={(e) => setPhoneOrEmail(e.target.value)}
                        className="w-full bg-[#141a17] border border-[#414844] rounded-xl pl-9 pr-3 py-2.5 text-white placeholder:text-[#717973] focus:outline-none focus:border-[#b7efc5]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1 font-semibold">
                      <label className="text-[#c1c8c2]">Security Password / PIN</label>
                      {authMode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => setAuthMode('otp')}
                          className="text-[#b7efc5] text-[11px] hover:underline"
                        >
                          Login with OTP instead
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-3 text-[#86af99]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#141a17] border border-[#414844] rounded-xl pl-9 pr-10 py-2.5 text-white focus:outline-none focus:border-[#b7efc5]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-[#86af99] hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {authMode === 'signup' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#c1c8c2] mb-1 font-semibold">State</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full bg-[#141a17] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#c1c8c2] mb-1 font-semibold">District</label>
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="w-full bg-[#141a17] border border-[#414844] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#b7efc5]"
                        />
                      </div>
                    </div>
                  )}

                  {/* 3D Action Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl btn-3d-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>{authMode === 'signin' ? 'Sign In Securely' : 'Create 3D Kisan Profile'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Switch Signin / Signup */}
              <div className="text-center pt-2 border-t border-[#414844]/40">
                {authMode === 'signin' ? (
                  <p className="text-xs text-[#86af99]">
                    Don't have an Agri-ID?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-[#b7efc5] font-bold hover:underline ml-1"
                    >
                      Register New Farm
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-[#86af99]">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="text-[#b7efc5] font-bold hover:underline ml-1"
                    >
                      Sign In to Account
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
