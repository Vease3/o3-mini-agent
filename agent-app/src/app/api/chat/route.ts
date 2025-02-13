import OpenAI from "openai";
import { NextResponse } from "next/server";
import { chatStorage } from "@/lib/storage";

const openai = new OpenAI();

const SYSTEM_PROMPT = `You are a helpful travel assistant. You help users plan trips, 
suggest destinations, create itineraries, and provide local insights. Keep responses 
concise and practical. If you don't know something specific, be honest about it.`;

const MEMORY_SYSTEM_PROMPT = `Analyze the user's message and extract key information worth remembering. 
Format your response as a JSON array of memories, where each memory has a 'type' and 'content'. 
Types can be: 'preference', 'fact', 'goal', or 'context'. Keep it concise and relevant.
Example: [{"type": "preference", "content": "Prefers beach destinations"}]`;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const chat = chatStorage.getChat(id);
      return NextResponse.json({ chat });
    }

    const chats = chatStorage.getAllChats();
    return NextResponse.json({ chats });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const lastUserMessage = messages[messages.length - 1];

    // Memory extraction call
    const memoryCompletion = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [
        { role: "system", content: MEMORY_SYSTEM_PROMPT },
        { role: "user", content: lastUserMessage.content },
      ],
      reasoning_effort: "medium",
      store: true,
    });

    // Parse memories
    const newMemories = JSON.parse(memoryCompletion.choices[0].message.content).map(
      (memory: any) => ({
        ...memory,
        timestamp: new Date().toISOString(),
      })
    );

    // Regular chat completion
    const completion = await openai.chat.completions.create({
      model: "o3-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      reasoning_effort: "medium",
      store: true,
    });

    const assistantMessage = completion.choices[0].message;

    if (!chatId) {
      const newChatId = `chat-${Date.now()}`;
      const newChat = {
        id: newChatId,
        title: messages[0].content.slice(0, 30) + '...',
        timestamp: new Date().toISOString(),
        messages: [...messages, { role: 'assistant', content: assistantMessage.content }],
        memories: newMemories
      };
      
      chatStorage.addChat(newChat);

      return NextResponse.json({
        content: assistantMessage.content,
        chatId: newChatId,
        chat: newChat,
        memories: newMemories
      });
    }

    // Update existing chat
    const updatedMessages = [...messages, { role: 'assistant', content: assistantMessage.content }];
    chatStorage.updateChatMessages(chatId, updatedMessages);
    chatStorage.updateChatMemories(chatId, newMemories);

    return NextResponse.json({
      content: assistantMessage.content,
      chatId: chatId,
      memories: newMemories
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
