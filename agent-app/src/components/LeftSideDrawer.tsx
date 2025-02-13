import { Globe, PanelLeftClose, Search, History, MapPin, Calendar } from "lucide-react";

interface LeftSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeftSideDrawer({ isOpen, onClose }: LeftSideDrawerProps) {
  return (
    <div className={`${isOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-gray-100 bg-gray-50 overflow-hidden`}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">Travel AI</span>
            </div>
            <button 
              onClick={onClose} 
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
  );
}
