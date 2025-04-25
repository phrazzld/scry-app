import React, { useState, useEffect } from 'react';
import { Modal, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { useReviewStore } from '../../store/reviewStore';

// Styled components for the modal
const ModalContainer = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const ModalContent = styled.View`
  background: ${({ theme }) => theme.colors.chalkWhite};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing(3)}px;
  width: 90%;
  max-width: 400px;
  shadow-opacity: 0.15;
  shadow-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  elevation: 5;
`;

const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.size.lg}px;
  color: ${({ theme }) => theme.colors.inkBlack};
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  font-weight: ${({ theme }) => theme.typography.weight.medium};
`;

const TextInput = styled.TextInput`
  border: 1px solid ${({ theme }) => theme.colors.silverGray};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  min-height: 100px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  color: ${({ theme }) => theme.colors.inkBlack};
  font-size: ${({ theme }) => theme.typography.size.base}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`;

// Type-safe button component with primary variant support
interface ButtonProps {
  primary?: boolean;
}

const Button = styled.TouchableOpacity<ButtonProps>`
  padding: ${({ theme }) => theme.spacing(1.5)}px ${({ theme }) => theme.spacing(3)}px;
  background: ${({ theme, primary }) => (primary ? theme.colors.cobaltBlue : 'transparent')};
  border-radius: 6px;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`;

// Type-safe text component with primary variant support
const ButtonText = styled.Text<ButtonProps>`
  color: ${({ theme, primary }) => (primary ? theme.colors.chalkWhite : theme.colors.inkBlack)};
  font-size: ${({ theme }) => theme.typography.size.base}px;
  font-weight: ${({ primary, theme }) =>
    primary ? theme.typography.weight.medium : theme.typography.weight.regular};
`;

// Component props interface
interface MemoInputModalProps {
  isVisible: boolean;
  onClose: () => void;
}

/**
 * MemoInputModal component
 * A modal dialog for entering and submitting text memos
 */
export default function MemoInputModal({ isVisible, onClose }: MemoInputModalProps) {
  // Local state for the text input
  const [text, setText] = useState('');

  // Get the store action for submitting memos
  const { submitMemo } = useReviewStore();

  // Reset text when modal is opened/closed
  useEffect(() => {
    if (!isVisible) {
      setText('');
    }
  }, [isVisible]);

  // Handle submission with validation
  const handleSubmit = () => {
    if (text.trim()) {
      submitMemo(text);
      setText('');
      Keyboard.dismiss();
      onClose();
    }
  };

  // Handle modal dismissal
  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={handleClose}>
      <ModalContainer>
        <ModalContent>
          <ModalTitle>Add Memo</ModalTitle>
          <TextInput
            placeholder="Type your memo here..."
            multiline
            value={text}
            onChangeText={setText}
            autoFocus
            returnKeyType="done"
            blurOnSubmit
            textAlignVertical="top"
          />
          <ButtonRow>
            <Button onPress={handleClose} accessibilityRole="button">
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              primary
              onPress={handleSubmit}
              accessibilityRole="button"
              accessibilityLabel="Submit memo"
            >
              <ButtonText primary>Submit</ButtonText>
            </Button>
          </ButtonRow>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
