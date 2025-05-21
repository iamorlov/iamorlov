import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Define error types for better TypeScript support
interface ApiError extends Error {
  response?: {
    data?: {
      error?: {
        message?: string;
      };
    };
  };
}

// Add better error checking for API key
if (!process.env.GROK_API_KEY) {
  console.error("Missing GROK_API_KEY environment variable");
}

// Initialize the OpenAI client with X.AI's base URL
const client = new OpenAI({
  apiKey: process.env.GROK_API_KEY || "", // Fallback to empty string to avoid undefined
  baseURL: "https://api.x.ai/v1",
});

export async function POST(request: Request) {
  try {
    // Log request headers for debugging
    console.log("API route called");
    
    // Parse request body with error handling
    let messages;
    try {
      const body = await request.json();
      messages = body.messages;
    } catch (e) {
      console.error("Failed to parse request JSON:", e);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }
    
    // Add system message if not present
    if (!messages.some(msg => msg.role === 'system')) {
      messages.unshift({
        role: 'system',
        content: 'You are Grok, a chatbot inspired by the Hitchhiker\'s Guide to the Galaxy. You are helpful, witty, and knowledgeable.'
      });
    }
    
    // Log the prepared messages for debugging
    console.log("Sending to Grok API:", JSON.stringify(messages));
    
    try {
      const completion = await client.chat.completions.create({
        model: "grok-3-mini",
        messages,
      });
      
      return NextResponse.json({
        message: completion.choices[0].message,
        usage: completion.usage,
      });
    } catch (apiError: unknown) {
      // Type cast to our ApiError interface
      const typedError = apiError as ApiError;
      console.error("Grok API Error:", 
        typedError.response?.data || typedError.message
      );
      
      return NextResponse.json(
        { 
          error: 'Error from Grok API: ' + 
            (typedError.response?.data?.error?.message || typedError.message) 
        },
        { status: 502 }
      );
    }
    
  } catch (error: unknown) {
    const typedError = error as Error;
    console.error('Chat API error:', typedError);
    
    return NextResponse.json(
      { error: typedError.message || 'Failed to process chat request' },
      { status: 500 }
    );
  }
}