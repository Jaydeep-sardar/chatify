import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import MessageStatus from "./MessageStatus";

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
              const showAvatar = !isOwnMessage && (index === 0 || messages[index - 1].senderId !== msg.senderId);
              
              return (
                <div
                  key={msg._id}
                  className={`chat ${isOwnMessage ? "chat-end" : "chat-start"} animate-fade-in-up`}
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {showAvatar && (
                    <div className="chat-image avatar">
                      <div className="w-8 h-8 rounded-full">
                        <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`chat-bubble relative shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                      isOwnMessage
                        ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white"
                        : "bg-gradient-to-r from-slate-800 to-slate-700 text-slate-200 border border-slate-600/50"
                    } ${msg.isOptimistic ? 'opacity-70' : ''}`}
                  >
                    {msg.image && (
                      <div className="mb-2">
                        <img 
                          src={msg.image} 
                          alt="Shared" 
                          className="rounded-lg max-w-xs max-h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                          onClick={() => window.open(msg.image, '_blank')}
                        />
                      </div>
                    )}
                    {msg.text && (
                      <p className="break-words leading-relaxed">{msg.text}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <MessageStatus message={msg} isOwnMessage={isOwnMessage} />
                    </div>
                  </div>
                </div>
              );
            })}
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
