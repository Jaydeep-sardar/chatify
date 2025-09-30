import { MessageCircleIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl floating-1" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl floating-2" />
      
      <div className="relative z-10 text-center">
        {/* Main loading icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center animate-pulse-glow border border-cyan-500/30 backdrop-blur-sm">
            <MessageCircleIcon className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>
          {/* Ripple rings */}
          <div className="absolute inset-0 w-20 h-20 border-2 border-cyan-500/20 rounded-full animate-ping" />
          <div className="absolute inset-0 w-20 h-20 border border-cyan-500/10 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
        </div>

        {/* Loading text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Chatify
          </h2>
          <p className="text-slate-400 animate-fade-in-up">
            Loading your conversations...
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse w-full shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PageLoader;
