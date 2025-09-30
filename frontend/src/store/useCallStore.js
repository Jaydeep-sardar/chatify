import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';

export const useCallStore = create((set, get) => ({
  // Call State
  isInCall: false,
  callType: null, // 'voice' | 'video'
  callStatus: 'idle', // 'idle' | 'calling' | 'receiving' | 'connected' | 'ended'
  currentCall: null,
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  
  // Call Actions
  initiateCall: async (userId, callType) => {
    try {
      const constraints = {
        audio: true,
        video: callType === 'video'
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      // Handle remote stream
      pc.ontrack = (event) => {
        set({ remoteStream: event.streams[0] });
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const socket = useAuthStore.getState().socket;
          if (socket) {
            socket.emit('ice-candidate', {
              to: userId,
              candidate: event.candidate
            });
          }
        }
      };

      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      set({
        isInCall: true,
        callType,
        callStatus: 'calling',
        currentCall: { userId, type: callType },
        localStream: stream,
        peerConnection: pc
      });

      // Send call offer via socket
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit('call-user', {
          to: userId,
          offer,
          callType,
          caller: useAuthStore.getState().authUser
        });
      }

    } catch (error) {
      console.error('Error initiating call:', error);
      get().endCall();
    }
  },

  answerCall: async (callData) => {
    try {
      const { from, offer, callType } = callData;
      
      const constraints = {
        audio: true,
        video: callType === 'video'
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      });

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream);
      });

      // Handle remote stream
      pc.ontrack = (event) => {
        set({ remoteStream: event.streams[0] });
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const socket = useAuthStore.getState().socket;
          if (socket) {
            socket.emit('ice-candidate', {
              to: from,
              candidate: event.candidate
            });
          }
        }
      };

      // Set remote description and create answer
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      set({
        isInCall: true,
        callType,
        callStatus: 'connected',
        currentCall: { userId: from, type: callType },
        localStream: stream,
        peerConnection: pc
      });

      // Send answer via socket
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit('answer-call', {
          to: from,
          answer
        });
      }

    } catch (error) {
      console.error('Error answering call:', error);
      get().rejectCall(from);
    }
  },

  rejectCall: (userId) => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.emit('reject-call', { to: userId });
    }
    set({
      isInCall: false,
      callType: null,
      callStatus: 'idle',
      currentCall: null
    });
  },

  endCall: () => {
    const { currentCall, localStream, peerConnection } = get();
    
    // Clean up streams
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    // Close peer connection
    if (peerConnection) {
      peerConnection.close();
    }
    
    // Notify other user
    if (currentCall) {
      const socket = useAuthStore.getState().socket;
      if (socket) {
        socket.emit('end-call', { to: currentCall.userId });
      }
    }
    
    set({
      isInCall: false,
      callType: null,
      callStatus: 'idle',
      currentCall: null,
      localStream: null,
      remoteStream: null,
      peerConnection: null
    });
  },

  toggleMute: () => {
    const { localStream } = get();
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return !audioTrack.enabled;
      }
    }
    return false;
  },

  toggleVideo: () => {
    const { localStream } = get();
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return !videoTrack.enabled;
      }
    }
    return false;
  },

  // Socket Event Handlers
  handleIncomingCall: (callData) => {
    set({
      callStatus: 'receiving',
      currentCall: callData
    });
  },

  handleCallAnswered: async (data) => {
    const { peerConnection } = get();
    if (peerConnection && data.answer) {
      await peerConnection.setRemoteDescription(data.answer);
      set({ callStatus: 'connected' });
    }
  },

  handleCallEnded: () => {
    get().endCall();
  },

  handleCallRejected: () => {
    get().endCall();
  },

  handleIceCandidate: async (data) => {
    const { peerConnection } = get();
    if (peerConnection && data.candidate) {
      await peerConnection.addIceCandidate(data.candidate);
    }
  }
}));