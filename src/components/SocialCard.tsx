import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Copy, Check, Youtube } from 'lucide-react';
import { ActiveLanguage } from '../types';

interface SocialCardProps {
  platform: 'twitter' | 'discord' | 'youtube' | 'tiktok' | 'kick';
  username: string;
  lang: ActiveLanguage;
  customIconUrl?: string;
}

export default function SocialCard({ platform, username, lang, customIconUrl }: SocialCardProps) {
  const [copied, setCopied] = useState(false);

  // Define URLs as functions based on username input
  const getUrl = () => {
    switch (platform) {
      case 'twitter':
        const cleanTwitter = username.replace('@', '').trim();
        return `https://x.com/${cleanTwitter || 'floki'}`;
      case 'youtube':
        const cleanYoutube = username.trim();
        const formattedYoutube = cleanYoutube.startsWith('@') ? cleanYoutube : `@${cleanYoutube}`;
        return `https://youtube.com/${formattedYoutube || '@floki'}`;
      case 'tiktok':
        const cleanTiktok = username.replace('@', '').trim();
        return `https://tiktok.com/@${cleanTiktok || 'floki'}`;
      case 'discord':
        const cleanDiscord = username.trim();
        if (cleanDiscord.startsWith('http://') || cleanDiscord.startsWith('https://')) {
          return cleanDiscord;
        }
        return `https://discord.gg/${cleanDiscord || 'floki'}`;
      case 'kick':
        const cleanKick = username.replace('@', '').trim();
        return `https://kick.com/${cleanKick || 'floki'}`;
      default:
        return '#';
    }
  };

  const handleDiscordClick = () => {
    if (platform === 'discord') {
      navigator.clipboard.writeText(username);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Custom high-quality, pixel-perfect SVGs for logo consistency
  const getIcon = () => {
    switch (platform) {
      case 'twitter':
        return (
          // Elegant minimal X logo
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'discord':
        return (
          // Vibrant Discord logo
          <svg className="w-6 h-6 text-[#5865F2]" viewBox="0 0 127.14 96.36" fill="currentColor">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.87-.64,1.71-1.32,2.51-2a75.52,75.52,0,0,0,76,0c.8.71,1.64,1.39,2.51,2a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,50.12,123.57,27.35,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
          </svg>
        );
      case 'youtube':
        return <Youtube className="w-6 h-6 text-[#FF0000]" />;
      case 'tiktok':
        return (
          // Sleek TikTok logo
          <svg className="w-6 h-6 text-[#00f2fe]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.01c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.02 1.59 4.23.95 1.15 2.27 1.94 3.73 2.18l-.02 3.9c-1.42-.04-2.82-.44-4.04-1.18-.54-.33-1.03-.74-1.47-1.22l.02 6.55c.01 1.77-.38 3.53-1.17 5.11-.85 1.63-2.18 2.96-3.81 3.8-1.61.8-3.41 1.19-5.18 1.14-1.84-.04-3.66-.54-5.22-1.53C.755 21.84-.285 20.01-.585 18c-.37-2.02.11-4.12 1.34-5.8 1.19-1.61 2.95-2.69 4.93-3.03 1.09-.17 2.21-.1 3.28.18v4c-.79-.27-1.64-.32-2.45-.14-1.2.25-2.22 1.05-2.73 2.16-.56 1.14-.54 2.52.06 3.65.52.92 1.45 1.56 2.5 1.71 1.08.16 2.19-.11 3.01-.76.7-.51 1.15-1.29 1.25-2.15.06-1.15.03-9.52.03-12.72v-.01z" />
          </svg>
        );
      case 'kick':
        return (
          <svg className="w-5.5 h-5.5 text-[#53fc18]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3h5v4h2v1h1V7h2V3h5v5h-4v2h4v4h-4v2h4v5h-5v-4h-2v-1h-1v1h-2v4H3V3zm10 6h-2v6h2v-2h1v2h2v-6h-2v2h-1V9z" />
          </svg>
        );
    }
  };

  const getPlatformDetails = () => {
    switch (platform) {
      case 'twitter':
        return {
          titleEn: 'Twitter (X)',
          titleAr: 'تويتر (X)',
          descEn: 'Follow for real-time updates and posts',
          descAr: 'تابع آخر التحديثات والمنشورات اليومية',
          bgColor: 'bg-white/[0.02] hover:bg-white/[0.06]',
          borderColor: 'border-white/10 hover:border-white/20',
          badgeTextEn: 'Follow',
          badgeTextAr: 'متابعة',
        };
      case 'discord':
        return {
          titleEn: 'Discord Server',
          titleAr: 'سيرفر ديسكورد',
          descEn: 'Tap to join our community server',
          descAr: 'اضغط للانضمام إلى سيرفر المجتمع الخاص بنا',
          bgColor: 'bg-white/[0.02] hover:bg-white/[0.06]',
          borderColor: 'border-white/10 hover:border-white/20',
          badgeTextEn: 'Join Server',
          badgeTextAr: 'انضمام للسيرفر',
        };
      case 'youtube':
        return {
          titleEn: 'YouTube',
          titleAr: 'يوتيوب',
          descEn: 'Subscribe for visual uploads & logs',
          descAr: 'اشترك لمتابعة مقاطع الفيديو والبثوث',
          bgColor: 'bg-white/[0.02] hover:bg-white/[0.06]',
          borderColor: 'border-white/10 hover:border-white/20',
          badgeTextEn: 'Subscribe',
          badgeTextAr: 'اشتراك',
        };
      case 'tiktok':
        return {
          titleEn: 'TikTok',
          titleAr: 'تيك توك',
          descEn: 'Check out recent vertical videos',
          descAr: 'شاهد الفيديوهات القصيرة واليوميات',
          bgColor: 'bg-white/[0.02] hover:bg-white/[0.06]',
          borderColor: 'border-white/10 hover:border-white/20',
          badgeTextEn: 'Watch',
          badgeTextAr: 'مشاهدة',
        };
      case 'kick':
        return {
          titleEn: 'Kick Live Stream',
          titleAr: 'بث كيك المباشر (Kick)',
          descEn: 'Join my vibrant gaming streams',
          descAr: 'انضم لمشاهدة البث المباشر وتفاعل معنا بمتعة',
          bgColor: 'bg-white/[0.02] hover:bg-white/[0.06]',
          borderColor: 'border-white/10 hover:border-white/20',
          badgeTextEn: 'Watch Live',
          badgeTextAr: 'مشاهدة البث',
        };
    }
  };

  const details = getPlatformDetails();
  const title = lang === 'ar' ? details.titleAr : details.titleEn;
  const desc = lang === 'ar' ? details.descAr : details.descEn;
  const label = lang === 'ar' ? details.badgeTextAr : details.badgeTextEn;

  // Render clickable div or anchor matching platform type
  const isCopyable = false;

  const cardContent = (
    <div className="flex items-center justify-between gap-4 p-4.5">
      <div className="flex items-center gap-4.5">
        {/* Dynamic Glow Background for Platform Icon */}
        <div className="relative flex items-center justify-center w-12 h-12 bg-white/[0.03] border border-white/5 rounded-xl shadow-inner group-hover:scale-105 transition-transform duration-300 overflow-hidden">
          <div className="absolute inset-0 rounded-xl bg-white/[0.02] filter blur-xs" />
          {customIconUrl ? (
            customIconUrl.startsWith('http') || customIconUrl.startsWith('/') || customIconUrl.startsWith('.') ? (
              <img 
                src={customIconUrl} 
                alt={platform} 
                className="w-full h-full object-cover rounded-xl" 
                referrerPolicy="no-referrer" 
              />
            ) : (
              <span className="text-xl font-semibold select-none leading-none">{customIconUrl}</span>
            )
          ) : (
            getIcon()
          )}
          
          {/* Custom high-quality logo icon container */}
        </div>

        {/* Text Section */}
        <div className="flex flex-col text-left">
          <h3 className={`text-base font-semibold text-white font-display flex items-center gap-1.5 ${lang === 'ar' && 'font-arabic text-right self-start'}`}>
            <span>{title}</span>
            <span className="text-xs text-gray-500 font-normal">
              {platform === 'twitter' || platform === 'tiktok' || platform === 'youtube' || platform === 'kick' ? `@${username.replace('@', '')}` : username}
            </span>
          </h3>
          <p className={`text-xs text-slate-400/90 leading-tight mt-0.5 ${lang === 'ar' && 'font-arabic text-right'}`}>
            {desc}
          </p>
        </div>
      </div>

      {/* Interactive Trigger Button */}
      <div className="flex items-center">
        {isCopyable ? (
          <button
            id={`btn-copy-${platform}`}
            className="flex items-center justify-center w-9 h-9 border border-royal-purple/25 hover:border-royal-purple/50 rounded-lg text-slate-400 hover:text-white bg-royal-purple/[0.04] hover:bg-royal-purple/[0.08] transition-all duration-300 cursor-pointer"
            aria-label="Copy Discord tag"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-300 group-hover:text-royal-purple-light" />
            )}
          </button>
        ) : (
          <div className="flex items-center justify-center w-9 h-9 border border-royal-purple/25 hover:border-royal-purple/50 rounded-lg text-slate-400 hover:text-white bg-royal-purple/[0.04] hover:bg-royal-purple/[0.08] transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-royal-purple-light transition-transform duration-300" />
          </div>
        )}
      </div>

      {/* Copy notification confirmation */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute inset-0 bg-royal-purple-dark/95 backdrop-blur-sm rounded-xl flex items-center justify-center gap-2 border border-royal-purple-light/40 z-20"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <span className={`text-sm font-semibold text-white ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {lang === 'ar' ? 'تم نسخ الحساب بنجاح!' : 'Copied username successfully!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const cardClasses = `group relative rounded-xl border ${details.borderColor} ${details.bgColor} transition-all duration-300 overflow-hidden backdrop-blur-md cursor-pointer block`;

  if (isCopyable) {
    return (
      <motion.div
        id={`card-${platform}`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleDiscordClick}
        className={cardClasses}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.a
      id={`link-card-${platform}`}
      href={getUrl()}
      target="_blank"
      rel="noopener noreferrer referrer"
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      className={cardClasses}
    >
      {cardContent}
    </motion.a>
  );
}
