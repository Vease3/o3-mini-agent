import { Brain, PanelRightClose } from "lucide-react";
import { useEffect, useState } from 'react';

interface RightSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  chatId?: string;
}

interface Memory {
  type: string;
  content: string;
  timestamp: string;
}

export function RightSideDrawer({ isOpen, onClose, chatId }: RightSideDrawerProps) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!chatId) {
      setMemories([]);
      return;
    }

    fetch(`/api/chat?id=${chatId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch memories');
        return res.json();
      })
      .then(data => {
        if (data.chat?.memories) {
          setMemories(data.chat.memories);
          setError('');
        } else {
          setMemories([]);
          setError('No memories found');
        }
      })
      .catch(err => {
        console.error('Failed to fetch memories:', err);
        setError('Failed to load memories');
        setMemories([]);
      });
  }, [chatId]);

  return (
    <div className={`${isOpen ? 'w-80' : 'w-0'} transition-all duration-300 border-l border-gray-100 bg-gray-50 overflow-hidden`}>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-gray-900">Memory</span>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            >
              <PanelRightClose className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="p-4 overflow-auto">
          {error ? (
            <div className="text-sm text-gray-500 text-center">{error}</div>
          ) : memories.length === 0 ? (
            <div className="text-sm text-gray-500 text-center">No memories yet</div>
          ) : (
            <div className="space-y-3">
              {memories.map((memory, index) => (
                <div key={index} className="bg-white rounded-md p-3 border border-gray-200">
                  <div className="text-xs text-gray-500 mb-1 capitalize">{memory.type}</div>
                  <p className="text-sm text-gray-700">{memory.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
