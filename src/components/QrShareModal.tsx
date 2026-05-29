import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, QrCode, Share2 } from 'lucide-react';
import { ActiveLanguage } from '../types';

interface QrShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: ActiveLanguage;
}

export default function QrShareModal({ isOpen, onClose, lang }: QrShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, [isOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const text = {
    title: lang === 'ar' ? 'مشاركة الملف الشخصي' : 'Share Profile',
    desc: lang === 'ar' 
      ? 'امسح رمز الـ QR أدناه أو انسخ الرابط المباشر لمشاركة حسابك مع أصدقائك!' 
      : 'Scan the QR code below or copy the direct link to share your account with friends!',
    copy: lang === 'ar' ? 'نسخ الرابط' : 'Copy Link',
    copied: lang === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!',
    close: lang === 'ar' ? 'إغلاق' : 'Close',
  };

  if (!isOpen) return null;

  // Utilize the free, stable qrserver.com API to generate a royal-purple QR code pointing to this URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=7c3aed&bgcolor=0a0a0c&data=${encodeURIComponent(currentUrl || 'https://floki.profile')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        className="relative w-full max-w-sm bg-obsidian-dark border border-royal-purple/40 rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center z-10 overflow-hidden"
      >
        {/* Glow decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royal-purple to-purple-500" />

        {/* Close Button */}
        <button
          id="btn-close-share"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="p-3 bg-royal-purple/15 rounded-full border border-royal-purple/35 mb-4 mt-2">
          <Share2 className="w-6 h-6 text-purple-400" />
        </div>

        {/* Titles */}
        <h3 className={`text-lg font-bold text-white font-display ${lang === 'ar' ? 'font-arabic' : ''}`}>
          {text.title}
        </h3>
        <p className={`text-xs text-slate-400 mt-2 max-w-xs leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>
          {text.desc}
        </p>

        {/* QR Code Graphic Frame */}
        <div className="relative my-6 p-4 bg-obsidian-black border border-royal-purple/20 rounded-2xl shadow-inner flex items-center justify-center group">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-royal-purple/20 to-purple-500/20 opacity-40 blur-xs group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-[#0a0a0c] p-2.5 rounded-xl border border-white/5">
            <img
              src={qrCodeUrl}
              alt="Profile QR Code"
              className="w-40 h-40 object-contain rounded-lg"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
        </div>

        {/* URL Input Copy Board */}
        <div className="w-full flex items-center gap-2 bg-obsidian-light/60 p-2 rounded-xl border border-white/5 max-w-xs mb-6">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="flex-1 bg-transparent border-none text-[11px] text-slate-400 outline-hidden pl-2 select-all font-mono truncate"
          />
          <button
            id="btn-copy-share-link"
            onClick={handleCopyLink}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1.5 shrink-0 ${
              copied
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-royal-purple hover:bg-royal-purple-dark text-white hover:text-white'
            }`}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span className={lang === 'ar' ? 'font-arabic text-[11px]' : 'text-[11px]'}>
              {copied ? text.copied : text.copy}
            </span>
          </button>
        </div>

        {/* Custom Close Button */}
        <button
          id="btn-close-share-footer"
          onClick={onClose}
          className={`w-full py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/10 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${lang === 'ar' ? 'font-arabic' : ''}`}
        >
          {text.close}
        </button>
      </motion.div>
    </div>
  );
}
