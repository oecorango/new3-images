import type { ReactNode } from 'react';
import { ThemeProvider } from './themeProvider.tsx';

interface Props {
  children: ReactNode;
}

export function ChakraProvider({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
