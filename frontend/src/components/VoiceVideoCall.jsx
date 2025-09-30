import { useState, useRef, useEffect } from 'react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

function VoiceVideoCall({ 
  callType, 
  isIncoming = false, 
  caller, 
  onAccept, 
  onDecline, 
  onEnd 
}) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'voice');
  const [callDuration, setCallDuration] = useState(0);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  
  const { authUser } = useAuthStore();

  // Initialize WebRTC
  useEffect(() => {
    if (isCallActive) {
      initializeCall();
      startCallTimer();
    }
    
    return () => {
      cleanup();
    };
  }, [isCallActive]);

  const initializeCall = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: callType === 'video',
        audio: true
      });
      
      localStreamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Initialize peer connection
      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });
      
      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnectionRef.current.addTrack(track, stream);
      });
      
      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const startCallTimer = () => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    setIsCallActive(true);
    onAccept?.();
  };

  const handleDecline = () => {
    cleanup();
    onDecline?.();
  };

  const handleEnd = () => {
    cleanup();
    setIsCallActive(false);
    onEnd?.();
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = isVideoOff;
        setIsVideoOff(!isVideoOff);
      }
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    
    setCallDuration(0);
  };

  if (isIncoming && !isCallActive) {
    // Incoming call UI
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="glass-strong p-8 rounded-3xl max-w-md w-full mx-4 text-center animate-bounce-in">
          <div className="animate-pulse mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-cyan-400/50 mb-4">
              <img 
                src={caller?.profilePic || '/avatar.png'} 
                alt={caller?.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{caller?.fullName}</h3>
            <p className="text-slate-300">
              Incoming {callType} call...
            </p>
          </div>
          
          <div className="flex justify-center gap-8">
            <button
              onClick={handleDecline}
              className="p-4 bg-red-500 hover:bg-red-600 rounded-full text-white transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <PhoneOff className="w-8 h-8" />
            </button>
            
            <button
              onClick={handleAccept}
              className="p-4 bg-green-500 hover:bg-green-600 rounded-full text-white transition-all duration-300 hover:scale-110 shadow-lg animate-pulse"
            >
              {callType === 'video' ? <Video className="w-8 h-8" /> : <Phone className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isCallActive) {
    // Active call UI
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-black z-50">
        {/* Video containers */}
        {callType === 'video' && (
          <>
            {/* Remote video (main) */}
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Local video (pip) */}
            <div className="absolute top-4 right-4 w-48 h-36 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover mirror"
              />
            </div>
          </>
        )}
        
        {/* Voice call UI */}
        {callType === 'voice' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden ring-8 ring-cyan-400/30 mb-8 animate-pulse-glow">
                <img 
                  src={caller?.profilePic || '/avatar.png'} 
                  alt={caller?.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{caller?.fullName}</h2>
              <p className="text-xl text-slate-300">Voice call in progress</p>
            </div>
          </div>
        )}
        
        {/* Call controls overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="glass-strong px-8 py-4 rounded-full flex items-center gap-6">
            {/* Call duration */}
            <div className="text-white font-mono text-lg">
              {formatDuration(callDuration)}
            </div>
            
            {/* Controls */}
            <div className="flex gap-4">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isMuted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                }`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              {callType === 'video' && (
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    isVideoOff 
                      ? 'bg-red-500 text-white' 
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                  }`}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </button>
              )}
              
              <button className="p-3 bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 rounded-full transition-all duration-300 hover:scale-110">
                <Volume2 className="w-6 h-6" />
              </button>
              
              <button
                onClick={handleEnd}
                className="p-3 bg-red-500 hover:bg-red-600 rounded-full text-white transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default VoiceVideoCall;