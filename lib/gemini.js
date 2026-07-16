import { GoogleGenerativeAI } from "@google/generative-ai";

let client = null;

export function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({ model: "gemini-2.0-flash" });
}
