import React, { useEffect } from 'react';
import { Volume2, CheckCircle2, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { speakText, stopAllSpeech } from '../utils/speech';

interface LanguageSelectorProps {
  onSelectLanguage: (lang: Language) => void;
  isMuted: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onSelectLanguage,
  isMuted,
}) => {
  useEffect(() => {
    if (!isMuted) {
      // Warm spoken greeting welcoming the worker in Marathi, Hindi & English
      speakText('कृपया भाषा निवडा. कृपया अपनी भाषा चुनें. Please select your language.', 'mr', 0.95);
    }
    return () => {
      stopAllSpeech();
    };
  }, [isMuted]);

  const handleSelect = (lang: Language) => {
    stopAllSpeech();
    const greetings: Record<Language, string> = {
      mr: 'मराठी भाषा निवडली आहे. सुरक्षा किओस्कमध्ये आपले स्वागत!',
      hi: 'हिन्दी भाषा चुनी गई है। सुरक्षा कियोस्क में आपका स्वागत है!',
      en: 'English selected. Welcome to the Suraksha Safety Kiosk.',
    };
    if (!isMuted) {
      speakText(greetings[lang], lang, 0.95);
    }
    onSelectLanguage(lang);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto">
      {/* Decorative prompt banner */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-semibold text-sm mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>सुरक्षा किओस्क / Safety Voice Kiosk</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          कृपया भाषा निवडा / अपनी भाषा चुनें
        </h2>
        <p className="text-lg text-slate-300 flex items-center justify-center gap-2">
          <Volume2 className="w-5 h-5 text-amber-400 animate-pulse" />
          <span>Please select your spoken language</span>
        </p>
      </div>

      {/* 3 Giant Tactile Language Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {/* Marathi */}
        <button
          onClick={() => handleSelect('mr')}
          className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 hover:border-amber-400 shadow-2xl hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[220px] justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-extrabold text-2xl mb-4 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all border border-amber-400/40">
            म
          </div>
          <span className="text-3xl font-black text-white group-hover:text-amber-300 mb-1">
            मराठी
          </span>
          <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200">
            मराठीत बोला आणि ऐका
          </span>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Volume2 className="w-3.5 h-3.5" />
            <span>आवाज समर्थित</span>
          </div>
        </button>

        {/* Hindi */}
        <button
          onClick={() => handleSelect('hi')}
          className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 hover:border-amber-400 shadow-2xl hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[220px] justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-extrabold text-2xl mb-4 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all border border-amber-400/40">
            हि
          </div>
          <span className="text-3xl font-black text-white group-hover:text-amber-300 mb-1">
            हिन्दी
          </span>
          <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200">
            हिन्दी में बोलें और सुनें
          </span>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Volume2 className="w-3.5 h-3.5" />
            <span>आवाज समर्थित</span>
          </div>
        </button>

        {/* English */}
        <button
          onClick={() => handleSelect('en')}
          className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 hover:border-amber-400 shadow-2xl hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer min-h-[220px] justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-extrabold text-2xl mb-4 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all border border-amber-400/40">
            EN
          </div>
          <span className="text-3xl font-black text-white group-hover:text-amber-300 mb-1">
            English
          </span>
          <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200">
            Speak and listen in English
          </span>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400/90 font-medium bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Voice Enabled</span>
          </div>
        </button>
      </div>

      {/* Helpful accessibility hint */}
      <div className="mt-12 text-center text-slate-400 text-sm flex items-center gap-2 bg-slate-900/80 px-5 py-2.5 rounded-full border border-slate-800">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>मोठ्या बटनांवर टच करा • टच और बोलकर आसानी से समझें</span>
      </div>
    </div>
  );
};
