import { useCallback } from 'react';
import Header from '../pages/GalleryPage/ui/Header.tsx';
import Content from '../pages/GalleryPage/ui/Content.tsx';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';

function App() {
  const renderImages = useCallback(
    () => (
      <div className={styles['content__main']}>
        <Content />
      </div>
    ),
    [],
  );

  const renderCreate = useCallback(
    () => <div style={{ position: 'absolute', top: '60px' }}>123454321</div>,
    [],
  );

  return (
    <div className={styles['content']}>
      <Header />
      <Routes>
        <Route path="/" element={renderImages()} />
        <Route path="create" element={renderCreate()} />
      </Routes>
    </div>
  );
}

export default App;
