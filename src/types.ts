export interface Joke {
  id: number;
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
  category: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  lang: string;
}

export interface JokeFilters {
  category: string;
  type: 'Any' | 'single' | 'twopart';
  lang: string;
  blacklistFlags: string[];
  safeMode: boolean;
}