// app/benches/greentext/page.tsx

"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Suppose these come from a config or an API
const availableModels = [
  {
    value: "anthropic/claude-3.5-haiku-20241022",
    label: "Anthropic Claude 3.5 Haiku",
  },
  {
    value: "openai/gpt-4o-mini",
    label: "OpenAI GPT-4o-mini",
  },
  // Add as many as you want
];

export default function GreentextBench() {
  // State for Window 1
  const [model1, setModel1] = useState(availableModels[0].value);  // default to first or whichever
  const [messages1, setMessages1] = useState<Message[]>([]);
  const [isLoading1, setIsLoading1] = useState(false);

  // State for Window 2
  const [model2, setModel2] = useState(availableModels[1].value);  // default to second or whichever
  const [messages2, setMessages2] = useState<Message[]>([]);
  const [isLoading2, setIsLoading2] = useState(false);

  // Shared input
  const [input, setInput] = useState("");

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

    // Add user message to both
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
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
      ) => {
        try {
          const resp = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userPrompt, modelName }),
          });

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
                  // Update existing assistant message
                  return [
                    ...newMessages.slice(0, -1),
                    { role: "assistant", content: assistantMessage },
                  ];
                } else {
                  // Create new assistant message
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
      streamResponse(model1, setMessages1, setIsLoading1);
      streamResponse(model2, setMessages2, setIsLoading2);
    } catch (error) {
      console.error("Submission error:", error);
      setIsLoading1(false);
      setIsLoading2(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Greentext bench</h1>

      {/* Clear all chats button */}
      <div className="mb-4">
        <button
          onClick={handleClearChats}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
            className="border rounded-md p-2 w-full"
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
            className="border rounded-md p-2 w-full"
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
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading1 || isLoading2}
        >
          <Send className="w-5 h-5 inline-block" />
        </button>
      </form>

      {/* Two chat windows (side-by-side on larger screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Window 1 */}
        <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-md">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages1.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } whitespace-pre-wrap break-words`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading1 && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Window 2 */}
        <div className="flex flex-col h-[500px] bg-white rounded-lg shadow-md">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages2.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  } whitespace-pre-wrap break-words`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading2 && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                  <TypingDots />
                </div>
              </div>
            )}
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