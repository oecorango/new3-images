import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PhotosProvider } from 'core/PhotosContext/PhotosContext.tsx';
import App from './App.tsx';
import 'normalize.css';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PhotosProvider>
      <App />
    </PhotosProvider>
  </StrictMode>,
);
