import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://pokeapi.co/api/v2';
const cache = new Map();

export function usePokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 24;

  const fetchPokemonDetails = async (url) => {
    if (cache.has(url)) return cache.get(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch details');
    const data = await res.json();
    cache.set(url, data);
    return data;
  };

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch Pokemon list');
      const data = await res.json();
      
      const detailedPokemon = await Promise.all(
        data.results.map((p) => fetchPokemonDetails(p.url))
      );
      
      setPokemon((prev) => {
        const existingIds = new Set(prev.map(p => p.id));
        const newPokemon = detailedPokemon.filter(p => !existingIds.has(p.id));
        return [...prev, ...newPokemon];
      });
      setOffset((prev) => prev + limit);
      if (data.next === null) setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  // Initial load
  useEffect(() => {
    if (offset === 0 && pokemon.length === 0) {
      loadMore();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const searchPokemon = async (query) => {
    if (!query) {
      setPokemon([]);
      setOffset(0);
      setHasMore(true);
      return loadMore();
    }
    
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE}/pokemon/${query.toLowerCase()}`;
      const data = await fetchPokemonDetails(url);
      setPokemon([data]);
      setHasMore(false);
    } catch (err) {
      setPokemon([]);
      setError('Pokémon tidak ditemukan');
    } finally {
      setLoading(false);
    }
  };

  return { pokemon, loading, error, hasMore, loadMore, searchPokemon, setPokemon };
}
