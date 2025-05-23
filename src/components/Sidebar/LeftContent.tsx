import { memo } from 'react';
import { usePhotos } from 'core/PhotosContext/PhotosContext.tsx';
import styles from './LeftContent.module.scss';
import { Button } from '@chakra-ui/react';

function LeftContent() {
  const { currentPage, loadNextPage } = usePhotos();

  return (
    <>
      <Button
        className={styles['content__button']}
        colorPalette="cyan"
        onClick={() => loadNextPage('next')}
      >
        Next page
      </Button>
      <Button
        className={styles['content__button']}
        colorPalette="cyan"
        disabled={currentPage === 1}
        onClick={() => loadNextPage('prev')}
      >
        Prev Page
      </Button>
      <a
        className={styles['content__link']}
        href="https://www.pexels.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Photos provided by Pexels
      </a>
    </>
  );
}

export default memo(LeftContent);
