import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        border: "border 4s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "bounce-in": "bounce-in 0.6s ease-out forwards",
        "slide-in-left": "slide-in-from-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-from-right 0.5s ease-out forwards",
        shimmer: "shimmer 2s infinite",
        "gradient-shift": "gradient-shift 3s ease-in-out infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(5px) rotate(-1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1)",
            transform: "scale(1)",
          },
          "50%": { 
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(6, 182, 212, 0.2)",
            transform: "scale(1.02)",
          },
        },
        "fade-in-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "gradient-shift": {
          "0%": { "--gradient-angle": "0deg" },
          "100%": { "--gradient-angle": "360deg" },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(6, 182, 212, 0.35)",
          "0 0px 65px rgba(6, 182, 212, 0.2)"
        ],
        "glow-pink": [
          "0 0px 20px rgba(236, 72, 153, 0.35)",
          "0 0px 65px rgba(236, 72, 153, 0.2)"
        ],
      },
    },
  },
  plugins: [
    daisyui,
    // Custom scrollbar plugin
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-thumb-slate-600': {
          'scrollbar-color': '#475569 transparent',
        },
        '.scrollbar-track-transparent': {
          'scrollbar-track-color': 'transparent',
        },
        // Webkit scrollbar styles
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '6px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          background: '#475569',
          'border-radius': '3px',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
          background: '#64748b',
        },
      })
    }
  ],
};
