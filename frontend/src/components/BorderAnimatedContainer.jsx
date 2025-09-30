// Premium animated gradient border with advanced effects
function BorderAnimatedContainer({ children }) {
  return (
    <div className="relative w-full h-full group">
      {/* Enhanced main container with multi-layer animated border */}
      <div className="w-full h-full [background:linear-gradient(45deg,#0f172a,theme(colors.slate.800)_50%,#1e293b)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.cyan.400)_86%,_theme(colors.blue.400)_90%,_theme(colors.purple.400)_92%,_theme(colors.cyan.400)_94%,_theme(colors.slate.600/.48))_border-box] rounded-3xl border-2 border-transparent animate-border flex overflow-hidden shadow-2xl shadow-cyan-500/20">
        {children}
      </div>
      
      {/* Multi-layer glow effects */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none blur-2xl -z-10 animate-pulse" />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-blue-400/10 opacity-50 group-hover:opacity-80 transition-all duration-500 pointer-events-none blur-xl -z-10" />
      
      {/* Premium inner highlights */}
      <div className="absolute inset-[2px] rounded-3xl pointer-events-none bg-gradient-to-b from-white/[0.03] via-transparent to-white/[0.01]" />
      <div className="absolute inset-[2px] rounded-3xl pointer-events-none bg-gradient-to-r from-transparent via-cyan-500/[0.02] to-transparent" />
      
      {/* Animated corner highlights */}
      <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-2 right-2 w-6 h-6 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-sm animate-pulse" style={{animationDelay: '0.5s'}} />
    </div>
  );
}
export default BorderAnimatedContainer;
