import React, { useState, useEffect } from 'react';
import {
  Smile,
  Meh,
  Frown,
  Mic,
  MicOff,
  CheckCircle2,
  X,
  Volume2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../data/safetyContent';
import { createSpeechRecognizer, speakText, stopAllSpeech, soundEffects, KioskSpeechRecognizer } from '../utils/speech';

interface FeedbackModalProps {
  currentLanguage: Language;
  topicId?: string;
  onClose: () => void;
  onSuccessSubmitted: () => void;
  isMuted: boolean;
  speechRate: number;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  currentLanguage,
  topicId = 'general',
  onClose,
  onSuccessSubmitted,
  isMuted,
  speechRate,
}) => {
  const strings = UI_STRINGS[currentLanguage];
  const [rating, setRating] = useState<'clear' | 'confusing' | 'not_understood' | null>(null);
  const [voiceComment, setVoiceComment] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recognizer, setRecognizer] = useState<KioskSpeechRecognizer | null>(null);

  useEffect(() => {
    if (!isMuted) {
      stopAllSpeech();
      const prompt = currentLanguage === 'mr'
        ? 'माहिती स्पष्ट समजली का? खालील तीन बटनांवर टच करून सांगा.'
        : currentLanguage === 'hi'
        ? 'क्या जानकारी साफ समझ में आई? नीचे दिए गए बटनों से बताएं।'
        : 'Was this explanation clear? Tap one of the three buttons below.';
      speakText(prompt, currentLanguage, speechRate);
    }
  }, [currentLanguage]);

  useEffect(() => {
    const rec = createSpeechRecognizer(
      currentLanguage,
      (res) => {
        setVoiceComment(res.transcript);
        if (res.isFinal) {
          setIsListening(false);
        }
      },
      (err) => {
        setIsListening(false);
      },
      () => setIsListening(true),
      () => setIsListening(false)
    );

    setRecognizer(rec);

    return () => {
      rec.abort();
      stopAllSpeech();
    };
  }, [currentLanguage]);

  const toggleMic = () => {
    if (isListening) {
      recognizer?.stop();
      setIsListening(false);
    } else {
      stopAllSpeech();
      setVoiceComment('');
      recognizer?.start();
    }
  };

  const handleSelectRating = async (selectedRating: 'clear' | 'confusing' | 'not_understood') => {
    setRating(selectedRating);
    soundEffects.playSuccess();
  };

  const handleSubmit = async () => {
    if (!rating) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId,
          language: currentLanguage,
          rating,
          comment: voiceComment,
        }),
      });

      setIsSubmitted(true);
      if (!isMuted) {
        speakText(strings.feedbackSuccess, currentLanguage, speechRate);
      }

      setTimeout(() => {
        onSuccessSubmitted();
      }, 2400);
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {strings.feedbackSuccess}
            </h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              {strings.anonymousNotice}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-bold text-xs border border-emerald-400/20">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{strings.feedbackTitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {strings.feedbackTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {currentLanguage === 'mr'
                  ? '३ मोठ्या बटनांपैकी एकावर टच करा.'
                  : currentLanguage === 'hi'
                  ? '३ बड़े बटनों में से एक पर टच करें।'
                  : 'Tap one of the 3 large response buttons below.'}
              </p>
            </div>

            {/* 3 Giant Tactile Emoji Buttons */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Clear (Happy Green) */}
              <button
                onClick={() => handleSelectRating('clear')}
                className={`p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all cursor-pointer active:scale-95 ${
                  rating === 'clear'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-xl shadow-emerald-500/30 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <Smile className={`w-12 h-12 ${rating === 'clear' ? 'text-slate-950' : 'text-emerald-400'}`} />
                <span className="text-xs sm:text-sm font-extrabold text-center">
                  {strings.feedbackClear}
                </span>
              </button>

              {/* Somewhat Confusing (Neutral Amber) */}
              <button
                onClick={() => handleSelectRating('confusing')}
                className={`p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all cursor-pointer active:scale-95 ${
                  rating === 'confusing'
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xl shadow-amber-500/30 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <Meh className={`w-12 h-12 ${rating === 'confusing' ? 'text-slate-950' : 'text-amber-400'}`} />
                <span className="text-xs sm:text-sm font-extrabold text-center">
                  {strings.feedbackConfusing}
                </span>
              </button>

              {/* Did Not Understand (Sad Red) */}
              <button
                onClick={() => handleSelectRating('not_understood')}
                className={`p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 transition-all cursor-pointer active:scale-95 ${
                  rating === 'not_understood'
                    ? 'bg-rose-500 text-white border-rose-400 shadow-xl shadow-rose-500/30 scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <Frown className={`w-12 h-12 ${rating === 'not_understood' ? 'text-white' : 'text-rose-400'}`} />
                <span className="text-xs sm:text-sm font-extrabold text-center">
                  {strings.feedbackNotUnderstood}
                </span>
              </button>
            </div>

            {/* Optional Spoken Feedback Voice Note */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  {currentLanguage === 'mr'
                    ? 'काही सूचना आहे का? आवाजात सांगा (ऐच्छिक):'
                    : currentLanguage === 'hi'
                    ? 'कोई सुझाव है? बोलकर बताएं (वैकल्पिक):'
                    : 'Optional voice note (e.g. "Speak slower"): '}
                </span>
                <button
                  onClick={toggleMic}
                  className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isListening ? strings.stopListening : (currentLanguage === 'mr' ? 'माईक चालू' : 'Tap Mic')}</span>
                </button>
              </div>

              {voiceComment && (
                <p className="text-xs text-white font-medium italic bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  "{voiceComment}"
                </p>
              )}
            </div>

            {/* Privacy & Zero-ID notice */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{strings.anonymousNotice}</span>
            </div>

            {/* Submit Action Button */}
            <button
              onClick={handleSubmit}
              disabled={!rating || isSubmitting}
              className={`w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                rating && !isSubmitting
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-xl shadow-amber-500/20 active:scale-98'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
              }`}
            >
              <span>
                {currentLanguage === 'mr'
                  ? 'अभिप्राय नोंदवा'
                  : currentLanguage === 'hi'
                  ? 'प्रतिक्रिया जमा करें'
                  : 'Submit Anonymous Feedback'}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
