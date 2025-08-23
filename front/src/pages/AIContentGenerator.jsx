import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Copy,
  Download,
  Loader2,
  Bot,
  User,
  Info,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Note from "../components/Note";
import { botTypes } from "../roles/Botrole";

const AIContentGenerator = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [botType, setBotType] = useState("default");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { type: "user", content: message };
    setConversation((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("https://ai-blog-writerandcode-generator-back.onrender.com/api/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          botType,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid JSON response from server.");
      }

      if (response.ok && data.success) {
        const botMessage = {
          type: "bot",
          content: data.data.reply,
          botType,
        };
        setConversation((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.message || "Failed to get response");
      }
    } catch (error) {
      const errorMessage = {
        type: "error",
        content: `Error: ${error.message}. Make sure your backend is running on port 7000.`,
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess("Failed to copy");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  const downloadContent = (content, filename) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const selectedBot = botTypes.find((bot) => bot.id === botType);

  return (
    <>
      <Note isOpen={isNoteOpen} onClose={() => setIsNoteOpen(false)} />

      <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
        {/* Galaxy Background */}
        <div className="fixed inset-0 pointer-events-none select-none z-0">
          {/* Large Stars */}
          {[...Array(25)].map((_, i) => (
            <div
              key={`star-lg-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                width: "1.5px",
                height: "1.5px",
              }}
            >
              <div className="w-full h-full bg-white rounded-full opacity-80"></div>
            </div>
          ))}

          {/* Medium Stars */}
          {[...Array(50)].map((_, i) => (
            <div
              key={`star-med-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`,
                width: "1px",
                height: "1px",
              }}
            >
              <div className="w-full h-full bg-blue-400 rounded-full opacity-60"></div>
            </div>
          ))}

          {/* Small Stars */}
          {[...Array(100)].map((_, i) => (
            <div
              key={`star-small-${i}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: "0.5px",
                height: "0.5px",
              }}
            >
              <div className="w-full h-full bg-purple-400 rounded-full opacity-40"></div>
            </div>
          ))}

          {/* Shooting Stars */}
          {[...Array(2)].map((_, i) => (
            <div
              key={`shooting-${i}`}
              className="absolute animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 5}s`,
                animationDuration: "8s",
                width: "2px",
                height: "2px",
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-80"></div>
            </div>
          ))}

          {/* Galaxy Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/15 via-blue-900/10 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-radial from-purple-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-radial from-blue-500/15 to-transparent rounded-full blur-3xl"></div>
        </div>

        <main className="relative z-10 container max-w-5xl mx-auto flex flex-col flex-grow p-4 sm:p-8 space-y-8">
          {/* Header */}
          <header className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-600 animate-pulse">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                AI Content Studio
              </h1>
              <Info
                className="text-white w-6 h-6 cursor-pointer hover:text-purple-400 transition-colors"
                onClick={() => setIsNoteOpen(true)}
                title="Info"
              />
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
              Transform your ideas into professional content with our AI-powered
              tools ✨
            </p>
          </header>

          {/* Bot Selection */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {botTypes.map((bot) => {
              const IconComponent = bot.icon;
              return (
                <button
                  key={bot.id}
                  onClick={() => setBotType(bot.id)}
                  className={`flex flex-col items-center p-6 rounded-3xl border-2 transition-all duration-400 transform hover:scale-105 backdrop-blur-sm ${
                    botType === bot.id
                      ? "border-purple-400 bg-gradient-to-br from-purple-500/30 to-pink-500/30 shadow-2xl shadow-purple-500/50 animate-pulse"
                      : "border-gray-600/50 bg-gray-800/30 hover:border-purple-400/50 hover:bg-gray-700/40 hover:shadow-xl hover:shadow-purple-500/20"
                  }`}
                  aria-pressed={botType === bot.id}
                >
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${bot.color} flex items-center justify-center mb-4 shadow-md`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {bot.name}
                  </h3>
                  <p className="text-sm text-gray-400 text-center">
                    {bot.description}
                  </p>
                </button>
              );
            })}
          </section>

          {/* Chat Interface */}
          <section className="flex flex-col flex-grow bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-purple-600/40 shadow-2xl shadow-purple-600/30 overflow-hidden">
            {/* Chat Header */}
            <div
              className={`relative p-4 bg-gradient-to-r ${selectedBot.color} flex items-center space-x-4 overflow-hidden rounded-t-3xl`}
            >
              {/* Particles */}
              {[...Array(8)].map((_, i) => (
                <span
                  key={`particle-${i}`}
                  className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                ></span>
              ))}
              <selectedBot.icon className="w-7 h-7 text-white animate-pulse flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold text-lg sm:text-xl">
                  {selectedBot.name}
                </h3>
                <p className="text-white/80 text-sm sm:text-base">
                  {selectedBot.description}
                </p>
              </div>
              {copySuccess && (
                <div className="ml-auto bg-white/20 text-white px-3 py-1 rounded-full text-xs sm:text-sm animate-pulse select-none">
                  {copySuccess}
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 max-h-[60vh]">
              {conversation.length === 0 ? (
                <div className="text-center text-gray-400 mt-16 select-none">
                  <selectedBot.icon className="w-16 h-16 mx-auto mb-6 opacity-50" />
                  <p className="text-lg font-semibold">
                    Start a conversation with {selectedBot.name}
                  </p>
                  <p className="text-sm mt-2">
                    Type your message below to get started
                  </p>
                </div>
              ) : (
                conversation.map((msg, index) => {
                  const isUser = msg.type === "user";
                  const bgColor = isUser
                    ? "bg-blue-600 text-white"
                    : msg.type === "error"
                    ? "bg-red-600/20 border border-red-500/40 text-red-300"
                    : "bg-gray-800/60 text-gray-100";

                  const userBg = isUser
                    ? "bg-blue-600"
                    : "bg-gradient-to-r " +
                      (botTypes.find((b) => b.id === msg.botType)?.color ||
                        "from-gray-500 to-gray-600");

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-3xl w-full ${
                          isUser ? "order-2" : "order-1"
                        }`}
                      >
                        <div
                          className={`flex items-start space-x-3 ${
                            isUser ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center ${
                              isUser
                                ? "bg-blue-600"
                                : msg.type === "error"
                                ? "bg-red-600"
                                : userBg
                            }`}
                          >
                            {isUser ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div
                            className={`p-4 rounded-3xl ${bgColor} break-words whitespace-pre-wrap`}
                          >
                            {/* Markdown for bot */}
                            {msg.type === "bot" ? (
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                  h1: ({ node, ...props }) => (
                                    <h1
                                      className="text-2xl font-bold text-white my-2"
                                      {...props}
                                    />
                                  ),
                                  h2: ({ node, ...props }) => (
                                    <h2
                                      className="text-xl font-semibold text-white my-2"
                                      {...props}
                                    />
                                  ),
                                  p: ({ node, ...props }) => (
                                    <p
                                      className="text-gray-100 text-sm leading-relaxed my-2"
                                      {...props}
                                    />
                                  ),
                                  li: ({ node, ...props }) => (
                                    <li
                                      className="ml-5 list-disc text-sm text-gray-300"
                                      {...props}
                                    />
                                  ),
                                  strong: ({ node, ...props }) => (
                                    <strong
                                      className="font-semibold text-white"
                                      {...props}
                                    />
                                  ),
                                  ul: ({ node, ...props }) => (
                                    <ul className="pl-6 mb-3" {...props} />
                                  ),
                                  ol: ({ node, ...props }) => (
                                    <ol
                                      className="pl-6 mb-3 list-decimal"
                                      {...props}
                                    />
                                  ),
                                  code: ({ node, inline, ...props }) => (
                                    <code
                                      className={`bg-gray-800 text-green-400 text-xs px-1 py-0.5 rounded ${
                                        inline ? "inline" : "block my-2"
                                      }`}
                                      {...props}
                                    />
                                  ),
                                }}
                              >
                                {msg.content}
                              </ReactMarkdown>
                            ) : (
                              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                {msg.content}
                              </pre>
                            )}
                            {msg.type === "bot" && (
                              <div className="flex space-x-4 mt-3 pt-3 border-t border-gray-700">
                                <button
                                  onClick={() => copyToClipboard(msg.content)}
                                  className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors"
                                >
                                  <Copy className="w-4 h-4" />
                                  <span>Copy</span>
                                </button>
                                <button
                                  onClick={() =>
                                    downloadContent(
                                      msg.content,
                                      `${msg.botType}-response.txt`
                                    )
                                  }
                                  className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Download</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              {isLoading && (
                <div
                  className="flex justify-start animate-pulse"
                  aria-live="polite"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-9 h-9 rounded-full bg-gradient-to-r ${selectedBot.color} flex items-center justify-center`}
                    >
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-800/60 p-4 rounded-3xl">
                      <div className="flex items-center space-x-3 text-gray-400">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <form
              onSubmit={handleSubmit}
              className="p-6 border-t border-gray-700 flex items-center gap-4 rounded-b-3xl bg-gray-900/50"
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Ask ${selectedBot.name} anything...`}
                className="flex-grow p-4 bg-gray-800/70 border border-gray-600 rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none max-h-36 min-h-[3rem]"
                rows={1}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                aria-label={`Message input for ${selectedBot.name}`}
              />
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className={`flex items-center space-x-2 px-6 py-4 bg-gradient-to-r ${selectedBot.color} text-white rounded-3xl font-semibold transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-disabled={!message.trim() || isLoading}
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-6 h-6" />
                )}
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </section>

          {/* Footer */}
          <footer className="text-center mt-6 text-gray-400 text-sm sm:text-base select-none">
            <p>Powered by AI • Create amazing content in seconds</p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default AIContentGenerator;
