import { Language, SafetyTopic, QuizQuestion } from '../types';

export const UI_STRINGS: Record<Language, {
  appName: string;
  tagline: string;
  selectLanguage: string;
  marathi: string;
  hindi: string;
  english: string;
  home: string;
  safetyBasics: string;
  machineSafety: string;
  emergencyHelp: string;
  askQuestion: string;
  shortQuiz: string;
  safetyQuizTitle: string;
  askNow: string;
  tapToSpeak: string;
  listening: string;
  processing: string;
  stopListening: string;
  replayAudio: string;
  nextSlide: string;
  prevSlide: string;
  checkUnderstanding: string;
  close: string;
  feedbackTitle: string;
  feedbackClear: string;
  feedbackConfusing: string;
  feedbackNotUnderstood: string;
  feedbackSuccess: string;
  anonymousNotice: string;
  adminMode: string;
  workerMode: string;
  sosAlert: string;
  slowAudio: string;
  normalAudio: string;
  score: string;
  explainInYourWords: string;
  retryQuiz: string;
  wellDone: string;
  needsAttention: string;
  understoodPointsLabel: string;
  missedPointsLabel: string;
  quizQuestionNumber: string;
  nextQuestion: string;
  submitQuiz: string;
  viewResults: string;
  quizScoreSummary: string;
  correctAnswer: string;
  yourAnswer: string;
  explanationLabel: string;
  passStatus: string;
  tryAgain: string;
  sosDisclaimer: string;
  sosSubtitle: string;
  sosStepInstruction: string;
  chatAssistantTitle: string;
  chatAssistantSubtitle: string;
  quickQuestionsTitle: string;
  demoDataBadge: string;
  viewLessons: string;
}> = {
  mr: {
    appName: 'सुरक्षा व्हॉइस किओस्क',
    tagline: 'कामगारांची सुरक्षा, स्वतःच्या आवाजात',
    selectLanguage: 'कृपया तुमची भाषा निवडा',
    marathi: 'मराठी',
    hindi: 'हिन्दी',
    english: 'English',
    home: 'मुख्य पान',
    safetyBasics: 'सुरक्षा साधने (PPE)',
    machineSafety: 'मशीन सुरक्षा (LOTO)',
    emergencyHelp: 'तातडीची मदत (SOS)',
    askQuestion: 'सुरक्षा सहाय्यक (Chatbot)',
    shortQuiz: 'समज चाचणी (Teach-Back)',
    safetyQuizTitle: 'सुरक्षा प्रश्नमंजुषा (Quiz)',
    askNow: 'माईकवर प्रश्न विचारा',
    tapToSpeak: 'माईक दाबा आणि स्पष्ट बोला',
    listening: 'ऐकत आहे... कृपया बोला',
    processing: 'माहिती शोधत आहे...',
    stopListening: 'थांबवा',
    replayAudio: 'आवाज पुन्हा ऐका',
    nextSlide: 'पुढील माहिती ➔',
    prevSlide: '⬅ मागील माहिती',
    checkUnderstanding: 'माझी समज तपासा',
    close: 'बंद करा',
    feedbackTitle: 'माहिती समजली का?',
    feedbackClear: 'एकदम स्पष्ट',
    feedbackConfusing: 'थोडे अवघड',
    feedbackNotUnderstood: 'समजले नाही',
    feedbackSuccess: 'धन्यवाद! तुमचा अभिप्राय नोंदवला गेला.',
    anonymousNotice: 'किओस्कवर कोणतेही नाव किंवा आयडी विचारले जात नाही. सर्व माहिती पूर्णपणे गुप्त आहे.',
    adminMode: 'सुरक्षा अधिकारी डॅशबोर्ड',
    workerMode: 'कामगार किओस्क मोड',
    sosAlert: 'तातडीची मदत (SOS)',
    slowAudio: 'हळू आवाजात ऐका',
    normalAudio: 'सामान्य गती',
    score: 'समज गुण',
    explainInYourWords: 'तुमच्या स्वतःच्या शब्दांत सांगा',
    retryQuiz: 'पुन्हा प्रयत्न करा',
    wellDone: 'उत्कृष्ट! योग्य समज',
    needsAttention: 'या मुद्द्यांवर लक्ष द्या',
    understoodPointsLabel: 'तुम्ही योग्य सांगितलेले मुद्दे:',
    missedPointsLabel: 'लक्षात ठेवायचे राहिलेले मुद्दे:',
    quizQuestionNumber: 'प्रश्न',
    nextQuestion: 'पुढील प्रश्न ➔',
    submitQuiz: 'चाचणी पूर्ण करा',
    viewResults: 'निकाल पाहा',
    quizScoreSummary: 'तुमचा प्रश्नमंजुषा निकाल',
    correctAnswer: 'योग्य उत्तर:',
    yourAnswer: 'तुमचे उत्तर:',
    explanationLabel: 'स्पष्टीकरण:',
    passStatus: 'अभिनंदन! तुम्ही उत्तीर्ण झालात.',
    tryAgain: 'पुन्हा प्रयत्न करा',
    sosDisclaimer: '⚠️ हे मार्गदर्शन पॅनेल आहे — हे आपत्कालीन सेवांशी आपोआप संपर्क साधत नाही. त्वरित प्लांट फोन किंवा १०१ / १०८ वर प्रत्यक्ष कॉल करा.',
    sosSubtitle: 'संकटाच्या वेळी हे थेट पावले त्वरित उचला',
    sosStepInstruction: 'प्रत्येक टप्पा काळजीपूर्वक करा:',
    chatAssistantTitle: 'सुरक्षा चॅटबॉट व व्हॉइस सहाय्यक',
    chatAssistantSubtitle: 'कोणताही प्रश्न माईकवर बोला किंवा खालील बटनांवर टच करा',
    quickQuestionsTitle: 'महत्त्वाचे सुरक्षा प्रश्न (टच करा):',
    demoDataBadge: '⚡ प्रात्यक्षिक डेटा (Demo Data) — कारखान्यातील प्रात्यक्षिक चाचणी',
    viewLessons: 'सुरक्षा धडे व चित्रे पाहा',
  },
  hi: {
    appName: 'सुरक्षा वॉइस कियोस्क',
    tagline: 'मजदूरों की सुरक्षा, अपनी भाषा और आवाज में',
    selectLanguage: 'कृपया अपनी भाषा चुनें',
    marathi: 'मराठी',
    hindi: 'हिन्दी',
    english: 'English',
    home: 'होम',
    safetyBasics: 'सुरक्षा उपकरण (PPE)',
    machineSafety: 'मशीन सुरक्षा (LOTO)',
    emergencyHelp: 'आपातकालीन मदद (SOS)',
    askQuestion: 'सुरक्षा सहायक (Chatbot)',
    shortQuiz: 'समझ की जांच (Teach-Back)',
    safetyQuizTitle: 'सुरक्षा क्विज (Quiz)',
    askNow: 'माइक पर सवाल पूछें',
    tapToSpeak: 'माइक दबाएं और साफ बोलें',
    listening: 'सुन रहे हैं... कृपया बोलें',
    processing: 'जांच जारी है...',
    stopListening: 'रोकें',
    replayAudio: 'आवाज दोबारा सुनें',
    nextSlide: 'आगे बढ़ें ➔',
    prevSlide: '⬅ पीछे जाएं',
    checkUnderstanding: 'अपनी समझ जांचें',
    close: 'बंद करें',
    feedbackTitle: 'क्या बात समझ में आई?',
    feedbackClear: 'पूरी तरह समझ आया',
    feedbackConfusing: 'थोड़ा कठिन लगा',
    feedbackNotUnderstood: 'समझ नहीं आया',
    feedbackSuccess: 'धन्यवाद! आपकी प्रतिक्रिया दर्ज कर ली गई है।',
    anonymousNotice: 'कियोस्क पर कोई नाम या पहचान नहीं ली जाती। डेटा पूरी तरह सुरक्षित और गोपनीय है।',
    adminMode: 'सुरक्षा अधिकारी डैशबोर्ड',
    workerMode: 'कियोस्क मोड',
    sosAlert: 'आपातकालीन सहायता (SOS)',
    slowAudio: 'धीमी आवाज में सुनें',
    normalAudio: 'सामान्य गति',
    score: 'समझ स्कोर',
    explainInYourWords: 'अपने शब्दों में समझाएं',
    retryQuiz: 'फिर से प्रयास करें',
    wellDone: 'बहुत अच्छा! सही समझ',
    needsAttention: 'इन बातों का खास ध्यान रखें',
    understoodPointsLabel: 'आपने सही बताया:',
    missedPointsLabel: 'छूटे हुए महत्वपूर्ण बिंदु:',
    quizQuestionNumber: 'प्रश्न',
    nextQuestion: 'अगला प्रश्न ➔',
    submitQuiz: 'क्विज समाप्त करें',
    viewResults: 'परिणाम देखें',
    quizScoreSummary: 'आपका क्विज परिणाम',
    correctAnswer: 'सही उत्तर:',
    yourAnswer: 'आपका उत्तर:',
    explanationLabel: 'स्पष्टीकरण:',
    passStatus: 'बधाई हो! आप उत्तीर्ण हुए।',
    tryAgain: 'दोबारा प्रयास करें',
    sosDisclaimer: '⚠️ यह एक सुरक्षा निर्देश पैनल है — यह आपातकालीन सेवाओं को स्वचालित रूप से कॉल नहीं करता है। तुरंत १०१ / १०८ या प्लांट फोन पर कॉल करें।',
    sosSubtitle: 'संकट के समय तुरंत इन कदमों का पालन करें',
    sosStepInstruction: 'प्रत्येक कदम सावधानी से करें:',
    chatAssistantTitle: 'सुरक्षा चैटबॉट और वॉइस सहायक',
    chatAssistantSubtitle: 'कोई भी सवाल माइक पर बोलें या नीचे दिए गए बटनों पर टच करें',
    quickQuestionsTitle: 'अक्सर पूछे जाने वाले सुरक्षा प्रश्न (टच करें):',
    demoDataBadge: '⚡ डेमो डेटा (Demo Data) — फैक्ट्री प्रदर्शन के लिए',
    viewLessons: 'सुरक्षा पाठ और चित्र देखें',
  },
  en: {
    appName: 'Suraksha Voice Kiosk',
    tagline: 'Accessible voice-first factory safety for every worker',
    selectLanguage: 'Please select your language',
    marathi: 'मराठी',
    hindi: 'हिन्दी',
    english: 'English',
    home: 'Home',
    safetyBasics: 'Safety Basics (PPE)',
    machineSafety: 'Machine Safety (LOTO)',
    emergencyHelp: 'Emergency Help (SOS)',
    askQuestion: 'Safety Chatbot & Voice',
    shortQuiz: 'Teach-Back Quiz',
    safetyQuizTitle: 'Safety Quiz (5 MCQs)',
    askNow: 'Tap Mic to Ask',
    tapToSpeak: 'Tap mic and speak clearly',
    listening: 'Listening... please speak',
    processing: 'Analyzing answer...',
    stopListening: 'Stop',
    replayAudio: 'Replay Spoken Voice',
    nextSlide: 'Next ➔',
    prevSlide: '⬅ Previous',
    checkUnderstanding: 'Check My Understanding',
    close: 'Close',
    feedbackTitle: 'Was this explanation clear?',
    feedbackClear: 'Completely Clear',
    feedbackConfusing: 'Somewhat Confusing',
    feedbackNotUnderstood: 'Did Not Understand',
    feedbackSuccess: 'Thank you! Your feedback has been anonymously recorded.',
    anonymousNotice: 'No personal IDs or names are collected. Your safety inputs are completely anonymous.',
    adminMode: 'Safety Officer Dashboard',
    workerMode: 'Worker Kiosk Mode',
    sosAlert: 'Emergency SOS',
    slowAudio: 'Listen Slower',
    normalAudio: 'Normal Speed',
    score: 'Comprehension Score',
    explainInYourWords: 'Explain in your own words',
    retryQuiz: 'Try Again',
    wellDone: 'Excellent Comprehension!',
    needsAttention: 'Points needing attention',
    understoodPointsLabel: 'Points you explained correctly:',
    missedPointsLabel: 'Crucial points that were missed:',
    quizQuestionNumber: 'Question',
    nextQuestion: 'Next Question ➔',
    submitQuiz: 'Submit Quiz',
    viewResults: 'View Results',
    quizScoreSummary: 'Your Quiz Score Summary',
    correctAnswer: 'Correct Answer:',
    yourAnswer: 'Your Answer:',
    explanationLabel: 'Explanation:',
    passStatus: 'Congratulations! You passed the safety quiz.',
    tryAgain: 'Try Quiz Again',
    sosDisclaimer: '⚠️ Emergency Guidance Only — This tool does NOT automatically contact emergency services. Please call 101/108 or plant dispatch directly.',
    sosSubtitle: 'Immediate lifesaver steps to take right now',
    sosStepInstruction: 'Perform each step calmly and firmly:',
    chatAssistantTitle: 'Safety Voice Chatbot & Assistant',
    chatAssistantSubtitle: 'Speak any safety query into the mic or tap the quick buttons below',
    quickQuestionsTitle: 'Common Safety Questions (Tap to Ask):',
    demoDataBadge: '⚡ Demo Data — Realistic Shop-Floor Analytics for Demonstration',
    viewLessons: 'View Safety Lessons & Cards',
  },
};

// 4 Core Safety Chatbot Prompts requested in user prompt
export const CORE_CHATBOT_QUESTIONS = [
  {
    id: 'cb-1',
    query: {
      en: 'What should I do if a machine suddenly stops?',
      mr: 'मशीन अचानक बंद पडल्यास मी काय करावे?',
      hi: 'अगर मशीन अचानक रुक जाए तो मुझे क्या करना चाहिए?',
    },
    topicId: 'machine_safety',
  },
  {
    id: 'cb-2',
    query: {
      en: 'What should I do during a fire?',
      mr: 'कारखान्यात आग लागल्यास काय करावे?',
      hi: 'कारखाने में आग लगने पर क्या करना चाहिए?',
    },
    topicId: 'fire_safety',
  },
  {
    id: 'cb-3',
    query: {
      en: 'Why should I wear safety gloves?',
      mr: 'सुरक्षा हातमोजे (Gloves) का घालावेत?',
      hi: 'सुरक्षा दस्ताने (Gloves) क्यों पहनने चाहिए?',
    },
    topicId: 'gloves',
  },
  {
    id: 'cb-4',
    query: {
      en: 'What should I do if chemicals touch my skin?',
      mr: 'त्वचेवर केमिकल किंवा अ‍ॅसिड पडल्यास काय करावे?',
      hi: 'त्वचा पर केमिकल या एसिड गिर जाए तो क्या करें?',
    },
    topicId: 'protective_equipment',
  },
];

// 5 Interactive Multiple-Choice Questions with score calculation, correct answers, and explanations
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: 'Machine Safety',
    question: {
      mr: 'कामाच्या वेळी मशीन अचानक बंद पडल्यास तुम्ही सर्वात आधी काय करावे?',
      hi: 'काम के दौरान अगर मशीन अचानक रुक जाए, तो आपको सबसे पहले क्या करना चाहिए?',
      en: 'What should you do first if an operating machine suddenly stops?',
    },
    options: {
      mr: [
        'काही अडकले आहे का हे पाहण्यासाठी हात आत घालणे',
        'लाल इमर्जन्सी स्टॉप (E-Stop) दाबा आणि सुपरवायझरला सांगा',
        'मशीनचा स्विच वारंवार चालू-बंद करून पाहणे',
        'सहकाऱ्याला मशीन चालू करायला सांगून आत वाकून पाहणे',
      ],
      hi: [
        'रुकावट देखने के लिए तुरंत मशीन के अंदर हाथ डालना',
        'लाल इमरजेंसी स्टॉप (E-Stop) दबाएं और सुपरवाइजर को बताएं',
        'मशीन का ऑन-ऑफ बटन बार-बार दबाना',
        'साथी से मशीन चालू करने को कहकर अंदर झांकना',
      ],
      en: [
        'Put your hand inside to check for jams',
        'Press the red Emergency Stop (E-Stop) and inform your supervisor',
        'Rapidly toggle the power switch on and off',
        'Ask a co-worker to turn it on while looking inside',
      ],
    },
    correctAnswerIndex: 1,
    explanation: {
      mr: 'मशीनमध्ये चुकूनही हात घालू नका! मशीन अचानक पुन्हा चालू होऊन गंभीर अपघात होऊ शकतो. लाल ई-स्टॉप दाबा आणि तंत्रज्ञ किंवा सुपरवायझरला बोलवा.',
      hi: 'मशीन में कभी भी हाथ न डालें! मशीन अचानक चालू हो सकती है। लाल ई-स्टॉप दबाएं और केवल अधिकृत सुपरवाइजर या मेंटेनेंस टीम को बुलाएं।',
      en: 'Never put hands inside a stopped machine! It could restart unexpectedly. Press the red E-Stop immediately and notify maintenance or your shift supervisor.',
    },
  },
  {
    id: 2,
    topic: 'Fire Safety',
    question: {
      mr: 'कारखान्यात आगीचा सायरन वाजल्यास योग्य कृती कोणती?',
      hi: 'कारखाने में आग का अलार्म बजने पर सही कदम क्या है?',
      en: 'What is the correct action when the factory fire siren sounds?',
    },
    options: {
      mr: [
        'स्वतःचे वैयक्तिक सामान गोळा करण्यासाठी मागे पळणे',
        'इमारतीतून लवकर बाहेर पडण्यासाठी लिफ्टचा वापर करणे',
        'चालू काम थांबवा, हिरव्या एक्झिट मार्गाने सावकाश चाला आणि असेंबली पॉईंटवर जमा व्हा',
        'आग विझेपर्यंत लॉकर रूममध्ये लपून बसणे',
      ],
      hi: [
        'अपना सामान समेटने के लिए वापस भागना',
        'जल्दी बाहर निकलने के लिए लिफ्ट का उपयोग करना',
        'काम रोकें, हरे निकास (EXIT) मार्गों से तेज कदमों से चलें और असेंबली ग्राउंड पर एकत्र हों',
        'लॉकर रूम में छिपकर आग बुझने का इंतजार करना',
      ],
      en: [
        'Run back to your workstation to gather personal bags',
        'Use the elevator to evacuate the upper floors quickly',
        'Shut down equipment, follow illuminated green EXIT routes calmly, and assemble at outdoor Assembly Point',
        'Hide inside the locker room until the fire is extinguished',
      ],
    },
    correctAnswerIndex: 2,
    explanation: {
      mr: 'आगीच्या वेळी लिफ्ट कधीही वापरू नका व धावू नका. भिंतीवरील हिरव्या एक्झिट चिन्हांनुसार बाहेरील मोकळ्या असेंबली पॉईंट मैदानावर जमा व्हा जेणेकरून हजेरी घेता येईल.',
      hi: 'आग लगने पर कभी लिफ्ट का उपयोग न करें और न ही भागें। दीवारों पर लगे हरे EXIT तीरों का पालन कर बाहर असेंबली ग्राउंड पर पहुंचें ताकि आपकी सुरक्षा दर्ज हो सके।',
      en: 'Never use elevators or cause stampedes during a fire. Evacuate along green illuminated EXIT routes directly to the outdoor assembly point for headcount verification.',
    },
  },
  {
    id: 3,
    topic: 'Helmets',
    question: {
      mr: 'शॉपफ्लोरवर आयएसआय प्रमाणित सुरक्षा हेल्मेट घालणे का बंधनकारक आहे?',
      hi: 'शॉपफ्लोर पर प्रमाणित सुरक्षा हेलमेट पहनना क्यों अनिवार्य है?',
      en: 'Why is wearing an ISI-certified safety helmet mandatory on the shop floor?',
    },
    options: {
      mr: [
        'वरतून पडणाऱ्या वस्तू, लोखंडी बीम आणि डोक्याला होणाऱ्या गंभीर दुखापतींपासून बचाव करण्यासाठी',
        'केवळ युनिफॉर्मचा रंग मॅच करण्यासाठी',
        'केवळ बाहेरून मोठे अधिकारी आल्यावर दाखवण्यासाठी',
        'केसांमध्ये धूळ बसू नये म्हणून',
      ],
      hi: [
        'ऊपर से गिरने वाली वस्तुओं, लोहे के बीम और सिर पर लगने वाली गंभीर चोट से बचाव के लिए',
        'सिर्फ यूनिफॉर्म का रंग मिलाने के लिए',
        'केवल जब बाहर से बड़े अधिकारी आएं तब पहनने के लिए',
        'बालों को धूल से बचाने के लिए',
      ],
      en: [
        'To protect against falling parts, low-hanging metal beams, and fatal impact injuries',
        'Only for uniform color coordination',
        'Only when senior factory inspectors visit the plant',
        'Simply to keep industrial dust off your hair',
      ],
    },
    correctAnswerIndex: 0,
    explanation: {
      mr: 'सुरक्षा हेल्मेट वरून पडणाऱ्या अवजड वस्तूंचा धक्का शोषून घेते. यामुळे कवटीला होणारी प्राणघातक इजा टळते. हेल्मेटची पट्टी नेहमी हनुवटीखाली घट्ट लावावी.',
      hi: 'सुरक्षा हेलमेट ऊंचाई से गिरने वाले औजारों या लोहे के भारी झटकों को सोख लेता है, जिससे सिर की जानलेवा चोट से बचाव होता है। स्ट्रैप हमेशा कसकर बांधें।',
      en: 'Safety helmets absorb heavy impacts from dropped tools and steel girders, preventing skull fractures. Always secure the chinstrap firmly.',
    },
  },
  {
    id: 4,
    topic: 'Gloves',
    question: {
      mr: 'हाताचे हातमोजे (Safety Gloves) फाटल्यास किंवा तेलकट झाल्यास काय करावे?',
      hi: 'काम के दस्ताने (Safety Gloves) कट जाएं या तेल से भीग जाएं तो क्या करें?',
      en: 'What should you do if your safety gloves tear or become saturated with oil?',
    },
    options: {
      mr: [
        'महिना संपेपर्यंत तेच फाटलेले हातमोजे वापरत राहणे',
        'फाटलेले हातमोजे फेकून द्या आणि स्टोअर रूममधून नवीन मोफत जोडी त्वरित घ्या',
        'फिरणाऱ्या लेथ मशीनच्या चकजवळ सैल धागे असलेले हातमोजे वापरणे',
        'हातमोजे धुवून ऑइलमध्ये भिजवून पुन्हा वापरणे',
      ],
      hi: [
        'महीने के अंत तक उसी कटे हुए दस्ताने से काम करते रहना',
        'कटे दस्ताने फेंकें और स्टोर रूम से तुरंत नया सेट मुफ्त प्राप्त करें',
        'घूमती हुई मशीन के पास ढीले धागों वाले दस्ताने पहनना',
        'दस्ताने को तेल से धोकर दोबारा इस्तेमाल करना',
      ],
      en: [
        'Keep working with torn gloves until the end of the shift',
        'Discard damaged gloves and obtain a free replacement pair immediately from the store',
        'Wear gloves with loose fraying threads near spinning lathe spindles',
        'Soak cut gloves in machine oil to lubricate them',
      ],
    },
    correctAnswerIndex: 1,
    explanation: {
      mr: 'फाटलेले हातमोजे धारदार पत्रा किंवा रसायनांपासून संरक्षण करू शकत नाहीत. कंपनीच्या स्टोअर रूममधून सुरक्षा साधनांची नवीन जोडी विनामूल्य दिली जाते.',
      hi: 'कटे हुए दस्ताने धारदार लोहे या रसायनों से हाथ को नहीं बचा सकते। कंपनी के स्टोर रूम से नया सेट बिल्कुल मुफ्त मिलता है, तुरंत बदलें।',
      en: 'Damaged gloves fail to protect against metal lacerations or corrosive chemicals. Free replacement gloves are available on demand at the shift safety store.',
    },
  },
  {
    id: 5,
    topic: 'Chemical & Protective Equipment',
    question: {
      mr: 'औद्योगिक केमिकल किंवा अ‍ॅसिड डोळ्यात किंवा अंगावर उडाल्यास सर्वात पहिली अनिवार्य कृती कोणती?',
      hi: 'अगर कोई केमिकल या एसिड आंख या त्वचा पर गिर जाए, तो सबसे पहला अनिवार्य कदम क्या है?',
      en: 'If industrial chemicals or acid splash onto your eyes or skin, what is the mandatory first step?',
    },
    options: {
      mr: [
        'डोळे कोरड्या मळकट कपड्याने जोराने चोळणे',
        'जखमेवर स्वयंपाकाचे तेल किंवा ग्रीस लावणे',
        'वेदना कमी होतात का हे पाहण्यासाठी अर्धा तास वाट पाहणे',
        'पिवळ्या आय-वॉश स्टेशनवर धाव घेऊन डोळे उघडे ठेवून सतत १५ मिनिटे स्वच्छ थंड पाण्याने धुणे',
      ],
      hi: [
        'आंखों को गंदे सूखे कपड़े से जोर-जोर से रगड़ना',
        'जले हुए हिस्से पर ग्रीस या खाने का तेल लगाना',
        'दर्द बंद होने के लिए आधा घंटा इंतजार करना',
        'पीले आई-वॉश फव्वारे पर जाकर पलकें खोलकर लगातार १५ मिनट ठंडे पानी से धोना',
      ],
      en: [
        'Rub your eyes vigorously with a dry workshop cloth',
        'Smear cooking oil or machine grease over the chemical burn',
        'Sit and wait 30 minutes to see if the irritation subsides',
        'Rush to the yellow eyewash station, hold eyes open, and flush with cold water continuously for at least 15 minutes',
      ],
    },
    correctAnswerIndex: 3,
    explanation: {
      mr: 'केमिकल डोळ्यात किंवा त्वचेवर पडल्यास डोळे चोळणे अत्यंत धोकादायक आहे! किमान १५ मिनिटे पाण्याचा मारा केल्याने अ‍ॅसिड विरघळते. लगेच वैद्यकीय मदत घ्या.',
      hi: 'केमिकल पड़ने पर आंख मलना सख्त मना है! कम से कम १५ मिनट लगातार पानी से धोने से रसायन पतला होकर बाहर निकल जाता है। तुरंत डॉक्टर को बुलाएं।',
      en: 'Never rub chemical splashes! Continuous 15-minute cold water flushing dilutes corrosive acids and minimizes tissue necrosis. Inform the medical clinic immediately.',
    },
  },
];

// 6 Visual Safety Lesson Topics requested in feature 7
export const SAFETY_TOPICS: SafetyTopic[] = [
  // 1. Fire Safety
  {
    id: 'fire_safety',
    title: {
      mr: '१. अग्नी सुरक्षा (Fire Safety)',
      hi: '१. आग से सुरक्षा (Fire Safety)',
      en: '1. Fire Safety & PASS Rule',
    },
    shortDescription: {
      mr: 'आग लागल्यास अलार्म, अग्निशामक (PASS) आणि असेंबली पॉईंट',
      hi: 'आग लगने पर अलार्म, अग्निशामक यंत्र (PASS) और निकासी',
      en: 'Alarm activation, extinguisher PASS method, and safe evacuation',
    },
    icon: 'Flame',
    accentColor: 'from-orange-500 to-amber-600',
    teachbackPrompt: {
      mr: 'स्वतःच्या शब्दांत सांगा: कारखान्यात आगीचा सायरन वाजल्यास तुम्ही काय कराल आणि लाल सिलिंडरचा PASS नियम कसा वापराल?',
      hi: 'अपने शब्दों में बताएं: आग का अलार्म बजने पर आप क्या करेंगे और अग्निशामक का PASS नियम कैसे काम करता है?',
      en: 'In your own words: What must you do when fire breaks out, and how do you operate an extinguisher using PASS?',
    },
    expectedKeyPoints: {
      mr: ['लाल अलार्म बॉक्स ओढणे', 'P - पिन ओढा, A - मुळाशी धरा, S - हँडल दाबा, S - फिरवा', 'धावू नका, हिरवे एक्झिट पाहा', 'बाहेर असेंबली पॉईंटवर जमा व्हा'],
      hi: ['लाल अलार्म बजाना', 'PASS नियम: पिन खींचो, जड़ पर निशाना, हैंडल दबाओ, घुमाओ', 'दौड़ें नहीं, शांति से बाहर निकलें', 'असेंबली ग्राउंड पर एकत्र होना'],
      en: ['Sound alarm immediately', 'PASS: Pull pin, Aim base, Squeeze trigger, Sweep side-to-side', 'Walk calmly via green EXITs', 'Gather at designated Assembly Point'],
    },
    slides: [
      {
        id: 'fire-1',
        title: {
          mr: 'आग लागल्यास त्वरित अलार्म वाजवा',
          hi: 'आग दिखते ही फौरन अलार्म बजाएं',
          en: 'Sound the Alarm & Evacuate Safely',
        },
        caption: {
          mr: 'धावपळ न करता हिरव्या एक्झिट चिन्हांचे अनुसरण करा.',
          hi: 'भगदड़ न मचाएं, हरे EXIT तीरों का पालन करें।',
          en: 'Walk briskly to the outdoor Assembly Point.',
        },
        audioScript: {
          mr: 'आगीचा सायरन वाजताच चालू काम थांबवा. घाबरून धावू नका. भिंतीवरील हिरवे एक्झिट बोर्ड पाहा आणि सर्वात जवळच्या दरवाजातून बाहेर पडून मोकळ्या असेंबली मैदानावर गोळा व्हा.',
          hi: 'आग का अलार्म बजते ही काम रोकें। भागें नहीं। दीवारों पर लगे हरे तीर देखकर शांति से बाहर निकलें और खुले मैदान में असेंबली पॉइंट पर जाएं।',
          en: 'When the fire siren sounds, stop your machine immediately. Do not panic or run. Follow green EXIT arrows to the outdoor Assembly Point.',
        },
        bullets: {
          mr: ['सायरन वाजताच काम बंद करा', 'धावू नका, सावकाश चाला', 'लिफ्ट वापरू नका, जिने वापरा', 'बाहेरील असेंबली मैदानावर जमा व्हा'],
          hi: ['अलार्म बजते ही काम रोकें', 'दौड़ें नहीं, तेज चलें', 'लिफ्ट का उपयोग कभी न करें', 'बाहर असेंबली ग्राउंड पर जाएं'],
          en: ['Stop all operations immediately', 'Walk briskly, do not run', 'Never use elevators in fire', 'Gather at Assembly Point yard'],
        },
        icon: 'Flame',
        diagramType: 'fire',
      },
      {
        id: 'fire-2',
        title: {
          mr: 'अग्निशामक सिलिंडर: P-A-S-S नियम',
          hi: 'अग्निशामक यंत्र: P-A-S-S नियम',
          en: 'Extinguisher Operation: P-A-S-S',
        },
        caption: {
          mr: 'लहान आग लागल्यास हे ४ टप्पे वापरा.',
          hi: 'छोटी आग बुझाने के लिए ये ४ कदम याद रखें।',
          en: 'Pull, Aim, Squeeze, and Sweep.',
        },
        audioScript: {
          mr: 'अग्निशामक सिलिंडर वापरताना पास नियम लक्षात ठेवा: पी म्हणजे पिन ओढा, ए म्हणजे पाईप आगीच्या मुळाशी धरा, एस म्हणजे हँडल दाबा आणि दुसरा एस म्हणजे डावीकडून उजवीकडे फिरवा.',
          hi: 'सिलिंडर का उपयोग करते समय PASS याद रखें: P का मतलब पिन खींचो, A का मतलब पाइप आग की जड़ पर लगाओ, S का मतलब हैंडल दबाओ और दूसरे S का मतलब दोनों तरफ घुमाओ।',
          en: 'To operate the extinguisher, remember PASS: Pull the pin, Aim the nozzle at the base, Squeeze the lever, and Sweep side to side.',
        },
        bullets: {
          mr: ['P - पिन ओढा (Pull Pin)', 'A - आगीच्या मुळाशी धरा (Aim Base)', 'S - हँडल दाबा (Squeeze Lever)', 'S - डावीकडून उजवीकडे फिरवा (Sweep)'],
          hi: ['P - सेफ्टी पिन खींचें', 'A - आग की जड़ पर निशाना लगाएं', 'S - हैंडल को जोर से दबाएं', 'S - पाइप को दोनों तरफ घुमाएं'],
          en: ['P - Pull safety pin', 'A - Aim at base of fire', 'S - Squeeze the handle', 'S - Sweep side to side'],
        },
        icon: 'ShieldAlert',
        diagramType: 'fire',
      },
    ],
  },

  // 2. Electrical Safety
  {
    id: 'electrical_safety',
    title: {
      mr: '२. विद्युत सुरक्षा (Electrical Safety)',
      hi: '२. बिजली सुरक्षा (Electrical Safety)',
      en: '2. Electrical Safety & Shock Prevention',
    },
    shortDescription: {
      mr: 'उघड्या तारांना हात लावू नका, पाणी व ओले हात टाळा',
      hi: 'खुले तारों से दूर रहें, गीले हाथों से स्विच न छुएं',
      en: 'High voltage caution, wet floor insulation, and shock response',
    },
    icon: 'Zap',
    accentColor: 'from-yellow-500 to-amber-600',
    teachbackPrompt: {
      mr: 'स्वतःच्या शब्दांत सांगा: शॉपफ्लोरवर उघडी वीज वायर दिसल्यास किंवा सहकाऱ्याला विजेचा धक्का लागल्यास तुम्ही काय कराल?',
      hi: 'अपने शब्दों में बताएं: अगर फर्श पर कोई नंगी बिजली की तार दिखे या किसी साथी को करंट लगे, तो आप क्या करेंगे?',
      en: 'In your own words: What must you do if you spot exposed electrical cables or someone gets an electric shock?',
    },
    expectedKeyPoints: {
      mr: ['उघड्या वायरला हात न लावणे', 'पाणी किंवा ओले हात दूर ठेवणे', 'विजेचा धक्का लागल्यास मुख्य स्विच बंद करणे', 'लाकडी काठी किंवा रबर वापरणे'],
      hi: ['नंगी तार को बिल्कुल न छूना', 'गीले हाथों से स्विच न दबाना', 'करंट लगने पर मेन स्विच बंद करना', 'सूखी लकड़ी का सहारा लेना'],
      en: ['Never touch exposed cables', 'Keep water away from electrical panels', 'Cut main power switch on shock', 'Use non-conductive dry wood or rubber'],
    },
    slides: [
      {
        id: 'elec-1',
        title: {
          mr: 'ओले हात व उघड्या वायर्सपासून सावधान',
          hi: 'गीले हाथों व नंगे तारों से सावधान',
          en: 'Insulation & Wet Environment Hazard',
        },
        caption: {
          mr: 'विद्युत पॅनेलजवळ पाणी सांडू देऊ नका.',
          hi: 'बिजली के पैनल के पास पानी या गीलापन न होने दें।',
          en: 'Never operate electrical switches with wet hands or gloves.',
        },
        audioScript: {
          mr: 'कारखान्यात वीज पॅनेल किंवा स्विच बोर्डला ओल्या हातांनी किंवा तेलकट कपड्याने हात लावू नका. उघडी किंवा तडकलेली वायर दिसल्यास लगेच पिवळा इशारा फलक लावा आणि इलेक्ट्रिशियनला बोलवा.',
          hi: 'कारखाने में बिजली के बोर्ड या स्विच को गीले हाथों या तेल लगे दस्तानों से न छुएं। कोई भी कटी-फटी तार दिखे तो तुरंत चेतावनी बोर्ड लगाएं और इलेक्ट्रीशियन को बुलाएं।',
          en: 'Never touch electrical switchgear with wet hands or oily gloves. If you notice frayed or spark-emitting wires, place a warning cone and call the certified plant electrician.',
        },
        bullets: {
          mr: ['ओल्या हातांनी बटणे दाबू नका', 'उघड्या वायरला कधीही स्पर्श करू नका', 'पॅनेलजवळ रबरी मॅटवर उभे राहा', 'स्पार्क दिसल्यास तात्काळ कळवा'],
          hi: ['गीले हाथों से बटन न दबाएं', 'नंगी तारों को कभी न छुएं', 'रबर मैट पर खड़े होकर काम करें', 'चिंगारी दिखे तो फौरन बताएं'],
          en: ['Never flip switches with wet hands', 'Do not touch loose exposed wiring', 'Stand on rubber insulation mats', 'Report sparks or burning smell'],
        },
        icon: 'Zap',
        diagramType: 'electrical',
      },
    ],
  },

  // 3. Machine Safety
  {
    id: 'machine_safety',
    title: {
      mr: '३. मशीन सुरक्षा (Machine Safety & LOTO)',
      hi: '३. मशीन सुरक्षा (Machine Safety & LOTO)',
      en: '3. Machine Safety & Emergency Stop',
    },
    shortDescription: {
      mr: 'दुरुस्ती करताना लाल कुलूप (LOTO) व ई-स्टॉप बटन दाबा',
      hi: 'सफाई या रुकावट पर लाल ताला (LOTO) और ई-स्टॉप दबाएं',
      en: 'Lockout/Tagout, Emergency Stops, and interlocked guards',
    },
    icon: 'Lock',
    accentColor: 'from-rose-500 to-red-600',
    teachbackPrompt: {
      mr: 'स्वतःच्या शब्दांत सांगा: मशीन अचानक बंद पडल्यास किंवा दुरुस्ती करताना कुलूप (LOTO) का आणि कसे लावायचे?',
      hi: 'अपने शब्दों में बताएं: जब मशीन रुक जाए या सफाई करनी हो, तो LOTO नियम का पालन कैसे करेंगे?',
      en: 'In your own words: What must you do before unjamming, cleaning, or inspecting a machine using LOTO?',
    },
    expectedKeyPoints: {
      mr: ['मशीनचा मुख्य पॉवर स्विच बंद करणे', 'स्वतःचे लाल कुलूप लावणे (Lockout)', 'डेंजर टॅग लावणे', 'चालू मशीनमध्ये हात न घालणे'],
      hi: ['मेन स्विच ऑफ करना', 'अपना लाल ताला लगाना (Lockout)', 'डेंजर टैग लगाना', 'चलती मशीन में हाथ न डालना'],
      en: ['Shut down primary electrical circuit', 'Apply personal red padlock (Lockout)', 'Attach Danger Tag with badge number', 'Test that machine cannot restart'],
    },
    slides: [
      {
        id: 'mach-1',
        title: {
          mr: 'LOTO नियम: कुलूप लावा, जीव वाचवा',
          hi: 'LOTO नियम: ताला लगाओ, जीवन बचाओ',
          en: 'Lockout/Tagout: Lock It, Tag It',
        },
        caption: {
          mr: 'केवळ स्विच बंद करून हात घालू नका! कुलूप लावा.',
          hi: 'सिर्फ बटन बंद करना काफी नहीं! लाल ताला जरूर लगाएं।',
          en: 'Simply switching off is not enough! Always apply a padlock.',
        },
        audioScript: {
          mr: 'सावधान! मशीन साफ करताना किंवा अडकलेला माल काढताना कोणी चुकून बटन दाबले तर मोठा अपघात होऊ शकतो. यासाठी मुख्य वीज बॉक्सवर स्वतःचे लाल कुलूप लावा आणि डेंजर टॅग अडकवा. चावी नेहमी स्वतःच्या खिशात ठेवा.',
          hi: 'सावधान! मशीन की सफाई या रुकावट हटाते समय अगर कोई दूसरा व्यक्ति बटन दबा दे तो बड़ा हादसा हो सकता है। इसलिए मेन पावर पर अपना व्यक्तिगत ताला लगाएं और डेंजर टैग टांगें। चाबी अपनी जेब में रखें।',
          en: 'Warning! If someone accidentally presses the start button while you unjam a machine, severe injury occurs. Always place your personal red padlock on the main breaker and attach a Danger tag. Keep the key with you.',
        },
        bullets: {
          mr: ['१. मशीनचा सामान्य स्टॉप दाबा', '२. मुख्य वीज ब्रेकरवर लाल कुलूप लावा', '३. स्वतःचे नाव असलेला डेंजर टॅग लावा', '४. चावी नेहमी स्वतःजवळ ठेवा'],
          hi: ['१. मशीन का सामान्य स्टॉप दबाएं', '२. मुख्य पावर पर लाल ताला लगाएं', '३. अपना नाम लिखा डेंजर टैग लगाएं', '४. चाबी हमेशा अपनी जेब में रखें'],
          en: ['1. Press regular machine stop', '2. Apply red padlock on power breaker', '3. Fasten Danger Tag with your name', '4. Keep the key in your personal pocket'],
        },
        icon: 'Lock',
        diagramType: 'machine',
      },
      {
        id: 'mach-2',
        title: {
          mr: 'इमर्जन्सी स्टॉप (लाल बटन)',
          hi: 'इमरजेंसी स्टॉप (बड़ा लाल बटन)',
          en: 'Emergency Stop Switch (E-Stop)',
        },
        caption: {
          mr: 'कोणतीही दुर्घटना दिसताच मोठा लाल मशरूम स्विच दाबा.',
          hi: 'कोई भी खतरा दिखते ही बड़ा लाल बटन फौरन दबा दें।',
          en: 'Hit the large red mushroom switch immediately upon any hazard.',
        },
        audioScript: {
          mr: 'प्रत्येक मशीनजवळ एक मोठा लाल गोल स्विच असतो, त्याला ई-स्टॉप म्हणतात. कपडा अडकला, विचित्र आवाज आला किंवा कोणी जखमी झाले, तर विचार न करता तो लाल स्विच जोरात दाबा. मशीन एका सेकंदात थांबेल.',
          hi: 'हर मशीन के पास एक बड़ा लाल गोल बटन होता है जिसे ई-स्टॉप कहते हैं। अगर किसी का हाथ, कपड़ा फंसे या असामान्य आवाज आए, तो बिना देर किए यह लाल बटन दबाएं। मशीन तुरंत रुक जाएगी।',
          en: 'Every production machine has a prominent red mushroom button called the E-Stop. If clothing snags, strange grinding noises occur, or anyone is in danger, press it instantly without hesitation.',
        },
        bullets: {
          mr: ['लाल गोल बटन जोरात दाबा', 'मशीन एका सेकंदात वीज तोडते', 'सुपरवायझर आल्याशिवाय पुन्हा चालू करू नका', 'दररोज ई-स्टॉपचे स्थान पाहून ठेवा'],
          hi: ['लाल गोल बटन फौरन दबाएं', 'मशीन एक सेकंड में रुक जाती है', 'सुपरवाइजर के आने तक रिसेट न करें', 'रोज काम से पहले इसका स्थान याद रखें'],
          en: ['Press the red mushroom button firmly', 'Instantly cuts power to moving parts', 'Do not reset until supervisor inspects', 'Know your nearest E-Stop location every shift'],
        },
        icon: 'AlertOctagon',
        diagramType: 'machine',
      },
    ],
  },

  // 4. Helmets
  {
    id: 'helmets',
    title: {
      mr: '४. सुरक्षा हेल्मेट (Safety Helmets)',
      hi: '४. सुरक्षा हेलमेट (Safety Helmets)',
      en: '4. Safety Helmets & Head Protection',
    },
    shortDescription: {
      mr: 'आयएसआय प्रमाणित हेल्मेट, हनुवटीची पट्टी घट्ट बांधा',
      hi: 'प्रमाणित हेलमेट पहनें, चिन स्ट्रैप कसकर बांधें',
      en: 'Impact absorption, chinstrap fastening, and crack replacement',
    },
    icon: 'HardHat',
    accentColor: 'from-amber-400 to-yellow-500',
    teachbackPrompt: {
      mr: 'स्वतःच्या शब्दांत सांगा: सुरक्षा हेल्मेट कसे घालावे आणि हेल्मेटवर तडे गेले असल्यास काय करावे?',
      hi: 'अपने शब्दों में बताएं: सुरक्षा हेलमेट कैसे पहनना चाहिए और अगर उस पर दरार आ जाए तो क्या करें?',
      en: 'In your own words: How should you adjust your hard hat, and what should you do if it shows cracks?',
    },
    expectedKeyPoints: {
      mr: ['आयएसआय मार्क असलेले हेल्मेट वापरणे', 'हनुवटीची पट्टी (स्ट्रॅप) घट्ट लावणे', 'तडे गेलेले हेल्मेट स्टोअरमधून बदलणे', 'हेल्मेटखाली टोपी किंवा कापड न गुंडाळणे'],
      hi: ['प्रमाणित हेलमेट पहनना', 'चिन स्ट्रैप कसकर लगाना', 'दरार आने पर तुरंत बदलना', 'हेलमेट के अंदर कोई कपड़ा न लपेटना'],
      en: ['Wear certified hard hat', 'Fasten chin strap securely', 'Replace cracked helmet at store', 'Do not wear bulky caps under helmet'],
    },
    slides: [
      {
        id: 'helmet-1',
        title: {
          mr: 'डोक्याचे कवच: हेल्मेट नेहमी घट्ट बांधा',
          hi: 'सिर की सुरक्षा: चिन स्ट्रैप हमेशा कसकर बांधें',
          en: 'Secure Fit & Impact Resistance',
        },
        caption: {
          mr: 'वरतून पडणारे बोल्ट, लोखंड आणि बीमपासून संपूर्ण संरक्षण.',
          hi: 'ऊंचाई से गिरने वाले औजारों और लोहे से पूरा बचाव।',
          en: 'Protects brain from overhead drops and crane swinging parts.',
        },
        audioScript: {
          mr: 'शॉप फ्लोअरवर पाय ठेवण्यापूर्वी डोक्यावर पिवळे किंवा पांढरे सुरक्षा हेल्मेट घालणे अनिवार्य आहे. हनुवटीची पट्टी सैल सोडू नका. जर हेल्मेटवर तडे गेले असतील, तर स्टोअरमधून विनामूल्य नवीन घ्या.',
          hi: 'कारखाने में कदम रखने से पहले सुरक्षा हेलमेट पहनना अनिवार्य है। चिन स्ट्रैप को ढीला न छोड़ें। अगर हेलमेट टूट जाए या गिर जाए, तो स्टोर रूम से नया हेलमेट मुफ्त लें।',
          en: 'Wearing a safety helmet is compulsory before entering the factory shop floor. Fasten the chin strap firmly. If the shell has cracks, swap it for free at the safety store.',
        },
        bullets: {
          mr: ['हेल्मेटची हनुवटीची पट्टी घट्ट बांधा', 'वरतून पडणाऱ्या नट-बोल्टपासून रक्षण', 'तडे गेलेले हेल्मेट वापरू नका', 'स्टोअरमधून नवीन हेल्मेट मोफत मिळते'],
          hi: ['चिन स्ट्रैप हमेशा ठीक से बांधें', 'ऊपर से गिरने वाले औजारों से बचाव', 'टूटा हेलमेट तुरंत बदलें', 'स्टोर से नया हेलमेट मुफ्त मिलता है'],
          en: ['Always fasten chin strap securely', 'Blocks drops of nuts, bolts, tools', 'Never wear cracked hard hats', 'Free replacements at safety store'],
        },
        icon: 'HardHat',
        diagramType: 'helmet',
      },
    ],
  },

  // 5. Gloves
  {
    id: 'gloves',
    title: {
      mr: '५. सुरक्षा हातमोजे (Safety Gloves)',
      hi: '५. सुरक्षा दस्ताने (Safety Gloves)',
      en: '5. Safety Gloves & Hand Defense',
    },
    shortDescription: {
      mr: 'कट-विरोधी केव्हलार, केमिकल-विरोधी नायट्रिल, फाटल्यास तात्काळ बदला',
      hi: 'कट-प्रतिरोधी केवलायर और केमिकल-रोधी दस्ताने पहनें',
      en: 'Cut-resistant Kevlar, chemical Nitrile, and roll pinch rules',
    },
    icon: 'Hand',
    accentColor: 'from-blue-500 to-indigo-600',
    teachbackPrompt: {
      mr: 'स्वतःच्या शब्दांत सांगा: कामाच्या स्वरूपानुसार कोणते हातमोजे घालावेत आणि फिरणाऱ्या रोलरजवळ काय काळजी घ्यावी?',
      hi: 'अपने शब्दों में बताएं: काम के हिसाब से कौन-से दस्ताने पहनने चाहिए और घूमते रोलर के पास क्या ध्यान रखें?',
      en: 'In your own words: Why are appropriate gloves required, and when must you be careful near rotating machinery?',
    },
    expectedKeyPoints: {
      mr: ['धारदार पत्र्यासाठी कट-रेसिस्टंट हातमोजे', 'केमिकलसाठी नायट्रिल रबरी हातमोजे', 'फाटलेले हातमोजे लगेच बदलणे', 'सैल दोरे असलेले हातमोजे रोलरजवळ न वापरणे'],
      hi: ['धारदार धातु के लिए कट-रोधी दस्ताने', 'केमिकल के लिए रबर दस्ताने', 'कटे दस्ताने तुरंत बदलना', 'घूमते रोलर के पास ढीले धागे न हों'],
      en: ['Cut-resistant gloves for sharp metal', 'Nitrile gloves for oils/chemicals', 'Swap torn gloves immediately', 'Avoid loose frayed threads near spindles'],
    },
    slides: [
      {
        id: 'gloves-1',
        title: {
          mr: 'कापणी व रसायनांपासून हाताचे रक्षण',
          hi: 'कटने और केमिकल से हाथों का बचाव',
          en: 'Shielding Fingers from Cuts & Solvents',
        },
        caption: {
          mr: 'योग्य हातमोजे वापरा आणि फाटल्यास लगेच बदला.',
          hi: 'सही काम के लिए सही दस्ताने पहनें और फटने पर बदलें।',
          en: 'Select task-specific gloves and replace oil-soaked sets.',
        },
        audioScript: {
          mr: 'शॉपफ्लोरवर ८० टक्के दुखापती हाताला होतात. पत्रा किंवा धारदार लोखंड उचलताना कट-रेसिस्टंट हातमोजे घाला. ऑइल आणि केमिकलसाठी रबरी नायट्रिल हातमोजे वापरा. फिरणाऱ्या रोलरमध्ये दोरे अडकणार नाहीत याची दक्षता घ्या.',
          hi: 'कारखाने में ८० प्रतिशत चोटें हाथों पर लगती हैं। धारदार लोहे के लिए कट-रोधी दस्ताने और केमिकल के लिए रबर वाले दस्ताने पहनें। घूमती मशीनों के पास ढीले धागों वाले दस्ताने न पहनें।',
          en: 'Over 80 percent of workshop injuries affect fingers. Wear Kevlar cut-resistant gloves for sharp stamping sheets and Nitrile gloves for lubricants and solvents. Never wear frayed cloth gloves near spinning rolls.',
        },
        bullets: {
          mr: ['धारदार लोखंडासाठी कट-रेसिस्टंट हातमोजे', 'ऑइल व अ‍ॅसिडसाठी नायट्रिल हातमोजे', 'फाटलेले हातमोजे तात्काळ बदला', 'फिरणाऱ्या रोलरजवळ सैल दोरे नकोत'],
          hi: ['धारदार लोहे के लिए कट-रोधी दस्ताने', 'तेल व एसिड के लिए रबर दस्ताने', 'कटे दस्ताने तुरंत बदलें', 'घूमती रोलर के पास धागे न लटकें'],
          en: ['Kevlar gloves for sharp sheet metal', 'Nitrile gloves for acids and greases', 'Swap torn gloves right away', 'Prevent loose threads near rollers'],
        },
        icon: 'Hand',
        diagramType: 'gloves',
      },
    ],
  },

  // 6. Protective Equipment
  {
    id: 'protective_equipment',
    title: {
      mr: '६. इतर पीपीई साधने (Protective Equipment)',
      hi: '६. सुरक्षा उपकरण (Protective Equipment)',
      en: '6. Protective Equipment (Boots, Goggles & Eyewash)',
    },
    shortDescription: {
      mr: 'स्टील-टो बूट, सुरक्षा चष्मा, इअरप्लग आणि डोळे धुण्याचे केंद्र',
      hi: 'स्टील-टो जूते, सुरक्षा चश्मा और आंख धोने का फव्वारा',
      en: 'Steel-toe boots, eye protection goggles, earplugs, and eyewash stations',
    },
    icon: 'ShieldCheck',
    accentColor: 'from-emerald-500 to-teal-600',
    teachbackPrompt: {
      mr: 'स्वतःच्या शब्दांत सांगा: स्टील-टो बूट आणि चष्मा का आवश्यक आहेत, तसेच केमिकल डोळ्यात गेल्यास १५ मिनिटे काय करावे?',
      hi: 'अपने शब्दों में बताएं: स्टील-टो जूते और चश्मा क्यों जरूरी हैं, और आंख में केमिकल पड़ने पर १५ मिनट क्या करना है?',
      en: 'In your own words: Why are steel-toe boots and goggles essential, and how do you use the eyewash for 15 minutes?',
    },
    expectedKeyPoints: {
      mr: ['पायात जड वस्तू पडल्यास स्टील-टो बूट रक्षण करतात', 'वेल्डिंग व ग्राइंडिंग वेळी संरक्षक चष्मा', 'डोळ्यात केमिकल उडाल्यास १५ मिनिटे सतत धुणे', 'डोळे हाताने न चोळणे'],
      hi: ['पैर पर भारी वजन गिरने से सेफ्टी जूते बचाते हैं', 'काटने व वेल्डिंग में चश्मा जरूरी है', 'केमिकल गिरने पर १५ मिनट आंख धोएं', 'आंखें कभी न मसलें'],
      en: ['Steel toe protects feet against heavy drops', 'Goggles shield against flying sparks/grinding', '15 minutes continuous cold eyewash', 'Never rub eyes after splash'],
    },
    slides: [
      {
        id: 'ppe-full-1',
        title: {
          mr: 'स्टील-टो बूट व डोळ्यांचे संरक्षण',
          hi: 'स्टील-टो जूते और आंखों की सुरक्षा',
          en: 'Feet & Eyes Full Armor',
        },
        caption: {
          mr: 'पायावर २० किलोचा ठोकळा पडला तरी स्टील-टो बूट बोटे वाचवतात.',
          hi: 'पैरों पर भारी वजन गिरने पर भी स्टील-टो जूते अंगूठे को बचाते हैं।',
          en: 'Steel-toe caps withstand heavy drops; goggles deflect grinding sparks.',
        },
        audioScript: {
          mr: 'नेहमी स्टील टो असलेले मजबूत सुरक्षा बूट घाला जेणेकरून जड वस्तू पडल्यास पायाची बोटे सुरक्षित राहतील. ग्राइंडिंग करताना डोळ्यांसाठी गॉगल वापरा. केमिकल उडाल्यास पिवळ्या आय-वॉश स्टेशनवर जाऊन १५ मिनिटे डोळे धुवा.',
          hi: 'हमेशा स्टील-टो वाले भारी सुरक्षा जूते पहनें ताकि भारी लोहा गिरने पर पैर सुरक्षित रहें। ग्राइंडिंग और वेल्डिंग के समय चश्मा जरूर लगाएं। केमिकल गिरने पर १५ मिनट लगातार आंखें धोएं।',
          en: 'Always wear certified steel-toe boots to protect your toes from crushing loads. Wear impact-resistant goggles when grinding. If chemicals splash, flush at the eyewash station for 15 full minutes.',
        },
        bullets: {
          mr: ['स्टील-टो बूट पाय चिरडण्यापासून वाचवतात', 'ग्राइंडिंग वेळी गॉगल डोळे वाचवतो', 'आवाज जास्त असल्यास इअरप्लग वापरा', 'केमिकल उडाल्यास १५ मिनिटे डोळे धुवा'],
          hi: ['स्टील-टो जूते पैरों को कुचलने से बचाते हैं', 'ग्राइंडिंग में चश्मा आंखें बचाता है', 'भारी शोर में इयरप्लग का उपयोग करें', 'केमिकल गिरने पर १५ मिनट आंख धोएं'],
          en: ['Steel-toe boots prevent crushed feet', 'Goggles stop high-speed metal sparks', 'Use earplugs in high decibel zones', 'Continuous 15-minute eyewash on chemical splash'],
        },
        icon: 'Eye',
        diagramType: 'protective',
      },
    ],
  },
];

export const SAMPLE_QUESTIONS_BY_LANG: Record<Language, string[]> = {
  mr: [
    'मशीन अचानक बंद पडल्यास मी काय करावे?',
    'कारखान्यात आग लागल्यास काय करावे?',
    'सुरक्षा हातमोजे (Gloves) का घालावेत?',
    'त्वचेवर केमिकल किंवा अ‍ॅसिड पडल्यास काय करावे?',
    'माझ्या हातमोज्याला कट झाला आहे, नवीन कुठे मिळतील?',
    'मशीनचा लाल ई-स्टॉप बटन काम करत नसेल तर काय करावे?',
    'LOTO कुलूप लावायची चावी दुसऱ्या सहकाऱ्याला देऊ शकतो का?',
  ],
  hi: [
    'अगर मशीन अचानक रुक जाए तो मुझे क्या करना चाहिए?',
    'कारखाने में आग लगने पर क्या करना चाहिए?',
    'सुरक्षा दस्ताने (Gloves) क्यों पहनने चाहिए?',
    'त्वचा पर केमिकल या एसिड गिर जाए तो क्या करें?',
    'अगर दस्ताने फट जाएं तो नए कहां से मिलेंगे?',
    'मशीन का लाल इमरजेंसी बटन काम न करे तो क्या करें?',
    'क्या LOTO ताले की चाबी दूसरे ऑपरेटर को दे सकते हैं?',
  ],
  en: [
    'What should I do if a machine suddenly stops?',
    'What should I do during a fire?',
    'Why should I wear safety gloves?',
    'What should I do if chemicals touch my skin?',
    'Where can I get replacement safety gloves?',
    'What if the red emergency stop button fails?',
    'Can I hand over my LOTO padlock key to a co-worker?',
  ],
};
