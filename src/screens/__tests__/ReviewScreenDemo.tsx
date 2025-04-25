import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeProvider } from '../../theme';
import ReviewScreen from '../ReviewScreen';
import { Card, Memo } from '../../types';
import { useReviewStore } from '../../store/reviewStore';
import { mockCards } from '../../api/mocks';

/**
 * Demo component to showcase ReviewScreen
 */
export default function ReviewScreenDemo() {
  // Mock cards data - copy from mock data
  const [cards, setCards] = useState<Card[]>([...mockCards]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeckComplete, setIsDeckComplete] = useState(false);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [memos, setMemos] = useState<Memo[]>([]);

  // Helper to get the current card
  const currentCard = cards[currentIndex] || null;

  // Mock store actions
  const mockInitializeDeck = () => {
    setCards([...mockCards]);
    setCurrentIndex(0);
    setIsDeckComplete(false);
    setMemos([]);
  };

  const mockAnswerCard = (cardId: string, choiceId: string) => {
    // Check if answer is correct
    const card = cards[currentIndex];
    const isCorrect = card.choices.find(c => c.id === choiceId)?.isCorrect || false;

    // Update card status
    setCards(
      cards.map(c =>
        c.id === cardId
          ? { ...c, status: isCorrect ? 'answered_correct' : 'answered_incorrect' }
          : c
      )
    );

    // Advance to next card after a delay
    setTimeout(() => {
      mockNextCard();
    }, 1000);
  };

  const mockNextCard = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= cards.length) {
      setIsDeckComplete(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const mockDeleteCard = (cardId: string) => {
    const updatedCards = cards.filter(card => card.id !== cardId);

    // Adjust current index if needed
    let newIndex = currentIndex;
    if (newIndex >= updatedCards.length) {
      newIndex = Math.max(0, updatedCards.length - 1);
    }

    const isDeckEmpty = updatedCards.length === 0;

    setCards(updatedCards);
    setCurrentIndex(newIndex);
    setIsDeckComplete(isDeckEmpty);
  };

  const mockPostponeCard = (cardId: string) => {
    const currentCard = cards.find(card => card.id === cardId);
    if (!currentCard) return;

    // Remove the current card from the deck
    const remainingCards = cards.filter(card => card.id !== cardId);

    // Add the card to the end of the deck
    const updatedCards = [...remainingCards, currentCard];

    setCards(updatedCards);
    // Move to the next card (which is now at the current index since we removed the current card)
    setCurrentIndex(currentIndex >= remainingCards.length ? 0 : currentIndex);
  };

  const mockSubmitMemo = (text: string) => {
    if (!text.trim()) return;

    const newMemo: Memo = {
      id: Math.random().toString(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setMemos([...memos, newMemo]);
    setShowMemoModal(false);
  };

  const mockEditCard = (cardId: string, newQuestion: string) => {
    if (!newQuestion.trim()) return;

    setCards(
      cards.map(card => (card.id === cardId ? { ...card, question: newQuestion.trim() } : card))
    );
    setShowEditModal(false);
  };

  // Mock the Zustand store
  jest.mock('../../store/reviewStore', () => ({
    useReviewStore: () => ({
      cards,
      currentIndex,
      currentCard,
      isDeckComplete,
      showMemoModal,
      showEditModal,
      memos,
      initializeDeck: mockInitializeDeck,
      answerCard: mockAnswerCard,
      nextCard: mockNextCard,
      setShowMemoModal,
      setShowEditModal,
      submitMemo: mockSubmitMemo,
      editCard: mockEditCard,
      deleteCard: mockDeleteCard,
      postponeCard: mockPostponeCard,
    }),
  }));

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>ReviewScreen Demo</Text>

        {/* Demo Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusText}>
            Card: {currentIndex + 1}/{cards.length} | Memos: {memos.length}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={mockInitializeDeck}>
            <Text style={styles.resetButtonText}>Reset Demo</Text>
          </TouchableOpacity>
        </View>

        {/* The ReviewScreen component */}
        <View style={styles.screenContainer}>
          <ReviewScreen />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#0047AB',
    padding: 6,
    borderRadius: 4,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  screenContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
