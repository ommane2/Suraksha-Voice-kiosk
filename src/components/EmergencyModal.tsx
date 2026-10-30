import React, { useState } from 'react';
import {
  AlertTriangle,
  Flame,
  HeartPulse,
  Droplets,
  AlertOctagon,
  Volume2,
  X,
  PhoneCall,
  ShieldAlert,
  Zap,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../data/safetyContent';
import { speakText, stopAllSpeech } from '../utils/speech';

interface EmergencyModalProps {
  currentLanguage: Language;
  onClose: () => void;
  isMuted: boolean;
  speechRate: number;
}

type EmergencyType = 'fire' | 'injury' | 'chemical' | 'entrapment';

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  currentLanguage,
  onClose,
  isMuted,
  speechRate,
}) => {
  const strings = UI_STRINGS[currentLanguage];
  const [selectedType, setSelectedType] = useState<EmergencyType>('fire');

  const emergencyData: Record<EmergencyType, {
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
    audioScript: Record<Language, string>;
    steps: Record<Language, string[]>;
    hotline: string;
    icon: string;
  }> = {
    fire: {
      title: {
        mr: 'आग किंवा धूर दिसल्यास (Fire Emergency)',
        hi: 'आग या धुआं दिखने पर (Fire Emergency)',
        en: 'Fire or Smoke Detected (Fire Emergency)',
      },
      subtitle: {
        mr: 'अलार्म वाजवा, धावू नका, थेट बाहेरील असेंबली पॉईंटला जा',
        hi: 'अलार्म बजाएं, भागें नहीं, सीधे असेंबली ग्राउंड जाएं',
        en: 'Sound alarm, walk briskly, evacuate to outdoor Assembly Point',
      },
      audioScript: {
        mr: 'तातडीचे निर्देश: १. त्वरित जवळचा लाल फायर अलार्म ओढा. २. धावपळ न करता हिरव्या एक्झिट चिन्हांचे अनुसरण करा. ३. लिफ्ट वापरू नका, जिने वापरा. ४. बाहेरील असेंबली मैदानावर जमा व्हा.',
        hi: 'आपातकालीन निर्देश: १. तुरंत लाल फायर अलार्म बजाएं। २. भगदड़ न मचाएं, हरे EXIT तीरों का पालन करें। ३. लिफ्ट का उपयोग न करें। ४. बाहर असेंबली ग्राउंड पर एकत्र हों।',
        en: 'Emergency instructions: 1. Pull the nearest red fire alarm immediately. 2. Do not panic or run; follow illuminated green EXIT signs. 3. Never use elevators. 4. Gather at the outdoor Assembly Point.',
      },
      steps: {
        mr: [
          '१. सर्वात जवळचा लाल अलार्म बॉक्स ताबडतोब दाबा',
          '२. कामाचे सामान सोडून द्या, घाबरून धावू नका',
          '३. लिफ्ट अजिबात वापरू नका, केवळ पायऱ्या वापरा',
          '४. हिरव्या एक्झिट मार्गाने बाहेरील असेंबली मैदानावर जा',
        ],
        hi: [
          '१. सबसे पास वाला लाल अलार्म बॉक्स फौरन दबाएं',
          '२. सामान समेटने में समय न गंवाएं, भागें नहीं',
          '३. लिफ्ट का उपयोग कभी न करें, सीढ़ियों से उतरें',
          '४. हरे EXIT तीरों से बाहर असेंबली ग्राउंड पर जाएं',
        ],
        en: [
          '1. Trigger the nearest red fire alarm switch immediately',
          '2. Leave tools behind; walk briskly to avoid stampedes',
          '3. Never use elevators during a fire; use fire escape stairs',
          '4. Follow green illuminated EXIT routes directly to Assembly Point',
        ],
      },
      hotline: 'फायर ब्रिगेड: १०१ • अंतर्गत इमर्जन्सी: ५५५५',
      icon: 'Flame',
    },
    injury: {
      title: {
        mr: 'विजेचा धक्का किंवा गंभीर दुखापत (Electrical Shock)',
        hi: 'बिजली का करंट या गंभीर चोट (Electrical Shock)',
        en: 'Electrical Shock & Severe Injury',
      },
      subtitle: {
        mr: 'मुख्य वीज बंद करा, जखमी व्यक्तीला उघड्या हाताने धरू नका',
        hi: 'मेन पावर काटें, करंट लगे व्यक्ति को नंगे हाथों से न छुएं',
        en: 'Cut power breaker, isolate with dry wood, call plant dispensary',
      },
      audioScript: {
        mr: 'विजेचा धक्का लागल्यास: स्वतः हाताने धरू नका! आधी मुख्य पॉवर स्विच बंद करा किंवा लाकडी काठीने वायर दूर करा. त्वरित डिस्पेंशरी फोन ५५५५ वर कॉल करा.',
        hi: 'करंट लगने पर: नंगे हाथों से न छुएं! पहले मुख्य स्विच बंद करें। घायल को सूखी लकड़ी से अलग करें और मेडिकल रूम को फौरन फोन करें।',
        en: 'For electric shock: Do not touch the victim with bare hands! Disconnect the primary breaker or use non-conductive wood. Immediately phone the plant dispensary.',
      },
      steps: {
        mr: [
          '१. सर्वात आधी मुख्य वीज स्विच किंवा ब्रेकर बंद करा',
          '२. जखमी व्यक्तीला हाताने धरू नका, लाकूड किंवा प्लास्टिक वापरा',
          '३. रक्तस्त्राव असल्यास स्वच्छ कापडाने दाबा',
          '४. फॅक्टरी डिस्पेंशरी (५५५५) किंवा रुग्णवाहिका १०८ वर कॉल करा',
        ],
        hi: [
          '१. सबसे पहले मुख्य बिजली का स्विच तुरंत बंद करें',
          '२. करंट लगे व्यक्ति को नंगे हाथों से न छुएं, सूखी लकड़ी प्रयोग करें',
          '३. भारी खून बहने पर साफ कपड़े से दबाकर रखें',
          '४. प्लांट डिस्पेंसरी (5555) या एम्बुलेंस 108 को बुलाएं',
        ],
        en: [
          '1. Shut off the primary circuit breaker or disconnect power',
          '2. Never touch an electrified victim barehanded; use dry wood or PVC',
          '3. Apply direct firm pressure with sterile gauze on heavy bleeding',
          '4. Call factory dispensary on ext 5555 or dial ambulance 108',
        ],
      },
      hotline: 'रुग्णवाहिका: १०८ • फॅक्टरी डिस्पेंशरी: ५५५५',
      icon: 'HeartPulse',
    },
    chemical: {
      title: {
        mr: 'केमिकल किंवा अ‍ॅसिड त्वचेवर / डोळ्यात (Chemical Splash)',
        hi: 'केमिकल या एसिड त्वचा / आंख पर गिरना (Chemical Splash)',
        en: 'Chemical or Acid Contact on Skin / Eyes',
      },
      subtitle: {
        mr: '१५ मिनिटे सतत डोळे व त्वचा थंड पाण्याने धुवा',
        hi: '१५ मिनट लगातार आंख और त्वचा को ठंडे पानी से धोएं',
        en: 'Flush cold water continuously for 15 minutes, remove soaked clothes',
      },
      audioScript: {
        mr: 'केमिकल त्वचेवर किंवा डोळ्यात पडल्यास: ताबडतोब पिवळ्या आय-वॉश आणि शॉवर खाली जा. डोळे हाताने चोळू नका. दूषित कपडे काढून टाका आणि १५ मिनिटे सतत स्वच्छ पाण्याने धुवा.',
        hi: 'केमिकल गिरने पर: फौरन पीले आई-वॉश स्टेशन पर जाएं। आंखें बिल्कुल न मसलें। केमिकल वाले कपड़े उतार दें और लगातार १५ मिनट तक पानी से धोएं।',
        en: 'For chemical splash: Rush to the safety eyewash shower immediately. Do not rub eyes. Remove contaminated overalls and flush continuously for 15 full minutes.',
      },
      steps: {
        mr: [
          '१. एका सेकंदाचाही विलंब न करता पिवळ्या आय-वॉश स्टेशनवर पळा',
          '२. डोळ्यांना हात लावून चोळू नका (चोळल्याने इजा वाढते)',
          '३. डोळे उघडे ठेवून सतत १५ मिनिटे थंड पाण्याने धुवा',
          '४. केमिकल सांडलेले कपडे काढून टाका व डॉक्टरांना केमिकल सांगा',
        ],
        hi: [
          '१. बिना एक पल गंवाए पीले आई-वॉश स्टेशन पर पहुंचें',
          '२. आंखों को बिल्कुल न मलें (मसलने से एसिड फैलता है)',
          '३. पलकें खुली रखकर लगातार १५ मिनट ठंडे पानी से धोएं',
          '४. केमिकल भीगे कपड़े तुरंत उतारें और डॉक्टर को केमिकल बताएं',
        ],
        en: [
          '1. Rush to the nearest yellow eyewash shower without hesitation',
          '2. Never rub affected eyes or skin (rubbing deepens burns)',
          '3. Hold eyelids open and flush with cold water for 15 continuous minutes',
          '4. Strip off soaked clothing and notify first aid officer of chemical name',
        ],
      },
      hotline: 'सुरक्षा अधिकारी: ५५५२ • विष नियंत्रण: ०२२-२४१६००००',
      icon: 'Droplets',
    },
    entrapment: {
      title: {
        mr: 'मशीन अचानक थांबणे किंवा अवयव अडकणे (Machine Entrapment)',
        hi: 'मशीन अचानक रुकना या हाथ फंसना (Machine Entrapment)',
        en: 'Machine Sudden Stop / Entrapment',
      },
      subtitle: {
        mr: 'लाल ई-स्टॉप दाबा! अडकलेला भाग जोराने ओढू नका',
        hi: 'बड़ा लाल ई-स्टॉप दबाएं! जबरदस्ती न खींचें',
        en: 'Hit E-Stop immediately, never reverse rollers forcibly',
      },
      audioScript: {
        mr: 'मशीन अचानक थांबल्यास किंवा हात अडकल्यास: सर्वात आधी मोठा लाल ई-स्टॉप दाबा! अडकलेला अवयव जबरदस्तीने ओढू नका, त्यामुळे इजा वाढते. मुख्य मेंटेनन्स टीम आणि सुपरवायझरला तात्काळ बोलवा.',
        hi: 'मशीन में फंसने या रुकने पर: सबसे पहले लाल इमरजेंसी स्टॉप दबाएं। अंग को जबरदस्ती न खींचें, इससे नुकसान बढ़ सकता है। तुरंत मेंटेनेंस टीम को बुलाएं।',
        en: 'Machine sudden stop or entrapment: Strike the red mushroom E-Stop button instantly. Do not yank trapped limbs forcibly. Alert shift engineer and rescue team.',
      },
      steps: {
        mr: [
          '१. सर्वात आधी मशीनचा मोठा लाल ई-स्टॉप (E-Stop) दाबा',
          '२. अडकलेला हात किंवा कपडा जोराने ओढू नका',
          '३. चालू मशीन पुन्हा रीस्टार्ट करण्याचा प्रयत्न करू नका',
          '४. सहकाऱ्याला मेंटेनन्स टीमला (५५५१) ताबडतोब बोलवायला सांगा',
        ],
        hi: [
          '१. सबसे पहले मशीन का बड़ा लाल ई-स्टॉप बटन दबाएं',
          '२. फंसे हाथ या कपड़े को झटके से न खींचें',
          '३. मशीन को दोबारा चालू करने की कोशिश बिल्कुल न करें',
          '४. साथी से कहें कि तुरंत मेंटेनेंस टीम (5551) को बुलाए',
        ],
        en: [
          '1. Strike the large red mushroom Emergency Stop button immediately',
          '2. Do not pull entangled limbs or clothing with force',
          '3. Never attempt to restart or reverse machinery without technicians',
          '4. Direct a co-worker to summon plant maintenance on ext 5551',
        ],
      },
      hotline: 'मेंटेनन्स इमर्जन्सी: ५५५१ • कंट्रोल रूम: ५५५०',
      icon: 'AlertOctagon',
    },
  };

  const currentData = emergencyData[selectedType];

  const playAudio = () => {
    if (!isMuted) {
      stopAllSpeech();
      speakText(currentData.audioScript[currentLanguage], currentLanguage, speechRate);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/85 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border-4 border-red-600 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Banner */}
        <div className="flex items-center gap-3 text-red-500">
          <div className="p-3 bg-red-600/20 rounded-2xl border border-red-500/40">
            <AlertTriangle className="w-8 h-8 animate-bounce text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {strings.sosAlert}
            </h2>
            <p className="text-xs sm:text-sm text-red-400 font-bold">
              {strings.sosSubtitle}
            </p>
          </div>
        </div>

        {/* MANDATORY DISCLAIMER: Do NOT claim to contact emergency services automatically */}
        <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/50 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold uppercase block tracking-wider text-amber-300 mb-0.5">
              महत्त्वाची सूचना / Important Notice:
            </span>
            <p className="font-semibold text-white">
              {strings.sosDisclaimer}
            </p>
          </div>
        </div>

        {/* 4 Emergency Categories Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['fire', 'injury', 'chemical', 'entrapment'] as EmergencyType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                stopAllSpeech();
                if (!isMuted) {
                  speakText(emergencyData[type].audioScript[currentLanguage], currentLanguage, speechRate);
                }
              }}
              className={`p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center gap-1.5 border-2 transition-all cursor-pointer ${
                selectedType === type
                  ? 'bg-red-600 text-white border-red-400 shadow-xl shadow-red-600/40 scale-102 font-black'
                  : 'bg-slate-800/90 hover:bg-slate-800 text-slate-300 border-slate-700 font-bold'
              }`}
            >
              <span className="text-2xl sm:text-3xl">
                {type === 'fire' ? '🔥' : type === 'injury' ? '⚡' : type === 'chemical' ? '🧪' : '🛑'}
              </span>
              <span className="text-[11px] sm:text-xs text-center leading-tight">
                {type === 'fire' ? 'आग / Fire' : type === 'injury' ? 'विद्युत / Shock' : type === 'chemical' ? 'केमिकल / Chemical' : 'मशीन / Jam'}
              </span>
            </button>
          ))}
        </div>

        {/* Instruction details box */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 border-2 border-red-500/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {currentData.title[currentLanguage]}
              </h3>
              <p className="text-xs text-red-400 font-semibold">
                {currentData.subtitle[currentLanguage]}
              </p>
            </div>
            <button
              onClick={playAudio}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Volume2 className="w-4 h-4" />
              <span>{strings.replayAudio}</span>
            </button>
          </div>

          {/* Action Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {currentData.steps[currentLanguage].map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-red-950/30 border border-red-500/40 text-white text-xs sm:text-sm font-bold"
              >
                <span>{step}</span>
              </div>
            ))}
          </div>

          {/* Hotline info banner */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 font-extrabold">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-400 animate-pulse" />
              <span>{currentData.hotline}</span>
            </div>
            <span className="text-[10px] text-slate-400">प्लांट फोनवरून थेट डायल करा</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 cursor-pointer"
        >
          {strings.close}
        </button>
      </div>
    </div>
  );
};
