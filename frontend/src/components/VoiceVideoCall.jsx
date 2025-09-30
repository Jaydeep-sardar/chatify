import { useState, useRef, useEffect } from 'react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useCallStore } from '../store/useCallStore';
import { useChatStore } from '../store/useChatStore';

function VoiceVideoCall() {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const callTimerRef = useRef(null);
  
  const { authUser } = useAuthStore();
  const { allContacts = [], chats = [] } = useChatStore();
  
  const {
    isInCall,
    callType,
    callStatus,
    currentCall,
    localStream,
    remoteStream,
    endCall,
    answerCall,
    rejectCall,
    toggleMute,
    toggleVideo
  } = useCallStore();

  // Get caller/receiver user data - handle both incoming and outgoing calls
  // Combine both allContacts and chats to find the user
  const allUsers = [...allContacts, ...chats];
  const otherUserId = currentCall?.userId || currentCall?.from;
  const otherUser = allUsers.find(user => user._id === otherUserId) || null;

  // Handle call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        setCallDuration(0);
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [callStatus]);

  // Handle local video stream
  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Handle remote video stream
  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMute = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  const handleVideoToggle = () => {
    const videoOff = toggleVideo();
    setIsVideoOff(videoOff);
  };

  const handleEndCall = () => {
    endCall();
    setCallDuration(0);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const handleAnswerCall = () => {
    answerCall(currentCall);
  };

  const handleRejectCall = () => {
    rejectCall(currentCall.from || currentCall.userId);
  };

  if (!isInCall && callStatus === 'idle') return null;
  if (!currentCall) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-full h-full max-w-6xl mx-auto">
        
        {/* Remote Video/Avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          {callType === 'video' && remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-white">
              <div className="w-32 h-32 mb-6 rounded-full overflow-hidden ring-4 ring-white/20">
                {otherUser?.profilePic ? (
                  <img 
                    src={otherUser.profilePic} 
                    alt={otherUser.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-16 h-16 text-white/80" />
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl font-semibold mb-2">
                {otherUser?.fullName || 'Unknown User'}
              </h2>
              
              <div className="text-lg text-white/70 mb-4">
                {callStatus === 'calling' && 'Calling...'}
                {callStatus === 'receiving' && 'Incoming call'}
                {callStatus === 'connected' && formatCallDuration(callDuration)}
              </div>
              
              <div className="text-sm text-white/50 capitalize">
                {callType} call
              </div>
            </div>
          )}
        </div>

        {/* Local Video (Picture in Picture) */}
        {callType === 'video' && localStream && (
          <div className="absolute top-6 right-6 w-48 h-32 bg-black rounded-xl overflow-hidden border-2 border-white/20">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }} // Mirror local video
            />
          </div>
        )}

        {/* Call Status Overlay */}
        <div className="absolute top-6 left-6 glass-effect px-4 py-2 rounded-full">
          <div className="flex items-center gap-2 text-white">
            <div className={`w-2 h-2 rounded-full ${
              callStatus === 'connected' ? 'bg-green-400 animate-pulse' : 
              callStatus === 'calling' ? 'bg-yellow-400 animate-ping' : 
              'bg-red-400'
            }`} />
            <span className="text-sm font-medium capitalize">{callStatus}</span>
          </div>
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4">
            
            {/* Answer/Reject (for incoming calls) */}
            {callStatus === 'receiving' && (
              <>
                <button
                  onClick={handleRejectCall}
                  className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
                  title="Reject call"
                >
                  <PhoneOff className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={handleAnswerCall}
                  className="p-4 bg-green-500 hover:bg-green-600 rounded-full transition-all duration-200 hover:scale-110 shadow-lg animate-pulse"
                  title="Answer call"
                >
                  <Phone className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Active Call Controls */}
            {(callStatus === 'connected' || callStatus === 'calling') && (
              <>
                {/* Mute Button */}
                <button
                  onClick={handleMute}
                  className={`p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg ${
                    isMuted 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 text-white" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Video Toggle (only for video calls) */}
                {callType === 'video' && (
                  <button
                    onClick={handleVideoToggle}
                    className={`p-4 rounded-full transition-all duration-200 hover:scale-110 shadow-lg ${
                      isVideoOff 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    title={isVideoOff ? 'Turn on video' : 'Turn off video'}
                  >
                    {isVideoOff ? (
                      <VideoOff className="w-6 h-6 text-white" />
                    ) : (
                      <Video className="w-6 h-6 text-white" />
                    )}
                  </button>
                )}

                {/* End Call Button */}
                <button
                  onClick={handleEndCall}
                  className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
                  title="End call"
                >
                  <PhoneOff className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Connection Status */}
        {callStatus === 'calling' && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <div className="w-2 h-2 bg-white/70 rounded-full animate-ping" />
              <span>Connecting...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceVideoCall;