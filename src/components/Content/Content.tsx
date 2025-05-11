import { memo, useCallback, useState } from 'react';
import { usePhotos } from 'core/PhotosContext/PhotosContext';
import styles from './Content.module.scss';
import ModalImage from '../ModalImage/ModalImage.tsx';

function Content() {
  const { photos, currentPage } = usePhotos();

  const [isOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState<number | null>(null);

  const handleImageOpen = useCallback(
    (id: number) => () => {
      setImageId(id);
      setIsOpen(true);
    },
    [],
  );

  const handleImageClose = useCallback(() => {
    setImageId(null);
    setIsOpen(false);
  }, []);

  return (
    <div className={styles['content']}>
      <h2>Find images</h2>
      <p>Page: {currentPage}</p>
      <div className={styles['content__gallery']}>
        {photos.map(photo => (
          <img
            key={photo.id}
            alt={photo.photographer}
            className={styles['content__photo']}
            src={photo.src.medium}
            onClick={handleImageOpen(photo.id)}
          />
        ))}
      </div>
      <ModalImage imageId={imageId} isOpen={isOpen} onClose={handleImageClose} />
    </div>
  );
}

export default memo(Content);
