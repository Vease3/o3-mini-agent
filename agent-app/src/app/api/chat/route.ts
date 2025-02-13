import OpenAI from "openai";
import { NextResponse } from "next/server";
import { chatStorage } from "@/lib/storage";

const openai = new OpenAI();

const SYSTEM_PROMPT = `You are a helpful travel assistant. You help users plan trips, 
suggest destinations, create itineraries, and provide local insights. Keep responses 
concise and practical. If you don't know something specific, be honest about it.`;

export async function GET() {
  try {
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

    // Generate new chat if chatId doesn't exist
    if (!chatId) {
      const newChatId = `chat-${Date.now()}`;
      const newChat = {
        id: newChatId,
        title: messages[0].content.slice(0, 30) + '...',
        timestamp: new Date().toISOString(),
        messages: [...messages, { role: 'assistant', content: assistantMessage.content }]
      };
      
      chatStorage.addChat(newChat);

      return NextResponse.json({
        content: assistantMessage.content,
        chatId: newChatId,
        chat: newChat
      });
    }

    // Update existing chat
    const updatedMessages = [...messages, { role: 'assistant', content: assistantMessage.content }];
    chatStorage.updateChatMessages(chatId, updatedMessages);

    return NextResponse.json({
      content: assistantMessage.content,
      chatId: chatId
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
