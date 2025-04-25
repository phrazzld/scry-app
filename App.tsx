import 'react-native-gesture-handler'; // Must be first import
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';
import { useReviewStore } from './src/store/reviewStore';

/**
 * Main App component that sets up providers and initializes the app
 */
export default function App() {
  // Initialize the deck on app launch
  useEffect(() => {
    useReviewStore.getState().initializeDeck();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
