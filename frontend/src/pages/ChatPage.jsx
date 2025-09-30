import { useChatStore } from "../store/useChatStore";
import { useCallStore } from "../store/useCallStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import NotificationSettings from "../components/NotificationSettings";
import VoiceVideoCall from "../components/VoiceVideoCall";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const { socket } = useAuthStore();
  const { 
    handleIncomingCall, 
    handleCallAnswered, 
    handleCallEnded, 
    handleCallRejected, 
    handleIceCandidate 
  } = useCallStore();

  // Set up socket listeners for call events
  useEffect(() => {
    if (!socket) return;
    
    socket.on('incoming-call', handleIncomingCall);
    socket.on('call-answered', handleCallAnswered);
    socket.on('call-ended', handleCallEnded);
    socket.on('call-rejected', handleCallRejected);
    socket.on('ice-candidate', handleIceCandidate);

    return () => {
      socket.off('incoming-call', handleIncomingCall);
      socket.off('call-answered', handleCallAnswered);
      socket.off('call-ended', handleCallEnded);
      socket.off('call-rejected', handleCallRejected);
      socket.off('ice-candidate', handleIceCandidate);
    };
  }, [socket, handleIncomingCall, handleCallAnswered, handleCallEnded, handleCallRejected, handleIceCandidate]);

  return (
    <div className="relative w-full max-w-7xl h-[900px] mx-auto">
      <BorderAnimatedContainer>
        {/* LEFT SIDEBAR - Premium Design */}
        <div className="w-80 glass-effect flex flex-col border-r border-slate-600/30 shadow-2xl">
          <div className="animate-fade-in-up">
            <ProfileHeader />
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <ActiveTabSwitch />
          </div>

          <div className="px-4 pb-3 animate-fade-in-up" style={{animationDelay: '0.15s'}}>
            <NotificationSettings />
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 scrollbar-premium">
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Enhanced with animations */}
        <div className="flex-1 flex flex-col glass-strong relative overflow-hidden">
          {/* Enhanced background effects */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
          </div>
          
          {/* Subtle animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/20 rounded-full animate-ping" style={{animationDelay: '2s'}} />
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/30 rounded-full animate-pulse" style={{animationDelay: '4s'}} />
          </div>
          
          <div className="relative z-10 flex-1 flex flex-col">
            {selectedUser ? (
              <div className="animate-fade-in-up h-full">
                <ChatContainer />
              </div>
            ) : (
              <div className="animate-bounce-in">
                <NoConversationPlaceholder />
              </div>
            )}
          </div>
        </div>
      </BorderAnimatedContainer>
      
      {/* Voice/Video Call Interface */}
      <VoiceVideoCall />
    </div>
  );
}
export default ChatPage;
