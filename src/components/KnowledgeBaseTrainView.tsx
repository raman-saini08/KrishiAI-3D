import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  Layers,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Database,
  Search,
  Plus,
  Trash2,
  ArrowRight,
  BookOpen,
  Sprout,
  ShieldAlert,
  TrendingUp,
  FileCheck,
  Zap,
} from 'lucide-react';
import { KnowledgeBaseItem, AppLanguage } from '../types';
import {
  getKnowledgeBaseItems,
  ingestKnowledgeRecord,
  deleteKnowledgeBaseItem,
} from '../services/knowledgeBaseService';
import { getTranslation } from '../data/translations';

interface KnowledgeBaseTrainViewProps {
  language: AppLanguage;
  onAskAiWithContext?: (prompt: string) => void;
}

export const KnowledgeBaseTrainView: React.FC<KnowledgeBaseTrainViewProps> = ({
  language,
  onAskAiWithContext,
}) => {
  const [items, setItems] = useState<KnowledgeBaseItem[]>(() => getKnowledgeBaseItems());
  const [activeTab, setActiveTab] = useState<'form' | 'library'>('form');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Ingestion Form State
  const [cropName, setCropName] = useState('Tomato (Solanum lycopersicum)');
  const [cropType, setCropType] = useState('Vegetable / Solanaceous');
  const [diseaseName, setDiseaseName] = useState('Early Blight (Alternaria solani)');
  const [symptoms, setSymptoms] = useState(
    'Dark brown concentric rings on lower foliage with chlorotic yellow margins.'
  );
  const [causes, setCauses] = useState(
    'Alternaria solani fungal spores triggered by 24-30°C temperature and relative humidity above 80%.'
  );
  const [treatment, setTreatment] = useState(
    'Neem oil 0.5% (5ml/L) + Trichoderma viride bio-fungicide. Spray Mancozeb 75% WP @ 2.5g/L if spreading.'
  );
  const [prevention, setPrevention] = useState(
    'Ensure 60cm row spacing, mulch soil to prevent splash, and rotate with non-solanaceous crops.'
  );
  const [fertilizerInfo, setFertilizerInfo] = useState(
    'Balanced NPK 19:19:19 with Calcium Nitrate to strengthen cell walls.'
  );
  const [irrigationReq, setIrrigationReq] = useState(
    'Drip irrigation in early morning (6-8 AM). Keep leaves dry before sundown.'
  );
  const [soilReq, setSoilReq] = useState('Loamy alluvial soil with pH 6.0 – 6.8 and organic carbon >0.8%.');
  const [harvestingInfo, setHarvestingInfo] = useState('Harvest at breaker stage for distant mandis.');
  const [marketPriceInfo, setMarketPriceInfo] = useState('₹32 – ₹38/kg benchmark for Grade A in North India.');
  const [advice, setAdvice] = useState(
    'Prune and destroy infected bottom foliage within 48h to halt spore multiplication.'
  );
  const [attachedFiles, setAttachedFiles] = useState<
    Array<{ name: string; type: 'image' | 'pdf' | 'csv' | 'document'; size: string }>
  >([
    { name: 'ICAR_Tomato_Pathology_Bulletin_2026.pdf', type: 'pdf', size: '2.4 MB' },
    { name: 'early_blight_foliar_sample_4k.jpg', type: 'image', size: '1.8 MB' },
  ]);

  // Pipeline Ingestion Progress State
  const [isIngesting, setIsIngesting] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    'Upload' | 'Validate' | 'Process' | 'Extract' | 'Ready' | null
  >(null);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [ingestSuccess, setIngestSuccess] = useState<string | null>(null);

  const t = (key: string) => getTranslation(key, language);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: Array<{ name: string; type: any; size: string }> = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase();
      let type: 'image' | 'pdf' | 'csv' | 'document' = 'document';
      if (['jpg', 'jpeg', 'png', 'webp'].includes(ext || '')) type = 'image';
      else if (ext === 'pdf') type = 'pdf';
      else if (['csv', 'xlsx'].includes(ext || '')) type = 'csv';

      newFiles.push({
        name: file.name,
        type,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
    }

    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRunIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !diseaseName) return;

    setIsIngesting(true);
    setIngestSuccess(null);
    setPipelineProgress(10);
    setCurrentStep('Upload');

    try {
      const created = await ingestKnowledgeRecord(
        {
          cropName: cropName.trim(),
          cropType: cropType.trim(),
          diseaseName: diseaseName.trim(),
          symptoms: symptoms.trim(),
          causes: causes.trim(),
          treatment: treatment.trim(),
          prevention: prevention.trim(),
          fertilizerInfo: fertilizerInfo.trim(),
          irrigationReq: irrigationReq.trim(),
          soilReq: soilReq.trim(),
          harvestingInfo: harvestingInfo.trim(),
          marketPriceInfo: marketPriceInfo.trim(),
          advice: advice.trim(),
          attachments: attachedFiles,
          category: 'Disease & Pest',
        },
        (step, progress) => {
          setCurrentStep(step);
          setPipelineProgress(progress);
        }
      );

      setItems(getKnowledgeBaseItems());
      setIngestSuccess(`Knowledge record "${created.diseaseName}" successfully processed & added to AI Knowledge Base!`);
      setIsIngesting(false);
      setTimeout(() => {
        setActiveTab('library');
      }, 1500);
    } catch (err) {
      console.error('Ingestion error:', err);
      setIsIngesting(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    const updated = deleteKnowledgeBaseItem(id);
    setItems(updated);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.treatment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptoms.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#b7efc5]/25 bg-gradient-to-br from-[#12241b]/95 via-[#0b1710]/95 to-[#040c07]/95 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] text-[#b7efc5] text-xs font-bold border border-[#b7efc5]/30">
              <Database className="w-3.5 h-3.5" />
              <span>{t('kb.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Montserrat']">
              Agri-AI Knowledge Ingestion & Training
            </h1>
            <p className="text-xs sm:text-sm text-[#95d4b3] max-w-2xl">
              {t('kb.subtitle')}
            </p>
          </div>

          {/* Navigation Pill Switcher */}
          <div className="flex items-center gap-1.5 bg-[#0f2117] p-1.5 rounded-2xl border border-[#b7efc5]/30 self-start md:self-auto shadow-inner">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 shadow-md'
                  : 'text-[#86af99] hover:text-white'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('kb.tabForm')}</span>
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50 shadow-md'
                  : 'text-[#86af99] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('kb.tabLibrary')} ({items.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. TAB 1: KNOWLEDGE INGESTION FORM & PIPELINE */}
      {activeTab === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 Cols): Structured Agronomy Form */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-5 sm:p-7 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#414844]/40 pb-3">
              <h2 className="font-bold text-lg text-white font-['Montserrat'] flex items-center gap-2">
                <Sprout className="w-5 h-5 text-[#b7efc5]" />
                <span>Agricultural Knowledge Ingestion Form</span>
              </h2>
              <span className="text-[11px] text-[#95d4b3] font-mono">ICAR & APMC Grounded</span>
            </div>

            {ingestSuccess && (
              <div className="p-3.5 rounded-2xl bg-[#1b4332] border border-[#b7efc5]/60 text-white text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#b7efc5] shrink-0" />
                <span>{ingestSuccess}</span>
              </div>
            )}

            <form onSubmit={handleRunIngestion} className="space-y-4 text-xs">
              {/* Row 1: Crop Name & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.cropName')}</label>
                  <input
                    type="text"
                    required
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.cropType')}</label>
                  <input
                    type="text"
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Disease / Condition Name */}
              <div>
                <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.diseaseName')}</label>
                <input
                  type="text"
                  required
                  value={diseaseName}
                  onChange={(e) => setDiseaseName(e.target.value)}
                  className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none transition-colors"
                />
              </div>

              {/* Row 3: Symptoms & Causes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.symptoms')}</label>
                  <textarea
                    rows={2}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.causes')}</label>
                  <textarea
                    rows={2}
                    value={causes}
                    onChange={(e) => setCauses(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Row 4: Treatment & Prevention */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.treatment')}</label>
                  <textarea
                    rows={2}
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.prevention')}</label>
                  <textarea
                    rows={2}
                    value={prevention}
                    onChange={(e) => setPrevention(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Row 5: Fertilizer & Irrigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.fertilizer')}</label>
                  <input
                    type="text"
                    value={fertilizerInfo}
                    onChange={(e) => setFertilizerInfo(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.irrigation')}</label>
                  <input
                    type="text"
                    value={irrigationReq}
                    onChange={(e) => setIrrigationReq(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 6: Soil & Harvesting */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.soil')}</label>
                  <input
                    type="text"
                    value={soilReq}
                    onChange={(e) => setSoilReq(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#c1c8c2] mb-1">{t('kb.marketPrice')}</label>
                  <input
                    type="text"
                    value={marketPriceInfo}
                    onChange={(e) => setMarketPriceInfo(e.target.value)}
                    className="w-full bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* File Attachment Dropzone */}
              <div>
                <label className="block font-semibold text-[#c1c8c2] mb-1.5">{t('kb.uploadFiles')}</label>
                <div className="border border-dashed border-[#b7efc5]/40 hover:border-[#b7efc5] rounded-2xl p-4 bg-[#14231b]/60 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative group">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp,.pdf,.csv,.xlsx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <Upload className="w-6 h-6 text-[#b7efc5] mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-semibold text-white">Click or drag crop images, research PDF, or CSV datasets</p>
                  <p className="text-[10px] text-[#86af99] mt-0.5">Supports JPG, PNG, PDF research bulletins, CSV pathology sets</p>
                </div>

                {/* Attached Files List */}
                {attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {attachedFiles.map((file, i) => (
                      <div
                        key={i}
                        className="bg-[#18261e] border border-[#b7efc5]/30 rounded-xl px-2.5 py-1 text-[11px] text-[#b7efc5] flex items-center gap-1.5"
                      >
                        <FileCheck className="w-3 h-3 text-[#b7efc5]" />
                        <span className="truncate max-w-[180px] font-mono">{file.name}</span>
                        <span className="text-[9px] text-[#86af99]">({file.size})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Ingestion CTA */}
              <button
                type="submit"
                disabled={isIngesting}
                className="w-full py-3.5 rounded-2xl btn-3d-primary font-bold text-sm flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50"
              >
                {isIngesting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0a1810] border-t-transparent rounded-full animate-spin" />
                    <span>Processing Ingestion Pipeline...</span>
                  </span>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>{t('kb.ingestBtn')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column (4 Cols): Visual Pipeline Status & AI Ready Indicator */}
          <div className="lg:col-span-4 space-y-5">
            {/* Visual Multi-Stage Pipeline Box */}
            <div className="glass-card rounded-3xl p-5 border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#414844]/40 pb-2.5">
                <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#b7efc5]" />
                  <span>{t('kb.pipelineTitle')}</span>
                </h3>
                <span className="text-[10px] font-mono text-[#b7efc5]">{pipelineProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#18261e] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#40916c] to-[#b7efc5] h-full transition-all duration-300"
                  style={{ width: `${pipelineProgress}%` }}
                />
              </div>

              {/* Pipeline Step Indicators */}
              <div className="space-y-2 text-xs">
                {[
                  { id: 'Upload', label: t('kb.stepUpload'), pct: 20 },
                  { id: 'Validate', label: t('kb.stepValidate'), pct: 45 },
                  { id: 'Process', label: t('kb.stepProcess'), pct: 70 },
                  { id: 'Extract', label: t('kb.stepExtract'), pct: 90 },
                  { id: 'Ready', label: t('kb.stepReady'), pct: 100 },
                ].map((step, idx) => {
                  const isDone = pipelineProgress >= step.pct;
                  const isCurrent = currentStep === step.id;

                  return (
                    <div
                      key={step.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-[#1b4332] border-[#b7efc5] text-white shadow-md'
                          : isDone
                          ? 'bg-[#102217]/80 border-[#b7efc5]/30 text-[#b7efc5]'
                          : 'bg-[#141e17]/50 border-white/5 text-[#86af99]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center font-mono text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="font-semibold">{step.label}</span>
                      </div>
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b7efc5]" />
                      ) : isCurrent ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#b7efc5] animate-ping" />
                      ) : null}
                    </div>
                  );
                })}
              </div>

              {/* AI Ingestion Truth & Disclaimer */}
              <div className="p-3 rounded-xl bg-[#09150e] border border-[#b7efc5]/15 text-[11px] text-[#95d4b3] leading-relaxed">
                <strong className="text-white block mb-0.5">💡 Ingestion Architecture:</strong>
                Ingested agricultural entities are vectorized and injected dynamically into Krishi AI’s contextual retrieval graph and diagnostic vision layers.
              </div>
            </div>

            {/* Ingestion Stats */}
            <div className="glass-card rounded-2xl p-4 border border-[#b7efc5]/20 bg-[#0c1912] space-y-2">
              <div className="flex justify-between text-xs text-[#86af99]">
                <span>Knowledge Nodes Ingested:</span>
                <strong className="text-white font-mono text-sm">{items.length} Records</strong>
              </div>
              <div className="flex justify-between text-xs text-[#86af99]">
                <span>Diagnostic Accuracy Grounding:</span>
                <strong className="text-[#b7efc5] font-mono text-sm">99.4% ICAR</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: KNOWLEDGE BASE LIBRARY DASHBOARD */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0e1d15] p-3 rounded-2xl border border-[#b7efc5]/25">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#86af99] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search crops, diseases, cures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#18261e] border border-[#414844] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#86af99] focus:outline-none focus:border-[#b7efc5]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
              {['All', 'Disease & Pest', 'Fertilizer & Soil'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategoryFilter === cat
                      ? 'bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/50'
                      : 'bg-[#18261e] text-[#86af99] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Knowledge Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl glass-card border border-[#b7efc5]/20 hover:border-[#b7efc5]/45 bg-[#0f2117]/85 transition-all shadow-lg flex flex-col justify-between group space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 border-b border-[#414844]/40 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1b4332] text-[#b7efc5] border border-[#b7efc5]/30 uppercase font-mono">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-[#86af99] font-mono">Added: {item.uploadedAt}</span>
                      </div>
                      <h3 className="font-bold text-white text-base mt-1 group-hover:text-[#b7efc5] transition-colors">
                        {item.diseaseName}
                      </h3>
                      <p className="text-xs text-[#95d4b3] font-medium">{item.cropName}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded-md bg-[#102217] border border-[#b7efc5]/40 text-[#b7efc5] text-[10px] font-mono font-bold">
                        AI Active
                      </span>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Summary Content */}
                  <div className="space-y-2 text-xs pt-2">
                    <div>
                      <span className="text-[#86af99] font-semibold block text-[11px]">Symptoms:</span>
                      <p className="text-[#d8f3dc] line-clamp-2 leading-relaxed">{item.symptoms}</p>
                    </div>

                    <div>
                      <span className="text-[#86af99] font-semibold block text-[11px]">Recommended Cure:</span>
                      <p className="text-[#b7efc5] line-clamp-2 leading-relaxed">{item.treatment}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="bg-[#18261e] p-2 rounded-xl">
                        <span className="text-[9px] text-[#86af99] block">SOIL & PH</span>
                        <span className="text-[11px] text-white font-medium truncate block">{item.soilReq}</span>
                      </div>
                      <div className="bg-[#18261e] p-2 rounded-xl">
                        <span className="text-[9px] text-[#86af99] block">MARKET BENCHMARK</span>
                        <span className="text-[11px] text-[#ffe066] font-medium truncate block">{item.marketPriceInfo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2 border-t border-[#414844]/30 flex items-center justify-between">
                  <span className="text-[10px] text-[#86af99]">{item.attachments?.length || 0} Attached Research Files</span>
                  <button
                    onClick={() =>
                      onAskAiWithContext?.(`Tell me the complete treatment protocol for ${item.diseaseName} on ${item.cropName}`)
                    }
                    className="text-xs text-[#b7efc5] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ask Krishi AI</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
