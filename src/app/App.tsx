import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from 'pages/GalleryPage/ui/Header.tsx';
import Content from 'pages/GalleryPage/ui/Content.tsx';
import styles from './App.module.scss';

function App() {
  const renderGallery = useCallback(
    () => (
      <div className={styles['content__main']}>
        <Content />
      </div>
    ),
    [],
  );

  const renderEditor = useCallback(
    () => <div style={{ position: 'absolute', top: '60px' }}>123454321</div>,
    [],
  );

  return (
    <div className={styles['content']}>
      <Header />
      <Routes>
        <Route path="/" element={renderGallery()} />
        <Route path="create" element={renderEditor()} />
      </Routes>
    </div>
  );
}

export default App;
