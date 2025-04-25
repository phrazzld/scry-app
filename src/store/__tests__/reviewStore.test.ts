import { useReviewStore } from '../reviewStore';

// Simple test function to verify store initialization
function testStoreInitialization() {
  // Reset store to initial state
  useReviewStore.getState().initializeDeck();

  // Get initial state
  const initialState = useReviewStore.getState();

  // Check that the store has initial state values
  console.log('Store initialized with cards:', initialState.cards.length > 0);
  console.log('Current index is 0:', initialState.currentIndex === 0);
  console.log('Current card exists:', initialState.currentCard !== null);
  console.log('isDeckComplete is false:', initialState.isDeckComplete === false);
  console.log(
    'Modal states are false:',
    !initialState.showMemoModal && !initialState.showEditModal
  );
  console.log('Memos array is empty:', initialState.memos.length === 0);
}

// Test modal visibility actions
function testModalActions() {
  // Test showing memo modal
  useReviewStore.getState().setShowMemoModal(true);
  console.log('Memo modal shows:', useReviewStore.getState().showMemoModal === true);

  // Test hiding memo modal
  useReviewStore.getState().setShowMemoModal(false);
  console.log('Memo modal hides:', useReviewStore.getState().showMemoModal === false);

  // Test showing edit modal
  useReviewStore.getState().setShowEditModal(true);
  console.log('Edit modal shows:', useReviewStore.getState().showEditModal === true);

  // Test hiding edit modal
  useReviewStore.getState().setShowEditModal(false);
  console.log('Edit modal hides:', useReviewStore.getState().showEditModal === false);
}

// Test memo submission
function testSubmitMemo() {
  // Initial memos count
  const initialCount = useReviewStore.getState().memos.length;

  // Submit a new memo
  useReviewStore.getState().submitMemo('Test memo');

  // Check if memo was added
  const newCount = useReviewStore.getState().memos.length;
  console.log('Memo was added:', newCount === initialCount + 1);

  // Check memo content
  const lastMemo = useReviewStore.getState().memos[newCount - 1];
  console.log('Memo has correct text:', lastMemo.text === 'Test memo');
  console.log('Memo has ID:', !!lastMemo.id);
  console.log('Memo has creation date:', !!lastMemo.createdAt);
}

// Test card editing
function testEditCard() {
  // Get current card
  const currentCard = useReviewStore.getState().currentCard;
  if (!currentCard) {
    console.log('No current card found for testing');
    return;
  }

  // Store original question
  const originalQuestion = currentCard.question;
  const newQuestion = 'Edited question text';

  // Edit the card
  useReviewStore.getState().editCard(currentCard.id, newQuestion);

  // Get the updated card
  const updatedCard = useReviewStore.getState().cards.find(c => c.id === currentCard.id);

  // Check if question was updated
  console.log('Card question updated:', updatedCard?.question === newQuestion);
  console.log('Original question:', originalQuestion);
  console.log('New question:', updatedCard?.question);
}

// Test deleting a card
function testDeleteCard() {
  // Reset store to initial state
  useReviewStore.getState().initializeDeck();

  // Get initial card count
  const initialCount = useReviewStore.getState().cards.length;

  // Get current card
  const currentCard = useReviewStore.getState().currentCard;
  if (!currentCard) {
    console.log('No current card found for testing');
    return;
  }

  // Delete the current card
  useReviewStore.getState().deleteCard(currentCard.id);

  // Check if card was deleted
  const newCount = useReviewStore.getState().cards.length;
  console.log('Card was deleted:', newCount === initialCount - 1);

  // Check that the deleted card is no longer in the deck
  const cardStillExists = useReviewStore.getState().cards.some(c => c.id === currentCard.id);
  console.log('Card is removed from deck:', !cardStillExists);
}

// Test postponing a card
function testPostponeCard() {
  // Reset store to initial state
  useReviewStore.getState().initializeDeck();

  // Get current card
  const currentCard = useReviewStore.getState().currentCard;
  if (!currentCard) {
    console.log('No current card found for testing');
    return;
  }

  // Store the current card ID for comparison later
  const currentCardId = currentCard.id;

  // Get initial position
  const initialIndex = useReviewStore.getState().currentIndex;

  // Postpone the current card
  useReviewStore.getState().postponeCard(currentCard.id);

  // Check that the current card ID is different (indicating we moved to the next card)
  const newCurrentCard = useReviewStore.getState().currentCard;

  if (useReviewStore.getState().cards.length > 1) {
    // Only expect the card to change if there's more than one card
    console.log('Current card changed after postpone:', newCurrentCard?.id !== currentCardId);
  } else {
    // With only one card, it should remain the same card even after "postponing"
    console.log('Only one card exists, so current card remains the same');
  }

  // Check that the postponed card is now the last card
  const cards = useReviewStore.getState().cards;
  const lastCard = cards[cards.length - 1];
  console.log('Postponed card moved to end:', lastCard.id === currentCardId);

  console.log('Initial index:', initialIndex);
  console.log('New index:', useReviewStore.getState().currentIndex);
}

// Run all tests
export function runAllTests() {
  console.log('=== TESTING STORE INITIALIZATION ===');
  testStoreInitialization();

  console.log('\n=== TESTING MODAL ACTIONS ===');
  testModalActions();

  console.log('\n=== TESTING MEMO SUBMISSION ===');
  testSubmitMemo();

  console.log('\n=== TESTING CARD EDITING ===');
  testEditCard();

  console.log('\n=== TESTING CARD DELETION ===');
  testDeleteCard();

  console.log('\n=== TESTING CARD POSTPONEMENT ===');
  testPostponeCard();

  console.log('\n=== ALL TESTS COMPLETE ===');
}

// Execute tests automatically
runAllTests();
