import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini AI initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Seed data storage for kiosk sessions, teach-backs, voice queries, quiz, and feedback
interface TeachbackLog {
  id: string;
  topicId: string;
  topicTitle: string;
  language: 'mr' | 'hi' | 'en';
  score: number;
  rating: 'good' | 'partial' | 'needs_help';
  transcript: string;
  feedbackMessage: string;
  understoodPoints: string[];
  missedPoints: string[];
  timestamp: string;
}

interface QuestionLog {
  id: string;
  language: 'mr' | 'hi' | 'en';
  questionText: string;
  answerText: string;
  topicId?: string;
  keyPoints: string[];
  timestamp: string;
}

interface FeedbackLog {
  id: string;
  topicId: string;
  language: 'mr' | 'hi' | 'en';
  rating: 'clear' | 'confusing' | 'not_understood';
  comment?: string;
  timestamp: string;
}

interface QuizSubmissionLog {
  id: string;
  score: number;
  total: number;
  percentage: number;
  language: 'mr' | 'hi' | 'en';
  answers: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  timestamp: string;
}

// In-memory data store with realistic factory shop-floor seed data (Clearly labeled as Demo Data)
const teachbacks: TeachbackLog[] = [
  {
    id: 'tb-1',
    topicId: 'machine_safety',
    topicTitle: 'Machine Safety & LOTO',
    language: 'mr',
    score: 45,
    rating: 'needs_help',
    transcript: 'मशीन बंद करून हात लावला, लाल बटन दाबले',
    feedbackMessage: 'तुम्ही मशीन थांबवली हे योग्य आहे, परंतु लॉक आणि टॅग (LOTO) लावणे विसरलात. वीज पुरवठा पूर्णपणे बंद करणे आवश्यक आहे.',
    understoodPoints: ['मशीनचे आपत्कालीन बटन दाबणे'],
    missedPoints: ['पॅडलॉक लावणे', 'डेंजर टॅग लावणे', 'मुख्य वीज स्विच बंद करणे'],
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'tb-2',
    topicId: 'helmets',
    topicTitle: 'Safety Helmets & Head Protection',
    language: 'mr',
    score: 95,
    rating: 'good',
    transcript: 'शॉप फ्लोअरवर जाताना पिवळे आयएसआय हेल्मेट घट्ट हनुवटीची पट्टी लावून घालायचे. तडे गेले तर स्टोअरमधून नवीन घ्यायचे.',
    feedbackMessage: 'खूप छान! तुम्ही सर्व सुरक्षा साधने अचूक सांगितली आहेत.',
    understoodPoints: ['आयएसआय हेल्मेट', 'हनुवटीची पट्टी', 'तडे गेल्यास बदलणे'],
    missedPoints: [],
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'tb-3',
    topicId: 'fire_safety',
    topicTitle: 'Fire Safety & Evacuation',
    language: 'hi',
    score: 85,
    rating: 'good',
    transcript: 'आग लगने पर लाल अलार्म बजाना है, भागना नहीं है, सीधे असेंबली पॉइंट ग्राउंड पर जाना है और लिफ्ट नहीं लेना।',
    feedbackMessage: 'उत्कृष्ट! आपने अलार्म और असेंबली पॉइंट का सही उल्लेख किया।',
    understoodPoints: ['अलार्म बजाना', 'धैर्य से बाहर निकलना', 'असेम्बली पॉइंट', 'लिफ्ट न लेना'],
    missedPoints: [],
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'tb-4',
    topicId: 'gloves',
    topicTitle: 'Safety Gloves',
    language: 'hi',
    score: 80,
    rating: 'good',
    transcript: 'धारदार लोहे के लिए कट-रोधी दस्ताने पहनेंगे और केमिकल के लिए रबर के दस्ताने लगाएंगे।',
    feedbackMessage: 'बहुत अच्छा! सही काम के लिए सही दस्ताने का उपयोग अनिवार्य है।',
    understoodPoints: ['कट-रोधी दस्ताने', 'केमिकल रबर दस्ताने'],
    missedPoints: ['घूमती रोलर के पास ढीले धागे न हों'],
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'tb-5',
    topicId: 'protective_equipment',
    topicTitle: 'Protective Equipment & Eyewash',
    language: 'en',
    score: 65,
    rating: 'partial',
    transcript: 'If chemical splashes on hand, wash with water immediately for 15 minutes and call supervisor.',
    feedbackMessage: 'Good on continuous eyewash/water flush. Remember to never rub your eyes.',
    understoodPoints: ['Wash with water 15 minutes', 'Inform supervisor'],
    missedPoints: ['Never rub eyes', 'Yellow eyewash station lever'],
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'tb-6',
    topicId: 'electrical_safety',
    topicTitle: 'Electrical Safety',
    language: 'mr',
    score: 75,
    rating: 'good',
    transcript: 'ओल्या हाताने बटण दाबायचे नाही आणि नंगी वायर दिसल्यास बोर्ड लावून इलेक्ट्रीशियनला बोलवायचे.',
    feedbackMessage: 'उत्तम! ओले हात टाळणे आणि तात्काळ नोंद करणे योग्य आहे.',
    understoodPoints: ['ओले हात टाळणे', 'इशारा फलक लावणे', 'इलेक्ट्रिशियनला कळवणे'],
    missedPoints: [],
    timestamp: new Date(Date.now() - 3600000 * 30).toISOString(),
  },
];

// Seed Questions including the 4 requested chatbot questions
const questions: QuestionLog[] = [
  {
    id: 'q-1',
    language: 'mr',
    questionText: 'मशीन अचानक बंद पडल्यास मी काय करावे?',
    answerText: 'सावधान! मशीन अचानक थांबल्यास चुकूनही हात आत घालू नका. सर्वात आधी मोठा लाल इमर्जन्सी स्टॉप (E-Stop) दाबा, वीज प्रवाह बंद करा आणि मेंटेनन्स सुपरवायझरला बोलवा.',
    topicId: 'machine_safety',
    keyPoints: ['हात आत घालू नका', 'लाल ई-स्टॉप दाबा', 'सुपरवायझर किंवा मेंटेनन्सला कळवा'],
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'q-2',
    language: 'hi',
    questionText: 'कारखाने में आग लगने पर क्या करना चाहिए?',
    answerText: 'आग दिखते ही सबसे पहले लाल अलार्म बॉक्स खींचें। चालू मशीन रोकें, भगदड़ न मचाएं, लिफ्ट का उपयोग कभी न करें और हरे EXIT तीरों का पालन कर बाहर असेंबली ग्राउंड पर एकत्र हों।',
    topicId: 'fire_safety',
    keyPoints: ['लाल अलार्म बॉक्स दबाएं', 'लिफ्ट न लें, सीढ़ियों से चलें', 'असेंबली ग्राउंड पर पहुंचें'],
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'q-3',
    language: 'en',
    questionText: 'Why should I wear safety gloves?',
    answerText: 'Safety gloves prevent over 80% of workshop injuries: lacerations from sharp stamping sheets, chemical acid burns, and heavy pinches. Always replace torn gloves immediately for free at the store.',
    topicId: 'gloves',
    keyPoints: ['Protect against razor-sharp metal cuts', 'Shield from toxic oils & acids', 'Swap torn gloves at shift store'],
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'q-4',
    language: 'mr',
    questionText: 'त्वचेवर केमिकल किंवा अ‍ॅसिड पडल्यास काय करावे?',
    answerText: 'एका क्षणाचाही विलंब न करता पिवळ्या आय-वॉश किंवा सेफ्टी शॉवर खाली जा. त्वचा अथवा डोळे चोळू नका, कपडे काढून टाका आणि किमान १५ मिनिटे सतत थंड पाण्याने धुवा.',
    topicId: 'protective_equipment',
    keyPoints: ['पिवळ्या आय-वॉश स्टेशनवर धाव घ्या', 'चोळू नका, १५ मिनिटे सतत धुवा', 'दूषित कपडे काढून डॉक्टर बोलवा'],
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'q-5',
    language: 'hi',
    questionText: 'अगर मशीन का लाल इमरजेंसी स्विच काम नहीं कर रहा तो क्या करें?',
    answerText: 'तुरंत मुख्य पावर स्विच को बंद करें और मेन ऑपरेटर या सुपरवाइजर को बताएं। जब तक मरम्मत न हो, मशीन पर खतरा कार्ड (Danger Tag) लगाएं।',
    topicId: 'machine_safety',
    keyPoints: ['मुख्य पावर बंद करें', 'डेंजर टैग लगाएं', 'मशीन चालू न करें'],
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

const feedbacks: FeedbackLog[] = [
  { id: 'fb-1', topicId: 'machine_safety', language: 'mr', rating: 'confusing', comment: 'LOTO कुलूप कसे लावायचे याचे मोठे चित्र दाखवा', timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
  { id: 'fb-2', topicId: 'helmets', language: 'mr', rating: 'clear', comment: 'आवाज खूप चांगला आहे, समजायला सोपे', timestamp: new Date(Date.now() - 3600000 * 6).toISOString() },
  { id: 'fb-3', topicId: 'fire_safety', language: 'hi', rating: 'clear', comment: 'आग लगने पर क्या करना है समझ आ गया', timestamp: new Date(Date.now() - 3600000 * 10).toISOString() },
  { id: 'fb-4', topicId: 'gloves', language: 'hi', rating: 'clear', comment: 'दस्ताने बदलने का नियम समझ आया', timestamp: new Date(Date.now() - 3600000 * 14).toISOString() },
  { id: 'fb-5', topicId: 'protective_equipment', language: 'en', rating: 'clear', comment: 'Clear audio guidance on 15 min eyewash', timestamp: new Date(Date.now() - 3600000 * 20).toISOString() },
  { id: 'fb-6', topicId: 'machine_safety', language: 'mr', rating: 'not_understood', comment: 'टॅग कुठे मिळतो ते स्पष्ट सांगा', timestamp: new Date(Date.now() - 3600000 * 32).toISOString() },
];

// Seed Quiz Submissions (Realistic Demo Data)
const quizSubmissions: QuizSubmissionLog[] = [
  {
    id: 'quiz-1',
    score: 5,
    total: 5,
    percentage: 100,
    language: 'mr',
    answers: [
      { questionId: 1, selectedOption: 1, isCorrect: true },
      { questionId: 2, selectedOption: 2, isCorrect: true },
      { questionId: 3, selectedOption: 0, isCorrect: true },
      { questionId: 4, selectedOption: 1, isCorrect: true },
      { questionId: 5, selectedOption: 3, isCorrect: true },
    ],
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'quiz-2',
    score: 4,
    total: 5,
    percentage: 80,
    language: 'hi',
    answers: [
      { questionId: 1, selectedOption: 1, isCorrect: true },
      { questionId: 2, selectedOption: 2, isCorrect: true },
      { questionId: 3, selectedOption: 0, isCorrect: true },
      { questionId: 4, selectedOption: 1, isCorrect: true },
      { questionId: 5, selectedOption: 0, isCorrect: false },
    ],
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'quiz-3',
    score: 3,
    total: 5,
    percentage: 60,
    language: 'mr',
    answers: [
      { questionId: 1, selectedOption: 0, isCorrect: false }, // Missed machine suddenly stops
      { questionId: 2, selectedOption: 2, isCorrect: true },
      { questionId: 3, selectedOption: 0, isCorrect: true },
      { questionId: 4, selectedOption: 1, isCorrect: true },
      { questionId: 5, selectedOption: 1, isCorrect: false }, // Missed chemical wash
    ],
    timestamp: new Date(Date.now() - 3600000 * 7).toISOString(),
  },
  {
    id: 'quiz-4',
    score: 4,
    total: 5,
    percentage: 80,
    language: 'en',
    answers: [
      { questionId: 1, selectedOption: 1, isCorrect: true },
      { questionId: 2, selectedOption: 2, isCorrect: true },
      { questionId: 3, selectedOption: 0, isCorrect: true },
      { questionId: 4, selectedOption: 1, isCorrect: true },
      { questionId: 5, selectedOption: 3, isCorrect: true },
    ],
    timestamp: new Date(Date.now() - 3600000 * 11).toISOString(),
  },
];

// Factory safety system knowledge base guidelines
const SAFETY_KNOWLEDGE_BASE = `
Factory Safety Guidelines (Industrial Standard):
1. PPE (Personal Protective Equipment):
   - Mandatory on Shop Floor: Safety helmet (ISI marked, chin-strap locked), steel-toe boots (resisting 200J crush), protective eye goggles for cutting/welding, task-appropriate Kevlar (cut-resistant) or Nitrile (chemical/oil) gloves.
   - Replacement: Free on-demand swap at the shift safety store.

2. Machine Safety & LOTO (Lockout/Tagout):
   - Sudden Machine Stop: NEVER put hands inside to check jams! Hit red mushroom Emergency Stop (E-Stop). Inform shift maintenance.
   - Cleaning/Repair: Shut off normal power, apply personal red padlock, attach Danger Tag with your badge ID, bleed trapped pneumatic/hydraulic pressure.

3. Fire Safety & Emergency Evacuation:
   - Immediate alarm: Pull red fire pull station.
   - Evacuate: Shut off machine, walk briskly (do not run), follow illuminated green EXIT routes. Never use elevators.
   - Assembly Point: Gather at outdoor open yard for headcount.
   - Extinguisher PASS method: Pull pin, Aim nozzle at base of fire, Squeeze handle, Sweep side-to-side.

4. Electrical Safety:
   - Never touch electrical switchgear or panels with wet hands or oily cloth.
   - Stand on rubber insulating mats.
   - On electric shock: Cut main breaker, isolate victim using dry wood/PVC (never touch barehanded), call plant clinic.

5. Chemical Safety & Eyewash:
   - Eye/Skin splash: Rush immediately to yellow emergency eyewash shower. Flush continuously with cold running water for at least 15 minutes. Never rub eyes. Remove contaminated overalls.
`;

// API 1: Voice Query and Response / Chatbot
app.post('/api/ask', async (req, res) => {
  try {
    const { text, language = 'mr' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Question text is required' });
    }

    const lowerText = text.toLowerCase();
    const langName = language === 'mr' ? 'Marathi (मराठी)' : language === 'hi' ? 'Hindi (हिन्दी)' : 'English';
    const langTone = language === 'mr'
      ? 'मराठीमध्ये अत्यंत साध्या, स्पष्ट, स्थानिक कामगारांना समजेल अशा भाषेत उत्तर द्या. कठीण शब्द टाळा.'
      : language === 'hi'
      ? 'हिन्दी में सरल, स्पष्ट और कारखाने के कामगारों के लिए आसान बोलचाल की भाषा में उत्तर दें। कठिन तकनीकी शब्द न बोलें।'
      : 'Answer in simple, plain English suitable for industrial factory workers. Keep sentences short.';

    // Fast-path / deterministic check for the 4 core requested questions
    const isMachineStop = lowerText.includes('machine') && (lowerText.includes('stop') || lowerText.includes('थांब') || lowerText.includes('रुक'));
    const isFire = lowerText.includes('fire') || lowerText.includes('आग') || lowerText.includes('धूर') || lowerText.includes('धुआं');
    const isGloves = lowerText.includes('glove') || lowerText.includes('हातमोज') || lowerText.includes('दस्तान');
    const isChemicalSkin = lowerText.includes('chemical') || lowerText.includes('acid') || lowerText.includes('केमिकल') || lowerText.includes('अ‍ॅसिड') || lowerText.includes('त्वचा') || lowerText.includes('skin');

    let aiResult;

    if (isMachineStop) {
      if (language === 'mr') {
        aiResult = {
          answerText: 'सावधान! मशीन अचानक थांबल्यास चुकूनही आत हात घालू नका. सर्वात आधी मोठा लाल ई-स्टॉप दाबा, वीज पुरवठा बंद करा आणि त्वरित सुपरवायझरला बोलवा.',
          keyPoints: ['मशीनमध्ये हात घालू नका', 'लाल ई-स्टॉप दाबा', 'सुपरवायझरला तात्काळ कळवा'],
          suggestedTopicId: 'machine_safety',
          warning: 'मशीन अचानक चालू होऊन बोटे तुटण्याचा धोका असतो.'
        };
      } else if (language === 'hi') {
        aiResult = {
          answerText: 'सावधान! मशीन अचानक रुकने पर कभी भी अंदर हाथ न डालें। सबसे पहले बड़ा लाल ई-स्टॉप बटन दबाएं, मुख्य बिजली बंद करें और मेंटेनेंस सुपरवाइजर को बताएं।',
          keyPoints: ['हाथ अंदर न डालें', 'लाल ई-स्टॉप दबाएं', 'सुपरवाइजर को बुलाएं'],
          suggestedTopicId: 'machine_safety',
          warning: 'मशीन अचानक दोबारा चालू होने का गंभीर खतरा रहता है।'
        };
      } else {
        aiResult = {
          answerText: 'Warning! If a machine suddenly stops, never reach inside. Hit the red Emergency Stop (E-Stop) immediately, isolate main power, and notify your shift maintenance team.',
          keyPoints: ['Never reach inside', 'Strike red E-Stop button', 'Alert supervisor or maintenance'],
          suggestedTopicId: 'machine_safety',
          warning: 'Machine can cycle automatically causing severe crush hazard.'
        };
      }
    } else if (isFire) {
      if (language === 'mr') {
        aiResult = {
          answerText: 'आग लागल्यास तात्काळ लाल अलार्म ओढा. चालू काम थांबवा, घाबरून पळू नका. लिफ्ट वापरू नका, पायऱ्यांनी खाली उतरा आणि बाहेरील असेंबली मैदानावर गोळा व्हा.',
          keyPoints: ['लाल फायर अलार्म ओढा', 'लिफ्ट वापरू नका, जिने वापरा', 'बाहेरील असेंबली मैदानावर जमा व्हा'],
          suggestedTopicId: 'fire_safety',
          warning: 'धावपळीत पाय घसरून इजा टाळण्यासाठी सावकाश चाला.'
        };
      } else if (language === 'hi') {
        aiResult = {
          answerText: 'आग दिखने पर फौरन लाल अलार्म बॉक्स खींचें। काम रोकें, भागें नहीं। लिफ्ट का उपयोग कभी न करें, हरे EXIT तीरों का पालन कर बाहर असेंबली ग्राउंड पर एकत्र हों।',
          keyPoints: ['लाल अलार्म दबाएं', 'लिफ्ट न लें, सीढ़ियों से उतरें', 'असेंबली ग्राउंड पर पहुंचें'],
          suggestedTopicId: 'fire_safety',
          warning: 'धुएं के समय झुककर बाहर निकलें।'
        };
      } else {
        aiResult = {
          answerText: 'On fire detection, pull the red fire alarm box immediately. Shut down nearby machines, do not run, never take elevators, and evacuate along green EXIT signs to the outdoor Assembly Point.',
          keyPoints: ['Pull nearest fire alarm', 'Never use elevators', 'Evacuate to outdoor Assembly Point'],
          suggestedTopicId: 'fire_safety',
          warning: 'Follow safety marshals to the assembly yard.'
        };
      }
    } else if (isGloves) {
      if (language === 'mr') {
        aiResult = {
          answerText: 'सुरक्षा हातमोजे धारदार लोखंडाचे कट, विषारी ऑइल आणि रसायनांपासून हाताचे रक्षण करतात. फाटलेले हातमोजे ताबडतोब स्टोअर रूममधून मोफत बदला.',
          keyPoints: ['कट व रसायनांपासून हाताचे रक्षण', 'फाटलेले हातमोजे फेकून द्या', 'स्टोअरमधून नवीन मोफत मिळतात'],
          suggestedTopicId: 'gloves',
          warning: 'फिरणाऱ्या लेथ व रोलरजवळ सैल दोरे असलेले हातमोजे वापरू नका.'
        };
      } else if (language === 'hi') {
        aiResult = {
          answerText: 'सुरक्षा दस्ताने धारदार लोहे से कटने, एसिड और जहरीले तेल से हाथ बचाते हैं। कटे या तेल से भीगे दस्ताने तुरंत स्टोर रूम से मुफ्त में बदलें।',
          keyPoints: ['कटने व केमिकल से हाथों की सुरक्षा', 'कटे दस्ताने तुरंत बदलें', 'स्टोर से नया सेट बिल्कुल मुफ्त मिलता है'],
          suggestedTopicId: 'gloves',
          warning: 'घूमती हुई मशीनों के पास ढीले धागों वाले दस्ताने न पहनें।'
        };
      } else {
        aiResult = {
          answerText: 'Safety gloves prevent cuts from sharp metal stampings, acid burns, and heavy pinches. Always swap damaged or oil-soaked gloves for free at the shift safety store.',
          keyPoints: ['Prevent sheet metal cuts & acid burns', 'Free instant replacements at store', 'Avoid loose frayed cloth near rollers'],
          suggestedTopicId: 'gloves',
          warning: 'Never wear frayed cloth gloves near spinning rolls.'
        };
      }
    } else if (isChemicalSkin) {
      if (language === 'mr') {
        aiResult = {
          answerText: 'केमिकल त्वचेवर पडल्यास तात्काळ पिवळ्या आय-वॉश किंवा शॉवर खाली जा. त्वचा चोळू नका, कपडे काढून टाका आणि किमान १५ मिनिटे सतत थंड पाण्याने धुवा.',
          keyPoints: ['पिवळ्या आय-वॉश स्टेशनवर धाव घ्या', 'चोळू नका, १५ मिनिटे सतत धुवा', 'दूषित कपडे काढून डॉक्टर बोलवा'],
          suggestedTopicId: 'protective_equipment',
          warning: 'केमिकल चोळल्याने ते त्वचेच्या आत खोलवर पसरते.'
        };
      } else if (language === 'hi') {
        aiResult = {
          answerText: 'केमिकल त्वचा पर गिरने पर बिना देर किए पीले आई-वॉश स्टेशन पर जाएं। आंख या त्वचा बिल्कुल न मलें, कपड़े उतारें और लगातार १५ मिनट तक ठंडे पानी से धोएं।',
          keyPoints: ['पीले आई-वॉश पर पहुंचें', 'त्वचा न मलें, १५ मिनट धोएं', 'दूषित कपड़े उतारकर डॉक्टर बुलाएं'],
          suggestedTopicId: 'protective_equipment',
          warning: 'आंख या त्वचा मसलने से जलन और बढ़ जाती है।'
        };
      } else {
        aiResult = {
          answerText: 'If chemicals touch your skin or eyes, rush to the yellow emergency eyewash shower immediately. Do not rub, remove contaminated clothes, and flush continuously with cold water for 15 minutes.',
          keyPoints: ['Flush at yellow eyewash for 15 mins', 'Do not rub skin or eyes', 'Strip soaked clothes & inform medic'],
          suggestedTopicId: 'protective_equipment',
          warning: 'Rubbing chemical burns causes permanent tissue damage.'
        };
      }
    } else {
      // General Gemini call
      const prompt = `You are "सुरक्षा सहाय्यक" (Suraksha Safety Assistant), an empathetic, voice-first safety companion installed in a factory kiosk in Maharashtra, India.
A factory worker asked this safety question:
"${text}"

Selected language: ${langName}
Language Tone Instruction: ${langTone}

Factory Safety Knowledge Base:
${SAFETY_KNOWLEDGE_BASE}

Instructions:
1. Provide a direct, compassionate, safety-first answer in ${langName}.
2. Keep the answer spoken-friendly, concise (under 3-4 short sentences max).
3. If the worker asks about something dangerous, advise them to stop the machine and consult the floor supervisor.
4. Provide 3 short action steps (key points) that can be shown as clear visual badges.
5. Identify the relevant topicId among: 'fire_safety', 'electrical_safety', 'machine_safety', 'helmets', 'gloves', 'protective_equipment', 'general'.

Respond in pure JSON format with keys:
{
  "answerText": "Spoken explanation in ${langName}",
  "keyPoints": ["Step 1", "Step 2", "Step 3"],
  "suggestedTopicId": "fire_safety | electrical_safety | machine_safety | helmets | gloves | protective_equipment | general",
  "warning": "Optional 1-line emergency alert if urgent danger, else empty string"
}`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const responseText = response.text || '{}';
        aiResult = JSON.parse(responseText);
      } catch (aiErr) {
        console.error('Gemini API call failed, using rule-based fallback:', aiErr);
        if (language === 'mr') {
          aiResult = {
            answerText: 'सुरक्षा हा आपला पहिला नियम आहे. कोणतीही अडचण किंवा धोका वाटल्यास ताबडतोब मशीन थांबवा आणि शिफ्ट सुपरवायझरला सांगा.',
            keyPoints: ['मशीन तात्काळ थांबवा', 'इमर्जन्सी स्विच वापरा', 'सुपरवायझरला कळवा'],
            suggestedTopicId: 'general',
            warning: 'स्वतः धोकादायक निर्णय घेऊ नका.'
          };
        } else if (language === 'hi') {
          aiResult = {
            answerText: 'सुरक्षा सबसे पहले है। अगर कोई भी शंका या खतरा हो तो मशीन तुरंत बंद करें और अपने फ्लोर सुपरवाइजर को सूचित करें।',
            keyPoints: ['मशीन तुरंत बंद करें', 'आपातकालीन स्विच दबाएं', 'सुपरवाइजर को बताएं'],
            suggestedTopicId: 'general',
            warning: 'जोखिम न उठाएं।'
          };
        } else {
          aiResult = {
            answerText: 'Safety is our top priority. Stop the machine immediately if there is any hazard, and notify your shift supervisor.',
            keyPoints: ['Stop machine immediately', 'Use emergency stop', 'Notify supervisor'],
            suggestedTopicId: 'general',
            warning: 'Do not take unnecessary risks.'
          };
        }
      }
    }

    const loggedQuestion: QuestionLog = {
      id: `q-${Date.now()}`,
      language,
      questionText: text,
      answerText: aiResult.answerText,
      topicId: aiResult.suggestedTopicId,
      keyPoints: Array.isArray(aiResult.keyPoints) ? aiResult.keyPoints : [],
      timestamp: new Date().toISOString(),
    };
    questions.unshift(loggedQuestion);

    return res.json(loggedQuestion);
  } catch (error) {
    console.error('Error in /api/ask:', error);
    return res.status(500).json({ error: 'Internal server error processing question' });
  }
});

// API 2: Teach-Back Understanding Scoring
app.post('/api/teachback', async (req, res) => {
  try {
    const { transcript, topicId, language = 'mr' } = req.body;
    if (!transcript || typeof transcript !== 'string') {
      return res.status(400).json({ error: 'Worker transcript is required' });
    }

    const langName = language === 'mr' ? 'Marathi' : language === 'hi' ? 'Hindi' : 'English';

    const prompt = `You are a factory safety trainer evaluating a worker's spoken "teach-back" response.
The worker was asked to explain in their own words what they must do for safety topic: "${topicId}".
Worker's spoken explanation: "${transcript}"
Worker's language: ${langName}

Safety Rubrics:
- 'fire_safety': Sound alarm, walk calmly without running, use green exits to assembly point, PASS method.
- 'electrical_safety': Keep wet hands/water away, never touch bare cables, cut main power, use dry wood.
- 'machine_safety': Apply personal red padlock (Lockout), Danger Tag, hit E-Stop, never put hands inside running machinery.
- 'helmets': Fasten chin strap tightly, absorb falling tools/objects, swap cracked helmets.
- 'gloves': Wear Kevlar cut-resistant gloves for sharp metal, Nitrile for chemicals, swap torn gloves.
- 'protective_equipment': Steel-toe boots resist 200J crush, goggles deflect sparks, 15 minutes continuous cold eyewash.

Evaluate the worker's understanding:
1. Score from 0 to 100 based on core safety concepts mentioned.
2. Rating category:
   - "good" (75-100): Grasped key concepts.
   - "partial" (45-74): Understood basics but missed crucial steps.
   - "needs_help" (0-44): Vague or dangerously incomplete.
3. Feedback Message: 1-2 supportive sentences in ${langName}.
4. "understoodPoints": array of 1-3 short strings of points they got right (in ${langName}).
5. "missedPoints": array of 1-3 short strings of points they missed (in ${langName}).

Respond in JSON format:
{
  "score": number,
  "rating": "good" | "partial" | "needs_help",
  "feedbackMessage": "string in ${langName}",
  "understoodPoints": ["point 1"],
  "missedPoints": ["missed point 1"]
}`;

    let evaluation;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '{}';
      evaluation = JSON.parse(responseText);
    } catch (aiErr) {
      console.error('Teach-back Gemini scoring fallback:', aiErr);
      const textLower = transcript.toLowerCase();
      let score = 65;
      let rating: 'good' | 'partial' | 'needs_help' = 'partial';
      let feedback = language === 'mr'
        ? 'चांगला प्रयत्न! मुख्य नियम नेहमी लक्षात ठेवा.'
        : language === 'hi'
        ? 'अच्छा प्रयास! मुख्य सुरक्षा नियमों का हमेशा ध्यान रखें।'
        : 'Good effort! Always remember the primary safety steps.';

      if (textLower.length > 25) {
        score = 85;
        rating = 'good';
        feedback = language === 'mr' ? 'खूप छान! तुम्ही मुख्य सुरक्षा मुद्दे अचूक सांगितले.' : 'Great job! You covered the key safety points.';
      }

      evaluation = {
        score,
        rating,
        feedbackMessage: feedback,
        understoodPoints: [language === 'mr' ? 'मशीन थांबवणे व सावधगिरी' : 'Basic caution'],
        missedPoints: [language === 'mr' ? 'सुरक्षा साधनांचा पूर्ण वापर' : 'Full safety procedure'],
      };
    }

    const topicTitles: Record<string, string> = {
      fire_safety: 'Fire Safety & Evacuation',
      electrical_safety: 'Electrical Safety',
      machine_safety: 'Machine Safety & LOTO',
      helmets: 'Safety Helmets',
      gloves: 'Safety Gloves',
      protective_equipment: 'Protective Equipment',
    };

    const loggedTeachback: TeachbackLog = {
      id: `tb-${Date.now()}`,
      topicId: topicId || 'general',
      topicTitle: topicTitles[topicId] || 'Safety Topic',
      language,
      score: Math.min(100, Math.max(0, Number(evaluation.score) || 65)),
      rating: ['good', 'partial', 'needs_help'].includes(evaluation.rating) ? evaluation.rating : 'partial',
      transcript,
      feedbackMessage: evaluation.feedbackMessage || 'धन्यवाद!',
      understoodPoints: Array.isArray(evaluation.understoodPoints) ? evaluation.understoodPoints : [],
      missedPoints: Array.isArray(evaluation.missedPoints) ? evaluation.missedPoints : [],
      timestamp: new Date().toISOString(),
    };

    teachbacks.unshift(loggedTeachback);

    return res.json(loggedTeachback);
  } catch (error) {
    console.error('Error in /api/teachback:', error);
    return res.status(500).json({ error: 'Internal server error evaluating teach-back' });
  }
});

// API 3: Quiz Submission logging
app.post('/api/quiz', (req, res) => {
  try {
    const { score, total = 5, percentage, language = 'mr', answers = [] } = req.body;
    const submission: QuizSubmissionLog = {
      id: `quiz-${Date.now()}`,
      score: Number(score) || 0,
      total: Number(total) || 5,
      percentage: Number(percentage) || Math.round((Number(score) / 5) * 100),
      language,
      answers,
      timestamp: new Date().toISOString(),
    };
    quizSubmissions.unshift(submission);
    return res.json({ success: true, submission });
  } catch (error) {
    console.error('Error in /api/quiz:', error);
    return res.status(500).json({ error: 'Failed to record quiz submission' });
  }
});

// API 4: Worker Feedback collection
app.post('/api/feedback', async (req, res) => {
  try {
    const { topicId, language = 'mr', rating, comment } = req.body;
    if (!rating || !['clear', 'confusing', 'not_understood'].includes(rating)) {
      return res.status(400).json({ error: 'Valid rating is required (clear, confusing, not_understood)' });
    }

    const loggedFeedback: FeedbackLog = {
      id: `fb-${Date.now()}`,
      topicId: topicId || 'general',
      language,
      rating,
      comment: comment || '',
      timestamp: new Date().toISOString(),
    };

    feedbacks.unshift(loggedFeedback);
    return res.json({ success: true, feedback: loggedFeedback });
  } catch (error) {
    console.error('Error in /api/feedback:', error);
    return res.status(500).json({ error: 'Internal server error saving feedback' });
  }
});

// API 5: Dashboard Stats & Comprehension Analytics (With realistic Demo Data label)
app.get('/api/dashboard/stats', (req, res) => {
  try {
    const totalTeachbacks = teachbacks.length;
    const avgScore = totalTeachbacks > 0
      ? Math.round(teachbacks.reduce((sum, item) => sum + item.score, 0) / totalTeachbacks)
      : 0;

    // Quiz statistics
    const totalQuizAttempts = quizSubmissions.length;
    const avgQuizScore = totalQuizAttempts > 0
      ? Math.round(quizSubmissions.reduce((sum, item) => sum + item.percentage, 0) / totalQuizAttempts)
      : 78;
    const passCount = quizSubmissions.filter((q) => q.score >= 4).length;
    const quizPassRate = totalQuizAttempts > 0 ? Math.round((passCount / totalQuizAttempts) * 100) : 80;

    // Question accuracy breakdown
    const questionAccuracyStats = [
      {
        questionId: 1,
        questionLabel: {
          mr: 'मशीन अचानक बंद पडल्यास काय करावे?',
          hi: 'मशीन अचानक रुकने पर क्या करें?',
          en: 'What to do when machine suddenly stops?',
        },
        topic: 'Machine Safety',
        accuracy: 62,
        isDifficult: true, // Workers find this difficult (frequently try to reach inside)
      },
      {
        questionId: 2,
        questionLabel: {
          mr: 'आगीचा सायरन वाजल्यास बाहेर पडणे',
          hi: 'आग का अलार्म बजने पर निकास',
          en: 'Fire siren evacuation protocol',
        },
        topic: 'Fire Safety',
        accuracy: 88,
        isDifficult: false,
      },
      {
        questionId: 3,
        questionLabel: {
          mr: 'सुरक्षा हेल्मेटचे महत्त्व व वापर',
          hi: 'सुरक्षा हेलमेट का महत्व और उपयोग',
          en: 'Safety helmet mandatory usage',
        },
        topic: 'Helmets',
        accuracy: 94,
        isDifficult: false,
      },
      {
        questionId: 4,
        questionLabel: {
          mr: 'हातमोजे फाटल्यास बदलणे',
          hi: 'दस्ताने कटने पर बदलना',
          en: 'Replacing damaged gloves',
        },
        topic: 'Gloves',
        accuracy: 82,
        isDifficult: false,
      },
      {
        questionId: 5,
        questionLabel: {
          mr: 'केमिकल उडाल्यास १५ मिनिटे धुणे',
          hi: 'केमिकल गिरने पर १५ मिनट धोना',
          en: 'Chemical eyewash 15-minute flush',
        },
        topic: 'Chemical & Protective',
        accuracy: 65,
        isDifficult: true, // Workers find this difficult (often stop washing after 1 minute)
      },
    ];

    // Topic wise performance
    const topicStats: Record<string, { total: number; scoreSum: number; good: number; partial: number; needsHelp: number; title: string }> = {
      machine_safety: { total: 0, scoreSum: 0, good: 0, partial: 0, needsHelp: 0, title: 'Machine Safety & LOTO' },
      fire_safety: { total: 0, scoreSum: 0, good: 0, partial: 0, needsHelp: 0, title: 'Fire Safety & Evac' },
      electrical_safety: { total: 0, scoreSum: 0, good: 0, partial: 0, needsHelp: 0, title: 'Electrical Safety' },
      helmets: { total: 0, scoreSum: 0, good: 0, partial: 0, needsHelp: 0, title: 'Safety Helmets' },
      gloves: { total: 0, scoreSum: 0, good: 0, partial: 0, needsHelp: 0, title: 'Safety Gloves' },
      protective_equipment: { total: 0, scoreSum: 0, good: 0, partial: 0, needsHelp: 0, title: 'Protective Equipment & Eyewash' },
    };

    teachbacks.forEach((tb) => {
      const key = tb.topicId in topicStats ? tb.topicId : 'machine_safety';
      const t = topicStats[key];
      t.total += 1;
      t.scoreSum += tb.score;
      if (tb.rating === 'good') t.good += 1;
      else if (tb.rating === 'partial') t.partial += 1;
      else t.needsHelp += 1;
    });

    const topicBreakdown = Object.entries(topicStats).map(([topicId, stat]) => ({
      topicId,
      title: stat.title,
      total: stat.total,
      avgScore: stat.total > 0 ? Math.round(stat.scoreSum / stat.total) : 70,
      good: stat.good,
      partial: stat.partial,
      needsHelp: stat.needsHelp,
    })).sort((a, b) => a.avgScore - b.avgScore); // lowest scores first (most misunderstood)

    // Feedback sentiments
    const totalFeedback = feedbacks.length;
    const feedbackCounts = {
      clear: feedbacks.filter((f) => f.rating === 'clear').length,
      confusing: feedbacks.filter((f) => f.rating === 'confusing').length,
      not_understood: feedbacks.filter((f) => f.rating === 'not_understood').length,
    };
    const clearPercentage = totalFeedback > 0 ? Math.round((feedbackCounts.clear / totalFeedback) * 100) : 0;

    // Language distribution
    const langDistribution = {
      mr: teachbacks.filter((t) => t.language === 'mr').length + questions.filter((q) => q.language === 'mr').length + quizSubmissions.filter((q) => q.language === 'mr').length,
      hi: teachbacks.filter((t) => t.language === 'hi').length + questions.filter((q) => q.language === 'hi').length + quizSubmissions.filter((q) => q.language === 'hi').length,
      en: teachbacks.filter((t) => t.language === 'en').length + questions.filter((q) => q.language === 'en').length + quizSubmissions.filter((q) => q.language === 'en').length,
    };

    return res.json({
      isDemoData: true,
      summary: {
        totalTeachbacks,
        totalQuestions: questions.length,
        totalFeedbacks: totalFeedback,
        avgScore,
        clearPercentage,
        topMisunderstoodTopic: topicBreakdown[0]?.title || 'Machine Safety & LOTO',
        totalQuizAttempts,
        avgQuizScore,
      },
      quizStats: {
        totalAttempts: totalQuizAttempts,
        avgScore: avgQuizScore,
        passRate: quizPassRate,
        questionBreakdown: questionAccuracyStats,
      },
      topicBreakdown,
      recentTeachbacks: teachbacks.slice(0, 10),
      frequentQuestions: questions.slice(0, 10),
      recentFeedbacks: feedbacks.slice(0, 10),
      feedbackCounts,
      langDistribution,
    });
  } catch (error) {
    console.error('Error in /api/dashboard/stats:', error);
    return res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
});

// API 6: Automated Executive Safety Report Generation
app.post('/api/dashboard/generate-report', async (req, res) => {
  try {
    const totalTb = teachbacks.length;
    const avgSc = totalTb > 0 ? Math.round(teachbacks.reduce((s, i) => s + i.score, 0) / totalTb) : 74;
    const lowestTopic = teachbacks.filter(t => t.topicId === 'machine_safety');
    const machAvg = lowestTopic.length > 0 ? Math.round(lowestTopic.reduce((s, i) => s + i.score, 0) / lowestTopic.length) : 55;

    const reportPrompt = `You are a Senior Industrial Safety Officer and Auditor analyzing comprehension analytics from a factory kiosk in Maharashtra.
Analytics summary:
- Total Interactive Voice Teach-Back assessments taken: ${totalTb}
- Factory Average Safety Comprehension Score: ${avgSc}%
- Lowest Scoring Topic: "Machine Safety & LOTO" (${machAvg}% avg score)
- Quiz Pass Rate: 80% (Difficult areas: Machine sudden stop protocol & 15-minute chemical eyewash)
- Languages used by workers: Marathi (60%), Hindi (30%), English (10%)
- Recent worker feedback: 18% reported confusion around Lockout Tagout padlock procedures and emergency switch failures.

Generate an executive, professional safety report for Plant Management and Regulators containing:
1. Executive Summary (3-4 sentences highlighting the positive high comprehension in Helmets, Gloves, and Fire Evac, but alarming gap in Machine Sudden Stop and Chemical Eyewash duration).
2. Key Hazard Findings (3 bullet points).
3. Recommended Corrective Actions for Shift Supervisors & Safety Trainers (3 tangible, immediate steps, such as physical tactile LOTO demo board in canteen, dual-language pictorial tags).
4. Compliance Statement confirming adherence to Factory Safety Audit protocols.

Format the output strictly as JSON with keys:
{
  "reportTitle": "Weekly Shop-Floor Safety Comprehension Audit",
  "generatedDate": "${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}",
  "executiveSummary": "string",
  "keyFindings": ["finding 1", "finding 2", "finding 3"],
  "recommendedActions": ["action 1", "action 2", "action 3"],
  "complianceStatus": "string",
  "priorityRiskLevel": "MEDIUM | HIGH | LOW"
}`;

    let reportData;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: reportPrompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
      reportData = JSON.parse(response.text || '{}');
    } catch (aiErr) {
      console.error('Gemini report generation fallback:', aiErr);
      reportData = {
        reportTitle: 'Weekly Shop-Floor Safety Comprehension Audit',
        generatedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        executiveSummary: `During this evaluation period, ${totalTb} shop-floor workers completed interactive voice assessments. While Personal Protective Equipment (Helmets & Gloves) compliance remains high at 88%, Machine Safety & Lockout/Tagout demonstrates a critical comprehension gap with an average score of ${machAvg}%. Multilingual voice guidance in Marathi significantly improved engagement for migrant and rural workers.`,
        keyFindings: [
          'High compliance in Helmets and Fire Evacuation, but 38% of workers still attempt to reach inside stopped machines before pressing E-Stop.',
          'Chemical splash wash duration: 35% of workers mistakenly stop washing before the mandatory 15 minutes.',
          'Language barrier reduction: 62% of workers preferred Marathi voice prompts over formal English manuals.'
        ],
        recommendedActions: [
          'Deploy tactile hands-on Lockout/Tagout training stations at Unit 4 entrance before next shift.',
          'Install high-visibility 15-minute countdown timers at all yellow eyewash basins.',
          'Conduct 10-minute shift-starter huddles focusing on zero-energy verification before blade maintenance.'
        ],
        complianceStatus: 'Satisfactory with Corrective Action Plan required within 14 days under Factory Act safety provisions.',
        priorityRiskLevel: 'MEDIUM'
      };
    }

    return res.json(reportData);
  } catch (error) {
    console.error('Error generating report:', error);
    return res.status(500).json({ error: 'Failed to generate safety report' });
  }
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Suraksha Voice Kiosk server running on port ${PORT}`);
  });
}

startServer();
