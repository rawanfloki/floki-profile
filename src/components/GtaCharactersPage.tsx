import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MapPin, 
  Briefcase, 
  BookOpen, 
  Sparkles,
  Image as ImageIcon,
  Camera
} from 'lucide-react';
import { GtaCharacter, ActiveLanguage } from '../types';

interface GtaCharactersPageProps {
  characters?: GtaCharacter[];
  lang: ActiveLanguage;
  onEditRequest?: () => void;
}

// Default high-integrity GTA Characters representing Floki's iconic RP figures
const DEFAULT_CHARACTERS: GtaCharacter[] = [
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

تميّز فلوكي بسطوته الكبيرة، وقدرته على توفير أسلحة نادرة ومعدّلة غير متوفرة في المدينة، إلى جانب خبرته الكبيرة في التصنيع والتهريب، وهو ما جعله مصدر اعتماد أساسي للكثير من الأطراف. ومع توسع نشاطه in تجارة المخدرات والزراعة، تضاعف نفوذه بشكل سريع، وأصبح اسمه يُذكر كقوة مؤثرة يصعب تجاوزها أو تجاهلها.

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

export default function GtaCharactersPage({ characters, lang, onEditRequest }: GtaCharactersPageProps) {
  const list = (characters && characters.length > 0) ? characters : DEFAULT_CHARACTERS;
  const [selectedCharId, setSelectedCharId] = useState<string>(list[0]?.id || 'char-1');

  const selectedChar = list.find(c => c.id === selectedCharId) || list[0];

  const roleLabel = lang === 'ar' ? 'الدور / المهنة' : 'Role / Occupation';
  const serverLabel = lang === 'ar' ? 'السيرفر الحالي' : 'Active Server';
  const isRaymondOrFloki = 
    selectedChar?.id === 'char-1' || 
    selectedChar?.id === 'char-2' || 
    selectedChar?.nameEn?.toLowerCase().includes('raymond') || 
    selectedChar?.nameAr?.includes('ريموند') ||
    selectedChar?.nameEn?.toLowerCase().includes('floki') ||
    selectedChar?.nameAr?.includes('فلوكي');

  const isFloki = 
    selectedChar?.id === 'char-1' || 
    selectedChar?.nameEn?.toLowerCase().includes('floki') ||
    selectedChar?.nameAr?.includes('فلوكي');

  const isRaymond = 
    selectedChar?.id === 'char-2' || 
    selectedChar?.nameEn?.toLowerCase().includes('raymond') || 
    selectedChar?.nameAr?.includes('ريموند');

  const statusLabel = isFloki
    ? (lang === 'ar' ? 'الوضعية' : 'Status')
    : isRaymond
      ? (lang === 'ar' ? 'اللقب' : 'Title')
      : (lang === 'ar' ? 'الوضعية الأمنية' : 'Security Clearance');

  const storyLabel = isRaymondOrFloki
    ? (lang === 'ar' ? 'قصة الشخصية' : 'Character Story')
    : (lang === 'ar' ? 'معلومات / نبذه عن شخصية' : 'Character Info / Overview');

  if (list.length === 0) {
    return (
      <div className="bg-obsidian-dark/95 border border-royal-purple/20 rounded-2xl p-8 text-center text-slate-400">
        <User className="w-12 h-12 mx-auto text-royal-purple mb-3 opacity-60" />
        <p className={lang === 'ar' ? 'font-arabic' : ''}>
          {lang === 'ar' ? 'لا توجد شخصيات مضافة حالياً.' : 'No GTA characters added yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Character Selector Slider/List */}
      <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-trigger select-none">
        {list.map((char) => {
          const isActive = char.id === selectedCharId;
          const name = lang === 'ar' ? char.nameAr : char.nameEn;
          return (
            <button
              key={char.id}
              onClick={() => setSelectedCharId(char.id)}
              className={`flex-none px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer text-left min-w-[140px] flex flex-col justify-between ${
                isActive 
                  ? 'bg-royal-purple/20 border-royal-purple/60 shadow-[0_0_15px_rgba(124,58,237,0.25)]' 
                  : 'bg-white/[0.02] border-white/5 hover:border-royal-purple/30 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-royal-purple-light' : 'bg-slate-600'}`} />
                <span className={`text-[11px] font-bold text-slate-400 uppercase tracking-wider ${lang === 'ar' ? 'font-arabic text-right w-full' : ''}`}>
                  {lang === 'ar' ? char.nicknameAr : char.nicknameEn}
                </span>
              </div>
              <h4 className={`text-xs font-black text-white mt-1 ${lang === 'ar' ? 'font-arabic text-right w-full' : ''}`}>
                {name}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Character Profile Showcase */}
      <AnimatePresence mode="wait">
        {selectedChar && (
          <motion.div
            key={selectedChar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="animated-glow-border rounded-2xl overflow-hidden p-5 md:p-6"
          >
            {/* Split layout: Photo Frame & Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Character Photo Frame (مكان صوره) */}
              <div className="md:col-span-4 flex flex-col justify-start">
                <div className="relative group w-full aspect-[3/4] md:aspect-[4/5]">
                  {/* Elegant and clear purple glowing backlight (luxurious and visible hugging the image) */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-royal-purple via-purple-600 to-indigo-500 opacity-40 blur-md group-hover:opacity-65 transition-all duration-500 pointer-events-none" />
                  <div className="absolute -inset-3 rounded-2xl bg-royal-purple-light/20 opacity-25 blur-xl group-hover:opacity-45 transition-all duration-500 pointer-events-none" />

                  <div className="relative w-full h-full rounded-xl border border-royal-purple/40 overflow-hidden bg-royal-purple/5 shadow-[0_0_25px_rgba(167,139,250,0.35)] hover:shadow-[0_0_40px_rgba(167,139,250,0.7)] flex flex-col items-center justify-center transition-all duration-500 z-10">
                    {/* Subtle purple background glow layer inside */}
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-purple/30 via-transparent to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-10" />
                    
                    {selectedChar.imageUrl ? (
                      <img
                        src={selectedChar.imageUrl}
                        alt={lang === 'ar' ? selectedChar.nameAr : selectedChar.nameEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // fallback display if image error
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 p-4 text-center z-10">
                        <div className="p-3 bg-white/[0.02] border border-white/5 rounded-full mb-2">
                          <ImageIcon className="w-8 h-8 text-royal-purple" />
                        </div>
                        <span className={`text-xs font-bold text-slate-300 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                          {lang === 'ar' ? 'لم يتم وضع صورة للشخصية' : 'No character image set'}
                        </span>
                        <span className={`text-[10px] text-slate-500 mt-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                          {lang === 'ar' ? 'انقر على تعديل بالأسفل لإضافة رابط صورة' : 'Click edit below to add an image URL'}
                        </span>
                      </div>
                    )}

                    {/* Aesthetic Corner Bracket decorations */}
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-royal-purple/50 z-15" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-royal-purple/50 z-15" />
                  </div>
                </div>
              </div>

              {/* Character Information Panel */}
              <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                
                {/* Header Information */}
                <div className="space-y-4">
                  {/* Name and Tagline */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3.5">
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black tracking-widest text-royal-purple-light uppercase font-mono">
                          {lang === 'ar' ? 'تفاصيل الهوية' : 'CLEARANCE IDENTITY'}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-royal-purple-light animate-pulse" />
                      </div>
                      <h3 className={`text-2xl font-black text-white tracking-tight font-display mt-0.5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                        {lang === 'ar' ? selectedChar.nameAr : selectedChar.nameEn}
                        <span className="text-xs font-semibold px-2 py-0.5 bg-royal-purple/15 text-royal-purple-light border border-royal-purple/30 rounded-full font-mono ml-2 inline-block">
                          @{lang === 'ar' ? selectedChar.nicknameAr : selectedChar.nicknameEn}
                        </span>
                      </h3>
                    </div>

                    {/* Status Pill */}
                    <div className="flex flex-col items-start sm:items-end justify-center shrink-0">
                      <span className={`text-[9px] font-bold text-slate-500 uppercase tracking-wider ${lang === 'ar' ? 'font-arabic' : ''}`}>
                        {statusLabel}
                      </span>
                      <span className={`text-xs font-black text-white mt-0.5 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-lg ${lang === 'ar' ? 'font-arabic' : ''}`}>
                        {lang === 'ar' ? selectedChar.statusAr : selectedChar.statusEn}
                      </span>
                    </div>
                  </div>

                  {/* Location & Occupation Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white/[0.01] border border-white/5 rounded-xl p-3.5">
                    {/* Server details */}
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2 bg-royal-purple/10 rounded-lg text-royal-purple-light">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className={`block text-[9px] text-slate-500 font-bold uppercase tracking-wider ${lang === 'ar' ? 'font-arabic' : ''}`}>
                          {serverLabel}
                        </span>
                        <span className={`text-xs font-extrabold text-white mt-0.5 block ${lang === 'ar' ? 'font-arabic' : ''}`}>
                          {lang === 'ar' ? selectedChar.serverAr : selectedChar.serverEn}
                        </span>
                      </div>
                    </div>

                    {/* Occupation details */}
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2 bg-royal-purple/10 rounded-lg text-royal-purple-light">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <span className={`block text-[9px] text-slate-500 font-bold uppercase tracking-wider ${lang === 'ar' ? 'font-arabic' : ''}`}>
                          {roleLabel}
                        </span>
                        <span className={`text-xs font-extrabold text-white mt-0.5 block ${lang === 'ar' ? 'font-arabic' : ''}`}>
                          {lang === 'ar' ? selectedChar.roleAr : selectedChar.roleEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Backstory / Lore Description */}
                  <div className="space-y-2 text-left pt-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-royal-purple-light uppercase tracking-wider">
                      <BookOpen className="w-4 h-4" />
                      <span className={lang === 'ar' ? 'font-arabic' : ''}>{storyLabel}</span>
                    </div>
                    <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 shadow-inner overflow-hidden relative">
                      <p className={`text-xs text-slate-300 leading-relaxed font-normal whitespace-pre-wrap ${lang === 'ar' ? 'font-arabic text-right' : ''}`}>
                        {lang === 'ar' ? selectedChar.storyAr : selectedChar.storyEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Request CTA */}
                {onEditRequest && (
                  <div className="pt-4 border-t border-white/5 flex justify-end">
                    <button
                      type="button"
                      onClick={onEditRequest}
                      className={`w-full py-3 bg-gradient-to-r from-royal-purple/40 to-royal-purple/75 hover:from-royal-purple hover:to-royal-purple-dark border border-royal-purple/20 hover:border-royal-purple/50 rounded-xl text-xs font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-purple-500/10`}
                    >
                      <Sparkles className="w-4 h-4 animate-pulse text-purple-200" />
                      <span className={lang === 'ar' ? 'font-arabic' : ''}>
                        {lang === 'ar' ? 'تعديل غلاف وقصص وتفاصيل الشخصيات كاملة ⚙️' : 'Edit Character Covers, Stories & Details ⚙️'}
                      </span>
                    </button>
                  </div>
                )}

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
