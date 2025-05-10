import { memo } from 'react';
import { usePhotos } from 'core/PhotosContext/PhotosContext.tsx';
import styles from './Header.module.scss';

function Header() {
  const { currentSearch, onSearchChange, loadSearchPage } = usePhotos();

  return (
    <div className={styles['header']}>
      <input
        className={styles['header__input']}
        type="text"
        value={currentSearch}
        onChange={onSearchChange}
      />
      <button onClick={loadSearchPage}>Search</button>
    </div>
  );
}

export default memo(Header);
