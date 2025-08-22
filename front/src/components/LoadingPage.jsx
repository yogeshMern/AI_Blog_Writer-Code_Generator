import React, { useState, useEffect } from "react";
import { Bot, PenTool, Code } from "lucide-react";
import AIContentGenerator from "../pages/AIContentGenerator.jsx";

const featureData = [
  {
    id: "ai-assistant",
    name: "AI Assistant",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    description: "General purpose AI helper that supports your needs",
  },
  {
    id: "blog-writer",
    name: "Blog Writer",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    description: "Create SEO-friendly blog articles effortlessly",
  },
  {
    id: "code-generator",
    name: "Code Generator",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    description: "Generate clean and documented code snippets",
  },
];

const LoadingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5 seconds for smooth transition
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return <AIContentGenerator />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative px-4 sm:px-8">
      {/* Subtle Animated Background Circles */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <header className="mt-24 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg select-none">
          AI Content Studio
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-gray-300 text-lg sm:text-xl">
          Empowering you with smart AI tools for content creation and coding.
        </p>
      </header>

      {/* Features Section */}
      <section className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
        {featureData.map(({ id, name, icon: Icon, color, description }) => (
          <div
            key={id}
            className={`flex flex-col items-center rounded-3xl p-6 bg-gradient-to-tr ${color} bg-opacity-20 shadow-lg shadow-black/40 hover:scale-105 transform transition duration-500 cursor-default select-none`}
            role="group"
            tabIndex={-1}
          >
            <div
              className={`flex items-center justify-center mb-4 rounded-full p-4 w-16 h-16 bg-gradient-to-r ${color} text-white drop-shadow-lg`}
              aria-hidden="true"
            >
              <Icon size={28} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
            <p className="text-center text-gray-300 text-sm sm:text-base">
              {description}
            </p>
          </div>
        ))}
      </section>

      {/* Loading Indicator */}
      <footer className="mt-auto mb-16 text-center">
        <div className="inline-flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="block w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-bounce"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
        <p className="mt-4 text-gray-400 font-medium tracking-wide select-none">
          Loading AI Content Studio...
        </p>
      </footer>
    </div>
  );
};

export default LoadingPage;
