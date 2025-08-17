import { memo, useCallback, useState } from 'react';
import { usePhotos } from 'pages/GalleryPage/model/usePhotos.ts';
import Footer from './Footer.tsx';
import ModalImage from './ModalImage.tsx';
import styles from './Content.module.scss';

function Content() {
  const { photos } = usePhotos();

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
    <>
      <div className={styles['content']}>
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
      <Footer />
    </>
  );
}

export default memo(Content);
