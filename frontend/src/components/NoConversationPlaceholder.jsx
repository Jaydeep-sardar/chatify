import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-2xl floating-1" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-l from-purple-500/5 to-pink-500/5 rounded-full blur-2xl floating-2" />
      
      <div className="relative z-10 max-w-md mx-auto">
        {/* Animated Icon */}
        <div className="animate-bounce-in mb-8">
          <div className="relative">
            <div className="size-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-2 animate-pulse-glow border border-cyan-500/30 backdrop-blur-sm">
              <MessageCircleIcon className="size-12 text-cyan-400 drop-shadow-glow" />
            </div>
            {/* Ripple effect */}
            <div className="absolute inset-0 size-24 bg-cyan-500/10 rounded-full animate-ping" />
          </div>
        </div>

        {/* Animated Text */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-200 bg-clip-text text-transparent mb-4">
            Ready to Connect
          </h3>
        </div>
        
        <div className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Select a conversation from the sidebar to start chatting, or begin a new conversation with someone from your contacts.
          </p>
        </div>

        {/* Animated Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
          <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full text-cyan-300 text-sm font-medium border border-cyan-500/20 backdrop-blur-sm">
            💬 Real-time Messages
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full text-purple-300 text-sm font-medium border border-purple-500/20 backdrop-blur-sm">
            📷 Share Images  
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full text-emerald-300 text-sm font-medium border border-emerald-500/20 backdrop-blur-sm">
            🔒 Secure & Private
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;
