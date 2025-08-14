import { createContext, type ChangeEvent } from 'react';
import type { Photo } from 'pexels';

type PhotosContextType = {
  allPages: number;
  photos: Photo[];
  currentPage: number;
  inputValue: string;
  loadCustomPage: (page: number) => void;
  loadNextPage: (key: 'prev' | 'next') => void;
  loadSearchPage: () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  submitSearch: () => void;
};

export const PhotosContext = createContext<PhotosContextType | null>(null);
