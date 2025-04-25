import React from 'react';
import { ThemeProvider as SCProvider } from 'styled-components/native';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

// Define theme without importing from index.ts to break the circular dependency
const theme = {
  colors,
  spacing,
  typography,
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SCProvider theme={theme}>{children}</SCProvider>
);

export default ThemeProvider;
