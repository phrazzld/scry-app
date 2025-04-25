import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useReviewStore } from '../store/reviewStore';
import CardView from '../components/features/CardView';
import FloatingMemoButton from '../components/features/FloatingMemoButton';
import MemoInputModal from '../components/features/MemoInputModal';
import EditCardModal from '../components/features/EditCardModal';
import Icon from '../components/core/Icon';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.chalkWhite};
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const ActionsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  padding-horizontal: ${({ theme }) => theme.spacing(2)}px;
`;

const ActionContainer = styled.View`
  align-items: center;
`;

const ActionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.slateGray};
  font-size: ${({ theme }) => theme.typography.small}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4)}px;
`;

const EmptyStateText = styled.Text`
  font-size: ${({ theme }) => theme.typography.heading}px;
  color: ${({ theme }) => theme.colors.slateGray};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;

const ActionButton = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.cobaltBlue};
  padding: ${({ theme }) => theme.spacing(2)}px ${({ theme }) => theme.spacing(3)}px;
  border-radius: 8px;
  align-items: center;
`;

const ActionButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.chalkWhite};
  font-size: ${({ theme }) => theme.typography.body}px;
  font-weight: 500;
`;

/**
 * ReviewScreen component
 * Main screen of the app that displays cards and action buttons
 */
export default function ReviewScreen() {
  const {
    currentCard,
    isDeckComplete,
    initializeDeck,
    setShowMemoModal,
    setShowEditModal,
    deleteCard,
    postponeCard,
    showMemoModal,
    showEditModal
  } = useReviewStore();

  useEffect(() => {
    // Make sure we have cards on first load
    if (!currentCard && !isDeckComplete) {
      initializeDeck();
    }
  }, [currentCard, isDeckComplete]);

  if (isDeckComplete) {
    return (
      <Container>
        <EmptyStateContainer>
          <EmptyStateText>
            You've completed all cards for now.
          </EmptyStateText>
          <ActionButton 
            onPress={initializeDeck}
            accessibilityRole="button"
            accessibilityLabel="Restart deck"
          >
            <ActionButtonText>Restart Demo</ActionButtonText>
          </ActionButton>
        </EmptyStateContainer>
      </Container>
    );
  }

  return (
    <Container>
      {currentCard && (
        <>
          <CardView card={currentCard} />
          <ActionsRow>
            <ActionContainer>
              <Icon 
                name="create" 
                set="ionicons" 
                size={24} 
                color="#757575"
                onPress={() => setShowEditModal(true)}
                accessibilityLabel="Edit card"
              />
              <ActionLabel>Edit</ActionLabel>
            </ActionContainer>
            
            <ActionContainer>
              <Icon 
                name="trash" 
                set="ionicons" 
                size={24} 
                color="#757575"
                onPress={() => deleteCard(currentCard.id)}
                accessibilityLabel="Delete card"
              />
              <ActionLabel>Delete</ActionLabel>
            </ActionContainer>
            
            <ActionContainer>
              <Icon 
                name="time" 
                set="ionicons" 
                size={24} 
                color="#757575"
                onPress={() => postponeCard(currentCard.id)}
                accessibilityLabel="Postpone card"
              />
              <ActionLabel>Postpone</ActionLabel>
            </ActionContainer>
          </ActionsRow>
        </>
      )}

      <FloatingMemoButton onPress={() => setShowMemoModal(true)} />

      {/* Modals */}
      <MemoInputModal
        isVisible={showMemoModal}
        onClose={() => setShowMemoModal(false)}
      />

      <EditCardModal
        isVisible={showEditModal}
        onClose={() => setShowEditModal(false)}
        card={currentCard}
      />
    </Container>
  );
}