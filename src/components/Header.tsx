import React from 'react';
import { Volume2, VolumeX, AlertTriangle, Shield, UserCog, Clock, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../data/safetyContent';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isSpeaking: boolean;
  onToggleMute: () => void;
  isMuted: boolean;
  speechRate: number;
  onToggleSpeechRate: () => void;
  onOpenSOS: () => void;
  isAdminView: boolean;
  onToggleAdmin: () => void;
  onResetSession: () => void;
  idleSecondsRemaining: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  isSpeaking,
  onToggleMute,
  isMuted,
  speechRate,
  onToggleSpeechRate,
  onOpenSOS,
  isAdminView,
  onToggleAdmin,
  onResetSession,
  idleSecondsRemaining,
}) => {
  const strings = UI_STRINGS[currentLanguage];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Kiosk title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onResetSession}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-xl">
            <Shield className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                {strings.appName}
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                KIOSK #04 • CHAKAN PLANT
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              {strings.tagline}
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Language Switcher Buttons */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700/80 shadow-inner">
            <button
              onClick={() => onLanguageChange('mr')}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                currentLanguage === 'mr'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="मराठी"
            >
              मराठी
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                currentLanguage === 'hi'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="हिन्दी"
            >
              हिन्दी
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                currentLanguage === 'en'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Speech Controls */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-xl p-1">
            <button
              onClick={onToggleMute}
              className={`p-2 rounded-lg transition-colors ${
                isMuted
                  ? 'bg-red-500/20 text-red-400'
                  : isSpeaking
                  ? 'bg-amber-400/20 text-amber-300 animate-pulse'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
              title={isMuted ? 'Unmute' : 'Mute Voice'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={onToggleSpeechRate}
              className="px-2 py-1 text-xs font-bold rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white"
              title="Toggle Slow / Normal Audio"
            >
              {speechRate < 0.95 ? '0.8x 🐢' : '1.0x 🗣️'}
            </button>
          </div>

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenSOS}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-extrabold px-3.5 py-2 rounded-xl shadow-lg shadow-red-900/40 active:scale-95 transition-all border border-red-400/30"
          >
            <AlertTriangle className="w-5 h-5 animate-bounce" />
            <span className="text-sm font-black tracking-wide">SOS</span>
          </button>

          {/* Mode Switcher: Admin / Worker */}
          <button
            onClick={onToggleAdmin}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              isAdminView
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <UserCog className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isAdminView ? strings.workerMode : strings.adminMode}
            </span>
          </button>

          {/* Auto Session Countdown & Reset */}
          {!isAdminView && (
            <div
              onClick={onResetSession}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-slate-400 text-xs font-mono cursor-pointer hover:bg-slate-800"
              title="Click to reset session"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{idleSecondsRemaining}s</span>
              <RefreshCw className="w-3 h-3 text-slate-500 ml-0.5" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
