import React from 'react';
import { Copy, Share2, Heart, Volume as VolumeUp } from 'lucide-react';
import { Joke } from '../types';
import toast from 'react-hot-toast';

interface Props {
  joke: Joke;
  onFavorite: (joke: Joke) => void;
  isFavorite: boolean;
}

export function JokeCard({ joke, onFavorite, isFavorite }: Props) {
  const jokeText = joke.type === 'single' 
    ? joke.joke 
    : `${joke.setup}\n${joke.delivery}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jokeText || '');
    toast.success('Joke copied to clipboard!');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(jokeText || '');
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const speakJoke = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(jokeText);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full">
      <div className="space-y-4">
        {joke.type === 'single' ? (
          <p className="text-lg dark:text-white">{joke.joke}</p>
        ) : (
          <>
            <p className="text-lg font-medium dark:text-white">{joke.setup}</p>
            <p className="text-lg italic dark:text-gray-300">{joke.delivery}</p>
          </>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
          <div className="flex space-x-4">
            <button
              onClick={copyToClipboard}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <Copy size={20} />
            </button>
            <button
              onClick={shareOnTwitter}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <Share2 size={20} />
            </button>
            <button
              onClick={speakJoke}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <VolumeUp size={20} />
            </button>
          </div>
          
          <button
            onClick={() => onFavorite(joke)}
            className={`${
              isFavorite ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
            } hover:text-red-500`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}