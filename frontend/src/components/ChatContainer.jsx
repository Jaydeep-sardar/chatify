import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import PremiumMessageBubble from "./PremiumMessageBubble";
import { TypingIndicator } from "./PremiumUI";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    // clean up
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8 bg-gradient-to-b from-slate-900/20 to-slate-800/20">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Message count indicator */}
            <div className="text-center py-2">
              <span className="bg-slate-800/60 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-slate-400 border border-slate-700/50">
                {messages.length} message{messages.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {messages.map((msg, index) => {
              const isOwnMessage = msg.senderId === authUser._id;
              
              return (
                <div
                  key={msg._id}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} animate-message-pop`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <PremiumMessageBubble
                    message={msg}
                    isOwnMessage={isOwnMessage}
                    sender={selectedUser}
                    onReaction={(messageId, emoji) => {
                      // Handle reaction
                      console.log('Reaction:', messageId, emoji);
                    }}
                    onShare={(message) => {
                      // Handle share
                      navigator.share?.({
                        title: 'Shared from Chatify',
                        text: message.text,
                        url: window.location.href
                      });
                    }}
                    onDownload={(imageUrl) => {
                      // Handle download
                      const a = document.createElement('a');
                      a.href = imageUrl;
                      a.download = 'image.jpg';
                      a.click();
                    }}
                  />
                </div>
              );
            })}
            
            {/* Typing Indicator */}
            {/* You can add typing indicator here when someone is typing */}
            {false && (
              <div className="flex justify-start animate-fade-in-up">
                <TypingIndicator users={[selectedUser.fullName]} />
              </div>
            )}
            {/* 👇 scroll target */}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
