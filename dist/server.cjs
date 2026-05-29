var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required and has not been configured in Secrets.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/profile", (req, res) => {
    const filePath = import_path.default.join(process.cwd(), "profile_data.json");
    if (import_fs.default.existsSync(filePath)) {
      try {
        const data = import_fs.default.readFileSync(filePath, "utf-8");
        res.json(JSON.parse(data));
        return;
      } catch (e) {
        console.error("Error reading profile_data.json", e);
      }
    }
    res.json(null);
  });
  app.post("/api/profile", (req, res) => {
    try {
      const filePath = import_path.default.join(process.cwd(), "profile_data.json");
      import_fs.default.writeFileSync(filePath, JSON.stringify(req.body, null, 2), "utf-8");
      res.json({ success: true });
    } catch (e) {
      console.error("Error writing profile_data.json", e);
      res.status(500).json({ error: "Failed to save profile on server", details: e.message });
    }
  });
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, lang } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required" });
        return;
      }
      const isAr = lang === "ar";
      const cleanMsg = message.trim().toLowerCase().replace(/[؟\?]/g, "");
      const arabicAccountsKeywords = [
        "\u062D\u0633\u0627\u0628\u0627\u062A",
        "\u0631\u0648\u0627\u0628\u0637",
        "\u0645\u0648\u0627\u0642\u0639",
        "\u0633\u0648\u0634\u064A\u0627\u0644",
        "\u0633\u0648\u0634\u0644",
        "\u0642\u0646\u0648\u0627\u062A"
      ];
      const englishAccountsKeywords = [
        "accounts",
        "socials",
        "social media",
        "links",
        "channels"
      ];
      const hasArabicKeyword = arabicAccountsKeywords.some((keyword) => cleanMsg.includes(keyword));
      const hasEnglishKeyword = englishAccountsKeywords.some((keyword) => cleanMsg.includes(keyword));
      if (hasArabicKeyword || hasEnglishKeyword) {
        const arabicResponse = "\u062C\u0645\u064A\u0639 \u062D\u0633\u0627\u0628\u0627\u062A \u0641\u0644\u0648\u0643\u064A \u0627\u0644\u0631\u0633\u0645\u064A\u0629\n\u0627\u0644\u0643\u064A\u0643 \nhttps://kick.com/07Floki\n\n\u062F\u0633\u0643\u0648\u0631\u062F \nhttps://discord.gg/07flk\n\n\u062A\u0648\u064A\u062A\u0631\nhttps://x.com/07floki_\n\n\u062A\u064A\u0643 \u062A\u0648\u0643\nhttps://tiktok.com/@07floki\n\n\u064A\u0648\u062A\u064A\u0648\u0628\nhttps://youtube.com/@07floki";
        const englishResponse = "All of Floki's Official Accounts\nKick\nhttps://kick.com/07Floki\n\nDiscord\nhttps://discord.gg/07flk\n\nTwitter\nhttps://x.com/07floki_\n\nTikTok\nhttps://tiktok.com/@07floki\n\nYouTube\nhttps://youtube.com/@07floki";
        res.json({ reply: isAr ? arabicResponse : englishResponse });
        return;
      }
      const arabicScheduleKeywords = [
        "\u062C\u062F\u0648\u0644",
        "\u0645\u0648\u0627\u0639\u064A\u062F",
        "\u0623\u0648\u0642\u0627\u062A",
        "\u0627\u0648\u0642\u0627\u062A",
        "\u0645\u062A\u0649 \u064A\u0628\u062B",
        "\u0645\u062A\u0649 \u0627\u0644\u0628\u062B",
        "\u0648\u0642\u062A \u0627\u0644\u0628\u062B"
      ];
      const englishScheduleKeywords = [
        "schedule",
        "stream times",
        "streams",
        "when does",
        "stream schedule"
      ];
      const hasArabicSchedule = arabicScheduleKeywords.some((keyword) => cleanMsg.includes(keyword));
      const hasEnglishSchedule = englishScheduleKeywords.some((keyword) => cleanMsg.includes(keyword));
      if (hasArabicSchedule || hasEnglishSchedule) {
        const arabicScheduleResponse = "\u062C\u062F\u0648\u0644 \u0641\u0644\u0648\u0643\u064A \u0644\u0644\u0628\u062B\u0648\u062B \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0647 \n\u0627\u0644\u0633\u0628\u062A / \u0627\u0644\u062B\u0644\u062B\u0627\u0621 / \u0627\u0644\u062E\u0645\u064A\u0633\n\u0641\u064A \u0627\u0644\u0633\u0627\u0639\u0647 \u0627\u0644\u062A\u0627\u0633\u0639\u0647 \u0645\u0633\u0627\u0621\u064B \u0628\u0640 \u062A\u0648\u0642\u064A\u062A \u0645\u0643\u0629 \u0627\u0644\u0645\u0643\u0631\u0645\u0629\n\n\u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0643\u064A\u0643 \u0644\u0644\u0628\u062B\u0648\u062B \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0647 \u0641\u064A \u0642\u0646\u0627\u0629 \nhttps://kick.com/07Floki";
        const englishScheduleResponse = "Floki's Live Stream Schedule\nSaturday / Tuesday / Thursday\nAt 9:00 PM Mecca Time\n\nOn the Kick Live Streaming App, Channel:\nhttps://kick.com/07Floki";
        res.json({ reply: isAr ? arabicScheduleResponse : englishScheduleResponse });
        return;
      }
      if (cleanMsg.includes("\u0627\u062D\u0628\u0643") || cleanMsg.includes("\u0623\u062D\u0628\u0643") || cleanMsg.includes("\u0627\u0639\u0634\u0642\u0643") || cleanMsg.includes("\u0623\u0639\u0634\u0642\u0643") || cleanMsg.includes("i love you") || cleanMsg.includes("love you") || cleanMsg.includes("i adore you") || cleanMsg.includes("adore you") || cleanMsg.includes("i love u") || cleanMsg.includes("love u") || cleanMsg === "love" || cleanMsg === "adore") {
        res.json({
          reply: isAr ? "\u062A\u0633\u0644\u0645 \u064A\u0627 \u063A\u0627\u0644\u064A\u060C \u0645\u062D\u0628\u062A\u0643\u0645 \u0648\u062F\u0639\u0645\u0643\u0645 \u0623\u0643\u0628\u0631 \u062F\u0627\u0641\u0639 \u0644\u0641\u0644\u0648\u0643\u064A" : "Thank you, dear! Your love and support are Floki's greatest motivation"
        });
        return;
      }
      const isCriminalFlokiMsg = cleanMsg.includes("\u0627\u0644\u0645\u062C\u0631\u0645 \u0641\u0644\u0648\u0643\u064A") || cleanMsg.includes("\u0645\u062C\u0631\u0645 \u0641\u0644\u0648\u0643\u064A") || cleanMsg.includes("\u0627\u0644\u0645\u062C\u0631\u0645") && cleanMsg.includes("\u0641\u0644\u0648\u0643\u064A") || cleanMsg.includes("the criminal floki") || cleanMsg.includes("criminal floki") || cleanMsg.includes("criminal") && cleanMsg.includes("floki") || cleanMsg.includes("\u0627\u0644\u0645\u062D\u0642\u0642 \u0641\u0644\u0648\u0643\u064A") || cleanMsg.includes("\u0645\u062D\u0642\u0642 \u0641\u0644\u0648\u0643\u064A") || cleanMsg.includes("\u0627\u0644\u0645\u062D\u0642\u0642") && cleanMsg.includes("\u0641\u0644\u0648\u0643\u064A") || cleanMsg.includes("investigator floki") || cleanMsg.includes("agent 505 floki") || cleanMsg.includes("\u0627\u064A\u062C\u0646\u062A \u0665\u0660\u0665");
      if (isCriminalFlokiMsg) {
        res.json({
          reply: isAr ? "\u0641\u0644\u0648\u0643\u064A \u0627\u0644\u0642\u062D\u0637\u0627\u0646\u064A \u0645\u062C\u0631\u0645 \u0645\u0639\u0631\u0648\u0641 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u062F\u064A\u0646\u0629 \u0628\u0633\u064A\u0637\u0631\u062A\u0647 \u0639\u0644\u0649 \u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u062D \u0648\u0627\u0644\u0645\u062E\u062F\u0631\u0627\u062A\u060C \u0648\u0639\u0636\u0648 \u0641\u064A \u0639\u0635\u0627\u0628\u0629 \u201C\u062A\u0627\u064A\u062A\u0646\u0632\u201D. \u0627\u0634\u062A\u0647\u0631 \u0628\u0630\u0643\u0627\u0626\u0647 \u0648\u0642\u062F\u0631\u062A\u0647 \u0639\u0644\u0649 \u0627\u0644\u062A\u0644\u0627\u0639\u0628 \u0648\u0627\u0644\u0647\u0631\u0648\u0628 \u0645\u0646 \u0627\u0644\u0634\u0631\u0637\u0629\u060C \u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u062A\u0648\u0641\u064A\u0631\u0647 \u0623\u0633\u0644\u062D\u0629 \u0646\u0627\u062F\u0631\u0629 \u0648\u0645\u0639\u062F\u0644\u0629 \u062C\u0639\u0644\u062A \u0627\u0633\u0645\u0647 \u0645\u0646 \u0627\u0644\u0623\u0642\u0648\u0649 \u0628\u0627\u0644\u0633\u0648\u0642" : "Floki Al-Qahtani is a well-known criminal in the city, controlling the arms and drug trade, and is a member of the \u201CTitans\u201D gang. Famous for his intelligence and ability to manipulate and evade the police, his name became one of the strongest in the market through his supply of rare and modified weapons."
        });
        return;
      }
      const isRaymondMsg = cleanMsg.includes("\u0631\u064A\u0645\u0648\u0646\u062F \u062F\u0627\u0645") || cleanMsg.includes("\u0631\u064A\u0645\u0648\u0646\u062F") || cleanMsg.includes("agent") && cleanMsg.includes("505") || cleanMsg.includes("\u0627\u064A\u062C\u0646\u062A") && (cleanMsg.includes("505") || cleanMsg.includes("\u0665\u0660\u0665")) || cleanMsg.includes("raymond dam") || cleanMsg.includes("raymond");
      if (isRaymondMsg) {
        res.json({
          reply: isAr ? "\u0631\u064A\u0645\u0648\u0646\u062F \u062F\u0627\u0645\u060C \u0627\u0644\u0645\u0639\u0631\u0648\u0641 \u0628\u0627\u0633\u0645 \n\u201CAgent 505\u201D\n \u0647\u0648 \u0623\u062D\u062F \u0623\u0643\u062B\u0631 \u0627\u0644\u0634\u062E\u0635\u064A\u0627\u062A \u063A\u0645\u0648\u0636\u064B\u0627 \u0641\u064A \u0633\u064A\u0646\u0627\u0631\u064A\u0648 \u0627\u0644\u0632\u0648\u0645\u0628\u064A. \u062A\u0639\u0631\u0651\u0636 \u0644\u062A\u062C\u0627\u0631\u0628 \u0642\u0627\u0633\u064A\u0629 \u0648\u0647\u0648 \u0635\u063A\u064A\u0631\u060C \u0645\u0645\u0627 \u062C\u0639\u0644\u0647 \u064A\u0637\u0648\u0651\u0631 \u0645\u0642\u0627\u0648\u0645\u0629 \u0646\u0627\u062F\u0631\u0629 \u0636\u062F \u0627\u0644\u0641\u0627\u064A\u0631\u0648\u0633. \u0631\u0628\u0651\u0627\u0647 \u0633\u0627\u064A\u0643\u0648 \u062F\u0627\u0645 \u0644\u0627\u062D\u0642\u064B\u0627 CID \u0648\u0623\u062F\u062E\u0644\u0647 \u0625\u0644\u0649 \u0642\u0637\u0627\u0639 \u0627\u0644\u0640 \n\u060C \u062D\u064A\u062B \u0639\u064F\u0631\u0641 \u0628\u0647\u062F\u0648\u0626\u0647 \u0648\u0647\u064A\u0628\u062A\u0647 \u0648\u0642\u062F\u0631\u0627\u062A\u0647 \u0627\u0644\u0643\u0628\u064A\u0631\u0629\u060C \u0631\u063A\u0645 \u0641\u0642\u062F\u0627\u0646\u0647 \u062C\u0632\u0621\u064B\u0627 \u0643\u0628\u064A\u0631\u064B\u0627 \u0645\u0646 \u0630\u0627\u0643\u0631\u062A\u0647 \u0628\u0633\u0628\u0628 \u0627\u0644\u062A\u062C\u0627\u0631\u0628" : "Raymond Dam, known as \n\u201CAgent 505\u201D\n is one of the most mysterious characters in the zombie scenario. He was subjected to harsh experiments as a child, which led him to develop a rare resistance to the virus. Psycho Dam later raised him and inducted him into the CID sector\n, where he became known for his calm, intimidating presence, and exceptional abilities, despite losing a large portion of his memory due to the experiments."
        });
        return;
      }
      const flokiKeywords = ["\u0641\u0644\u0648\u0643\u064A", "floki", "\u0645\u0646 \u0647\u0648 \u0641\u0644\u0648\u0643\u064A", "\u0645\u0646 \u0641\u0644\u0648\u0643\u064A", "who is floki", "who's floki", "about floki", "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0639\u0646 \u0641\u0644\u0648\u0643\u064A", "\u0646\u0628\u0630\u0629 \u0639\u0646 \u0641\u0644\u0648\u0643\u064A", "\u0646\u0628\u0630\u0647 \u0639\u0646 \u0641\u0644\u0648\u0643\u064A"];
      if (flokiKeywords.includes(cleanMsg) || cleanMsg.includes("\u0641\u0644\u0648\u0643\u064A") || cleanMsg.includes("floki")) {
        res.json({
          reply: isAr ? "\u0641\u0644\u0648\u0643\u064A \u0623\u0641\u0636\u0644 \u0633\u062A\u0631\u064A\u0645\u0631 \u0628\u0627\u0644\u0639\u0627\u0644\u0645 \u060C \u0648\u0647\u062F\u0641\u0647 \u0627\u0633\u0639\u0627\u062F \u0627\u0644\u062C\u0645\u064A\u0639 \u060C \u064A\u0642\u062F\u0645 \u0628\u062B\u0648\u062B \u0645\u0645\u062A\u0639\u0629 \u0648\u062A\u0644\u064A\u0642 \u0628\u0627\u0644\u062C\u0645\u064A\u0639" : "Floki is the best streamer in the world, and his goal is to make everyone happy, providing fun streams suitable for everyone"
        });
        return;
      }
      if (cleanMsg === "kick" || cleanMsg === "\u0643\u064A\u0643" || cleanMsg === "\u0627\u0644\u0643\u064A\u0643" || cleanMsg === "\u0642\u0646\u0627\u0629 \u0643\u064A\u0643" || cleanMsg === "\u0642\u0646\u0627\u0629 \u0627\u0644\u0643\u064A\u0643") {
        res.json({ reply: isAr ? "\u062A\u0641\u0636\u0644 \u0631\u0627\u0628\u0637 \u0642\u0646\u0627\u0629 \u0627\u0644\u0643\u064A\u0643 (Kick):\nhttps://kick.com/07Floki" : "Here is Floki's Kick channel link:\nhttps://kick.com/07Floki" });
        return;
      }
      if (cleanMsg === "discord" || cleanMsg === "\u062F\u064A\u0633\u0643\u0648\u0631\u062F" || cleanMsg === "\u062F\u0633\u0643\u0648\u0631\u062F" || cleanMsg === "\u0633\u064A\u0631\u0641\u0631 \u062F\u064A\u0633\u0643\u0648\u0631\u062F" || cleanMsg === "\u0633\u064A\u0631\u0641\u0631 \u062F\u0633\u0643\u0648\u0631\u062F") {
        res.json({ reply: isAr ? "\u062A\u0641\u0636\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u062F\u0633\u0643\u0648\u0631\u062F (Discord):\nhttps://discord.gg/07flk" : "Here is Floki's Discord link:\nhttps://discord.gg/07flk" });
        return;
      }
      if (cleanMsg === "twitter" || cleanMsg === "x" || cleanMsg === "\u062A\u0648\u064A\u062A\u0631" || cleanMsg === "\u0627\u0643\u0633") {
        res.json({ reply: isAr ? "\u062A\u0641\u0636\u0644 \u0631\u0627\u0628\u0637 \u062D\u0633\u0627\u0628 \u062A\u0648\u064A\u062A\u0631 (X):\nhttps://x.com/07floki_" : "Here is Floki's Twitter link:\nhttps://x.com/07floki_" });
        return;
      }
      if (cleanMsg === "tiktok" || cleanMsg === "tik tok" || cleanMsg === "\u062A\u064A\u0643 \u062A\u0648\u0643" || cleanMsg === "\u062A\u064A\u0643") {
        res.json({ reply: isAr ? "\u062A\u0641\u0636\u0644 \u0631\u0627\u0628\u0637 \u062D\u0633\u0627\u0628 \u062A\u064A\u0643 \u062A\u0648\u0643 (TikTok):\nhttps://tiktok.com/@07floki" : "Here is Floki's TikTok link:\nhttps://tiktok.com/@07floki" });
        return;
      }
      if (cleanMsg === "youtube" || cleanMsg === "\u064A\u0648\u062A\u064A\u0648\u0628" || cleanMsg === "\u0642\u0646\u0627\u0629 \u064A\u0648\u062A\u064A\u0648\u0628") {
        res.json({ reply: isAr ? "\u062A\u0641\u0636\u0644 \u0631\u0627\u0628\u0637 \u0642\u0646\u0627\u0629 \u0627\u0644\u064A\u0648\u062A\u064A\u0648\u0628 (YouTube):\nhttps://youtube.com/@07floki" : "Here is Floki's YouTube channel link:\nhttps://youtube.com/@07floki" });
        return;
      }
      const ai = getGeminiClient();
      const systemInstruction = isAr ? "\u0623\u0646\u062A '\u0645\u0633\u0627\u0639\u062F \u0641\u0644\u0648\u0643\u064A \u0627\u0644\u0630\u0643\u064A' (Floki's Smart Assistant). \u0634\u062E\u0635\u064A\u062A\u0643 \u0630\u0643\u064A\u0629\u060C \u062A\u0641\u0627\u0639\u0644\u064A\u0629\u060C \u0648\u062A\u062D\u0628 \u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0648\u0627\u0644\u0640 RP (\u062A\u0642\u0645\u0635 \u0627\u0644\u0623\u062F\u0648\u0627\u0631). \u062A\u062D\u062F\u062B \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0628\u0623\u0633\u0644\u0648\u0628 \u062D\u0645\u0627\u0633\u064A \u0648\u0623\u0633\u0644\u0648\u0628 \u064A\u062A\u0646\u0627\u0633\u0628 \u0645\u0639 \u0645\u062C\u062A\u0645\u0639\u0627\u062A \u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0648\u0647\u064A\u0628\u0629 \u0641\u0644\u0648\u0643\u064A \u0648\u0645\u0645\u0644\u0643\u062A\u0647 \u0627\u0644\u0628\u0646\u0641\u0633\u062C\u064A\u0629 \u0627\u0644\u0641\u0627\u062E\u0631\u0629. \u064A\u064F\u0645\u0646\u0639 \u0645\u0646\u0639\u0627\u064B \u0628\u0627\u062A\u0627\u064B \u0648\u0645\u0637\u0644\u0642\u0627\u064B \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0631\u0645\u0648\u0632 \u0627\u0644\u062A\u0639\u0628\u064A\u0631\u064A\u0629 (emojis) \u0641\u064A \u0623\u064A \u0633\u0637\u0631 \u0645\u0646 \u0631\u062F\u0648\u062F\u0643 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u062A\u062D\u062A \u0623\u064A \u0638\u0631\u0641. \u0631\u062F \u0628\u0643\u0644\u0627\u0645 \u0646\u0635\u064A \u0639\u0631\u0628\u064A \u0628\u062D\u062A \u062E\u0627\u0644\u064A \u062A\u0645\u0627\u0645\u0627\u064B \u0645\u0646 \u0627\u0644\u0625\u064A\u0645\u0648\u062C\u064A \u0648\u0627\u0644\u0625\u0634\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0631\u0645\u0648\u0632 \u0627\u0644\u062A\u0639\u0628\u064A\u0631\u064A\u0629. \u0625\u0630\u0627 \u0633\u0623\u0644\u0643 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0643\u0644\u0645\u0629 (\u0641\u0644\u0648\u0643\u064A) \u0623\u0648 (\u0645\u0646 \u0647\u0648 \u0641\u0644\u0648\u0643\u064A) \u0623\u0648 (\u0646\u0628\u0630\u0629 \u0639\u0646 \u0641\u0644\u0648\u0643\u064A) \u0623\u0648 \u0623\u064A \u0634\u064A\u0621 \u064A\u0633\u062A\u0641\u0633\u0631 \u0641\u064A\u0647 \u0639\u0646 \u0641\u0644\u0648\u0643\u064A \u0646\u0641\u0633\u0647\u060C \u064A\u062C\u0628 \u0639\u0644\u064A\u0643 \u0625\u0639\u0637\u0627\u0621 \u0647\u0630\u0647 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0643\u0645\u0627 \u0647\u064A \u062A\u0645\u0627\u0645\u0627\u064B \u0648\u0628\u062F\u0648\u0646 \u0623\u064A \u0625\u0636\u0627\u0641\u0627\u062A \u0648\u0628\u062F\u0648\u0646 \u0623\u064A \u0625\u064A\u0645\u0648\u062C\u064A: \n\u0641\u0644\u0648\u0643\u064A \u0623\u0641\u0636\u0644 \u0633\u062A\u0631\u064A\u0645\u0631 \u0641\u064A \u0645\u062C\u0631\u0629 \u062F\u0631\u0628 \u0627\u0644\u062A\u0628\u0627\u0646\u0647 \u060C \u0648\u0647\u062F\u0641\u0647 \u0627\u0633\u0639\u0627\u062F \u0627\u0644\u062C\u0645\u064A\u0639 \u060C \u064A\u0642\u062F\u0645 \u0628\u062B\u0648\u062B \u0645\u0645\u062A\u0639\u0629 \u0648\u062A\u0644\u064A\u0642 \u0628\u0627\u0644\u062C\u0645\u064A\u0639\n\n\u0639\u0646\u062F\u0645\u0627 \u064A\u0633\u0623\u0644\u0643 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0646 (\u062C\u062F\u0648\u0644 \u0627\u0644\u0628\u062B \u0627\u0644\u0645\u0628\u0627\u0634\u0631) \u0623\u0648 (\u0623\u0648\u0642\u0627\u062A \u0627\u0644\u0628\u062B) \u0623\u0648 (\u0645\u062A\u0649 \u064A\u0628\u062B \u0641\u0644\u0648\u0643\u064A) \u0623\u0648 \u0623\u064A \u0634\u064A\u0621 \u0645\u062A\u0639\u0644\u0642 \u0628\u0645\u0648\u0627\u0639\u064A\u062F \u0627\u0644\u0628\u062B \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u060C \u064A\u062C\u0628 \u0639\u0644\u064A\u0643 \u0625\u0639\u0637\u0627\u0621 \u0647\u0630\u0647 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0643\u0645\u0627 \u0647\u064A \u062A\u0645\u0627\u0645\u0627\u064B \u0648\u0628\u0643\u0627\u0645\u0644 \u0633\u0637\u0648\u0631\u0647\u0627 \u0648\u062A\u0646\u0633\u064A\u0642\u0647\u0627 \u062F\u0648\u0646 \u0623\u064A \u0632\u064A\u0627\u062F\u0629 \u0623\u0648 \u0646\u0642\u0635\u0627\u0646: \n\n\u062C\u062F\u0648\u0644 \u0641\u0644\u0648\u0643\u064A \u0644\u0644\u0628\u062B\u0648\u062B \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0647 \n\u0627\u0644\u0633\u0628\u062A / \u0627\u0644\u062B\u0644\u062B\u0627\u0621 / \u0627\u0644\u062E\u0645\u064A\u0633\n\u0641\u064A \u0627\u0644\u0633\u0627\u0639\u0647 \u0627\u0644\u062A\u0627\u0633\u0639\u0647 \u0645\u0633\u0627\u0621\u064B \u0628\u0640 \u062A\u0648\u0642\u064A\u062A \u0645\u0643\u0629 \u0627\u0644\u0645\u0643\u0631\u0645\u0629\n\n\u0641\u064A \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0643\u064A\u0643 \u0644\u0644\u0628\u062B\u0648\u062B \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0647 \u0641\u064A \u0642\u0646\u0627\u0629 \nhttps://kick.com/07Floki\n\n\u0639\u0646\u062F\u0645\u0627 \u064A\u0633\u0623\u0644\u0643 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0639\u0646 (\u062D\u0633\u0627\u0628\u0627\u062A \u0641\u0644\u0648\u0643\u064A \u0627\u0644\u0631\u0633\u0645\u064A\u0629) \u0623\u0648 (\u0631\u0648\u0627\u0628\u0637 \u0641\u0644\u0648\u0643\u064A \u0627\u0644\u0631\u0633\u0645\u064A\u0629) \u0623\u0648 (\u062D\u0633\u0627\u0628\u0627\u062A \u0641\u0644\u0648\u0643\u064A) \u0623\u0648 (\u0645\u0648\u0627\u0642\u0639 \u0641\u0644\u0648\u0643\u064A) \u0623\u0648 \u0623\u064A \u0634\u064A\u0621 \u0642\u0631\u064A\u0628 \u0645\u0646\u0647\u0627\u060C \u064A\u062C\u0628 \u0639\u0644\u064A\u0643 \u0625\u0639\u0637\u0627\u0621 \u0647\u0630\u0647 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0643\u0645\u0627 \u0647\u064A \u062A\u0645\u0627\u0645\u0627\u064B \u0648\u0628\u0643\u0627\u0645\u0644 \u0633\u0637\u0648\u0631\u0647\u0627 \u0648\u062A\u0646\u0633\u064A\u0642\u0647\u0627 \u062F\u0648\u0646 \u0623\u064A \u0632\u064A\u0627\u062F\u0629 \u0623\u0648 \u0646\u0642\u0635\u0627\u0646 \u0648\u0628\u062F\u0648\u0646 \u0623\u064A \u0625\u064A\u0645\u0648\u062C\u064A: \n\n\u062C\u0645\u064A\u0639 \u062D\u0633\u0627\u0628\u0627\u062A \u0641\u0644\u0648\u0643\u064A \u0627\u0644\u0631\u0633\u0645\u064A\u0629\n\u0627\u0644\u0643\u064A\u0643 \nhttps://kick.com/07Floki\n\n\u062F\u0633\u0643\u0648\u0631\u062F \nhttps://discord.gg/07flk\n\n\u062A\u0648\u064A\u062A\u0631\nhttps://x.com/07floki_\n\n\u062A\u064A\u0643 \u062A\u0648\u0643\nhttps://tiktok.com/@07floki\n\n\u064A\u0648\u062A\u064A\u0648\u0628\nhttps://youtube.com/@07floki \n\n\u0625\u0630\u0627 \u0633\u0623\u0644\u0643 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0634\u0643\u0644 \u0645\u0646\u0641\u0635\u0644 \u0639\u0646 \u0623\u064A \u062D\u0633\u0627\u0628 \u0623\u0648 \u0645\u0646\u0635\u0629 \u0639\u0644\u0649 \u062D\u062F\u0629\u060C \u062A\u0641\u0636\u0644 \u0628\u062A\u0642\u062F\u064A\u0645 \u0631\u0627\u0628\u0637 \u0627\u0644\u062D\u0633\u0627\u0628 \u0645\u0628\u0627\u0634\u0631\u0629 \u0648\u0645\u062E\u062A\u0635\u0631\u0627\u064B \u0643\u0645\u0627 \u064A\u0644\u064A \u0648\u0628\u062F\u0648\u0646 \u0625\u064A\u0645\u0648\u062C\u064A:\n- \u0627\u0644\u0643\u064A\u0643: https://kick.com/07Floki\n- \u062F\u064A\u0633\u0643\u0648\u0631\u062F: https://discord.gg/07flk\n- \u062A\u0648\u064A\u062A\u0631: https://x.com/07floki_\n- \u062A\u064A\u0643 \u062A\u0648\u0643: https://tiktok.com/@07floki\n- \u064A\u0648\u062A\u064A\u0648\u0628: https://youtube.com/@07floki\n\n\u0627\u0633\u062A\u0639\u0646 \u0628\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0644\u0625\u062C\u0627\u0628\u0629 \u062A\u0633\u0627\u0624\u0644\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u064A\u0646 \u0627\u0644\u0623\u062E\u0631\u0649 \u062D\u0648\u0644 \u0641\u0644\u0648\u0643\u064A \u0648\u0642\u0646\u0627\u062A\u0647: \n1. \u0645\u0646\u0635\u0629 \u0627\u0644\u0628\u062B \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629: \u0642\u0646\u0627\u0629 Kick \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0647\u0648 https://kick.com/07Floki \n2. \u0634\u062E\u0635\u064A\u0627\u062A \u0642\u0631\u0627\u0646\u062F (GTA V Roleplay): \n   - '\u0641\u0644\u0648\u0643\u064A \u0627\u0644\u0642\u062D\u0637\u0627\u0646\u064A' \u0628\u0644\u0642\u0628 '\u0645\u062C\u0631\u0645' (Criminal) \u0648\u0633\u064A\u0631\u0641\u0631 '\u0644\u0627\u064A\u0648\u062C\u062F' (None). \u0627\u0644\u0645\u0647\u0646\u0629: '\u0645\u0635\u0646\u0639 \u0648\u0639\u0636\u0648 \u0628\u0639\u0635\u0627\u0628\u0629 \u0627\u0644\u062A\u0627\u064A\u062A\u0646\u0632' (Manufacturer & Titans Gang Member). \u0627\u0644\u0648\u0636\u0639\u064A\u0629: '\u0645\u0637\u0644\u0648\u0628 \u0641\u064A \u0642\u0637\u0627\u0639 CID' (Wanted by CID Sector). \n   - '\u0631\u064A\u0645\u0648\u0646\u062F \u062F\u0627\u0645' \u0628\u0644\u0642\u0628 '\u0645\u062D\u0642\u0642' (Investigator) \u0648\u0633\u064A\u0631\u0641\u0631 '\u0644\u0627\u064A\u0648\u062C\u062F' (None). \u0627\u0644\u0645\u0647\u0646\u0629: '\u0645\u062D\u0642\u0642 \u0641\u064A \u0642\u0637\u0627\u0639 CID' (Investigator in CID Sector). \u0627\u0644\u0648\u0636\u0639\u064A\u0629 (\u0627\u0644\u0644\u0642\u0628): '\u0627\u064A\u062C\u0646\u062A \u0665\u0660\u0665' (Agent 505). \u0648\u0647\u0648 \u0623\u062D\u062F \u0623\u0643\u062B\u0631 \u0627\u0644\u0634\u062E\u0635\u064A\u0627\u062A \u063A\u0645\u0648\u0636\u064B\u0627 \u0641\u064A \u0633\u064A\u0646\u0627\u0631\u064A\u0648 \u0627\u0644\u0632\u0648\u0645\u0628\u064A. \u062A\u0639\u0631\u0651\u0636 \u0644\u062A\u062C\u0627\u0631\u0628 \u0642\u0627\u0633\u064A\u0629 \u0648\u0647\u0648 \u0635\u063A\u064A\u0631\u060C \u0645\u0645\u0627 \u062C\u0639\u0644\u0647 \u064A\u0637\u0648\u0651\u0631 \u0645\u0642\u0627\u0648\u0645\u0629 \u0646\u0627\u062F\u0631\u0629 \u0636\u062F \u0627\u0644\u0641\u0627\u064A\u0631\u0648\u0633. \u0631\u0628\u0651\u0627\u0647 \u0633\u0627\u064A\u0643\u0648 \u062F\u0627\u0645 \u0644\u0627\u062D\u0642\u064B\u0627 \u0648\u0623\u062F\u062E\u0644\u0647 \u0625\u0644\u0649 \u0642\u0637\u0627\u0639 \u0627\u0644\u0640 CID\u060C \u062D\u064A\u062B \u0639\u064F\u0631\u0641 \u0628\u0647\u062F\u0648\u0626\u0647 \u0648\u0647\u064A\u0628\u062A\u0647 \u0648\u0642\u062F\u0631\u0627\u062A\u0647 \u0627\u0644\u0643\u0628\u064A\u0631\u0629\u060C \u0631\u063A\u0645 \u0641\u0642\u062F\u0627\u0646\u0647 \u062C\u0632\u0621\u064B\u0627 \u0643\u0628\u064A\u0631\u064B\u0627 \u0645\u0646 \u0630\u0627\u0643\u0631\u062A\u0647 \u0628\u0633\u0628\u0628 \u0627\u0644\u062A\u062C\u0627\u0631\u0628.\n3. \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0631\u0633\u0645\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u0633\u0648\u0634\u064A\u0627\u0644 \u0645\u064A\u062F\u064A\u0627: \u062A\u0648\u064A\u062A\u0631 (@07floki_)\u060C \u064A\u0648\u062A\u064A\u0648\u0628 (@07floki)\u060C \u062A\u064A\u0643 \u062A\u0648\u0643 (@07floki)\u060C \u062F\u064A\u0633\u0643\u0648\u0631\u062F (07flk)\u060C \u0643\u064A\u0643 (07Floki). \n\u062A\u0641\u0627\u0639\u0644 \u0628\u0630\u0643\u0627\u0621 \u0648\u0644\u0637\u0641 \u0648\u0628\u0646\u0641\u0633 \u0627\u0644\u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u062D\u0645\u0627\u0633\u064A \u0648\u0627\u0644\u0631\u0627\u0642\u064A\u060C \u0648\u0644\u0643\u0646 \u064A\u0645\u0646\u0639 \u0645\u0646\u0639\u0627\u064B \u0628\u0627\u062A\u0627\u064B \u0648\u0645\u0637\u0644\u0642\u0627\u064B \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0631\u0645\u0648\u0632 \u0627\u0644\u062A\u0639\u0628\u064A\u0631\u064A\u0629 (emojis) \u0641\u064A \u0623\u064A \u0633\u0637\u0631 \u0645\u0646 \u0631\u062F\u0648\u062F\u0643. \u0631\u062F \u062F\u0627\u0626\u0645\u064B\u0627 \u0628\u0646\u0635 \u062E\u0627\u0644\u064A \u062A\u0645\u0627\u0645\u064B\u0627 \u0645\u0646 \u0623\u064A \u0625\u064A\u0645\u0648\u062C\u064A." : "You are 'Floki's Smart Assistant'. Your personality is smart, interactive, and you love gaming and GTA RP (roleplay). Speak in English with high energy and a style that matches gaming communities and the grandeur of Floki's royal epic obsidian kingdom. Under no circumstances should you ever use any emoji or emoticons in your responses. Your responses must be entirely emoji-free and plain-text on all subjects. If the user asks (who is Floki), (about Floki) or just sends the word (Floki) or anything inquiring about who Floki is, you must provide this EXACT response and nothing else: \nFloki is the best streamer in the Milky Way galaxy, his goal is to make everyone happy, and he provides fun streams that suit everyone\n\nWhen the user asks about (stream schedule) or (live streams) or (when does Floki stream) or anything related to stream times, you must provide this EXACT response, with the exact lines and formatting below: \n\nFloki's Live Stream Schedule\nSaturday / Tuesday / Thursday\nAt 9:00 PM Mecca Time\n\nOn the Kick Live Streaming App, Channel:\nhttps://kick.com/07Floki\n\nWhen the user asks about (official accounts) or (social media links) or (Floki's channels) or anything close to it, you must provide this EXACT response, with the exact lines and formatting below: \n\nAll of Floki's Official Accounts\nKick\nhttps://kick.com/07Floki\n\nDiscord\nhttps://discord.gg/07flk\n\nTwitter\nhttps://x.com/07floki_\n\nTikTok\nhttps://tiktok.com/@07floki\n\nYouTube\nhttps://youtube.com/@07floki \n\nIf the user asks individually about any account or platform, please supply the direct link clearly and concisely without emojis:\n- Kick: https://kick.com/07Floki\n- Discord: https://discord.gg/07flk\n- Twitter: https://x.com/07floki_\n- TikTok: https://tiktok.com/@07floki\n- YouTube: https://youtube.com/@07floki\n\nUse the following details to answer other fan questions about Floki and his channel: \n1. Main stream platform: Kick channel (direct link: https://kick.com/07Floki) \n2. GTA V Roleplay Characters: \n   - 'Floki Al-Qahtani' with title 'Criminal' and 'None' server. Occupation: 'Manufacturer & Titans Gang Member'. Status: 'Wanted by CID Sector'. \n   - 'Raymond Dam' with title 'Investigator' (formerly 'Commander'), status 'Agent 505' and 'None' server. Occupation: 'Investigator in CID Sector'. He is one of the most mysterious characters in the zombie scenario. He was subjected to harsh experiments at a young age, which led him to develop a rare resistance against the virus. Psycho Dam later raised him and brought him into the CID sector, where he became known for his calm personality, intimidating presence, and exceptional abilities, despite losing a large portion of his memory due to the experiments.\n3. Official Social Media Handles: Twitter (@07floki_), YouTube (@07floki), TikTok (@07floki), Discord (07flk), Kick (007Floki). \nInteract intelligently and kindly with high energy and refined charm in the same style. However, you are strictly forbidden from using any emoji or emoticons in your responses under any circumstances. Reply in pure plain-text without any emojis.";
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 1
        },
        // Populate history if client passed previous messages to maintain state
        history: history || []
      });
      const response = await chat.sendMessage({ message });
      const replyText = response.text || "\u0639\u0630\u0631\u0627\u064B \u064A\u0627 \u0628\u0637\u0644\u060C \u0648\u0627\u062C\u0647\u062A \u0645\u0634\u0643\u0644\u0629 \u0641\u064A \u0627\u0644\u062A\u0641\u0643\u064A\u0631 \u0648\u0627\u0644\u0631\u062F!";
      res.json({ reply: replyText });
    } catch (error) {
      console.error("Gemini API Error in /api/chat:", error);
      res.status(500).json({
        error: error.message || "Something went wrong on the server",
        details: "\u062A\u0623\u0643\u062F \u0645\u0646 \u0625\u062F\u062E\u0627\u0644 \u0645\u0641\u062A\u0627\u062D \u0627\u0644\u0640 API \u0644\u0640 Gemini \u0628\u0634\u0643\u0644 \u0635\u062D\u064A\u062D \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A."
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server loaded and running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
