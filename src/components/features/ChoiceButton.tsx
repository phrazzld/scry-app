import React from 'react';
import styled from 'styled-components/native';

// Define the possible button states
export type ButtonState = 'default' | 'selected' | 'correct' | 'incorrect';

// Styled button component with conditional styling based on state
const Btn = styled.TouchableOpacity<{ state: ButtonState }>`
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  border: 1px solid
    ${({ theme, state }) =>
      state === 'default'
        ? theme.colors.silverGray
        : state === 'selected'
          ? theme.colors.cobaltBlue
          : state === 'correct'
            ? theme.colors.signalGreen
            : theme.colors.warmAmber};
  border-radius: 8px;
  background: ${({ theme, state }) =>
    state === 'selected'
      ? `${theme.colors.cobaltBlue}10`
      : state === 'correct'
        ? `${theme.colors.signalGreen}10`
        : state === 'incorrect'
          ? `${theme.colors.warmAmber}10`
          : 'transparent'};
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
}

/**
 * ChoiceButton component for rendering multiple choice options
 * Supports different visual states: default, selected, correct, incorrect
 */
export default function ChoiceButton({
  text,
  onPress,
  state = 'default',
  disabled = false,
}: ChoiceButtonProps) {
  return (
    <Btn onPress={onPress} state={state} disabled={disabled}>
      <Label state={state}>{text}</Label>
    </Btn>
  );
}
