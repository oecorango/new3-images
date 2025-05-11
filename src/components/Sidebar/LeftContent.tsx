import { memo } from 'react';
import { usePhotos } from 'core/PhotosContext/PhotosContext.tsx';
import styles from './LeftContent.module.scss';

function LeftContent() {
  const { currentPage, loadNextPage } = usePhotos();

  return (
    <>
      <button className={styles['content__button']} onClick={() => loadNextPage('next')}>
        Next page
      </button>
      <button
        className={styles['content__button']}
        disabled={currentPage === 1}
        onClick={() => loadNextPage('prev')}
      >
        Prev Page
      </button>
    </>
  );
}

export default memo(LeftContent);
