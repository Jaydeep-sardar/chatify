import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser, messages } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);
  const messageCount = messages.length;

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-md border-b border-slate-600/50 px-6 py-4 shadow-lg">
      <div className="flex items-center space-x-4">
        <div className={`avatar ${isOnline ? "online" : "offline"} transition-all duration-300`}>
          <div className="w-12 h-12 rounded-full ring-2 ring-cyan-500/30 hover:ring-cyan-400/50 transition-all">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-slate-200 font-semibold text-lg">{selectedUser.fullName}</h3>
          <div className="flex items-center gap-2">
            <p className={`text-sm font-medium ${isOnline ? "text-green-400" : "text-slate-400"}`}>
              {isOnline ? (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Online
                </span>
              ) : (
                "Offline"
              )}
            </p>
            {messageCount > 0 && (
              <>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 text-sm">
                  {messageCount} message{messageCount !== 1 ? 's' : ''}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isOnline && (
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-green-400 text-xs font-medium">Active now</span>
          </div>
        )}
        
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 group"
          title="Close chat"
        >
          <XIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-200 transition-colors" />
        </button>
      </div>
    </div>
  );
}
export default ChatHeader;
