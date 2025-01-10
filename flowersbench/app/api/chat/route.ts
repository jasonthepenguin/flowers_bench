// app/api/chat/route.ts



// app/api/chat/route.ts

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

/*
import { streamText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { NextRequest } from "next/server";


export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const { searchParams } = new URL(request.url);
    const modelName = searchParams.get("modelName") || "anthropic/claude-3-opus";

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY!,
    });

    const result = await streamText({
      model: openrouter(modelName),
      prompt: message,
    });

    return result.toDataStreamResponse(); // Changed from toAIStreamResponse to toDataStreamResponse
  } catch (error) {
    console.error(error);
    return new Response("Error processing your request", { status: 500 });
  }
}
  */