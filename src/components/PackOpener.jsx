import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PokemonCard from './PokemonCard';

const PackOpener = ({ pokemonList, toggleFavorite, favorites, onCardClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pulledCards, setPulledCards] = useState([]);
  const [isOpening, setIsOpening] = useState(false);

  const openPack = () => {
    if (pokemonList.length < 5) return;
    setIsOpening(true);
    
    // Simulate pack opening delay
    setTimeout(() => {
      const shuffled = [...pokemonList].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setPulledCards(selected);
      setIsOpen(true);
      setIsOpening(false);
    }, 1500);
  };

  const resetPack = () => {
    setIsOpen(false);
    setTimeout(() => {
      setPulledCards([]);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 min-h-[60vh]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Gacha Kartu Pokémon</h2>
        <p className="text-slate-600 dark:text-slate-400">Buka pack untuk mendapatkan 5 Pokémon acak!</p>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="pack"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
            transition={{ y: { repeat: Infinity, duration: 3, ease: "easeInOut" } }}
            exit={{ scale: 1.2, opacity: 0, filter: "blur(10px)", rotate: 5 }}
            whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={!isOpening ? openPack : undefined}
            className={`relative w-72 h-[460px] cursor-pointer shadow-[0_25px_50px_rgba(0,0,0,0.6)] transition-all rounded-lg overflow-hidden ${isOpening ? 'animate-pulse' : ''}`}
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)',
              border: '2px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Top Crimp Edge */}
            <div 
              className="absolute top-0 left-0 w-full h-8 z-20 bg-slate-400" 
              style={{ 
                borderBottom: '2px solid rgba(0,0,0,0.4)', 
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)',
                boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.4)'
              }}
            ></div>
            
            {/* Bottom Crimp Edge */}
            <div 
              className="absolute bottom-0 left-0 w-full h-8 z-20 bg-slate-400" 
              style={{ 
                borderTop: '2px solid rgba(0,0,0,0.4)', 
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 6px)',
                boxShadow: 'inset 0 -4px 6px rgba(0,0,0,0.2)'
              }}
            ></div>

            {/* Pack Graphic Background */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400 via-transparent to-transparent"></div>
               {/* Diagonal swooshes */}
               <div className="absolute top-1/4 left-[-20%] w-[140%] h-32 bg-yellow-400/20 rotate-[-20deg]"></div>
               <div className="absolute bottom-1/3 right-[-20%] w-[140%] h-20 bg-red-500/40 rotate-[25deg]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full py-12 pt-14">
              <div className="text-center">
                <h3 
                  className="font-black tracking-tighter text-yellow-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]" 
                  style={{ fontFamily: '"Press Start 2P", sans-serif', fontSize: '18px', WebkitTextStroke: '1px #3b4cca' }}
                >
                  POKÉMON
                </h3>
                <p className="text-white text-[10px] font-bold tracking-widest mt-1.5 opacity-90 drop-shadow-md">TRADING CARD GAME</p>
              </div>

              {/* Center image - Charizard */}
              <motion.div 
                animate={{ y: [0, -5, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="w-56 h-56 mt-2 flex items-center justify-center relative"
              >
                {/* Glowing aura */}
                <div className="absolute inset-0 bg-yellow-400/40 blur-3xl rounded-full scale-75"></div>
                {/* Charizard official artwork from PokeAPI */}
                <img 
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png" 
                  alt="Charizard" 
                  className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.7)] z-10" 
                />
              </motion.div>

              <div className="mb-4 w-full text-center px-6 relative z-10">
                 <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-black italic tracking-wider py-1.5 px-2 border-y-[3px] border-yellow-400 shadow-[0_5px_15px_rgba(0,0,0,0.6)] transform -skew-x-12">
                    BASE SET EDITION
                 </div>
                 <p className="text-[10px] text-white/80 mt-3 font-bold bg-black/40 py-1 px-3 rounded-full inline-block backdrop-blur-sm">
                    {isOpening ? 'MEMBUKA...' : '11 ADDITIONAL GAME CARDS'}
                 </p>
              </div>
            </div>
            
            {/* Holographic foil overlay effect */}
            <motion.div 
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute inset-0 z-30 opacity-40 pointer-events-none mix-blend-color-dodge"
              style={{
                backgroundImage: 'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.9) 35%, rgba(255,255,255,0.3) 45%, transparent 60%, rgba(255,215,0,0.5) 70%, transparent 80%)',
                backgroundSize: '250% 250%'
              }}
            />

            {/* Inner pack shadow for 3D volume */}
            <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_20px_0_40px_rgba(0,0,0,0.5),_inset_-20px_0_40px_rgba(0,0,0,0.5)]"></div>
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-7xl px-4">
              {pulledCards.map((poke, index) => (
                <motion.div
                  key={poke.id}
                  initial={{ opacity: 0, y: 100, rotateY: -90, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  transition={{ delay: index * 0.25, type: "spring", damping: 15 }}
                >
                  <PokemonCard 
                    pokemon={poke} 
                    index={index}
                    onClick={onCardClick}
                    isFavorite={favorites.some(f => f.id === poke.id)}
                    toggleFavorite={toggleFavorite}
                  />
                </motion.div>
              ))}
            </div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              onClick={resetPack}
              className="mt-12 px-10 py-4 text-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7)] hover:scale-105 transition-all active:scale-95"
            >
              Buka Pack Lagi!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackOpener;
