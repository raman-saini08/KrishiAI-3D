import { KnowledgeBaseItem } from '../types';

const STORAGE_KEY = 'crop_rescuer_knowledge_base_v1';

// Seed initial knowledge base items
const INITIAL_KNOWLEDGE_BASE: KnowledgeBaseItem[] = [
  {
    id: 'kb-tomato-early-blight',
    cropName: 'Tomato (Solanum lycopersicum)',
    cropType: 'Vegetable / Solanaceous',
    diseaseName: 'Early Blight (Alternaria solani)',
    symptoms: 'Dark brown to black concentric rings on lower leaves (target board pattern), surrounded by chlorotic yellow margins.',
    causes: 'Alternaria solani fungal spores triggered by warm temperatures (24-30°C) and prolonged relative humidity (>80%).',
    treatment: 'Spray 0.5% cold-pressed Neem oil emulsion (5ml/L) + Trichoderma viride. In severe cases, apply Mancozeb 75% WP @ 2.5g/L water.',
    prevention: 'Ensure 60cm plant spacing, mulch with dry straw to prevent soil splash, avoid overhead evening irrigation, and rotate crops with legumes.',
    fertilizerInfo: 'Balanced NPK (19:19:19) with calcium nitrate to strengthen leaf cell walls against fungal penetration.',
    irrigationReq: 'Drip irrigation early morning (6 AM - 8 AM). Keep foliage completely dry before sundown.',
    soilReq: 'Well-drained sandy loam or clay loam with organic matter >0.8% and optimal pH 6.0 – 6.8.',
    harvestingInfo: 'Harvest at breaker or pink stage for long-distance transport; full red for immediate local mandi dispatch.',
    marketPriceInfo: 'Benchmark ₹32 – ₹38/kg for Grade A, ₹26 – ₹30/kg for Grade B in North Indian APMC yards.',
    advice: 'Remove infected bottom leaves within 48 hours of detection and burn away from field to stop air spore dispersal.',
    status: 'AI Ready',
    uploadedAt: '2026-08-20',
    category: 'Disease & Pest',
  },
  {
    id: 'kb-wheat-yellow-rust',
    cropName: 'Wheat (Triticum aestivum)',
    cropType: 'Cereal / Rabi Grain',
    diseaseName: 'Yellow Stripe Rust (Puccinia striiformis)',
    symptoms: 'Yellow to orange-yellow pustules arranged in parallel linear stripes along leaf veins, shedding powdery spores upon touch.',
    causes: 'Puccinia striiformis fungus thriving in cool humid winter weather (10-18°C) with persistent morning dew in North-Western plains.',
    treatment: 'Immediately apply Propiconazole 25 EC (Tilt) @ 1ml/L water (200ml per acre in 200L water) on first visible stripe.',
    prevention: 'Cultivate rust-resistant varieties like DBW 187, DBW 222, or HD 3226. Avoid late November sowing.',
    fertilizerInfo: 'Recommended 120:60:40 kg NPK/ha. Avoid excess split dose of Nitrogen as it promotes succulent foliar rust growth.',
    irrigationReq: 'Critical irrigation at Crown Root Initiation (CRI) 21 days after sowing, followed by tillering and flowering stages.',
    soilReq: 'Deep alluvial loamy soils with good water-holding capacity and pH 6.5 – 7.5.',
    harvestingInfo: 'Harvest when grain moisture drops below 12-14% and straw turns golden yellow.',
    marketPriceInfo: 'Government MSP benchmark ₹2,275/quintal with quality premium up to ₹2,550/quintal in Punjab and Haryana.',
    advice: 'Scout northern farm borders weekly during December to February for initial focal yellow patches.',
    status: 'AI Ready',
    uploadedAt: '2026-08-21',
    category: 'Disease & Pest',
  },
  {
    id: 'kb-rice-blast',
    cropName: 'Basmati Rice (Oryza sativa)',
    cropType: 'Cereal / Kharif Paddy',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    symptoms: 'Diamond or spindle-shaped lesions with grey centers and dark brown borders on leaves; dark necrotic ring at panicle neck.',
    causes: 'Magnaporthe oryzae fungus favored by excess nitrogen fertilization, cool nights (20°C), and high humidity (>90%).',
    treatment: 'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L at early boot leaf stage.',
    prevention: 'Seed treatment with Pseudomonas fluorescens @ 10g/kg seed. Avoid overdosing urea.',
    fertilizerInfo: 'Apply nitrogen in 3 split doses (50% basal, 25% tillering, 25% panicle initiation) supplemented with zinc sulphate.',
    irrigationReq: 'Maintain 3-5 cm standing water layer during vegetative phase; drain fields 10 days before harvest.',
    soilReq: 'Clayey to silty clay soils with high water retention capacity and pH 5.5 – 6.8.',
    harvestingInfo: 'Harvest when 80-85% grains in panicle turn golden straw color to minimize milling breakage.',
    marketPriceInfo: 'Export-grade Pusa Basmati 1121 fetches ₹42 – ₹52/kg in APMC mandis.',
    advice: 'Ensure thorough seed priming before nursery sowing to eradicate seed-borne fungal mycelium.',
    status: 'AI Ready',
    uploadedAt: '2026-08-22',
    category: 'Disease & Pest',
  },
  {
    id: 'kb-potato-late-blight',
    cropName: 'Potato (Solanum tuberosum)',
    cropType: 'Tuber / Rabi Cash Crop',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    symptoms: 'Water-soaked irregular pale-green spots turning brown-black with white downy fungal growth on leaf undersides under high humidity.',
    causes: 'Oomycete pathogen Phytophthora infestans triggered by overcast foggy days, temperatures 12-22°C, and relative humidity >90%.',
    treatment: 'Preventive spray of Mancozeb 75% WP (2.5g/L); curative spray of Cymoxanil 8% + Mancozeb 64% WP (2.5g/L).',
    prevention: 'Plant certified disease-free seed tubers (Kufri Pukhraj, Kufri Jyoti), earthing up soil to cover tubers from washing spores.',
    fertilizerInfo: '150:100:120 kg NPK/ha along with 25 tonnes FYM per hectare for robust tuberization.',
    irrigationReq: 'Light and frequent furrow irrigation at 7-10 day intervals. Stop watering 10 days before haulm cutting.',
    soilReq: 'Loose, friable sandy loam rich in organic matter with pH 5.2 – 6.4.',
    harvestingInfo: 'Cut haulms (green foliage) 12 days prior to harvest so potato skins harden, preventing bruising in storage.',
    marketPriceInfo: 'Fresh table potato benchmarks ₹18 – ₹24/kg, processing varieties fetch up to ₹26/kg from chip manufacturers.',
    advice: 'Never pile harvested potatoes in wet soil during foggy mornings to avoid soft rot infection.',
    status: 'AI Ready',
    uploadedAt: '2026-08-22',
    category: 'Disease & Pest',
  },
  {
    id: 'kb-mustard-aphids',
    cropName: 'Mustard (Brassica juncea)',
    cropType: 'Oilseed / Rabi',
    diseaseName: 'Mustard Aphid Infestation (Lipaphis erysimi)',
    symptoms: 'Tiny green-yellow insects swarming on inflorescence, sucking sap, causing curling of leaves and stunted siliqua pod formation.',
    causes: 'Cloudy, humid weather during January-February accelerates rapid parthenogenetic aphid nymph multiplication.',
    treatment: 'Spray Dimethoate 30% EC @ 1ml/L or Imidacloprid 17.8% SL @ 0.5ml/L during late afternoon to protect pollinator bees.',
    prevention: 'Early sowing before October 20 to escape peak aphid flight window. Conserve natural Coccinellid ladybird predators.',
    fertilizerInfo: 'Apply 80:40:40 kg NPK/ha plus 20 kg/ha Sulphur to maximize seed oil content (up to 42%).',
    irrigationReq: 'First irrigation at 30-35 days (flower initiation) and second at 55-60 days (pod filling stage).',
    soilReq: 'Sandy loam to loamy soils with good drainage and pH 6.0 – 7.5.',
    harvestingInfo: 'Harvest when pods turn golden brown and seeds rattle inside siliqua (approx 75% maturity).',
    marketPriceInfo: 'MSP ₹5,650/quintal with open market demand peaking around ₹5,900 – ₹6,200/quintal.',
    advice: 'Install yellow sticky traps @ 10 traps per acre for early monitoring and mass trapping.',
    status: 'AI Ready',
    uploadedAt: '2026-08-22',
    category: 'Disease & Pest',
  },
  {
    id: 'kb-bio-npk-soil',
    cropName: 'Pan-Crop Soil Protocol',
    cropType: 'Soil & Microbiology',
    diseaseName: 'Soil Nutrient Depletion & Microbe Regeneration',
    symptoms: 'Stunted seedling vigor, pale chlorotic lower leaves, high soil compaction, and low earthworm activity.',
    causes: 'Monoculture cropping, excessive chemical urea/DAP applications, and depletion of organic humus carbon (<0.5%).',
    treatment: 'Inoculate soil with Liquid Bio-NPK consortia (Azotobacter + PSB + KMB @ 1L/acre mixed with 100kg compost).',
    prevention: 'Adopt green manuring with Dhaincha (Sesbania) or Sunhemp before kharif planting. Practice crop rotation with pulses.',
    fertilizerInfo: 'Combine 75% recommended chemical fertilizer with 25% bio-fertilizers and vermicompost for sustainable soil health.',
    irrigationReq: 'Soil moisture should be maintained around 60-70% field capacity to support aerobic microbial colonization.',
    soilReq: 'Applicable to all Indian soil types (Alluvial, Black Cotton, Red Laterite, Clay Loam). Target organic carbon >0.8%.',
    harvestingInfo: 'Perform soil testing every 2 years through Krishi Vigyan Kendra (KVK) soil health card program.',
    marketPriceInfo: 'Organic produce cultivated with bio-inputs commands 15-25% price premium among certified retail buyers.',
    advice: 'Apply Jeevamrutha fermented liquid (cow dung, urine, jaggery, gram flour) every 15 days via irrigation channels.',
    status: 'AI Ready',
    uploadedAt: '2026-08-22',
    category: 'Fertilizer & Soil',
  },
];

/**
 * Loads all ingested knowledge items from localStorage
 */
export function getKnowledgeBaseItems(): KnowledgeBaseItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_KNOWLEDGE_BASE));
      return INITIAL_KNOWLEDGE_BASE;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load knowledge base:', err);
    return INITIAL_KNOWLEDGE_BASE;
  }
}

/**
 * Saves or updates knowledge base items in localStorage
 */
export function saveKnowledgeBaseItems(items: KnowledgeBaseItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to persist knowledge base:', err);
  }
}

/**
 * Ingests a new knowledge record through the visual multi-stage pipeline:
 * Upload -> Validate -> Process -> Extract Knowledge -> AI Ready
 */
export async function ingestKnowledgeRecord(
  item: Omit<KnowledgeBaseItem, 'id' | 'status' | 'uploadedAt'>,
  onProgressUpdate?: (step: 'Upload' | 'Validate' | 'Process' | 'Extract' | 'Ready', progress: number) => void
): Promise<KnowledgeBaseItem> {
  const newItem: KnowledgeBaseItem = {
    ...item,
    id: `kb-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    status: 'Validating',
    uploadedAt: new Date().toISOString().split('T')[0],
  };

  // Step 1: Upload Data (0 - 20%)
  onProgressUpdate?.('Upload', 20);
  await new Promise((r) => setTimeout(r, 450));

  // Step 2: Validate Schema (20 - 45%)
  onProgressUpdate?.('Validate', 45);
  await new Promise((r) => setTimeout(r, 450));

  // Step 3: Process & Tokenize (45 - 70%)
  onProgressUpdate?.('Process', 70);
  newItem.status = 'Processing';
  await new Promise((r) => setTimeout(r, 500));

  // Step 4: Extract Knowledge Entities (70 - 90%)
  onProgressUpdate?.('Extract', 90);
  newItem.status = 'Knowledge Extracted';
  await new Promise((r) => setTimeout(r, 450));

  // Step 5: AI Knowledge Ready (100%)
  newItem.status = 'AI Ready';
  onProgressUpdate?.('Ready', 100);

  // Save to persistent collection
  const existing = getKnowledgeBaseItems();
  const updated = [newItem, ...existing];
  saveKnowledgeBaseItems(updated);

  return newItem;
}

/**
 * Deletes a knowledge base item
 */
export function deleteKnowledgeBaseItem(id: string): KnowledgeBaseItem[] {
  const existing = getKnowledgeBaseItems();
  const filtered = existing.filter((item) => item.id !== id);
  saveKnowledgeBaseItems(filtered);
  return filtered;
}

/**
 * Queries knowledge base for relevant agricultural context matching a crop or disease query
 */
export function queryKnowledgeBase(query: string): KnowledgeBaseItem | null {
  const items = getKnowledgeBaseItems();
  const q = query.toLowerCase();

  const match = items.find((item) => {
    return (
      item.cropName.toLowerCase().includes(q) ||
      item.diseaseName.toLowerCase().includes(q) ||
      q.includes(item.cropName.toLowerCase().split(' ')[0]) ||
      q.includes(item.diseaseName.toLowerCase().split(' ')[0])
    );
  });

  return match || null;
}
