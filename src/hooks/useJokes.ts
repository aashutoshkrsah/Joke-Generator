import { useState, useCallback } from 'react';
import { Joke, JokeFilters } from '../types';

const BASE_URL = 'https://v2.jokeapi.dev/joke';

export function useJokes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joke, setJoke] = useState<Joke | null>(null);

  const fetchJoke = useCallback(async (filters: JokeFilters) => {
    setLoading(true);
    setError(null);

    try {
      const categories = filters.category === 'Any' ? 'Any' : filters.category;
      const blacklist = filters.blacklistFlags.join(',');
      const type = filters.type === 'Any' ? '' : `&type=${filters.type}`;
      const safe = filters.safeMode ? '&safe-mode' : '';
      
      const url = `${BASE_URL}/${categories}?lang=${filters.lang}${type}${safe}${
        blacklist ? `&blacklistFlags=${blacklist}` : ''
      }`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch joke');
      
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      
      setJoke(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch joke');
    } finally {
      setLoading(false);
    }
  }, []);

  return { joke, loading, error, fetchJoke };
}