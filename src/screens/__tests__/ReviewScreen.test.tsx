import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import ReviewScreen from '../ReviewScreen';
import { useReviewStore } from '../../store/reviewStore';
import { Card } from '../../types';

// Mock the dependencies
jest.mock('../../store/reviewStore', () => ({
  useReviewStore: jest.fn(),
}));

jest.mock('../../components/features/CardView', () => {
  const { View, Text } = require('react-native');
  return function MockCardView({ card }: { card: Card }) {
    return (
      <View testID="card-view">
        <Text>{card.question}</Text>
      </View>
    );
  };
});

jest.mock('../../components/features/FloatingMemoButton', () => {
  const { View } = require('react-native');
  return function MockFloatingMemoButton({ onPress }: { onPress: () => void }) {
    return <View testID="floating-memo-button" onTouchEnd={onPress} />;
  };
});

jest.mock('../../components/features/MemoInputModal', () => {
  const { View } = require('react-native');
  return function MockMemoInputModal({ 
    isVisible, 
    onClose 
  }: { 
    isVisible: boolean;
    onClose: () => void;
  }) {
    if (!isVisible) return null;
    return <View testID="memo-modal" onTouchEnd={onClose} />;
  };
});

jest.mock('../../components/features/EditCardModal', () => {
  const { View } = require('react-native');
  return function MockEditCardModal({ 
    isVisible, 
    onClose, 
    card 
  }: { 
    isVisible: boolean;
    onClose: () => void;
    card: Card | null;
  }) {
    if (!isVisible) return null;
    return (
      <View testID="edit-modal" onTouchEnd={onClose}>
        {card && <Text>{card.id}</Text>}
      </View>
    );
  };
});

jest.mock('../../components/core/Icon', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return function MockIcon({ 
    name, 
    onPress,
    accessibilityLabel 
  }: { 
    name: string;
    onPress?: () => void;
    accessibilityLabel?: string;
  }) {
    return (
      <TouchableOpacity 
        testID={`icon-${name}`} 
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
      >
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  };
});

describe('ReviewScreen', () => {
  // Mock data
  const mockCard: Card = {
    id: 'card1',
    type: 'MULTIPLE_CHOICE',
    status: 'new',
    question: 'What is the capital of France?',
    choices: [
      { id: 'a', text: 'Berlin', isCorrect: false },
      { id: 'b', text: 'Paris', isCorrect: true },
      { id: 'c', text: 'London', isCorrect: false },
      { id: 'd', text: 'Rome', isCorrect: false },
    ],
    createdAt: new Date().toISOString(),
  };

  // Mock store actions
  const mockInitializeDeck = jest.fn();
  const mockSetShowMemoModal = jest.fn();
  const mockSetShowEditModal = jest.fn();
  const mockDeleteCard = jest.fn();
  const mockPostponeCard = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default store mock with deck in progress
    (useReviewStore as jest.Mock).mockReturnValue({
      currentCard: mockCard,
      isDeckComplete: false,
      showMemoModal: false,
      showEditModal: false,
      initializeDeck: mockInitializeDeck,
      setShowMemoModal: mockSetShowMemoModal,
      setShowEditModal: mockSetShowEditModal,
      deleteCard: mockDeleteCard,
      postponeCard: mockPostponeCard,
    });
  });

  it('initializes the deck on first load when needed', () => {
    // Mock store with no current card
    (useReviewStore as jest.Mock).mockReturnValue({
      currentCard: null,
      isDeckComplete: false,
      showMemoModal: false,
      showEditModal: false,
      initializeDeck: mockInitializeDeck,
      setShowMemoModal: mockSetShowMemoModal,
      setShowEditModal: mockSetShowEditModal,
      deleteCard: mockDeleteCard,
      postponeCard: mockPostponeCard,
    });

    render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Check if initializeDeck was called
    expect(mockInitializeDeck).toHaveBeenCalledTimes(1);
  });

  it('renders the card view when a card is available', () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Check if card view is rendered
    expect(getByTestId('card-view')).toBeTruthy();
    expect(getByText('What is the capital of France?')).toBeTruthy();
    
    // Check if action buttons are rendered
    expect(getByTestId('icon-create')).toBeTruthy();
    expect(getByTestId('icon-trash')).toBeTruthy();
    expect(getByTestId('icon-time')).toBeTruthy();
  });

  it('renders the empty state when deck is complete', () => {
    // Mock store with completed deck
    (useReviewStore as jest.Mock).mockReturnValue({
      currentCard: null,
      isDeckComplete: true,
      showMemoModal: false,
      showEditModal: false,
      initializeDeck: mockInitializeDeck,
      setShowMemoModal: mockSetShowMemoModal,
      setShowEditModal: mockSetShowEditModal,
      deleteCard: mockDeleteCard,
      postponeCard: mockPostponeCard,
    });

    const { getByText } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Check if empty state is rendered
    expect(getByText('You\'ve completed all cards for now.')).toBeTruthy();
    expect(getByText('Restart Demo')).toBeTruthy();
  });

  it('calls initializeDeck when restart button is pressed', () => {
    // Mock store with completed deck
    (useReviewStore as jest.Mock).mockReturnValue({
      currentCard: null,
      isDeckComplete: true,
      showMemoModal: false,
      showEditModal: false,
      initializeDeck: mockInitializeDeck,
      setShowMemoModal: mockSetShowMemoModal,
      setShowEditModal: mockSetShowEditModal,
      deleteCard: mockDeleteCard,
      postponeCard: mockPostponeCard,
    });

    const { getByText } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Press the restart button
    fireEvent.press(getByText('Restart Demo'));
    
    // Check if initializeDeck was called
    expect(mockInitializeDeck).toHaveBeenCalledTimes(1);
  });

  it('shows edit modal when edit button is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Press the edit button
    fireEvent.press(getByTestId('icon-create'));
    
    // Check if setShowEditModal was called
    expect(mockSetShowEditModal).toHaveBeenCalledWith(true);
  });

  it('deletes card when delete button is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Press the delete button
    fireEvent.press(getByTestId('icon-trash'));
    
    // Check if deleteCard was called with the current card id
    expect(mockDeleteCard).toHaveBeenCalledWith(mockCard.id);
  });

  it('postpones card when postpone button is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Press the postpone button
    fireEvent.press(getByTestId('icon-time'));
    
    // Check if postponeCard was called with the current card id
    expect(mockPostponeCard).toHaveBeenCalledWith(mockCard.id);
  });

  it('shows memo modal when floating button is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Press the floating memo button
    fireEvent.press(getByTestId('floating-memo-button'));
    
    // Check if setShowMemoModal was called
    expect(mockSetShowMemoModal).toHaveBeenCalledWith(true);
  });

  it('renders memo modal when showMemoModal is true', () => {
    // Mock store with memo modal visible
    (useReviewStore as jest.Mock).mockReturnValue({
      currentCard: mockCard,
      isDeckComplete: false,
      showMemoModal: true,
      showEditModal: false,
      initializeDeck: mockInitializeDeck,
      setShowMemoModal: mockSetShowMemoModal,
      setShowEditModal: mockSetShowEditModal,
      deleteCard: mockDeleteCard,
      postponeCard: mockPostponeCard,
    });

    const { getByTestId } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Check if memo modal is rendered
    expect(getByTestId('memo-modal')).toBeTruthy();
  });

  it('renders edit modal when showEditModal is true', () => {
    // Mock store with edit modal visible
    (useReviewStore as jest.Mock).mockReturnValue({
      currentCard: mockCard,
      isDeckComplete: false,
      showMemoModal: false,
      showEditModal: true,
      initializeDeck: mockInitializeDeck,
      setShowMemoModal: mockSetShowMemoModal,
      setShowEditModal: mockSetShowEditModal,
      deleteCard: mockDeleteCard,
      postponeCard: mockPostponeCard,
    });

    const { getByTestId } = render(
      <ThemeProvider>
        <ReviewScreen />
      </ThemeProvider>
    );

    // Check if edit modal is rendered
    expect(getByTestId('edit-modal')).toBeTruthy();
  });
});