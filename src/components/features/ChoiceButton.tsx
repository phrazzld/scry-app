import React, { useState } from 'react';
import { TouchableOpacity, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { MotiView } from 'moti';
import { useTheme } from 'styled-components/native';

// Define the possible button states
export type ButtonState = 'default' | 'selected' | 'correct' | 'incorrect';

// Use regular styled View instead of styled MotiView to fix hook errors
const StyledButtonContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  border-radius: 8px;
  overflow: hidden;
`;

// Inner content container
const ButtonContent = styled.View<{ disabled?: boolean }>`
  padding: ${({ theme }) => theme.spacing(2)}px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

// Styled text label with conditional styling based on state
const Label = styled.Text<{ state: ButtonState }>`
  color: ${({ theme, state }) =>
    state === 'default' ? theme.colors.inkBlack : theme.colors.inkBlack};
  font-size: ${({ theme }) => theme.typography.body}px;
`;

// Component props interface
interface ChoiceButtonProps {
  text: string;
  onPress: () => void;
  state: ButtonState;
  disabled?: boolean;
  index?: number; // Optional index for staggered animations
}

/**
 * ChoiceButton component for rendering multiple choice options
 * Supports different visual states: default, selected, correct, incorrect
 * With animated transitions between states
 */
export default function ChoiceButton({
  text,
  onPress,
  state = 'default',
  disabled = false,
  index = 0,
}: ChoiceButtonProps) {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  
  // Get border color based on state
  const getBorderColor = () => {
    switch (state) {
      case 'default':
        return theme.colors.silverGray;
      case 'selected':
        return theme.colors.cobaltBlue;
      case 'correct':
        return theme.colors.signalGreen;
      case 'incorrect':
        return theme.colors.warmAmber;
      default:
        return theme.colors.silverGray;
    }
  };
  
  // Get background color based on state
  const getBackgroundColor = () => {
    switch (state) {
      case 'default':
        return 'transparent';
      case 'selected':
        return `${theme.colors.cobaltBlue}10`;
      case 'correct':
        return `${theme.colors.signalGreen}10`;
      case 'incorrect':
        return `${theme.colors.warmAmber}10`;
      default:
        return 'transparent';
    }
  };

  return (
    <StyledButtonContainer>
      <MotiView
        from={{
          opacity: 0,
          translateY: 10,
          scale: 0.96,
          borderColor: theme.colors.silverGray,
          backgroundColor: 'transparent',
        }}
        animate={{
          opacity: 1,
          translateY: 0,
          scale: isPressed ? 0.98 : 1,
          borderColor: getBorderColor(),
          backgroundColor: getBackgroundColor(),
        }}
        transition={{
          type: state === 'default' ? 'timing' : 'spring',
          delay: index * 100, // Stagger effect based on index
          duration: 250,
          // Add bounce effect for feedback states
          damping: state === 'correct' || state === 'incorrect' ? 15 : 20,
          mass: state === 'correct' ? 1.2 : 1,
          stiffness: state === 'correct' ? 120 : 100,
        }}
        style={{
          borderWidth: 1,
          width: '100%',
        }}
      >
        <Pressable
          onPress={disabled ? undefined : onPress}
          onPressIn={() => !disabled && setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          disabled={disabled}
          style={{ width: '100%' }}
        >
          <ButtonContent disabled={disabled}>
            <Label state={state}>{text}</Label>
          </ButtonContent>
        </Pressable>
      </MotiView>
    </StyledButtonContainer>
  );
}
