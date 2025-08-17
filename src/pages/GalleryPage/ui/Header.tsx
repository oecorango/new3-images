import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';
import { usePhotos } from 'pages/GalleryPage/model/usePhotos.ts';
import styles from './Header.module.scss';

function Header() {
  const { inputValue, onInputChange, submitSearch } = usePhotos();

  return (
    <div id="header" className={styles['header']}>
      <div className={styles['header__block']}>
        <Input
          className={styles['header__input']}
          colorPalette="cyan"
          placeholder="Enter your search"
          size="xs"
          type="text"
          value={inputValue}
          onChange={onInputChange}
        />
        <Button colorPalette="cyan" size="xs" onClick={submitSearch}>
          Search
        </Button>
      </div>
      <div className={styles['header__block']}>
        <Link className={styles['link']} to="/">
          See Image
        </Link>
        <Link className={styles['link']} to="/create">
          Create new Image
        </Link>
      </div>
    </div>
  );
}

export default memo(Header);
