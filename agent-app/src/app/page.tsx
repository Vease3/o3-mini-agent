"use client";

import { Menu, PanelLeftClose, PanelRightClose, Send, Globe, History, MapPin, Calendar, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar - Chat History */}
      <div className={`${leftOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-gray-100 bg-gray-50 overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Travel AI</span>
              </div>
              <button 
                onClick={() => setLeftOpen(false)} 
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations"
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-md transition-colors">
                <History className="h-4 w-4 text-gray-400" />
                <span>Recent Conversations</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-md transition-colors">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Saved Itineraries</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-md transition-colors">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Upcoming Trips</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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

      {/* Right Sidebar - Trip Details */}
      <div className={`${rightOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-l border-gray-100 bg-gray-50 overflow-hidden`}>
        <div className="p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Trip Details</span>
            <button 
              onClick={() => setRightOpen(false)} 
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            >
              <PanelRightClose className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-500">
              Start a conversation to see trip details, recommendations, and planning tools here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
