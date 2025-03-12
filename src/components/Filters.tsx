import React from 'react';
import { JokeFilters } from '../types';

interface Props {
  filters: JokeFilters;
  onFiltersChange: (filters: JokeFilters) => void;
}

export function Filters({ filters, onFiltersChange }: Props) {
  const categories = ['Any', 'Programming', 'Dark', 'Pun', 'Spooky', 'Christmas'];
  const languages = ['en', 'de', 'es', 'fr'];
  const flags = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];

  const handleFlagToggle = (flag: string) => {
    const newFlags = filters.blacklistFlags.includes(flag)
      ? filters.blacklistFlags.filter(f => f !== flag)
      : [...filters.blacklistFlags, flag];
    
    onFiltersChange({ ...filters, blacklistFlags: newFlags });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => onFiltersChange({ ...filters, type: e.target.value as any })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="Any">Any</option>
          <option value="single">Single</option>
          <option value="twopart">Two Part</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Language
        </label>
        <select
          value={filters.lang}
          onChange={(e) => onFiltersChange({ ...filters, lang: e.target.value })}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.safeMode}
            onChange={(e) => onFiltersChange({ ...filters, safeMode: e.target.checked })}
            className="rounded text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Safe Mode</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Blacklist Flags
        </label>
        <div className="grid grid-cols-2 gap-2">
          {flags.map(flag => (
            <label key={flag} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.blacklistFlags.includes(flag)}
                onChange={() => handleFlagToggle(flag)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{flag}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}