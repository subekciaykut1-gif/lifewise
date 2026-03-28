require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hi");
    console.log("gemini-1.5-flash: SUCCESS");
  } catch (e) {
    console.log("gemini-1.5-flash: FAILED", e.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Hi");
    console.log("gemini-2.0-flash: SUCCESS");
  } catch (e) {
    console.log("gemini-2.0-flash: FAILED", e.message);
  }
}

test();
