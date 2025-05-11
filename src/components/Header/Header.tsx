import { memo } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { usePhotos } from 'core/PhotosContext/PhotosContext.tsx';
import styles from './Header.module.scss';

function Header() {
  const { currentSearch, onSearchChange, loadSearchPage } = usePhotos();

  return (
    <div className={styles['header']}>
      <Input
        className={styles['header__input']}
        colorPalette="cyan"
        placeholder="Enter your search"
        size="xs"
        type="text"
        value={currentSearch}
        onChange={onSearchChange}
      />
      <Button colorPalette="cyan" size="xs" onClick={loadSearchPage}>
        Search
      </Button>
    </div>
  );
}

export default memo(Header);
