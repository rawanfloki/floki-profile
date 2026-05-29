import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Settings2, 
  Share2, 
  Moon, 
  Sparkles, 
  Smile,
  ShieldCheck,
  Calendar,
  Clock,
  Gamepad2
} from 'lucide-react';

import { ProfileData, ActiveLanguage } from './types';
import LanguageSelector from './components/LanguageSelector';
import SocialCard from './components/SocialCard';
import EditProfileModal from './components/EditProfileModal';
import QrShareModal from './components/QrShareModal';
import GtaCharactersPage from './components/GtaCharactersPage';
import AiBotWidget from './components/AiBotWidget';

// High-integrity default data tailored specifically for Floki's black and royal purple theme
const DEFAULT_PROFILE_DATA: ProfileData = {
  name: 'floki',
  avatarUrl: '/src/assets/images/flk_bg_image_1779739980466.png',
  bannerUrl: '/src/assets/images/banner_back_1779739209662.png',
  bioEn: 'An ambitious person whose goal is to make you happy. I play a variety of games on my streams and hope you enjoy your time with us. 🌌🕹️',
  bioAr: 'شخص طموح وهدفه إسعادك، ألعب العاب متنوعة بالبثوث واتمنى تستمع معنا',
  customStatusEn: 'Chilling in the royal obsidian realm',
  customStatusAr: 'أسترخي في المملكة البنفسجية المظلمة',
  twitterHandle: '07floki_',
  discordTag: '07flk',
  youtubeChannel: '07floki',
  tiktokHandle: '07floki',
  kickHandle: '07Floki',
  gtaCharacters: [
    {
      id: 'char-1',
      nameAr: 'فلوكي القحطاني',
      nameEn: 'Floki Al-Qahtani',
      nicknameAr: 'مجرم',
      nicknameEn: 'Criminal',
      serverAr: 'لايوجد',
      serverEn: 'None',
      roleAr: 'مصنع وعضو بعصابة التايتنز',
      roleEn: 'Manufacturer & Titans Gang Member',
      storyAr: `تُعتبر شخصية “فلوكي القحطاني” من أخطر وأقوى الشخصيات الإجرامية داخل المدينة، واشتهر اسمه بشكل واسع بسبب سطوته الكبيرة وسيطرته على تجارة السلاح والمخدرات. قبل انضمامه إلى عصابة “تايتنز”، كان معروفًا في السوق كأحد أقوى التجار وأكثرهم نفوذًا، واستطاع خلال فترة قصيرة بناء هيبته واسمه عبر علاقاته الواسعة، وذكائه الحاد، وطريقته الصارمة في التعامل مع مختلف الأطراف داخل المدينة.

تميّز فلوكي بسطوته الكبيرة، وقدرته على توفير أسلحة نادرة ومعدّلة غير متوفرة in المدينة، إلى جانب خبرته الكبيرة في التصنيع والتهريب، وهو ما جعله مصدر اعتماد أساسي للكثير من الأطراف. ومع توسع نشاطه في تجارة المخدرات والزراعة، تضاعف نفوذه بشكل سريع، وأصبح اسمه يُذكر كقوة مؤثرة يصعب تجاوزها أو تجاهلها.

ومع هذا الصعود، لاحظت عصابة “تايتنز” حجمه الحقيقي داخل المدينة، فتم ضمه إليها ليس كعنصر عادي، بل كشخصية تمتلك نفوذًا وسيطرة ميدانية مؤثرة على حركة البيع والتوزيع.

ومع دخوله إلى تايتنز، أصبح مسؤولًا عن جزء كبير من تجارة الأسلحة والممنوعات، مستفيدًا من دهائه وقدرته على إدارة الصفقات وإخفاء أي أثر قد يقود إليه. ورغم محاولات قطاع CID المتكررة للإيقاع به عبر الكمائن والمخبرين، إلا أنه كان دائمًا يتفوق عليهم بخطوة، دون أن يترك أي دليل مباشر يدينه.

ويُعرف فلوكي بشخصيته الهادئة أمام الناس والشرطة، لكنه يحمل خلف هذا الهدوء حضورًا قويًا وهيبة واضحة تفرض نفسها. يظهر كشخص طبيعي ومتعاون، بينما في الخفاء يدبر شبكة معقدة من الخطط والصفقات دون تردد. كما يُوصف بأنه شخصية حاسمة، تقرأ المواقف بدقة، وتستغل أي فرصة لتعزيز نفوذها، مع قدرة عالية على الحفاظ على مكانته وسط أخطر بيئات المدينة.`,
      storyEn: `The character 'Floki Al-Qahtani' is considered one of the most dangerous and powerful criminal figures in the city, widely notorious for his immense authority and control over the arms and drug trade. Before joining the 'Titans' gang, he was already established in the market as one of its most dominant and influential dealers. Within a short period, he built a massive reputation and sheer dominance through extensive networks, sharp intelligence, and a strict, uncompromising methodology in dealing with all factions in the city.

Floki was characterized by his supreme market leverage, his ability to supply rare and customized firearms otherwise unavailable in the metropolis, alongside vast expertise in illicit manufacturing and smuggling. This made him a primary, direct source of reliance for countless powerful organizations. As his operations expanded in narcotics and cultivation, his influence multiplied rapidly, solidifying his name as an overriding power that could neither be bypassed nor ignored.

Reflecting this meteoric rise, the 'Titans' gang recognized his real weight in the underworld, prompting them to recruit him—not merely as an ordinary member, but as a key figure carrying unparalleled tactical influence and direct operational command over distribution and sales.

Upon entering the Titans, he was entrusted with a major portion of the weapon and contraband networks, capitalizing on his great cunning to direct complex deals and eliminate any trail of evidence. Despite relentless efforts by the CID sector to bring him down through coordinated stings and undercover informants, Floki was consistently a step ahead, leaving zero direct evidence of his operations.

To the public and law enforcement, Floki is known for his incredibly calm and collected nature, yet behind this stillness lies a formidable aura and unmistakable presence that demands respect. He projects the image of a cooperative, law-abiding citizen, while in the shadows, he effortlessly orchestrates an entire web of high-risk enterprises. He is defined as a highly decisive leader who reads scenarios with perfect precision, exploiting every opportunity to consolidate his dominance, and holding unwavering security in the city's most treacherous environments.`,
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
      statusAr: 'مطلوب في قطاع CID 🔴',
      statusEn: 'Wanted by CID Sector 🔴',
      strength: 90,
      shooting: 98,
      driving: 92,
      stealth: 85
    },
    {
      id: 'char-2',
      nameAr: 'ريموند دام',
      nameEn: 'Raymond Dam',
      nicknameAr: 'محقق',
      nicknameEn: 'Investigator',
      serverAr: 'لايوجد',
      serverEn: 'None',
      roleAr: 'محقق في قطاع CID',
      roleEn: 'Investigator in CID Sector',
      storyAr: `شخصية “ايجنت 505” والمعروف أيضًا باسم “ريموند دام” تُعتبر من أكثر الشخصيات غموضًا وتأثيرًا في سيناريو الزومبي. وكانت تربطه علاقة مباشرة بـ سايكو دام، حيث يعتبر ريموند دام ابن أخيه، وهو من تولّى تربيته منذ صغره.

بعد انتشار الفايروس، تعرّض ريموند لسلسلة من التجارب القاسية في سنٍ مبكرة. هذه التجارب تسببت في تغييرات كبيرة داخل جسده، مما أدى إلى تكوّن مقاومة نادرة ضد الفايروس. وبسبب هذه الحالة الاستثنائية، أصبح هدفًا لعدة جهات كانت تسعى للاستفادة من دمه أو إخضاعه لمزيد من التجارب.

خلال تلك الفترة، تولّى سايكو دام مسؤولية حمايته وإخفائه عن تلك الجهات، ثم قام بتربيته وتدريبه ليتمكن من التأقلم مع الظروف الصعبة التي كان يعيشها، في ظل كونه مطلوبًا من عدة جهات تسعى للوصول إليه.

ومع مرور الوقت، عمل على تأهيله حتى انضم إلى قطاع الـ CID، حيث بدأ العمل كعميل ومحقق بفضل قدراته التحليلية وقدرته على التعامل مع الأزمات.

ومع دخوله القطاع، بدأ اسم "ايجنت 505” يكتسب سمعته الخاصة، فقد عُرف بهدوئه، وقلة حديثه، وقدرته على فرض حضوره دون الحاجة لإظهار القوة بشكل مباشر، مما جعله شخصية يحيط بها الغموض والهيبة في الوقت ذاته.

إلا أن الجانب الأكثر تعقيدًا في شخصيته كان فقدانه لقرابة 75٪ من ذاكرته نتيجة التجارب والإصابات التي تعرّض لها، لذلك كان يعاني من فراغات كبيرة في ماضيه، ولا يتذكر الكثير من التفاصيل المتعلقة بحياته السابقة أو الحقيقة الكاملة لما حدث له.

هذا الأمر جعل الكثير من تصرفاته مبنية على ذكريات ناقصة ومعلومات غير مكتملة، ومع تقدم الأحداث ظهرت تلميحات متكررة بأن هناك أشخاصًا يعرفون الحقيقة الكاملة حول “ايجنت 505” أكثر مما يعرفه عن نفسه.`,
      storyEn: `The character 'Agent 505', also known as 'Raymond Dam', is considered one of the most mysterious and influential figures in the Zombie Scenario. He had a direct kinship connection to Psycho Dam, who was his uncle and took responsibility for raising him since childhood.

Following the viral outbreak, Raymond was subjected to a series of brutal experiments at a very tender age. These clinical trials caused major biological alterations within his body, resulting in an exceptionally rare immunity against the virus. Because of this anomalous blood profile, he became a primary target for multiple factions seeking to weaponize his genetics or subject him to further dark experiments.

Throughout that turbulent era, Psycho Dam took it upon himself to protect and systematically shield him from these hungry corporations. He raised and trained him to adapt to the hostile environments of being constantly hunted.

Over time, Psycho Dam worked on qualifying and rebuilding his identity, enabling him to integrate into the CID sector, where he began serving as a highly effective agent and investigator—leveraging his supreme analytical intelligence and crisis-management traits.

As he climbed the ranks in the bureau, the moniker 'Agent 505' carved out its own formidable reputation. He was defined by his absolute silence, cold composure, and an effortless ability to command any room with a chilling presence, without ever resorting to direct force. This made him an emblem of terrifying mystery and ultimate authority.

However, the most complicated truth of his life resides in his mind: Raymond suffered an almost complete memory wipe, losing approximately 75% of his memories due to the childhood trauma and physical scars. Living with massive chronological voids, he has no recollection of his original life or the true scope of what transpired. This fragmented psyche forces him to navigate his present based on shadows of a broken past, while frequent whispers suggest that those around him know the full story of 'Agent 505' far better than he ever will.`,
      imageUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=600',
      statusAr: 'ايجنت ٥٠٥',
      statusEn: 'Agent 505',
      strength: 92,
      shooting: 90,
      driving: 88,
      stealth: 72
    }
  ]
};

export default function App() {
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE_DATA);
  const [lang, setLang] = useState<ActiveLanguage>('ar'); // Default to Arabic as requested in the Prompt
  const [activePage, setActivePage] = useState<'home' | 'characters'>('home');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [pulsingActive, setPulsingActive] = useState(true);

  // Load persistent profile settings on mount and sync with server
  useEffect(() => {
    // 1. Set language from localStorage first
    const savedLang = localStorage.getItem('floki_profile_lang');
    if (savedLang === 'ar' || savedLang === 'en') {
      setLang(savedLang);
    }

    // Is there client-side cached data?
    const savedLocalData = localStorage.getItem('floki_profile_data');
    let localParsed: ProfileData | null = null;
    if (savedLocalData) {
      try {
        localParsed = JSON.parse(savedLocalData);
      } catch (e) {
        console.error('Failed parsing local profile data', e);
      }
    }

    // 2. Fetch from live server
    fetch('/api/profile')
      .then(res => {
        if (!res.ok) throw new Error('API server returned error');
        return res.json();
      })
      .then(serverData => {
        if (serverData) {
          // If server has data, it wins as the authoritative sync source
          // Apply any emergency migrations to serverData
          let updated = false;
          if (!serverData.avatarUrl || serverData.avatarUrl.includes('avatar_floki')) {
            serverData.avatarUrl = '/src/assets/images/flk_bg_image_1779739980466.png';
            updated = true;
          }
          if (!serverData.kickHandle) {
            serverData.kickHandle = 'floki';
            updated = true;
          }
          if (!serverData.gtaCharacters || serverData.gtaCharacters.length === 0 || serverData.gtaCharacters.some((c: any) => c.nameAr === 'فلوكي ساوث' || c.nameEn === 'Floki South' || c.nameAr === 'أبو صامل')) {
            serverData.gtaCharacters = DEFAULT_PROFILE_DATA.gtaCharacters;
            updated = true;
          }
          if (updated) {
            fetch('/api/profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(serverData)
            }).catch(err => console.error('Failed saving default server data migration', err));
          }

          setProfileData(serverData);
          localStorage.setItem('floki_profile_data', JSON.stringify(serverData));
        } else if (localParsed) {
          // Server doesn't have anything yet, but local storage does - Push local storage to server!
          setProfileData(localParsed);
          fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(localParsed)
          })
          .then(() => console.log('Successfully pushed local changes to server for persistence'))
          .catch(err => console.error('Failed to sync local changes to server', err));
        } else {
          // Both empty, keep DEFAULT_PROFILE_DATA
          setProfileData(DEFAULT_PROFILE_DATA);
        }
      })
      .catch(err => {
        console.error('Server offline or failed fetching profile, falling back to local storage:', err);
        if (localParsed) {
          setProfileData(localParsed);
        }
      });
  }, []);

  // Handle saving new profile coordinates
  const handleSaveProfile = (newData: ProfileData) => {
    setProfileData(newData);
    localStorage.setItem('floki_profile_data', JSON.stringify(newData));

    // Also save to live server immediately!
    fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      console.log('Successfully saved profile to server disk');
    })
    .catch(err => {
      console.error('Failed to save profile to server disk:', err);
    });
  };

  // Change language settings with persistent storage
  const handleLanguageChange = (newLang: ActiveLanguage) => {
    setLang(newLang);
    localStorage.setItem('floki_profile_lang', newLang);
  };

  // Static content details depending on chosen viewport language
  const content = {
    editTooltip: lang === 'ar' ? 'تعديل الملف' : 'Edit Profile',
    shareTooltip: lang === 'ar' ? 'مشاركة الملف' : 'Share Profile',
    statusTitle: lang === 'ar' ? 'الحالة الحالية' : 'Current Status',
    verifiedTips: lang === 'ar' ? 'حساب صانع محتوى موثق' : 'Verified Creator Channel',
    footerClaim: lang === 'ar' ? 'بكل حب بواسطة floki' : 'Made with love by floki',
    onlineLabel: lang === 'ar' ? 'متصل الآن' : 'Online',
    platformsTitle: lang === 'ar' ? 'الحسابات الرسمية' : 'Official Channels',
  };

  // Grid container transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#050506] via-[#100724] to-[#050506] text-slate-100 flex flex-col items-center justify-between overflow-x-hidden selection:bg-royal-purple selection:text-white">
      
      {/* Background Ambience / Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_55%)] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,33,182,0.18),transparent_50%)] z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] z-0 pointer-events-none" />

      {/* Language Toggle Control */}
      <LanguageSelector currentLang={lang} onChange={handleLanguageChange} />

      {/* Main Single-Screen Column Structure */}
      <main className="relative z-10 w-full max-w-xl md:max-w-4xl px-4 pt-12 pb-16 flex-1 flex flex-col justify-start transition-all duration-300">
        
        {/* Navigation Tabs to Switch Pages */}
        <div className="flex bg-obsidian-dark/95 border border-royal-purple/20 rounded-2xl p-1 mb-6 gap-1 select-none shadow-md shadow-purple-500/5 max-w-xl mx-auto w-full">
          <button
            onClick={() => setActivePage('home')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              activePage === 'home' 
                ? 'bg-royal-purple text-white shadow-md shadow-purple-500/20 font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={lang === 'ar' ? 'font-arabic' : ''}>
              {lang === 'ar' ? 'الصفحة الرئيسية' : 'Official Links'}
            </span>
          </button>
          <button
            onClick={() => setActivePage('characters')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
              activePage === 'characters' 
                ? 'bg-royal-purple text-white shadow-md shadow-purple-500/20 font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={lang === 'ar' ? 'font-arabic' : ''}>
              {lang === 'ar' ? 'شخصيات قراند RP' : 'GTA Characters'}
            </span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activePage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Core Profile Card Widget - Rectangular Design */}
              <div className="relative animated-glow-border rounded-2xl overflow-hidden mb-6 max-w-4xl mx-auto w-full">
                {/* Header Banner - Horizontal Widescreen Design */}
                <div className="relative h-44 md:h-48 w-full overflow-hidden">
                  <img
                    src={profileData.bannerUrl}
                    alt="Floki Royal Cover"
                    className="w-full h-full object-cover select-none scale-102 hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Matte Dark Purple Overlay Gradient to ease contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-dark via-obsidian-dark/40 to-transparent" />
                  
                  {/* Top Bar Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-2.5 py-1 bg-obsidian-black/85 backdrop-blur-md rounded-full border border-royal-purple/30 text-[10px] font-bold text-white flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-royal-purple animate-pulse" />
                      <span className={`tracking-wider ${lang === 'ar' ? 'font-arabic font-medium' : 'font-mono uppercase'}`}>
                        {lang === 'ar' ? 'جميع ما يتعلق بفلوكي' : 'Everything related to Floki'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profile Core Segment - Horizontal Rectangular Layout on Desktop */}
                <div className={`relative px-6 pb-6 pt-0 flex flex-col md:flex-row items-center md:items-end gap-5 text-center mt-0 ${
                  lang === 'ar' 
                    ? 'md:flex-row-reverse md:text-right' 
                    : 'md:flex-row md:text-left'
                }`}>
                  
                  {/* Overlapping Avatar Image */}
                  <div className="relative -mt-16 md:-mt-20 mb-1 md:mb-0 group shrink-0 z-20">
                    
                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-300 border-[3.5px] border-obsidian-dark bg-obsidian-dark">
                      <img
                        src={profileData.avatarUrl}
                        alt={profileData.name}
                        className="w-full h-full object-cover object-center select-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Verified Badge Icon */}
                    <div 
                      className={`absolute bottom-0 p-1 bg-royal-purple border border-white/10 rounded-full flex items-center justify-center shadow-lg cursor-help z-20 ${
                        lang === 'ar' ? 'left-0.5' : 'right-0.5'
                      }`}
                      title={content.verifiedTips}
                    >
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Info details column */}
                  <div className={`flex-1 flex flex-col items-center md:items-start space-y-2.5 w-full ${
                    lang === 'ar' ? 'md:items-end' : 'md:items-start'
                  }`}>
                    
                    {/* Display Name and stream status line */}
                    <div className={`flex flex-col md:flex-row items-center gap-3 w-full justify-center md:justify-start ${
                      lang === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}>
                      <h1 className="text-3xl font-extrabold text-white tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent flex items-center gap-2 drop-shadow-md">
                        {profileData.name}
                        <CheckCircle2 className="w-5.5 h-5.5 text-royal-purple-light fill-royal-purple/10" />
                      </h1>

                      {/* Live Stream Pulse Badge */}
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://kick.com/${profileData.kickHandle ? profileData.kickHandle.replace('@', '') : 'floki'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-royal-purple/15 hover:bg-royal-purple/25 border border-royal-purple/30 hover:border-royal-purple/75 rounded-lg text-[11px] font-bold text-royal-purple-light transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.05)] hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] select-none"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-purple-light opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-royal-purple-light"></span>
                        </span>
                        <span className={lang === 'ar' ? 'font-arabic' : ''}>
                          {lang === 'ar' ? 'البث المباشر الآن' : 'Watch Live Stream'}
                        </span>
                      </motion.a>
                    </div>

                    {/* Bio Blurb (Bilingual fallback) */}
                    <p className={`text-slate-300 text-sm font-medium leading-relaxed max-w-xl ${
                      lang === 'ar' ? 'font-arabic text-right' : 'text-left'
                    }`}>
                      {lang === 'ar' ? profileData.bioAr : profileData.bioEn}
                    </p>
                  </div>

                  {/* Micro Utility Actions Panel */}
                  <div className={`flex items-center gap-2.5 mt-4 md:mt-0 shrink-0 ${
                    lang === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}>
                    <button
                      id="btn-trigger-share"
                      onClick={() => setIsShareOpen(true)}
                      className={`px-4 py-2.5 bg-royal-purple hover:bg-royal-purple-dark border border-royal-purple-light/10 rounded-xl text-xs font-semibold text-white shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer flex items-center gap-2 ${lang === 'ar' ? 'font-arabic' : ''}`}
                      title={content.shareTooltip}
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'مشاركة' : 'Share'}</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Dual Column Layout: Channels and Live Schedule side-by-side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start w-full">
                
                {/* Left Column: Official Accounts */}
                <div className="space-y-4">
                  {/* Section Heading Panel */}
                  <div className="flex items-center gap-3 px-1">
                    <div className="h-0.5 bg-gradient-to-r from-royal-purple to-transparent flex-1" />
                    <h2 className={`text-xs uppercase tracking-widest font-black text-purple-400 font-display select-none ${lang === 'ar' ? 'font-arabic text-right' : ''}`}>
                      {content.platformsTitle}
                    </h2>
                    <div className="h-0.5 bg-gradient-to-l from-royal-purple to-transparent flex-1" />
                  </div>

                  {/* Dynamic Social Platform Cards Grid with purple glowing border */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="animated-glow-border rounded-2xl p-4.5 space-y-3.5 relative"
                  >
                    <motion.div variants={itemVariants}>
                      <SocialCard 
                        platform="twitter" 
                        username={profileData.twitterHandle} 
                        lang={lang} 
                        customIconUrl={profileData.twitterIconUrl} 
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <SocialCard 
                        platform="discord" 
                        username={profileData.discordTag} 
                        lang={lang} 
                        customIconUrl={profileData.discordIconUrl} 
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <SocialCard 
                        platform="youtube" 
                        username={profileData.youtubeChannel} 
                        lang={lang} 
                        customIconUrl={profileData.youtubeIconUrl} 
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <SocialCard 
                        platform="tiktok" 
                        username={profileData.tiktokHandle} 
                        lang={lang} 
                        customIconUrl={profileData.tiktokIconUrl} 
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <SocialCard 
                        platform="kick" 
                        username={profileData.kickHandle} 
                        lang={lang} 
                        customIconUrl={profileData.kickIconUrl} 
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right Column: Weekly Live Stream Schedule */}
                <div className="space-y-4">
                  {/* Weekly Live Stream Schedule - requested by user */}
                  <div className="flex items-center gap-3 px-1">
                    <div className="h-0.5 bg-gradient-to-r from-royal-purple to-transparent flex-1 opacity-60" />
                    <h2 className={`text-xs uppercase tracking-widest font-black text-purple-400 font-display select-none ${lang === 'ar' ? 'font-arabic text-right' : ''}`}>
                      {lang === 'ar' ? 'جدول البث المباشر' : 'Live Stream Schedule'}
                    </h2>
                    <div className="h-0.5 bg-gradient-to-l from-royal-purple to-transparent flex-1 opacity-60" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="animated-glow-border rounded-2xl overflow-hidden p-5 space-y-4"
                  >
                    <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <div className="p-2.5 bg-royal-purple/15 rounded-xl border border-royal-purple/30 text-royal-purple-light flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className={`text-sm font-extrabold text-white tracking-tight ${lang === 'ar' ? 'font-arabic text-right' : 'text-left'}`}>
                          {lang === 'ar' ? 'أوقات البث الإسبوعية' : 'Weekly Stream Timeline'}
                        </h3>
                        <p className={`text-[10px] text-slate-400 font-medium ${lang === 'ar' ? 'font-arabic text-right' : 'text-left'}`}>
                          {lang === 'ar' ? 'بث متنوع وألعاب مميزة وتفاعل مع المتابعين' : 'Variety games, interactive nights & loyal community'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      {/* Saturday */}
                      <div className="flex items-center justify-between bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-royal-purple/20 rounded-xl p-3 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-royal-purple-light animate-pulse shadow-sm shadow-royal-purple-light/50" />
                          <span className={`text-xs font-bold text-white ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            {lang === 'ar' ? 'السبت' : 'Saturday'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-[11px] text-slate-300 font-medium flex items-center gap-1.5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            <Clock className="w-3.5 h-3.5 text-royal-purple-light" />
                            {lang === 'ar' ? 'الساعة 9:00 مساءً' : '9:00 PM KSA'}
                          </span>
                          <span className={`text-[10px] px-2.5 py-1 bg-royal-purple/25 text-royal-purple-light font-bold rounded-lg border border-royal-purple/30 flex items-center gap-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            <Gamepad2 className="w-3.5 h-3.5" />
                            {lang === 'ar' ? 'بث متنوع' : 'Variety Stream'}
                          </span>
                        </div>
                      </div>

                      {/* Tuesday */}
                      <div className="flex items-center justify-between bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-royal-purple/20 rounded-xl p-3 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-royal-purple-light animate-pulse shadow-sm shadow-royal-purple-light/50" />
                          <span className={`text-xs font-bold text-white ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            {lang === 'ar' ? 'الثلاثاء' : 'Tuesday'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-[11px] text-slate-300 font-medium flex items-center gap-1.5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            <Clock className="w-3.5 h-3.5 text-royal-purple-light" />
                            {lang === 'ar' ? 'الساعة 9:00 مساءً' : '9:00 PM KSA'}
                          </span>
                          <span className={`text-[10px] px-2.5 py-1 bg-royal-purple/25 text-royal-purple-light font-bold rounded-lg border border-royal-purple/30 flex items-center gap-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            <Gamepad2 className="w-3.5 h-3.5" />
                            {lang === 'ar' ? 'بث متنوع' : 'Variety Stream'}
                          </span>
                        </div>
                      </div>

                      {/* Thursday */}
                      <div className="flex items-center justify-between bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-royal-purple/20 rounded-xl p-3 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-royal-purple-light animate-pulse shadow-sm shadow-royal-purple-light/50" />
                          <span className={`text-xs font-bold text-white ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            {lang === 'ar' ? 'الخميس' : 'Thursday'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-[11px] text-slate-300 font-medium flex items-center gap-1.5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            <Clock className="w-3.5 h-3.5 text-royal-purple-light" />
                            {lang === 'ar' ? 'الساعة 9:00 مساءً' : '9:00 PM KSA'}
                          </span>
                          <span className={`text-[10px] px-2.5 py-1 bg-royal-purple/25 text-royal-purple-light font-bold rounded-lg border border-royal-purple/30 flex items-center gap-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                            <Gamepad2 className="w-3.5 h-3.5" />
                            {lang === 'ar' ? 'بث متنوع' : 'Variety Stream'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="characters"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <GtaCharactersPage 
                characters={profileData.gtaCharacters} 
                lang={lang} 
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Styled Footer Block */}
      <footer className="relative z-10 w-full max-w-lg px-4 pb-8 pt-6 text-center select-none">
        <p className={`text-[10px] text-gray-500 tracking-widest uppercase flex items-center justify-center gap-1 ${lang === 'ar' ? 'font-arabic font-medium' : 'font-mono'}`}>
          <Moon className="w-3 h-3 text-royal-purple-light" />
          <span>{lang === 'ar' ? 'جميع مايتعلق بافضل ستريمر فلوكي' : 'Everything related to the best streamer, Floki'}</span>
        </p>
        <p className={`text-[11px] text-slate-500/80 mt-1 ${lang === 'ar' && 'font-arabic'}`}>
          {content.footerClaim} &copy; 2026
        </p>
      </footer>

      {/* Settings Panel Modal */}
      <AnimatePresence>
        {isEditOpen && (
          <EditProfileModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            data={profileData}
            onSave={handleSaveProfile}
            lang={lang}
          />
        )}
      </AnimatePresence>

      {/* QR & Share Dashboard Modal */}
      <AnimatePresence>
        {isShareOpen && (
          <QrShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            lang={lang}
          />
        )}
      </AnimatePresence>

      {/* Floki Smart Companion AI Widget */}
      <AiBotWidget lang={lang} />

    </div>
  );
}
