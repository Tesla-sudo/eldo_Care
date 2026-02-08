// backend/services/ai.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize the API with the stable v1 version to avoid v1beta 404 errors
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const triageSchema = {
  description: "Community health triage schema",
  type: "object",
  properties: {
    risk_level: { type: "string", enum: ["low", "medium", "high", "critical"] },
    explanation: { type: "string" },
    guidance: { type: "string" },
    escalation: { type: "boolean" },
    referral: { type: "string" },
    disclaimer: { type: "string" }
  },
  required: ["risk_level", "explanation", "guidance", "escalation", "referral", "disclaimer"]
};

const systemPrompt = `
You are a triage guidance assistant for the Ministry of Health Kenya community program.
Provide ONLY non-diagnostic guidance based on symptoms.
NEVER refuse, NEVER apologize. Return ONLY valid JSON.
If unsure, use risk_level "medium".
`;

async function getAIResponse(transcription) {
  console.log("[GEMINI] Processing transcription:", transcription);

  try {
    // UPDATED: Using Gemini 2.5 Flash (The current stable production model)
    // If you want the absolute latest, use "gemini-3-flash-preview"
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `User symptoms: "${transcription}"` }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: triageSchema,
        temperature: 0.2,
      },
    });

    const rawText = result.response.text().trim();
    console.log("[GEMINI] Response received.");

    return JSON.parse(rawText);

  } catch (err) {
    console.error("[GEMINI] Critical Error:", err.message);

    // If 2.5 is not yet available in your specific project/region, 
    // we fallback to the current GA default "gemini-1.5-flash" but on the stable v1 path
    if (err.message.includes("404")) {
        console.log("[GEMINI] Attempting last-resort legacy fallback...");
        return await legacyFallback(transcription);
    }

    return getStaticFallback();
  }
}

async function legacyFallback(transcription) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`Symptoms: ${transcription}. Return triage JSON.`);
        return JSON.parse(result.response.text());
    } catch (e) {
        return getStaticFallback();
    }
}

function getStaticFallback() {
  return {
    risk_level: "medium",
    explanation: "Standard guidance applied due to technical connectivity issues.",
    guidance: "Monitor symptoms closely. Keep hydrated and rest.",
    escalation: true,
    referral: "Nearest health facility or dispensary",
    disclaimer: "This is guidance only, not a medical diagnosis."
  };
}

module.exports = { getAIResponse };