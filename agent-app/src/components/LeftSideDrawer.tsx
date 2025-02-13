import { Globe, PanelLeftClose, Search, History, MapPin, Calendar } from "lucide-react";

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface LeftSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chats?: Chat[];
  onNewChat?: () => void;
  onSelectChat?: (chatId: string) => void;
}

export function LeftSideDrawer({ isOpen, onClose, chats = [], onNewChat, onSelectChat }: LeftSideDrawerProps) {
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
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 mb-4 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>New Chat</span>
          </button>

          <div className="space-y-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat?.(chat.id)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-md transition-colors"
              >
                <History className="h-4 w-4 text-gray-400" />
                <div className="flex-1 text-left truncate">{chat.title}</div>
                <span className="text-xs text-gray-400">{chat.timestamp}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
