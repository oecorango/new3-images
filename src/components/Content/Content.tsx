import { memo } from 'react';
import { usePhotos } from 'core/PhotosContext/PhotosContext';
import styles from './Content.module.scss';

function Content() {
  const { photos, currentPage } = usePhotos();

  return (
    <div className={styles['content']}>
      <h1>Hello</h1>
      <h2>Description</h2>
      <p>Current page: {currentPage}</p>
      <div className={styles['gallery']}>
        {photos.map(photo => (
          <img
            key={photo.id}
            src={photo.src.medium}
            alt={photo.photographer}
            style={{ width: '200px', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(Content);
