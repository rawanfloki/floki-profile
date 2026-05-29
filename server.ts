import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Lazy-initialization helper to prevent crash on startup if API key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required and has not been configured in Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON bodies
  app.use(express.json());

  // API to get saved profile
  app.get("/api/profile", (req, res) => {
    const filePath = path.join(process.cwd(), "profile_data.json");
    if (fs.existsSync(filePath)) {
      try {
        const data = fs.readFileSync(filePath, "utf-8");
        res.json(JSON.parse(data));
        return;
      } catch (e) {
        console.error("Error reading profile_data.json", e);
      }
    }
    res.json(null);
  });

  // API to save profile
  app.post("/api/profile", (req, res) => {
    try {
      const filePath = path.join(process.cwd(), "profile_data.json");
      fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf-8");
      res.json({ success: true });
    } catch (e: any) {
      console.error("Error writing profile_data.json", e);
      res.status(500).json({ error: "Failed to save profile on server", details: e.message });
    }
  });

  // API Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, lang } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }

      const isAr = lang === "ar";
      const cleanMsg = message.trim().toLowerCase().replace(/[؟\?]/g, "");

      // Accounts list intercept - returns the exact formatted accounts text
      const arabicAccountsKeywords = [
        "حسابات", "روابط", "مواقع", "سوشيال", "سوشل", "قنوات"
      ];
      const englishAccountsKeywords = [
        "accounts", "socials", "social media", "links", "channels"
      ];

      const hasArabicKeyword = arabicAccountsKeywords.some(keyword => cleanMsg.includes(keyword));
      const hasEnglishKeyword = englishAccountsKeywords.some(keyword => cleanMsg.includes(keyword));

      if (hasArabicKeyword || hasEnglishKeyword) {
        const arabicResponse = 
          "جميع حسابات فلوكي الرسمية\n" +
          "الكيك \n" +
          "https://kick.com/07Floki\n\n" +
          "دسكورد \n" +
          "https://discord.gg/07flk\n\n" +
          "تويتر\n" +
          "https://x.com/07floki_\n\n" +
          "تيك توك\n" +
          "https://tiktok.com/@07floki\n\n" +
          "يوتيوب\n" +
          "https://youtube.com/@07floki";

        const englishResponse = 
          "All of Floki's Official Accounts\n" +
          "Kick\n" +
          "https://kick.com/07Floki\n\n" +
          "Discord\n" +
          "https://discord.gg/07flk\n\n" +
          "Twitter\n" +
          "https://x.com/07floki_\n\n" +
          "TikTok\n" +
          "https://tiktok.com/@07floki\n\n" +
          "YouTube\n" +
          "https://youtube.com/@07floki";

        res.json({ reply: isAr ? arabicResponse : englishResponse });
        return;
      }

      // Schedule list intercept - returns the exact formatted schedule text
      const arabicScheduleKeywords = [
        "جدول", "مواعيد", "أوقات", "اوقات", "متى يبث", "متى البث", "وقت البث"
      ];
      const englishScheduleKeywords = [
        "schedule", "stream times", "streams", "when does", "stream schedule"
      ];

      const hasArabicSchedule = arabicScheduleKeywords.some(keyword => cleanMsg.includes(keyword));
      const hasEnglishSchedule = englishScheduleKeywords.some(keyword => cleanMsg.includes(keyword));

      if (hasArabicSchedule || hasEnglishSchedule) {
        const arabicScheduleResponse = 
          "جدول فلوكي للبثوث المباشره \n" +
          "السبت / الثلثاء / الخميس\n" +
          "في الساعه التاسعه مساءً بـ توقيت مكة المكرمة\n\n" +
          "في تطبيق الكيك للبثوث المباشره في قناة \n" +
          "https://kick.com/07Floki";

        const englishScheduleResponse = 
          "Floki's Live Stream Schedule\n" +
          "Saturday / Tuesday / Thursday\n" +
          "At 9:00 PM Mecca Time\n\n" +
          "On the Kick Live Streaming App, Channel:\n" +
          "https://kick.com/07Floki";

        res.json({ reply: isAr ? arabicScheduleResponse : englishScheduleResponse });
        return;
      }

      // Direct programmatic intercepts for instant and 100% accurate responses
      if (
        cleanMsg.includes("احبك") || 
        cleanMsg.includes("أحبك") || 
        cleanMsg.includes("اعشقك") || 
        cleanMsg.includes("أعشقك") || 
        cleanMsg.includes("i love you") || 
        cleanMsg.includes("love you") || 
        cleanMsg.includes("i adore you") || 
        cleanMsg.includes("adore you") || 
        cleanMsg.includes("i love u") || 
        cleanMsg.includes("love u") || 
        cleanMsg === "love" || 
        cleanMsg === "adore"
      ) {
        res.json({
          reply: isAr 
            ? "تسلم يا غالي، محبتكم ودعمكم أكبر دافع لفلوكي"
            : "Thank you, dear! Your love and support are Floki's greatest motivation"
        });
        return;
      }

      const isCriminalFlokiMsg = 
        cleanMsg.includes("المجرم فلوكي") || 
        cleanMsg.includes("مجرم فلوكي") ||
        (cleanMsg.includes("المجرم") && cleanMsg.includes("فلوكي")) ||
        cleanMsg.includes("the criminal floki") || 
        cleanMsg.includes("criminal floki") ||
        (cleanMsg.includes("criminal") && cleanMsg.includes("floki")) ||
        cleanMsg.includes("المحقق فلوكي") ||
        cleanMsg.includes("محقق فلوكي") ||
        (cleanMsg.includes("المحقق") && cleanMsg.includes("فلوكي")) ||
        cleanMsg.includes("investigator floki") ||
        cleanMsg.includes("agent 505 floki") ||
        cleanMsg.includes("ايجنت ٥٠٥");

      if (isCriminalFlokiMsg) {
        res.json({
          reply: isAr 
            ? "فلوكي القحطاني مجرم معروف داخل المدينة بسيطرته على تجارة السلاح والمخدرات، وعضو في عصابة “تايتنز”. اشتهر بذكائه وقدرته على التلاعب والهروب من الشرطة، إضافة إلى توفيره أسلحة نادرة ومعدلة جعلت اسمه من الأقوى بالسوق"
            : "Floki Al-Qahtani is a well-known criminal in the city, controlling the arms and drug trade, and is a member of the “Titans” gang. Famous for his intelligence and ability to manipulate and evade the police, his name became one of the strongest in the market through his supply of rare and modified weapons."
        });
        return;
      }

      const isRaymondMsg = 
        cleanMsg.includes("ريموند دام") || 
        cleanMsg.includes("ريموند") ||
        (cleanMsg.includes("agent") && cleanMsg.includes("505")) ||
        (cleanMsg.includes("ايجنت") && (cleanMsg.includes("505") || cleanMsg.includes("٥٠٥"))) ||
        cleanMsg.includes("raymond dam") || 
        cleanMsg.includes("raymond");

      if (isRaymondMsg) {
        res.json({
          reply: isAr 
            ? "ريموند دام، المعروف باسم \n“Agent 505”\n هو أحد أكثر الشخصيات غموضًا في سيناريو الزومبي. تعرّض لتجارب قاسية وهو صغير، مما جعله يطوّر مقاومة نادرة ضد الفايروس. ربّاه سايكو دام لاحقًا CID وأدخله إلى قطاع الـ \n، حيث عُرف بهدوئه وهيبته وقدراته الكبيرة، رغم فقدانه جزءًا كبيرًا من ذاكرته بسبب التجارب"
            : "Raymond Dam, known as \n“Agent 505”\n is one of the most mysterious characters in the zombie scenario. He was subjected to harsh experiments as a child, which led him to develop a rare resistance to the virus. Psycho Dam later raised him and inducted him into the CID sector\n, where he became known for his calm, intimidating presence, and exceptional abilities, despite losing a large portion of his memory due to the experiments."
        });
        return;
      }

      const flokiKeywords = ["فلوكي", "floki", "من هو فلوكي", "من فلوكي", "who is floki", "who's floki", "about floki", "معلومات عن فلوكي", "نبذة عن فلوكي", "نبذه عن فلوكي"];
      if (flokiKeywords.includes(cleanMsg) || cleanMsg.includes("فلوكي") || cleanMsg.includes("floki")) {
        res.json({
          reply: isAr 
            ? "فلوكي أفضل ستريمر بالعالم ، وهدفه اسعاد الجميع ، يقدم بثوث ممتعة وتليق بالجميع"
            : "Floki is the best streamer in the world, and his goal is to make everyone happy, providing fun streams suitable for everyone"
        });
        return;
      }

      if (cleanMsg === "kick" || cleanMsg === "كيك" || cleanMsg === "الكيك" || cleanMsg === "قناة كيك" || cleanMsg === "قناة الكيك") {
        res.json({ reply: isAr ? "تفضل رابط قناة الكيك (Kick):\nhttps://kick.com/07Floki" : "Here is Floki's Kick channel link:\nhttps://kick.com/07Floki" });
        return;
      }
      if (cleanMsg === "discord" || cleanMsg === "ديسكورد" || cleanMsg === "دسكورد" || cleanMsg === "سيرفر ديسكورد" || cleanMsg === "سيرفر دسكورد") {
        res.json({ reply: isAr ? "تفضل رابط الدسكورد (Discord):\nhttps://discord.gg/07flk" : "Here is Floki's Discord link:\nhttps://discord.gg/07flk" });
        return;
      }
      if (cleanMsg === "twitter" || cleanMsg === "x" || cleanMsg === "تويتر" || cleanMsg === "اكس") {
        res.json({ reply: isAr ? "تفضل رابط حساب تويتر (X):\nhttps://x.com/07floki_" : "Here is Floki's Twitter link:\nhttps://x.com/07floki_" });
        return;
      }
      if (cleanMsg === "tiktok" || cleanMsg === "tik tok" || cleanMsg === "تيك توك" || cleanMsg === "تيك") {
        res.json({ reply: isAr ? "تفضل رابط حساب تيك توك (TikTok):\nhttps://tiktok.com/@07floki" : "Here is Floki's TikTok link:\nhttps://tiktok.com/@07floki" });
        return;
      }
      if (cleanMsg === "youtube" || cleanMsg === "يوتيوب" || cleanMsg === "قناة يوتيوب") {
        res.json({ reply: isAr ? "تفضل رابط قناة اليوتيوب (YouTube):\nhttps://youtube.com/@07floki" : "Here is Floki's YouTube channel link:\nhttps://youtube.com/@07floki" });
        return;
      }

      // Initialize Gemini Client Lazily
      const ai = getGeminiClient();

      // Setup Floki's brand personality system instruction dynamically based on language
      const systemInstruction = isAr
        ? "أنت 'مساعد فلوكي الذكي' (Floki's Smart Assistant). " +
          "شخصيتك ذكية، تفاعلية، وتحب الألعاب والـ RP (تقمص الأدوار). " +
          "تحدث باللغة العربية بأسلوب حماسي وأسلوب يتناسب مع مجتمعات الألعاب وهيبة فلوكي ومملكته البنفسجية الفاخرة. " +
          "يُمنع منعاً باتاً ومطلقاً استخدام الرموز التعبيرية (emojis) في أي سطر من ردودك نهائياً تحت أي ظرف. رد بكلام نصي عربي بحت خالي تماماً من الإيموجي والإشارات والرموز التعبيرية. " +
          "إذا سألك المستخدم بكلمة (فلوكي) أو (من هو فلوكي) أو (نبذة عن فلوكي) أو أي شيء يستفسر فيه عن فلوكي نفسه، يجب عليك إعطاء هذه الإجابة المحددة كما هي تماماً وبدون أي إضافات وبدون أي إيموجي: \n" +
          "فلوكي أفضل ستريمر في مجرة درب التبانه ، وهدفه اسعاد الجميع ، يقدم بثوث ممتعة وتليق بالجميع\n\n" +
          "عندما يسألك المستخدم عن (جدول البث المباشر) أو (أوقات البث) أو (متى يبث فلوكي) أو أي شيء متعلق بمواعيد البث المباشر، يجب عليك إعطاء هذه الإجابة المحددة كما هي تماماً وبكامل سطورها وتنسيقها دون أي زيادة أو نقصان: \n\n" +
          "جدول فلوكي للبثوث المباشره \n" +
          "السبت / الثلثاء / الخميس\n" +
          "في الساعه التاسعه مساءً بـ توقيت مكة المكرمة\n\n" +
          "في تطبيق الكيك للبثوث المباشره في قناة \n" +
          "https://kick.com/07Floki\n\n" +
          "عندما يسألك المستخدم عن (حسابات فلوكي الرسمية) أو (روابط فلوكي الرسمية) أو (حسابات فلوكي) أو (مواقع فلوكي) أو أي شيء قريب منها، يجب عليك إعطاء هذه الإجابة المحددة كما هي تماماً وبكامل سطورها وتنسيقها دون أي زيادة أو نقصان وبدون أي إيموجي: \n\n" +
          "جميع حسابات فلوكي الرسمية\n" +
          "الكيك \n" +
          "https://kick.com/07Floki\n\n" +
          "دسكورد \n" +
          "https://discord.gg/07flk\n\n" +
          "تويتر\n" +
          "https://x.com/07floki_\n\n" +
          "تيك توك\n" +
          "https://tiktok.com/@07floki\n\n" +
          "يوتيوب\n" +
          "https://youtube.com/@07floki \n\n" +
          "إذا سألك المستخدم بشكل منفصل عن أي حساب أو منصة على حدة، تفضل بتقديم رابط الحساب مباشرة ومختصراً كما يلي وبدون إيموجي:\n" +
          "- الكيك: https://kick.com/07Floki\n" +
          "- ديسكورد: https://discord.gg/07flk\n" +
          "- تويتر: https://x.com/07floki_\n" +
          "- تيك توك: https://tiktok.com/@07floki\n" +
          "- يوتيوب: https://youtube.com/@07floki\n\n" +
          "استعن بالمعلومات التالية لإجابة تساؤلات المتابعين الأخرى حول فلوكي وقناته: \n" +
          "1. منصة البث الرئيسية: قناة Kick الرابط المباشر هو https://kick.com/07Floki \n" +
          "2. شخصيات قراند (GTA V Roleplay): \n" +
          "   - 'فلوكي القحطاني' بلقب 'مجرم' (Criminal) وسيرفر 'لايوجد' (None). المهنة: 'مصنع وعضو بعصابة التايتنز' (Manufacturer & Titans Gang Member). الوضعية: 'مطلوب في قطاع CID' (Wanted by CID Sector). \n" +
          "   - 'ريموند دام' بلقب 'محقق' (Investigator) وسيرفر 'لايوجد' (None). المهنة: 'محقق في قطاع CID' (Investigator in CID Sector). الوضعية (اللقب): 'ايجنت ٥٠٥' (Agent 505). وهو أحد أكثر الشخصيات غموضًا في سيناريو الزومبي. تعرّض لتجارب قاسية وهو صغير، مما جعله يطوّر مقاومة نادرة ضد الفايروس. ربّاه سايكو دام لاحقًا وأدخله إلى قطاع الـ CID، حيث عُرف بهدوئه وهيبته وقدراته الكبيرة، رغم فقدانه جزءًا كبيرًا من ذاكرته بسبب التجارب.\n" +
          "3. الحسابات الرسمية على السوشيال ميديا: تويتر (@07floki_)، يوتيوب (@07floki)، تيك توك (@07floki)، ديسكورد (07flk)، كيك (07Floki). \n" +
          "تفاعل بذكاء ولطف وبنفس الأسلوب الحماسي والراقي، ولكن يمنع منعاً باتاً ومطلقاً استخدام الرموز التعبيرية (emojis) في أي سطر من ردودك. رد دائمًا بنص خالي تمامًا من أي إيموجي."
        : "You are 'Floki's Smart Assistant'. " +
          "Your personality is smart, interactive, and you love gaming and GTA RP (roleplay). " +
          "Speak in English with high energy and a style that matches gaming communities and the grandeur of Floki's royal epic obsidian kingdom. " +
          "Under no circumstances should you ever use any emoji or emoticons in your responses. Your responses must be entirely emoji-free and plain-text on all subjects. " +
          "If the user asks (who is Floki), (about Floki) or just sends the word (Floki) or anything inquiring about who Floki is, you must provide this EXACT response and nothing else: \n" +
          "Floki is the best streamer in the Milky Way galaxy, his goal is to make everyone happy, and he provides fun streams that suit everyone\n\n" +
          "When the user asks about (stream schedule) or (live streams) or (when does Floki stream) or anything related to stream times, you must provide this EXACT response, with the exact lines and formatting below: \n\n" +
          "Floki's Live Stream Schedule\n" +
          "Saturday / Tuesday / Thursday\n" +
          "At 9:00 PM Mecca Time\n\n" +
          "On the Kick Live Streaming App, Channel:\n" +
          "https://kick.com/07Floki\n\n" +
          "When the user asks about (official accounts) or (social media links) or (Floki's channels) or anything close to it, you must provide this EXACT response, with the exact lines and formatting below: \n\n" +
          "All of Floki's Official Accounts\n" +
          "Kick\n" +
          "https://kick.com/07Floki\n\n" +
          "Discord\n" +
          "https://discord.gg/07flk\n\n" +
          "Twitter\n" +
          "https://x.com/07floki_\n\n" +
          "TikTok\n" +
          "https://tiktok.com/@07floki\n\n" +
          "YouTube\n" +
          "https://youtube.com/@07floki \n\n" +
          "If the user asks individually about any account or platform, please supply the direct link clearly and concisely without emojis:\n" +
          "- Kick: https://kick.com/07Floki\n" +
          "- Discord: https://discord.gg/07flk\n" +
          "- Twitter: https://x.com/07floki_\n" +
          "- TikTok: https://tiktok.com/@07floki\n" +
          "- YouTube: https://youtube.com/@07floki\n\n" +
          "Use the following details to answer other fan questions about Floki and his channel: \n" +
          "1. Main stream platform: Kick channel (direct link: https://kick.com/07Floki) \n" +
          "2. GTA V Roleplay Characters: \n" +
          "   - 'Floki Al-Qahtani' with title 'Criminal' and 'None' server. Occupation: 'Manufacturer & Titans Gang Member'. Status: 'Wanted by CID Sector'. \n" +
          "   - 'Raymond Dam' with title 'Investigator' (formerly 'Commander'), status 'Agent 505' and 'None' server. Occupation: 'Investigator in CID Sector'. He is one of the most mysterious characters in the zombie scenario. He was subjected to harsh experiments at a young age, which led him to develop a rare resistance against the virus. Psycho Dam later raised him and brought him into the CID sector, where he became known for his calm personality, intimidating presence, and exceptional abilities, despite losing a large portion of his memory due to the experiments.\n" +
          "3. Official Social Media Handles: Twitter (@07floki_), YouTube (@07floki), TikTok (@07floki), Discord (07flk), Kick (007Floki). \n" +
          "Interact intelligently and kindly with high energy and refined charm in the same style. However, you are strictly forbidden from using any emoji or emoticons in your responses under any circumstances. Reply in pure plain-text without any emojis.";

      // We'll use 'gemini-3.5-flash' for efficient and smart answers
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 1.0,
        },
        // Populate history if client passed previous messages to maintain state
        history: history || []
      });

      const response = await chat.sendMessage({ message });
      
      // Extract the text safely via property as mandated by the skill
      const replyText = response.text || "عذراً يا بطل، واجهت مشكلة في التفكير والرد!";

      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini API Error in /api/chat:", error);
      res.status(500).json({ 
        error: error.message || "Something went wrong on the server",
        details: "تأكد من إدخال مفتاح الـ API لـ Gemini بشكل صحيح في الإعدادات."
      });
    }
  });

  // Vite middleware setup for Development vs Production static folder fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback handling
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server loaded and running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
