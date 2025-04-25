// Test file for store actions
import { useReviewStore } from './reviewStore';

// Test initialization
export const testInitializeDeck = () => {
  const { initializeDeck } = useReviewStore.getState();

  // Initialize deck
  initializeDeck();

  // Get updated state
  const state = useReviewStore.getState();

  return {
    cardsCount: state.cards.length,
    currentIndex: state.currentIndex,
    isDeckComplete: state.isDeckComplete,
    currentCard: state.currentCard,
  };
};

// Test answering a card
export const testAnswerCard = (correctAnswer = true) => {
  const { initializeDeck, answerCard } = useReviewStore.getState();

  // Initialize deck first
  initializeDeck();

  // Get the current card
  const { currentCard } = useReviewStore.getState();
  if (!currentCard) return { error: 'No current card available' };

  // Find a correct or incorrect answer based on parameter
  const choiceId = currentCard.choices.find(c => c.isCorrect === correctAnswer)?.id;
  if (!choiceId) return { error: 'No suitable choice found' };

  // Answer the card
  answerCard(currentCard.id, choiceId);

  // Return immediate state (before timeout advances to next card)
  const state = useReviewStore.getState();

  return {
    cardStatus: state.cards[0].status, // First card's updated status
    currentIndex: state.currentIndex,
    isDeckComplete: state.isDeckComplete,
  };
};

// Test moving to the next card
export const testNextCard = () => {
  const { initializeDeck, nextCard } = useReviewStore.getState();

  // Initialize deck first
  initializeDeck();

  // Store original card
  const originalCard = useReviewStore.getState().currentCard;

  // Advance to next card
  nextCard();

  // Get updated state
  const state = useReviewStore.getState();

  return {
    previousCard: originalCard,
    currentCard: state.currentCard,
    currentIndex: state.currentIndex,
    isDeckComplete: state.isDeckComplete,
  };
};

// Test completing the deck
export const testCompleteDeck = () => {
  const { initializeDeck, nextCard } = useReviewStore.getState();

  // Initialize deck
  initializeDeck();

  // Get the total number of cards
  const totalCards = useReviewStore.getState().cards.length;

  // Advance through all cards
  for (let i = 0; i < totalCards; i++) {
    nextCard();
  }

  // Get final state
  const finalState = useReviewStore.getState();

  return {
    currentIndex: finalState.currentIndex,
    isDeckComplete: finalState.isDeckComplete,
    currentCard: finalState.currentCard,
  };
};
