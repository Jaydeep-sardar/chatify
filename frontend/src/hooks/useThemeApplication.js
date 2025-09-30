import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export function useThemeApplication() {
  const { getCurrentTheme } = useThemeStore();

  useEffect(() => {
    const applyTheme = () => {
      const theme = getCurrentTheme();
      const root = document.documentElement;

      // Apply CSS variables to root
      root.style.setProperty('--theme-primary', theme.primary);
      root.style.setProperty('--theme-secondary', theme.secondary);
      root.style.setProperty('--theme-accent', theme.accent);

      // Convert hex to RGB for rgba usage
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      };

      const primaryRgb = hexToRgb(theme.primary);
      const secondaryRgb = hexToRgb(theme.secondary);
      const accentRgb = hexToRgb(theme.accent);

      if (primaryRgb) {
        root.style.setProperty('--theme-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
      }
      if (secondaryRgb) {
        root.style.setProperty('--theme-secondary-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`);
      }
      if (accentRgb) {
        root.style.setProperty('--theme-accent-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`);
      }

      // Apply theme class to body for global theme awareness
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      document.body.classList.add(`theme-${theme.id || 'cosmic'}`);
    };

    applyTheme();
    
    // Subscribe to theme changes
    const unsubscribe = useThemeStore.subscribe((state, prevState) => {
      if (state.currentTheme !== prevState.currentTheme) {
        applyTheme();
      }
    });

    return unsubscribe;
  }, [getCurrentTheme]);
}

export default useThemeApplication;