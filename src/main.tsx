import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from 'shared/ui/chackraProvider.tsx';
import { PhotosProvider } from 'core/PhotosContext/PhotosContext.tsx';
import App from './App.tsx';
import 'normalize.css';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ChakraProvider value={defaultSystem}>
        <PhotosProvider>
          <App />
        </PhotosProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>,
);
