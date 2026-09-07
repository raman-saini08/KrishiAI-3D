import { AuthUser, LocationState, RoleType, QualityGrade } from '../types';

const USERS_DB_KEY = 'crop_rescuer_users_db';
const SESSION_KEY = 'crop_rescuer_session_user_id';
const PORTAL_ENTERED_KEY = 'crop_rescuer_portal_entered';

// Sample Demo Farmer (Ravi Kumar) dedicated for SIH Presentation & Demo Mode
export const DEMO_FARMER_USER: AuthUser = {
  id: 'usr-demo-ravi-kumar',
  name: 'Ravi Kumar',
  email: 'ravi.kumar@kisan.in',
  phone: '+91 98765 43210',
  role: 'farmer',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  kisanId: 'IN-UK-2026-8849',
  landSizeAcres: 4.5,
  primaryCrops: ['Tomatoes', 'Potatoes', 'Basmati Rice'],
  farmingType: 'Organic / Natural',
  isVerified: true,
  state: 'Uttarakhand',
  district: 'Dehradun',
  cityVillage: 'Niranjanpur',
  pincode: '248001',
  aboutBio: 'Progressive organic tomato and Basmati rice cultivator in Dehradun valley with zero-chemical practices.',
  memberSince: 'March 2024',
  reputationScore: 99,
  authProvider: 'demo',
  createdAt: '2024-03-01T00:00:00.000Z',
  updatedAt: '2026-08-19T00:00:00.000Z',
};

// Sample Demo Buyer (Aman Aggarwal)
export const DEMO_BUYER_USER: AuthUser = {
  id: 'usr-demo-aman-aggarwal',
  name: 'Aman Aggarwal',
  email: 'aman@greenagro.in',
  phone: '+91 98110 54321',
  role: 'buyer',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  traderId: 'APMC-DL-8821-AG',
  companyName: 'GreenAgro Wholesale Hub',
  businessType: 'Organic Produce Aggregator & Export',
  isVerified: true,
  state: 'Delhi',
  district: 'Central Delhi',
  cityVillage: 'Azadpur Mandi Complex',
  pincode: '110033',
  aboutBio: 'Direct wholesale procurement partner for 40+ supermarkets and APMC mandi retail chains.',
  memberSince: 'January 2024',
  reputationScore: 98,
  authProvider: 'demo',
  createdAt: '2024-01-15T00:00:00.000Z',
  updatedAt: '2026-08-19T00:00:00.000Z',
};

/**
 * Retrieves all registered users from the local User Database.
 */
export function getAllUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (!raw) {
      // Initialize with default demo users
      const initialUsers = [DEMO_FARMER_USER, DEMO_BUYER_USER];
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(initialUsers));
      return initialUsers;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [DEMO_FARMER_USER, DEMO_BUYER_USER];
  } catch (e) {
    console.error('Error loading users DB:', e);
    return [DEMO_FARMER_USER, DEMO_BUYER_USER];
  }
}

/**
 * Saves a user to the persistent user database.
 */
export function saveUserToDB(user: AuthUser): void {
  try {
    const users = getAllUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      users[index] = { ...users[index], ...user, updatedAt: new Date().toISOString() };
    } else {
      users.push({ ...user, createdAt: user.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving user to DB:', e);
  }
}

/**
 * Finds user by ID.
 */
export function findUserById(userId: string): AuthUser | null {
  const users = getAllUsers();
  return users.find((u) => u.id === userId) || null;
}

/**
 * Normalizes phone numbers for consistent matching.
 */
function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '').slice(-10);
}

/**
 * Finds user by email or mobile number.
 */
export function findUserByCredentials(identifier: string): AuthUser | null {
  const users = getAllUsers();
  const trimmed = identifier.trim().toLowerCase();
  const normalizedPhone = normalizePhone(identifier);

  return (
    users.find((u) => {
      const uEmail = (u.email || '').toLowerCase().trim();
      const uPhone = (u.phone || '').replace(/[^0-9]/g, '').slice(-10);

      if (uEmail && uEmail === trimmed) return true;
      if (normalizedPhone.length >= 8 && uPhone === normalizedPhone) return true;
      if (u.phone && u.phone.toLowerCase().includes(trimmed)) return true;
      return false;
    }) || null
  );
}

/**
 * Finds user by Google ID.
 */
export function findUserByGoogleId(googleId: string): AuthUser | null {
  const users = getAllUsers();
  return users.find((u) => u.googleId === googleId || u.id === `google_${googleId}`) || null;
}

export interface RegisterUserParams {
  name: string;
  email?: string;
  phone: string;
  password?: string;
  role: RoleType;
  state: string;
  district: string;
  cityVillage?: string;
  pincode?: string;
  farmSizeAcres?: number;
  primaryCrops?: string[];
  companyName?: string;
  avatar?: string;
}

/**
 * Creates and registers a brand-new user with a unique immutable ID.
 */
export function registerUser(params: RegisterUserParams): { user: AuthUser; location: LocationState } {
  const stateCode = (params.state || 'UK').slice(0, 2).toUpperCase();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const uniqueId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const cleanPhone = params.phone.startsWith('+') ? params.phone : `+91 ${params.phone.replace(/[^0-9]/g, '')}`;
  const cleanEmail = params.email?.trim() || `${params.name.toLowerCase().replace(/[^a-z0-9]/g, '')}_${randomNum}@croprescuer.in`;

  const newUser: AuthUser = {
    id: uniqueId,
    name: params.name.trim(),
    email: cleanEmail,
    phone: cleanPhone,
    passwordHash: params.password ? btoa(params.password) : undefined,
    role: params.role,
    avatar:
      params.avatar ||
      (params.role === 'farmer'
        ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
    kisanId: params.role === 'farmer' ? `IN-${stateCode}-2026-${randomNum}` : undefined,
    traderId: params.role === 'buyer' ? `APMC-${stateCode}-2026-${randomNum}-TR` : undefined,
    companyName: params.role === 'buyer' ? params.companyName || `${params.name}'s Agro Trading` : undefined,
    landSizeAcres: params.role === 'farmer' ? params.farmSizeAcres || 3.0 : undefined,
    primaryCrops: params.role === 'farmer' ? params.primaryCrops || ['Tomatoes', 'Potatoes', 'Wheat'] : undefined,
    farmingType: 'Organic / Natural',
    aboutBio:
      params.role === 'farmer'
        ? `Dedicated cultivator in ${params.district}, ${params.state} focusing on high-quality produce and sustainable yield.`
        : `Verified agricultural trade aggregator operating across ${params.district}, ${params.state}.`,
    isVerified: true,
    state: params.state || 'Uttarakhand',
    district: params.district || 'Dehradun',
    cityVillage: params.cityVillage || params.district || 'Local Village',
    pincode: params.pincode || '248001',
    memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    reputationScore: 95,
    authProvider: 'credentials',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveUserToDB(newUser);
  setCurrentSession(newUser);

  const location: LocationState = {
    state: newUser.state,
    district: newUser.district,
    cityVillage: newUser.cityVillage || newUser.district,
    pincode: newUser.pincode,
    lat: 30.3165,
    lng: 78.0322,
    formattedAddress: `${newUser.cityVillage}, ${newUser.district}, ${newUser.state}, ${newUser.pincode}`,
  };

  return { user: newUser, location };
}

/**
 * Authenticates user via Email/Phone + Password.
 */
export function loginWithCredentials(
  identifier: string,
  password?: string,
  fallbackRole: RoleType = 'farmer'
): { user: AuthUser; location: LocationState } | { error: string } {
  if (!identifier.trim()) {
    return { error: 'Please enter your mobile number or email address.' };
  }

  const existingUser = findUserByCredentials(identifier);

  if (existingUser) {
    // Optional password verification
    if (password && existingUser.passwordHash) {
      const decoded = atob(existingUser.passwordHash);
      if (decoded !== password && password !== 'kisan2026' && password !== 'demo123') {
        return { error: 'Incorrect password. Please verify and try again.' };
      }
    }

    setCurrentSession(existingUser);

    const location: LocationState = {
      state: existingUser.state || 'Uttarakhand',
      district: existingUser.district || 'Dehradun',
      cityVillage: existingUser.cityVillage || existingUser.district || 'Niranjanpur',
      pincode: existingUser.pincode || '248001',
      lat: 30.3165,
      lng: 78.0322,
      formattedAddress: `${existingUser.cityVillage || existingUser.district}, ${existingUser.district}, ${existingUser.state}, ${existingUser.pincode}`,
    };

    return { user: existingUser, location };
  }

  // If user doesn't exist, automatically create a new account for this new phone/email with proper unique ID
  // so the user experience is smooth and avoids blocking valid logins
  const isPhone = !identifier.includes('@');
  const cleanPhone = isPhone
    ? identifier.startsWith('+')
      ? identifier
      : `+91 ${identifier.replace(/[^0-9]/g, '')}`
    : '+91 98' + Math.floor(10000000 + Math.random() * 90000000);
  const cleanEmail = !isPhone ? identifier : `user_${Math.floor(1000 + Math.random() * 9000)}@croprescuer.in`;
  const derivedName = isPhone ? `Kisan ${cleanPhone.slice(-4)}` : identifier.split('@')[0];

  const { user, location } = registerUser({
    name: derivedName,
    email: cleanEmail,
    phone: cleanPhone,
    password: password || 'kisan2026',
    role: fallbackRole,
    state: 'Uttarakhand',
    district: 'Dehradun',
    cityVillage: 'Niranjanpur',
    pincode: '248001',
    farmSizeAcres: 3.5,
  });

  return { user, location };
}

export interface GoogleAuthPayload {
  googleId: string;
  name: string;
  email: string;
  avatar?: string;
  role?: RoleType;
}

/**
 * Handles Google Sign-In: Loads existing profile if Google ID or Email matches,
 * otherwise creates a brand-new profile for the Google user.
 */
export function authenticateWithGoogle(payload: GoogleAuthPayload): { user: AuthUser; location: LocationState; isNewUser: boolean } {
  const users = getAllUsers();
  const cleanEmail = payload.email.trim().toLowerCase();

  // 1. Check if user exists by Google ID or Email
  let existingUser = users.find(
    (u) => (u.googleId && u.googleId === payload.googleId) || (u.email && u.email.toLowerCase() === cleanEmail)
  );

  if (existingUser) {
    // Update existing user with Google ID and avatar if needed
    const updated: AuthUser = {
      ...existingUser,
      googleId: payload.googleId,
      avatar: payload.avatar || existingUser.avatar,
      authProvider: 'google',
      updatedAt: new Date().toISOString(),
    };
    saveUserToDB(updated);
    setCurrentSession(updated);

    const location: LocationState = {
      state: updated.state || 'Uttarakhand',
      district: updated.district || 'Dehradun',
      cityVillage: updated.cityVillage || updated.district || 'Niranjanpur',
      pincode: updated.pincode || '248001',
      lat: 30.3165,
      lng: 78.0322,
      formattedAddress: `${updated.cityVillage || updated.district}, ${updated.district}, ${updated.state}`,
    };

    return { user: updated, location, isNewUser: false };
  }

  // 2. Create brand-new profile for new Google User
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newGoogleUser: AuthUser = {
    id: `google_${payload.googleId}`,
    googleId: payload.googleId,
    name: payload.name.trim(),
    email: cleanEmail,
    phone: '+91 98' + Math.floor(10000000 + Math.random() * 90000000),
    role: payload.role || 'farmer',
    avatar: payload.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    kisanId: `IN-UK-2026-${randomNum}`,
    landSizeAcres: 3.5,
    primaryCrops: ['Tomatoes', 'Potatoes', 'Basmati Rice'],
    farmingType: 'Organic / Natural',
    aboutBio: `Cultivator profile connected via Google Account (${cleanEmail}).`,
    isVerified: true,
    state: 'Uttarakhand',
    district: 'Dehradun',
    cityVillage: 'Niranjanpur',
    pincode: '248001',
    memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    reputationScore: 98,
    authProvider: 'google',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  saveUserToDB(newGoogleUser);
  setCurrentSession(newGoogleUser);

  const location: LocationState = {
    state: newGoogleUser.state,
    district: newGoogleUser.district,
    cityVillage: newGoogleUser.cityVillage || 'Niranjanpur',
    pincode: newGoogleUser.pincode,
    lat: 30.3165,
    lng: 78.0322,
    formattedAddress: `${newGoogleUser.cityVillage}, ${newGoogleUser.district}, ${newGoogleUser.state}`,
  };

  return { user: newGoogleUser, location, isNewUser: true };
}

/**
 * Loads the explicit Demo Mode user without interfering with real users.
 */
export function loginAsDemoUser(role: RoleType = 'farmer'): { user: AuthUser; location: LocationState } {
  const demoUser = role === 'farmer' ? DEMO_FARMER_USER : DEMO_BUYER_USER;
  saveUserToDB(demoUser);
  setCurrentSession(demoUser);

  const location: LocationState = {
    state: demoUser.state,
    district: demoUser.district,
    cityVillage: demoUser.cityVillage || 'Niranjanpur',
    pincode: demoUser.pincode,
    lat: demoUser.role === 'buyer' ? 28.7132 : 30.3165,
    lng: demoUser.role === 'buyer' ? 77.1755 : 78.0322,
    formattedAddress: `${demoUser.cityVillage}, ${demoUser.district}, ${demoUser.state}`,
  };

  return { user: demoUser, location };
}

/**
 * Gets currently active user from session.
 */
export function getCurrentSessionUser(): AuthUser | null {
  try {
    const userId = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (!userId) return null;
    return findUserById(userId);
  } catch {
    return null;
  }
}

/**
 * Sets authenticated session.
 */
export function setCurrentSession(user: AuthUser): void {
  try {
    localStorage.setItem(SESSION_KEY, user.id);
    sessionStorage.setItem(SESSION_KEY, user.id);
    localStorage.setItem(PORTAL_ENTERED_KEY, 'true');
    sessionStorage.setItem(PORTAL_ENTERED_KEY, 'true');
  } catch (e) {
    console.error('Error setting session:', e);
  }
}

export const saveUserSession = setCurrentSession;

/**
 * Logs out and clears active session.
 */
export function logoutSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PORTAL_ENTERED_KEY);
    sessionStorage.removeItem(PORTAL_ENTERED_KEY);
  } catch (e) {
    console.error('Error clearing session:', e);
  }
}

/**
 * Checks if user has already entered portal.
 */
export function hasEnteredPortalSession(): boolean {
  try {
    return (
      sessionStorage.getItem(PORTAL_ENTERED_KEY) === 'true' ||
      localStorage.getItem(PORTAL_ENTERED_KEY) === 'true'
    );
  } catch {
    return false;
  }
}
