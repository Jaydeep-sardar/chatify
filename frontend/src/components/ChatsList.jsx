import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, unreadCounts, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => {
        const unreadCount = unreadCounts[chat._id] || 0;
        const isSelected = selectedUser?._id === chat._id;
        
        return (
          <div
            key={chat._id}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
              isSelected 
                ? "bg-cyan-500/30 border border-cyan-500/50 shadow-lg shadow-cyan-500/20" 
                : "bg-cyan-500/10 hover:bg-cyan-500/20"
            }`}
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
                  <div className="size-12 rounded-full ring-2 ring-cyan-500/30">
                    <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
                  {onlineUsers.includes(chat._id) && (
                    <span className="text-xs text-green-400 animate-pulse">Online</span>
                  )}
                </div>
              </div>
              
              {unreadCount > 0 && (
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 animate-bounce">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ChatsList;
