// app/api/chat/route.ts


import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const { searchParams } = new URL(request.url);
    const modelName = searchParams.get("modelName") || "anthropic/claude-3.5-haiku-20241022";

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!,
    });

    // If the chosen model starts with "openai/", we’ll use messages
    // If it starts with "anthropic/", we’ll use prompt
    let result;
    if (modelName.startsWith("openai/")) {
      // OpenAI usage: pass messages
      result = await streamText({
        model: openrouter(modelName),
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Respond ONLY in greentext format (like 4chan style)."
          },
          {
            role: "user",
            content: message,
          },
        ],
      });
    } else {
      // Anthropic usage: pass prompt
      // You can customize the formatting to ensure it yields greentext
      const systemPrompt = `You are a helpful assistant. Always respond ONLY in greentext format.
User says: ${message}

Assistant: `;
      result = await streamText({
        model: openrouter(modelName),
        prompt: systemPrompt,
      });
    }

    // Return the stream as SSE with plain text
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


/*
import { streamText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const { searchParams } = new URL(request.url);
    const modelName = searchParams.get('modelName') || 'anthropic/claude-3-opus';

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!, 
    });

    // Make a streaming request
    const result = await streamText({
      model: openrouter(modelName),
      // For Anthropic, you can pass a "prompt",
      // while OpenAI often uses "messages" 
      prompt: message,
    });

    // Return the response as a text stream (SSE)
    return result.toTextStreamResponse({
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Error processing your request', { status: 500 });
  }
}

*/