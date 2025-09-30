import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import NotificationSettings from "../components/NotificationSettings";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-7xl h-[850px] mx-auto">
      <BorderAnimatedContainer>
        {/* LEFT SIDE - Enhanced with better styling */}
        <div className="w-80 bg-gradient-to-b from-slate-800/60 to-slate-900/60 backdrop-blur-md flex flex-col border-r border-slate-700/50">
          <div className="animate-fade-in-up">
            <ProfileHeader />
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <ActiveTabSwitch />
          </div>

          <div className="px-4 animate-fade-in-up" style={{animationDelay: '0.15s'}}>
            <NotificationSettings />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Enhanced with animations */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900/40 to-slate-800/40 backdrop-blur-md relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
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
    </div>
  );
}
export default ChatPage;
