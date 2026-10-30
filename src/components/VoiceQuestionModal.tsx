import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  X,
  Send,
  Sparkles,
  AlertOctagon,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Award,
  MessageSquare,
  Bot
} from 'lucide-react';
import { Language, VoiceQuestionResult } from '../types';
import { UI_STRINGS, CORE_CHATBOT_QUESTIONS, SAMPLE_QUESTIONS_BY_LANG } from '../data/safetyContent';
import { createSpeechRecognizer, speakText, stopAllSpeech, KioskSpeechRecognizer } from '../utils/speech';

interface VoiceQuestionModalProps {
  currentLanguage: Language;
  initialQuery?: string;
  onClose: () => void;
  onOpenTeachBack: (topicId?: string) => void;
  isMuted: boolean;
  speechRate: number;
}

export const VoiceQuestionModal: React.FC<VoiceQuestionModalProps> = ({
  currentLanguage,
  initialQuery,
  onClose,
  onOpenTeachBack,
  isMuted,
  speechRate,
}) => {
  const strings = UI_STRINGS[currentLanguage];
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(initialQuery || '');
  const [typedInput, setTypedInput] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [answerResult, setAnswerResult] = useState<VoiceQuestionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [recognizer, setRecognizer] = useState<KioskSpeechRecognizer | null>(null);

  // Initialize Speech Recognizer
  useEffect(() => {
    const rec = createSpeechRecognizer(
      currentLanguage,
      (res) => {
        setTranscript(res.transcript);
        if (res.isFinal) {
          setIsListening(false);
          submitQuestion(res.transcript);
        }
      },
      (err) => {
        setIsListening(false);
        if (err !== 'no-speech') {
          setErrorMessage(
            currentLanguage === 'mr'
              ? 'माईक चालू करण्यात अडचण आली. कृपया खालील प्रश्नांवर टच करा किंवा टाईप करा.'
              : currentLanguage === 'hi'
              ? 'माइक में समस्या आई। कृपया नीचे दिए गए प्रश्नों पर टच करें या टाइप करें।'
              : 'Microphone issue. Please tap one of the common safety questions or type below.'
          );
        }
      },
      () => {
        setIsListening(true);
        setErrorMessage('');
      },
      () => {
        setIsListening(false);
      }
    );

    setRecognizer(rec);

    if (initialQuery && initialQuery.trim()) {
      submitQuestion(initialQuery.trim());
    }

    return () => {
      rec.abort();
      stopAllSpeech();
    };
  }, [currentLanguage]);

  const toggleListening = () => {
    if (isListening) {
      recognizer?.stop();
      setIsListening(false);
      if (transcript.trim()) {
        submitQuestion(transcript);
      }
    } else {
      stopAllSpeech();
      setTranscript('');
      setAnswerResult(null);
      setErrorMessage('');
      recognizer?.start();
    }
  };

  const submitQuestion = async (queryText: string) => {
    if (!queryText.trim()) return;
    setLoading(true);
    setErrorMessage('');
    stopAllSpeech();

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: queryText,
          language: currentLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get answer from safety assistant');
      }

      const data: VoiceQuestionResult = await response.json();
      setAnswerResult(data);

      // Auto speak answer via TTS if not muted
      if (!isMuted && data.answerText) {
        speakText(data.answerText, currentLanguage, speechRate);
      }
    } catch (err: any) {
      console.error('Error querying question:', err);
      setErrorMessage(
        currentLanguage === 'mr'
          ? 'माहिती शोधण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा किंवा सुपरवायझरला सांगा.'
          : currentLanguage === 'hi'
          ? 'उत्तर प्राप्त करने में समस्या आई। कृपया पुनः प्रयास करें।'
          : 'Could not fetch safety answer. Please try again or ask supervisor.'
      );
    } finally {
      setLoading(false);
    }
  };

  const playAnswerAudio = () => {
    if (answerResult && !isMuted) {
      stopAllSpeech();
      speakText(answerResult.answerText, currentLanguage, speechRate);
    }
  };

  const handleQuickQuestionClick = (q: string) => {
    setTranscript(q);
    setTypedInput(q);
    submitQuestion(q);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedInput.trim()) {
      setTranscript(typedInput);
      submitQuestion(typedInput);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-400/70 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh] space-y-5 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 font-bold text-xs border border-amber-400/30">
            <Bot className="w-4 h-4 text-amber-400" />
            <span>{strings.chatAssistantTitle}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {currentLanguage === 'mr'
              ? 'सुरक्षा प्रश्न बोला किंवा विचारा'
              : currentLanguage === 'hi'
              ? 'सुरक्षा सवाल बोलें या पूछें'
              : 'Voice Safety Q&A Assistant'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {strings.chatAssistantSubtitle}
          </p>
        </div>

        {/* Big Tactile Mic Interaction Area */}
        <div className="flex flex-col items-center justify-center py-2 space-y-3">
          <div className="relative">
            {/* Pulse waves when listening */}
            {isListening && (
              <div className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
            )}
            <button
              onClick={toggleListening}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white shadow-rose-600/50 scale-105'
                  : 'bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 shadow-amber-500/40 hover:scale-105'
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12 animate-pulse" />
              ) : (
                <Mic className="w-12 h-12 stroke-[2.5]" />
              )}
            </button>
          </div>

          <div className="text-center space-y-0.5">
            <div className="text-sm font-extrabold text-white">
              {isListening ? (
                <span className="text-rose-400 animate-pulse flex items-center justify-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
                  {strings.listening}
                </span>
              ) : loading ? (
                <span className="text-amber-400 flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-bounce" />
                  {strings.processing}
                </span>
              ) : (
                <span>{strings.tapToSpeak}</span>
              )}
            </div>
            {isListening && (
              <p className="text-xs text-slate-400">
                {currentLanguage === 'mr' ? 'बोलून झाल्यावर पुन्हा टच करा' : currentLanguage === 'hi' ? 'बोलने के बाद दोबारा टच करें' : 'Tap again when finished speaking'}
              </p>
            )}
          </div>
        </div>

        {/* Live Spoken Transcript Display */}
        {transcript && (
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
              {currentLanguage === 'mr' ? 'तुमचा प्रश्न (बोले गेलेले):' : currentLanguage === 'hi' ? 'आपका सवाल (बोला गया):' : 'Your Spoken Question:'}
            </span>
            <p className="text-base font-bold text-white">"{transcript}"</p>
          </div>
        )}

        {/* Error message if any */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* AI Safety Answer Box */}
        {answerResult && (
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border-2 border-amber-400/60 shadow-xl space-y-3.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>
                  {currentLanguage === 'mr' ? 'सुरक्षा उत्तर (AI Guidance)' : currentLanguage === 'hi' ? 'सुरक्षा निर्देश (AI Guidance)' : 'Safety Guidance (AI)'}
                </span>
              </div>

              <button
                onClick={playAnswerAudio}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{strings.replayAudio}</span>
              </button>
            </div>

            {/* Answer spoken text */}
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {answerResult.answerText}
            </p>

            {/* Actionable Key Point Badges */}
            {answerResult.keyPoints && answerResult.keyPoints.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {currentLanguage === 'mr' ? 'तात्काळ पावले:' : currentLanguage === 'hi' ? 'तुरंत करने योग्य कदम:' : 'Immediate Steps:'}
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {answerResult.keyPoints.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-semibold"
                    >
                      <span className="w-5 h-5 rounded-md bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4 CORE CHATBOT QUESTIONS (Highlight required by prompt) */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{strings.quickQuestionsTitle}</span>
            </span>
            <span className="text-[10px] text-slate-400">१-टच उत्तर ऐका</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CORE_CHATBOT_QUESTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleQuickQuestionClick(item.query[currentLanguage])}
                className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-amber-400/30 hover:border-amber-400 text-left text-xs font-semibold text-white transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span className="text-amber-400 text-base">👉</span>
                <span className="line-clamp-2">{item.query[currentLanguage]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Manual Text Input for quiet typing */}
        <form onSubmit={handleManualSubmit} className="flex gap-2 pt-2">
          <input
            type="text"
            value={typedInput}
            onChange={(e) => setTypedInput(e.target.value)}
            placeholder={
              currentLanguage === 'mr'
                ? 'किंवा येथे प्रश्न टाईप करा...'
                : currentLanguage === 'hi'
                ? 'या यहाँ सवाल टाइप करें...'
                : 'Or type safety query here...'
            }
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={!typedInput.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-black text-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
