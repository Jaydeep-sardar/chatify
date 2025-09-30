import { useState } from 'react';
import { Palette, Sparkles, Sun, Moon, Zap } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import ThemeCustomizer from './ThemeCustomizer';

function ThemeToggle() {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const { currentTheme, themes, setTheme, getCurrentTheme } = useThemeStore();
  const [showQuickThemes, setShowQuickThemes] = useState(false);

  const currentThemeData = getCurrentTheme();
  const popularThemes = ['cosmic', 'ocean', 'neon'];

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'cosmic': return <Sparkles className="w-4 h-4" />;
      case 'ocean': return <Sun className="w-4 h-4" />;
      case 'neon': return <Zap className="w-4 h-4" />;
      default: return <Moon className="w-4 h-4" />;
    }
  };

  return (
    <>
      <div className="relative">
        {/* Main Theme Button */}
        <button
          onClick={() => setShowQuickThemes(!showQuickThemes)}
          className="group relative p-3 glass-effect hover:glass-strong rounded-xl transition-all duration-300 hover:scale-105 shadow-glow"
          title="Change Theme"
        >
          <div className="relative">
            <Palette className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
            <div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-700"
              style={{ backgroundColor: currentThemeData.primary }}
            />
          </div>
        </button>

        {/* Quick Theme Selector */}
        {showQuickThemes && (
          <div className="absolute top-full mt-2 right-0 z-40">
            <div className="glass-strong rounded-xl p-3 shadow-glow-strong border border-slate-600/30 min-w-48">
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-300 mb-3">Quick Themes</div>
                
                {popularThemes.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => {
                      setTheme(themeName);
                      setShowQuickThemes(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                      currentTheme === themeName
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: themes[themeName].primary }}
                    />
                    {getThemeIcon(themeName)}
                    <span className="capitalize">{themes[themeName].name}</span>
                  </button>
                ))}
                
                <div className="border-t border-slate-600/30 pt-2 mt-3">
                  <button
                    onClick={() => {
                      setShowCustomizer(true);
                      setShowQuickThemes(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Customize...</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Theme Customizer Modal */}
      <ThemeCustomizer 
        isOpen={showCustomizer} 
        onClose={() => setShowCustomizer(false)} 
      />
    </>
  );
}

export default ThemeToggle;