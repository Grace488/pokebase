import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SkeletonCard from './components/SkeletonCard';
import PackOpener from './components/PackOpener';
import { usePokemon } from './hooks/usePokemon';

function App() {
  const { pokemon, loading, error, hasMore, loadMore, searchPokemon } = usePokemon();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('pokemon-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('id'); // id, name, hp
  const [currentView, setCurrentView] = useState('pokedex');

  useEffect(() => {
    localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (poke) => {
    setFavorites(prev => {
      const isFav = prev.some(p => p.id === poke.id);
      if (isFav) {
        return prev.filter(p => p.id !== poke.id);
      } else {
        return [...prev, poke];
      }
    });
  };

  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSearch = (query) => {
    searchPokemon(query);
    if (query) {
      setShowFavorites(false);
    }
  };

  const displayedPokemon = useMemo(() => {
    let list = showFavorites ? favorites : pokemon;
    
    if (selectedTypes.length > 0) {
      list = list.filter(p => 
        p.types.some(t => selectedTypes.includes(t.type.name))
      );
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'hp') {
        const hpA = a.stats.find(s => s.stat.name === 'hp').base_stat;
        const hpB = b.stats.find(s => s.stat.name === 'hp').base_stat;
        return hpB - hpA; // Descending
      }
      return a.id - b.id; // Default by id
    });
  }, [pokemon, favorites, showFavorites, selectedTypes, sortBy]);

  const availableTypes = useMemo(() => {
    const types = new Set();
    pokemon.forEach(p => p.types.forEach(t => types.add(t.type.name)));
    return Array.from(types).sort();
  }, [pokemon]);

  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'pokedex' ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
              <div className="w-full md:w-1/2">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto justify-center">
            <button
              onClick={() => setShowFavorites(false)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                !showFavorites 
                  ? 'bg-red-500 text-white custom-shadow' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Semua Pokémon
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                showFavorites 
                  ? 'bg-red-500 text-white custom-shadow' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Favorit ({favorites.length})
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <TypeFilter selectedTypes={selectedTypes} toggleType={toggleType} availableTypes={availableTypes} />
          
          <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 justify-center">
            <span className="text-gray-500 dark:text-gray-400 font-semibold text-sm">Urutkan:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="id">Nomor Pokédex</option>
              <option value="name">Nama (A-Z)</option>
              <option value="hp">HP Tertinggi</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-xl font-bold mb-4">{error}</div>
            <button 
              onClick={() => loadMore()}
              className="px-6 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {displayedPokemon.map((poke, index) => (
            <PokemonCard 
              key={poke.id} 
              pokemon={poke} 
              index={index}
              onClick={setSelectedPokemon}
              isFavorite={favorites.some(f => f.id === poke.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
          
          {loading && Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
        </div>

        {!showFavorites && displayedPokemon.length === 0 && !loading && !error && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <h3 className="text-2xl font-bold mb-2">Tidak ada Pokémon ditemukan</h3>
            <p>Coba gunakan kata kunci atau filter lain.</p>
          </div>
        )}

        {showFavorites && displayedPokemon.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <h3 className="text-2xl font-bold mb-2">Belum ada Pokémon favorit</h3>
            <p>Klik tombol hati pada kartu Pokémon untuk menyimpannya di sini.</p>
          </div>
        )}

        {!loading && hasMore && !showFavorites && selectedTypes.length === 0 && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => loadMore()}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-95"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}
          </>
        ) : (
          <PackOpener 
            pokemonList={pokemon} 
            toggleFavorite={toggleFavorite} 
            favorites={favorites} 
            onCardClick={setSelectedPokemon} 
          />
        )}
      </main>

      <PokemonModal 
        pokemon={selectedPokemon} 
        isOpen={!!selectedPokemon} 
        onClose={() => setSelectedPokemon(null)} 
      />
    </div>
  );
}

export default App;
