import React from 'react';
import {
  ShieldCheck,
  Lock,
  Flame,
  Zap,
  HardHat,
  Hand,
  HelpCircle,
  Award,
  Mic,
  ArrowRight,
  Volume2,
  Sparkles,
  Bot
} from 'lucide-react';
import { Language, SafetyTopic } from '../types';
import { UI_STRINGS, SAFETY_TOPICS, CORE_CHATBOT_QUESTIONS } from '../data/safetyContent';

interface WorkerHomeProps {
  currentLanguage: Language;
  onSelectTopic: (topicId: string) => void;
  onOpenVoiceQuestion: (initialQuery?: string) => void;
  onOpenQuiz: () => void;
  onOpenTeachBack: (topicId?: string) => void;
  onOpenFeedback: () => void;
}

export const WorkerHome: React.FC<WorkerHomeProps> = ({
  currentLanguage,
  onSelectTopic,
  onOpenVoiceQuestion,
  onOpenQuiz,
  onOpenTeachBack,
  onOpenFeedback,
}) => {
  const strings = UI_STRINGS[currentLanguage];

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'fire_safety':
        return <Flame className="w-10 h-10 text-orange-400" />;
      case 'electrical_safety':
        return <Zap className="w-10 h-10 text-yellow-400" />;
      case 'machine_safety':
        return <Lock className="w-10 h-10 text-rose-400" />;
      case 'helmets':
        return <HardHat className="w-10 h-10 text-amber-400" />;
      case 'gloves':
        return <Hand className="w-10 h-10 text-blue-400" />;
      case 'protective_equipment':
        return <ShieldCheck className="w-10 h-10 text-emerald-400" />;
      default:
        return <ShieldCheck className="w-10 h-10 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Prominent Floating Voice Ask Bar (Hero element for voice-first experience) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 p-1 shadow-2xl shadow-amber-500/20">
        <div className="bg-slate-950/95 rounded-[22px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-400/30">
              <Mic className="w-3.5 h-3.5 animate-pulse text-red-500" />
              <span>{strings.askNow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {currentLanguage === 'mr'
                ? 'काहीही शंका आहे? माईकवर विचारा'
                : currentLanguage === 'hi'
                ? 'कोई भी सुरक्षा सवाल? माइक पर पूछें'
                : 'Have a Safety Question? Speak into the Mic'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              {currentLanguage === 'mr'
                ? 'मशीन अचानक थांबल्यास काय करावे? आग लागल्यास काय करावे? किंवा हातमोजे का घालावेत? तात्काळ उत्तर ऐका.'
                : currentLanguage === 'hi'
                ? 'मशीन अचानक रुक जाए तो क्या करें? आग लगने पर क्या करें? या दस्ताने क्यों पहनें? तुरंत उत्तर सुनें।'
                : 'What to do if machine stops? What to do during fire? Why wear gloves? Speak & get instant voice answer.'}
            </p>
          </div>

          <button
            onClick={() => onOpenVoiceQuestion()}
            className="flex-shrink-0 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-lg sm:text-xl shadow-xl shadow-amber-500/30 active:scale-95 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic className="w-6 h-6 animate-pulse" />
            </div>
            <span>{strings.askNow}</span>
          </button>
        </div>
      </div>

      {/* 4 CORE CHATBOT QUESTIONS BANNER (1-touch answers for factory workers) */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-black text-white">
              {strings.quickQuestionsTitle}
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 hidden sm:inline">
            १-टच आवाज उत्तर / 1-Tap Voice Answer
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CORE_CHATBOT_QUESTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenVoiceQuestion(item.query[currentLanguage])}
              className="p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-800 border-2 border-slate-800 hover:border-amber-400 text-left transition-all active:scale-95 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-1">
                <span className="text-amber-400 text-sm font-bold block">❓ प्रश्न</span>
                <p className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 leading-snug">
                  {item.query[currentLanguage]}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-amber-400">
                <span>उत्तर ऐका</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 6 Visual Safety Lesson Topics Grid (Requested in feature 7) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <span className="w-2.5 h-7 bg-amber-400 rounded-full inline-block"></span>
            <span>{strings.viewLessons}</span>
          </h3>
          <span className="text-xs sm:text-sm text-slate-400 font-medium">
            {currentLanguage === 'mr'
              ? '६ मुख्य सुरक्षा कार्ड्स'
              : currentLanguage === 'hi'
              ? '६ मुख्य सुरक्षा कार्ड्स'
              : '6 Core Safety Visual Lessons'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAFETY_TOPICS.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className="group relative flex flex-col justify-between p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 hover:border-amber-400 shadow-xl hover:shadow-amber-500/10 active:scale-98 transition-all cursor-pointer overflow-hidden min-h-[220px]"
            >
              {/* Background accent glow */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${topic.accentColor}`}
              />

              <div className="space-y-3 z-10">
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700/80 group-hover:scale-110 transition-transform">
                    {getTopicIcon(topic.id)}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>
                      {topic.slides.length}{' '}
                      {currentLanguage === 'mr' ? 'टप्पे' : currentLanguage === 'hi' ? 'कदम' : 'Steps'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {topic.title[currentLanguage]}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 mt-1">
                    {topic.shortDescription[currentLanguage]}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300 z-10">
                <span>
                  {currentLanguage === 'mr' ? 'माहिती पाहा व ऐका' : currentLanguage === 'hi' ? 'देखें और सुनें' : 'View & Listen'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Quiz & Teach-Back Action Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {/* NEW: Safety Quiz (5 MCQs) Card */}
        <div
          onClick={onOpenQuiz}
          className="group p-6 rounded-3xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-amber-900/60 border-2 border-amber-500/60 hover:border-amber-400 shadow-xl active:scale-98 transition-all cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs uppercase border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>५ प्रश्न / 5 Questions</span>
            </div>
            <h4 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
              {strings.safetyQuizTitle}
            </h4>
            <p className="text-xs text-slate-300">
              {currentLanguage === 'mr'
                ? '५ बहुपर्यायी प्रश्न सोडवा. योग्य उत्तरे व स्पष्टीकरण पाहा.'
                : currentLanguage === 'hi'
                ? '५ बहुविकल्पीय प्रश्न हल करें। सही उत्तर और व्याख्या देखें।'
                : 'Interactive 5 MCQs with instant scoring, explanations, and review.'}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-amber-500/30 text-amber-300 text-xs font-black">
            <span>क्विज सुरू करा / Start Quiz</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Teach-Back Quiz Tile */}
        <div
          onClick={() => onOpenTeachBack()}
          className="group p-6 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-indigo-900/60 border-2 border-indigo-700/50 hover:border-indigo-400 shadow-xl active:scale-98 transition-all cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase border border-indigo-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>{strings.shortQuiz}</span>
            </div>
            <h4 className="text-xl font-black text-white group-hover:text-indigo-300 transition-colors">
              {currentLanguage === 'mr'
                ? 'समज चाचणी (Teach-Back)'
                : currentLanguage === 'hi'
                ? 'समझ की जांच (Teach-Back)'
                : 'Teach-Back Understanding'}
            </h4>
            <p className="text-xs text-slate-300">
              {currentLanguage === 'mr'
                ? 'नियम स्वतःच्या शब्दांत बोला. एआय तुमची समज तपासून गुण देईल.'
                : currentLanguage === 'hi'
                ? 'नियम अपने शब्दों में बोलें। एआई आपकी समझ जांचकर स्कोर देगा।'
                : 'Explain safety rules in your own words. AI scores comprehension.'}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-indigo-500/30 text-indigo-300 text-xs font-black">
            <span>स्वतःच्या शब्दांत सांगा</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Worker Feedback Tile */}
        <div
          onClick={onOpenFeedback}
          className="group p-6 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-900/60 border-2 border-emerald-700/50 hover:border-emerald-400 shadow-xl active:scale-98 transition-all cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase border border-emerald-400/30">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{strings.feedbackTitle}</span>
            </div>
            <h4 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
              {currentLanguage === 'mr'
                ? 'अभिप्राय नोंदवा'
                : currentLanguage === 'hi'
                ? 'प्रतिक्रिया दें'
                : 'Worker Feedback'}
            </h4>
            <p className="text-xs text-slate-300">
              {currentLanguage === 'mr'
                ? '३ मोठ्या बटनांवर टच करून सांगा माहिती समजली का.'
                : currentLanguage === 'hi'
                ? '३ बड़े बटनों पर टच कर बताएं कि जानकारी समझ आई या नहीं।'
                : '3 simple emoji buttons, 100% anonymous logging.'}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-emerald-500/30 text-emerald-300 text-xs font-black">
            <span>अभिप्राय द्या</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
