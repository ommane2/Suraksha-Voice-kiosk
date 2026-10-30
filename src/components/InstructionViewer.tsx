import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Award,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';
import { Language, SafetyTopic } from '../types';
import { UI_STRINGS } from '../data/safetyContent';
import { speakText, stopAllSpeech } from '../utils/speech';

interface InstructionViewerProps {
  topic: SafetyTopic;
  currentLanguage: Language;
  onBack: () => void;
  onStartTeachBack: (topicId: string) => void;
  isMuted: boolean;
  speechRate: number;
}

export const InstructionViewer: React.FC<InstructionViewerProps> = ({
  topic,
  currentLanguage,
  onBack,
  onStartTeachBack,
  isMuted,
  speechRate,
}) => {
  const strings = UI_STRINGS[currentLanguage];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const slide = topic.slides[currentSlideIndex] || topic.slides[0];

  const playCurrentSlideAudio = () => {
    if (isMuted) return;
    stopAllSpeech();
    const textToSpeak = `${slide.title[currentLanguage]}. ${slide.audioScript[currentLanguage]}`;
    setIsPlayingAudio(true);
    speakText(
      textToSpeak,
      currentLanguage,
      speechRate,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  useEffect(() => {
    playCurrentSlideAudio();
    return () => {
      stopAllSpeech();
    };
  }, [currentSlideIndex, currentLanguage]);

  const handleNext = () => {
    if (currentSlideIndex < topic.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  // Visual diagram renderer for maximum comprehension with minimal text
  const renderDiagram = (type: string) => {
    switch (type) {
      case 'ppe':
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="bg-amber-400/10 border-2 border-amber-400/40 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">🪖</span>
                <span className="text-xs font-bold text-amber-300 mt-2">
                  {currentLanguage === 'mr' ? 'हेल्मेट' : currentLanguage === 'hi' ? 'हेलमेट' : 'Hard Hat'}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">✓ डोक्याचे संरक्षण</span>
              </div>
              <div className="bg-amber-400/10 border-2 border-amber-400/40 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">🥾</span>
                <span className="text-xs font-bold text-amber-300 mt-2">
                  {currentLanguage === 'mr' ? 'स्टील टो बूट' : currentLanguage === 'hi' ? 'सेफ्टी जूते' : 'Steel-Toe Boots'}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">✓ २०० ज्यूल भार</span>
              </div>
              <div className="bg-amber-400/10 border-2 border-amber-400/40 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">🧤</span>
                <span className="text-xs font-bold text-amber-300 mt-2">
                  {currentLanguage === 'mr' ? 'हातमोजे' : currentLanguage === 'hi' ? 'दस्ताने' : 'Safety Gloves'}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">✓ कट व ऑइल विरोधी</span>
              </div>
              <div className="bg-amber-400/10 border-2 border-amber-400/40 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">🥽</span>
                <span className="text-xs font-bold text-amber-300 mt-2">
                  {currentLanguage === 'mr' ? 'संरक्षक चष्मा' : currentLanguage === 'hi' ? 'सेफ्टी चश्मा' : 'Eye Goggles'}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">✓ ठिणग्यांपासून रक्षण</span>
              </div>
            </div>
            <div className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20">
              ⚠️ {currentLanguage === 'mr' ? 'सैल कपडे व घड्याळे पूर्णपणे वर्ज्य' : currentLanguage === 'hi' ? 'ढीले कपड़े व कड़ा वर्जित' : 'No loose sleeves or jewelry'}
            </div>
          </div>
        );

      case 'loto':
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center justify-center gap-3 w-full">
              {/* Padlock + Tag representation */}
              <div className="bg-rose-500/20 border-2 border-rose-500 rounded-2xl p-5 flex flex-col items-center shadow-lg shadow-rose-950/50">
                <span className="text-4xl animate-bounce">🔒</span>
                <span className="text-xs font-black text-rose-300 mt-2 uppercase tracking-wide">
                  {currentLanguage === 'mr' ? 'लाल कुलूप (Lock)' : currentLanguage === 'hi' ? 'लाल ताला' : 'Personal Lock'}
                </span>
                <span className="text-[10px] text-slate-300">चावी स्वतःजवळ ठेवा</span>
              </div>

              <span className="text-2xl text-slate-500 font-bold">+</span>

              <div className="bg-amber-500/20 border-2 border-amber-500 rounded-2xl p-5 flex flex-col items-center shadow-lg shadow-amber-950/50">
                <span className="text-4xl">🏷️</span>
                <span className="text-xs font-black text-amber-300 mt-2 uppercase tracking-wide">
                  {currentLanguage === 'mr' ? 'डेंजर टॅग (Tag)' : currentLanguage === 'hi' ? 'खतरा टैग' : 'Danger Tag'}
                </span>
                <span className="text-[10px] text-slate-300">नाव व आयडी लिहा</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-400/10 px-4 py-2 rounded-xl border border-amber-400/30">
              <span>🔴 ई-स्टॉप दाबा ➜ कुलूप लावा ➜ चाचणी करा (Zero Energy)</span>
            </div>
          </div>
        );

      case 'fire':
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <div className="grid grid-cols-4 gap-2 w-full max-w-md">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 flex flex-col items-center">
                <span className="text-2xl font-black text-orange-400">P</span>
                <span className="text-xs font-bold text-white mt-1">PULL</span>
                <span className="text-[10px] text-slate-400">पिन ओढा</span>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 flex flex-col items-center">
                <span className="text-2xl font-black text-orange-400">A</span>
                <span className="text-xs font-bold text-white mt-1">AIM</span>
                <span className="text-[10px] text-slate-400">मुळाशी धरा</span>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 flex flex-col items-center">
                <span className="text-2xl font-black text-orange-400">S</span>
                <span className="text-xs font-bold text-white mt-1">SQUEEZE</span>
                <span className="text-[10px] text-slate-400">हँडल दाबा</span>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 flex flex-col items-center">
                <span className="text-2xl font-black text-orange-400">S</span>
                <span className="text-xs font-bold text-white mt-1">SWEEP</span>
                <span className="text-[10px] text-slate-400">फिरवा</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-black text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30">
              <span>🏃‍♂️ धावू नका ➔ हिरवे एक्झिट ➔ असेंबली पॉईंट मैदानात जमा व्हा</span>
            </div>
          </div>
        );

      case 'electrical':
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="bg-yellow-500/10 border-2 border-yellow-500/40 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">⚡</span>
                <span className="text-xs font-bold text-yellow-300 mt-2">
                  {currentLanguage === 'mr' ? 'उघड्या वायर्स' : currentLanguage === 'hi' ? 'नंगे तार' : 'Exposed Wires'}
                </span>
                <span className="text-[10px] text-rose-400 font-bold">🚫 हात लावू नका</span>
              </div>
              <div className="bg-yellow-500/10 border-2 border-yellow-500/40 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">💧</span>
                <span className="text-xs font-bold text-yellow-300 mt-2">
                  {currentLanguage === 'mr' ? 'ओले हात' : currentLanguage === 'hi' ? 'गीले हाथ' : 'Wet Hands'}
                </span>
                <span className="text-[10px] text-rose-400 font-bold">🚫 स्विच चालू करू नका</span>
              </div>
            </div>
            <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30">
              ⚡ विजेचा धक्का लागल्यास: आधी मुख्य स्विच बंद करा • लाकडी काठी वापरा
            </div>
          </div>
        );

      case 'machine':
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="bg-rose-500/20 border-2 border-rose-500 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl animate-bounce">🔒</span>
                <span className="text-xs font-black text-rose-300 mt-1 uppercase">
                  {currentLanguage === 'mr' ? 'लाल कुलूप' : currentLanguage === 'hi' ? 'लाल ताला' : 'Personal Lock'}
                </span>
                <span className="text-[10px] text-slate-300">चावी स्वतःजवळ</span>
              </div>

              <span className="text-xl text-slate-500 font-bold">+</span>

              <div className="bg-amber-500/20 border-2 border-amber-500 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">🏷️</span>
                <span className="text-xs font-black text-amber-300 mt-1 uppercase">
                  {currentLanguage === 'mr' ? 'डेंजर टॅग' : currentLanguage === 'hi' ? 'खतरा टैग' : 'Danger Tag'}
                </span>
                <span className="text-[10px] text-slate-300">नाव व आयडी</span>
              </div>
            </div>
            <div className="text-xs font-bold text-amber-300 bg-amber-400/10 px-4 py-2 rounded-xl border border-amber-400/30">
              🔴 मशीन अचानक थांबल्यास: हात घालू नका! लाल ई-स्टॉप दाबा
            </div>
          </div>
        );

      case 'helmet':
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center justify-center gap-6">
              <div className="text-5xl animate-bounce">🪖</div>
              <div className="text-left space-y-1">
                <div className="text-xl font-black text-amber-400">ISI प्रमाणित हेल्मेट</div>
                <div className="text-xs text-slate-300 font-semibold">
                  {currentLanguage === 'mr' ? 'हनुवटीची पट्टी (Chinstrap) घट्ट लावा' : currentLanguage === 'hi' ? 'चिन स्ट्रैप कसकर बांधें' : 'Fasten chin strap tightly'}
                </div>
                <div className="text-xs text-emerald-400 font-bold">✓ वरतून पडणाऱ्या अवजड वस्तूंपासून रक्षण</div>
              </div>
            </div>
            <div className="text-xs text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              ⚠️ तडे गेलेले हेल्मेट स्टोअरमधून मोफत बदला
            </div>
          </div>
        );

      case 'gloves':
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="bg-blue-500/10 border-2 border-blue-500/40 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">🧤</span>
                <span className="text-xs font-bold text-blue-300 mt-1">
                  {currentLanguage === 'mr' ? 'केव्हलार कट-रेसिस्टंट' : currentLanguage === 'hi' ? 'कट-रोधी दस्ताने' : 'Cut-Resistant'}
                </span>
                <span className="text-[10px] text-slate-300">धारदार पत्र्यासाठी</span>
              </div>
              <div className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl">🧪</span>
                <span className="text-xs font-bold text-emerald-300 mt-1">
                  {currentLanguage === 'mr' ? 'नायट्रिल रबरी' : currentLanguage === 'hi' ? 'नाइब्रिल रबर' : 'Nitrile Rubber'}
                </span>
                <span className="text-[10px] text-slate-300">ऑइल व केमिकलसाठी</span>
              </div>
            </div>
            <div className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20">
              ⚠️ फिरणाऱ्या रोलरजवळ सैल दोरे असलेले कापडी हातमोजे घालू नका
            </div>
          </div>
        );

      case 'protective':
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-4 text-center">
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              <div className="bg-amber-400/10 border border-amber-400/40 rounded-xl p-3 flex flex-col items-center">
                <span className="text-2xl">🥾</span>
                <span className="text-[11px] font-bold text-amber-300 mt-1">स्टील टो बूट</span>
                <span className="text-[9px] text-slate-400">पाय चिरडण्यापासून बचाव</span>
              </div>
              <div className="bg-amber-400/10 border border-amber-400/40 rounded-xl p-3 flex flex-col items-center">
                <span className="text-2xl">🥽</span>
                <span className="text-[11px] font-bold text-amber-300 mt-1">सुरक्षा चष्मा</span>
                <span className="text-[9px] text-slate-400">ग्राइंडिंग ठिणग्या</span>
              </div>
              <div className="bg-amber-400/10 border border-amber-400/40 rounded-xl p-3 flex flex-col items-center">
                <span className="text-2xl">🚿</span>
                <span className="text-[11px] font-bold text-amber-300 mt-1">आय-वॉश केंद्र</span>
                <span className="text-[9px] text-slate-400">१५ मिनिटे सतत पाणी</span>
              </div>
            </div>
            <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30">
              ✓ दररोज काम सुरू करण्यापूर्वी सर्व सुरक्षा साधने तपासा
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-center text-center">
            <div className="text-4xl text-amber-400">⚠️</div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{strings.home}</span>
        </button>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400">
          <span>{topic.title[currentLanguage]}</span>
          <span>•</span>
          <span className="text-amber-400">
            {currentSlideIndex + 1} / {topic.slides.length}
          </span>
        </div>

        <button
          onClick={playCurrentSlideAudio}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all cursor-pointer ${
            isPlayingAudio
              ? 'bg-amber-400 text-slate-950 shadow-amber-500/20 animate-pulse'
              : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700'
          }`}
        >
          {isPlayingAudio ? <RotateCcw className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span className="hidden sm:inline">{strings.replayAudio}</span>
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Slide Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 font-bold text-xs border border-amber-400/20">
            <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce text-amber-400' : ''}`} />
            <span>
              {currentLanguage === 'mr' ? 'ऐका आणि समजून घ्या' : currentLanguage === 'hi' ? 'सुनें और समझें' : 'Listen & Learn'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {slide.title[currentLanguage]}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg font-medium">
            {slide.caption[currentLanguage]}
          </p>
        </div>

        {/* Visual Diagram Area */}
        <div className="my-4">
          {renderDiagram(slide.diagramType)}
        </div>

        {/* Short Bullet Points (Max 5-7 words for factory worker literacy) */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            {currentLanguage === 'mr' ? 'महत्त्वाचे ४ नियम:' : currentLanguage === 'hi' ? 'जरूरी ४ नियम:' : 'Key 4 Rules:'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {slide.bullets[currentLanguage].map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spoken Narration Transcript Box */}
        <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20 text-slate-300 text-sm flex items-start gap-3">
          <Volume2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-400 text-xs block mb-1">
              {currentLanguage === 'mr' ? 'किओस्क आवाज संदेश:' : currentLanguage === 'hi' ? 'कियोस्क आवाज संदेश:' : 'Kiosk Spoken Voice:'}
            </span>
            <p className="italic text-slate-200">{slide.audioScript[currentLanguage]}</p>
          </div>
        </div>
      </div>

      {/* Slide Navigation Buttons & Teach-Back Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              currentSlideIndex === 0
                ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>{strings.prevSlide}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === topic.slides.length - 1}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              currentSlideIndex === topic.slides.length - 1
                ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 active:scale-95'
            }`}
          >
            <span>{strings.nextSlide}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Teach-Back Direct Button */}
        <button
          onClick={() => onStartTeachBack(topic.id)}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <Award className="w-5 h-5" />
          <span>{strings.checkUnderstanding}</span>
        </button>
      </div>
    </div>
  );
};
