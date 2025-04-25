import { create } from 'zustand';
import { Card } from '../types';
import { mockCards } from '../api/mocks';

interface ReviewState {
  cards: Card[];
  currentIndex: number;
  currentCard: Card | null;
  isDeckComplete: boolean;
  showMemoModal: boolean;
  showEditModal: boolean;

  // Actions
  initializeDeck: () => void;
  answerCard: (cardId: string, choiceId: string) => void;
  nextCard: () => void;
  setShowMemoModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  submitMemo: (text: string) => void;
  editCard: (cardId: string, newQuestion: string) => void;
  deleteCard: (cardId: string) => void;
  postponeCard: (cardId: string) => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  cards: [...mockCards],
  currentIndex: 0,
  get currentCard() {
    const { cards, currentIndex } = get();
    return cards[currentIndex] || null;
  },
  isDeckComplete: false,
  showMemoModal: false,
  showEditModal: false,

  // Core store actions
  initializeDeck: () => {
    set({
      cards: [...mockCards],
      currentIndex: 0,
      isDeckComplete: false,
    });
  },

  answerCard: (cardId, choiceId) => {
    // Check if answer is correct
    const { cards, currentIndex } = get();
    const card = cards[currentIndex];
    const isCorrect = card.choices.find(c => c.id === choiceId)?.isCorrect || false;

    // Update card status
    set(state => ({
      cards: state.cards.map(c =>
        c.id === cardId
          ? { ...c, status: isCorrect ? 'answered_correct' : 'answered_incorrect' }
          : c
      ),
    }));

    // Advance to next card after a delay
    setTimeout(() => {
      get().nextCard();
    }, 1000);
  },

  nextCard: () => {
    set(state => {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.cards.length) {
        return { isDeckComplete: true };
      }
      return { currentIndex: nextIndex };
    });
  },

  setShowMemoModal: show => set({ showMemoModal: show }),
  setShowEditModal: show => set({ showEditModal: show }),

  submitMemo: _text => {
    // This will be implemented in T013
    console.warn('Placeholder: Submit memo action will be implemented in T013');
  },

  editCard: (_cardId, _newQuestion) => {
    // This will be implemented in T013
    console.warn('Placeholder: Edit card action will be implemented in T013');
  },

  deleteCard: _cardId => {
    // This will be implemented in T013
    console.warn('Placeholder: Delete card action will be implemented in T013');
  },

  postponeCard: _cardId => {
    // This will be implemented in T013
    console.warn('Placeholder: Postpone card action will be implemented in T013');
  },
}));
