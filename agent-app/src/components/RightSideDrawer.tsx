import { Brain, PanelRightClose } from "lucide-react";

interface RightSideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RightSideDrawer({ isOpen, onClose }: RightSideDrawerProps) {
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
          <div className="space-y-3">
            <div className="bg-white rounded-md p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Location Preference</div>
              <p className="text-sm text-gray-700">User prefers warm coastal destinations</p>
            </div>
            <div className="bg-white rounded-md p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Travel Style</div>
              <p className="text-sm text-gray-700">Interested in cultural experiences and local cuisine</p>
            </div>
            <div className="bg-white rounded-md p-3 border border-gray-200">
              <div className="text-xs text-gray-500 mb-1">Budget Range</div>
              <p className="text-sm text-gray-700">Mid-range accommodations preferred</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
