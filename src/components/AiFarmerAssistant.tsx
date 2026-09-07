import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MapPin,
  RefreshCw,
  Wheat,
  Bot,
  User,
  ShieldCheck,
  Camera,
  Upload,
  X,
  Copy,
  Check,
  RotateCcw,
  Store,
  Map as MapIcon,
  Sprout,
  AlertTriangle,
  FileText,
  DollarSign,
  ChevronRight,
  Info,
} from 'lucide-react';
import { AuthUser, ChatMessage, LocationState, AppLanguage, CropIntelligenceReport } from '../types';
import { sendChatMessage } from '../services/geminiService';
import { getUserChatHistory, saveUserChatHistory } from '../services/userDataService';
import { getTranslation } from '../data/translations';

interface AiFarmerAssistantProps {
  currentLocation: LocationState;
  language: AppLanguage;
  currentUser?: AuthUser | null;
  activeCropReport?: CropIntelligenceReport | null;
  onOpenCropAnalyzer: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onOpenLocationModal?: () => void;
  initialPrompt?: string;
}

export const AiFarmerAssistant: React.FC<AiFarmerAssistantProps> = ({
  currentLocation,
  language,
  currentUser,
  activeCropReport,
  onOpenCropAnalyzer,
  onNavigateToTab,
  onOpenLocationModal,
  initialPrompt,
}) => {
  const userId = currentUser?.id || 'guest';
  const t = (key: string) => getTranslation(key, language);

  // Chat History
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = getUserChatHistory(userId);
    if (saved && saved.length > 0) return saved;

    const initialGreeting =
      language === 'hi'
        ? `नमस्ते ${currentUser?.name || 'किसान मित्र'}! मैं आपका **कृषि AI सहायक (Krishi AI)** हूँ। मैं आपके जिले **${currentLocation.district}, ${currentLocation.state}** के मौसम, मिट्टी और मंडी भाव से जुड़ा हूँ। मुझसे फसल रोग, खाद, सिंचाई या बेचने का सही समय पूछें!`
        : language === 'hinglish'
        ? `Namaste ${currentUser?.name || 'Kisan Mitra'}! Main aapka **Krishi AI Assistant** hoon. Main aapke district **${currentLocation.district}, ${currentLocation.state}** ke mausam, mitti aur mandi rates se connect hoon. Fasal ki bimari, khad, pani ya bechne ka sahi time poochein!`
        : `Namaste ${currentUser?.name || 'Kisan Mitra'}! I am **Krishi AI Assistant**, your 24/7 agronomist and mandi market advisor grounded in **${currentLocation.district}, ${currentLocation.state}**. How can I assist your farm today?`;

    return [
      {
        id: 'msg-welcome',
        sender: 'ai',
        text: initialGreeting,
        timestamp: 'Just now',
        locationContext: `${currentLocation.district}, ${currentLocation.state}`,
        suggestedActions: [
          { label: '📷 Scan My Crop', action: 'scanner' },
          { label: '💰 Check Mandi Prices', action: 'price' },
          { label: '🌾 Soil & Fertilizer Advice', action: 'fertilizer' },
        ],
      },
    ];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Suggested Prompts requested by user
  const suggestedPrompts = [
    'Analyse my crop',
    'What disease does my plant have?',
    "What is today's market price?",
    'Which fertilizer should I use?',
    'When should I water my crop?',
    'Should I sell my crop now?',
  ];

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle Initial Prompt if passed from other views
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'hinglish' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported on this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang =
          language === 'hi' ? 'hi-IN' : language === 'hinglish' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech start error:', err);
      }
    }
  };

  const toggleSpeechSynthesis = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[#*`_]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 1.0;

      utterance.onend = () => {
        setSpeakingMsgId(null);
      };
      utterance.onerror = () => {
        setSpeakingMsgId(null);
      };

      window.speechSynthesis.speak(utterance);
      setSpeakingMsgId(msgId);
    }
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText !== undefined ? queryText : inputQuery).trim();
    if (!textToSend && !attachedImage) return;

    // Direct routing for quick action prompts
    if (textToSend.toLowerCase() === 'analyse my crop') {
      onOpenCropAnalyzer();
      return;
    }

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      imageUrl: attachedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveUserChatHistory(userId, updatedMessages);

    setInputQuery('');
    const currentImg = attachedImage;
    setAttachedImage(null);
    setIsLoading(true);

    try {
      // Build context including active crop report if available
      const activeScanContext = activeCropReport
        ? {
            cropName: activeCropReport.cropName,
            diagnosisName: activeCropReport.diagnosisName,
            healthScore: activeCropReport.healthScore,
            recommendedPriceKg: activeCropReport.economicInfo.currentCropPrice,
          }
        : undefined;

      const res = await sendChatMessage({
        message: textToSend,
        base64Image: currentImg,
        preferredLanguage: language,
        farmerContext: {
          farmerName: currentUser?.name || 'Kisan Mitra',
          role: currentUser?.role || 'farmer',
          kisanId: currentUser?.kisanId || 'IN-2026',
          landSizeAcres: currentUser?.landSizeAcres || 3.5,
          primaryCrops: currentUser?.primaryCrops || ['Tomato', 'Basmati Rice', 'Wheat'],
          farmingType: currentUser?.farmingType || 'Natural / Bio-fertilizer',
          location: currentLocation,
          selectedMandi: `${currentLocation.district} APMC Yard`,
          activeScan: activeScanContext,
        },
        chatHistory: updatedMessages.slice(-6),
      });

      let replyText = res.reply;

      // Ensure language response styling if server fallback was generic
      if (language === 'hi' && !replyText.includes('###') && !replyText.includes('नमस्ते')) {
        replyText = `### 🌱 कृषि AI उत्तर\n${replyText}\n\n### 🌾 अनुशंसित कदम\n1. फसल की नियमित निगरानी रखें।\n2. स्थानीय KVK दिशा-निर्देशों का पालन करें।`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        locationContext: `${currentLocation.district}, ${currentLocation.state}`,
        suggestedActions: res.suggestedActions || [
          { label: '📷 Scan Plant', action: 'scanner' },
          { label: '💰 Mandi Price', action: 'price' },
        ],
      };

      const finalMessages = [...updatedMessages, aiMsg];
      setMessages(finalMessages);
      saveUserChatHistory(userId, finalMessages);
      setIsLoading(false);
    } catch (err) {
      console.error('Chat AI error:', err);
      const fallbackAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          language === 'hi'
            ? `### 🌱 त्वरित कृषि सलाह (${currentLocation.district})\nआपके प्रश्न "${textToSend}" के संबंध में, अपनी फसल में संतुलित NPK और जैविक नीम तेल का छिड़काव करें। अधिक जानकारी के लिए अपनी फसल की पत्ती स्कैन करें।`
            : language === 'hinglish'
            ? `### 🌱 Quick Krishi Salah (${currentLocation.district})\nAapke question "${textToSend}" ke baare me, apni fasal me balanced NPK aur neem oil ka spray karein. More details ke liye photo scan karein.`
            : `### 🌱 Quick Agricultural Advice (${currentLocation.district})\nRegarding "${textToSend}", apply balanced NPK nutrients and inspect for fungal blight. For precision diagnosis, scan your crop foliage.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        locationContext: `${currentLocation.district}, ${currentLocation.state}`,
      };

      const finalMessages = [...updatedMessages, fallbackAiMsg];
      setMessages(finalMessages);
      saveUserChatHistory(userId, finalMessages);
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    const fresh = [
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'ai' as const,
        text: `Chat history cleared. How can I assist your farming in **${currentLocation.district}, ${currentLocation.state}**?`,
        timestamp: 'Just now',
        locationContext: `${currentLocation.district}, ${currentLocation.state}`,
      },
    ];
    setMessages(fresh);
    saveUserChatHistory(userId, fresh);
  };

  const handleActionClick = (action: string) => {
    if (action === 'scanner') onOpenCropAnalyzer();
    else if (action === 'marketplace' && onNavigateToTab) onNavigateToTab('marketplace');
    else if (action === 'price' && onNavigateToTab) onNavigateToTab('marketplace');
    else if (action === 'map' && onNavigateToTab) onNavigateToTab('map');
    else if (action === 'planner' && onNavigateToTab) onNavigateToTab('what-can-i-grow');
    else handleSendMessage(`Tell me more about ${action}`);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#b7efc5]/25 bg-gradient-to-br from-[#12241b]/95 via-[#0b1710]/95 to-[#040c07]/95 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] text-[#b7efc5] text-xs font-bold border border-[#b7efc5]/30">
              <Bot className="w-3.5 h-3.5" />
              <span>{t('assistant.title')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Montserrat']">
              Krishi AI Agricultural Advisor & Voice Assistant
            </h1>
            <p className="text-xs sm:text-sm text-[#95d4b3] max-w-2xl">
              {t('assistant.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              className="p-2.5 rounded-2xl bg-[#14231b] hover:bg-[#1f3125] border border-[#414844] text-[#86af99] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset Chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Chat</span>
            </button>

            <div
              onClick={onOpenLocationModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#14231b] hover:bg-[#1f3125] border border-[#b7efc5]/30 text-xs text-white cursor-pointer transition-all shadow-md group"
            >
              <MapPin className="w-3.5 h-3.5 text-[#b7efc5]" />
              <span>{currentLocation.district}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Crop Context Banner if available */}
      {activeCropReport && (
        <div className="p-3.5 rounded-2xl bg-[#102419] border border-[#b7efc5]/40 flex items-center justify-between gap-3 text-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#b7efc5] shrink-0" />
            <span>
              <strong>Active Diagnosis Loaded:</strong> {activeCropReport.cropName} ({activeCropReport.diagnosisName}) • Health: {activeCropReport.healthScore}%
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#1b4332] text-[#b7efc5] font-mono font-bold">
            Context Active
          </span>
        </div>
      )}

      {/* 2. MAIN CHAT CONTAINER */}
      <section className="glass-card rounded-3xl border border-[#b7efc5]/25 bg-[#0e1d15]/90 shadow-2xl flex flex-col h-[580px] overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-[#1b4332] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shrink-0 shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 text-xs space-y-2 shadow-xl ${
                    isUser
                      ? 'bg-[#1b4332] text-white rounded-tr-none border border-[#b7efc5]/30'
                      : 'bg-[#14261d]/90 text-[#d8f3dc] rounded-tl-none border border-[#b7efc5]/25'
                  }`}
                >
                  {/* Image Attachment if present */}
                  {msg.imageUrl && (
                    <div className="rounded-xl overflow-hidden border border-white/20 max-w-[240px] mb-2">
                      <img src={msg.imageUrl} alt="Attached crop" className="w-full h-auto object-cover" />
                    </div>
                  )}

                  {/* Message Body text with Markdown style */}
                  <div className="whitespace-pre-line leading-relaxed text-xs sm:text-[13px]">
                    {msg.text}
                  </div>

                  {/* Message Footer: Timestamp, Voice TTS, Copy */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-[#86af99]">
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSpeechSynthesis(msg.id, msg.text)}
                          className="hover:text-[#b7efc5] transition-colors p-1"
                          title="Listen to Voice"
                        >
                          {speakingMsgId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-[#ff897d] animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-[#b7efc5]" />
                          )}
                        </button>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(msg.text);
                            setCopiedMsgId(msg.id);
                            setTimeout(() => setCopiedMsgId(null), 1500);
                          }}
                          className="hover:text-white transition-colors p-1"
                          title="Copy Answer"
                        >
                          {copiedMsgId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-[#b7efc5]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Suggested Action Pills */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(action.action)}
                          className="px-2.5 py-1 rounded-xl bg-[#102217] hover:bg-[#1b3827] border border-[#b7efc5]/30 text-[#b7efc5] text-[11px] font-semibold transition-all cursor-pointer"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-[#102217] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shrink-0 shadow-md">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3 animate-in fade-in">
              <div className="w-9 h-9 rounded-2xl bg-[#1b4332] border border-[#b7efc5]/40 flex items-center justify-center text-[#b7efc5] shrink-0">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="bg-[#14261d] p-3.5 rounded-2xl rounded-tl-none border border-[#b7efc5]/30 flex items-center gap-2 text-xs text-[#95d4b3]">
                <span className="w-2 h-2 rounded-full bg-[#b7efc5] animate-ping" />
                <span>Krishi AI is synthesizing agronomic guidance...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Toolbar */}
        <div className="p-2.5 bg-[#0b1710] border-t border-[#414844]/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-[#86af99] uppercase tracking-wider shrink-0 mr-1">
            Suggested:
          </span>
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1 rounded-xl bg-[#14241b] hover:bg-[#1f382a] border border-[#b7efc5]/25 hover:border-[#b7efc5]/60 text-[11px] text-[#dfe4e0] font-medium whitespace-nowrap transition-all cursor-pointer shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice, Camera & Send */}
        <div className="p-3.5 bg-[#0e1d15] border-t border-[#414844]/40">
          {/* Image Attachment Preview */}
          {attachedImage && (
            <div className="relative inline-block mb-2 rounded-xl overflow-hidden border border-[#b7efc5]/40 shadow-lg">
              <img src={attachedImage} alt="Preview" className="w-20 h-20 object-cover" />
              <button
                onClick={() => setAttachedImage(null)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/80 text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Attach Image Button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => setAttachedImage(ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-2xl bg-[#18261e] hover:bg-[#23382b] border border-[#414844] text-[#86af99] hover:text-[#b7efc5] transition-colors cursor-pointer"
              title="Attach Leaf Image"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Voice Input Button */}
            <button
              onClick={toggleVoiceInput}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-red-600 text-white border-red-400 animate-pulse shadow-lg'
                  : 'bg-[#18261e] hover:bg-[#23382b] border-[#414844] text-[#b7efc5]'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Voice Input (Speak Hindi or English)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={isListening ? t('assistant.listening') : t('assistant.placeholder')}
              className="flex-1 bg-[#18261e] border border-[#414844] focus:border-[#b7efc5] rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-[#86af99] focus:outline-none transition-colors"
            />

            {/* Send CTA */}
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || (!inputQuery.trim() && !attachedImage)}
              className="p-3 sm:px-5 sm:py-3 rounded-2xl btn-3d-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg cursor-pointer disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t('assistant.send')}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
