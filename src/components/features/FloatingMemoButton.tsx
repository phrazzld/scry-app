import React from 'react';
import styled from 'styled-components/native';
import { MotiView } from 'moti';
import Icon from '../core/Icon';

// Styled container for the button
const Container = styled(MotiView)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing(4)}px;
  right: ${({ theme }) => theme.spacing(4)}px;
`;

// Styled touchable button with shadow effects
const TouchableButton = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.cobaltBlue};
  padding: ${({ theme }) => theme.spacing(2)}px;
  border-radius: 9999px; /* Make it circular */
  elevation: 4;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
  shadow-color: #000;
`;

// Props interface
interface FloatingMemoButtonProps {
  onPress: () => void;
}

/**
 * FloatingMemoButton component
 * A floating action button positioned at the bottom-right of the screen
 * that animates in on mount
 */
export default function FloatingMemoButton({ onPress }: FloatingMemoButtonProps) {
  return (
    <Container
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400 }}
    >
      <TouchableButton onPress={onPress} accessibilityRole="button" accessibilityLabel="Add memo">
        <Icon name="add" set="ionicons" size={24} color="#ffffff" />
      </TouchableButton>
    </Container>
  );
}
