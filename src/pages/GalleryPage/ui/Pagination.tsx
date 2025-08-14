import { memo, useMemo } from 'react';
import classNames from 'classnames';
import { Button } from '@chakra-ui/react';
import { usePhotos } from 'pages/GalleryPage/model/usePhotos.ts';
import styles from './Pagination.module.scss';

const FIRST_PAGE = 1;
const VISIBLE_NEAR_CURRENT = 2;
const EDGE_COUNT = 2;

function Pagination() {
  const { allPages, currentPage, loadCustomPage } = usePhotos();

  const buttons = useMemo(() => {
    const pages: number[] = [];

    for (let i = FIRST_PAGE; i <= allPages; i++) {
      const isEdge = i <= EDGE_COUNT || i > allPages - EDGE_COUNT;
      const isNearCurrent = Math.abs(i - currentPage) <= VISIBLE_NEAR_CURRENT;

      if (isEdge || isNearCurrent) {
        pages.push(i);
      }
    }

    return pages;
  }, [allPages, currentPage]);

  return (
    <div className={styles['pagination']}>
      {buttons.map(item => (
        <Button
          key={item}
          className={classNames(styles['pagination__button'], {
            [styles['pagination__button_selected']]: currentPage === item,
          })}
          colorPalette="cyan"
          onClick={() => loadCustomPage(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

export default memo(Pagination);
