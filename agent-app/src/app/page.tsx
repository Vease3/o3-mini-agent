"use client";

import { Menu, PanelLeftClose, PanelRightClose, Send, Globe, History, MapPin, Calendar, Search, Brain, Clock, Star, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { LeftSideDrawer } from "@/components/LeftSideDrawer";
import { RightSideDrawer } from "@/components/RightSideDrawer";
import { chatStorage } from "@/lib/storage";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface ThinkingBoxProps {
  thoughts?: string;
}

function ThinkingBox({ thoughts = "Processing your request..." }: ThinkingBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2 max-w-[80%]">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>Thinking...</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-gray-200 text-sm text-gray-600">
            {thoughts}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [memoryType, setMemoryType] = useState<'global' | 'trip'>('global');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thoughts, setThoughts] = useState<string>('');
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Fetch chat history
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chat');
        if (!response.ok) throw new Error('Failed to fetch chats');
        const data = await response.json();
        setChats(data.chats);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchChats();
  }, []);

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
  };

  const handleSelectChat = async (chatId: string) => {
    setCurrentChatId(chatId);
    const chat = chatStorage.getChat(chatId);
    if (chat) {
      setMessages(chat.messages);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const newMessage: Message = { role: 'user', content: inputMessage };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);
    setThoughts('Analyzing your request...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: updatedMessages,
          chatId: currentChatId 
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      
      const data = await response.json();
      const newAssistantMessage = { role: 'assistant', content: data.content };
      const finalMessages = [...updatedMessages, newAssistantMessage];
      setMessages(finalMessages);
      setThoughts('');
      
      // Update current chat ID and chats list if this is a new chat
      if (!currentChatId && data.chatId) {
        setCurrentChatId(data.chatId);
        if (data.chat) {
          setChats(prevChats => [data.chat, ...prevChats]);
          // Store the chat in storage
          chatStorage.addChat({
            ...data.chat,
            messages: finalMessages
          });
        }
      } else if (currentChatId) {
        // Update existing chat in storage
        chatStorage.updateChatMessages(currentChatId, finalMessages);
        // Update the chat title in the UI
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === currentChatId 
              ? { ...chat, messages: finalMessages }
              : chat
          )
        );
      }
    } catch (error) {
      console.error(error);
      setThoughts('Sorry, I encountered an error while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <LeftSideDrawer 
        isOpen={leftOpen} 
        onClose={() => setLeftOpen(false)}
        chats={chats}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        <header className="h-16 px-4 border-b border-gray-100 flex items-center justify-between bg-white">
          {!leftOpen && (
            <button 
              onClick={() => setLeftOpen(true)} 
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
          <div className="flex-1 flex justify-center">
            <h1 className="text-sm font-medium text-gray-600">New Conversation</h1>
          </div>
          {!rightOpen && (
            <button 
              onClick={() => setRightOpen(true)} 
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
        </header>

        <main className="flex-1 overflow-auto">
          <div className="max-w-2xl mx-auto p-4 md:p-8">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4">
                <Globe className="h-12 w-12 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Welcome to Your Travel Assistant</h2>
                <p className="text-sm text-gray-500 max-w-md">
                  I can help you plan trips, suggest destinations, create itineraries, and provide local insights. What would you like to explore?
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && <ThinkingBox thoughts={thoughts} />}
              </div>
            )}
          </div>
        </main>

        <footer className="border-t border-gray-100 bg-white">
          <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Message your travel assistant..."
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </footer>
      </div>

      <RightSideDrawer 
        isOpen={rightOpen} 
        onClose={() => setRightOpen(false)} 
        chatId={currentChatId || undefined} 
      />
    </div>
  );
}
