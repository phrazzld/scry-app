import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../../theme';
import ChoiceButton, { ButtonState } from '../ChoiceButton';

// Mock MotiView as a simple View to avoid animation-related test issues
jest.mock('moti', () => {
  const { View } = require('react-native');
  return {
    MotiView: View,
  };
});

// Mock the styled-components/native useTheme hook
jest.mock('styled-components/native', () => {
  const actual = jest.requireActual('styled-components/native');
  return {
    ...actual,
    useTheme: () => ({
      colors: {
        inkBlack: '#121212',
        chalkWhite: '#FAFAFA',
        cobaltBlue: '#0047AB',
        slateGray: '#757575',
        silverGray: '#E0E0E0',
        signalGreen: '#00A676',
        warmAmber: '#F2A900'
      },
      spacing: (val: number) => val * 8,
      typography: {
        heading: 20,
        body: 16,
        small: 14
      }
    })
  };
});

describe('ChoiceButton', () => {
  it('renders with default state correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <ChoiceButton 
          text="Test Option" 
          onPress={onPressMock} 
          state="default" 
        />
      </ThemeProvider>
    );
    
    expect(getByText('Test Option')).toBeTruthy();
  });
  
  it('handles press events', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <ChoiceButton 
          text="Test Option" 
          onPress={onPressMock} 
          state="default" 
        />
      </ThemeProvider>
    );
    
    fireEvent.press(getByText('Test Option'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
  
  it('does not trigger onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <ChoiceButton 
          text="Test Option" 
          onPress={onPressMock} 
          state="default" 
          disabled={true}
        />
      </ThemeProvider>
    );
    
    fireEvent.press(getByText('Test Option'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
  
  it('renders different states', () => {
    const states: ButtonState[] = ['default', 'selected', 'correct', 'incorrect'];
    const onPressMock = jest.fn();
    
    states.forEach(state => {
      const { getByText } = render(
        <ThemeProvider>
          <ChoiceButton 
            text={`Option ${state}`} 
            onPress={onPressMock} 
            state={state} 
          />
        </ThemeProvider>
      );
      
      expect(getByText(`Option ${state}`)).toBeTruthy();
    });
  });
  
  it('passes index prop for staggered animations', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <ChoiceButton 
          text="Test Option" 
          onPress={onPressMock} 
          state="default" 
          index={2}
        />
      </ThemeProvider>
    );
    
    expect(getByText('Test Option')).toBeTruthy();
  });
});
