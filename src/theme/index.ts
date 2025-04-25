import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import ThemeProvider from './ThemeProvider';

export const theme = {
  colors,
  spacing,
  typography,
};

// Export individual theme elements for direct imports
export { colors, spacing, typography, ThemeProvider };
