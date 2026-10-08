import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Sparkles } from 'lucide-react';
import { typeColors, typeBackgrounds } from '../utils/typeColors';

const PokemonModal = ({ pokemon, isOpen, onClose }) => {
  const [showShiny, setShowShiny] = useState(false);

  if (!isOpen || !pokemon) return null;

  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeBackgrounds[primaryType] || 'from-gray-400 to-gray-600';
  const formatId = (id) => `#${id.toString().padStart(3, '0')}`;
  
  const spriteNormal = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
  const spriteShiny = pokemon.sprites.other["official-artwork"].front_shiny || pokemon.sprites.front_shiny;
  const currentSprite = showShiny && spriteShiny ? spriteShiny : spriteNormal;

  const playCry = () => {
    if (pokemon.cries && pokemon.cries.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio playback failed', e));
    }
  };

  const statColors = {
    hp: 'bg-red-500',
    attack: 'bg-orange-500',
    defense: 'bg-yellow-500',
    'special-attack': 'bg-blue-500',
    'special-defense': 'bg-green-500',
    speed: 'bg-pink-500'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row"
        >
          {/* Left Side - Image and Type */}
          <div className={`md:w-1/2 p-6 flex flex-col items-center justify-center bg-gradient-to-br ${bgColor} text-white relative`}>
            <button 
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors md:hidden"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <div className="absolute top-4 right-4 text-xl font-bold opacity-80">
              {formatId(pokemon.id)}
            </div>

            <motion.div 
              key={currentSprite}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full aspect-square flex items-center justify-center mt-8 md:mt-0"
            >
              <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75"></div>
              <img 
                src={currentSprite} 
                alt={pokemon.name}
                className="w-full max-w-[250px] h-auto object-contain relative z-10 drop-shadow-2xl"
              />
            </motion.div>

            <h2 className="text-3xl font-bold capitalize mt-4 mb-2 drop-shadow-md text-center">{pokemon.name}</h2>
            
            <div className="flex gap-2 mb-6">
              {pokemon.types.map((t) => (
                <span 
                  key={t.type.name} 
                  className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${typeColors[t.type.name] || 'bg-gray-400'} shadow-md`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {pokemon.cries && pokemon.cries.latest && (
                <button 
                  onClick={playCry}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span className="text-sm font-semibold">Suara</span>
                </button>
              )}
              {spriteShiny && (
                <button 
                  onClick={() => setShowShiny(!showShiny)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors backdrop-blur-sm ${showShiny ? 'bg-yellow-400/80 text-yellow-900' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                >
                  <Sparkles className={`w-4 h-4 ${showShiny ? 'text-yellow-900' : 'text-yellow-300'}`} />
                  <span className="text-sm font-semibold">Shiny</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Stats and Info */}
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-none">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition-colors hidden md:block text-gray-800 dark:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl">
              <div className="text-center">
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Tinggi</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{pokemon.height / 10} m</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Berat</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{pokemon.weight / 10} kg</div>
              </div>
              <div className="col-span-2 mt-2">
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-2 text-center">Abilities</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {pokemon.abilities.map((a) => (
                    <span key={a.ability.name} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm capitalize">
                      {a.ability.name.replace('-', ' ')}
                      {a.is_hidden && <span className="text-xs ml-1 opacity-70">(Hidden)</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 text-lg">Base Stats</h3>
              <div className="space-y-3">
                {pokemon.stats.map((s) => {
                  const statName = s.stat.name;
                  const displayName = statName.replace('special-', 'sp. ');
                  const statValue = s.base_stat;
                  const statPercent = Math.min((statValue / 255) * 100, 100);
                  const barColor = statColors[statName] || 'bg-gray-500';

                  return (
                    <div key={statName} className="flex items-center text-sm">
                      <div className="w-24 font-medium text-gray-600 dark:text-gray-400 capitalize">{displayName}</div>
                      <div className="w-8 font-bold text-gray-800 dark:text-gray-200 text-right mr-3">{statValue}</div>
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${statPercent}%` }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className={`h-full ${barColor} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PokemonModal;
