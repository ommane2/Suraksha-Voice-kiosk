import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Volume2,
  X,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Language, QuizSubmission } from '../types';
import { UI_STRINGS, QUIZ_QUESTIONS } from '../data/safetyContent';
import { speakText, stopAllSpeech, soundEffects } from '../utils/speech';

interface SafetyQuizProps {
  currentLanguage: Language;
  onClose: () => void;
  isMuted: boolean;
  speechRate: number;
}

export const SafetyQuiz: React.FC<SafetyQuizProps> = ({
  currentLanguage,
  onClose,
  isMuted,
  speechRate,
}) => {
  const strings = UI_STRINGS[currentLanguage];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  // Spoken read-out of question
  const readCurrentQuestion = () => {
    if (isMuted || quizSubmitted) return;
    stopAllSpeech();
    const textToRead = `${strings.quizQuestionNumber} ${currentQuestionIndex + 1}: ${currentQ.question[currentLanguage]}`;
    speakText(textToRead, currentLanguage, speechRate);
  };

  useEffect(() => {
    setHasAnsweredCurrent(selectedAnswers[currentQ.id] !== undefined);
    readCurrentQuestion();
    return () => {
      stopAllSpeech();
    };
  }, [currentQuestionIndex, currentLanguage]);

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return;

    const isCorrect = optionIndex === currentQ.correctAnswerIndex;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
    setHasAnsweredCurrent(true);

    if (isCorrect) {
      soundEffects.playSuccess();
    } else {
      soundEffects.playMicStop();
    }

    // Read explanation
    if (!isMuted) {
      stopAllSpeech();
      const feedbackText = isCorrect
        ? (currentLanguage === 'mr' ? 'अगदी बरोबर! ' : currentLanguage === 'hi' ? 'बिल्कुल सही! ' : 'Correct! ') + currentQ.explanation[currentLanguage]
        : (currentLanguage === 'mr' ? 'चूक उत्तर. ' : currentLanguage === 'hi' ? 'गलत उत्तर। ' : 'Incorrect. ') + currentQ.explanation[currentLanguage];
      speakText(feedbackText, currentLanguage, speechRate);
    }
  };

  const handleNext = () => {
    stopAllSpeech();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    stopAllSpeech();
    let calculatedScore = 0;
    const answerRecords = QUIZ_QUESTIONS.map((q) => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) calculatedScore += 1;
      return {
        questionId: q.id,
        selectedOption: selected !== undefined ? selected : -1,
        isCorrect,
      };
    });

    setScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore >= 4) {
      soundEffects.playSuccess();
    }

    // Voice announcement of score
    if (!isMuted) {
      const resultVoice = currentLanguage === 'mr'
        ? `अभिनंदन! तुम्ही ५ पैकी ${calculatedScore} गुण मिळवले आहेत.`
        : currentLanguage === 'hi'
        ? `बधाई! आपने ५ में से ${calculatedScore} अंक प्राप्त किए हैं।`
        : `Quiz completed! You scored ${calculatedScore} out of 5.`;
      speakText(resultVoice, currentLanguage, speechRate);
    }

    // Submit results to server
    try {
      const submission: QuizSubmission = {
        score: calculatedScore,
        total: QUIZ_QUESTIONS.length,
        percentage: Math.round((calculatedScore / QUIZ_QUESTIONS.length) * 100),
        language: currentLanguage,
        answers: answerRecords,
        timestamp: new Date().toISOString(),
      };

      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
    } catch (err) {
      console.warn('Failed to post quiz submission:', err);
    }
  };

  const handleResetQuiz = () => {
    stopAllSpeech();
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setHasAnsweredCurrent(false);
    setQuizSubmitted(false);
    setScore(0);
  };

  const selectedForCurrent = selectedAnswers[currentQ.id];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {!quizSubmitted ? (
          <>
            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 font-bold text-xs border border-amber-400/30">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{strings.safetyQuizTitle}</span>
                </div>
                <button
                  onClick={readCurrentQuestion}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition-colors cursor-pointer"
                  title="Listen to question"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{strings.replayAudio}</span>
                </button>
              </div>

              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 pt-1">
                <span>
                  {strings.quizQuestionNumber} {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-amber-400 font-mono">
                  {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Current Question */}
              <div className="pt-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                  विषय / Topic: {currentQ.topic}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {currentQ.question[currentLanguage]}
                </h3>
              </div>
            </div>

            {/* 4 Options */}
            <div className="space-y-3 pt-1">
              {currentQ.options[currentLanguage].map((optionText, idx) => {
                const isSelected = selectedForCurrent === idx;
                const isCorrect = idx === currentQ.correctAnswerIndex;
                const optionLetter = String.fromCharCode(65 + idx);

                let buttonStyle = 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-200';
                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    buttonStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/30';
                  } else if (isSelected) {
                    buttonStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                  } else {
                    buttonStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnsweredCurrent}
                    className={`w-full p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all cursor-pointer ${buttonStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5 ${
                        hasAnsweredCurrent && isCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : hasAnsweredCurrent && isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-amber-400 border border-slate-700'
                      }`}
                    >
                      {optionLetter}
                    </span>
                    <span className="text-sm sm:text-base font-semibold leading-relaxed flex-1">
                      {optionText}
                    </span>
                    {hasAnsweredCurrent && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    )}
                    {hasAnsweredCurrent && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card upon answering */}
            {hasAnsweredCurrent && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/40 space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center gap-2">
                  {selectedForCurrent === currentQ.correctAnswerIndex ? (
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{currentLanguage === 'mr' ? 'बरोबर उत्तर!' : currentLanguage === 'hi' ? 'सही उत्तर!' : 'Correct Answer!'}</span>
                    </span>
                  ) : (
                    <span className="text-xs font-black text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      <span>{currentLanguage === 'mr' ? 'चूक उत्तर' : currentLanguage === 'hi' ? 'गलत उत्तर' : 'Incorrect Choice'}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <strong className="text-amber-400">{strings.explanationLabel} </strong>
                  {currentQ.explanation[currentLanguage]}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                {hasAnsweredCurrent
                  ? currentQuestionIndex === QUIZ_QUESTIONS.length - 1
                    ? 'शेवटचा प्रश्न / Final Question'
                    : 'पुढील प्रश्नासाठी पुढे जा'
                  : 'पर्याय निवडून उत्तर द्या'}
              </span>

              {hasAnsweredCurrent && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>
                    {currentQuestionIndex === QUIZ_QUESTIONS.length - 1
                      ? strings.viewResults
                      : strings.nextQuestion}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          /* Final Results Screen */
          <div className="py-4 space-y-6 animate-in fade-in duration-300 text-center">
            <div className="w-24 h-24 rounded-3xl bg-amber-400/20 text-amber-300 border-2 border-amber-400/50 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
              <Award className="w-14 h-14" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {strings.quizScoreSummary}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {score >= 4 ? strings.passStatus : strings.needsAttention}
              </p>
            </div>

            {/* Score Big Display */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 max-w-sm mx-auto space-y-2">
              <div className="text-5xl sm:text-6xl font-black text-amber-400">
                {score} / {QUIZ_QUESTIONS.length}
              </div>
              <div className="text-sm font-bold text-slate-300">
                {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% गुण
              </div>
              <div className="pt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase ${
                    score >= 4
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {score >= 4 ? 'PASSED (उत्तीर्ण)' : 'REVIEW RECOMMENDED (सराव करा)'}
                </span>
              </div>
            </div>

            {/* Question by question summary */}
            <div className="text-left space-y-3 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                ५ प्रश्नांचे विश्लेषण (Review):
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {QUIZ_QUESTIONS.map((q) => {
                  const userChoice = selectedAnswers[q.id];
                  const isCorrect = userChoice === q.correctAnswerIndex;
                  return (
                    <div
                      key={q.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-white">
                          #{q.id} {q.topic}
                        </span>
                        <span
                          className={`flex items-center gap-1 ${
                            isCorrect ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          <span>{isCorrect ? 'बरोबर' : 'चूक'}</span>
                        </span>
                      </div>
                      <p className="text-slate-400 italic">
                        {q.explanation[currentLanguage]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons: Try again or close */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetQuiz}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{strings.tryAgain}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                <span>{strings.close}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
