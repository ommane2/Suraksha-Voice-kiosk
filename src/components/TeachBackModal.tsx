import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  X,
  Award,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Language, SafetyTopic, TeachbackResult } from '../types';
import { UI_STRINGS, SAFETY_TOPICS } from '../data/safetyContent';
import { createSpeechRecognizer, speakText, stopAllSpeech, soundEffects, KioskSpeechRecognizer } from '../utils/speech';

interface TeachBackModalProps {
  initialTopicId?: string;
  currentLanguage: Language;
  onClose: () => void;
  onReviewTopic: (topicId: string) => void;
  onOpenFeedback: () => void;
  isMuted: boolean;
  speechRate: number;
}

export const TeachBackModal: React.FC<TeachBackModalProps> = ({
  initialTopicId = 'ppe',
  currentLanguage,
  onClose,
  onReviewTopic,
  onOpenFeedback,
  isMuted,
  speechRate,
}) => {
  const strings = UI_STRINGS[currentLanguage];
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopicId);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<TeachbackResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [recognizer, setRecognizer] = useState<KioskSpeechRecognizer | null>(null);

  const currentTopic = SAFETY_TOPICS.find((t) => t.id === selectedTopicId) || SAFETY_TOPICS[0];

  // Auto-play the prompt question when topic changes
  useEffect(() => {
    setResult(null);
    setTranscript('');
    setErrorMessage('');

    if (!isMuted) {
      stopAllSpeech();
      const promptToRead = currentTopic.teachbackPrompt[currentLanguage];
      speakText(promptToRead, currentLanguage, speechRate);
    }
  }, [selectedTopicId, currentLanguage]);

  // Speech Recognizer setup
  useEffect(() => {
    const rec = createSpeechRecognizer(
      currentLanguage,
      (res) => {
        setTranscript(res.transcript);
        if (res.isFinal) {
          setIsListening(false);
          submitExplanation(res.transcript);
        }
      },
      (err) => {
        setIsListening(false);
        if (err !== 'no-speech') {
          setErrorMessage(
            currentLanguage === 'mr'
              ? 'माईक चालू करण्यात अडचण. कृपया खालील नमुना उत्तरांवर टच करून तपासा.'
              : currentLanguage === 'hi'
              ? 'माइक में समस्या आई। आप नीचे दिए गए उदाहरण उत्तर चुन सकते हैं।'
              : 'Microphone issue. You can pick a sample worker explanation below.'
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

    return () => {
      rec.abort();
      stopAllSpeech();
    };
  }, [currentLanguage, selectedTopicId]);

  const toggleListening = () => {
    if (isListening) {
      recognizer?.stop();
      setIsListening(false);
      if (transcript.trim()) {
        submitExplanation(transcript);
      }
    } else {
      stopAllSpeech();
      setTranscript('');
      setResult(null);
      setErrorMessage('');
      recognizer?.start();
    }
  };

  const submitExplanation = async (text: string) => {
    if (!text.trim()) return;
    setEvaluating(true);
    setErrorMessage('');
    stopAllSpeech();

    try {
      const response = await fetch('/api/teachback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: text,
          topicId: selectedTopicId,
          language: currentLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate understanding');
      }

      const data: TeachbackResult = await response.json();
      setResult(data);

      if (data.rating === 'good') {
        soundEffects.playSuccess();
      }

      // Voice playback of encouraging feedback
      if (!isMuted && data.feedbackMessage) {
        speakText(data.feedbackMessage, currentLanguage, speechRate);
      }
    } catch (err: any) {
      console.error('Error submitting teachback:', err);
      setErrorMessage('Evaluation service temporarily unavailable. Please retry.');
    } finally {
      setEvaluating(false);
    }
  };

  // Sample worker test explanations for rapid demo / testing
  const sampleAnswersByTopic: Record<string, Record<Language, { good: string; partial: string }>> = {
    machine_safety: {
      mr: {
        good: 'मशीनचा मुख्य पॉवर स्विच बंद करायचा, स्वतःचे लाल कुलूप लावायचे आणि नावाचा डेंजर टॅग लावून चावी खिशात ठेवायची.',
        partial: 'मशीन बंद केली आणि लाल बटन दाबून हाताने अडकलेला भाग काढला.',
      },
      hi: {
        good: 'मेन बिजली बंद करके अपना लाल ताला लगाएंगे, डेंजर टैग टांगेंगे और शून्य ऊर्जा जांचेंगे।',
        partial: 'मशीन का स्विच ऑफ कर दिया था बस।',
      },
      en: {
        good: 'Shut off power breaker, lock it with personal red padlock, attach Danger Tag, and test zero energy.',
        partial: 'I just switched the main button off.',
      },
    },
    fire_safety: {
      mr: {
        good: 'आगीचा सायरन वाजताच मशीन बंद करायची, धावायचे नाही, हिरवे एक्झिट बोर्ड पाहायचे आणि बाहेर असेंबली पॉईंटवर जमा व्हायचे.',
        partial: 'सायरन वाजल्यावर पळत सुटलो आणि लिफ्टने खाली गेलो.',
      },
      hi: {
        good: 'अलार्म बजते ही काम रोकेंगे, दौड़ेंगे नहीं और बाहर असेंबली ग्राउंड पर इकट्ठे होंगे।',
        partial: 'अलार्म बजते ही भागने लगे।',
      },
      en: {
        good: 'Stop machines immediately, walk briskly via green EXIT routes, and assemble at outdoor Assembly Point.',
        partial: 'Ran towards the lift during siren.',
      },
    },
    electrical_safety: {
      mr: {
        good: 'उघड्या वायरला हात लावायचा नाही, ओले हात दूर ठेवायचे आणि विजेचा धक्का लागल्यास लाकडी काठी वापरून वीज बंद करायची.',
        partial: 'ओल्या हाताने बटण दाबले आणि वायर काढली.',
      },
      hi: {
        good: 'नंगी तारों को न छुएं, गीले हाथों से स्विच न दबाएं और करंट लगने पर पहले मेन पावर काटें।',
        partial: 'गीले हाथों से काम कर रहे थे।',
      },
      en: {
        good: 'Never touch bare wires, keep wet hands away, and disconnect main breaker using non-conductive wood during shock.',
        partial: 'Flipped switch with damp gloves.',
      },
    },
    helmets: {
      mr: {
        good: 'शॉप फ्लोअरवर जाताना पिवळे आयएसआय हेल्मेट घट्ट हनुवटीची पट्टी लावून घालायचे. तडे गेले तर स्टोअरमधून नवीन मोफत घ्यायचे.',
        partial: 'फक्त डोक्यावर सैल हेल्मेट ठेवले होते, पट्टी लावली नव्हती.',
      },
      hi: {
        good: 'प्रमाणित हेलमेट पहनना और चिन स्ट्रैप कसकर बांधना जरूरी है ताकि ऊपर से गिरने वाले सामान से सिर बचे।',
        partial: 'हेलमेट बिना स्ट्रैप के पहना था।',
      },
      en: {
        good: 'Wear ISI hard hat with chin strap secured firmly to absorb heavy overhead impacts. Replace cracked helmets.',
        partial: 'Just resting loose helmet on head.',
      },
    },
    gloves: {
      mr: {
        good: 'धारदार लोखंडासाठी केव्हलार कट-रेसिस्टंट हातमोजे आणि केमिकलसाठी नायट्रिल वापरायचे. फाटलेले हातमोजे त्वरित बदलायचे.',
        partial: 'फाटलेले हातमोजे घालूनच काम करत राहिलो.',
      },
      hi: {
        good: 'धारदार चादरों के लिए कट-रोधी दस्ताने और केमिकल के लिए रबर दस्ताने पहनें। कटे दस्ताने तुरंत बदलें।',
        partial: 'कटे हुए दस्ताने से ही काम करते रहे।',
      },
      en: {
        good: 'Use Kevlar cut-resistant gloves for sharp stampings and Nitrile for oils. Never wear frayed cloth near rollers.',
        partial: 'Used torn gloves near rollers.',
      },
    },
    protective_equipment: {
      mr: {
        good: 'स्टील-टो बूट, डोळ्यांसाठी चष्मा आणि केमिकल उडाल्यास १५ मिनिटे पिवळ्या आय-वॉश फवाऱ्याखाली डोळे धुवायचे.',
        partial: 'केमिकल डोळ्यात गेल्यावर हाताने चोळले आणि १ मिनिट पाणी लावले.',
      },
      hi: {
        good: 'स्टील-टो जूते पहनना और केमिकल आंख में जाने पर पूरे १५ मिनट तक लगातार ठंडे पानी से धोना।',
        partial: 'आंख में केमिकल जाने पर हाथ से मसल लिया।',
      },
      en: {
        good: 'Steel-toe boots for heavy crush hazards, goggles for grinding, and full 15-minute cold eyewash on chemical splash.',
        partial: 'Washed chemical splash for only 30 seconds.',
      },
    },
  };

  const currentSamples = sampleAnswersByTopic[selectedTopicId]?.[currentLanguage] || sampleAnswersByTopic.machine_safety[currentLanguage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh] space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 font-bold text-xs border border-indigo-400/20">
            <Award className="w-4 h-4 text-indigo-400" />
            <span>{strings.shortQuiz}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {strings.explainInYourWords}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {currentLanguage === 'mr'
              ? 'स्वतःच्या शब्दांत सांगा. आम्ही तुमची समज तपासून मार्गदर्शन करू.'
              : currentLanguage === 'hi'
              ? 'अपने शब्दों में बोलकर समझाएं। हम आपकी समझ जांचकर सुझाव देंगे।'
              : 'Re-explain the safety procedure in your own words. AI measures comprehension.'}
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SAFETY_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTopicId === topic.id
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {topic.title[currentLanguage]}
            </button>
          ))}
        </div>

        {/* Prompt Question Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border-2 border-indigo-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'mr' ? 'चाचणी प्रश्न:' : currentLanguage === 'hi' ? 'क्विज प्रश्न:' : 'Quiz Question:'}</span>
            </span>
            <button
              onClick={() => {
                stopAllSpeech();
                speakText(currentTopic.teachbackPrompt[currentLanguage], currentLanguage, speechRate);
              }}
              className="text-xs text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{strings.replayAudio}</span>
            </button>
          </div>
          <p className="text-base sm:text-lg font-extrabold text-white">
            "{currentTopic.teachbackPrompt[currentLanguage]}"
          </p>
        </div>

        {/* Big Mic Recording Button */}
        <div className="flex flex-col items-center justify-center py-2 space-y-3">
          <div className="relative">
            {isListening && (
              <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping" />
            )}
            <button
              onClick={toggleListening}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white shadow-rose-600/50 scale-105'
                  : 'bg-gradient-to-tr from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white shadow-indigo-600/40 hover:scale-105'
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12 animate-pulse" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm font-bold text-white block">
              {isListening ? (
                <span className="text-rose-400 animate-pulse">{strings.listening}</span>
              ) : evaluating ? (
                <span className="text-amber-400">{strings.processing}</span>
              ) : (
                <span>{strings.tapToSpeak}</span>
              )}
            </span>
            {isListening && (
              <span className="text-xs text-slate-400">
                {currentLanguage === 'mr' ? 'सांगून झाल्यावर थांबवा' : currentLanguage === 'hi' ? 'बोलने के बाद रोकें' : 'Tap to stop when done'}
              </span>
            )}
          </div>
        </div>

        {/* Worker Spoken Transcript */}
        {transcript && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
            <span className="text-xs font-bold text-indigo-400 block mb-1">
              {currentLanguage === 'mr' ? 'तुमचे स्पष्टीकरण:' : currentLanguage === 'hi' ? 'आपका उत्तर:' : 'Your Spoken Response:'}
            </span>
            <p className="text-sm font-semibold text-white">"{transcript}"</p>
          </div>
        )}

        {/* Quick simulation buttons (Crucial for reliable testing without noisy environment) */}
        {!result && (
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400">
              {currentLanguage === 'mr' ? 'किंवा चाचणीसाठी नमुना उत्तरावर टच करा:' : currentLanguage === 'hi' ? 'या परीक्षण हेतु उत्तर चुनें:' : 'Or tap a sample worker response to test:'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setTranscript(currentSamples.good);
                  submitExplanation(currentSamples.good);
                }}
                className="text-left p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                🟢 {currentLanguage === 'mr' ? 'पूर्ण उत्तर (Good)' : currentLanguage === 'hi' ? 'पूर्ण उत्तर' : 'Full Explanation'}: "{currentSamples.good.slice(0, 45)}..."
              </button>
              <button
                onClick={() => {
                  setTranscript(currentSamples.partial);
                  submitExplanation(currentSamples.partial);
                }}
                className="text-left p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold active:scale-95 transition-all cursor-pointer"
              >
                🟡 {currentLanguage === 'mr' ? 'अपूर्ण उत्तर (Partial)' : currentLanguage === 'hi' ? 'आंशिक उत्तर' : 'Partial Explanation'}: "{currentSamples.partial.slice(0, 45)}..."
              </button>
            </div>
          </div>
        )}

        {/* Teach-Back Evaluation Result Card */}
        {result && (
          <div className="p-6 rounded-3xl bg-slate-950 border-2 border-indigo-500/60 shadow-2xl space-y-5 animate-in fade-in duration-300">
            {/* Score & Rating Bar */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg ${
                    result.rating === 'good'
                      ? 'bg-emerald-600 shadow-emerald-900/50'
                      : result.rating === 'partial'
                      ? 'bg-amber-500 text-slate-950 shadow-amber-900/50'
                      : 'bg-rose-600 shadow-rose-900/50'
                  }`}
                >
                  {result.score}%
                </div>
                <div>
                  <div className="text-lg font-black text-white">
                    {result.rating === 'good'
                      ? '🟢 ' + strings.wellDone
                      : result.rating === 'partial'
                      ? '🟡 ' + (currentLanguage === 'mr' ? 'चांगले, पण काही राहिले' : currentLanguage === 'hi' ? 'अच्छा, पर कुछ छूटा' : 'Partially Understood')
                      : '🔴 ' + (currentLanguage === 'mr' ? 'पुन्हा समजून घ्या' : currentLanguage === 'hi' ? 'दोबारा समझें' : 'Needs Review')}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">
                    {strings.score}: {result.score} / 100
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  stopAllSpeech();
                  speakText(result.feedbackMessage, currentLanguage, speechRate);
                }}
                className="p-2.5 rounded-xl bg-slate-800 text-amber-400 hover:bg-slate-700 transition-colors cursor-pointer"
                title="Replay Voice Feedback"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Audio Feedback Message */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-white font-medium text-base">
              "{result.feedbackMessage}"
            </div>

            {/* Understood Points vs Missed Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Correct / Understood */}
              <div className="space-y-2 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{strings.understoodPointsLabel}</span>
                </span>
                <ul className="space-y-1">
                  {result.understoodPoints.length > 0 ? (
                    result.understoodPoints.map((pt, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-slate-400 italic">काहीही योग्य उल्लेख नाही</li>
                  )}
                </ul>
              </div>

              {/* Missed / To Focus On */}
              <div className="space-y-2 p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
                <span className="text-xs font-extrabold text-rose-400 flex items-center gap-1.5 uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{strings.missedPointsLabel}</span>
                </span>
                <ul className="space-y-1">
                  {result.missedPoints.length > 0 ? (
                    result.missedPoints.map((pt, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{pt}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-emerald-300 font-medium">सर्व मुख्य मुद्दे समाविष्ट! 🎉</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Next Steps: Review Slides or Give Feedback */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setResult(null);
                  setTranscript('');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{strings.retryQuiz}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose();
                    onReviewTopic(selectedTopicId);
                  }}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-bold text-xs border border-amber-400/40 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {currentLanguage === 'mr' ? 'माहिती पुन्हा पाहा' : currentLanguage === 'hi' ? 'स्लाइड दोबारा देखें' : 'Review Slides'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenFeedback();
                  }}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg shadow-emerald-950/40"
                >
                  <span>{currentLanguage === 'mr' ? 'अभिप्राय द्या' : currentLanguage === 'hi' ? 'फीडबैक दें' : 'Give Feedback'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
