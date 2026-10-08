import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { typeColors, typeBackgrounds } from '../utils/typeColors';
import { Heart } from 'lucide-react';

const PokemonCard = ({ pokemon, onClick, index, isFavorite, toggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };
  
  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeBackgrounds[primaryType] || 'from-slate-400 to-slate-600';
  const formatId = (id) => `#${id.toString().padStart(3, '0')}`;
  
  const hp = pokemon.stats.find(s => s.stat.name === 'hp').base_stat;
  const attack = pokemon.stats.find(s => s.stat.name === 'attack').base_stat;
  const defense = pokemon.stats.find(s => s.stat.name === 'defense').base_stat;
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pokemon);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(pokemon)}
      style={{
        rotateX,
        rotateY,
      }}
      className="relative cursor-pointer rounded-2xl overflow-hidden custom-shadow transition-shadow duration-200 w-full max-w-sm mx-auto group perspective-1000"
    >
      {/* Inner Card */}
      <div className={`relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br ${bgColor}`}>
        {/* Holographic Glare */}
        <motion.div 
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,1) 0%, transparent 50%)`,
            left: glareX,
            top: glareY,
            transform: "translate(-50%, -50%)",
            width: "200%",
            height: "200%"
          }}
        />
        
        {/* Header Section */}
        <div className="p-4 relative z-10 flex justify-between items-start text-white">
          <div>
            <h2 className="text-2xl font-bold capitalize drop-shadow-md tracking-tight">
              {pokemon.name}
            </h2>
            <span className="font-semibold opacity-80">{formatId(pokemon.id)}</span>
          </div>
          <button 
            onClick={handleFavoriteClick}
            className="p-2 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-sm transition-colors z-20"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
        </div>
        
        {/* Image Section */}
        <div className="relative h-48 w-full flex justify-center items-center z-10">
          <div className="absolute w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors duration-500"></div>
          <motion.img 
            src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="h-full w-auto object-contain drop-shadow-2xl relative z-10"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </div>
        
        {/* Stats Section */}
        <div className="bg-white dark:bg-slate-800 rounded-t-3xl p-5 pt-6 mt-[-20px] relative z-10 h-full">
          <div className="flex gap-2 justify-center mb-4">
            {pokemon.types.map((t) => (
              <span 
                key={t.type.name} 
                className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider ${typeColors[t.type.name] || 'bg-slate-400'}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4 text-center divide-x divide-slate-200 dark:divide-slate-700">
            <div>
              <div className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">HP</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{hp}</div>
            </div>
            <div>
              <div className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Attack</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{attack}</div>
            </div>
            <div>
              <div className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Defense</div>
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{defense}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;
