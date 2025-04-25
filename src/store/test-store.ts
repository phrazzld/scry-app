// This is a temporary file to test the store import and usage
import { useReviewStore } from './reviewStore';

// Function to test store access
export const testStore = () => {
  // Get the current state
  const currentState = useReviewStore.getState();

  // Check if we can access state properties
  const { cards, currentCard, isDeckComplete } = currentState;

  // Return some values to verify it's working
  return {
    cardsCount: cards.length,
    hasCurrentCard: currentCard !== null,
    isDeckComplete,
  };
};

// Function to test action calls
export const testStoreActions = () => {
  // Get actions from the store
  const { initializeDeck, setShowMemoModal } = useReviewStore.getState();

  // Call some actions
  initializeDeck();
  setShowMemoModal(true);

  // Return updated state to verify actions work
  return useReviewStore.getState();
};
