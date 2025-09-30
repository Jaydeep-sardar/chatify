import { useState, useEffect } from 'react';
import { Sparkles, Zap, Heart } from 'lucide-react';

function PremiumEffects({ children, effect = 'glow', intensity = 'medium' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (effect === 'particles' && isHovered) {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 0.5
      }));
      setParticles(newParticles);
    }
  }, [isHovered, effect]);

  const getEffectClasses = () => {
    const base = 'relative transition-all duration-500 ease-out';
    
    switch (effect) {
      case 'glow':
        return `${base} ${isHovered ? 'shadow-glow transform scale-105' : ''}`;
      case 'shimmer':
        return `${base} overflow-hidden ${isHovered ? 'animate-shimmer' : ''}`;
      case 'bounce':
        return `${base} ${isHovered ? 'animate-bounce transform scale-110' : ''}`;
      case 'particles':
        return `${base} ${isHovered ? 'transform scale-105' : ''}`;
      default:
        return base;
    }
  };

  const getIntensityClasses = () => {
    switch (intensity) {
      case 'low':
        return 'opacity-70';
      case 'high':
        return 'opacity-100 brightness-110';
      default:
        return 'opacity-90';
    }
  };

  return (
    <div
      className={`${getEffectClasses()} ${getIntensityClasses()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shimmer Effect */}
      {effect === 'shimmer' && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
      
      {/* Particle Effects */}
      {effect === 'particles' && isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Floating Icons */}
      {effect === 'magical' && isHovered && (
        <div className="absolute -top-2 -right-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        </div>
      )}
      
      {children}
    </div>
  );
}

function StatusIndicator({ status, animated = true }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: 'bg-green-400',
          glow: 'shadow-green-400/50',
          text: 'Online'
        };
      case 'away':
        return {
          color: 'bg-yellow-400',
          glow: 'shadow-yellow-400/50',
          text: 'Away'
        };
      case 'busy':
        return {
          color: 'bg-red-400',
          glow: 'shadow-red-400/50',
          text: 'Busy'
        };
      default:
        return {
          color: 'bg-gray-400',
          glow: 'shadow-gray-400/50',
          text: 'Offline'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="relative inline-flex items-center gap-2">
      <div className={`
        w-3 h-3 rounded-full ${config.color} 
        ${animated ? 'animate-pulse' : ''} 
        shadow-lg ${config.glow}
      `}>
        {animated && (
          <div className={`
            absolute inset-0 rounded-full ${config.color} 
            animate-ping opacity-75
          `} />
        )}
      </div>
      <span className="text-xs font-medium text-slate-300">{config.text}</span>
    </div>
  );
}

function TypingIndicator({ users = ['Someone'] }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-full backdrop-blur-sm border border-slate-700/50">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-cyan-400 rounded-full animate-typing-indicator"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      <span className="text-sm text-slate-400">
        {users.length === 1 
          ? `${users[0]} is typing...`
          : `${users.length} people are typing...`
        }
      </span>
    </div>
  );
}

function PremiumButton({ 
  children, 
  variant = 'primary', 
  effect = 'glow', 
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  ...props 
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled || loading) return;

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400';
      case 'secondary':
        return 'bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 hover:from-slate-600 hover:to-slate-500';
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-400 hover:to-pink-400';
      case 'ghost':
        return 'bg-transparent border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400';
      default:
        return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3';
    }
  };

  const getEffectClasses = () => {
    if (disabled) return '';
    
    switch (effect) {
      case 'glow':
        return 'hover:shadow-glow';
      case 'lift':
        return 'hover:transform hover:scale-105 hover:shadow-xl';
      case 'bounce':
        return 'hover:animate-bounce';
      default:
        return '';
    }
  };

  return (
    <button
      className={`
        relative overflow-hidden rounded-xl font-semibold
        transition-all duration-300 ease-out
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${getEffectClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${loading ? 'cursor-wait' : ''}
      `}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple-effect"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      {children}
    </button>
  );
}

export { PremiumEffects, StatusIndicator, TypingIndicator, PremiumButton };