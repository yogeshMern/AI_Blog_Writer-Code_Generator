const { botRoles } = require("../roles/botRole");
const { getGroqResponse } = require("../utils/groqRes");
const { sendSuccess, sendError } = require("../utils/response");

exports.chat = async (req, res) => {
  const { message, botType = "default" } = req.body;

  if (!message || typeof message !== "string") {
    return sendError(res, "Invalid or missing 'message'.", 400);
  }

  const systemPrompt = botRoles[botType] || botRoles["default"];

  try {
    const reply = await getGroqResponse(systemPrompt, message);
    return sendSuccess(res, { reply }, "Reply generated");
  } catch (error) {
    console.error("Groq API error:", error.response?.data || error.message);
    return sendError(res, "Failed to get response from Groq API", 500);
  }
};
