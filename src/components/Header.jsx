import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ currentView, setCurrentView }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="relative w-full pt-6 pb-24 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 transition-colors duration-300">
      
      {/* Abstract Glowing Orbs in background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="w-full flex justify-end mb-4 md:mb-0 md:absolute md:top-6 md:right-6">
          <button 
            onClick={toggleDarkMode}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/20 transition-transform active:scale-95"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-white" />}
          </button>
        </div>
        
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-center mt-4 md:mt-8 flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 
              className="text-5xl md:text-[80px] font-black tracking-tight z-10" 
              style={{ 
                fontFamily: 'var(--font-sans), sans-serif',
                color: '#ffcb05',
                WebkitTextStroke: '4px #3b4cca',
                textShadow: '0 8px 0 #1e293b',
              }}
            >
              PokeBase
            </h1>
            
            {/* Pokeball Graphic Inline */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="opacity-90"
            >
              <svg width="60" height="60" viewBox="0 0 100 100" className="md:w-20 md:h-20 drop-shadow-lg">
                <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#1e293b" strokeWidth="6"/>
                <path d="M 2 50 A 48 48 0 0 1 98 50 Z" fill="#ef4444" stroke="#1e293b" strokeWidth="6"/>
                <line x1="2" y1="50" x2="98" y2="50" stroke="#1e293b" strokeWidth="8"/>
                <circle cx="50" cy="50" r="16" fill="#ffffff" stroke="#1e293b" strokeWidth="8"/>
                <circle cx="50" cy="50" r="6" fill="#1e293b"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mt-8 z-10">
          <button
            onClick={() => setCurrentView('pokedex')}
            className={`px-6 py-2 rounded-full font-bold transition-all backdrop-blur-md ${
              currentView === 'pokedex'
                ? 'bg-white text-indigo-900 shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            Pokédex
          </button>
          <button
            onClick={() => setCurrentView('gacha')}
            className={`px-6 py-2 rounded-full font-bold transition-all backdrop-blur-md flex items-center gap-2 ${
              currentView === 'gacha'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-[0_0_15px_rgba(250,204,21,0.5)] border-none'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            <span>✨</span> Buka Pack
          </button>
        </div>
      </div>

      {/* Fluid SVG Wave Divider (Smooth Curve) */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-0">
        <svg className="relative block w-full h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
            className="fill-slate-50 dark:fill-slate-900 transition-colors duration-300"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;
