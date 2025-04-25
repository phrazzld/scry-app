import React from 'react';
import { ThemeProvider as SCProvider } from 'styled-components/native';
import { theme } from './index';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SCProvider theme={theme}>{children}</SCProvider>
);

export default ThemeProvider;
