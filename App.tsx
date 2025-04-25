import 'react-native-gesture-handler'; // Must be first import
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme';
import { MotiProvider } from 'moti';
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
        <MotiProvider>
          <StatusBar style="dark" />
          <AppNavigator />
        </MotiProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
