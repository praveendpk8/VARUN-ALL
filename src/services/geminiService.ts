import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askGemini(question: string, context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a friendly STEM guide for kids in "STEM City". 
      Explain the following question in a simple, fun, and engaging way for a 10-year-old.
      Context: ${context}
      Question: ${question}`,
    });
    return response.text || "I'm not sure, but let's keep exploring!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! My robot brain is a bit fuzzy right now. Try again later!";
  }
}
