import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  User, 
  AlertCircle,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { ActiveLanguage } from '../types';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

interface AiBotWidgetProps {
  lang: ActiveLanguage;
}

export default function AiBotWidget({ lang }: AiBotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [
        {
          text: lang === 'ar' 
            ? 'مرحبا بك انا مساعد فلوكي الخاص. كيف يمكنني خدمتك؟' 
            : "Hello, I'm Floki's special assistant. How can I help you?"
        }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Keep chat scrolls pinned to actual bottom
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Dynamically translate the initial greeting when language changes (if chat hasn't started yet)
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
      const initialText = lang === 'ar' 
        ? 'مرحبا بك انا مساعد فلوكي الخاص. كيف يمكنني خدمتك؟' 
        : "Hello, I'm Floki's special assistant. How can I help you?";
      if (messages[0].parts[0].text !== initialText) {
        setMessages([
          {
            role: 'model',
            parts: [{ text: initialText }]
          }
        ]);
      }
    }
  }, [lang]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    if (!customText) {
      setInput('');
    }
    
    setErrorMessage(null);

    // Append user message
    const userMsg: Message = {
      role: 'user',
      parts: [{ text: textToSend }]
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Map history payload into server format
      const historyPayload = messages.map(msg => ({
        role: msg.role,
        parts: msg.parts
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          lang: lang
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || 'Server error occurred');
      }

      const data = await res.json();
      
      const modelMsg: Message = {
        role: 'model',
        parts: [{ text: data.reply }]
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err: any) {
      console.error('Chat AI Widget fetch error:', err);
      setErrorMessage(
        lang === 'ar' 
          ? 'عذراً، تعذر الاتصال بمساعد الذكاء الاصطناعي. تأكد من تهيئة مفتاح الـ API لـ Gemini بشكل صحيح.' 
          : 'Could not connect to the AI Assistant. Make sure the Gemini API Key is configured in settings.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        role: 'model',
        parts: [
          {
            text: lang === 'ar' 
              ? 'تمت إعادة ضبط المساعد الخاص بنجاح! اسألني أي شيء عن فلوكي أو سيرفر قراند.' 
              : 'Special assistant reset successfully! Ask me anything about Floki or Grand Arabia RP.'
          }
        ]
      }
    ]);
    setErrorMessage(null);
  };

  // Quick suggestions translation & prompt setups
  const suggestions = lang === 'ar' ? [
    { label: 'جدول البث المباشر؟', prompt: 'ماهو جدول بثوث فلوكي' },
    { label: 'من هو المجرم فلوكي؟', prompt: 'من هو المجرم فلوكي' },
    { label: 'من هو ريموند دام او ايجنت 505', prompt: 'من هو ريموند دام او ايجنت 505' },
    { label: 'حسابات فلوكي الرسمية؟', prompt: 'حسابات فلوكي الرسمية' }
  ] : [
    { label: 'Stream Schedule?', prompt: 'What is Floki\'s stream schedule?' },
    { label: 'Who is criminal Floki?', prompt: 'Who is the criminal Floki?' },
    { label: 'Raymond Dam or Agent 505?', prompt: 'Who is Raymond Dam or Agent 505?' },
    { label: 'Official Accounts?', prompt: "What are Floki's active social media handles?" }
  ];

  return (
    <>
      {/* Floating Action Launching Button */}
      <motion.button
        id="ai-bot-floating-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 bg-gradient-to-tr from-royal-purple via-royal-purple-dark/80 to-black border border-royal-purple/50 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:shadow-[0_0_25px_rgba(124,58,237,0.65)] cursor-pointer transition-shadow duration-300"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot-icon"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-purple-light opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-royal-purple-light border border-obsidian-dark"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Interactive Chat Interface Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-bot-chat-container"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            className={`fixed bottom-22 right-4 left-4 sm:left-auto sm:right-6 z-40 w-auto sm:w-[410px] h-[550px] bg-obsidian-dark/95 border border-royal-purple/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md justify-between`}
          >
            
            {/* Header Area */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-royal-purple/20 via-transparent to-transparent flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-royal-purple/20 border border-royal-purple/40 text-royal-purple-light rounded-xl flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-royal-purple-light" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-royal-purple-light border border-obsidian-dark animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className={`text-xs font-black text-white ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'مساعد فلوكي الخاص' : 'Floki\'s Special Assistant'}
                    </span>
                    <span className="font-mono text-[8px] bg-royal-purple/25 text-royal-purple-light border border-royal-purple/30 px-1 rounded">GEMINI</span>
                  </div>
                  <span className={`text-[9px] text-slate-400 block ${lang === 'ar' ? 'font-arabic' : ''}`}>
                    {lang === 'ar' ? 'نشط الآن للرد على استفساراتك' : 'Online & ready to guide'}
                  </span>
                </div>
              </div>

              {/* Top actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChatHistory}
                  title={lang === 'ar' ? 'مسح المحادثة' : 'Clear Chat'}
                  className="p-1.5 hover:bg-white/[0.05] border border-transparent hover:border-white/5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/[0.05] border border-transparent hover:border-white/5 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Message Panel */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              
              {/* Informative Help Guide */}
              <div className="bg-royal-purple/5 border border-royal-purple/10 rounded-xl p-3 text-left">
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-royal-purple-light shrink-0 mt-0.5" />
                  <div>
                    <h5 className={`text-[11px] font-bold text-slate-200 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'مساعد فلوكي الخاص' : 'Floki\'s Special Assistant'}
                    </h5>
                    <p className={`text-[10px] text-slate-400 leading-normal mt-0.5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      {lang === 'ar' 
                        ? 'اطرح الأسئلة حول البثوث، المحقق ريموند ، المجرم فلوكي وسيجيبك على الفور'
                        : 'Ask facts about schedules, Investigator Raymond, or Criminal Floki and he will reply instantly!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message List Loop */}
              {messages.map((msg, index) => {
                const isAI = msg.role === 'model';
                const messageText = msg.parts[0]?.text || '';
                return (
                  <div
                    key={index}
                    className={`flex gap-2.5 max-w-[85%] ${
                      isAI 
                        ? 'mr-auto text-left flex-row' 
                        : 'ml-auto text-right flex-row-reverse'
                    }`}
                  >
                    {/* Role Avatar Badge */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-1 ${
                      isAI 
                        ? 'bg-royal-purple/15 border-royal-purple/30 text-royal-purple-light' 
                        : 'bg-white/5 border-white/5 text-slate-300'
                    }`}>
                      {isAI ? <Bot className="w-4 h-4" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    {/* Chat Bubble Body */}
                    <div className="space-y-1">
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        isAI 
                          ? 'animated-glow-border-chat text-slate-100 rounded-tl-none' 
                          : 'bg-gradient-to-r from-royal-purple to-[#0b0416] border border-royal-purple/40 text-white rounded-tr-none shadow-[0_0_12px_rgba(124,58,237,0.15)]'
                      } ${lang === 'ar' ? 'font-arabic' : ''}`}>
                         {messageText}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bot thinking placeholder state */}
              {isLoading && (
                <div className="flex gap-2.5 max-w-[80%] mr-auto text-left">
                  <div className="w-7 h-7 rounded-lg bg-royal-purple/15 border border-royal-purple/30 text-royal-purple-light flex items-center justify-center shrink-0 animate-pulse">
                    <Sparkles className="w-4 h-4 animate-spin text-royal-purple-light" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="bg-white/[0.01] border border-white/5 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-purple-light animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-purple-light animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-purple-light animate-bounce [animation-delay:0.4s]" />
                    <span className={`ml-1 text-[11px] ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      {lang === 'ar' ? 'فلوكي بوت يكتب...' : 'Floki Bot is thinking...'}
                    </span>
                  </div>
                </div>
              )}

              {/* Fetch Connection/Setup Warnings */}
              {errorMessage && (
                <div className="bg-rose-900/15 border border-rose-500/20 rounded-xl p-3 text-slate-300 text-[11px] flex gap-2 items-start text-left">
                  <AlertCircle className="w-4.5 h-4.5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className={lang === 'ar' ? 'font-arabic' : ''}>{errorMessage}</p>
                    <p className={`text-[9px] text-slate-400 font-mono ${lang === 'ar' ? 'font-arabic' : ''}`}>
                      {lang === 'ar' 
                        ? 'تنبيه: زر قائمة الإعدادات (البنفسجي) > أضف مفتاح GEMINI_API_KEY لتفعيل الذكاء الاصطناعي بشكل كامل.'
                        : 'Tip: Secrets (Settings > Secrets) to supply your GEMINI_API_KEY.'}
                    </p>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion slider buttons */}
            <div className="px-4 pb-2 pt-1.5 border-t border-white/5 bg-black/[0.15]">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sug.prompt)}
                    disabled={isLoading}
                    className="flex-none px-2.5 py-1.5 bg-gradient-to-r from-royal-purple/20 to-black/80 hover:from-royal-purple/40 hover:to-royal-purple-dark/40 border border-royal-purple/40 hover:border-royal-purple-light/55 rounded-lg text-[10px] font-bold text-slate-200 hover:text-white cursor-pointer transition-all disabled:opacity-50 shadow-sm"
                  >
                    <span className={lang === 'ar' ? 'font-arabic' : ''}>{sug.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input Footer Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-white/5 flex gap-2 items-center bg-obsidian-dark/95"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'ar' ? 'اكتب رسالتك للمساعد الذكي...' : 'Type your message...'}
                disabled={isLoading}
                className={`flex-1 bg-white/[0.02] border border-white/5 hover:border-royal-purple/30 focus:border-royal-purple focus:ring-1 focus:ring-royal-purple rounded-xl px-3 py-2.5 text-xs text-white outline-hidden transition-all duration-200 placeholder:text-slate-500 min-w-0 ${
                  lang === 'ar' ? 'font-arabic text-left' : 'text-left'
                }`}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-royal-purple hover:bg-royal-purple-dark text-white rounded-xl flex items-center justify-center transition-all shadow-md shadow-purple-500/5 cursor-pointer disabled:opacity-30 disabled:hover:bg-royal-purple"
              >
                <Send className="w-4 h-4 rotate-180" style={{ transform: lang === 'ar' ? 'rotate(0deg)' : 'none' }} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
