import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Award,
  HelpCircle,
  MessageSquare,
  FileText,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Users,
  Smile,
  Meh,
  Frown,
  Sparkles,
  ChevronRight,
  Filter,
  CheckSquare,
  BarChart3,
  Info
} from 'lucide-react';
import { DashboardStats, SafetyReport, Language } from '../types';
import { UI_STRINGS } from '../data/safetyContent';
import { ReportModal } from './ReportModal';

interface AdminDashboardProps {
  onBackToKiosk: () => void;
  currentLanguage: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToKiosk, currentLanguage }) => {
  const strings = UI_STRINGS[currentLanguage];
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTopicDetail, setSelectedTopicDetail] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<SafetyReport | null>(null);
  const [langFilter, setLangFilter] = useState<'all' | 'mr' | 'hi' | 'en'>('all');

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleGenerateReport = async () => {
    try {
      setGeneratingReport(true);
      const res = await fetch('/api/dashboard/generate-report', { method: 'POST' });
      if (res.ok) {
        const report = await res.json();
        setGeneratedReport(report);
      }
    } catch (err) {
      console.error('Error generating report:', err);
    } finally {
      setGeneratingReport(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-10 h-10 text-amber-400 animate-spin" />
        <p className="text-slate-400 font-bold text-sm">सुरक्षा डॅशबोर्ड डेटा लोड होत आहे...</p>
      </div>
    );
  }

  const filteredTeachbacks = stats?.recentTeachbacks.filter(
    (t) => langFilter === 'all' || t.language === langFilter
  ) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-7">
      {/* DEMO DATA NOTICE BANNER (Strict Requirement: clearly identify as demo data) */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-2 border-amber-400/60 flex items-center justify-between gap-3 text-amber-200">
        <div className="flex items-center gap-2.5">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold tracking-wide">
            {strings.demoDataBadge}
          </span>
        </div>
        <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-slate-950">
          DEMO DATA
        </span>
      </div>

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToKiosk}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{strings.workerMode}</span>
            </button>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              SAFETY OFFICER & AUDIT DASHBOARD [DEMO]
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {currentLanguage === 'mr'
              ? 'कामगार सुरक्षा समज व विश्लेषण डॅशबोर्ड'
              : currentLanguage === 'hi'
              ? 'कामगार सुरक्षा समझ और विश्लेषण डैशबोर्ड'
              : 'Worker Safety Comprehension & Intelligence Dashboard'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time shop-floor comprehension analytics, difficult safety topics, quiz scores, and frequent questions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleGenerateReport}
            disabled={generatingReport}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer"
          >
            {generatingReport ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300" />
            )}
            <span>
              {generatingReport
                ? (currentLanguage === 'mr' ? 'अहवाल तयार होत आहे...' : 'Generating Report...')
                : (currentLanguage === 'mr' ? 'साप्ताहिक अहवाल तयार करा (AI Report)' : 'Generate AI Weekly Report')}
            </span>
          </button>
        </div>
      </div>

      {/* 4 Summary Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Comprehension Score */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>सरासरी समज निर्देशांक (Index)</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white">
              {stats?.summary.avgScore}%
            </span>
            <span className="text-xs text-emerald-400 font-bold">
              {stats && stats.summary.avgScore >= 70 ? '✓ सुरक्षित स्तर' : '⚠️ सुधारणा आवश्यक'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {stats?.summary.totalTeachbacks} कामगारांच्या व्हॉइस चाचण्यांवर आधारित
          </p>
        </div>

        {/* Quiz Pass Rate & Average */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>प्रश्नमंजुषा निकाल (Quiz Stats)</span>
            <CheckSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-400">
              {stats?.quizStats.avgScore}%
            </span>
            <span className="text-xs text-slate-400">सरासरी गुण</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-bold">
            {stats?.quizStats.passRate}% कामगार उत्तीर्ण • {stats?.summary.totalQuizAttempts} चाचण्या
          </p>
        </div>

        {/* Most Difficult / Misunderstood Topic */}
        <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-rose-400 text-xs font-black uppercase tracking-wider">
            <span>कठीण विषय (Difficult Topic)</span>
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div className="text-lg sm:text-xl font-black text-white truncate">
            {stats?.summary.topMisunderstoodTopic}
          </div>
          <p className="text-[11px] text-rose-300 font-medium">
            मशीन अचानक थांबल्यावर आत हात न घालण्यावर भर द्या
          </p>
        </div>

        {/* Worker Clarity Feedback */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>माहिती स्पष्टता समाधान</span>
            <Smile className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">
              {stats?.summary.clearPercentage}%
            </span>
            <span className="text-xs text-slate-400">"एकदम स्पष्ट" दर</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {stats?.summary.totalFeedbacks} निनावी कामगार अभिप्राय नोंदी
          </p>
        </div>
      </div>

      {/* QUIZ ACCURACY & DIFFICULT TOPICS BREAKDOWN */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-amber-400 rounded-full inline-block"></span>
              <h3 className="text-xl font-extrabold text-white">
                सुरक्षा प्रश्नमंजुषा अचूकता व कठीण विषय (Quiz Question Analysis)
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                प्रात्यक्षिक डेटा / DEMO DATA
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Shows which exact safety questions workers struggle with on the factory shop floor
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          {stats?.quizStats.questionBreakdown.map((q) => (
            <div
              key={q.questionId}
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                q.isDifficult
                  ? 'bg-rose-950/20 border-rose-500/40 shadow-md shadow-rose-950/20'
                  : 'bg-slate-950/70 border-slate-800'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">
                    प्रश्न #{q.questionId} • {q.topic}
                  </span>
                  {q.isDifficult ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500 text-white animate-pulse">
                      कठीण विषय / DIFFICULT
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300">
                      GOOD COMPREHENSION
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-extrabold text-white">
                  {q.questionLabel[currentLanguage]}
                </h4>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono font-bold mb-1">
                  <span className="text-slate-400">अचूकता दर (Accuracy):</span>
                  <span className={q.isDifficult ? 'text-rose-400 font-black' : 'text-emerald-400 font-black'}>
                    {q.accuracy}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      q.isDifficult ? 'bg-rose-500' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${q.accuracy}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Topic Comprehension Ranking + Language Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Topic Comprehension Breakdown (Lowest first) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span className="w-2.5 h-6 bg-amber-400 rounded-full inline-block"></span>
                <span>कामगारांना कठीण जाणारे विषय (कमी गुण असलेले विषय प्रथम)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Top Misunderstood Topics Ranked by Teach-Back Score
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-bold bg-slate-800 px-2.5 py-1 rounded-lg">
              प्रात्यक्षिक डेटा / DEMO DATA
            </span>
          </div>

          <div className="space-y-3.5">
            {stats?.topicBreakdown.map((t) => (
              <div
                key={t.topicId}
                onClick={() => setSelectedTopicDetail(t.topicId === selectedTopicDetail ? null : t.topicId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedTopicDetail === t.topicId
                    ? 'bg-slate-800 border-amber-400/80'
                    : 'bg-slate-950/70 hover:bg-slate-800/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        t.avgScore < 60
                          ? 'bg-rose-500 animate-ping'
                          : t.avgScore < 75
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <h4 className="font-extrabold text-white text-base">
                      {t.title}
                    </h4>
                    {t.avgScore < 60 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        CRITICAL GAP
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">
                      {t.total} चाचण्या
                    </span>
                    <span
                      className={`text-lg font-black ${
                        t.avgScore < 60 ? 'text-rose-400' : t.avgScore < 75 ? 'text-amber-300' : 'text-emerald-400'
                      }`}
                    >
                      {t.avgScore}%
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 transition-all duration-500"
                    style={{ width: `${t.total > 0 ? (t.good / t.total) * 100 : 60}%` }}
                    title={`Good: ${t.good}`}
                  />
                  <div
                    className="bg-amber-400 transition-all duration-500"
                    style={{ width: `${t.total > 0 ? (t.partial / t.total) * 100 : 30}%` }}
                    title={`Partial: ${t.partial}`}
                  />
                  <div
                    className="bg-rose-500 transition-all duration-500"
                    style={{ width: `${t.total > 0 ? (t.needsHelp / t.total) * 100 : 10}%` }}
                    title={`Needs Help: ${t.needsHelp}`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-medium">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>चांगले ({t.good})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span>मध्यम ({t.partial})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>मदत हवी ({t.needsHelp})</span>
                    </span>
                  </div>
                  <span className="text-amber-400 text-xs font-bold flex items-center gap-1">
                    {selectedTopicDetail === t.topicId ? 'तपशील लपवा' : 'तपशील पाहा ➔'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Language Preference & Feedback Sentiment */}
        <div className="space-y-6">
          {/* Language Breakdown Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>कामगारांची भाषा पसंती (Dialects)</span>
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold text-white mb-1">
                  <span>मराठी (Marathi)</span>
                  <span className="text-amber-400">{stats?.langDistribution.mr || 18} संवादात्मक नोंदी</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '64%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-white mb-1">
                  <span>हिन्दी (Hindi)</span>
                  <span className="text-indigo-400">{stats?.langDistribution.hi || 8} नोंदी</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-400 h-full rounded-full" style={{ width: '26%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-white mb-1">
                  <span>English</span>
                  <span className="text-slate-400">{stats?.langDistribution.en || 4} नोंदी</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-300 font-semibold">
              💡 स्थानिक मराठी आवाजाचा वापर केल्याने ग्रामीण व स्थलांतरित कामगारांचा प्रतिसाद ६४% वाढला आहे.
            </div>
          </div>

          {/* Feedback Sentiment Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Smile className="w-5 h-5 text-emerald-400" />
              <span>कामगार समाधान अभिप्राय</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-2xl">
                <Smile className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <span className="text-lg font-black text-white">{stats?.feedbackCounts.clear}</span>
                <span className="text-[10px] text-slate-400 block font-bold">एकदम स्पष्ट</span>
              </div>
              <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-2xl">
                <Meh className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <span className="text-lg font-black text-white">{stats?.feedbackCounts.confusing}</span>
                <span className="text-[10px] text-slate-400 block font-bold">थोडे अवघड</span>
              </div>
              <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-2xl">
                <Frown className="w-6 h-6 text-rose-400 mx-auto mb-1" />
                <span className="text-lg font-black text-white">{stats?.feedbackCounts.not_understood}</span>
                <span className="text-[10px] text-slate-400 block font-bold">समजले नाही</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Safety Questions & Teach-Back Excerpts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Asked Voice Queries (Voice Q&A Logs) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <span>वारंवार विचारले जाणारे प्रश्न (Frequently Asked Questions)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {stats?.frequentQuestions.length} नोंदी
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {stats?.frequentQuestions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 uppercase text-[10px] px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                    {q.language === 'mr' ? 'मराठी' : q.language === 'hi' ? 'हिन्दी' : 'English'}
                  </span>
                  <span className="text-slate-500 text-[10px]">
                    {new Date(q.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm font-extrabold text-white">
                  "{q.questionText}"
                </p>
                <p className="text-slate-300 italic border-l-2 border-indigo-500 pl-2.5">
                  किओस्क उत्तर: {q.answerText.slice(0, 110)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Anonymized Teach-Back Understanding Logs */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>समज चाचणी प्रतिसाद (Teach-Back Logs)</span>
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
              <button
                onClick={() => setLangFilter('all')}
                className={`px-2 py-0.5 rounded ${langFilter === 'all' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400'}`}
              >
                सर्व
              </button>
              <button
                onClick={() => setLangFilter('mr')}
                className={`px-2 py-0.5 rounded ${langFilter === 'mr' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLangFilter('hi')}
                className={`px-2 py-0.5 rounded ${langFilter === 'hi' ? 'bg-amber-400 text-slate-950 font-black' : 'text-slate-400'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredTeachbacks.map((tb) => (
              <div
                key={tb.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        tb.rating === 'good'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : tb.rating === 'partial'
                          ? 'bg-amber-400/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {tb.rating} • {tb.score}%
                    </span>
                    <span className="font-bold text-slate-300">{tb.topicTitle}</span>
                  </div>
                  <span className="text-slate-500 text-[10px]">
                    {new Date(tb.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 text-[11px] block">कामगाराचे शब्द:</span>
                  <p className="text-sm font-semibold text-white bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                    "{tb.transcript}"
                  </p>
                </div>

                {tb.missedPoints && tb.missedPoints.length > 0 && (
                  <div className="text-[11px] text-rose-400 font-medium">
                    ⚠️ कामगाराला न समजलेला भाग: {tb.missedPoints.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Report Modal popup */}
      {generatedReport && (
        <ReportModal
          report={generatedReport}
          onClose={() => setGeneratedReport(null)}
        />
      )}
    </div>
  );
};
