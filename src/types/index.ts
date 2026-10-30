export type Language = 'mr' | 'hi' | 'en';

export interface SafetySlide {
  id: string;
  title: Record<Language, string>;
  caption: Record<Language, string>;
  audioScript: Record<Language, string>;
  bullets: Record<Language, string[]>;
  icon: string;
  diagramType: 'fire' | 'electrical' | 'machine' | 'helmet' | 'gloves' | 'protective' | 'ppe' | 'loto' | 'chemical' | 'hazard' | 'evac';
  doDontList?: {
    dos: Record<Language, string[]>;
    donts: Record<Language, string[]>;
  };
}

export interface SafetyTopic {
  id: string;
  title: Record<Language, string>;
  shortDescription: Record<Language, string>;
  icon: string;
  accentColor: string;
  teachbackPrompt: Record<Language, string>;
  expectedKeyPoints: Record<Language, string[]>;
  slides: SafetySlide[];
}

export interface QuizQuestion {
  id: number;
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correctAnswerIndex: number;
  explanation: Record<Language, string>;
  topic: string;
}

export interface QuizSubmission {
  score: number;
  total: number;
  percentage: number;
  language: Language;
  answers: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  timestamp: string;
}

export interface TeachbackResult {
  id: string;
  topicId: string;
  topicTitle: string;
  language: Language;
  score: number;
  rating: 'good' | 'partial' | 'needs_help';
  transcript: string;
  feedbackMessage: string;
  understoodPoints: string[];
  missedPoints: string[];
  timestamp: string;
}

export interface VoiceQuestionResult {
  id: string;
  language: Language;
  questionText: string;
  answerText: string;
  topicId?: string;
  keyPoints: string[];
  timestamp: string;
}

export interface FeedbackSubmission {
  topicId: string;
  language: Language;
  rating: 'clear' | 'confusing' | 'not_understood';
  comment?: string;
}

export interface DashboardStats {
  isDemoData: boolean;
  summary: {
    totalTeachbacks: number;
    totalQuestions: number;
    totalFeedbacks: number;
    avgScore: number;
    clearPercentage: number;
    topMisunderstoodTopic: string;
    totalQuizAttempts: number;
    avgQuizScore: number;
  };
  quizStats: {
    totalAttempts: number;
    avgScore: number;
    passRate: number;
    questionBreakdown: {
      questionId: number;
      questionLabel: Record<Language, string>;
      topic: string;
      accuracy: number;
      isDifficult: boolean;
    }[];
  };
  topicBreakdown: {
    topicId: string;
    title: string;
    total: number;
    avgScore: number;
    good: number;
    partial: number;
    needsHelp: number;
  }[];
  recentTeachbacks: TeachbackResult[];
  frequentQuestions: VoiceQuestionResult[];
  recentFeedbacks: {
    id: string;
    topicId: string;
    language: Language;
    rating: 'clear' | 'confusing' | 'not_understood';
    comment?: string;
    timestamp: string;
  }[];
  feedbackCounts: {
    clear: number;
    confusing: number;
    not_understood: number;
  };
  langDistribution: {
    mr: number;
    hi: number;
    en: number;
  };
}

export interface SafetyReport {
  reportTitle: string;
  generatedDate: string;
  executiveSummary: string;
  keyFindings: string[];
  recommendedActions: string[];
  complianceStatus: string;
  priorityRiskLevel: 'MEDIUM' | 'HIGH' | 'LOW';
}
