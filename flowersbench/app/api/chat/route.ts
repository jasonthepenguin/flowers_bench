// app/api/chat/route.ts


import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { NextRequest } from "next/server";
import { checkAdmin } from '@/utils/supabase/auth/adminGuard';

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { message, modelName, systemPrompt} = await request.json();
    
    // Get the user's API key from headers if provided
    const userApiKey = request.headers.get('X-OpenRouter-Key');
    
    // Determine which API key to use
    let apiKey: string;
    if (!userApiKey) {
      try {
        const { isAdmin } = await checkAdmin(true);
        if (!isAdmin) {
          return new Response('Unauthorized - Please provide an API key', { status: 401 });
        }
        apiKey = process.env.OPENROUTER_API_KEY!;
      } catch {
        return new Response('Unauthorized - Please provide an API key', { status: 401 });
      }
    } else {
      apiKey = userApiKey;
    }

    // Create openrouter instance only after authentication is confirmed
    const openrouter = createOpenRouter({
      apiKey: apiKey,
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
