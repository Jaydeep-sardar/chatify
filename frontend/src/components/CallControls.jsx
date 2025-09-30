import { Phone, Video } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useCallStore } from '../store/useCallStore';

function CallControls({ compact = false }) {
  const { selectedUser } = useChatStore();
  const { initiateCall, isInCall } = useCallStore();

  const handleVoiceCall = () => {
    if (selectedUser && !isInCall) {
      initiateCall(selectedUser._id, 'voice');
    }
  };

  const handleVideoCall = () => {
    if (selectedUser && !isInCall) {
      initiateCall(selectedUser._id, 'video');
    }
  };

  if (!selectedUser) return null;

  if (compact) {
    return (
      <div className="flex gap-1">
        <button
          onClick={handleVoiceCall}
          disabled={isInCall}
          className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-green-400 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Voice call"
        >
          <Phone className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleVideoCall}
          disabled={isInCall}
          className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Video call"
        >
          <Video className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {/* Voice Call Button */}
      <button
        onClick={handleVoiceCall}
        disabled={isInCall}
        className="group relative p-2 rounded-lg hover:bg-green-500/20 text-slate-400 hover:text-green-400 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-green-500/30"
        title="Start voice call"
      >
        <Phone className="w-5 h-5" />
        
        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Voice Call
        </div>
      </button>
      
      {/* Video Call Button */}
      <button
        onClick={handleVideoCall}
        disabled={isInCall}
        className="group relative p-2 rounded-lg hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-blue-500/30"
        title="Start video call"
      >
        <Video className="w-5 h-5" />
        
        {/* Tooltip */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Video Call
        </div>
      </button>
    </div>
  );
}

export default CallControls;