import React from 'react';
import { motion } from 'framer-motion';
import { typeColors } from '../utils/typeColors';

const TypeFilter = ({ selectedTypes, toggleType, availableTypes }) => {
  // If availableTypes is not provided, fallback to all types (or an empty array)
  const typesToShow = availableTypes || Object.keys(typeColors);

  if (typesToShow.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 mb-8 perspective-1000">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 text-center uppercase tracking-wider">
        Filter by Type
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {typesToShow.map((type) => {
          const isSelected = selectedTypes.includes(type);
          return (
            <motion.button
              key={type}
              whileHover={{ y: -4, rotateY: 10, rotateX: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleType(type)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200 border border-transparent ${
                isSelected
                  ? `${typeColors[type]} text-white custom-shadow`
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border-slate-200 dark:border-slate-700'
              }`}
            >
              {type}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TypeFilter;
