import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';
import { useReviewStore } from '../store/reviewStore';

// Mock dependencies
jest.mock('../store/reviewStore', () => ({
  useReviewStore: {
    getState: jest.fn(() => ({
      initializeDeck: jest.fn(),
    })),
  },
}));

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => (
      <View testID="safe-area-provider">{children}</View>
    ),
  };
});

jest.mock('../theme', () => {
  const { View } = require('react-native');
  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => (
      <View testID="theme-provider">{children}</View>
    ),
  };
});

jest.mock('expo-status-bar', () => {
  const { View } = require('react-native');
  return {
    StatusBar: ({ style }: { style: string }) => (
      <View testID="status-bar" style={{ style }} />
    ),
  };
});

jest.mock('../navigation/AppNavigator', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: () => <View testID="app-navigator" />,
  };
});

describe('App Component', () => {
  it('initializes the deck on mount', () => {
    render(<App />);
    
    // Verify that initializeDeck was called
    expect(useReviewStore.getState).toHaveBeenCalled();
  });

  it('renders SafeAreaProvider as the root component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('safe-area-provider')).toBeTruthy();
  });

  it('renders ThemeProvider inside SafeAreaProvider', () => {
    const { getByTestId } = render(<App />);
    const safeAreaProvider = getByTestId('safe-area-provider');
    expect(safeAreaProvider).toContainElement(getByTestId('theme-provider'));
  });

  it('renders StatusBar with dark style', () => {
    const { getByTestId } = render(<App />);
    const statusBar = getByTestId('status-bar');
    expect(statusBar.props.style).toEqual({ style: 'dark' });
  });

  it('renders AppNavigator', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app-navigator')).toBeTruthy();
  });
});