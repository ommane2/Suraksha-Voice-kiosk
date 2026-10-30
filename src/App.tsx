/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Language, SafetyTopic } from './types';
import { SAFETY_TOPICS } from './data/safetyContent';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { WorkerHome } from './components/WorkerHome';
import { InstructionViewer } from './components/InstructionViewer';
import { VoiceQuestionModal } from './components/VoiceQuestionModal';
import { TeachBackModal } from './components/TeachBackModal';
import { SafetyQuiz } from './components/SafetyQuiz';
import { FeedbackModal } from './components/FeedbackModal';
import { EmergencyModal } from './components/EmergencyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { stopAllSpeech, speakText } from './utils/speech';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('mr');
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState<boolean>(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Modals state
  const [showVoiceQuestion, setShowVoiceQuestion] = useState<boolean>(false);
  const [initialVoiceQuery, setInitialVoiceQuery] = useState<string | undefined>(undefined);
  const [showTeachBack, setShowTeachBack] = useState<boolean>(false);
  const [teachBackTopicId, setTeachBackTopicId] = useState<string>('machine_safety');
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackTopicId, setFeedbackTopicId] = useState<string>('general');
  const [showSOS, setShowSOS] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Audio settings
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);

  // Idle timeout: returns kiosk to language selector after 120 seconds of inactivity
  const IDLE_TIMEOUT_SECONDS = 120;
  const [idleSeconds, setIdleSeconds] = useState<number>(IDLE_TIMEOUT_SECONDS);

  const resetIdleTimer = useCallback(() => {
    setIdleSeconds(IDLE_TIMEOUT_SECONDS);
  }, []);

  useEffect(() => {
    const handleUserActivity = () => {
      resetIdleTimer();
    };

    window.addEventListener('click', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    const interval = setInterval(() => {
      setIdleSeconds((prev) => {
        if (prev <= 1) {
          // Reset to welcoming language screen
          stopAllSpeech();
          setHasSelectedLanguage(false);
          setSelectedTopicId(null);
          setShowVoiceQuestion(false);
          setShowTeachBack(false);
          setShowQuiz(false);
          setShowFeedback(false);
          setShowSOS(false);
          setIsAdminView(false);
          return IDLE_TIMEOUT_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [resetIdleTimer]);

  const handleSelectLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    setHasSelectedLanguage(true);
    resetIdleTimer();
  };

  const handleLanguageChange = (lang: Language) => {
    stopAllSpeech();
    setCurrentLanguage(lang);
    resetIdleTimer();

    // Voice announcement of language switch
    if (!isMuted) {
      const messages: Record<Language, string> = {
        mr: 'मराठी भाषा निवडली आहे.',
        hi: 'हिन्दी भाषा चुनी गई है।',
        en: 'English language selected.',
      };
      speakText(messages[lang], lang, speechRate);
    }
  };

  const handleToggleMute = () => {
    if (!isMuted) {
      stopAllSpeech();
      setIsMuted(true);
    } else {
      setIsMuted(false);
      speakText(
        currentLanguage === 'mr' ? 'आवाज चालू केला आहे.' : currentLanguage === 'hi' ? 'आवाज चालू किया गया।' : 'Audio unmuted.',
        currentLanguage,
        speechRate
      );
    }
  };

  const handleToggleSpeechRate = () => {
    setSpeechRate((prev) => (prev < 0.95 ? 1.0 : 0.8));
  };

  const handleOpenTeachBack = (topicId?: string) => {
    stopAllSpeech();
    setTeachBackTopicId(topicId || selectedTopicId || 'machine_safety');
    setShowTeachBack(true);
  };

  const handleOpenVoiceQuestion = (query?: string) => {
    stopAllSpeech();
    setInitialVoiceQuery(query);
    setShowVoiceQuestion(true);
  };

  const handleOpenFeedback = (topicId?: string) => {
    stopAllSpeech();
    setFeedbackTopicId(topicId || selectedTopicId || 'general');
    setShowFeedback(true);
  };

  const handleOpenSOS = () => {
    stopAllSpeech();
    setShowSOS(true);
  };

  const handleResetSession = () => {
    stopAllSpeech();
    setHasSelectedLanguage(false);
    setSelectedTopicId(null);
    setShowVoiceQuestion(false);
    setShowTeachBack(false);
    setShowQuiz(false);
    setShowFeedback(false);
    setShowSOS(false);
    setIsAdminView(false);
    resetIdleTimer();
  };

  const activeTopic = SAFETY_TOPICS.find((t) => t.id === selectedTopicId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Kiosk Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        isSpeaking={isSpeaking}
        onToggleMute={handleToggleMute}
        isMuted={isMuted}
        speechRate={speechRate}
        onToggleSpeechRate={handleToggleSpeechRate}
        onOpenSOS={handleOpenSOS}
        isAdminView={isAdminView}
        onToggleAdmin={() => {
          stopAllSpeech();
          setIsAdminView(!isAdminView);
        }}
        onResetSession={handleResetSession}
        idleSecondsRemaining={idleSeconds}
      />

      {/* Main Body */}
      <main className="flex-1 w-full pb-16">
        {isAdminView ? (
          <AdminDashboard
            onBackToKiosk={() => setIsAdminView(false)}
            currentLanguage={currentLanguage}
          />
        ) : !hasSelectedLanguage ? (
          <LanguageSelector
            onSelectLanguage={handleSelectLanguage}
            isMuted={isMuted}
          />
        ) : activeTopic ? (
          <InstructionViewer
            topic={activeTopic}
            currentLanguage={currentLanguage}
            onBack={() => {
              stopAllSpeech();
              setSelectedTopicId(null);
            }}
            onStartTeachBack={(topicId) => handleOpenTeachBack(topicId)}
            isMuted={isMuted}
            speechRate={speechRate}
          />
        ) : (
          <WorkerHome
            currentLanguage={currentLanguage}
            onSelectTopic={(topicId) => {
              stopAllSpeech();
              setSelectedTopicId(topicId);
            }}
            onOpenVoiceQuestion={(query) => handleOpenVoiceQuestion(query)}
            onOpenQuiz={() => {
              stopAllSpeech();
              setShowQuiz(true);
            }}
            onOpenTeachBack={(topicId) => handleOpenTeachBack(topicId)}
            onOpenFeedback={() => handleOpenFeedback('general')}
          />
        )}
      </main>

      {/* Floating Global Voice Ask Quick Button (Fixed bottom right when on worker home or slides) */}
      {!isAdminView && hasSelectedLanguage && !showVoiceQuestion && !showTeachBack && !showQuiz && !showSOS && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => handleOpenVoiceQuestion()}
            className="flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base shadow-2xl shadow-amber-500/40 active:scale-95 transition-all cursor-pointer border-2 border-amber-300"
          >
            <span className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
            <span>
              {currentLanguage === 'mr' ? 'माईकवर विचारा' : currentLanguage === 'hi' ? 'माइक पर पूछें' : 'Voice Assistant'}
            </span>
          </button>
        </div>
      )}

      {/* Voice Question & Response Modal */}
      {showVoiceQuestion && (
        <VoiceQuestionModal
          currentLanguage={currentLanguage}
          initialQuery={initialVoiceQuery}
          onClose={() => {
            setShowVoiceQuestion(false);
            setInitialVoiceQuery(undefined);
          }}
          onOpenTeachBack={(topicId) => handleOpenTeachBack(topicId)}
          isMuted={isMuted}
          speechRate={speechRate}
        />
      )}

      {/* 5-Question Multiple Choice Safety Quiz Modal */}
      {showQuiz && (
        <SafetyQuiz
          currentLanguage={currentLanguage}
          onClose={() => setShowQuiz(false)}
          isMuted={isMuted}
          speechRate={speechRate}
        />
      )}

      {/* Teach-Back Understanding Quiz Modal */}
      {showTeachBack && (
        <TeachBackModal
          initialTopicId={teachBackTopicId}
          currentLanguage={currentLanguage}
          onClose={() => setShowTeachBack(false)}
          onReviewTopic={(topicId) => {
            setShowTeachBack(false);
            setSelectedTopicId(topicId);
          }}
          onOpenFeedback={() => handleOpenFeedback(teachBackTopicId)}
          isMuted={isMuted}
          speechRate={speechRate}
        />
      )}

      {/* Worker Feedback Modal */}
      {showFeedback && (
        <FeedbackModal
          currentLanguage={currentLanguage}
          topicId={feedbackTopicId}
          onClose={() => setShowFeedback(false)}
          onSuccessSubmitted={() => {
            setShowFeedback(false);
          }}
          isMuted={isMuted}
          speechRate={speechRate}
        />
      )}

      {/* Emergency SOS Modal with Step-by-Step Guidance */}
      {showSOS && (
        <EmergencyModal
          currentLanguage={currentLanguage}
          onClose={() => setShowSOS(false)}
          isMuted={isMuted}
          speechRate={speechRate}
        />
      )}

      {/* Minimal Industrial Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-3 text-center text-xs text-slate-500">
        सुरक्षा व्हॉइस किओस्क • Suraksha Factory Safety Voice Kiosk • शॉपफ्लोर युनिट ४ • 100% Anonymous Voice Verification
      </footer>
    </div>
  );
}
