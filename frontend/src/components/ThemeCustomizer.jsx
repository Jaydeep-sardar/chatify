import { useState } from 'react';
import { Palette, Sparkles, Settings, X, Download, Upload } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import { PremiumButton } from './PremiumUI';

function ThemeCustomizer({ isOpen, onClose }) {
  const { 
    currentTheme, 
    themes, 
    setTheme, 
    getCurrentTheme, 
    getCurrentPersonality,
    customThemes,
    createCustomTheme,
    deleteCustomTheme
  } = useThemeStore();
  
  const [activeTab, setActiveTab] = useState('themes');
  const [customColors, setCustomColors] = useState({
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#8b5cf6'
  });

  if (!isOpen) return null;

  const handleThemeSelect = (themeName) => {
    setTheme(themeName);
  };

  const handleCreateCustomTheme = () => {
    const name = prompt('Enter theme name:');
    if (name) {
      const themeId = createCustomTheme(name, customColors);
      setTheme(themeId);
    }
  };

  const exportTheme = () => {
    const theme = getCurrentTheme();
    const dataStr = JSON.stringify(theme, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${theme.name}-theme.json`;
    link.click();
  };

  const currentThemeData = getCurrentTheme();
  const currentPersonality = getCurrentPersonality();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-strong rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-glow-strong">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-600/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl">
              <Palette className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text">Theme Studio</h2>
              <p className="text-slate-400">Customize your chat experience</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 border-r border-slate-600/30 p-4">
            <div className="space-y-2">
              {['themes', 'personality', 'custom'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab === 'themes' && <Palette className="w-5 h-5" />}
                    {tab === 'personality' && <Sparkles className="w-5 h-5" />}
                    {tab === 'custom' && <Settings className="w-5 h-5" />}
                    <span className="capitalize font-medium">{tab}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar-premium">
            {activeTab === 'themes' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-6">Choose Your Theme</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(themes).map(([key, theme]) => (
                    <div
                      key={key}
                      onClick={() => handleThemeSelect(key)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                        currentTheme === key
                          ? 'ring-2 ring-cyan-400 shadow-glow'
                          : 'hover:ring-1 hover:ring-slate-500'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                      <h4 className="font-semibold text-slate-200 mb-1">{theme.name}</h4>
                      <p className="text-sm text-slate-400 capitalize">{theme.personality} personality</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'personality' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-6">Personality Settings</h3>
                <div className="space-y-6">
                  <div className="glass-effect p-6 rounded-xl">
                    <h4 className="font-semibold text-slate-200 mb-4">Current: {currentThemeData.name}</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Message Style</span>
                        <span className="text-cyan-400 capitalize">{currentPersonality.messageStyle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Animations</span>
                        <span className="text-cyan-400 capitalize">{currentPersonality.animations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Sound Theme</span>
                        <span className="text-cyan-400 capitalize">{currentPersonality.sounds}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Particles</span>
                        <span className={currentPersonality.particles ? 'text-green-400' : 'text-red-400'}>
                          {currentPersonality.particles ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Effects</span>
                        <span className="text-cyan-400 capitalize">{currentPersonality.effects}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'custom' && (
              <div>
                <h3 className="text-xl font-semibold text-slate-200 mb-6">Create Custom Theme</h3>
                <div className="space-y-6">
                  <div className="glass-effect p-6 rounded-xl">
                    <h4 className="font-semibold text-slate-200 mb-4">Color Picker</h4>
                    <div className="space-y-4">
                      {Object.entries(customColors).map(([key, color]) => (
                        <div key={key} className="flex items-center justify-between">
                          <label className="text-slate-300 capitalize">{key}</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={color}
                              onChange={(e) => setCustomColors(prev => ({
                                ...prev,
                                [key]: e.target.value
                              }))}
                              className="w-12 h-8 rounded border-2 border-slate-600 cursor-pointer"
                            />
                            <span className="text-sm text-slate-400 font-mono">{color}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                      <PremiumButton onClick={handleCreateCustomTheme} variant="primary">
                        Create Theme
                      </PremiumButton>
                      <PremiumButton onClick={exportTheme} variant="secondary">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </PremiumButton>
                    </div>
                  </div>

                  {/* Custom themes list */}
                  {customThemes.length > 0 && (
                    <div className="glass-effect p-6 rounded-xl">
                      <h4 className="font-semibold text-slate-200 mb-4">Your Custom Themes</h4>
                      <div className="space-y-3">
                        {customThemes.map((theme) => (
                          <div key={theme.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-300">{theme.name}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setTheme(theme.id)}
                                className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm hover:bg-cyan-500/30 transition-colors"
                              >
                                Apply
                              </button>
                              <button
                                onClick={() => deleteCustomTheme(theme.id)}
                                className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeCustomizer;