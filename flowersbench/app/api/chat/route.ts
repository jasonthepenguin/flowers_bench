// app/api/chat/route.ts


import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { message, modelName, systemPrompt} = await request.json();

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!,
    });

    let result;

    // Decide Anthropic vs. OpenAI usage based on modelName
    if (modelName.startsWith("openai/")) {
      // OpenAI usage: pass "messages"
      result = await streamText({
        model: openrouter(modelName),
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
      });
    } else {
      // Anthropic usage: pass "prompt"
      const prompt = `${systemPrompt}\n\nUser says: ${message}\n\nAssistant:`;

      result = await streamText({
        model: openrouter(modelName),
        prompt: prompt,
      });
    }

    // Return SSE text
    return result.toTextStreamResponse({
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error processing your request", { status: 500 });
  }
}
