import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
  type ChangeEvent,
} from 'react';
import { getPhotos, getSearchPhotos } from 'shared/rest/getImages';
import type { Photo } from 'pexels';

type PhotosContextType = {
  photos: Photo[];
  currentPage: number;
  currentSearch: string;
  loadNextPage: (key: 'prev' | 'next') => void;
  loadSearchPage: () => void;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const PhotosContext = createContext<PhotosContextType | null>(null);

export const PhotosProvider = ({ children }: { children: ReactNode }) => {
  const savePage = localStorage.getItem('imagePage');
  const searchValue = localStorage.getItem('searchValue');

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(Number(savePage ?? 1));
  const [currentSearch, setCurrentSearch] = useState<string>(searchValue ?? '');

  const onSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value);
  }, []);

  const loadSearchPage = useCallback(async () => {
    const response = await getSearchPhotos({ search: currentSearch, page: 1 });

    if ('photos' in response) {
      localStorage.setItem('searchValue', currentSearch);
      localStorage.setItem('imagePage', '1');
      setCurrentPage(1);

      setPhotos(response.photos);
    }
  }, [currentSearch]);

  const loadNextPage = useCallback(
    async (key: 'prev' | 'next') => {
      const nextPage = key === 'next' ? currentPage + 1 : currentPage - 1;

      if (nextPage === 0) {
        return;
      }

      console.log(searchValue);

      const response = searchValue
        ? await getSearchPhotos({
            search: currentSearch,
            page: nextPage,
          })
        : await getPhotos({ page: nextPage });

      if ('photos' in response) {
        localStorage.setItem('imagePage', nextPage.toString());
        setCurrentPage(response.page);
        setCurrentSearch(searchValue ?? '');

        setPhotos(response.photos);
      }
    },
    [currentPage, currentSearch, searchValue],
  );

  const getFirstPage = useCallback(async () => {
    const response = currentSearch
      ? await getSearchPhotos({
          search: currentSearch,
          page: currentPage,
        })
      : await getPhotos({ page: currentPage });

    if ('photos' in response) {
      setPhotos([...response.photos]);
    }
  }, [currentPage, currentSearch]);

  useEffect(() => {
    getFirstPage();
  }, []);

  return (
    <PhotosContext.Provider
      value={{ photos, currentPage, currentSearch, loadNextPage, loadSearchPage, onSearchChange }}
    >
      {children}
    </PhotosContext.Provider>
  );
};

export const usePhotos = () => {
  const ctx = useContext(PhotosContext);

  if (!ctx) throw new Error('usePhotos must be used inside <PhotosProvider>');

  return ctx;
};
