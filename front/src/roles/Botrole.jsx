import { Code, PenTool, Bot } from "lucide-react";

export const botTypes = [
  {
    id: "default",
    name: "AI Assistant",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    description: "General purpose AI helper",
  },
  {
    id: "blog-writer",
    name: "Blog Writer",
    icon: PenTool,
    color: "from-purple-500 to-pink-500",
    description: "SEO-friendly blog articles",
  },
  {
    id: "code-generator",
    name: "Code Generator",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    description: "Clean, documented code",
  },
];
