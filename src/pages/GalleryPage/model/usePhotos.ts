import { useContext } from 'react';
import { PhotosContext } from './PhotosContext.ts';

export const usePhotos = () => {
  const ctx = useContext(PhotosContext);

  if (!ctx) throw new Error('usePhotos must be used inside <PhotosProvider>');

  return ctx;
};
