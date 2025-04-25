import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../theme';
import FloatingMemoButton from '../FloatingMemoButton';

// Mock the MotiView component to avoid animation issues in tests
jest.mock('moti', () => {
  const { View } = require('react-native');
  return {
    MotiView: View,
  };
});

// Mock the Icon component
jest.mock('../../../components/core/Icon', () => {
  const { View, Text } = require('react-native');
  return {
    __esModule: true,
    default: ({ name }: { name: string }) => (
      <View>
        <Text testID="icon-mock">{name}</Text>
      </View>
    ),
  };
});

describe('FloatingMemoButton', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <FloatingMemoButton onPress={() => {}} />
      </ThemeProvider>
    );

    // Should render the icon with the "add" name
    expect(getByTestId('icon-mock')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <ThemeProvider>
        <FloatingMemoButton onPress={mockOnPress} />
      </ThemeProvider>
    );

    // Find the button by role and press it
    const button = getByRole('button');
    fireEvent.press(button);
    
    // Check if our mock function was called
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('has correct animation props', () => {
    const { UNSAFE_getByType } = render(
      <ThemeProvider>
        <FloatingMemoButton onPress={() => {}} />
      </ThemeProvider>
    );

    // Check the MotiView animation props directly in the component
    const motiView = UNSAFE_getByType('View'); // MotiView is mocked as View
    expect(motiView.props.from).toEqual({ opacity: 0, translateY: 20 });
    expect(motiView.props.animate).toEqual({ opacity: 1, translateY: 0 });
    expect(motiView.props.transition.type).toBe('timing');
    expect(motiView.props.transition.duration).toBe(400);
  });
});