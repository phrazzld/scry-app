import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
// Import the ThemeProvider default export separately to avoid circular dependency
import ThemeProviderComponent from './ThemeProvider';

export const theme = {
  colors,
  spacing,
  typography,
};

// Re-export the theme provider
export const ThemeProvider = ThemeProviderComponent;

// Export individual theme elements for direct imports
export { colors, spacing, typography };
