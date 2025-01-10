// app/api/chat/route.ts
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // This function will be an API endpoint
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error('OPENROUTER_API_KEY not found in environment variables');
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  return NextResponse.json({ status: 'API key found' });
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  const openrouter = createOpenRouter({
    apiKey,
    headers: {
      "HTTP-Referer": process.env.NODE_ENV === 'development' 
        ? "http://localhost:3000" 
        : "https://www.flowersbench.com",
      "X-Title": "Flowersbench"
    }
  });

  try {
    const { modelName } = await request.json();
    const result = await streamText({
      model: openrouter(modelName),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}