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

  // Basic store structure with placeholder actions
  initializeDeck: () => {
    set({
      cards: [...mockCards],
      currentIndex: 0,
      isDeckComplete: false,
    });
  },

  answerCard: (_cardId, _choiceId) => {
    // This will be implemented in T012
    console.warn('Placeholder: Answer card action will be implemented in T012');
  },

  nextCard: () => {
    // This will be implemented in T012
    console.warn('Placeholder: Next card action will be implemented in T012');
  },

  setShowMemoModal: show => set({ showMemoModal: show }),
  setShowEditModal: show => set({ showEditModal: show }),

  submitMemo: (_text) => {
    // This will be implemented in T013
    console.warn('Placeholder: Submit memo action will be implemented in T013');
  },

  editCard: (_cardId, _newQuestion) => {
    // This will be implemented in T013
    console.warn('Placeholder: Edit card action will be implemented in T013');
  },

  deleteCard: (_cardId) => {
    // This will be implemented in T013
    console.warn('Placeholder: Delete card action will be implemented in T013');
  },

  postponeCard: (_cardId) => {
    // This will be implemented in T013
    console.warn('Placeholder: Postpone card action will be implemented in T013');
  },
}));