import { useState } from 'react';
import { Phone, Video, PhoneOff } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import VoiceVideoCall from './VoiceVideoCall';

function CallControls({ user, isInChat = true }) {
  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  
  const { selectedUser } = useChatStore();
  const callUser = user || selectedUser;

  const initiateCall = (type) => {
    if (!callUser) return;
    
    setActiveCall({
      type,
      user: callUser,
      isOutgoing: true
    });
    
    // In a real app, you'd send a socket event here
    // socket.emit('initiate-call', { userId: callUser._id, type });
  };

  const handleCallEnd = () => {
    setActiveCall(null);
    setIncomingCall(null);
  };

  const handleCallAccept = () => {
    if (incomingCall) {
      setActiveCall(incomingCall);
      setIncomingCall(null);
    }
  };

  const handleCallDecline = () => {
    setIncomingCall(null);
  };

  if (activeCall) {
    return (
      <VoiceVideoCall
        callType={activeCall.type}
        isIncoming={false}
        caller={activeCall.user}
        onEnd={handleCallEnd}
      />
    );
  }

  if (incomingCall) {
    return (
      <VoiceVideoCall
        callType={incomingCall.type}
        isIncoming={true}
        caller={incomingCall.user}
        onAccept={handleCallAccept}
        onDecline={handleCallDecline}
        onEnd={handleCallEnd}
      />
    );
  }

  if (!isInChat) {
    // Compact version for chat list
    return (
      <div className="flex gap-2">
        <button
          onClick={() => initiateCall('voice')}
          className="p-1.5 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 hover:text-green-300 transition-all duration-200 hover:scale-110"
          title="Voice call"
        >
          <Phone className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => initiateCall('video')}
          className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 transition-all duration-200 hover:scale-110"
          title="Video call"
        >
          <Video className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Full version for chat header
  return (
    <div className="flex gap-3">
      <button
        onClick={() => initiateCall('voice')}
        className="p-2.5 bg-green-500/20 hover:bg-green-500/30 rounded-xl text-green-400 hover:text-green-300 transition-all duration-300 hover:scale-110 interactive-hover"
        title="Start voice call"
      >
        <Phone className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => initiateCall('video')}
        className="p-2.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110 interactive-hover"
        title="Start video call"
      >
        <Video className="w-5 h-5" />
      </button>
    </div>
  );
}

export default CallControls;