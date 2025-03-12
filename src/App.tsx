import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Moon, Sun, RefreshCw } from 'lucide-react';
import { JokeCard } from './components/JokeCard';
import { Filters } from './components/Filters';
import { useJokes } from './hooks/useJokes';
import { Joke, JokeFilters } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  const [filters, setFilters] = useState<JokeFilters>({
    category: 'Any',
    type: 'Any',
    lang: 'en',
    blacklistFlags: [],
    safeMode: false
  });

  const [favorites, setFavorites] = useState<Joke[]>(() => {
    const saved = localStorage.getItem('favoriteJokes');
    return saved ? JSON.parse(saved) : [];
  });

  const { joke, loading, error, fetchJoke } = useJokes();

  useEffect(() => {
    fetchJoke(filters);
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('favoriteJokes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleFavorite = (joke: Joke) => {
    setFavorites(prev => {
      const exists = prev.some(j => j.id === joke.id);
      return exists
        ? prev.filter(j => j.id !== joke.id)
        : [...prev, joke];
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" />
      
      <div className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Joke Generator
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="text-yellow-500" size={24} />
            ) : (
              <Moon className="text-gray-700" size={24} />
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Filters filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Current Joke
              </h2>
              <button
                onClick={() => fetchJoke(filters)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                <span>New Joke</span>
              </button>
            </div>

            {error ? (
              <div className="text-red-500 dark:text-red-400">{error}</div>
            ) : joke ? (
              <JokeCard
                joke={joke}
                onFavorite={toggleFavorite}
                isFavorite={favorites.some(f => f.id === joke.id)}
              />
            ) : null}

            {favorites.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Favorite Jokes
                </h2>
                <div className="space-y-4">
                  {favorites.map(favorite => (
                    <JokeCard
                      key={favorite.id}
                      joke={favorite}
                      onFavorite={toggleFavorite}
                      isFavorite={true}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="w-full bg-white dark:bg-gray-800 shadow-lg mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            Joke Generator | Copyright © 2025 Aashutosh Kumar Sah. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;