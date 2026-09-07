import { ChatMessage, CropListing } from '../types';

export interface UserCropItem {
  id: string;
  name: string;
  variety: string;
  plantedAreaAcres: number;
  expectedYieldKg: number;
  currentStage: string;
  healthScore: number;
  plantedDate: string;
  harvestEstimateDate: string;
  status: 'Growing' | 'Ready to Harvest' | 'Sold';
}

export interface UserCropScan {
  id: string;
  cropName: string;
  diagnosis: string;
  healthScore: number;
  confidencePct: number;
  date: string;
  imageUrl: string;
  treatmentSummary: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'price_alert' | 'disease_warning' | 'buyer_offer' | 'weather';
  isRead: boolean;
}

// User-Specific Storage Keys Helper
const getStorageKey = (userId: string, key: string) => `crop_rescuer_user_${userId}_${key}`;

/**
 * Default sample crops for Demo User (Ravi Kumar)
 */
const DEMO_CROPS: UserCropItem[] = [
  {
    id: 'crop-1',
    name: 'Tomatoes',
    variety: 'Himsona Hybrid Red',
    plantedAreaAcres: 2.0,
    expectedYieldKg: 6500,
    currentStage: 'Fruiting / Ripening',
    healthScore: 92,
    plantedDate: 'April 2026',
    harvestEstimateDate: 'June 2026',
    status: 'Ready to Harvest',
  },
  {
    id: 'crop-2',
    name: 'Basmati Rice',
    variety: 'Pusa 1121 Super',
    plantedAreaAcres: 1.5,
    expectedYieldKg: 3200,
    currentStage: 'Vegetative Growth',
    healthScore: 96,
    plantedDate: 'May 2026',
    harvestEstimateDate: 'October 2026',
    status: 'Growing',
  },
  {
    id: 'crop-3',
    name: 'Potatoes',
    variety: 'Kufri Jyoti',
    plantedAreaAcres: 1.0,
    expectedYieldKg: 4000,
    currentStage: 'Tuber Initiation',
    healthScore: 88,
    plantedDate: 'March 2026',
    harvestEstimateDate: 'July 2026',
    status: 'Growing',
  },
];

/**
 * Gets user crops isolated by user ID.
 */
export function getUserCrops(userId: string): UserCropItem[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId, 'crops'));
    if (raw) return JSON.parse(raw);
    if (userId.includes('demo')) return DEMO_CROPS;
    return [];
  } catch {
    return [];
  }
}

/**
 * Saves user crops for that specific user.
 */
export function saveUserCrops(userId: string, crops: UserCropItem[]): void {
  try {
    localStorage.setItem(getStorageKey(userId, 'crops'), JSON.stringify(crops));
  } catch (e) {
    console.error('Error saving user crops:', e);
  }
}

/**
 * Adds a new crop for the user.
 */
export function addUserCrop(userId: string, crop: Omit<UserCropItem, 'id'>): UserCropItem {
  const crops = getUserCrops(userId);
  const newCrop: UserCropItem = {
    ...crop,
    id: `crop_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
  };
  const updated = [newCrop, ...crops];
  saveUserCrops(userId, updated);
  return newCrop;
}

/**
 * Gets user crop scan history isolated by user ID.
 */
export function getUserScans(userId: string): UserCropScan[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId, 'scans'));
    if (raw) return JSON.parse(raw);
    return [];
  } catch {
    return [];
  }
}

/**
 * Saves user crop scan history.
 */
export function saveUserScan(userId: string, scan: Omit<UserCropScan, 'id'>): UserCropScan {
  const scans = getUserScans(userId);
  const newScan: UserCropScan = {
    ...scan,
    id: `scan_${Date.now()}`,
  };
  const updated = [newScan, ...scans.slice(0, 20)];
  try {
    localStorage.setItem(getStorageKey(userId, 'scans'), JSON.stringify(updated));
  } catch {}
  return newScan;
}

/**
 * Gets user AI chat messages isolated by user ID.
 */
export function getUserChatHistory(userId: string): ChatMessage[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId, 'chat_history'));
    if (raw) return JSON.parse(raw);
    return [];
  } catch {
    return [];
  }
}

/**
 * Saves user AI chat messages isolated by user ID.
 */
export function saveUserChatHistory(userId: string, messages: ChatMessage[]): void {
  try {
    localStorage.setItem(getStorageKey(userId, 'chat_history'), JSON.stringify(messages.slice(-30)));
  } catch {}
}

/**
 * Gets marketplace listings created by this specific user.
 */
export function getUserListings(userId: string): CropListing[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId, 'my_listings'));
    if (raw) return JSON.parse(raw);
    return [];
  } catch {
    return [];
  }
}

/**
 * Saves marketplace listing created by this specific user.
 */
export function saveUserListing(userId: string, listing: CropListing): void {
  try {
    const listings = getUserListings(userId);
    const updated = [listing, ...listings];
    localStorage.setItem(getStorageKey(userId, 'my_listings'), JSON.stringify(updated));
  } catch {}
}

/**
 * Gets notifications for user.
 */
export function getUserNotifications(userId: string): UserNotification[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId, 'notifications'));
    if (raw) return JSON.parse(raw);
    return [
      {
        id: 'notif-1',
        title: 'Mandi Rate Alert',
        message: 'Tomato prices in Dehradun APMC rose by ₹3.50/kg today.',
        timestamp: '1 hour ago',
        type: 'price_alert',
        isRead: false,
      },
      {
        id: 'notif-2',
        title: 'Verified Buyer Nearby',
        message: 'GreenAgro Wholesale is looking for 500kg Grade A Tomatoes.',
        timestamp: '3 hours ago',
        type: 'buyer_offer',
        isRead: true,
      },
    ];
  } catch {
    return [];
  }
}
