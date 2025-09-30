import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-12 relative overflow-hidden">
      {/* Enhanced floating background elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl floating-1" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-l from-purple-500/8 to-pink-500/8 rounded-full blur-3xl floating-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl floating-3" />
      
      <div className="relative z-10 max-w-lg mx-auto">
        {/* Premium Animated Icon */}
        <div className="animate-bounce-in mb-12">
          <div className="relative group">
            <div className="size-32 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4 shadow-glow-strong border border-cyan-500/40 backdrop-blur-md interactive-hover">
              <MessageCircleIcon className="size-16 text-cyan-300 drop-shadow-glow animate-pulse" />
            </div>
            {/* Multiple ripple effects */}
            <div className="absolute inset-0 size-32 bg-cyan-500/20 rounded-full animate-ping opacity-75" />
            <div className="absolute inset-2 size-28 bg-blue-500/15 rounded-full animate-ping opacity-50" style={{animationDelay: '0.5s'}} />
            <div className="absolute inset-4 size-24 bg-purple-500/10 rounded-full animate-ping opacity-25" style={{animationDelay: '1s'}} />
          </div>
        </div>

        {/* Enhanced Animated Text */}
        <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h1 className="text-4xl font-bold gradient-text mb-6 animate-gradient-shift">
            Welcome to Chatify ✨
          </h1>
        </div>
        
        <div className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <p className="text-slate-300 text-xl leading-relaxed mb-10 font-light max-w-md mx-auto">
            Start connecting with your friends and family. Select a chat from the sidebar or explore your contacts to begin a conversation.
          </p>
        </div>

        {/* Premium Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up max-w-2xl mx-auto" style={{animationDelay: '0.7s'}}>
          <div className="glass-effect px-6 py-4 rounded-xl text-center interactive-hover border border-cyan-500/20 group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">💬</div>
            <div className="text-cyan-300 font-semibold mb-1">Real-time Chat</div>
            <div className="text-slate-400 text-sm">Instant messaging with live updates</div>
          </div>
          
          <div className="glass-effect px-6 py-4 rounded-xl text-center interactive-hover border border-purple-500/20 group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📷</div>
            <div className="text-purple-300 font-semibold mb-1">Media Sharing</div>
            <div className="text-slate-400 text-sm">Share photos and images instantly</div>
          </div>
          
          <div className="glass-effect px-6 py-4 rounded-xl text-center interactive-hover border border-emerald-500/20 group">
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🔒</div>
            <div className="text-emerald-300 font-semibold mb-1">Secure & Private</div>
            <div className="text-slate-400 text-sm">End-to-end encrypted conversations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;
