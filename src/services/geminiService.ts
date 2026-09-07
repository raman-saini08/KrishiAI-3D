import { LocationState, AuthUser, QualityGrade } from '../types';

export interface FarmerContext {
  farmerName?: string;
  role?: string;
  kisanId?: string;
  landSizeAcres?: number;
  primaryCrops?: string[];
  farmingType?: string;
  location: LocationState;
  selectedMandi?: string;
  activeScan?: {
    cropName?: string;
    diagnosisName?: string;
    healthScore?: number;
    grade?: QualityGrade;
    recommendedPriceKg?: number;
  };
  nearbyBuyersCount?: number;
}

export interface ChatHistoryItem {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  imageUrl?: string;
  timestamp?: string;
}

export interface SendChatMessageParams {
  message: string;
  base64Image?: string | null;
  farmerContext: FarmerContext;
  chatHistory?: ChatHistoryItem[];
  preferredLanguage?: string;
}

export interface ChatApiResponse {
  reply: string;
  groundedLocation: string;
  suggestedActions?: { label: string; action: string }[];
  isDemoEstimate?: boolean;
  error?: string;
}

/**
 * Sends a conversational message (with optional attached crop photo)
 * to the server-side Gemini AI Agronomist endpoint.
 */
export async function sendChatMessage(params: SendChatMessageParams): Promise<ChatApiResponse> {
  const response = await fetch('/api/gemini/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Server responded with status ${response.status}`);
  }

  return response.json();
}

/**
 * Multimodal Crop Health Analysis & Quality Grading
 */
export async function analyzeCropPhoto(
  base64Image: string,
  cropName: string,
  symptoms: string,
  location: LocationState,
) {
  const response = await fetch('/api/gemini/analyze-crop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      base64Image,
      cropName,
      symptoms,
      location,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to analyze crop photo');
  }

  return response.json();
}
