import React from 'react';
import { AppNavigator, RootStackParamList } from '../AppNavigator';

/**
 * This is a simple type checking test to ensure our navigation types
 * are defined correctly and the navigator compiles without errors.
 */

// Type check for navigation helper function
function validateNavigationTypes(): void {
  // Sample navigation object that would be used in a component
  type NavigationProp = {
    navigate: <T extends keyof RootStackParamList>(
      screen: T,
      params?: RootStackParamList[T]
    ) => void;
  };

  // Mock navigate function
  const mockNavigate = (
    screen: keyof RootStackParamList,
    params?: RootStackParamList[typeof screen]
  ) => {
    console.log(`Navigating to ${screen} with params:`, params);
  };

  // Mock navigation object
  const navigation: NavigationProp = {
    navigate: mockNavigate,
  };

  // Test that we can navigate to our Review screen
  navigation.navigate('Review');

  // This line would cause a TypeScript error since 'InvalidScreen' is not in RootStackParamList
  // navigation.navigate('InvalidScreen');

  // Create a component instance (won't be rendered, just checking that it compiles)
  const navigator = <AppNavigator />;
  console.log('AppNavigator loaded successfully', navigator !== null);
}

// Export the validation function so it's not tree-shaken
export { validateNavigationTypes };

// We don't actually run the test, just ensure it compiles
console.log('Navigation types are valid');
