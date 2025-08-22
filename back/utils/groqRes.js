const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const GROQ_API_KEYS = [
  process.env.GROQ_API_KEY1,
  process.env.GROQ_API_KEY2,
  process.env.GROQ_API_KEY3,
];

async function getGroqResponse(systemPrompt, userMessage) {
  const model = "llama3-70b-8192";
  const payload = {
    model,
    messages: [
      {
        role: "system",
        content: `${systemPrompt} Limit your response to approximately 100 words.`,
      },
      { role: "user", content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 400,
  };

  let lastError;

  for (const apiKey of GROQ_API_KEYS) {
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        payload,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      lastError = error;
      const code = error.response?.status;
      const message = error.response?.data?.error?.message || error.message;

      console.warn(
        `⚠️ Failed with key: ${apiKey.slice(-6)}... - ${code || ""} ${message}`
      );

      // Only try next key if it's a quota or auth issue
      if (code !== 429 && code !== 401 && code !== 403) {
        break; // Break on non-retryable errors like invalid input
      }
    }
  }

  throw lastError || new Error("All API keys failed");
}

module.exports = { getGroqResponse };
