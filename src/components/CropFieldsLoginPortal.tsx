import React, { useState } from 'react';
import {
  Smartphone,
  Lock,
  ArrowRight,
  User,
  MapPin,
  Eye,
  EyeOff,
  Sparkles,
  Mail,
  Building2,
  Wheat,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Compass,
} from 'lucide-react';
import { AuthUser, LocationState, RoleType } from '../types';
import { INDIA_STATES_DATA, DEFAULT_FARMER_LOCATION } from '../data/indiaLocations';
import {
  registerUser,
  loginWithCredentials,
  authenticateWithGoogle,
  loginAsDemoUser,
} from '../services/authService';

interface CropFieldsLoginPortalProps {
  onEnter: (user: AuthUser, location: LocationState) => void;
  initialUser?: AuthUser | null;
}

export const CropFieldsLoginPortal: React.FC<CropFieldsLoginPortalProps> = ({
  onEnter,
  initialUser,
}) => {
  const [role, setRole] = useState<RoleType>(initialUser?.role || 'farmer');
  const [isSignUp, setIsSignUp] = useState(false);

  // Sign In Form States
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Sign Up Form States
  const [fullName, setFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [selectedState, setSelectedState] = useState('Uttarakhand');
  const [selectedDistrict, setSelectedDistrict] = useState('Haridwar');
  const [cityVillage, setCityVillage] = useState('Jwalapur');
  const [pincode, setPincode] = useState('249407');
  const [farmSizeAcres, setFarmSizeAcres] = useState<number>(3.5);
  const [companyName, setCompanyName] = useState('');

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);

  // Modals
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Available districts for selected state
  const currentDistricts = React.useMemo(() => {
    const s = INDIA_STATES_DATA.find((item) => item.name === selectedState);
    return s ? s.districts.map((d) => d.name) : ['Dehradun', 'Haridwar', 'Nainital'];
  }, [selectedState]);

  // Handle Real Login / Signup Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccessMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      try {
        if (isSignUp) {
          // --- 1. SIGN UP FLOW ---
          if (!fullName.trim()) {
            setAuthError('Please enter your full name.');
            setIsLoading(false);
            return;
          }
          if (!signUpPhone.trim()) {
            setAuthError('Please enter your mobile phone number.');
            setIsLoading(false);
            return;
          }

          const { user, location } = registerUser({
            name: fullName.trim(),
            email: signUpEmail.trim() || undefined,
            phone: signUpPhone.trim(),
            password: signUpPassword || 'kisan2026',
            role,
            state: selectedState,
            district: selectedDistrict,
            cityVillage: cityVillage.trim() || selectedDistrict,
            pincode: pincode.trim() || '248001',
            farmSizeAcres: role === 'farmer' ? Number(farmSizeAcres) || 3.0 : undefined,
            companyName: role === 'buyer' ? companyName.trim() || `${fullName}'s Agro Trading` : undefined,
          });

          setAuthSuccessMsg(`Account created for ${user.name}!`);
          setTimeout(() => {
            onEnter(user, location);
            setIsLoading(false);
          }, 300);
        } else {
          // --- 2. SIGN IN FLOW ---
          if (!identifier.trim()) {
            setAuthError('Please enter your mobile number or email address.');
            setIsLoading(false);
            return;
          }

          const result = loginWithCredentials(identifier, password, role);

          if ('error' in result) {
            setAuthError(result.error);
            setIsLoading(false);
            return;
          }

          setAuthSuccessMsg(`Welcome back, ${result.user.name}!`);
          setTimeout(() => {
            onEnter(result.user, result.location);
            setIsLoading(false);
          }, 300);
        }
      } catch (err: any) {
        console.error('Authentication error:', err);
        setAuthError('Authentication failed. Please check your credentials.');
        setIsLoading(false);
      }
    }, 400);
  };

  // Dedicated Demo Mode Login (Ravi Kumar - Dehradun)
  const handleEnterDemoMode = (demoRole: RoleType = role) => {
    setIsLoading(true);
    setAuthError(null);
    setTimeout(() => {
      const { user, location } = loginAsDemoUser(demoRole);
      onEnter(user, location);
      setIsLoading(false);
    }, 350);
  };

  // Google Sign-In Execution
  const handlePerformGoogleAuth = (account: { name: string; email: string; avatar?: string }) => {
    setIsLoading(true);
    setGoogleModalOpen(false);
    setAuthError(null);

    setTimeout(() => {
      const googleId = account.email.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const { user, location, isNewUser } = authenticateWithGoogle({
        googleId,
        name: account.name,
        email: account.email,
        avatar: account.avatar,
        role,
      });

      setAuthSuccessMsg(
        isNewUser
          ? `Google Profile created for ${user.name}!`
          : `Signed in as ${user.name} via Google`
      );

      setTimeout(() => {
        onEnter(user, location);
        setIsLoading(false);
      }, 300);
    }, 400);
  };

  // Google Preset Accounts for realistic one-tap sign-in
  const googlePresetAccounts = [
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Ananya Verma',
      email: 'ananya.verma@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Rahul Joshi',
      email: 'rahul.joshi@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-hidden select-none">
      {/* 1. LUSH PHOTOGRAPHIC CROP FIELDS BACKGROUND (Soft Blur Depth of Field) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2400&q=85"
          alt="Lush Agricultural Crop Fields"
          className="w-full h-full object-cover filter blur-[8px] scale-110 brightness-[0.72] contrast-[1.05]"
        />

        {/* Ambient Dark Green Atmospheric Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e2417]/50 via-[#07170e]/60 to-[#030a06]/85" />

        {/* Soft floating bokeh particles */}
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-[#b7efc5]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-[#2d6a4f]/25 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. MAIN BRANDING & LOGIN CARD CONTAINER */}
      <div className="relative z-10 w-full max-w-[430px] flex flex-col items-center">
        {/* APP ICON WITH ROUNDED CARD */}
        <div className="mb-3.5">
          <div className="w-16 h-16 rounded-[1.25rem] bg-[#102217]/90 border border-[#b7efc5]/30 p-2.5 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md">
            {/* Geometric Leaf Hexagon Sprout Logo */}
            <div className="relative flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-[#52b788]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#1b4332" stroke="#74c69d" strokeWidth="1.5" />
                <path
                  d="M12 7c-2.5 0-4 1.8-4 4.5 0 3 4 5.5 4 5.5s4-2.5 4-5.5C16 8.8 14.5 7 12 7z"
                  fill="#52b788"
                  stroke="#b7efc5"
                  strokeWidth="1.25"
                />
                <path d="M12 11v6" stroke="#081c15" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="text-[6.5px] font-black text-[#d8f3dc] uppercase tracking-tighter mt-0.5 leading-none">
              CROP RESCUER AI
            </span>
          </div>
        </div>

        {/* HEADINGS */}
        <div className="text-center mb-5 space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md font-['Montserrat']">
            Crop Rescuer AI
          </h1>
          <p className="text-[13px] text-[#c5decb] font-medium tracking-wide drop-shadow-sm">
            Save your crops. Reduce waste. Sell smarter.
          </p>
        </div>

        {/* 3. LIGHT FLOATING LOGIN CARD */}
        <div className="w-full bg-[#f1f6f2] rounded-[2rem] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.45)] text-[#1a2e22] relative overflow-hidden">
          {/* SEGMENTED ROLE SWITCHER PILL */}
          <div className="bg-[#e0ece2] p-1 rounded-2xl flex items-center mb-4">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                role === 'farmer'
                  ? 'bg-[#082116] text-white shadow-md'
                  : 'text-[#415a4d] hover:text-[#1a2e22]'
              }`}
              id="portal-role-farmer"
            >
              <Wheat className="w-3.5 h-3.5" />
              <span>Farmer (Kisan)</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                role === 'buyer'
                  ? 'bg-[#082116] text-white shadow-md'
                  : 'text-[#415a4d] hover:text-[#1a2e22]'
              }`}
              id="portal-role-buyer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Buyer (Vyapari)</span>
            </button>
          </div>

          {/* Error / Success Feedback */}
          {authError && (
            <div className="mb-3 p-2.5 rounded-xl bg-[#ffdad6] border border-[#ff897d] text-[#93000a] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccessMsg && (
            <div className="mb-3 p-2.5 rounded-xl bg-[#d8f3dc] border border-[#52b788] text-[#081c15] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#2d6a4f] shrink-0" />
              <span>{authSuccessMsg}</span>
            </div>
          )}

          {/* MAIN LOGIN / SIGN UP FORM */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* SIGN UP FIELDS */}
            {isSignUp ? (
              <>
                {/* Full Name */}
                <div className="bg-[#e4eee6] rounded-2xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all shadow-inner">
                  <User className="w-4 h-4 text-[#52705e] shrink-0" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={role === 'farmer' ? 'Full Name (e.g. Ananya)' : 'Trader / Company Name'}
                    className="w-full bg-transparent text-sm text-[#0f2419] font-medium placeholder-[#6c8577] focus:outline-none"
                    id="signup-name-input"
                  />
                </div>

                {/* Email Address */}
                <div className="bg-[#e4eee6] rounded-2xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all shadow-inner">
                  <Mail className="w-4 h-4 text-[#52705e] shrink-0" />
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="Email Address (e.g. ananya@test.com)"
                    className="w-full bg-transparent text-sm text-[#0f2419] font-medium placeholder-[#6c8577] focus:outline-none"
                    id="signup-email-input"
                  />
                </div>

                {/* Mobile Number */}
                <div className="bg-[#e4eee6] rounded-2xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all shadow-inner">
                  <Smartphone className="w-4 h-4 text-[#52705e] shrink-0" />
                  <input
                    type="tel"
                    required
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    placeholder="Mobile Number (e.g. 9876543210)"
                    className="w-full bg-transparent text-sm text-[#0f2419] font-medium placeholder-[#6c8577] focus:outline-none"
                    id="signup-phone-input"
                  />
                </div>

                {/* Password */}
                <div className="bg-[#e4eee6] rounded-2xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all shadow-inner">
                  <Lock className="w-4 h-4 text-[#52705e] shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Password (e.g. Test123)"
                    className="w-full bg-transparent text-sm text-[#0f2419] font-medium placeholder-[#6c8577] focus:outline-none"
                    id="signup-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#6c8577] hover:text-[#0f2419] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location: State & District Selector */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#e4eee6] rounded-2xl px-3 py-2 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all">
                    <label className="text-[10px] uppercase font-bold text-[#52705e] block">State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        const s = INDIA_STATES_DATA.find((item) => item.name === e.target.value);
                        if (s && s.districts.length > 0) {
                          setSelectedDistrict(s.districts[0].name);
                        }
                      }}
                      className="w-full bg-transparent text-xs font-semibold text-[#0f2419] focus:outline-none cursor-pointer"
                    >
                      {INDIA_STATES_DATA.map((s) => (
                        <option key={s.code} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-[#e4eee6] rounded-2xl px-3 py-2 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all">
                    <label className="text-[10px] uppercase font-bold text-[#52705e] block">District</label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-[#0f2419] focus:outline-none cursor-pointer"
                    >
                      {currentDistricts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* City/Village & Farm Size */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#e4eee6] rounded-2xl px-3 py-2.5 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all">
                    <label className="text-[10px] uppercase font-bold text-[#52705e] block">City/Village</label>
                    <input
                      type="text"
                      value={cityVillage}
                      onChange={(e) => setCityVillage(e.target.value)}
                      placeholder="e.g. Jwalapur"
                      className="w-full bg-transparent text-xs font-semibold text-[#0f2419] focus:outline-none"
                    />
                  </div>

                  {role === 'farmer' ? (
                    <div className="bg-[#e4eee6] rounded-2xl px-3 py-2.5 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all">
                      <label className="text-[10px] uppercase font-bold text-[#52705e] block">Farm Size (Acres)</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0.5"
                        value={farmSizeAcres}
                        onChange={(e) => setFarmSizeAcres(Number(e.target.value))}
                        className="w-full bg-transparent text-xs font-semibold text-[#0f2419] focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="bg-[#e4eee6] rounded-2xl px-3 py-2.5 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all">
                      <label className="text-[10px] uppercase font-bold text-[#52705e] block">PIN Code</label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g. 110033"
                        className="w-full bg-transparent text-xs font-semibold text-[#0f2419] focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* SIGN IN FIELDS */
              <>
                {/* Identifier (Phone or Email) */}
                <div className="bg-[#e4eee6] rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all shadow-inner">
                  <Smartphone className="w-5 h-5 text-[#52705e] shrink-0" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Mobile Number or Email"
                    className="w-full bg-transparent text-sm text-[#0f2419] font-medium placeholder-[#6c8577] focus:outline-none"
                    id="portal-mobile-input"
                  />
                </div>

                {/* Password */}
                <div className="bg-[#e4eee6] rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-transparent focus-within:border-[#2d6a4f] focus-within:bg-white transition-all shadow-inner">
                  <Lock className="w-5 h-5 text-[#52705e] shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent text-sm text-[#0f2419] font-medium placeholder-[#6c8577] focus:outline-none"
                    id="portal-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#6c8577] hover:text-[#0f2419] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1 pb-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-[#334e3f] font-medium select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0a2318] accent-[#0a2318] cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-[#1b4332] hover:text-[#0a2318] font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            )}

            {/* PRIMARY CTA BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-[#082116] hover:bg-[#123826] active:scale-[0.98] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer mt-1"
              id="portal-sign-in-btn"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Create Kisan Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* OR CONTINUE WITH DIVIDER */}
          <div className="relative flex items-center justify-center my-3.5">
            <div className="border-t border-[#cad8ce] w-full" />
            <span className="bg-[#f1f6f2] px-3 text-[11px] text-[#657d70] font-medium tracking-wide">
              or continue with
            </span>
            <div className="border-t border-[#cad8ce] w-full" />
          </div>

          {/* SOCIAL LOGIN BUTTONS (GOOGLE & APPLE) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Google Pill Button */}
            <button
              type="button"
              onClick={() => setGoogleModalOpen(true)}
              className="w-full py-2.5 rounded-2xl bg-white hover:bg-[#fafdfb] active:scale-[0.98] border border-[#d6e2d9] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer group"
              title="Sign in with Google"
              id="portal-google-login-btn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.2C.6 9.2 0 11.5 0 12s.6 2.8 1.6 4.8l3.7-2.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 20 7.4 23 12 23z"
                />
              </svg>
              <span className="text-xs font-semibold text-[#1a2e22]">Google</span>
            </button>

            {/* Apple Pill Button */}
            <button
              type="button"
              onClick={() => {
                handlePerformGoogleAuth({
                  name: 'Apple User',
                  email: 'apple.user@icloud.com',
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                });
              }}
              className="w-full py-2.5 rounded-2xl bg-white hover:bg-[#fafdfb] active:scale-[0.98] border border-[#d6e2d9] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer group"
              title="Sign in with Apple"
              id="portal-apple-login-btn"
            >
              <svg className="w-4 h-4 fill-current text-[#0f2419]" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12.01-14.43-6.52-10.02-11.41-20.9-14.67-32.65-3.26-11.75-4.89-22.95-4.89-33.6 0-14.79 3.8-27.13 11.39-37.04 7.6-9.91 17.1-14.93 28.52-15.08 4.88 0 10.36 1.34 16.44 4.02 6.07 2.68 10.02 4.09 11.83 4.09 1.45 0 5.41-1.39 11.89-4.17 6.47-2.78 11.96-4.04 16.47-3.77 12.33.64 22.37 5.37 30.12 14.21-10.74 6.54-16.01 15.54-15.82 27 0 9.27 3.49 17.17 10.47 23.68 6.98 6.52 15.34 10.15 25.07 10.91-2.09 6.29-4.58 12.27-7.46 17.94zM119.22 33.51c0-7.39 2.66-14.29 7.97-20.69 5.31-6.4 11.89-10.59 19.74-12.57.19 1.15.29 2.14.29 2.97 0 7.39-2.77 14.39-8.32 21-5.55 6.61-12.25 10.5-20.1 11.68-.45-1.02-.75-1.99-.9-2.92l1.32.53z" />
              </svg>
              <span className="text-xs font-semibold text-[#1a2e22]">Apple</span>
            </button>
          </div>

          {/* DEDICATED 3D DEMO MODE LAUNCHER FOR HACKATHON PRESENTATION */}
          <div className="mt-4 pt-3 border-t border-[#cad8ce]">
            <button
              type="button"
              onClick={() => handleEnterDemoMode(role)}
              className="w-full py-3 px-3 rounded-2xl btn-3d-primary text-[#0a1810] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-all group cursor-pointer"
              id="portal-enter-demo-mode-btn"
            >
              <Sparkles className="w-4 h-4 text-[#0a1810] group-hover:rotate-12 transition-transform" />
              <span>🚀 Launch 3D Agri-Verse (Live Demo)</span>
            </button>
          </div>
        </div>

        {/* 4. BOTTOM FOOTER TOGGLE */}
        <div className="mt-4 text-center">
          <p className="text-sm text-[#e0efe3] font-medium drop-shadow">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAuthError(null);
                setAuthSuccessMsg(null);
              }}
              className="text-[#b7efc5] hover:text-white font-bold underline underline-offset-4 ml-1 cursor-pointer transition-colors"
              id="portal-toggle-signup-btn"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>

      {/* GOOGLE SIGN-IN MODAL / ACCOUNT SELECTOR */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl text-[#1a2e22] space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.1 8.9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.2C.6 9.2 0 11.5 0 12s.6 2.8 1.6 4.8l3.7-2.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5.1L1.6 16.1C3.5 20 7.4 23 12 23z"
                  />
                </svg>
                <span className="font-bold text-sm text-[#082116]">Sign in with Google</span>
              </div>
              <button
                type="button"
                onClick={() => setGoogleModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#52705e]">
              Select a Google Account to connect to Crop Rescuer AI:
            </p>

            {/* Google Preset Accounts List */}
            <div className="space-y-2">
              {googlePresetAccounts.map((acc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePerformGoogleAuth(acc)}
                  className="w-full p-2.5 rounded-2xl border border-gray-200 hover:border-[#2d6a4f] hover:bg-[#f1f6f2] flex items-center gap-3 transition-all text-left group"
                >
                  <img src={acc.avatar} alt={acc.name} className="w-9 h-9 rounded-full object-cover border" />
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs font-bold text-[#082116] group-hover:text-[#2d6a4f]">
                      {acc.name}
                    </div>
                    <div className="text-[11px] text-gray-500 truncate">{acc.email}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Google Account Input */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Or Use Another Google Account:
              </span>
              <input
                type="text"
                placeholder="Your Name (e.g. Priya Sharma)"
                value={customGoogleName}
                onChange={(e) => setCustomGoogleName(e.target.value)}
                className="w-full p-2 rounded-xl bg-gray-50 border text-xs font-medium text-[#082116] focus:outline-none focus:border-[#2d6a4f]"
              />
              <input
                type="email"
                placeholder="Google Email (e.g. priya@gmail.com)"
                value={customGoogleEmail}
                onChange={(e) => setCustomGoogleEmail(e.target.value)}
                className="w-full p-2 rounded-xl bg-gray-50 border text-xs font-medium text-[#082116] focus:outline-none focus:border-[#2d6a4f]"
              />
              <button
                type="button"
                disabled={!customGoogleEmail.trim() || !customGoogleName.trim()}
                onClick={() => {
                  handlePerformGoogleAuth({
                    name: customGoogleName.trim(),
                    email: customGoogleEmail.trim(),
                  });
                }}
                className="w-full py-2.5 rounded-xl bg-[#082116] hover:bg-[#123826] text-white text-xs font-bold transition-all disabled:opacity-40"
              >
                Continue with Custom Google Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#f1f6f2] rounded-3xl p-6 shadow-2xl text-[#1a2e22] space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#082116]">
              <Sparkles className="w-4 h-4 text-[#2d6a4f]" />
              <span>Reset Password</span>
            </div>
            <p className="text-xs text-[#415a4d]">
              Enter your registered mobile number. We will send a 4-digit OTP to reset your password.
            </p>
            <div className="bg-[#e4eee6] rounded-2xl px-4 py-3 flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-[#52705e]" />
              <input
                type="tel"
                placeholder="Mobile number"
                className="w-full bg-transparent text-sm text-[#0f2419] font-medium focus:outline-none"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#e0ece2] text-xs font-semibold text-[#334e3f]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('OTP sent to your registered mobile number!');
                  setForgotModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#082116] text-xs font-bold text-white shadow-md"
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
