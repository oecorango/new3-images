import { memo } from 'react';
import { Button } from '@chakra-ui/react';
import { usePhotos } from 'pages/GalleryPage/model/usePhotos.ts';
import styles from './Footer.module.scss';
import Pagination from './Pagination.tsx';

function Footer() {
  const { allPages, currentPage, loadNextPage } = usePhotos();

  return (
    <div id="footer" className={styles['footer']}>
      <div className={styles['footer__block']}>
        <Button
          className={styles['content__button']}
          colorPalette="cyan"
          disabled={currentPage === 1}
          onClick={() => loadNextPage('prev')}
        >
          Prev Page
        </Button>
        <div className={styles['footer__current']}>{currentPage}</div>
        <Button
          className={styles['content__button']}
          colorPalette="cyan"
          disabled={currentPage === allPages}
          onClick={() => loadNextPage('next')}
        >
          Next page
        </Button>
      </div>
      <div className={styles['footer__block']}>
        <Pagination />
      </div>
      <a
        className={styles['footer__link']}
        href="https://www.pexels.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Photos provided by Pexels
      </a>
    </div>
  );
}

export default memo(Footer);
