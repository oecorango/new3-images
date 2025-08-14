import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { PhotosProvider } from 'pages/GalleryPage/model/PhotosProvider.tsx';
import { ChakraProvider as Chakra } from 'shared/ui/chakraProvider.tsx';
import App from './App.tsx';
import 'normalize.css';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Chakra>
        <ChakraProvider value={defaultSystem}>
          <PhotosProvider>
            <App />
          </PhotosProvider>
        </ChakraProvider>
      </Chakra>
    </BrowserRouter>
  </StrictMode>,
);
