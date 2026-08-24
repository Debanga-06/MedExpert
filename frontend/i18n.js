/* ==========================================================================
   MedExpert — translations (en / hi / bn)
   Static UI copy lives in UI. Backend-sourced strings (symptom labels,
   category names, disease names, rule explanations, safety-trigger
   messages) are translated client-side via lookup tables keyed by the
   stable id/rule_id/exact-string the API returns, so the UI stays in sync
   with whichever language is selected even though the API itself is
   English-only.
   ========================================================================== */

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिंदी" },
  { code: "bn", label: "বাংলা" },
];

export const UI = {
  nav_home: { en: "Home", hi: "होम", bn: "হোম" },
  nav_assess: { en: "Assessment", hi: "मूल्यांकन", bn: "মূল্যায়ন" },
  nav_how: { en: "How it works", hi: "यह कैसे काम करता है", bn: "এটি কীভাবে কাজ করে" },
  nav_about: { en: "About", hi: "परिचय", bn: "সম্পর্কে" },

  eyebrow_home: {
    en: "RULE-BASED EXPERT SYSTEM · EDUCATIONAL DEMO",
    hi: "नियम-आधारित एक्सपर्ट सिस्टम · शैक्षिक डेमो",
    bn: "নিয়ম-ভিত্তিক এক্সপার্ট সিস্টেম · শিক্ষামূলক ডেমো",
  },
  hero_title_html: {
    en: `A machine that shows<br class="br-desktop" /> its <span class="accent-grad">reasoning</span>.`,
    hi: `एक मशीन जो दिखाती है<br class="br-desktop" /> अपनी <span class="accent-grad">तर्क-प्रक्रिया</span>।`,
    bn: `একটি যন্ত্র যা দেখায়<br class="br-desktop" /> তার <span class="accent-grad">যুক্তি</span>।`,
  },
  hero_sub: {
    en: "MedExpert turns selected symptoms into facts, weighs them against a transparent knowledge base of IF-THEN rules, and ranks possible conditions — explaining exactly which rule fired and why. No black box. No confirmed diagnosis.",
    hi: "मेडएक्सपर्ट चुने गए लक्षणों को तथ्यों में बदलता है, उन्हें IF-THEN नियमों के एक पारदर्शी ज्ञान आधार के विरुद्ध तौलता है, और संभावित स्थितियों को क्रमबद्ध करता है — यह बताते हुए कि कौन-सा नियम सक्रिय हुआ और क्यों। कोई ब्लैक बॉक्स नहीं। कोई पक्का निदान नहीं।",
    bn: "মেডএক্সপার্ট নির্বাচিত লক্ষণগুলোকে তথ্যে রূপান্তরিত করে, সেগুলোকে IF-THEN নিয়মের একটি স্বচ্ছ জ্ঞানভান্ডারের বিপরীতে যাচাই করে, এবং সম্ভাব্য অবস্থাগুলোকে র‍্যাঙ্ক করে — ঠিক কোন নিয়ম সক্রিয় হয়েছে এবং কেন তা ব্যাখ্যা করে। কোনো ব্ল্যাক বক্স নেই। কোনো নিশ্চিত রোগনির্ণয় নেই।",
  },
  btn_begin: { en: "Begin assessment", hi: "मूल्यांकन शुरू करें", bn: "মূল্যায়ন শুরু করুন" },
  btn_how: { en: "See how it reasons", hi: "देखें यह कैसे तर्क करता है", bn: "এটি কীভাবে যুক্তি দেয় দেখুন" },
  stat_symptoms_label: { en: "symptom facts", hi: "लक्षण तथ्य", bn: "লক্ষণ তথ্য" },
  stat_conditions_label: { en: "conditions modeled", hi: "मॉडल की गई स्थितियां", bn: "মডেল করা অবস্থা" },
  stat_ml_label: { en: "machine learning used", hi: "मशीन लर्निंग का उपयोग", bn: "ব্যবহৃত মেশিন লার্নিং" },
  scroll_cue: { en: "reasoning core online", hi: "रीज़निंग कोर ऑनलाइन", bn: "রিজনিং কোর অনলাইন" },

  eyebrow_assess: { en: "STEP 01 · SELECT SYMPTOMS", hi: "चरण 01 · लक्षण चुनें", bn: "ধাপ ০১ · লক্ষণ নির্বাচন করুন" },
  assess_title: { en: "Feed the knowledge base its facts.", hi: "ज्ञान आधार को उसके तथ्य दें।", bn: "জ্ঞানভান্ডারকে তার তথ্য দিন।" },
  assess_sub: {
    en: "Choose everything that applies. Each selection becomes a fact the inference engine evaluates against every rule.",
    hi: "जो भी लागू हो उसे चुनें। हर चयन एक तथ्य बन जाता है जिसका मूल्यांकन इन्फरेंस इंजन हर नियम के विरुद्ध करता है।",
    bn: "যা প্রযোজ্য তা নির্বাচন করুন। প্রতিটি নির্বাচন একটি তথ্যে পরিণত হয় যা ইনফারেন্স ইঞ্জিন প্রতিটি নিয়মের বিপরীতে যাচাই করে।",
  },
  search_placeholder: {
    en: "Search symptoms — e.g. cough, fatigue, thirst…",
    hi: "लक्षण खोजें — जैसे खांसी, थकान, प्यास…",
    bn: "লক্ষণ খুঁজুন — যেমন কাশি, ক্লান্তি, তৃষ্ণা…",
  },
  symptom_empty: { en: "No symptoms match your search.", hi: "आपकी खोज से कोई लक्षण मेल नहीं खाता।", bn: "আপনার অনুসন্ধানের সাথে কোনো লক্ষণ মেলেনি।" },
  category_all: { en: "All", hi: "सभी", bn: "সব" },
  selection_suffix: { en: "symptom(s) selected", hi: "लक्षण चुने गए", bn: "লক্ষণ নির্বাচিত" },
  btn_run_inference: { en: "Run inference", hi: "इन्फरेंस चलाएं", bn: "ইনফারেন্স চালান" },

  eyebrow_results: { en: "STEP 02 · INFERENCE OUTPUT", hi: "चरण 02 · इन्फरेंस परिणाम", bn: "ধাপ ০২ · ইনফারেন্স ফলাফল" },
  results_heading_default: { en: "Reading the rule matches.", hi: "नियम मेल पढ़े जा रहे हैं।", bn: "নিয়ম মিল পড়া হচ্ছে।" },
  results_sub_default: {
    en: "Ranked by rule-match score — a measure of overlap with the knowledge base, not a medical probability.",
    hi: "रूल-मैच स्कोर के अनुसार क्रमबद्ध — यह ज्ञान आधार के साथ मेल की माप है, चिकित्सीय संभावना नहीं।",
    bn: "রুল-ম্যাচ স্কোর অনুযায়ী র‍্যাঙ্ক করা — এটি জ্ঞানভান্ডারের সাথে মিলের একটি পরিমাপ, চিকিৎসাগত সম্ভাবনা নয়।",
  },
  results_heading_none: { en: "No sufficiently matching condition found.", hi: "कोई पर्याप्त मेल खाने वाली स्थिति नहीं मिली।", bn: "যথেষ্ট মিলযুক্ত কোনো অবস্থা পাওয়া যায়নি।" },
  results_sub_none: {
    en: "This does not mean you're healthy. Please consult a healthcare professional if symptoms persist.",
    hi: "इसका मतलब यह नहीं कि आप स्वस्थ हैं। यदि लक्षण बने रहें तो कृपया किसी स्वास्थ्य विशेषज्ञ से परामर्श करें।",
    bn: "এর অর্থ এই নয় যে আপনি সুস্থ। লক্ষণ অব্যাহত থাকলে অনুগ্রহ করে একজন স্বাস্থ্যসেবা পেশাদারের পরামর্শ নিন।",
  },
  result_score_label: { en: "Rule-match score", hi: "रूल-मैच स्कोर", bn: "রুল-ম্যাচ স্কোর" },
  next_steps_label: { en: "General self-care pointers — not a treatment plan", hi: "सामान्य स्व-देखभाल सुझाव — कोई उपचार योजना नहीं", bn: "সাধারণ স্ব-যত্ন পরামর্শ — কোনো চিকিৎসা পরিকল্পনা নয়" },
  seek_care_label: { en: "See a doctor promptly if", hi: "तुरंत डॉक्टर से मिलें यदि", bn: "অবিলম্বে ডাক্তার দেখান যদি" },
  btn_adjust: { en: "← Adjust symptoms", hi: "← लक्षण समायोजित करें", bn: "← লক্ষণ সামঞ্জস্য করুন" },
  btn_restart: { en: "Start new assessment", hi: "नया मूल्यांकन शुरू करें", bn: "নতুন মূল্যায়ন শুরু করুন" },
  results_empty_title: { en: "No rule fired strongly enough.", hi: "कोई नियम पर्याप्त मजबूती से सक्रिय नहीं हुआ।", bn: "কোনো নিয়ম যথেষ্ট শক্তিশালীভাবে সক্রিয় হয়নি।" },
  results_empty_body: {
    en: "Try adding more symptoms, or adjust your selection — the knowledge base needs a stronger overlap to surface a candidate.",
    hi: "अधिक लक्षण जोड़ने का प्रयास करें, या अपना चयन समायोजित करें — किसी परिणाम को सामने लाने के लिए ज्ञान आधार को अधिक मजबूत मेल की आवश्यकता है।",
    bn: "আরও লক্ষণ যোগ করার চেষ্টা করুন, বা আপনার নির্বাচন সামঞ্জস্য করুন — একটি ফলাফল সামনে আনতে জ্ঞানভান্ডারের আরও শক্তিশালী মিল প্রয়োজন।",
  },

  eyebrow_how: { en: "METHODOLOGY", hi: "पद्धति", bn: "পদ্ধতি" },
  how_title: { en: "Facts in. Explanation out.", hi: "तथ्य अंदर। व्याख्या बाहर।", bn: "তথ্য প্রবেশ। ব্যাখ্যা বাহির।" },
  how_sub: {
    en: "Five deterministic stages — no training data, no hidden weights beyond what's listed here.",
    hi: "पांच निश्चित चरण — कोई प्रशिक्षण डेटा नहीं, यहां सूचीबद्ध के अलावा कोई छिपा हुआ वेट नहीं।",
    bn: "পাঁচটি নির্ধারক ধাপ — কোনো প্রশিক্ষণ ডেটা নেই, এখানে তালিকাভুক্ত ছাড়া কোনো লুকানো ওজন নেই।",
  },
  pipe1_title: { en: "Symptoms", hi: "लक्षण", bn: "লক্ষণ" },
  pipe1_body: {
    en: "You select what you're experiencing from a fixed, defined list — nothing free-text, nothing ambiguous.",
    hi: "आप एक निश्चित, परिभाषित सूची में से चुनते हैं कि आप क्या अनुभव कर रहे हैं — कोई फ्री-टेक्स्ट नहीं, कोई अस्पष्टता नहीं।",
    bn: "আপনি একটি নির্দিষ্ট, সংজ্ঞায়িত তালিকা থেকে বেছে নেন আপনি কী অনুভব করছেন — কোনো মুক্ত-লেখা নেই, কোনো অস্পষ্টতা নেই।",
  },
  pipe2_title: { en: "Facts", hi: "तथ्य", bn: "তথ্য" },
  pipe2_body: {
    en: "Each selection is converted into a discrete fact — fever = true — that the engine can reason over.",
    hi: "हर चयन एक अलग तथ्य में बदल जाता है — fever = true — जिस पर इंजन तर्क कर सकता है।",
    bn: "প্রতিটি নির্বাচন একটি পৃথক তথ্যে রূপান্তরিত হয় — fever = true — যার উপর ইঞ্জিন যুক্তি করতে পারে।",
  },
  pipe3_title: { en: "Knowledge base", hi: "ज्ञान आधार", bn: "জ্ঞানভান্ডার" },
  pipe3_body: {
    en: 'Every disease is a hand-written rule: required "core" symptoms, optional supporting symptoms, and a weight.',
    hi: 'हर बीमारी एक हाथ से लिखा नियम है: आवश्यक "कोर" लक्षण, वैकल्पिक सहायक लक्षण, और एक वेट।',
    bn: 'প্রতিটি রোগ একটি হাতে-লেখা নিয়ম: প্রয়োজনীয় "কোর" লক্ষণ, ঐচ্ছিক সহায়ক লক্ষণ, এবং একটি ওজন।',
  },
  pipe4_title: { en: "Forward-chaining engine", hi: "फॉरवर्ड-चेनिंग इंजन", bn: "ফরওয়ার্ড-চেইনিং ইঞ্জিন" },
  pipe4_body: {
    en: 'Facts are matched against every rule. A rule "fires" the moment at least one of its core facts is present.',
    hi: 'तथ्यों का मिलान हर नियम से किया जाता है। जैसे ही किसी नियम का कम से कम एक कोर तथ्य मौजूद होता है, वह नियम "सक्रिय" हो जाता है।',
    bn: 'তথ্যগুলো প্রতিটি নিয়মের সাথে মেলানো হয়। যখনই একটি নিয়মের অন্তত একটি কোর তথ্য উপস্থিত থাকে, তখনই সেই নিয়ম "সক্রিয়" হয়।',
  },
  pipe5_title: { en: "Ranked, explained result", hi: "क्रमबद्ध, व्याख्यायित परिणाम", bn: "র‍্যাঙ্ক করা, ব্যাখ্যাযুক্ত ফলাফল" },
  pipe5_body: {
    en: "Matched weight ÷ maximum weight = rule-match score. Every result names the exact rule that produced it.",
    hi: "मैच किया गया वेट ÷ अधिकतम वेट = रूल-मैच स्कोर। हर परिणाम उस सटीक नियम का नाम बताता है जिसने इसे उत्पन्न किया।",
    bn: "মিলিত ওজন ÷ সর্বোচ্চ ওজন = রুল-ম্যাচ স্কোর। প্রতিটি ফলাফল সেই সঠিক নিয়মের নাম বলে যা এটি তৈরি করেছে।",
  },
  example_rule_label: { en: "Example rule", hi: "उदाहरण नियम", bn: "উদাহরণ নিয়ম" },

  eyebrow_about: { en: "ABOUT THIS PROJECT", hi: "इस प्रोजेक्ट के बारे में", bn: "এই প্রকল্প সম্পর্কে" },
  about_title: { en: "An expert system, built to be inspected.", hi: "एक एक्सपर्ट सिस्टम, जांचे जाने के लिए बनाया गया।", bn: "একটি এক্সপার্ট সিস্টেম, পরিদর্শনের জন্য তৈরি।" },
  about1_title: { en: "Objective", hi: "उद्देश्य", bn: "উদ্দেশ্য" },
  about1_body: {
    en: "Demonstrate a traditional rule-based AI expert system — knowledge representation, forward-chaining inference, and explainable output — as a learning project, not a clinical tool.",
    hi: "एक पारंपरिक नियम-आधारित AI एक्सपर्ट सिस्टम प्रदर्शित करना — ज्ञान प्रतिनिधित्व, फॉरवर्ड-चेनिंग इन्फरेंस, और व्याख्यायित आउटपुट — एक सीखने की परियोजना के रूप में, न कि एक क्लिनिकल टूल के रूप में।",
    bn: "একটি প্রথাগত নিয়ম-ভিত্তিক AI এক্সপার্ট সিস্টেম প্রদর্শন করা — জ্ঞান উপস্থাপনা, ফরওয়ার্ড-চেইনিং ইনফারেন্স, এবং ব্যাখ্যাযোগ্য আউটপুট — একটি শেখার প্রকল্প হিসেবে, ক্লিনিক্যাল টুল হিসেবে নয়।",
  },
  about2_title: { en: "Stack", hi: "तकनीकी स्टैक", bn: "প্রযুক্তি স্ট্যাক" },
  about2_items: {
    en: ["Frontend — HTML / CSS / JS, WebGL via three.js", "Backend — Python, FastAPI, Pydantic", "Reasoning — custom forward-chaining rule engine", "Interface — REST API + CLI"],
    hi: ["फ्रंटएंड — HTML / CSS / JS, three.js के माध्यम से WebGL", "बैकएंड — Python, FastAPI, Pydantic", "रीज़निंग — कस्टम फॉरवर्ड-चेनिंग रूल इंजन", "इंटरफ़ेस — REST API + CLI"],
    bn: ["ফ্রন্টএন্ড — HTML / CSS / JS, three.js এর মাধ্যমে WebGL", "ব্যাকএন্ড — Python, FastAPI, Pydantic", "রিজনিং — কাস্টম ফরওয়ার্ড-চেইনিং রুল ইঞ্জিন", "ইন্টারফেস — REST API + CLI"],
  },
  about3_title: { en: "What this is not", hi: "यह क्या नहीं है", bn: "এটি যা নয়" },
  team_title: { en: "Team", hi: "टीम", bn: "টিম" },
  about3_body: {
    en: "Not a diagnostic tool, not trained on patient data, not reviewed by a clinician, and not a replacement for professional medical advice at any point in the flow.",
    hi: "यह कोई डायग्नोस्टिक टूल नहीं है, यह मरीज़ों के डेटा पर प्रशिक्षित नहीं है, किसी चिकित्सक द्वारा समीक्षित नहीं है, और प्रक्रिया के किसी भी चरण में पेशेवर चिकित्सीय सलाह का विकल्प नहीं है।",
    bn: "এটি কোনো ডায়াগনস্টিক টুল নয়, রোগীর তথ্যের উপর প্রশিক্ষিত নয়, কোনো চিকিৎসক দ্বারা পর্যালোচিত নয়, এবং প্রক্রিয়ার কোনো পর্যায়ে পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।",
  },
  disclaimer_heading: { en: "Medical disclaimer", hi: "चिकित्सा अस्वीकरण", bn: "চিকিৎসা দাবিত্যাগ" },
  disclaimer_body: {
    en: "MedExpert is an educational AI project. Results are generated using predefined rules and rule-match scores, and should never be treated as a medical diagnosis. Please consult a qualified healthcare professional for medical advice.",
    hi: "मेडएक्सपर्ट एक शैक्षिक AI परियोजना है। परिणाम पूर्वनिर्धारित नियमों और रूल-मैच स्कोर का उपयोग करके उत्पन्न किए जाते हैं, और इन्हें कभी भी चिकित्सा निदान के रूप में नहीं माना जाना चाहिए। कृपया चिकित्सीय सलाह के लिए किसी योग्य स्वास्थ्य विशेषज्ञ से परामर्श करें।",
    bn: "মেডএক্সপার্ট একটি শিক্ষামূলক AI প্রকল্প। ফলাফলগুলি পূর্বনির্ধারিত নিয়ম এবং রুল-ম্যাচ স্কোর ব্যবহার করে তৈরি করা হয়, এবং এগুলিকে কখনোই চিকিৎসা নির্ণয় হিসেবে বিবেচনা করা উচিত নয়। চিকিৎসা পরামর্শের জন্য অনুগ্রহ করে একজন যোগ্য স্বাস্থ্যসেবা পেশাদারের পরামর্শ নিন।",
  },
  footer_disclaimer: {
    en: "Educational demo only — not medical advice. Rule-match scores are not clinical probabilities.",
    hi: "केवल शैक्षिक डेमो — चिकित्सीय सलाह नहीं। रूल-मैच स्कोर क्लिनिकल संभावनाएं नहीं हैं।",
    bn: "শুধুমাত্র শিক্ষামূলক ডেমো — চিকিৎসা পরামর্শ নয়। রুল-ম্যাচ স্কোর ক্লিনিক্যাল সম্ভাবনা নয়।",
  },

  engine_idle: { en: "engine idle", hi: "इंजन निष्क्रिय", bn: "ইঞ্জিন নিষ্ক্রিয়" },
  engine_thinking: { en: "engine reasoning…", hi: "इंजन तर्क कर रहा है…", bn: "ইঞ্জিন যুক্তি করছে…" },
  engine_priority: { en: "priority signal detected", hi: "प्राथमिकता संकेत मिला", bn: "অগ্রাধিকার সংকেত সনাক্ত হয়েছে" },
  engine_advisory: { en: "advisory signal detected", hi: "सलाहकार संकेत मिला", bn: "পরামর্শমূলক সংকেত সনাক্ত হয়েছে" },

  safety_info: { en: "info", hi: "जानकारी", bn: "তথ্য" },
  safety_warning: { en: "warning", hi: "चेतावनी", bn: "সতর্কতা" },
  safety_emergency: { en: "emergency", hi: "आपातकाल", bn: "জরুরি" },

  toast_offline: {
    en: "Can't reach the reasoning engine at {base} — showing a local preview. Start the backend to run real inference.",
    hi: "{base} पर रीज़निंग इंजन तक नहीं पहुंचा जा सका — स्थानीय पूर्वावलोकन दिखाया जा रहा है। वास्तविक विश्लेषण के लिए बैकएंड शुरू करें।",
    bn: "{base}-এ রিজনিং ইঞ্জিনে পৌঁছানো যায়নি — একটি স্থানীয় প্রিভিউ দেখানো হচ্ছে। প্রকৃত বিশ্লেষণ চালাতে ব্যাকএন্ড চালু করুন।",
  },
  toast_fetch_error: {
    en: "Couldn't reach the reasoning engine: {msg}. Is the backend running at {base}?",
    hi: "रीज़निंग इंजन तक नहीं पहुंचा जा सका: {msg}। क्या बैकएंड {base} पर चल रहा है?",
    bn: "রিজনিং ইঞ্জিনে পৌঁছানো যায়নি: {msg}। ব্যাকএন্ড কি {base}-এ চলছে?",
  },
};

export const CATEGORY_LABELS = {
  General: { en: "General", hi: "सामान्य", bn: "সাধারণ" },
  Respiratory: { en: "Respiratory", hi: "श्वसन संबंधी", bn: "শ্বাসযন্ত্র" },
  Neurological: { en: "Neurological", hi: "तंत्रिका संबंधी", bn: "স্নায়বিক" },
  Allergy: { en: "Allergy", hi: "एलर्जी", bn: "অ্যালার্জি" },
  Digestive: { en: "Digestive", hi: "पाचन संबंधी", bn: "পাচনতন্ত্র" },
  Metabolic: { en: "Metabolic", hi: "चयापचय संबंधी", bn: "বিপাকীয়" },
};

export const SYMPTOM_LABELS = {
  fever: { en: "Fever", hi: "बुखार", bn: "জ্বর" },
  chills: { en: "Chills", hi: "ठंड लगना", bn: "ঠান্ডা লাগা" },
  fatigue: { en: "Fatigue", hi: "थकान", bn: "ক্লান্তি" },
  body_pain: { en: "Body pain", hi: "शरीर में दर्द", bn: "শরীরে ব্যথা" },
  muscle_ache: { en: "Muscle ache", hi: "मांसपेशियों में दर्द", bn: "পেশীতে ব্যথা" },
  sweating: { en: "Excess sweating", hi: "अत्यधिक पसीना", bn: "অতিরিক্ত ঘাম" },
  rapid_heartbeat: { en: "Rapid heartbeat", hi: "तेज़ धड़कन", bn: "দ্রুত হৃদস্পন্দন" },
  headache: { en: "Headache", hi: "सिरदर्द", bn: "মাথাব্যথা" },
  light_sensitivity: { en: "Sensitivity to light", hi: "रोशनी के प्रति संवेदनशीलता", bn: "আলোর প্রতি সংবেদনশীলতা" },
  sound_sensitivity: { en: "Sensitivity to sound", hi: "आवाज़ के प्रति संवेदनशीलता", bn: "শব্দের প্রতি সংবেদনশীলতা" },
  dizziness: { en: "Dizziness", hi: "चक्कर आना", bn: "মাথা ঘোরা" },
  blurred_vision: { en: "Blurred vision", hi: "धुंधला दिखना", bn: "ঝাপসা দেখা" },
  cough: { en: "Cough", hi: "खांसी", bn: "কাশি" },
  sore_throat: { en: "Sore throat", hi: "गले में खराश", bn: "গলা ব্যথা" },
  sneezing: { en: "Sneezing", hi: "छींक आना", bn: "হাঁচি" },
  runny_nose: { en: "Runny nose", hi: "नाक बहना", bn: "নাক দিয়ে পানি পড়া" },
  nasal_congestion: { en: "Nasal congestion", hi: "नाक बंद होना", bn: "নাক বন্ধ হওয়া" },
  wheezing: { en: "Wheezing", hi: "सांस लेते समय सीटी जैसी आवाज़", bn: "শ্বাসের সময় শিসের মতো শব্দ" },
  shortness_of_breath: { en: "Shortness of breath", hi: "सांस फूलना", bn: "শ্বাসকষ্ট" },
  chest_discomfort: { en: "Chest discomfort", hi: "छाती में असहजता", bn: "বুকে অস্বস্তি" },
  chest_pain: { en: "Chest pain", hi: "छाती में दर्द", bn: "বুকে ব্যথা" },
  itchy_eyes: { en: "Itchy eyes", hi: "आंखों में खुजली", bn: "চোখে চুলকানি" },
  watery_eyes: { en: "Watery eyes", hi: "आंखों से पानी आना", bn: "চোখ দিয়ে পানি পড়া" },
  nausea: { en: "Nausea", hi: "जी मिचलाना", bn: "বমি বমি ভাব" },
  vomiting: { en: "Vomiting", hi: "उल्टी", bn: "বমি" },
  diarrhea: { en: "Diarrhea", hi: "दस्त", bn: "ডায়রিয়া" },
  abdominal_pain: { en: "Abdominal pain", hi: "पेट में दर्द", bn: "পেটে ব্যথা" },
  loss_of_appetite: { en: "Loss of appetite", hi: "भूख न लगना", bn: "ক্ষুধামন্দা" },
  dry_mouth: { en: "Dry mouth", hi: "मुंह सूखना", bn: "মুখ শুকিয়ে যাওয়া" },
  increased_thirst: { en: "Increased thirst", hi: "अत्यधिक प्यास", bn: "অতিরিক্ত তৃষ্ণা" },
  frequent_urination: { en: "Frequent urination", hi: "बार-बार पेशाब आना", bn: "ঘন ঘন প্রস্রাব" },
  dark_urine: { en: "Dark urine", hi: "गहरे रंग का पेशाब", bn: "গাঢ় রঙের প্রস্রাব" },
  unexplained_weight_loss: { en: "Unexplained weight loss", hi: "अस्पष्ट वजन कम होना", bn: "অব্যাখ্যাত ওজন হ্রাস" },
};

// Keyed by the exact English disease name the API returns.
export const DISEASE_LABELS = {
  "Influenza": { hi: "इन्फ्लुएंजा", bn: "ইনফ্লুয়েঞ্জা" },
  "Common Cold": { hi: "सामान्य जुकाम", bn: "সাধারণ সর্দি" },
  "Possible Viral Infection": { hi: "संभावित वायरल संक्रमण", bn: "সম্ভাব্য ভাইরাল সংক্রমণ" },
  "Asthma": { hi: "अस्थमा", bn: "হাঁপানি" },
  "Possible Respiratory Infection": { hi: "संभावित श्वसन संक्रमण", bn: "সম্ভাব্য শ্বাসযন্ত্রের সংক্রমণ" },
  "Migraine": { hi: "माइग्रेन", bn: "মাইগ্রেন" },
  "Gastroenteritis": { hi: "गैस्ट्रोएंटेराइटिस", bn: "গ্যাস্ট্রোএন্টেরাইটিস" },
  "Allergic Rhinitis": { hi: "एलर्जिक राइनाइटिस", bn: "অ্যালার্জিক রাইনাইটিস" },
  "Dehydration": { hi: "निर्जलीकरण", bn: "পানিশূন্যতা" },
  "Possible Diabetes-Related Symptoms": { hi: "मधुमेह से संबंधित संभावित लक्षण", bn: "সম্ভাব্য ডায়াবেটিস-সম্পর্কিত লক্ষণ" },
  "Possible Cardiac Concern": { hi: "संभावित हृदय संबंधी चिंता", bn: "সম্ভাব্য হৃদযন্ত্রের সমস্যা" },
};

// Keyed by rule_id, which is stable regardless of language.
export const RULE_EXPLANATIONS = {
  R001: { hi: "बुखार, खांसी और थकान का संयोजन इन्फ्लुएंजा जैसे लक्षणों का एक विशिष्ट पैटर्न है।", bn: "জ্বর, কাশি এবং ক্লান্তির সংমিশ্রণ ইনফ্লুয়েঞ্জার মতো একটি সাধারণ লক্ষণ।" },
  R002: { hi: "बिना तेज़ बुखार के छींक, बहती नाक और गले में खराश सामान्य जुकाम की ओर इशारा करते हैं।", bn: "তীব্র জ্বর ছাড়া হাঁচি, সর্দি এবং গলা ব্যথা সাধারণ সর্দির লক্ষণ।" },
  R003: { hi: "बुखार और थकान का व्यापक पैटर्न सामान्य वायरल बीमारी के अनुरूप है।", bn: "জ্বর ও ক্লান্তির বিস্তৃত ধরণ সাধারণ ভাইরাল অসুস্থতার সাথে সামঞ্জস্যপূর্ণ।" },
  R004: { hi: "सांस फूलने के साथ सीटी जैसी आवाज़ अस्थमा जैसी वायुमार्ग संकुचन की विशेषता है।", bn: "শ্বাসকষ্টের সাথে শিসের মতো শব্দ হাঁপানির মতো শ্বাসনালী সংকোচনের বৈশিষ্ট্য।" },
  R005: { hi: "लगातार खांसी के साथ छाती में असहजता निचले श्वसन संक्रमण का संकेत हो सकती है।", bn: "ক্রমাগত কাশির সাথে বুকে অস্বস্তি নিম্ন শ্বাসযন্ত্রের সংক্রমণের ইঙ্গিত দিতে পারে।" },
  R006: { hi: "सिरदर्द के साथ रोशनी या आवाज़ के प्रति संवेदनशीलता माइग्रेन का सामान्य पैटर्न है।", bn: "মাথাব্যথার সাথে আলো বা শব্দের প্রতি সংবেদনশীলতা মাইগ্রেনের সাধারণ লক্ষণ।" },
  R007: { hi: "जी मिचलाना, उल्टी और दस्त एक साथ पाचन तंत्र में सूजन की ओर इशारा करते हैं।", bn: "বমি বমি ভাব, বমি এবং ডায়রিয়া একসাথে পাচনতন্ত্রের প্রদাহের ইঙ্গিত দেয়।" },
  R008: { hi: "बिना बुखार के छींक के साथ आंखों में खुजली और पानी आना एलर्जी प्रतिक्रिया का सामान्य लक्षण है।", bn: "জ্বর ছাড়া হাঁচির সাথে চোখ চুলকানো ও পানি পড়া অ্যালার্জির সাধারণ লক্ষণ।" },
  R009: { hi: "मुंह सूखना, प्यास और चक्कर आना एक साथ शरीर में तरल पदार्थ की कमी का संकेत देते हैं।", bn: "মুখ শুকিয়ে যাওয়া, তৃষ্ণা এবং মাথা ঘোরা একসাথে শরীরে তরলের ঘাটতির ইঙ্গিত দেয়।" },
  R010: { hi: "लगातार प्यास और बार-बार पेशाब आना ऐसे लक्षण हैं जिन पर डॉक्टर से चर्चा करनी चाहिए; यह स्वयं में निदान नहीं है।", bn: "ক্রমাগত তৃষ্ণা এবং ঘন ঘন প্রস্রাব এমন লক্ষণ যা একজন চিকিৎসকের সাথে আলোচনা করা উচিত; এটি নিজে থেকে কোনো নির্ণয় নয়।" },
  R011: { hi: "छाती में दर्द के साथ सांस फूलना एक ऐसा पैटर्न है जिसके लिए हमेशा तत्काल जांच आवश्यक है।", bn: "বুকে ব্যথার সাথে শ্বাসকষ্ট এমন একটি লক্ষণ যার জন্য সর্বদা জরুরি চিকিৎসা মূল্যায়ন প্রয়োজন।" },
};

// Keyed by the exact English message the backend's safety triggers send.
export const WARNING_TRANSLATIONS = {
  "Chest pain with shortness of breath can indicate a medical emergency. Please seek urgent medical attention or contact emergency services.": {
    hi: "छाती में दर्द के साथ सांस फूलना एक मेडिकल इमरजेंसी का संकेत हो सकता है। कृपया तुरंत चिकित्सा सहायता लें या आपातकालीन सेवाओं से संपर्क करें।",
    bn: "বুকে ব্যথার সাথে শ্বাসকষ্ট একটি চিকিৎসা জরুরি অবস্থার ইঙ্গিত দিতে পারে। অনুগ্রহ করে অবিলম্বে চিকিৎসা সহায়তা নিন বা জরুরি পরিষেবায় যোগাযোগ করুন।",
  },
  "Wheezing with shortness of breath may require prompt medical attention, especially if it worsens or does not improve.": {
    hi: "सांस फूलने के साथ सीटी जैसी आवाज़ के लिए तुरंत चिकित्सा सहायता की आवश्यकता हो सकती है, खासकर अगर यह बिगड़ रहा हो या सुधर न रहा हो।",
    bn: "শ্বাসকষ্টের সাথে শিসের মতো শব্দের জন্য দ্রুত চিকিৎসা সহায়তা প্রয়োজন হতে পারে, বিশেষত যদি এটি খারাপ হয় বা উন্নতি না হয়।",
  },
  "Vomiting combined with diarrhea can cause rapid dehydration. Seek medical advice if symptoms are severe or persistent.": {
    hi: "उल्टी और दस्त एक साथ होने से तेज़ी से निर्जलीकरण हो सकता है। यदि लक्षण गंभीर हों या बने रहें तो चिकित्सीय सलाह लें।",
    bn: "বমি এবং ডায়রিয়া একসাথে হলে দ্রুত পানিশূন্যতা হতে পারে। লক্ষণ গুরুতর বা দীর্ঘস্থায়ী হলে চিকিৎসা পরামর্শ নিন।",
  },
};

// Keyed by rule_id — general self-care pointers and red-flag "seek care" signs.
// Array order must match backend/app/knowledge_base.py's care_tips/seek_care tuples.
export const CARE_TIPS = {
  R001: {
    hi: ["आराम करें और नींद को प्राथमिकता दें", "नियमित रूप से तरल पदार्थ पिएं", "दिन में दो बार तापमान जांचें"],
    bn: ["বিশ্রাম নিন এবং ঘুমকে অগ্রাধিকার দিন", "নিয়মিত তরল পান করুন", "দিনে দুবার তাপমাত্রা পরীক্ষা করুন"],
  },
  R002: {
    hi: ["आराम करें और हाइड्रेटेड रहें", "गले के लिए गुनगुने नमक के पानी से गरारे करें", "ह्यूमिडिफायर या भाप का उपयोग करें"],
    bn: ["বিশ্রাম নিন ও পর্যাপ্ত তরল পান করুন", "গলার জন্য উষ্ণ লবণ পানিতে গার্গল করুন", "হিউমিডিফায়ার বা ভাপ ব্যবহার করুন"],
  },
  R003: {
    hi: ["जितना हो सके आराम करें", "तरल पदार्थ का सेवन नियमित रखें", "रोज़ाना तापमान जांचें"],
    bn: ["যতটা সম্ভব বিশ্রাম নিন", "তরল গ্রহণ নিয়মিত রাখুন", "প্রতিদিন তাপমাত্রা পর্যবেক্ষণ করুন"],
  },
  R004: {
    hi: ["ज्ञात ट्रिगर्स से बचें (धुआं, धूल, ठंडी हवा)", "निर्धारित इनहेलर हाथ के पास रखें", "सीधे बैठें और धीरे-धीरे सांस लें"],
    bn: ["পরিচিত ট্রিগার এড়িয়ে চলুন (ধোঁয়া, ধুলো, ঠান্ডা বাতাস)", "নির্ধারিত ইনহেলার কাছে রাখুন", "সোজা হয়ে বসুন এবং ধীরে শ্বাস নিন"],
  },
  R005: {
    hi: ["आराम करें और हाइड्रेटेड रहें", "अपनी सांस की दर पर नज़र रखें", "धुएं और परेशान करने वाली चीज़ों से बचें"],
    bn: ["বিশ্রাম নিন ও পর্যাপ্ত তরল পান করুন", "শ্বাসের হার পর্যবেক্ষণ করুন", "ধোঁয়া ও জ্বালাময় পদার্থ এড়িয়ে চলুন"],
  },
  R006: {
    hi: ["शांत, अंधेरे कमरे में आराम करें", "हाइड्रेटेड रहें", "संभावित ट्रिगर्स नोट करें (नींद, भोजन, तनाव)"],
    bn: ["শান্ত, অন্ধকার ঘরে বিশ্রাম নিন", "পর্যাপ্ত তরল পান করুন", "সম্ভাব্য ট্রিগার লক্ষ্য করুন (ঘুম, খাবার, মানসিক চাপ)"],
  },
  R007: {
    hi: ["ओरल रीहाइड्रेशन घोल या पानी बार-बार पिएं", "सहन होने पर हल्का भोजन लें", "आराम करें और डेयरी/तली-भुनी चीज़ों से बचें"],
    bn: ["ওরাল রিহাইড্রেশন সলিউশন বা পানি ঘন ঘন পান করুন", "সহ্য হলে হালকা খাবার খান", "বিশ্রাম নিন এবং দুগ্ধজাত/তৈলাক্ত খাবার এড়িয়ে চলুন"],
  },
  R008: {
    hi: ["संभावित एलर्जन की पहचान कर उससे बचें", "ज़्यादा पराग वाले दिनों में खिड़कियां बंद रखें", "आंखें/नाक साफ पानी से धोएं"],
    bn: ["সম্ভাব্য অ্যালার্জেন চিহ্নিত করে এড়িয়ে চলুন", "উচ্চ পরাগ দিনে জানালা বন্ধ রাখুন", "চোখ/নাক পরিষ্কার পানি দিয়ে ধুয়ে নিন"],
  },
  R009: {
    hi: ["तरल पदार्थ और इलेक्ट्रोलाइट का सेवन बढ़ाएं", "ठंडी, छायादार जगह पर आराम करें", "अभी कैफीन और शराब से बचें"],
    bn: ["তরল ও ইলেকট্রোলাইট গ্রহণ বাড়ান", "ঠান্ডা, ছায়াযুক্ত জায়গায় বিশ্রাম নিন", "আপাতত ক্যাফেইন ও অ্যালকোহল এড়িয়ে চলুন"],
  },
  R010: {
    hi: ["लक्षण कब शुरू हुए और कितनी बार होते हैं, नोट करें", "तरल सेवन और पेशाब का सरल रिकॉर्ड रखें", "स्वयं निदान या स्वयं दवा लेने से बचें"],
    bn: ["উপসর্গ কখন শুরু হয়েছে ও কতবার হয় তা লক্ষ্য রাখুন", "তরল গ্রহণ ও প্রস্রাবের সহজ রেকর্ড রাখুন", "নিজে নিজে রোগনির্ণয় বা ওষুধ সেবন এড়িয়ে চলুন"],
  },
  R011: {
    hi: ["शारीरिक गतिविधि रोकें और बैठ जाएं", "जितना हो सके शांत रहें", "खुद गाड़ी न चलाएं — किसी और से ले जाने को कहें या मदद बुलाएं"],
    bn: ["শারীরিক কার্যকলাপ বন্ধ করে বসে পড়ুন", "যতটা সম্ভব শান্ত থাকুন", "নিজে গাড়ি চালাবেন না — অন্য কাউকে নিয়ে যেতে বলুন বা সাহায্য ডাকুন"],
  },
};

export const SEEK_CARE = {
  R001: {
    hi: ["बुखार 3–4 दिन से ज़्यादा रहे", "सांस लेने में कठिनाई हो", "लक्षण अचानक बिगड़ जाएं"],
    bn: ["জ্বর ৩-৪ দিনের বেশি স্থায়ী হয়", "শ্বাস নিতে কষ্ট হয়", "উপসর্গ হঠাৎ খারাপ হয়ে যায়"],
  },
  R002: {
    hi: ["लक्षण 10 दिन से ज़्यादा रहें", "तेज़ बुखार हो जाए", "कान या साइनस में दर्द हो"],
    bn: ["উপসর্গ ১০ দিনের বেশি স্থায়ী হয়", "উচ্চ জ্বর দেখা দেয়", "কান বা সাইনাসে ব্যথা হয়"],
  },
  R003: {
    hi: ["लक्षण एक सप्ताह से ज़्यादा बने रहें", "आपको भ्रम या अत्यधिक कमज़ोरी महसूस हो", "बुखार अचानक बढ़ जाए"],
    bn: ["উপসর্গ এক সপ্তাহের বেশি স্থায়ী হয়", "বিভ্রান্তি বা তীব্র দুর্বলতা অনুভব হয়", "জ্বর হঠাৎ বেড়ে যায়"],
  },
  R004: {
    hi: ["सांस लेना काफ़ी मुश्किल हो जाए", "होंठ या उंगलियों के सिरे नीले दिखें", "रेस्क्यू इनहेलर काम न करे"],
    bn: ["শ্বাস নেওয়া উল্লেখযোগ্যভাবে কঠিন হয়ে যায়", "ঠোঁট বা আঙুলের ডগা নীলচে দেখায়", "রেসকিউ ইনহেলার কাজ না করে"],
  },
  R005: {
    hi: ["सांस लेना कठिन हो जाए", "बुखार तेज़ और लगातार बना रहे", "सीने में दर्द शुरू हो जाए"],
    bn: ["শ্বাস নেওয়া কষ্টকর হয়ে যায়", "জ্বর তীব্র ও দীর্ঘস্থায়ী থাকে", "বুকে ব্যথা শুরু হয়"],
  },
  R006: {
    hi: ["यह आपके जीवन का सबसे तेज़ सिरदर्द हो", "दृष्टि हानि, भ्रम या कमज़ोरी हो", "यह सिर की चोट के बाद हो"],
    bn: ["এটি আপনার জীবনের সবচেয়ে তীব্র মাথাব্যথা হয়", "দৃষ্টিশক্তি হ্রাস, বিভ্রান্তি বা দুর্বলতা দেখা দেয়", "এটি মাথায় আঘাতের পরে হয়"],
  },
  R007: {
    hi: ["तरल पदार्थ पेट में न रुकें", "निर्जलीकरण के लक्षण दिखें", "मल या उल्टी में खून दिखे"],
    bn: ["তরল পেটে থাকছে না", "পানিশূন্যতার লক্ষণ দেখা দেয়", "মল বা বমিতে রক্ত দেখা যায়"],
  },
  R008: {
    hi: ["सांस लेने में कठिनाई हो", "चेहरे या गले में सूजन हो", "बचाव के बावजूद लक्षण न सुधरें"],
    bn: ["শ্বাসকষ্ট দেখা দেয়", "মুখ বা গলা ফুলে যায়", "এড়িয়ে চললেও উপসর্গের উন্নতি না হয়"],
  },
  R009: {
    hi: ["भ्रम या बेहोशी हो", "तरल पदार्थ पेट में न रुकें", "पेशाब लगभग बंद हो जाए"],
    bn: ["বিভ্রান্তি বা মূর্ছা যাওয়া", "তরল পেটে থাকছে না", "প্রস্রাব প্রায় বন্ধ হয়ে যায়"],
  },
  R010: {
    hi: ["ये लक्षण कुछ दिनों से ज़्यादा बने रहें", "इनके साथ अस्पष्ट वजन घटना हो", "दृष्टि धुंधली हो जाए"],
    bn: ["এই উপসর্গগুলো কয়েক দিনের বেশি স্থায়ী হয়", "এর সাথে অস্পষ্ট কারণে ওজন হ্রাস দেখা দেয়", "দৃষ্টি ঝাপসা হয়ে যায়"],
  },
  R011: {
    hi: ["यह संयोजन जब भी दिखे, इसे हमेशा तुरंत गंभीरता से लें"],
    bn: ["এই সংমিশ্রণ যখনই দেখা যায়, প্রতিবার এটিকে জরুরি হিসেবে বিবেচনা করুন"],
  },
};

export function translateCareTips(ruleId, fallbackArr, lang) {
  if (lang === "en" || !fallbackArr) return fallbackArr ?? [];
  const arr = CARE_TIPS[ruleId]?.[lang];
  return arr ?? fallbackArr;
}

export function translateSeekCare(ruleId, fallbackArr, lang) {
  if (lang === "en" || !fallbackArr) return fallbackArr ?? [];
  const arr = SEEK_CARE[ruleId]?.[lang];
  return arr ?? fallbackArr;
}

export function t(key, lang) {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}

export function translateSymptom(id, lang, fallbackLabel) {
  const entry = SYMPTOM_LABELS[id];
  if (!entry) return fallbackLabel ?? id;
  return entry[lang] ?? entry.en;
}

export function translateCategory(name, lang) {
  const entry = CATEGORY_LABELS[name];
  if (!entry) return name;
  return entry[lang] ?? entry.en;
}

export function translateDisease(name, lang) {
  if (lang === "en") return name;
  return DISEASE_LABELS[name]?.[lang] ?? name;
}

export function translateRuleExplanation(ruleId, fallbackText, lang) {
  if (lang === "en") return fallbackText;
  return RULE_EXPLANATIONS[ruleId]?.[lang] ?? fallbackText;
}

export function translateWarning(message, lang) {
  if (lang === "en") return message;
  return WARNING_TRANSLATIONS[message]?.[lang] ?? message;
}
