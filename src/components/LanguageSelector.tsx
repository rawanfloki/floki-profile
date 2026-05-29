import { Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { ActiveLanguage } from '../types';

interface LanguageSelectorProps {
  currentLang: ActiveLanguage;
  onChange: (lang: ActiveLanguage) => void;
}

export default function LanguageSelector({ currentLang, onChange }: LanguageSelectorProps) {
  return (
    <div className="absolute top-4 right-4 z-40 bg-obsidian-dark/80 backdrop-blur-md border border-royal-purple/30 rounded-full p-1 flex items-center gap-1 shadow-lg shadow-purple-500/10">
      <div className="pl-3 pr-2 py-1 text-xs font-medium text-purple-300 flex items-center gap-1">
        <Globe className="w-3.5 h-3.5" />
        <span className="font-arabic text-xs leading-none">
          {currentLang === 'ar' ? 'العربية' : 'EN'}
        </span>
      </div>
      <button
        id="btn-lang-en"
        onClick={() => onChange('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
          currentLang === 'en'
            ? 'bg-royal-purple text-white shadow-md shadow-purple-500/40 font-bold'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        EN
      </button>
      <button
        id="btn-lang-ar"
        onClick={() => onChange('ar')}
        className={`px-3 py-1 rounded-full text-xs font-arabic font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
          currentLang === 'ar'
            ? 'bg-royal-purple text-white shadow-md shadow-purple-500/40 font-bold'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        العربية
      </button>
    </div>
  );
}
