import { GoogleGenAI } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "HealthGuard AI Backend" });
});

// Chat completion endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, bodyRegion } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message string is required." });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback structured simulation if key isn't provided yet
      const fallbackResponse = `I'm sorry you're not feeling well. Here's what could be going on:

**Possible Causes:**
- Viral infection (such as flu or cold)
- Dehydration or inadequate fluid intake
- Stress or tension headache
- Seasonal allergies or sinus congestion

**Suggested Care:**
- Get plenty of rest in a quiet, cool room
- Stay well-hydrated with water or electrolytes
- Monitor your temperature and rest your eyes

**Common Medicine:**
- Over-the-counter options like **Paracetamol / Acetaminophen** (or Ibuprofen) can help reduce fever and ease pain. Always follow package dosage notes (e.g. max 4,000mg/day for adults) and consult a pharmacist if taking other meds.

*This is general information, not a medical diagnosis. Please consult a doctor if symptoms persist.*`;

      return res.json({
        response: fallbackResponse,
        suggestedFollowups: [
          "What is the recommended dosage for fever medicine?",
          "How much water should I drink while resting?",
          "When should I go to an urgent care clinic?",
        ],
        source: "fallback",
      });
    }

    const systemInstruction = `You are HealthGuard AI, an empathetic, clear clinical health assistant.

Format your responses cleanly like ChatGPT using this exact structure:
1. Start with a short, empathetic opening line (e.g. "I'm sorry you're not feeling well. Here's what could be going on:")
2. Use a bolded heading "**Possible Causes:**" followed by a short bulleted list.
3. Use a bolded heading "**Suggested Care:**" followed by bullet points.
4. Use a bolded heading "**Common Medicine:**" mentioning OTC options like Paracetamol / Acetaminophen or Ibuprofen with a brief dosage warning.
5. End with the exact italicized disclaimer:
*This is general information, not a medical diagnosis. Please consult a doctor if symptoms persist.*

At the very end of your message, add 3 relevant follow-up questions starting on a new line with "FOLLOW_UPS:" separated by pipe symbols "|".
${bodyRegion ? `Note: The user indicated symptoms regarding the ${bodyRegion} area.` : ""}`;

    // Construct conversation history
    const contents: any[] = [];

    if (Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        if (turn.role && turn.text) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }],
          });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const responseText = response.text || "I apologize, but I could not process your query at this moment. Please try again.";

    // Parse out follow ups if included
    let mainResponse = responseText;
    let suggestedFollowups: string[] = [
      "What home remedies are safest for this?",
      "Which specialist should I consult?",
      "What red flag symptoms should I watch for?",
    ];

    if (responseText.includes("FOLLOW_UPS:")) {
      const parts = responseText.split("FOLLOW_UPS:");
      mainResponse = parts[0].trim();
      const followUpRaw = parts[1]?.trim();
      if (followUpRaw) {
        suggestedFollowups = followUpRaw
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    res.json({
      response: mainResponse,
      suggestedFollowups,
      source: "gemini",
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({
      error: "An error occurred while generating AI health guidance.",
      details: error.message,
    });
  }
});

// Start Express Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HealthGuard AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
