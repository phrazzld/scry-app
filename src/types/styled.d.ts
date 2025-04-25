// Import the theme type from the theme module
import { theme } from '../theme';

// Create a type from the theme object
type ThemeType = typeof theme;

// Augment the DefaultTheme interface in styled-components
declare module 'styled-components' {
  // Need to use interface merging here for the theme
  export interface DefaultTheme {
    colors: ThemeType['colors'];
    spacing: ThemeType['spacing'];
    typography: ThemeType['typography'];
  }
}

// Do the same for styled-components/native
declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: ThemeType['colors'];
    spacing: ThemeType['spacing'];
    typography: ThemeType['typography'];
  }
}
