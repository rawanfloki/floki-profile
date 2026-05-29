import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Settings2, Sparkles, Sliders, Hash } from 'lucide-react';
import { ProfileData, ActiveLanguage } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProfileData;
  onSave: (newData: ProfileData) => void;
  lang: ActiveLanguage;
}

export default function EditProfileModal({ isOpen, onClose, data, onSave, lang }: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>(data);
  const [editCharTab, setEditCharTab] = useState<'char-1' | 'char-2'>('char-1');

  // Keep form data synced when props change and initialize default GTA characters
  useEffect(() => {
    const updated = { ...data };
    if (!updated.gtaCharacters || updated.gtaCharacters.length === 0) {
      updated.gtaCharacters = [
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

تميّز فلوكي بسطوته الكبيرة، وقدرته على توفير أسلحة نادرة ومعدّلة غير متوفرة في المدينة، إلى جانب خبرته الكبيرة في التصنيع والتهريب، وهو ما جعله مصدر اعتماد أساسي للكثير من الأطراف. ومع توسع نشاطه في تجارة المخدرات والزراعة، تضاعف نفوذه بشكل سريع، وأصبح اسمه يُذكر كقوة مؤثرة يصعب تجاوزها أو تجاهلها.

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
      ];
    }
    setFormData(updated);
  }, [data, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const text = {
    title: lang === 'ar' ? 'إعدادات الملف الشخصي' : 'Profile Settings',
    subtitle: lang === 'ar' ? 'قم بتخصيص روابطك وبيانات حسابك هنا' : 'Customize your links and account information',
    nameLabel: lang === 'ar' ? 'الاسم المعروض' : 'Display Name',
    avatarLabel: lang === 'ar' ? 'رابط الصورة الشخصية (الأفتار)' : 'Avatar Image URL',
    bannerLabel: lang === 'ar' ? 'رابط غلاف الجزء العلوي' : 'Header Banner URL',
    bioArLabel: lang === 'ar' ? 'النبذة المكتوبة (بالعربية)' : 'Bio (Arabic)',
    bioEnLabel: lang === 'ar' ? 'النبذة المكتوبة (بالإنجليزية)' : 'Bio (English)',
    twitterLabel: lang === 'ar' ? 'اسم مستخدم تويتر' : 'Twitter Username',
    discordLabel: lang === 'ar' ? 'رابط ديسكورد أو رمز الدعوة' : 'Discord Link or Invite Code',
    youtubeLabel: lang === 'ar' ? 'قناة يوتيوب' : 'YouTube Channel User',
    tiktokLabel: lang === 'ar' ? 'حساب تيك توك' : 'TikTok Username',
    kickLabel: lang === 'ar' ? 'حساب كيك (Kick)' : 'Kick Username',
    customLogosTitle: lang === 'ar' ? 'تخصيص شعارات وأيقونات الحسابات' : 'Custom Social Logos / Emojis',
    logoUrlLabel: lang === 'ar' ? '(رابط صورة أو إيموجي)' : '(URL or Emoji)',
    twitterLogoLabel: lang === 'ar' ? 'شعار تويتر المخصص' : 'Twitter Custom Icon',
    discordLogoLabel: lang === 'ar' ? 'شعار ديسكورد المخصص' : 'Discord Custom Icon',
    youtubeLogoLabel: lang === 'ar' ? 'شعار يوتيوب المخصص' : 'YouTube Custom Icon',
    tiktokLogoLabel: lang === 'ar' ? 'شعار تيك توك المخصص' : 'TikTok Custom Icon',
    kickLogoLabel: lang === 'ar' ? 'شعار كيك المخصص' : 'Kick Custom Icon',
    logoPlaceholder: lang === 'ar' ? 'مثال: 🎮 أو رابط صورة' : 'e.g. 🎮 or image URL',
    gtaSecTitle: lang === 'ar' ? 'تخصيص شخصيات قراند RP' : 'GTA Roleplay Characters Settings',
    charUrlLabel: lang === 'ar' ? 'رابط صورة الشخصية' : 'Character Image URL',
    charNameArLabel: lang === 'ar' ? 'اسم الشخصية (بالعربية)' : 'Character Name (Arabic)',
    charNameEnLabel: lang === 'ar' ? 'اسم الشخصية (بالإنجليزية)' : 'Character Name (English)',
    charNickArLabel: lang === 'ar' ? 'اللقب/الكود (بالعربية)' : 'Alias/Nickname (Arabic)',
    charNickEnLabel: lang === 'ar' ? 'الالقب/الكود (بالإنجليزية)' : 'Alias/Nickname (English)',
    charServerArLabel: lang === 'ar' ? 'اسم السيرفر (بالعربية)' : 'Roleplay Server (Arabic)',
    charServerEnLabel: lang === 'ar' ? 'اسم السيرفر (بالإنجليزية)' : 'Roleplay Server (English)',
    charRoleArLabel: lang === 'ar' ? 'المهنة / الدور (بالعربية)' : 'Occupation / Role (Arabic)',
    charRoleEnLabel: lang === 'ar' ? 'المهنة / الدور (بالإنجليزية)' : 'Occupation / Role (English)',
    charStatusArLabel: lang === 'ar' ? 'الوضعية/الحالة (بالعربية)' : 'Character Status (Arabic)',
    charStatusEnLabel: lang === 'ar' ? 'الوضعية/الحالة (بالإنجليزية)' : 'Character Status (English)',
    charStoryArLabel: lang === 'ar' ? 'معلومات / نبذه عن شخصية (بالعربية)' : 'Character Info / Overview (Arabic)',
    charStoryEnLabel: lang === 'ar' ? 'معلومات / نبذه عن شخصية (بالإنجليزية)' : 'Character Info / Overview (English)',
    strengthLabel: lang === 'ar' ? 'القوة البدنية (0-100)' : 'Physical Strength (0-100)',
    shootingLabel: lang === 'ar' ? 'الرماية وسلاح (0-100)' : 'Marksmanship (0-100)',
    drivingLabel: lang === 'ar' ? 'القيادة والمطاردة (0-100)' : 'Evasive Driving (0-100)',
    stealthLabel: lang === 'ar' ? 'التسلل والهدوء (0-100)' : 'Intel & Stealth (0-100)',
    cancel: lang === 'ar' ? 'إلغاء' : 'Cancel',
    save: lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Darkened Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        className="relative w-full max-w-lg bg-obsidian-dark border border-royal-purple/40 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden z-10"
      >
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-royal-purple via-purple-500 to-royal-purple" />

        {/* Modal Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-royal-purple/15 rounded-xl border border-royal-purple/30">
              <Settings2 className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-left">
              <h2 className={`text-lg font-bold text-white leading-tight font-display ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.title}
              </h2>
              <p className={`text-xs text-gray-400 mt-0.5 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.subtitle}
              </p>
            </div>
          </div>
          <button
            id="btn-close-settings"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Display Name */}
          <div className="space-y-1.5">
            <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
              {text.nameLabel}
            </label>
            <input
              id="input-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-4 py-2.5 text-sm text-white outline-hidden transition-all duration-200 ${lang === 'ar' ? 'text-right font-arabic' : 'text-left font-display'}`}
              required
            />
          </div>

          {/* Avatar & Banner URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.avatarLabel}
              </label>
              <input
                id="input-avatar-url"
                type="text"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-4 py-2 text-xs text-white outline-hidden transition-all duration-200 font-mono text-left"
              />
            </div>
            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.bannerLabel}
              </label>
              <input
                id="input-banner-url"
                type="text"
                value={formData.bannerUrl}
                onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-4 py-2 text-xs text-white outline-hidden transition-all duration-200 font-mono text-left"
              />
            </div>
          </div>

          {/* Bios section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.bioEnLabel}
              </label>
              <textarea
                id="input-bio-en"
                value={formData.bioEn}
                onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                rows={3}
                className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-4 py-2 text-xs text-white outline-hidden transition-all duration-200 text-left resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.bioArLabel}
              </label>
              <textarea
                id="input-bio-ar"
                value={formData.bioAr}
                onChange={(e) => setFormData({ ...formData, bioAr: e.target.value })}
                rows={3}
                className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-4 py-2 text-xs text-white outline-hidden transition-all duration-200 text-right font-arabic resize-none"
              />
            </div>
          </div>

          {/* Social settings info divider */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-slate-400">
            <span className={`text-[10px] uppercase tracking-wider font-bold ${lang === 'ar' ? 'font-arabic text-right w-full' : ''}`}>
              {lang === 'ar' ? 'بيانات وحسابات التواصل الاجتماعي' : 'Social Platforms Handles'}
            </span>
          </div>

          {/* Twitter & Discord Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.twitterLabel}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-500 font-mono text-sm">@</span>
                <input
                  id="input-twitter"
                  type="text"
                  value={formData.twitterHandle.replace('@', '')}
                  onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                  className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl pl-8 pr-4 py-2 text-xs text-white outline-hidden transition-all duration-200 font-mono text-left"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.discordLabel}
              </label>
              <div className="relative">
                <Hash className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                <input
                  id="input-discord"
                  type="text"
                  value={formData.discordTag}
                  onChange={(e) => setFormData({ ...formData, discordTag: e.target.value })}
                  placeholder="e.g. https://discord.gg/invite-code or invite-code"
                  className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-hidden transition-all duration-200 font-mono text-left placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* YouTube & TikTok & Kick Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.youtubeLabel}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-500 font-mono text-xs">@</span>
                <input
                  id="input-youtube"
                  type="text"
                  value={formData.youtubeChannel.replace('@', '')}
                  onChange={(e) => setFormData({ ...formData, youtubeChannel: e.target.value })}
                  className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl pl-8 pr-4 py-2 text-xs text-white outline-hidden transition-all duration-200 font-mono text-left"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.tiktokLabel}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-500 font-mono text-xs">@</span>
                <input
                  id="input-tiktok"
                  type="text"
                  value={formData.tiktokHandle.replace('@', '')}
                  onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
                  className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl pl-8 pr-4 py-2 text-xs text-white outline-hidden transition-all duration-200 font-mono text-left"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={`block text-xs font-semibold text-slate-300 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.kickLabel}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-slate-500 font-mono text-xs">@</span>
                <input
                  id="input-kick"
                  type="text"
                  value={formData.kickHandle ? formData.kickHandle.replace('@', '') : ''}
                  onChange={(e) => setFormData({ ...formData, kickHandle: e.target.value })}
                  className="w-full bg-obsidian-light border border-white/10 hover:border-[#53fc18]/30 focus:border-[#53fc18] focus:ring-1 focus:ring-[#53fc18] rounded-xl pl-8 pr-4 py-2 text-xs text-white outline-hidden transition-all duration-200 font-mono text-left"
                />
              </div>
            </div>
          </div>

          {/* Custom Logos section divider */}
          <div className="pt-4 border-t border-white/5 flex flex-col text-slate-400">
            <span className={`text-[10px] uppercase tracking-wider font-bold text-royal-purple-light ${lang === 'ar' ? 'font-arabic text-right w-full' : ''}`}>
              {text.customLogosTitle}
            </span>
            <span className={`text-[9px] text-slate-500 mt-0.5 ${lang === 'ar' ? 'font-arabic text-right' : ''}`}>
              {text.logoUrlLabel}
            </span>
          </div>

          {/* Social Logos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
            {/* Twitter Logo */}
            <div className="space-y-1">
              <label className={`block text-[11px] font-semibold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.twitterLogoLabel}
              </label>
              <input
                id="input-twitter-logo"
                type="text"
                placeholder={text.logoPlaceholder}
                value={formData.twitterIconUrl || ''}
                onChange={(e) => setFormData({ ...formData, twitterIconUrl: e.target.value })}
                className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
              />
            </div>

            {/* Discord Logo */}
            <div className="space-y-1">
              <label className={`block text-[11px] font-semibold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.discordLogoLabel}
              </label>
              <input
                id="input-discord-logo"
                type="text"
                placeholder={text.logoPlaceholder}
                value={formData.discordIconUrl || ''}
                onChange={(e) => setFormData({ ...formData, discordIconUrl: e.target.value })}
                className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
              />
            </div>

            {/* YouTube Logo */}
            <div className="space-y-1">
              <label className={`block text-[11px] font-semibold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.youtubeLogoLabel}
              </label>
              <input
                id="input-youtube-logo"
                type="text"
                placeholder={text.logoPlaceholder}
                value={formData.youtubeIconUrl || ''}
                onChange={(e) => setFormData({ ...formData, youtubeIconUrl: e.target.value })}
                className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
              />
            </div>

            {/* TikTok Logo */}
            <div className="space-y-1">
              <label className={`block text-[11px] font-semibold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.tiktokLogoLabel}
              </label>
              <input
                id="input-tiktok-logo"
                type="text"
                placeholder={text.logoPlaceholder}
                value={formData.tiktokIconUrl || ''}
                onChange={(e) => setFormData({ ...formData, tiktokIconUrl: e.target.value })}
                className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
              />
            </div>

            {/* Kick Logo (Takes full width if needed or left side) */}
            <div className="space-y-1 md:col-span-2">
              <label className={`block text-[11px] font-semibold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                {text.kickLogoLabel}
              </label>
              <input
                id="input-kick-logo"
                type="text"
                placeholder={text.logoPlaceholder}
                value={formData.kickIconUrl || ''}
                onChange={(e) => setFormData({ ...formData, kickIconUrl: e.target.value })}
                className="w-full bg-obsidian-light border border-white/10 hover:border-[#53fc18]/30 focus:border-[#53fc18] focus:ring-1 focus:ring-[#53fc18] rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
              />
            </div>
          </div>

          {/* GTA Characters Configuration Section */}
          <div className="pt-4 border-t border-white/5 flex flex-col text-slate-400 space-y-2">
            <span className={`text-[10px] uppercase tracking-wider font-bold text-royal-purple-light ${lang === 'ar' ? 'font-arabic text-right w-full' : ''}`}>
              {text.gtaSecTitle}
            </span>
            
            {/* Interactive Inner character tabs selection */}
            <div className="flex bg-obsidian-black border border-white/5 rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setEditCharTab('char-1')}
                className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  editCharTab === 'char-1'
                    ? 'bg-royal-purple text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {(() => {
                  const c1 = formData.gtaCharacters?.find(c => c.id === 'char-1');
                  const name = lang === 'ar' ? (c1?.nameAr || 'فلوكي القحطاني') : (c1?.nameEn || 'Floki Al-Qahtani');
                  return `${lang === 'ar' ? 'شخصية 1' : 'Char 1'} (${name})`;
                })()}
              </button>
              <button
                type="button"
                onClick={() => setEditCharTab('char-2')}
                className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  editCharTab === 'char-2'
                    ? 'bg-royal-purple text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {(() => {
                  const c2 = formData.gtaCharacters?.find(c => c.id === 'char-2');
                  const name = lang === 'ar' ? (c2?.nameAr || 'ريموند دام') : (c2?.nameEn || 'Raymond Dam');
                  return `${lang === 'ar' ? 'شخصية 2' : 'Char 2'} (${name})`;
                })()}
              </button>
            </div>
          </div>

          {(() => {
            const charIndex = formData.gtaCharacters?.findIndex(c => c.id === editCharTab) ?? -1;
            if (charIndex === -1 || !formData.gtaCharacters) return null;

            const char = formData.gtaCharacters[charIndex];
            
            const updateCharField = (field: keyof typeof char, val: any) => {
              const updatedList = [...(formData.gtaCharacters || [])];
              updatedList[charIndex] = {
                ...updatedList[charIndex],
                [field]: val
              };
              setFormData({
                ...formData,
                gtaCharacters: updatedList
              });
            };

            return (
              <div className="space-y-3.5 pt-1">
                {/* Character Image Url */}
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                    {text.charUrlLabel}
                  </label>
                  <input
                    type="text"
                    value={char.imageUrl || ''}
                    onChange={(e) => updateCharField('imageUrl', e.target.value)}
                    className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Character Name Arabic & English */}
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charNameArLabel}
                    </label>
                    <input
                      type="text"
                      value={char.nameAr}
                      onChange={(e) => updateCharField('nameAr', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-right font-arabic"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charNameEnLabel}
                    </label>
                    <input
                      type="text"
                      value={char.nameEn}
                      onChange={(e) => updateCharField('nameEn', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
                    />
                  </div>

                  {/* Character Nickname Arabic & English */}
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charNickArLabel}
                    </label>
                    <input
                      type="text"
                      value={char.nicknameAr}
                      onChange={(e) => updateCharField('nicknameAr', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-right font-arabic"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charNickEnLabel}
                    </label>
                    <input
                      type="text"
                      value={char.nicknameEn}
                      onChange={(e) => updateCharField('nicknameEn', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
                    />
                  </div>

                  {/* Server RP Arabic & English */}
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charServerArLabel}
                    </label>
                    <input
                      type="text"
                      value={char.serverAr}
                      onChange={(e) => updateCharField('serverAr', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-right font-arabic"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charServerEnLabel}
                    </label>
                    <input
                      type="text"
                      value={char.serverEn}
                      onChange={(e) => updateCharField('serverEn', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
                    />
                  </div>

                  {/* Character Occupation Arabic & English */}
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charRoleArLabel}
                    </label>
                    <input
                      type="text"
                      value={char.roleAr}
                      onChange={(e) => updateCharField('roleAr', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-right font-arabic"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charRoleEnLabel}
                    </label>
                    <input
                      type="text"
                      value={char.roleEn}
                      onChange={(e) => updateCharField('roleEn', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
                    />
                  </div>

                  {/* Status Security Badge Arabic & English */}
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charStatusArLabel}
                    </label>
                    <input
                      type="text"
                      value={char.statusAr}
                      onChange={(e) => updateCharField('statusAr', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-right font-arabic"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charStatusEnLabel}
                    </label>
                    <input
                      type="text"
                      value={char.statusEn}
                      onChange={(e) => updateCharField('statusEn', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left"
                    />
                  </div>
                </div>

                {/* Lore descriptions Arabic & English */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charStoryArLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={char.storyAr}
                      onChange={(e) => updateCharField('storyAr', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-right font-arabic resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-400 ${lang === 'ar' && 'font-arabic text-right'}`}>
                      {text.charStoryEnLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={char.storyEn}
                      onChange={(e) => updateCharField('storyEn', e.target.value)}
                      className="w-full bg-obsidian-light border border-white/10 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-1.5 text-xs text-white outline-hidden transition-all duration-200 text-left resize-none"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </form>

        {/* Modal Footer */}
        <div className="p-5 border-t border-white/5 bg-obsidian-black/60 flex items-center justify-end gap-3">
          <button
            id="btn-cancel-settings"
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer ${lang === 'ar' && 'font-arabic'}`}
          >
            {text.cancel}
          </button>
          <button
            id="btn-save-settings"
            type="button"
            onClick={handleSubmit}
            className={`px-5 py-2.5 bg-royal-purple hover:bg-royal-purple-dark text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${lang === 'ar' && 'font-arabic'}`}
          >
            <Save className="w-3.5 h-3.5" />
            {text.save}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
