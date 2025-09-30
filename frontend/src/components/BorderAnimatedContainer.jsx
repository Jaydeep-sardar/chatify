// Enhanced animated gradient border with multiple effects
function BorderAnimatedContainer({ children }) {
  return (
    <div className="relative w-full h-full group">
      {/* Main container with animated border */}
      <div className="w-full h-full [background:linear-gradient(45deg,#0f172a,theme(colors.slate.800)_50%,#1e293b)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.cyan.400)_86%,_theme(colors.blue.400)_90%,_theme(colors.cyan.400)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border-2 border-transparent animate-border flex overflow-hidden shadow-2xl shadow-cyan-500/10">
        {children}
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl -z-10" />
      
      {/* Subtle inner shadow */}
      <div className="absolute inset-[2px] rounded-2xl pointer-events-none bg-gradient-to-b from-white/[0.02] to-transparent" />
    </div>
  );
}
export default BorderAnimatedContainer;
