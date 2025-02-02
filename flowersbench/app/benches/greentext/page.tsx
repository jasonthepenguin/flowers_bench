"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const availableModels = [
  {
    value: "anthropic/claude-3.5-haiku-20241022",
    label: "Anthropic Claude 3.5 Haiku",
  },
  {
    value: "openai/gpt-4o-mini",
    label: "OpenAI GPT-4o-mini",
  },
];

export default function GreentextBench() {
  // State for Window 1
  const [model1, setModel1] = useState(availableModels[0].value);
  const [messages1, setMessages1] = useState<Message[]>([]);
  const [isLoading1, setIsLoading1] = useState(false);
  const [systemPrompt1] = useState("Respond ONLY in greentext format.");

  // State for Window 2
  const [model2, setModel2] = useState(availableModels[1].value);
  const [messages2, setMessages2] = useState<Message[]>([]);
  const [isLoading2, setIsLoading2] = useState(false);
  const [systemPrompt2] = useState("Respond ONLY in greentext format.");

  // Shared input
  const [input, setInput] = useState("");

  // API key state (only for non-admin users)
  const [userApiKey, setUserApiKey] = useState("");

  // Clear both chats
  const handleClearChats = () => {
    setMessages1([]);
    setMessages2([]);
  };

  // Clear just Window 1
  const clearWindow1 = (newModel: string) => {
    setModel1(newModel);
    setMessages1([]);
  };

  // Clear just Window 2
  const clearWindow2 = (newModel: string) => {
    setModel2(newModel);
    setMessages2([]);
  };

  // Submit the prompt to both models
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userPrompt = input.trim();
    setMessages1((prev) => [...prev, { role: "user", content: userPrompt }]);
    setMessages2((prev) => [...prev, { role: "user", content: userPrompt }]);
    setInput("");
    setIsLoading1(true);
    setIsLoading2(true);

    try {
      // Helper function to handle SSE streaming for a single model
      const streamResponse = async (
        modelName: string,
        setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
        systemPrompt: string
      ) => {
        try {
          const resp = await fetch("/api/chat", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              ...(userApiKey && { "X-OpenRouter-Key": userApiKey }),
            },
            body: JSON.stringify({ message: userPrompt, modelName, systemPrompt }),
          });

          if (resp.status === 401) {
            const errorData = await resp.json();
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: errorData.error }
            ]);
            setIsLoading(false);
            return;
          }

          if (!resp.ok) throw new Error("Failed to get response");

          const reader = resp.body?.getReader();
          const decoder = new TextDecoder();
          let assistantMessage = "";

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              assistantMessage += decoder.decode(value);

              setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const lastMsg = newMessages[newMessages.length - 1];

                if (lastMsg?.role === "assistant") {
                  return [
                    ...newMessages.slice(0, -1),
                    { role: "assistant", content: assistantMessage },
                  ];
                } else {
                  return [
                    ...newMessages,
                    { role: "assistant", content: assistantMessage },
                  ];
                }
              });
            }
          }
        } catch (err) {
          console.error("Error in streaming:", err);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "Error or no response." },
          ]);
        } finally {
          setIsLoading(false);
        }
      };

      // Stream from both models in parallel
      await Promise.all([
        streamResponse(model1, setMessages1, setIsLoading1, systemPrompt1),
        streamResponse(model2, setMessages2, setIsLoading2, systemPrompt2)
      ]);
    } catch (error) {
      console.error("Submission error:", error);
      setIsLoading1(false);
      setIsLoading2(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Greentext bench</h1>
      <div>
        {/* Clear all chats button */}
        <div className="mb-4">
          <button
            onClick={handleClearChats}
            className="bg-rose-700 text-white px-4 py-2 rounded hover:bg-rose-600 transition-colors"
          >
            Clear Chats
          </button>
        </div>

        {/* Two model selectors side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">
              Model for Window 1:
            </label>
            <select
              className="border rounded-md p-2 w-full dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              value={model1}
              onChange={(e) => clearWindow1(e.target.value)}
            >
              {availableModels.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">
              Model for Window 2:
            </label>
            <select
              className="border rounded-md p-2 w-full dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              value={model2}
              onChange={(e) => clearWindow2(e.target.value)}
            >
              {availableModels.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Single prompt input */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            placeholder="Type your prompt..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading1 || isLoading2}
          >
            <Send className="w-5 h-5 inline-block" />
          </button>
        </form>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            OpenRouter API Key:
          </label>
          <input
            type="password"
            className="border rounded-md p-2 w-full dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            value={userApiKey}
            onChange={(e) => setUserApiKey(e.target.value)}
            placeholder="Required for non-admin users - Get your key at openrouter.ai"
          />
        </div>

        {/* Two chat windows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Window 1 */}
          <div className="flex flex-col h-[500px] bg-zinc-900 rounded-lg shadow-md">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages1.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#E6DDD6] text-[#8bac34]'
                    } whitespace-pre-wrap break-words`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading1 && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-lg p-3 text-gray-100">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Window 2 */}
          <div className="flex flex-col h-[500px] bg-zinc-900 rounded-lg shadow-md">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages2.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-[#E6DDD6] text-[#8bac34]'
                    } whitespace-pre-wrap break-words`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading2 && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 rounded-lg p-3 text-gray-100">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component to show "typing" dots
function TypingDots() {
  return (
    <div className="flex space-x-2">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
    </div>
  );
}
