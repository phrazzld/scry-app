import React, { useState, useEffect } from 'react';
import { Modal, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Card } from '../../types';
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
  font-size: ${({ theme }) => theme.typography.heading}px;
  color: ${({ theme }) => theme.colors.inkBlack};
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  border: 1px solid ${({ theme }) => theme.colors.silverGray};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  min-height: 100px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  color: ${({ theme }) => theme.colors.inkBlack};
  font-size: ${({ theme }) => theme.typography.body}px;
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
  background: ${({ theme, primary }) => 
    primary ? theme.colors.cobaltBlue : 'transparent'};
  border-radius: 6px;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`;

// Type-safe text component with primary variant support
const ButtonText = styled.Text<ButtonProps>`
  color: ${({ theme, primary }) => 
    primary ? theme.colors.chalkWhite : theme.colors.inkBlack};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: ${({ primary }) => (primary ? '500' : 'normal')};
`;

// Component props interface
interface EditCardModalProps {
  isVisible: boolean;
  onClose: () => void;
  card: Card | null;
}

/**
 * EditCardModal component
 * A modal dialog for editing card questions
 */
export default function EditCardModal({ isVisible, onClose, card }: EditCardModalProps) {
  // Local state for the question input
  const [questionText, setQuestionText] = useState('');
  
  // Get the store action for editing cards
  const { editCard } = useReviewStore();

  // Update input when card changes
  useEffect(() => {
    if (card) {
      setQuestionText(card.question);
    }
  }, [card]);

  // Reset input when modal is closed
  useEffect(() => {
    if (!isVisible && card) {
      setQuestionText(card.question);
    }
  }, [isVisible, card]);

  // Handle saving with validation
  const handleSave = () => {
    if (card && questionText.trim()) {
      editCard(card.id, questionText);
      Keyboard.dismiss();
      onClose();
    }
  };

  // Handle modal dismissal
  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  // Don't render if there's no card to edit
  if (!card) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <ModalContainer>
        <ModalContent>
          <ModalTitle>Edit Card</ModalTitle>
          <TextInput
            placeholder="Enter question..."
            multiline
            value={questionText}
            onChangeText={setQuestionText}
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
              onPress={handleSave}
              accessibilityRole="button"
              accessibilityLabel="Save changes"
            >
              <ButtonText primary>Save</ButtonText>
            </Button>
          </ButtonRow>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}