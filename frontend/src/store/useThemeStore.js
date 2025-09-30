import { create } from 'zustand';

const themes = {
  cosmic: {
    name: '🌌 Cosmic',
    primary: '#06b6d4',
    secondary: '#3b82f6',
    accent: '#8b5cf6',
    background: 'from-slate-900 via-slate-800 to-slate-900',
    glass: 'rgba(15, 23, 42, 0.6)',
    particles: ['#06b6d4', '#3b82f6', '#8b5cf6'],
    personality: 'cosmic'
  },
  ocean: {
    name: '🌊 Ocean',
    primary: '#0891b2',
    secondary: '#0284c7',
    accent: '#0ea5e9',
    background: 'from-blue-900 via-cyan-900 to-slate-900',
    glass: 'rgba(8, 47, 73, 0.6)',
    particles: ['#0891b2', '#0284c7', '#06b6d4'],
    personality: 'calm'
  },
  sunset: {
    name: '🌅 Sunset',
    primary: '#f97316',
    secondary: '#ef4444',
    accent: '#f59e0b',
    background: 'from-orange-900 via-red-900 to-slate-900',
    glass: 'rgba(124, 45, 18, 0.6)',
    particles: ['#f97316', '#ef4444', '#f59e0b'],
    personality: 'energetic'
  },
  forest: {
    name: '🌲 Forest',
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    background: 'from-emerald-900 via-green-900 to-slate-900',
    glass: 'rgba(6, 78, 59, 0.6)',
    particles: ['#10b981', '#059669', '#34d399'],
    personality: 'serene'
  },
  neon: {
    name: '⚡ Neon',
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#06b6d4',
    background: 'from-purple-900 via-pink-900 to-slate-900',
    glass: 'rgba(88, 28, 135, 0.6)',
    particles: ['#a855f7', '#ec4899', '#06b6d4'],
    personality: 'vibrant'
  },
  minimal: {
    name: '⚪ Minimal',
    primary: '#6b7280',
    secondary: '#4b5563',
    accent: '#9ca3af',
    background: 'from-gray-900 via-slate-800 to-gray-900',
    glass: 'rgba(31, 41, 55, 0.6)',
    particles: ['#6b7280', '#4b5563', '#9ca3af'],
    personality: 'focused'
  }
};

const personalities = {
  cosmic: {
    messageStyle: 'cosmic',
    animations: 'space',
    sounds: 'ethereal',
    particles: true,
    effects: 'stellar'
  },
  calm: {
    messageStyle: 'wave',
    animations: 'gentle',
    sounds: 'water',
    particles: false,
    effects: 'ripple'
  },
  energetic: {
    messageStyle: 'burst',
    animations: 'dynamic',
    sounds: 'upbeat',
    particles: true,
    effects: 'fire'
  },
  serene: {
    messageStyle: 'nature',
    animations: 'smooth',
    sounds: 'forest',
    particles: false,
    effects: 'grow'
  },
  vibrant: {
    messageStyle: 'electric',
    animations: 'intense',
    sounds: 'synthetic',
    particles: true,
    effects: 'neon'
  },
  focused: {
    messageStyle: 'clean',
    animations: 'subtle',
    sounds: 'minimal',
    particles: false,
    effects: 'fade'
  }
};

export const useThemeStore = create((set, get) => ({
  currentTheme: 'cosmic',
  themes,
  personalities,
  customThemes: JSON.parse(localStorage.getItem('customThemes') || '[]'),
  
  setTheme: (themeName) => {
    set({ currentTheme: themeName });
    localStorage.setItem('chatify-theme', themeName);
    
    // Apply theme to CSS variables
    const theme = themes[themeName];
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', theme.primary);
      root.style.setProperty('--theme-secondary', theme.secondary);
      root.style.setProperty('--theme-accent', theme.accent);
      root.style.setProperty('--theme-glass', theme.glass);
    }
  },
  
  getCurrentTheme: () => {
    const { currentTheme } = get();
    return themes[currentTheme] || themes.cosmic;
  },
  
  getCurrentPersonality: () => {
    const theme = get().getCurrentTheme();
    return personalities[theme.personality] || personalities.cosmic;
  },
  
  createCustomTheme: (name, colors) => {
    const customTheme = {
      id: Date.now().toString(),
      name,
      ...colors,
      isCustom: true
    };
    
    const customThemes = [...get().customThemes, customTheme];
    set({ customThemes });
    localStorage.setItem('customThemes', JSON.stringify(customThemes));
    
    return customTheme.id;
  },
  
  deleteCustomTheme: (themeId) => {
    const customThemes = get().customThemes.filter(theme => theme.id !== themeId);
    set({ customThemes });
    localStorage.setItem('customThemes', JSON.stringify(customThemes));
  },
  
  getThemePreview: (themeName) => {
    return themes[themeName] || themes.cosmic;
  },
  
  initializeTheme: () => {
    const savedTheme = localStorage.getItem('chatify-theme') || 'cosmic';
    get().setTheme(savedTheme);
  }
}));