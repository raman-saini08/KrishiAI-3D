export type RoleType = 'farmer' | 'buyer';

export type QualityGrade = 'Grade A' | 'Grade B' | 'Grade C';

export type AppLanguage = 'en' | 'hi' | 'hinglish';

export interface GeoCoordinate {
  lat: number;
  lng: number;
}

export interface CityVillageInfo {
  name: string;
  pincode: string;
  lat: number;
  lng: number;
}

export interface DistrictInfo {
  name: string;
  headquarters: string;
  lat: number;
  lng: number;
  majorCrops: string[];
  climateZone: string;
  soilTypes: string[];
  citiesVillages: CityVillageInfo[];
  mandis: string[];
}

export interface StateInfo {
  name: string;
  code: string;
  type: 'State' | 'UT';
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East';
  districts: DistrictInfo[];
}

export interface LocationState {
  state: string;
  district: string;
  cityVillage: string;
  pincode: string;
  lat: number;
  lng: number;
  formattedAddress?: string;
  isCustom?: boolean;
}

export interface BuyerProfile {
  id: string;
  name: string;
  companyName: string;
  isVerified: boolean;
  avatar: string;
  rating: number;
  state: string;
  district: string;
  cityVillage: string;
  pincode: string;
  lat: number;
  lng: number;
  preferredRadiusKm: number | 'all-india' | 'state-wide';
  cropsWanted: string[];
  requiredQuantityKg: number;
  expectedPricePerKg: number;
  contactNumber: string;
  email: string;
  type: 'Wholesaler' | 'Processor' | 'Retail Chain' | 'FPO Aggregator' | 'Exporter';
}

export interface MandiPriceItem {
  crop: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trendPct: number;
  arrivalVolumeTonnes: number;
  dailyChange: 'up' | 'down' | 'stable';
}

export interface MarketMandi {
  id: string;
  name: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  commodities: MandiPriceItem[];
  lastUpdated: string;
  isGovtAPMC: boolean;
  distanceKm?: number;
}

export interface CropListing {
  id: string;
  title: string;
  cropType: string;
  variety?: string;
  grade: QualityGrade;
  quantityKg: number;
  pricePerKg: number;
  cityVillage: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  farmerName: string;
  farmerPhone: string;
  farmerAvatar: string;
  imageUrl: string;
  harvestDate: string;
  diseaseStatus: 'Healthy' | 'Minor Damage' | 'Early Stage Detected';
  aiVerified: boolean;
  description: string;
}

export type SellWaitRecommendation = 'SELL NOW' | 'WAIT FOR BETTER PRICE' | 'MONITOR MARKET';

export interface SmartPricingResult {
  decision: SellWaitRecommendation;
  headline: string;
  rationale: string;
  confidencePct: number;
  currentPrice: number;
  expected7DayPrice: number;
  mandiBenchmark: number;
  demandStatus: 'Very High' | 'High' | 'Moderate' | 'Low';
  priceMomentum: '+8.4%' | '+5.2%' | '-3.1%' | 'Stable';
  factors: {
    arrivalVolumeImpact: string;
    weatherStorageRisk: string;
    buyerDemandScore: string;
    qualityPremium: string;
  };
  dataSource: string;
  timestamp: string;
}

export interface CropIntelligenceReport {
  id: string;
  cropName: string;
  plantType: string;
  variety: string;
  growthStage: 'Seedling' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Harvest Ready';
  healthScore: number;
  healthStatus: 'Healthy' | 'Moderate Risk' | 'High Risk';
  leafCondition: string;
  visibleDamage: string;
  nutrientDeficiency: string;
  diagnosisName: string;
  pestDetected: string;
  severityLevel: 'None' | 'Low' | 'Moderate' | 'Severe' | 'Critical';
  symptoms: string[];
  confidenceScore: number;
  treatmentPlan: {
    suggestedNextSteps: string[];
    organicRemedies: string[];
    chemicalTreatments: string[];
    preventionMethods: string[];
    fertilizerSuggestions: string[];
    irrigationRecommendations: string[];
    expertConsultationAlert: string;
  };
  farmingRequirements: {
    soilConditions: string;
    waterRequirements: string;
    temperatureRange: string;
    fertilizerRequirements: string;
    growthTips: string[];
  };
  riskAnalysis: {
    diseaseRisks: string;
    pestRisks: string;
    weatherRisks: string;
    preventiveActions: string[];
  };
  economicInfo: {
    currentCropPrice: number;
    mandiPriceRange: string;
    priceTrend: 'up' | 'down' | 'stable';
    priceMovementPct: number;
    bestSellingRecommendation: SellWaitRecommendation;
    sellWaitRationale: string;
    estimatedDemand: string;
    dataSource: string;
    lastUpdated: string;
  };
  imageUrl: string;
  scannedAt: string;
  locationLabel: string;
  isDemoEstimate?: boolean;
}

export interface KnowledgeBaseItem {
  id: string;
  cropName: string;
  cropType: string;
  diseaseName: string;
  symptoms: string;
  causes: string;
  treatment: string;
  prevention: string;
  fertilizerInfo: string;
  irrigationReq: string;
  soilReq: string;
  harvestingInfo: string;
  marketPriceInfo: string;
  advice: string;
  attachments?: {
    name: string;
    type: 'image' | 'pdf' | 'csv' | 'document';
    size: string;
    url?: string;
  }[];
  status: 'Validating' | 'Processing' | 'Knowledge Extracted' | 'AI Ready';
  uploadedAt: string;
  category: 'Disease & Pest' | 'Fertilizer & Soil' | 'Market & Mandi' | 'Agronomy Tip';
}

export interface PriceEstimateResult {
  crop: string;
  location: string;
  grade: QualityGrade;
  minEstimatedPrice: number;
  maxEstimatedPrice: number;
  recommendedPrice: number;
  mandiBenchmarkPrice: number;
  nearbyMandiName: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  factors: {
    locationDemand: string;
    qualityImpact: string;
    seasonalTrend: string;
    transportCost: string;
  };
  explanation: string;
}

export interface CropSuitabilityRecommendation {
  crop: string;
  suitabilityScore: number;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'All Year';
  soilSuitability: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  durationDays: string;
  expectedYieldPerAcre: string;
  estimatedPriceRange: string;
  estimatedProfitPerAcre: number;
  localDemandStatus: 'Very High' | 'High' | 'Moderate';
  keyAdvisory: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  imageUrl?: string;
  suggestedActions?: { label: string; action: string }[];
  contextLocation?: string;
  locationContext?: string;
  isSpeaking?: boolean;
  language?: AppLanguage;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash?: string;
  role: RoleType;
  avatar: string;
  kisanId?: string;
  traderId?: string;
  landSizeAcres?: number;
  farmSize?: string;
  primaryCrops?: string[];
  currentCropStage?: 'Seedling' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Harvest Ready';
  soilType?: 'Alluvial Soil' | 'Black Soil' | 'Red & Yellow Soil' | 'Clay Loam' | 'Sandy Loam' | string;
  farmingType?: 'Organic / Natural' | 'Conventional' | 'Precision / Tech' | 'Hydroponic / Protected' | string;
  languages?: string[];
  companyName?: string;
  businessType?: string;
  experienceYears?: number;
  aboutBio?: string;
  isVerified: boolean;
  state: string;
  district: string;
  cityVillage?: string;
  pincode: string;
  memberSince: string;
  reputationScore: number;
  authProvider?: 'credentials' | 'google' | 'apple' | 'demo';
  googleId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DailyWeatherForecast {
  day: string;
  date: string;
  tempMin: number;
  tempMax: number;
  condition: 'Sunny' | 'Rainy' | 'Cloudy' | 'Thunderstorm' | 'Partly Cloudy';
  rainProb: number;
  humidity: number;
  windSpeed: number;
  advisory: string;
}

export interface WeatherDataState {
  currentTemp: number;
  feelsLike: number;
  condition: 'Sunny' | 'Rainy' | 'Cloudy' | 'Thunderstorm' | 'Partly Cloudy';
  humidity: number;
  windSpeed: string;
  rainProbability: number;
  rainfallVolumeMm: number;
  uvIndex: number;
  soilMoisturePct: number;
  advisory: string;
  forecast: DailyWeatherForecast[];
  lastUpdated: string;
}
