import { type ChangeEvent, type ReactNode, useCallback, useEffect, useState } from 'react';
import type { Photo } from 'pexels';
import { getPhotos, getSearchPhotos } from 'pages/GalleryPage/api/getImages.ts';
import { PhotosContext } from './PhotosContext.ts';

export const PhotosProvider = ({ children }: { children: ReactNode }) => {
  const savePage = localStorage.getItem('imagePage');
  const searchValue = localStorage.getItem('searchValue');

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(Number(savePage ?? 1));

  const [inputValue, setInputValue] = useState<string>(searchValue ?? '');
  const [currentSearch, setCurrentSearch] = useState<string>(searchValue ?? '');

  const [allPages, setAllPages] = useState<number>(0);

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const submitSearch = useCallback(async () => {
    setCurrentSearch(inputValue);
    localStorage.setItem('searchValue', inputValue);
    setCurrentPage(1);

    const response = inputValue
      ? await getSearchPhotos({ search: inputValue, page: 1 })
      : await getPhotos({ page: 1 });

    if ('photos' in response) {
      localStorage.setItem('imagePage', '1');
      setPhotos(response.photos);
      setAllPages(Math.ceil(response.total_results / 20));
    }
  }, [inputValue]);

  const loadSearchPage = useCallback(async () => {
    const response = currentSearch
      ? await getSearchPhotos({
          search: currentSearch,
          page: 1,
        })
      : await getPhotos({ page: 1 });

    if ('photos' in response) {
      localStorage.setItem('searchValue', currentSearch);
      localStorage.setItem('imagePage', '1');
      setCurrentPage(1);

      setPhotos(response.photos);
    }
  }, [currentSearch]);

  const loadCustomPage = useCallback(
    async (page: number) => {
      const response = currentSearch
        ? await getSearchPhotos({
            search: currentSearch,
            page,
          })
        : await getPhotos({ page });

      setAllPages(Math.ceil(response.total_results / 20));

      if ('photos' in response) {
        localStorage.setItem('imagePage', page.toString());
        setCurrentPage(response.page);
        setCurrentSearch(currentSearch ?? '');

        setPhotos(response.photos);
      }
    },
    [currentSearch],
  );

  const loadNextPage = useCallback(
    async (key: 'prev' | 'next') => {
      const nextPage = key === 'next' ? currentPage + 1 : currentPage - 1;

      if (nextPage === 0) {
        return;
      }

      const response = currentSearch
        ? await getSearchPhotos({
            search: currentSearch,
            page: nextPage,
          })
        : await getPhotos({ page: nextPage });

      setAllPages(Math.ceil(response.total_results / 20));

      if ('photos' in response) {
        localStorage.setItem('imagePage', nextPage.toString());
        setCurrentPage(response.page);
        setCurrentSearch(currentSearch ?? '');

        setPhotos(response.photos);
      }
    },
    [currentPage, currentSearch],
  );

  const getFirstPage = useCallback(async () => {
    const response = currentSearch
      ? await getSearchPhotos({
          search: currentSearch,
          page: currentPage,
        })
      : await getPhotos({ page: currentPage });

    setAllPages(Math.ceil(response.total_results / 20));

    if ('photos' in response) {
      setPhotos([...response.photos]);
    }
  }, [currentPage, currentSearch]);

  useEffect(() => {
    getFirstPage();
  }, [getFirstPage]);

  return (
    <PhotosContext.Provider
      value={{
        allPages,
        currentPage,
        inputValue,
        loadCustomPage,
        loadNextPage,
        loadSearchPage,
        photos,
        onInputChange,
        submitSearch,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
};
