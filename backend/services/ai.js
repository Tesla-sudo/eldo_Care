// backend/services/ai.js
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


const triageSchema = {
  description: "Health triage response schema",
  type: "OBJECT", 
  properties: {
    risk_level: {
      type: "STRING",
      enum: ["low", "medium", "high", "critical"],
    },
    explanation: { type: "STRING" },
    guidance: { type: "STRING" },
    escalation: { type: "BOOLEAN" },
    referral: { type: "STRING" },
    disclaimer: { type: "STRING" },
  },
  required: ["risk_level", "explanation", "guidance", "escalation", "referral", "disclaimer"],
};

const systemPrompt = `
You are a health guidance AI supporting the Ministry of Health (MoH) Kenya.
Perform triage, NOT diagnosis. Adhere to MoH Kenya protocols. Output JSON only.
`;

async function getAIResponse(transcription) {
  try {
   
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      systemInstruction: systemPrompt,
      contents: [{ role: 'user', parts: [{ text: transcription }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: triageSchema,
      },
    });

    
    return JSON.parse(response.text);

  } catch (err) {
    console.error('Gemini Service Error:', err.message);
    
    return {
      risk_level: 'medium',
      explanation: 'Technical connection error.',
      guidance: 'If symptoms persist, please visit the nearest health facility.',
      escalation: true,
      referral: 'Nearest MoH Facility',
      disclaimer: 'This is not medical advice.'
    };
  }
}

module.exports = { getAIResponse };