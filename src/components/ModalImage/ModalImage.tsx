import { memo, useEffect, useState } from 'react';
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { getPhoto } from 'shared/rest/getImages.ts';
import type { Photo } from 'pexels';
import styles from './ModalImage.module.scss';

type Props = {
  imageId: number | null;
  isOpen: boolean;
  onClose: () => void;
};

function ModalImage({ isOpen, imageId, onClose }: Props) {
  const [photo, setPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    if (!imageId || !isOpen) return;

    getPhoto(imageId).then(data => setPhoto(data));

    return () => {
      setPhoto(null);
    };
  }, [imageId, isOpen]);

  return (
    <Dialog.Root
      open={isOpen}
      placement="center"
      modal={true}
      closeOnEscape={true}
      closeOnInteractOutside={true}
      onOpenChange={onClose}
    >
      {photo && (
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{photo.photographer}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <img alt={photo.photographer} className={styles['image']} src={photo.src.large} />
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      )}
    </Dialog.Root>
  );
}

export default memo(ModalImage);
