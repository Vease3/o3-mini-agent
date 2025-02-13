"use client";

import { Menu, PanelLeftClose, PanelRightClose, Send, Globe, History, MapPin, Calendar, Search, Brain, Clock, Star, Users } from "lucide-react";
import { useState } from "react";
import { LeftSideDrawer } from "@/components/LeftSideDrawer";
import { RightSideDrawer } from "@/components/RightSideDrawer";

export default function Home() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [memoryType, setMemoryType] = useState<'global' | 'trip'>('global');

  return (
    <div className="flex h-screen bg-white">
      <LeftSideDrawer isOpen={leftOpen} onClose={() => setLeftOpen(false)} />

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
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4">
              <Globe className="h-12 w-12 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Welcome to Your Travel Assistant</h2>
              <p className="text-sm text-gray-500 max-w-md">
                I can help you plan trips, suggest destinations, create itineraries, and provide local insights. What would you like to explore?
              </p>
            </div>
          </div>
        </main>

        <footer className="border-t border-gray-100 bg-white">
          <div className="max-w-2xl mx-auto p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Message your travel assistant..."
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </footer>
      </div>

      <RightSideDrawer isOpen={rightOpen} onClose={() => setRightOpen(false)} />
    </div>
  );
}
