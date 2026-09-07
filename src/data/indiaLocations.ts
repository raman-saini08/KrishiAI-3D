import {
  BuyerProfile,
  CropListing,
  CropSuitabilityRecommendation,
  LocationState,
  MarketMandi,
  PriceEstimateResult,
  QualityGrade,
  StateInfo,
} from '../types';

/**
 * Comprehensive India Location Directory
 * Covers major States & Union Territories with agro-climatic data, districts, mandis, and PIN codes.
 */
export const INDIA_STATES_DATA: StateInfo[] = [
  {
    name: 'Uttarakhand',
    code: 'UK',
    type: 'State',
    region: 'North',
    districts: [
      {
        name: 'Dehradun',
        headquarters: 'Dehradun',
        lat: 30.3165,
        lng: 78.0322,
        majorCrops: ['Basmati Rice', 'Tomatoes', 'Lychee', 'Ginger', 'Maize', 'Wheat'],
        climateZone: 'Sub-Tropical Valley',
        soilTypes: ['Alluvial Loam', 'Mountain Soil'],
        mandis: ['Dehradun Mandi (Niranjanpur)', 'Rishikesh APMC', 'Vikasnagar Sub-Mandi'],
        citiesVillages: [
          { name: 'Niranjanpur', pincode: '248001', lat: 30.3065, lng: 78.021 },
          { name: 'Premnagar', pincode: '248007', lat: 30.334, lng: 77.962 },
          { name: 'Vikasnagar', pincode: '248198', lat: 30.495, lng: 77.771 },
          { name: 'Rishikesh', pincode: '249201', lat: 30.0869, lng: 78.2676 },
          { name: 'Doiwala', pincode: '248140', lat: 30.1776, lng: 78.1189 },
          { name: 'Kalsi', pincode: '248158', lat: 30.5342, lng: 77.8541 },
        ],
      },
      {
        name: 'Haridwar',
        headquarters: 'Haridwar',
        lat: 29.9457,
        lng: 78.1642,
        majorCrops: ['Sugarcane', 'Paddy', 'Wheat', 'Potatoes', 'Mustard', 'Vegetables'],
        climateZone: 'Tarai Fertile Plains',
        soilTypes: ['Alluvial', 'Sandy Loam'],
        mandis: ['Haridwar Mandi (Jwalapur)', 'Roorkee APMC', 'Laksar Mandi'],
        citiesVillages: [
          { name: 'Jwalapur', pincode: '249407', lat: 29.928, lng: 78.125 },
          { name: 'Roorkee', pincode: '247667', lat: 29.8543, lng: 77.888 },
          { name: 'Laksar', pincode: '247663', lat: 29.754, lng: 78.025 },
          { name: 'Bhagwanpur', pincode: '247661', lat: 29.938, lng: 77.81 },
        ],
      },
      {
        name: 'Nainital',
        headquarters: 'Nainital',
        lat: 29.3803,
        lng: 79.4636,
        majorCrops: ['Apples', 'Peaches', 'Plums', 'Potatoes', 'Capsicum', 'Garlic'],
        climateZone: 'Temperate Hill Region',
        soilTypes: ['Forest Loam', 'Brown Hill Soil'],
        mandis: ['Haldwani Mandi', 'Ramnagar APMC', 'Bhowali Sub-Yard'],
        citiesVillages: [
          { name: 'Haldwani', pincode: '263139', lat: 29.2183, lng: 79.513 },
          { name: 'Ramnagar', pincode: '244715', lat: 29.395, lng: 79.127 },
          { name: 'Bhowali', pincode: '263132', lat: 29.383, lng: 79.516 },
          { name: 'Mukteshwar', pincode: '263138', lat: 29.472, lng: 79.647 },
        ],
      },
      {
        name: 'Udham Singh Nagar',
        headquarters: 'Rudrapur',
        lat: 28.9798,
        lng: 79.4005,
        majorCrops: ['Rice (Basmati & Non-Basmati)', 'Wheat', 'Sugarcane', 'Poplar', 'Mentha', 'Peas'],
        climateZone: 'Tarai Granary',
        soilTypes: ['Deep Alluvial', 'Clayey Loam'],
        mandis: ['Kashipur Mandi', 'Rudrapur APMC', 'Kichha Mandi', 'Bazpur Mandi'],
        citiesVillages: [
          { name: 'Rudrapur', pincode: '263153', lat: 28.98, lng: 79.4 },
          { name: 'Kashipur', pincode: '244713', lat: 29.21, lng: 78.96 },
          { name: 'Kichha', pincode: '263148', lat: 28.91, lng: 79.51 },
          { name: 'Bazpur', pincode: '262401', lat: 29.15, lng: 79.12 },
        ],
      },
    ],
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    type: 'State',
    region: 'West',
    districts: [
      {
        name: 'Nashik',
        headquarters: 'Nashik',
        lat: 19.9975,
        lng: 73.7898,
        majorCrops: ['Onions', 'Grapes', 'Tomatoes', 'Pomegranate', 'Sugarcane', 'Soybean'],
        climateZone: 'Semi-Arid Deccan Plateau',
        soilTypes: ['Black Cotton Soil', 'Red Loam'],
        mandis: ['Lasalgaon Mandi (Asia Onion Capital)', 'Pimpalgaon APMC', 'Nashik Dindori Mandi'],
        citiesVillages: [
          { name: 'Lasalgaon', pincode: '422306', lat: 20.1478, lng: 74.2268 },
          { name: 'Pimpalgaon Baswant', pincode: '422209', lat: 20.174, lng: 73.987 },
          { name: 'Dindori', pincode: '422202', lat: 20.201, lng: 73.834 },
          { name: 'Niphad', pincode: '422303', lat: 20.089, lng: 74.108 },
          { name: 'Sinnar', pincode: '422103', lat: 19.851, lng: 74.004 },
        ],
      },
      {
        name: 'Pune',
        headquarters: 'Pune',
        lat: 18.5204,
        lng: 73.8567,
        majorCrops: ['Sugarcane', 'Tomatoes', 'Floriculture', 'Pomegranate', 'Onions', 'Wheat'],
        climateZone: 'Western Ghats Foothills',
        soilTypes: ['Medium Black Soil', 'Lateritic'],
        mandis: ['Pune Gultekdi APMC', 'Baramati Mandi', 'Manchar APMC', 'Narayangaon Tomato Hub'],
        citiesVillages: [
          { name: 'Narayangaon', pincode: '410504', lat: 19.124, lng: 73.978 },
          { name: 'Baramati', pincode: '413102', lat: 18.151, lng: 74.577 },
          { name: 'Manchar', pincode: '410503', lat: 19.008, lng: 73.944 },
          { name: 'Khed (Rajgurunagar)', pincode: '410505', lat: 18.855, lng: 73.882 },
          { name: 'Junnar', pincode: '410502', lat: 19.206, lng: 73.876 },
        ],
      },
      {
        name: 'Nagpur',
        headquarters: 'Nagpur',
        lat: 21.1458,
        lng: 79.0882,
        majorCrops: ['Nagpur Oranges / Mandarin', 'Cotton', 'Soybean', 'Tur (Pigeon Pea)', 'Chili'],
        climateZone: 'Vidarbha Tropical Dry',
        soilTypes: ['Deep Black Clayey', 'Red Sandy'],
        mandis: ['Nagpur Cotton & Orange APMC (Kalamna)', 'Katol Mandi', 'Saoner APMC'],
        citiesVillages: [
          { name: 'Katol', pincode: '441302', lat: 21.272, lng: 78.587 },
          { name: 'Saoner', pincode: '441107', lat: 21.385, lng: 78.919 },
          { name: 'Kalmeshwar', pincode: '441501', lat: 21.233, lng: 78.914 },
          { name: 'Narkhed', pincode: '441304', lat: 21.365, lng: 78.532 },
        ],
      },
      {
        name: 'Solapur',
        headquarters: 'Solapur',
        lat: 17.6599,
        lng: 75.9064,
        majorCrops: ['Pomegranate', 'Sugarcane', 'Jowar', 'Turmeric', 'Grapes', 'Groundnut'],
        climateZone: 'Drought Prone Deccan',
        soilTypes: ['Black Soil', 'Shallow Loam'],
        mandis: ['Solapur APMC', 'Akkalkot Mandi', 'Pandharpur APMC'],
        citiesVillages: [
          { name: 'Pandharpur', pincode: '413304', lat: 17.676, lng: 75.323 },
          { name: 'Akkalkot', pincode: '413216', lat: 17.525, lng: 76.205 },
          { name: 'Barshi', pincode: '413401', lat: 18.232, lng: 75.696 },
        ],
      },
    ],
  },
  {
    name: 'Punjab',
    code: 'PB',
    type: 'State',
    region: 'North',
    districts: [
      {
        name: 'Ludhiana',
        headquarters: 'Ludhiana',
        lat: 30.901,
        lng: 75.8573,
        majorCrops: ['Wheat', 'Paddy', 'Potato Seed', 'Mustard', 'Maize', 'Sunflower'],
        climateZone: 'Indo-Gangetic Granary',
        soilTypes: ['Rich Alluvial Soil', 'Silty Clay Loam'],
        mandis: ['Ludhiana Dana Mandi', 'Khanna APMC (Asia Largest Grain Market)', 'Jagraon Mandi'],
        citiesVillages: [
          { name: 'Khanna', pincode: '141401', lat: 30.7071, lng: 76.2166 },
          { name: 'Jagraon', pincode: '142026', lat: 30.784, lng: 75.481 },
          { name: 'Samrala', pincode: '141114', lat: 30.835, lng: 76.192 },
          { name: 'Doraha', pincode: '141421', lat: 30.803, lng: 75.976 },
        ],
      },
      {
        name: 'Amritsar',
        headquarters: 'Amritsar',
        lat: 31.634,
        lng: 74.8723,
        majorCrops: ['Basmati Rice (1121, 1509)', 'Wheat', 'Vegetables', 'Green Fodder'],
        climateZone: 'Majha Plains',
        soilTypes: ['Alluvial Loam'],
        mandis: ['Bhagtanwala Grain Market', 'Rayya Mandi', 'Majitha APMC'],
        citiesVillages: [
          { name: 'Rayya', pincode: '143112', lat: 31.542, lng: 75.228 },
          { name: 'Majitha', pincode: '143601', lat: 31.761, lng: 74.954 },
          { name: 'Ajnala', pincode: '143102', lat: 31.841, lng: 74.761 },
          { name: 'Jandiala Guru', pincode: '143115', lat: 31.564, lng: 75.023 },
        ],
      },
      {
        name: 'Bathinda',
        headquarters: 'Bathinda',
        lat: 30.211,
        lng: 74.9455,
        majorCrops: ['Bt Cotton', 'Wheat', 'Mustard', 'Guar', 'Kinnow Citrus'],
        climateZone: 'Malwa Semi-Arid Cotton Belt',
        soilTypes: ['Sandy Loam', 'Desert Alluvial'],
        mandis: ['Bathinda Cotton Mandi', 'Rampura Phul APMC', 'Talwandi Sabo Mandi'],
        citiesVillages: [
          { name: 'Rampura Phul', pincode: '151103', lat: 30.271, lng: 75.241 },
          { name: 'Talwandi Sabo', pincode: '151302', lat: 29.985, lng: 75.088 },
          { name: 'Maur', pincode: '151509', lat: 30.081, lng: 75.242 },
        ],
      },
    ],
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    type: 'State',
    region: 'North',
    districts: [
      {
        name: 'Varanasi',
        headquarters: 'Varanasi',
        lat: 25.3176,
        lng: 82.9739,
        majorCrops: ['Paddy', 'Wheat', 'Langra Mango', 'Green Pea', 'Tomatoes', 'Brinjal'],
        climateZone: 'Eastern Gangetic Plain',
        soilTypes: ['Alluvial', 'Fine Sandy Loam'],
        mandis: ['Chandasi Mandi', 'Varanasi APMC (Panchkoshi)', 'Raja Talab Vegetable Market'],
        citiesVillages: [
          { name: 'Raja Talab', pincode: '221307', lat: 25.267, lng: 82.859 },
          { name: 'Pindra', pincode: '221206', lat: 25.485, lng: 82.802 },
          { name: 'Ramnagar', pincode: '221008', lat: 25.269, lng: 83.031 },
          { name: 'Sewapuri', pincode: '221403', lat: 25.334, lng: 82.781 },
        ],
      },
      {
        name: 'Agra',
        headquarters: 'Agra',
        lat: 27.1767,
        lng: 78.0081,
        majorCrops: ['Potatoes (Largest Hub)', 'Mustard', 'Bajra (Pearl Millet)', 'Wheat', 'Garlic'],
        climateZone: 'Braj Semi-Arid Basin',
        soilTypes: ['Sandy Loam', 'Alluvial'],
        mandis: ['Khandauli Potato Mandi', 'Agra APMC (Fatehabad Road)', 'Achhnera Mandi'],
        citiesVillages: [
          { name: 'Khandauli', pincode: '283126', lat: 27.272, lng: 78.113 },
          { name: 'Achhnera', pincode: '283101', lat: 27.181, lng: 77.761 },
          { name: 'Fatehabad', pincode: '283111', lat: 27.021, lng: 78.307 },
          { name: 'Shamsabad', pincode: '283125', lat: 27.017, lng: 78.125 },
        ],
      },
      {
        name: 'Lucknow',
        headquarters: 'Lucknow',
        lat: 26.8467,
        lng: 80.9462,
        majorCrops: ['Dasheri Mango (Malihabad)', 'Paddy', 'Wheat', 'Sugarcane', 'Mentha'],
        climateZone: 'Awadh Central Plain',
        soilTypes: ['Alluvial Loam'],
        mandis: ['Dubagga Mandi', 'Sitapur Road Naveen Galla Mandi', 'Malihabad Mango Mandi'],
        citiesVillages: [
          { name: 'Malihabad', pincode: '226102', lat: 26.921, lng: 80.718 },
          { name: 'Bakshi Ka Talab', pincode: '226201', lat: 27.003, lng: 80.902 },
          { name: 'Mohanlalganj', pincode: '226301', lat: 26.671, lng: 80.985 },
          { name: 'Kakori', pincode: '226107', lat: 26.877, lng: 80.803 },
        ],
      },
    ],
  },
  {
    name: 'Haryana',
    code: 'HR',
    type: 'State',
    region: 'North',
    districts: [
      {
        name: 'Karnal',
        headquarters: 'Karnal',
        lat: 29.6857,
        lng: 76.9905,
        majorCrops: ['Super Basmati Rice', 'Wheat', 'Dairy / Fodder', 'Vegetables', 'Mushrooms'],
        climateZone: 'Upper Gangetic Rice-Wheat Bowl',
        soilTypes: ['Alluvial Silt Loam'],
        mandis: ['Karnal New Grain Market', 'Taraori Basmati Mandi', 'Gharaunda Vegetable Center'],
        citiesVillages: [
          { name: 'Taraori', pincode: '132116', lat: 29.805, lng: 76.924 },
          { name: 'Gharaunda', pincode: '132114', lat: 29.539, lng: 76.972 },
          { name: 'Nilokheri', pincode: '132117', lat: 29.832, lng: 76.918 },
          { name: 'Indri', pincode: '132041', lat: 29.878, lng: 77.058 },
        ],
      },
      {
        name: 'Hisar',
        headquarters: 'Hisar',
        lat: 29.1492,
        lng: 75.7217,
        majorCrops: ['Cotton', 'Mustard', 'Wheat', 'Gram (Chana)', 'Guar'],
        climateZone: 'Arid Malwa Transition',
        soilTypes: ['Sandy Loam', 'Desert Soil'],
        mandis: ['Hisar Grain & Cotton Mandi', 'Hansi APMC', 'Barwala Mandi'],
        citiesVillages: [
          { name: 'Hansi', pincode: '125033', lat: 29.102, lng: 75.961 },
          { name: 'Barwala', pincode: '125121', lat: 29.378, lng: 75.912 },
          { name: 'Uklana', pincode: '125113', lat: 29.521, lng: 75.871 },
        ],
      },
    ],
  },
  {
    name: 'Himachal Pradesh',
    code: 'HP',
    type: 'State',
    region: 'North',
    districts: [
      {
        name: 'Shimla',
        headquarters: 'Shimla',
        lat: 31.1048,
        lng: 77.1734,
        majorCrops: ['Royal Delicious Apples', 'Cherries', 'Plums', 'Off-Season Peas', 'Cauliflower'],
        climateZone: 'High Altitude Temperate',
        soilTypes: ['Brown Forest Soil', 'Podzolic'],
        mandis: ['Dhalli Fruit Mandi', 'Parala APMC (Theog)', 'Bhattakufer Sub-Yard'],
        citiesVillages: [
          { name: 'Theog', pincode: '171201', lat: 31.121, lng: 77.354 },
          { name: 'Kotkhai', pincode: '171202', lat: 31.118, lng: 77.531 },
          { name: 'Rohru', pincode: '171207', lat: 31.205, lng: 77.751 },
          { name: 'Kumarsain', pincode: '172029', lat: 31.317, lng: 77.449 },
        ],
      },
      {
        name: 'Solan',
        headquarters: 'Solan',
        lat: 30.9084,
        lng: 77.0999,
        majorCrops: ['Tomatoes (Mushroom City)', 'Button Mushrooms', 'Capsicum', 'Ginger', 'Kiwi'],
        climateZone: 'Sub-Temperate Valleys',
        soilTypes: ['Mountain Forest Loam'],
        mandis: ['Solan Tomato Mandi (Kumarhatti)', 'Kandaghat APMC', 'Nalagarh Mandi'],
        citiesVillages: [
          { name: 'Kumarhatti', pincode: '173229', lat: 30.871, lng: 77.051 },
          { name: 'Kandaghat', pincode: '173215', lat: 30.963, lng: 77.108 },
          { name: 'Nalagarh', pincode: '174101', lat: 31.042, lng: 76.719 },
        ],
      },
    ],
  },
  {
    name: 'Rajasthan',
    code: 'RJ',
    type: 'State',
    region: 'North',
    districts: [
      {
        name: 'Jaipur',
        headquarters: 'Jaipur',
        lat: 26.9124,
        lng: 75.7873,
        majorCrops: ['Mustard', 'Bajra', 'Barley', 'Wheat', 'Onions', 'Coriander'],
        climateZone: 'Semi-Arid',
        soilTypes: ['Sandy Loam', 'Alluvial'],
        mandis: ['Jaipur Muhana Mandi (Largest Agri Terminal)', 'Kukas APMC', 'Chomu Vegetable Hub'],
        citiesVillages: [
          { name: 'Chomu', pincode: '303702', lat: 27.172, lng: 75.723 },
          { name: 'Muhana', pincode: '302029', lat: 26.804, lng: 75.742 },
          { name: 'Kotputli', pincode: '303108', lat: 27.705, lng: 76.202 },
          { name: 'Bassi', pincode: '303301', lat: 26.832, lng: 76.045 },
        ],
      },
      {
        name: 'Kota',
        headquarters: 'Kota',
        lat: 25.2138,
        lng: 75.8648,
        majorCrops: ['Soybean', 'Wheat', 'Mustard', 'Coriander', 'Paddy', 'Garlic'],
        climateZone: 'Hadoti Sub-Humid',
        soilTypes: ['Deep Black Clay', 'Alluvial'],
        mandis: ['Bhamashah APMC Grain Mandi (Kota)', 'Ramganj Mandi (Asia Coriander Hub)', 'Itawa Mandi'],
        citiesVillages: [
          { name: 'Ramganj Mandi', pincode: '326519', lat: 24.651, lng: 75.945 },
          { name: 'Itawa', pincode: '325004', lat: 25.568, lng: 76.498 },
          { name: 'Sangod', pincode: '325601', lat: 24.922, lng: 76.282 },
        ],
      },
    ],
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    type: 'State',
    region: 'West',
    districts: [
      {
        name: 'Ahmedabad',
        headquarters: 'Ahmedabad',
        lat: 23.0225,
        lng: 72.5714,
        majorCrops: ['Cotton', 'Wheat (Bhalia)', 'Castor', 'Cumin (Jeera)', 'Paddy'],
        climateZone: 'North Gujarat Semi-Arid',
        soilTypes: ['Alluvial Goradu', 'Medium Black'],
        mandis: ['APMC Jamalpur Vegetable Market', 'Bavla Rice Mandi', 'Sanand Cotton Market', 'Dhandhuka Mandi'],
        citiesVillages: [
          { name: 'Bavla', pincode: '382220', lat: 22.836, lng: 72.361 },
          { name: 'Sanand', pincode: '382110', lat: 22.988, lng: 72.381 },
          { name: 'Dholka', pincode: '382225', lat: 22.721, lng: 72.441 },
        ],
      },
      {
        name: 'Rajkot',
        headquarters: 'Rajkot',
        lat: 22.3039,
        lng: 70.8022,
        majorCrops: ['Groundnut (Peanut)', 'Cotton', 'Sesame', 'Castor', 'Cumin', 'Onions'],
        climateZone: 'Saurashtra Dry Zone',
        soilTypes: ['Medium to Heavy Black Cotton Soil'],
        mandis: ['Rajkot Bedi APMC (Major Oilseed Hub)', 'Gondal APMC (Famous Chili & Peanut Hub)', 'Jasdan Mandi'],
        citiesVillages: [
          { name: 'Gondal', pincode: '360311', lat: 21.961, lng: 70.798 },
          { name: 'Bedi', pincode: '360003', lat: 22.341, lng: 70.835 },
          { name: 'Jasdan', pincode: '360050', lat: 22.033, lng: 71.205 },
        ],
      },
    ],
  },
  {
    name: 'Madhya Pradesh',
    code: 'MP',
    type: 'State',
    region: 'Central',
    districts: [
      {
        name: 'Indore',
        headquarters: 'Indore',
        lat: 22.7196,
        lng: 75.8577,
        majorCrops: ['Soybean (Heart of Soy)', 'Wheat (Sharbati)', 'Garlic', 'Potatoes', 'Onions', 'Gram'],
        climateZone: 'Malwa Plateau',
        soilTypes: ['Deep Black Cotton Soil'],
        mandis: ['Indore Choithram Mandi', 'Sanwer APMC', 'Mhow Krishi Upaj Mandi'],
        citiesVillages: [
          { name: 'Sanwer', pincode: '453551', lat: 22.977, lng: 75.828 },
          { name: 'Depalpur', pincode: '453115', lat: 22.853, lng: 75.549 },
          { name: 'Rau', pincode: '453331', lat: 22.632, lng: 75.811 },
        ],
      },
      {
        name: 'Ujjain',
        headquarters: 'Ujjain',
        lat: 23.1765,
        lng: 75.7885,
        majorCrops: ['Soybean', 'Sharbati Wheat', 'Gram', 'Mustard', 'Opium (Regulated)', 'Garlic'],
        climateZone: 'Malwa Sub-Humid',
        soilTypes: ['Medium & Deep Black'],
        mandis: ['Ujjain Chimanganj Mandi', 'Nagda APMC', 'Mahidpur Mandi', 'Tarana Mandi'],
        citiesVillages: [
          { name: 'Nagda', pincode: '456335', lat: 23.455, lng: 75.412 },
          { name: 'Tarana', pincode: '456665', lat: 23.335, lng: 76.042 },
          { name: 'Khachrod', pincode: '456224', lat: 23.421, lng: 75.281 },
        ],
      },
    ],
  },
  {
    name: 'Bihar',
    code: 'BR',
    type: 'State',
    region: 'East',
    districts: [
      {
        name: 'Muzaffarpur',
        headquarters: 'Muzaffarpur',
        lat: 26.1209,
        lng: 85.3647,
        majorCrops: ['Shahi Lychee (GI Tag)', 'Maize', 'Paddy', 'Wheat', 'Tobacco', 'Mango'],
        climateZone: 'North Bihar Alluvial Plains',
        soilTypes: ['Calcareous Alluvial Loam'],
        mandis: ['Muzaffarpur Bairia Bazar Mandi', 'Kanti APMC', 'Motipur Grain Market'],
        citiesVillages: [
          { name: 'Bairia', pincode: '842003', lat: 26.134, lng: 85.351 },
          { name: 'Kanti', pincode: '843109', lat: 26.202, lng: 85.302 },
          { name: 'Motipur', pincode: '843111', lat: 26.271, lng: 85.178 },
        ],
      },
      {
        name: 'Patna',
        headquarters: 'Patna',
        lat: 25.5941,
        lng: 85.1376,
        majorCrops: ['Paddy', 'Wheat', 'Lentils (Masoor, Gram)', 'Potatoes', 'Vegetables', 'Maize'],
        climateZone: 'Gangetic Basin',
        soilTypes: ['Heavy Clay Alluvial'],
        mandis: ['Patna City Bazar Samiti Mandi', 'Mokama Pulses Hub', 'Bihta Grain Yard', 'Barh Mandi'],
        citiesVillages: [
          { name: 'Bihta', pincode: '801103', lat: 25.568, lng: 84.871 },
          { name: 'Mokama', pincode: '803302', lat: 25.394, lng: 85.918 },
          { name: 'Bakhtiyarpur', pincode: '803212', lat: 25.459, lng: 85.526 },
        ],
      },
    ],
  },
  {
    name: 'West Bengal',
    code: 'WB',
    type: 'State',
    region: 'East',
    districts: [
      {
        name: 'Hooghly',
        headquarters: 'Chinsurah',
        lat: 22.903,
        lng: 88.3968,
        majorCrops: ['Potatoes (Jyoti/Chandramukhi)', 'Jute', 'Paddy (Aman/Boro)', 'Vegetables', 'Mustard'],
        climateZone: 'Lower Gangetic Delta',
        soilTypes: ['Rich Gangetic Silt Loam'],
        mandis: ['Sheoraphuli Wholesale Market', 'Tarakeswar Potato Mandi', 'Arambagh APMC'],
        citiesVillages: [
          { name: 'Tarakeswar', pincode: '712410', lat: 22.885, lng: 88.021 },
          { name: 'Arambagh', pincode: '712601', lat: 22.881, lng: 87.781 },
          { name: 'Singur', pincode: '712409', lat: 22.812, lng: 88.231 },
          { name: 'Pandua', pincode: '712149', lat: 23.081, lng: 88.281 },
        ],
      },
      {
        name: 'Nadia',
        headquarters: 'Krishnanagar',
        lat: 23.4013,
        lng: 88.5028,
        majorCrops: ['Jute', 'Paddy', 'Vegetables', 'Flowers', 'Betel Leaf', 'Mustard'],
        climateZone: 'Deltaic Alluvial',
        soilTypes: ['Clay Loam'],
        mandis: ['Krishnanagar APMC', 'Ranaghat Vegetable Market', 'Bethuadahari Mandi'],
        citiesVillages: [
          { name: 'Ranaghat', pincode: '741201', lat: 23.181, lng: 88.581 },
          { name: 'Chakdaha', pincode: '741222', lat: 23.081, lng: 88.521 },
          { name: 'Bethuadahari', pincode: '741126', lat: 23.621, lng: 88.391 },
        ],
      },
    ],
  },
  {
    name: 'Karnataka',
    code: 'KA',
    type: 'State',
    region: 'South',
    districts: [
      {
        name: 'Bengaluru Rural',
        headquarters: 'Bengaluru',
        lat: 13.2847,
        lng: 77.5878,
        majorCrops: ['Ragi (Finger Millet)', 'Grapes (Bangalore Blue)', 'Tomatoes', 'Capsicum', 'Floriculture', 'Silk Cocoon'],
        climateZone: 'Southern Dry Semi-Arid Zone',
        soilTypes: ['Red Sandy Loam', 'Lateritic Loam'],
        mandis: ['Doddaballapur APMC', 'Hoskote Vegetable Market', 'Devanahalli Fruit Mandi'],
        citiesVillages: [
          { name: 'Doddaballapur', pincode: '561203', lat: 13.298, lng: 77.538 },
          { name: 'Hoskote', pincode: '562114', lat: 13.069, lng: 77.798 },
          { name: 'Devanahalli', pincode: '562110', lat: 13.248, lng: 77.712 },
          { name: 'Nelamangala', pincode: '562123', lat: 13.098, lng: 77.391 },
        ],
      },
      {
        name: 'Belagavi',
        headquarters: 'Belagavi',
        lat: 15.8497,
        lng: 74.4977,
        majorCrops: ['Sugarcane', 'Soybean', 'Cotton', 'Tomatoes', 'Tobacco', 'Maize'],
        climateZone: 'Northern Transitional Zone',
        soilTypes: ['Black Clay Soil', 'Red Loam'],
        mandis: ['Belagavi APMC', 'Athani Sugarcane Hub', 'Gokak Mandi', 'Bailhongal Cotton Market'],
        citiesVillages: [
          { name: 'Athani', pincode: '591304', lat: 16.732, lng: 75.059 },
          { name: 'Gokak', pincode: '591307', lat: 16.168, lng: 74.825 },
          { name: 'Chikkodi', pincode: '591201', lat: 16.431, lng: 74.598 },
        ],
      },
    ],
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    type: 'State',
    region: 'South',
    districts: [
      {
        name: 'Coimbatore',
        headquarters: 'Coimbatore',
        lat: 11.0168,
        lng: 76.9558,
        majorCrops: ['Coconut', 'Tea', 'Cotton', 'Tomatoes', 'Small Onions (Shallots)', 'Turmeric'],
        climateZone: 'Western Semi-Arid Plateau',
        soilTypes: ['Red Gravelly Loam', 'Black Cotton Soil'],
        mandis: ['Coimbatore MGR Wholesale Market', 'Pollachi Coconut APMC (Largest Coconut Market)', 'Thondamuthur Vegetable Yard'],
        citiesVillages: [
          { name: 'Pollachi', pincode: '642001', lat: 10.661, lng: 77.008 },
          { name: 'Thondamuthur', pincode: '641109', lat: 10.998, lng: 76.831 },
          { name: 'Karamadai', pincode: '641104', lat: 11.242, lng: 76.958 },
          { name: 'Sulur', pincode: '641402', lat: 11.028, lng: 77.128 },
        ],
      },
      {
        name: 'Dindigul',
        headquarters: 'Dindigul',
        lat: 10.3673,
        lng: 77.9803,
        majorCrops: ['Small Onions', 'Garlic (Kodaikanal Hill)', 'Drumstick', 'Bananas', 'Flowers (Jasmine)'],
        climateZone: 'Southern Dry Semi-Arid',
        soilTypes: ['Red Loam', 'Sandy Silt'],
        mandis: ['Dindigul Gandhi Market', 'Oddanchatram Vegetable APMC (Largest Vegetable Market in TN)', 'Palani Mandi'],
        citiesVillages: [
          { name: 'Oddanchatram', pincode: '624619', lat: 10.485, lng: 77.747 },
          { name: 'Palani', pincode: '624601', lat: 10.451, lng: 77.518 },
          { name: 'Nilakottai', pincode: '624208', lat: 10.161, lng: 77.861 },
          { name: 'Kodaikanal', pincode: '624101', lat: 10.238, lng: 77.489 },
        ],
      },
    ],
  },
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    type: 'State',
    region: 'South',
    districts: [
      {
        name: 'Guntur',
        headquarters: 'Guntur',
        lat: 16.3067,
        lng: 80.4365,
        majorCrops: ['Guntur Red Chili (Teja/334)', 'Cotton', 'Tobacco', 'Paddy', 'Turmeric', 'Black Gram'],
        climateZone: 'Krishna Delta Sub-Humid',
        soilTypes: ['Deep Black Cotton Soil', 'Deltaic Alluvial'],
        mandis: ['Guntur Mirchi Yard (Asia Largest Chili Market)', 'Tenali Paddy Mandi', 'Narasaraopet APMC'],
        citiesVillages: [
          { name: 'Guntur Rural', pincode: '522001', lat: 16.311, lng: 80.421 },
          { name: 'Tenali', pincode: '522201', lat: 16.243, lng: 80.648 },
          { name: 'Narasaraopet', pincode: '522601', lat: 16.236, lng: 80.051 },
          { name: 'Bapatla', pincode: '522101', lat: 15.908, lng: 80.468 },
        ],
      },
    ],
  },
  {
    name: 'Telangana',
    code: 'TG',
    type: 'State',
    region: 'South',
    districts: [
      {
        name: 'Warangal',
        headquarters: 'Warangal',
        lat: 17.9689,
        lng: 79.5941,
        majorCrops: ['Cotton', 'Red Chili', 'Turmeric', 'Maize', 'Paddy'],
        climateZone: 'Telangana Semi-Arid',
        soilTypes: ['Red Chalkas', 'Deep Black Soil'],
        mandis: ['Enumamula APMC (Largest Grain & Chili Yard in TG)', 'Narsampet Mandi', 'Jangaon Market'],
        citiesVillages: [
          { name: 'Enumamula', pincode: '506005', lat: 17.982, lng: 79.621 },
          { name: 'Narsampet', pincode: '506132', lat: 17.925, lng: 79.892 },
          { name: 'Wardhannapet', pincode: '506313', lat: 17.765, lng: 79.621 },
        ],
      },
    ],
  },
  {
    name: 'Assam',
    code: 'AS',
    type: 'State',
    region: 'North-East',
    districts: [
      {
        name: 'Dibrugarh',
        headquarters: 'Dibrugarh',
        lat: 27.4728,
        lng: 94.912,
        majorCrops: ['Assam CTC Tea', 'Bhut Jolokia (Ghost Pepper)', 'Winter Paddy (Sali)', 'Mustard', 'Citrus'],
        climateZone: 'Humid Sub-Tropical High Rainfall',
        soilTypes: ['Red Loam', 'Riverine Alluvial'],
        mandis: ['Dibrugarh APMC Market Yard', 'Naharkatia Tea & Spice Mandi', 'Chabua Agricultural Market'],
        citiesVillages: [
          { name: 'Naharkatia', pincode: '786610', lat: 27.281, lng: 95.261 },
          { name: 'Chabua', pincode: '786184', lat: 27.481, lng: 95.181 },
          { name: 'Moranhat', pincode: '785670', lat: 27.181, lng: 94.931 },
        ],
      },
    ],
  },
  {
    name: 'Kerala',
    code: 'KL',
    type: 'State',
    region: 'South',
    districts: [
      {
        name: 'Wayanad',
        headquarters: 'Kalpetta',
        lat: 11.6854,
        lng: 76.132,
        majorCrops: ['Black Pepper', 'Robusta Coffee', 'Cardamom', 'Ginger', 'Tea', 'Arecanut', 'Paddy (Gandhakasala)'],
        climateZone: 'Western Ghats Humid Montane',
        soilTypes: ['Forest Loam', 'Laterite Soil'],
        mandis: ['Kalpetta Spices APMC', 'Sulthan Bathery Spices Yard', 'Mananthavady Agri Market'],
        citiesVillages: [
          { name: 'Sulthan Bathery', pincode: '673592', lat: 11.662, lng: 76.257 },
          { name: 'Kalpetta', pincode: '673121', lat: 11.611, lng: 76.082 },
          { name: 'Mananthavady', pincode: '670645', lat: 11.803, lng: 76.003 },
        ],
      },
    ],
  },
];

/**
 * Default initial Location (Dehradun, Uttarakhand)
 */
export const DEFAULT_FARMER_LOCATION: LocationState = {
  state: 'Uttarakhand',
  district: 'Dehradun',
  cityVillage: 'Niranjanpur',
  pincode: '248001',
  lat: 30.3165,
  lng: 78.0322,
  formattedAddress: 'Niranjanpur, Dehradun, Uttarakhand - 248001',
};

/**
 * Haversine formula to compute geodesic distance between two GPS coordinates in kilometers
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Nearby Mandis / APMC Markets Across India
 */
export const ALL_INDIA_MANDIS: MarketMandi[] = [
  {
    id: 'mandi-uk-1',
    name: 'Dehradun Mandi (Niranjanpur)',
    district: 'Dehradun',
    state: 'Uttarakhand',
    lat: 30.3065,
    lng: 78.021,
    isGovtAPMC: true,
    lastUpdated: '15 mins ago',
    commodities: [
      { crop: 'Tomato', minPrice: 32, maxPrice: 38, modalPrice: 35, trendPct: 5.2, arrivalVolumeTonnes: 140, dailyChange: 'up' },
      { crop: 'Potato', minPrice: 18, maxPrice: 24, modalPrice: 22, trendPct: 1.5, arrivalVolumeTonnes: 260, dailyChange: 'up' },
      { crop: 'Onion', minPrice: 28, maxPrice: 34, modalPrice: 31, trendPct: -2.1, arrivalVolumeTonnes: 190, dailyChange: 'down' },
      { crop: 'Basmati Rice', minPrice: 62, maxPrice: 88, modalPrice: 75, trendPct: 3.4, arrivalVolumeTonnes: 320, dailyChange: 'up' },
      { crop: 'Wheat', minPrice: 23, maxPrice: 27, modalPrice: 25.5, trendPct: 0.8, arrivalVolumeTonnes: 450, dailyChange: 'stable' },
    ],
  },
  {
    id: 'mandi-uk-2',
    name: 'Rishikesh APMC Market',
    district: 'Dehradun',
    state: 'Uttarakhand',
    lat: 30.0869,
    lng: 78.2676,
    isGovtAPMC: true,
    lastUpdated: '1 hour ago',
    commodities: [
      { crop: 'Tomato', minPrice: 31, maxPrice: 36, modalPrice: 34, trendPct: 2.8, arrivalVolumeTonnes: 85, dailyChange: 'up' },
      { crop: 'Ginger', minPrice: 75, maxPrice: 95, modalPrice: 86, trendPct: 6.5, arrivalVolumeTonnes: 42, dailyChange: 'up' },
      { crop: 'Maize', minPrice: 20, maxPrice: 24, modalPrice: 22, trendPct: -1.0, arrivalVolumeTonnes: 110, dailyChange: 'down' },
    ],
  },
  {
    id: 'mandi-uk-3',
    name: 'Haridwar Jwalapur Mandi',
    district: 'Haridwar',
    state: 'Uttarakhand',
    lat: 29.928,
    lng: 78.125,
    isGovtAPMC: true,
    lastUpdated: '45 mins ago',
    commodities: [
      { crop: 'Sugarcane', minPrice: 3.6, maxPrice: 4.1, modalPrice: 3.9, trendPct: 1.2, arrivalVolumeTonnes: 1200, dailyChange: 'stable' },
      { crop: 'Potato', minPrice: 19, maxPrice: 23, modalPrice: 21, trendPct: -0.5, arrivalVolumeTonnes: 340, dailyChange: 'stable' },
      { crop: 'Mustard', minPrice: 52, maxPrice: 58, modalPrice: 55, trendPct: 4.0, arrivalVolumeTonnes: 160, dailyChange: 'up' },
    ],
  },
  {
    id: 'mandi-uk-4',
    name: 'Haldwani Mandi',
    district: 'Nainital',
    state: 'Uttarakhand',
    lat: 29.2183,
    lng: 79.513,
    isGovtAPMC: true,
    lastUpdated: '30 mins ago',
    commodities: [
      { crop: 'Apple', minPrice: 70, maxPrice: 120, modalPrice: 95, trendPct: 8.4, arrivalVolumeTonnes: 180, dailyChange: 'up' },
      { crop: 'Capsicum', minPrice: 38, maxPrice: 52, modalPrice: 46, trendPct: -3.2, arrivalVolumeTonnes: 75, dailyChange: 'down' },
      { crop: 'Garlic', minPrice: 110, maxPrice: 155, modalPrice: 135, trendPct: 11.2, arrivalVolumeTonnes: 60, dailyChange: 'up' },
    ],
  },
  {
    id: 'mandi-mh-1',
    name: 'Lasalgaon Onion Mandi',
    district: 'Nashik',
    state: 'Maharashtra',
    lat: 20.1478,
    lng: 74.2268,
    isGovtAPMC: true,
    lastUpdated: '10 mins ago',
    commodities: [
      { crop: 'Onion', minPrice: 24, maxPrice: 32, modalPrice: 28.5, trendPct: 6.8, arrivalVolumeTonnes: 2800, dailyChange: 'up' },
      { crop: 'Grapes', minPrice: 65, maxPrice: 110, modalPrice: 85, trendPct: 4.2, arrivalVolumeTonnes: 520, dailyChange: 'up' },
      { crop: 'Tomato', minPrice: 26, maxPrice: 33, modalPrice: 30, trendPct: 1.8, arrivalVolumeTonnes: 740, dailyChange: 'up' },
      { crop: 'Pomegranate', minPrice: 80, maxPrice: 140, modalPrice: 110, trendPct: -2.5, arrivalVolumeTonnes: 310, dailyChange: 'down' },
    ],
  },
  {
    id: 'mandi-mh-2',
    name: 'Narayangaon Tomato APMC',
    district: 'Pune',
    state: 'Maharashtra',
    lat: 19.124,
    lng: 73.978,
    isGovtAPMC: true,
    lastUpdated: '20 mins ago',
    commodities: [
      { crop: 'Tomato', minPrice: 28, maxPrice: 35, modalPrice: 32, trendPct: 7.5, arrivalVolumeTonnes: 980, dailyChange: 'up' },
      { crop: 'Onion', minPrice: 26, maxPrice: 33, modalPrice: 29.5, trendPct: 3.1, arrivalVolumeTonnes: 620, dailyChange: 'up' },
      { crop: 'Potato', minPrice: 20, maxPrice: 26, modalPrice: 23, trendPct: -1.2, arrivalVolumeTonnes: 450, dailyChange: 'down' },
    ],
  },
  {
    id: 'mandi-pb-1',
    name: 'Khanna Asia Grain Market',
    district: 'Ludhiana',
    state: 'Punjab',
    lat: 30.7071,
    lng: 76.2166,
    isGovtAPMC: true,
    lastUpdated: '12 mins ago',
    commodities: [
      { crop: 'Wheat', minPrice: 22.75, maxPrice: 25.5, modalPrice: 24.2, trendPct: 2.1, arrivalVolumeTonnes: 5400, dailyChange: 'up' },
      { crop: 'Paddy', minPrice: 21.8, maxPrice: 23.5, modalPrice: 22.5, trendPct: 0.5, arrivalVolumeTonnes: 4800, dailyChange: 'stable' },
      { crop: 'Potato', minPrice: 14, maxPrice: 19, modalPrice: 16.5, trendPct: -4.0, arrivalVolumeTonnes: 1200, dailyChange: 'down' },
    ],
  },
  {
    id: 'mandi-up-1',
    name: 'Khandauli Potato Mandi',
    district: 'Agra',
    state: 'Uttar Pradesh',
    lat: 27.272,
    lng: 78.113,
    isGovtAPMC: true,
    lastUpdated: '25 mins ago',
    commodities: [
      { crop: 'Potato', minPrice: 15, maxPrice: 21, modalPrice: 18.5, trendPct: 3.2, arrivalVolumeTonnes: 3200, dailyChange: 'up' },
      { crop: 'Mustard', minPrice: 53, maxPrice: 59, modalPrice: 56.5, trendPct: 2.8, arrivalVolumeTonnes: 480, dailyChange: 'up' },
      { crop: 'Wheat', minPrice: 23.5, maxPrice: 26, modalPrice: 24.8, trendPct: 1.0, arrivalVolumeTonnes: 950, dailyChange: 'stable' },
    ],
  },
  {
    id: 'mandi-hp-1',
    name: 'Parala Fruit APMC (Theog)',
    district: 'Shimla',
    state: 'Himachal Pradesh',
    lat: 31.121,
    lng: 77.354,
    isGovtAPMC: true,
    lastUpdated: '35 mins ago',
    commodities: [
      { crop: 'Apple', minPrice: 80, maxPrice: 145, modalPrice: 115, trendPct: 12.0, arrivalVolumeTonnes: 1400, dailyChange: 'up' },
      { crop: 'Cherry', minPrice: 160, maxPrice: 240, modalPrice: 200, trendPct: 5.0, arrivalVolumeTonnes: 85, dailyChange: 'up' },
      { crop: 'Green Pea', minPrice: 42, maxPrice: 65, modalPrice: 54, trendPct: 8.5, arrivalVolumeTonnes: 210, dailyChange: 'up' },
    ],
  },
  {
    id: 'mandi-ap-1',
    name: 'Guntur Mirchi Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    lat: 16.3067,
    lng: 80.4365,
    isGovtAPMC: true,
    lastUpdated: '18 mins ago',
    commodities: [
      { crop: 'Red Chili', minPrice: 165, maxPrice: 235, modalPrice: 195, trendPct: 8.9, arrivalVolumeTonnes: 2100, dailyChange: 'up' },
      { crop: 'Cotton', minPrice: 68, maxPrice: 78, modalPrice: 73, trendPct: 1.4, arrivalVolumeTonnes: 890, dailyChange: 'up' },
      { crop: 'Turmeric', minPrice: 135, maxPrice: 175, modalPrice: 155, trendPct: 4.8, arrivalVolumeTonnes: 430, dailyChange: 'up' },
    ],
  },
  {
    id: 'mandi-tn-1',
    name: 'Oddanchatram Vegetable APMC',
    district: 'Dindigul',
    state: 'Tamil Nadu',
    lat: 10.485,
    lng: 77.747,
    isGovtAPMC: true,
    lastUpdated: '14 mins ago',
    commodities: [
      { crop: 'Tomato', minPrice: 27, maxPrice: 34, modalPrice: 31, trendPct: 4.1, arrivalVolumeTonnes: 820, dailyChange: 'up' },
      { crop: 'Small Onion (Shallots)', minPrice: 42, maxPrice: 58, modalPrice: 50, trendPct: 9.3, arrivalVolumeTonnes: 610, dailyChange: 'up' },
      { crop: 'Drumstick', minPrice: 35, maxPrice: 55, modalPrice: 45, trendPct: -1.5, arrivalVolumeTonnes: 240, dailyChange: 'down' },
    ],
  },
];

/**
 * Verified Agro-Buyers Across India
 */
export const ALL_INDIA_BUYERS: BuyerProfile[] = [
  {
    id: 'buyer-1',
    name: 'FreshMart Foods Pvt Ltd',
    companyName: 'FreshMart Supply Chain Network',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    state: 'Uttarakhand',
    district: 'Haridwar',
    cityVillage: 'Jwalapur',
    pincode: '249407',
    lat: 29.928,
    lng: 78.125,
    preferredRadiusKm: 100,
    cropsWanted: ['Tomatoes', 'Potatoes', 'Onions', 'Capsicum'],
    requiredQuantityKg: 5000,
    expectedPricePerKg: 36,
    contactNumber: '+91 98971 44520',
    email: 'procurement@freshmartfoods.in',
    type: 'Retail Chain',
  },
  {
    id: 'buyer-2',
    name: 'Himalayan Organic Agro Co.',
    companyName: 'Himalayan Cold Storage & Processing',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    state: 'Uttarakhand',
    district: 'Dehradun',
    cityVillage: 'Doiwala',
    pincode: '248140',
    lat: 30.1776,
    lng: 78.1189,
    preferredRadiusKm: 50,
    cropsWanted: ['Tomatoes', 'Lychee', 'Ginger', 'Basmati Rice'],
    requiredQuantityKg: 3500,
    expectedPricePerKg: 38,
    contactNumber: '+91 94120 88219',
    email: 'contact@himalayanagro.org',
    type: 'Processor',
  },
  {
    id: 'buyer-3',
    name: 'Doon Green Basket FPO',
    companyName: 'Dehradun Farmers Producer Collective',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 4.7,
    state: 'Uttarakhand',
    district: 'Dehradun',
    cityVillage: 'Vikasnagar',
    pincode: '248198',
    lat: 30.495,
    lng: 77.771,
    preferredRadiusKm: 25,
    cropsWanted: ['Tomatoes', 'Potatoes', 'Wheat', 'Maize'],
    requiredQuantityKg: 8000,
    expectedPricePerKg: 35,
    contactNumber: '+91 97590 12345',
    email: 'fpo@doongreenbasket.com',
    type: 'FPO Aggregator',
  },
  {
    id: 'buyer-4',
    name: 'Sahyadri Agro Processing Ltd',
    companyName: 'Sahyadri Farmers Producer Co.',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    rating: 4.95,
    state: 'Maharashtra',
    district: 'Nashik',
    cityVillage: 'Pimpalgaon Baswant',
    pincode: '422209',
    lat: 20.174,
    lng: 73.987,
    preferredRadiusKm: 100,
    cropsWanted: ['Tomatoes', 'Onions', 'Grapes', 'Pomegranate'],
    requiredQuantityKg: 25000,
    expectedPricePerKg: 32,
    contactNumber: '+91 98224 55190',
    email: 'trade@sahyadrifarm.com',
    type: 'Exporter',
  },
  {
    id: 'buyer-5',
    name: 'Punjab Agro Cold Logistics',
    companyName: 'Ludhiana Food Processors Consortium',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    rating: 4.85,
    state: 'Punjab',
    district: 'Ludhiana',
    cityVillage: 'Khanna',
    pincode: '141401',
    lat: 30.7071,
    lng: 76.2166,
    preferredRadiusKm: 100,
    cropsWanted: ['Wheat', 'Potatoes', 'Paddy', 'Mustard'],
    requiredQuantityKg: 40000,
    expectedPricePerKg: 25,
    contactNumber: '+91 98765 43210',
    email: 'supply@punjabagro.gov.in',
    type: 'Wholesaler',
  },
  {
    id: 'buyer-6',
    name: 'Kashi Fresh Vegetables & Herbs',
    companyName: 'Varanasi Direct Farm-to-Fork Ltd',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 4.75,
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    cityVillage: 'Raja Talab',
    pincode: '221307',
    lat: 25.267,
    lng: 82.859,
    preferredRadiusKm: 50,
    cropsWanted: ['Tomatoes', 'Green Pea', 'Potatoes', 'Brinjal'],
    requiredQuantityKg: 6000,
    expectedPricePerKg: 34,
    contactNumber: '+91 94500 77112',
    email: 'order@kashifresh.in',
    type: 'Retail Chain',
  },
  {
    id: 'buyer-7',
    name: 'Southern Spice & Spices Exporters',
    companyName: 'Guntur Global Export Hub',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    state: 'Andhra Pradesh',
    district: 'Guntur',
    cityVillage: 'Tenali',
    pincode: '522201',
    lat: 16.243,
    lng: 80.648,
    preferredRadiusKm: 'state-wide',
    cropsWanted: ['Red Chili', 'Turmeric', 'Cotton', 'Black Gram'],
    requiredQuantityKg: 15000,
    expectedPricePerKg: 198,
    contactNumber: '+91 86322 99881',
    email: 'export@southernspices.com',
    type: 'Exporter',
  },
  {
    id: 'buyer-8',
    name: 'Bengal Agro Harvest',
    companyName: 'Hooghly Potato & Jute Aggregators',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 4.65,
    state: 'West Bengal',
    district: 'Hooghly',
    cityVillage: 'Tarakeswar',
    pincode: '712410',
    lat: 22.885,
    lng: 88.021,
    preferredRadiusKm: 50,
    cropsWanted: ['Potatoes', 'Jute', 'Paddy', 'Mustard'],
    requiredQuantityKg: 30000,
    expectedPricePerKg: 18,
    contactNumber: '+91 98310 33221',
    email: 'info@bengalagroharvest.co.in',
    type: 'Wholesaler',
  },
];

/**
 * Sample Crop Listings across India
 */
export const ALL_INDIA_CROP_LISTINGS: CropListing[] = [
  {
    id: 'listing-1',
    title: 'Fresh Organic Tomatoes (Grade A)',
    cropType: 'Tomatoes',
    variety: 'Himsona / Hybrid Red',
    grade: 'Grade A',
    quantityKg: 500,
    pricePerKg: 35,
    cityVillage: 'Niranjanpur',
    district: 'Dehradun',
    state: 'Uttarakhand',
    lat: 30.3065,
    lng: 78.021,
    farmerName: 'Ramesh Singh Negi',
    farmerPhone: '+91 98971 12345',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    harvestDate: 'Harvested Yesterday',
    diseaseStatus: 'Healthy',
    aiVerified: true,
    description: 'Crisp, firm, pesticide-free harvest verified with AI scanner. Optimal moisture & skin gloss.',
  },
  {
    id: 'listing-2',
    title: 'Russet & Kufri Jyoti Potatoes',
    cropType: 'Potatoes',
    variety: 'Kufri Jyoti Grade B',
    grade: 'Grade B',
    quantityKg: 1200,
    pricePerKg: 22,
    cityVillage: 'Jwalapur',
    district: 'Haridwar',
    state: 'Uttarakhand',
    lat: 29.928,
    lng: 78.125,
    farmerName: 'Kuldeep Sharma',
    farmerPhone: '+91 94120 77654',
    farmerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    harvestDate: 'Freshly Dug (2 days ago)',
    diseaseStatus: 'Healthy',
    aiVerified: true,
    description: 'Clean medium size tubers, ideal for processing and wholesale chip manufacturing.',
  },
  {
    id: 'listing-3',
    title: 'Lasalgaon Red Onions (Premium Export)',
    cropType: 'Onions',
    variety: 'Nashik Red Garwa',
    grade: 'Grade A',
    quantityKg: 2500,
    pricePerKg: 30,
    cityVillage: 'Lasalgaon',
    district: 'Nashik',
    state: 'Maharashtra',
    lat: 20.1478,
    lng: 74.2268,
    farmerName: 'Bhausaheb Patil',
    farmerPhone: '+91 98220 99887',
    farmerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    harvestDate: 'Cured & Sun-dried',
    diseaseStatus: 'Healthy',
    aiVerified: true,
    description: 'High pungency, thick skin, excellent shelf life of 4+ months without sprouting.',
  },
  {
    id: 'listing-4',
    title: 'Dehradun Traditional Basmati (Type 3)',
    cropType: 'Basmati Rice',
    variety: 'Traditional Aromatic Dehradun Basmati',
    grade: 'Grade A',
    quantityKg: 1500,
    pricePerKg: 85,
    cityVillage: 'Vikasnagar',
    district: 'Dehradun',
    state: 'Uttarakhand',
    lat: 30.495,
    lng: 77.771,
    farmerName: 'Harish Rawat',
    farmerPhone: '+91 94111 88223',
    farmerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    harvestDate: 'Aged 6 Months',
    diseaseStatus: 'Healthy',
    aiVerified: true,
    description: 'Authentic GI registered aroma, 8.2mm average grain length upon cooking.',
  },
  {
    id: 'listing-5',
    title: 'Kinnaur & Shimla Royal Apples',
    cropType: 'Apples',
    variety: 'Royal Delicious Mountain',
    grade: 'Grade A',
    quantityKg: 800,
    pricePerKg: 110,
    cityVillage: 'Theog',
    district: 'Shimla',
    state: 'Himachal Pradesh',
    lat: 31.121,
    lng: 77.354,
    farmerName: 'Surender Thakur',
    farmerPhone: '+91 98160 55443',
    farmerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    harvestDate: 'Orchard Picked',
    diseaseStatus: 'Healthy',
    aiVerified: true,
    description: 'High altitude mountain sweetness, intense red blush, crisp texture.',
  },
  {
    id: 'listing-6',
    title: 'Guntur Teja Hot Red Chili',
    cropType: 'Red Chili',
    variety: 'Teja S17 Special',
    grade: 'Grade A',
    quantityKg: 1000,
    pricePerKg: 195,
    cityVillage: 'Tenali',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    lat: 16.243,
    lng: 80.648,
    farmerName: 'Venkateswara Rao',
    farmerPhone: '+91 98480 33445',
    farmerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    harvestDate: 'Sun-dried Standard Moisture',
    diseaseStatus: 'Healthy',
    aiVerified: true,
    description: 'High SHU (Scoville heat units) and rich capsaicin content for spice extractors.',
  },
];

/**
 * Estimate AI Crop Price considering Crop, Quality Grade, Quantity, State, District, Mandi, and Demand
 */
export function estimateLocationPrice(
  crop: string,
  grade: QualityGrade,
  state: string,
  district: string,
  quantityKg: number = 500,
): PriceEstimateResult {
  // Base commodity pricing benchmark table (INR per kg)
  const basePrices: Record<string, { baseMin: number; baseMax: number; modal: number }> = {
    tomato: { baseMin: 28, baseMax: 36, modal: 32 },
    tomatoes: { baseMin: 28, baseMax: 36, modal: 32 },
    potato: { baseMin: 18, baseMax: 24, modal: 21 },
    potatoes: { baseMin: 18, baseMax: 24, modal: 21 },
    onion: { baseMin: 25, baseMax: 34, modal: 29 },
    onions: { baseMin: 25, baseMax: 34, modal: 29 },
    wheat: { baseMin: 23, baseMax: 27, modal: 25 },
    rice: { baseMin: 32, baseMax: 48, modal: 40 },
    'basmati rice': { baseMin: 65, baseMax: 90, modal: 78 },
    apple: { baseMin: 80, baseMax: 130, modal: 105 },
    apples: { baseMin: 80, baseMax: 130, modal: 105 },
    mustard: { baseMin: 50, baseMax: 60, modal: 55 },
    garlic: { baseMin: 110, baseMax: 160, modal: 135 },
    ginger: { baseMin: 70, baseMax: 95, modal: 82 },
    sugarcane: { baseMin: 3.5, baseMax: 4.2, modal: 3.8 },
    cotton: { baseMin: 65, baseMax: 78, modal: 72 },
    'red chili': { baseMin: 160, baseMax: 220, modal: 190 },
    soybean: { baseMin: 42, baseMax: 50, modal: 46 },
    maize: { baseMin: 20, baseMax: 25, modal: 22 },
  };

  const key = crop.toLowerCase().trim();
  const benchmark = basePrices[key] || { baseMin: 30, baseMax: 40, modal: 35 };

  // Grade multiplier: Grade A = +12%, Grade B = baseline, Grade C = -18%
  let gradeMultiplier = 1.0;
  let gradeText = 'Standard Grade B pricing';
  if (grade === 'Grade A') {
    gradeMultiplier = 1.15;
    gradeText = 'Premium Grade A (+15% value retention due to low defect rate)';
  } else if (grade === 'Grade C') {
    gradeMultiplier = 0.82;
    gradeText = 'Discounted Grade C (-18% due to cosmetic or mild pest damage)';
  }

  // Location/state adjustments (freight & localized supply)
  let locationMod = 1.0;
  let demandText = 'Moderate regional demand';
  if (state === 'Uttarakhand') {
    if (key.includes('tomato') || key.includes('lychee') || key.includes('basmati')) {
      locationMod = 1.08;
      demandText = 'High demand in foothill tourist & hospitality hubs';
    }
  } else if (state === 'Maharashtra') {
    if (key.includes('onion') || key.includes('grape')) {
      locationMod = 0.95; // high supply region
      demandText = 'High localized production volume at Lasalgaon hub';
    } else {
      locationMod = 1.05;
    }
  } else if (state === 'Punjab' || state === 'Haryana') {
    if (key.includes('wheat') || key.includes('rice')) {
      locationMod = 1.02;
      demandText = 'Strong MSP procurement backing in local grain mandis';
    }
  } else if (state === 'Himachal Pradesh' && key.includes('apple')) {
    locationMod = 1.1;
    demandText = 'Peak mountain fruit season with active retail aggregator bidding';
  }

  // Bulk quantity bonus/discount
  let qtyFactor = 1.0;
  if (quantityKg >= 2000) {
    qtyFactor = 1.03; // wholesale bulk buyer premium
  }

  const minPrice = Math.round(benchmark.baseMin * gradeMultiplier * locationMod);
  const maxPrice = Math.round(benchmark.baseMax * gradeMultiplier * locationMod);
  const recommended = Math.round(benchmark.modal * gradeMultiplier * locationMod * qtyFactor);

  // Find nearest local mandi name
  const matchedMandi = ALL_INDIA_MANDIS.find(
    (m) => m.district.toLowerCase() === district.toLowerCase() || m.state.toLowerCase() === state.toLowerCase(),
  );
  const mandiName = matchedMandi ? matchedMandi.name : `${district} APMC Market`;

  return {
    crop: crop.charAt(0).toUpperCase() + crop.slice(1),
    location: `${district}, ${state}`,
    grade,
    minEstimatedPrice: minPrice,
    maxEstimatedPrice: maxPrice,
    recommendedPrice: recommended,
    mandiBenchmarkPrice: benchmark.modal,
    nearbyMandiName: mandiName,
    trend: 'up',
    trendPercent: 6.4,
    factors: {
      locationDemand: demandText,
      qualityImpact: gradeText,
      seasonalTrend: 'Late season supply curve with active inter-state trade',
      transportCost: 'Local farm-gate to nearest APMC yard ~₹1.20/kg estimated logistics',
    },
    explanation: `Price estimate based on crop quality (${grade}), selected location (${district}, ${state}) and market conditions.`,
  };
}

/**
 * Get filtered & distance-sorted nearby buyers from active location
 */
export function getNearbyBuyers(
  userLoc: LocationState,
  filterRadius: '10' | '25' | '50' | '100' | 'same-district' | 'same-state' | 'all-india' = 'all-india',
  cropFilter: string = 'All',
): (BuyerProfile & { distanceKm: number })[] {
  const withDistance = ALL_INDIA_BUYERS.map((buyer) => {
    const dist = calculateDistanceKm(userLoc.lat, userLoc.lng, buyer.lat, buyer.lng);
    return { ...buyer, distanceKm: dist };
  });

  let filtered = withDistance;

  // Filter by crop
  if (cropFilter !== 'All' && cropFilter !== 'All Crops') {
    filtered = filtered.filter((b) =>
      b.cropsWanted.some((c) => c.toLowerCase().includes(cropFilter.toLowerCase())),
    );
  }

  // Filter by radius
  if (filterRadius === '10') {
    filtered = filtered.filter((b) => b.distanceKm <= 10);
  } else if (filterRadius === '25') {
    filtered = filtered.filter((b) => b.distanceKm <= 25);
  } else if (filterRadius === '50') {
    filtered = filtered.filter((b) => b.distanceKm <= 50);
  } else if (filterRadius === '100') {
    filtered = filtered.filter((b) => b.distanceKm <= 100);
  } else if (filterRadius === 'same-district') {
    filtered = filtered.filter((b) => b.district.toLowerCase() === userLoc.district.toLowerCase());
  } else if (filterRadius === 'same-state') {
    filtered = filtered.filter((b) => b.state.toLowerCase() === userLoc.state.toLowerCase());
  }

  // Sort by nearest
  return filtered.sort((a, b) => a.distanceKm - b.distanceKm);
}

/**
 * Get nearby Mandis from active location with computed distance
 */
export function getNearbyMandis(userLoc: LocationState): (MarketMandi & { distanceKm: number })[] {
  return ALL_INDIA_MANDIS.map((mandi) => {
    const dist = calculateDistanceKm(userLoc.lat, userLoc.lng, mandi.lat, mandi.lng);
    return { ...mandi, distanceKm: dist };
  }).sort((a, b) => a.distanceKm - b.distanceKm);
}

/**
 * Get location-aware crop recommendations ("What Can I Grow?")
 */
export function getCropRecommendations(
  stateName: string,
  districtName: string,
  season: 'Kharif' | 'Rabi' | 'Zaid' = 'Kharif',
  soilType: string = 'Alluvial Loam',
): CropSuitabilityRecommendation[] {
  // Knowledge graph of regional suitability
  const regionalRecommendations: Record<string, CropSuitabilityRecommendation[]> = {
    Uttarakhand: [
      {
        crop: 'Aromatic Basmati Rice (Type 3)',
        suitabilityScore: 96,
        season: 'Kharif',
        soilSuitability: 'Excellent in alluvial loamy clay of valley basins',
        waterRequirement: 'High',
        durationDays: '120–135 days',
        expectedYieldPerAcre: '18–22 Quintals',
        estimatedPriceRange: '₹75–₹90/kg',
        estimatedProfitPerAcre: 85000,
        localDemandStatus: 'Very High',
        keyAdvisory: 'High export premium in Dehradun & Tarai belt. Use green manuring for aroma enhancement.',
      },
      {
        crop: 'High-Yield Hybrid Tomatoes',
        suitabilityScore: 92,
        season: 'Kharif',
        soilSuitability: 'Well-drained sandy loam with pH 6.0–7.0',
        waterRequirement: 'Medium',
        durationDays: '80–90 days',
        expectedYieldPerAcre: '160–200 Quintals',
        estimatedPriceRange: '₹32–₹42/kg',
        estimatedProfitPerAcre: 92000,
        localDemandStatus: 'Very High',
        keyAdvisory: 'Staking with bamboo poles prevents early soil-borne blight during monsoon showers.',
      },
      {
        crop: 'Mountain Ginger (Adrak)',
        suitabilityScore: 89,
        season: 'Kharif',
        soilSuitability: 'Friable humus rich loam',
        waterRequirement: 'Medium',
        durationDays: '210–240 days',
        expectedYieldPerAcre: '60–80 Quintals',
        estimatedPriceRange: '₹70–₹95/kg',
        estimatedProfitPerAcre: 110000,
        localDemandStatus: 'High',
        keyAdvisory: 'Excellent cash crop for foothills. Low perishability post-curing.',
      },
      {
        crop: 'Off-Season Green Peas',
        suitabilityScore: 88,
        season: 'Rabi',
        soilSuitability: 'Deep loamy soil with good organic matter',
        waterRequirement: 'Low',
        durationDays: '65–75 days',
        expectedYieldPerAcre: '35–45 Quintals',
        estimatedPriceRange: '₹45–₹65/kg',
        estimatedProfitPerAcre: 68000,
        localDemandStatus: 'Very High',
        keyAdvisory: 'Commands steep off-season pricing when plains have exhausted stock.',
      },
    ],
    Maharashtra: [
      {
        crop: 'Red Garwa Onion',
        suitabilityScore: 97,
        season: 'Rabi',
        soilSuitability: 'Medium black friable soil',
        waterRequirement: 'Medium',
        durationDays: '110–120 days',
        expectedYieldPerAcre: '100–140 Quintals',
        estimatedPriceRange: '₹26–₹34/kg',
        estimatedProfitPerAcre: 78000,
        localDemandStatus: 'Very High',
        keyAdvisory: 'Direct access to Lasalgaon & Pimpalgaon terminal APMCs with quick liquidity.',
      },
      {
        crop: 'Export Table Grapes (Thompson Seedless)',
        suitabilityScore: 94,
        season: 'Zaid',
        soilSuitability: 'Well-drained red or black loam with low salinity',
        waterRequirement: 'Medium',
        durationDays: '140–160 days',
        expectedYieldPerAcre: '80–110 Quintals',
        estimatedPriceRange: '₹65–₹110/kg',
        estimatedProfitPerAcre: 160000,
        localDemandStatus: 'Very High',
        keyAdvisory: 'Drip fertigation + plastic mulching ensures APEDA export standards compliance.',
      },
      {
        crop: 'Bhagwa Pomegranate',
        suitabilityScore: 90,
        season: 'All Year',
        soilSuitability: 'Light sandy loam to medium deep black soil',
        waterRequirement: 'Low',
        durationDays: 'Perennial orchard',
        expectedYieldPerAcre: '40–60 Quintals/Acre',
        estimatedPriceRange: '₹85–₹135/kg',
        estimatedProfitPerAcre: 135000,
        localDemandStatus: 'High',
        keyAdvisory: 'Drought-tolerant crop suitable for Ahmednagar, Solapur & Nashik rain-shadow zones.',
      },
    ],
  };

  // Return region-specific recommendations or comprehensive nationwide fallback
  if (regionalRecommendations[stateName]) {
    return regionalRecommendations[stateName];
  }

  // General India-wide agro-recommendations
  return [
    {
      crop: 'Hybrid Red Tomatoes',
      suitabilityScore: 91,
      season: 'Kharif',
      soilSuitability: `Suitable for ${soilType} with good drainage`,
      waterRequirement: 'Medium',
      durationDays: '85–95 days',
      expectedYieldPerAcre: '140–180 Quintals',
      estimatedPriceRange: '₹28–₹38/kg',
      estimatedProfitPerAcre: 75000,
      localDemandStatus: 'Very High',
      keyAdvisory: 'High market liquidity in local mandis. Monitor leaf spot during humid weeks.',
    },
    {
      crop: 'Kufri Chipsona / Table Potato',
      suitabilityScore: 89,
      season: 'Rabi',
      soilSuitability: 'Light loose sandy loam soil',
      waterRequirement: 'Medium',
      durationDays: '90–100 days',
      expectedYieldPerAcre: '110–140 Quintals',
      estimatedPriceRange: '₹18–₹25/kg',
      estimatedProfitPerAcre: 62000,
      localDemandStatus: 'High',
      keyAdvisory: 'Cold storage tie-ups in your district allow staggered selling for higher margins.',
    },
    {
      crop: 'High-Pungency Garlic',
      suitabilityScore: 86,
      season: 'Rabi',
      soilSuitability: 'Rich well-drained loam with sulfur enrichment',
      waterRequirement: 'Low',
      durationDays: '130–150 days',
      expectedYieldPerAcre: '30–45 Quintals',
      estimatedPriceRange: '₹90–₹145/kg',
      estimatedProfitPerAcre: 105000,
      localDemandStatus: 'High',
      keyAdvisory: 'High storability and strong food processing demand throughout northern & western corridors.',
    },
  ];
}
