import * as React from 'react';
import { ThemeProvider } from './themeProvider.tsx';

interface Props {
  children: React.ReactNode;
}

export function Provider({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
