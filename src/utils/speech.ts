import { Language } from '../types';

// Web Audio API tone generator for tactile kiosk feedback
class AudioChime {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  playMicStart() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // AudioContext not allowed without user interaction
    }
  }

  playMicStop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(330, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Ignore
    }
  }

  playSuccess() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.001, now + i * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.2);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEffects = new AudioChime();

// Text-to-Speech (TTS)
export function stopAllSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakText(
  text: string,
  lang: Language = 'mr',
  rate: number = 0.95,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean text of markdown asterisks or special characters for cleaner TTS
    const cleanText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick appropriate language tag
    const langTag = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.lang = langTag;

    const voices = window.speechSynthesis.getVoices();
    // Try to find a voice that matches language exactly, or fallback to Indian / regional
    const matchingVoice = voices.find((v) => v.lang === langTag || v.lang.startsWith(langTag.split('-')[0])) ||
      voices.find((v) => v.lang.includes('IN') || v.lang.includes('hi')) ||
      voices[0];

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to trigger speech synthesis:', err);
    onEnd?.();
    return false;
  }
}

// Speech-to-Text (STT) interface
export interface SpeechRecognitionResultState {
  transcript: string;
  isFinal: boolean;
}

export interface KioskSpeechRecognizer {
  start: () => void;
  stop: () => void;
  abort: () => void;
  isAvailable: boolean;
}

export function createSpeechRecognizer(
  lang: Language,
  onResult: (result: SpeechRecognitionResultState) => void,
  onError: (error: string) => void,
  onStart?: () => void,
  onEnd?: () => void
): KioskSpeechRecognizer {
  if (typeof window === 'undefined') {
    return {
      start: () => {},
      stop: () => {},
      abort: () => {},
      isAvailable: false,
    };
  }

  const SpeechRecognitionClass =
    (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    return {
      start: () => onError('Speech recognition not supported in this browser. Please use quick-select chips.'),
      stop: () => {},
      abort: () => {},
      isAvailable: false,
    };
  }

  const recognition = new SpeechRecognitionClass();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  // Language mapping
  recognition.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

  recognition.onstart = () => {
    soundEffects.playMicStart();
    onStart?.();
  };

  recognition.onresult = (event: any) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript;
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    const transcript = (final || interim).trim();
    if (transcript) {
      onResult({
        transcript,
        isFinal: Boolean(final),
      });
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('SpeechRecognition error:', event.error);
    soundEffects.playMicStop();
    onError(event.error);
  };

  recognition.onend = () => {
    soundEffects.playMicStop();
    onEnd?.();
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch (e) {
        console.warn('Recognition start error:', e);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (e) {
        // Ignore
      }
    },
    abort: () => {
      try {
        recognition.abort();
      } catch (e) {
        // Ignore
      }
    },
    isAvailable: true,
  };
}
